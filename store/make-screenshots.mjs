// App Store screenshots of the demo mode for the 6.9-inch iPhone (1320 × 2868 px), in German and English.
// Run with `npm run screenshots` (needs Google Chrome). Output: store/screenshots/<lang>/*.jpg
// Chrome draws emoji correctly, unlike the iOS 26.3.1 simulator; status bar and home indicator are added here.
import { mkdir } from "node:fs/promises";
import puppeteer from "puppeteer-core";
import { createServer } from "vite";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = new URL("./screenshots/", import.meta.url).pathname;
// iPhone 17 Pro Max in points; screenshots are 3×.
const W = 440;
const H = 956;
const TOP = 62;
const BOTTOM = 34;
const TEXT = {
  de: { profile: "Profil von", hangouts: "Spontan", groups: "Gruppen", discover: "Entdecken", chats: "Chats", message: "Mensa um 12? 🍝" },
  en: { profile: "profile", hangouts: "Hangouts", groups: "Circles", discover: "Discover", chats: "Chats", message: "Mensa at 12? 🍝" },
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function click(page, text, selector = "button") {
  const found = await page.evaluate(
    (text, selector) => {
      const el = [...document.querySelectorAll(selector)].find(
        (e) => e.getBoundingClientRect().width > 0 && `${e.getAttribute("aria-label") ?? ""} ${e.textContent}`.includes(text),
      );
      el?.click();
      return !!el;
    },
    text,
    selector,
  );
  if (!found) throw new Error(`Nothing to click: ${text}`);
  await sleep(600);
}

async function capture(browser, url, lang) {
  const text = TEXT[lang];
  const page = await browser.newPage();
  await page.evaluateOnNewDocument((lang) => {
    try {
      localStorage.setItem("connectuni.lang", lang);
    } catch {
      // about:blank has no storage
    }
  }, lang);
  await page.setViewport({ width: W, height: H - TOP - BOTTOM, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await page.goto(`${url}?demo`, { waitUntil: "networkidle0" });

  const shots = [];
  const shot = async (name) => {
    // Lazy images that are hidden or off screen never load, so only the visible ones count.
    await page.waitForFunction(
      () =>
        [...document.images].every((img) => {
          const box = img.getBoundingClientRect();
          return img.complete || !box.width || box.top > innerHeight || box.bottom < 0 || box.left > innerWidth || box.right < 0;
        }),
      { timeout: 20000 },
    );
    await sleep(800);
    shots.push([name, await page.screenshot({ encoding: "base64" })]);
  };

  await click(page, "Quick Demo Login");
  await page.waitForFunction(() => document.querySelectorAll("article").length >= 4);
  await sleep(2500);
  await shot("01-people");
  await click(page, text.profile, "article button");
  await page.waitForSelector('[role="dialog"]');
  await shot("02-profile");
  await page.keyboard.press("Escape");
  await sleep(500);
  await click(page, text.hangouts, "nav button");
  await shot("03-hangouts");
  await click(page, text.groups, "nav button");
  await click(page, text.discover, '[role="tab"]');
  await shot("04-groups");
  await click(page, text.chats, "nav button");
  await click(page, "", "main ul li button");
  await page.waitForSelector('[role="dialog"] input[id^="uc-msg-"]');
  await page.type('[role="dialog"] input[id^="uc-msg-"]', text.message);
  await page.keyboard.press("Enter");
  await sleep(5000); // the demo students answer after a few seconds
  await shot("05-chat");
  await page.close();
  return shots;
}

// Puts the app between an iOS status bar and the home indicator, in the colours of the app's top and bottom edge.
const FRAME = (
  png,
) => `<!doctype html><html><body style="margin:0;width:${W}px;height:${H}px;overflow:hidden;font-family:-apple-system,system-ui,sans-serif">
<div id="top" style="height:${TOP}px;display:flex">
  <div style="width:157px;display:flex;justify-content:center;padding-top:19px;font-weight:600;font-size:17px;letter-spacing:-0.3px">9:41</div>
  <div style="flex:1"></div>
  <div style="width:157px;display:flex;justify-content:center;align-items:flex-start;gap:6px;padding-top:24px">
    <svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="7.5" width="3.2" height="4.5" rx="1"/><rect x="4.9" y="5" width="3.2" height="7" rx="1"/><rect x="9.8" y="2.5" width="3.2" height="9.5" rx="1"/><rect x="14.7" y="0" width="3.2" height="12" rx="1"/></svg>
    <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.3c2.3 0 4.4.9 6 2.4l1.1-1.2A10.1 10.1 0 0 0 8 .7 10.1 10.1 0 0 0 .9 3.5L2 4.7a8.6 8.6 0 0 1 6-2.4Zm0 3.3c1.4 0 2.7.5 3.7 1.4l1.1-1.2A7.2 7.2 0 0 0 8 4a7.2 7.2 0 0 0-4.8 1.8L4.3 7c1-.9 2.3-1.4 3.7-1.4Zm0 3.3c.6 0 1.2.2 1.6.6L8 11.3 6.4 9.5c.4-.4 1-.6 1.6-.6Z"/></svg>
    <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.8" fill="none" stroke="#000" stroke-opacity=".35"/><rect x="2" y="2" width="20" height="9" rx="2.4"/><path d="M25 4.6v3.8c.8-.3 1.3-1 1.3-1.9s-.5-1.6-1.3-1.9Z" fill-opacity=".4"/></svg>
  </div>
</div>
<img id="app" src="data:image/png;base64,${png}" style="display:block;width:${W}px;height:${H - TOP - BOTTOM}px">
<div id="bottom" style="height:${BOTTOM}px;position:relative"><div style="position:absolute;left:153px;bottom:8px;width:134px;height:5px;border-radius:3px;background:#000"></div></div>
<script>
  const img = document.getElementById("app");
  img.decode().then(() => {
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const g = c.getContext("2d");
    g.drawImage(img, 0, 0);
    const color = (y) => "rgb(" + g.getImageData(6, y, 1, 1).data.slice(0, 3).join(",") + ")";
    document.getElementById("top").style.background = color(0);
    document.getElementById("bottom").style.background = color(c.height - 1);
    window.ready = true;
  });
</script></body></html>`;

const server = await createServer({ logLevel: "error", server: { port: 5199 } });
await server.listen();
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  for (const lang of ["de", "en"]) {
    await mkdir(`${OUT}${lang}`, { recursive: true });
    for (const [name, png] of await capture(browser, server.resolvedUrls.local[0], lang)) {
      const page = await browser.newPage();
      await page.setViewport({ width: W, height: H, deviceScaleFactor: 3 });
      await page.setContent(FRAME(png));
      await page.waitForFunction(() => window.ready === true);
      await page.screenshot({ path: `${OUT}${lang}/${name}.jpg`, type: "jpeg", quality: 90 });
      await page.close();
      console.log(`${lang}/${name}.jpg`);
    }
  }
} finally {
  await browser.close();
  await server.close();
}
