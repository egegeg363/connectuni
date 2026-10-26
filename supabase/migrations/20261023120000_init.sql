-- ConnectUni database. Run once: Supabase dashboard → SQL Editor → New query → paste everything → Run.
-- Row level security everywhere: people only see their own university, nobody they blocked or who blocked
-- them, and only the chats they belong to.

-- ── Universities ────────────────────────────────────────────────────────────────

create table public.uni_domains (
  domain text primary key,
  uni_id text not null
);
alter table public.uni_domains enable row level security;
create policy "uni_domains: public" on public.uni_domains for select to anon, authenticated using (true);

insert into public.uni_domains (domain, uni_id) values
  ('accadis.com', 'h354'),
  ('akad.de', 'h156'),
  ('adbk.de', 'h187'),
  ('adbk-nuernberg.de', 'h202'),
  ('akkon-hochschule.de', 'h431'),
  ('alanus.edu', 'h349'),
  ('ash-berlin.eu', 'h18'),
  ('allensbach-hochschule.de', 'h338'),
  ('apollon-hochschule.de', 'h361'),
  ('augustana.de', 'h196'),
  ('berlin.bard.edu', 'h437'),
  ('bbw-hochschule.de', 'h389'),
  ('uni-wuppertal.de', 'h279'),
  ('bht-berlin.de', 'h15'),
  ('bhh.de', 'h519'),
  ('brand-university.de', 'h422'),
  ('businessschool-berlin.de', 'h415'),
  ('b-tu.de', 'h45'),
  ('law-school.de', 'h326'),
  ('burg-halle.de', 'h102'),
  ('cbs.de', 'h414'),
  ('charlotte-fresenius-uni.de', 'h558'),
  ('code.berlin', 'h506'),
  ('constructor.university', 'h327'),
  ('cts-hochschule.de', 'h194'),
  ('deutschehochschule.de', 'h591'),
  ('dhgs-hochschule.de', 'h383'),
  ('dhfpg.de', 'h391'),
  ('dshs-koeln.de', 'h148'),
  ('dbuas.de', 'h516'),
  ('diploma.de', 'h318'),
  ('di-uni.de', 'h394'),
  ('dhbw.de', 'h398'),
  ('dhge.de', 'h487'),
  ('dhsn.de', 'h727'),
  ('dhsh.de', 'h507'),
  ('ebs.edu', 'h206'),
  ('ehip.eu', 'h658'),
  ('eah-jena.de', 'h134'),
  ('escp.eu', 'h14'),
  ('esmt.org', 'h396'),
  ('student.ethz.ch', 'eth'),
  ('ethz.ch', 'eth'),
  ('uni-flensburg.de', 'h76'),
  ('europa-uni.de', 'h84'),
  ('euro-fh.de', 'h350'),
  ('eh-berlin.de', 'h19'),
  ('ehs-dresden.de', 'h55'),
  ('eh-freiburg.de', 'h89'),
  ('ehk-halle.de', 'h103'),
  ('ev-hochschule-hh.de', 'h108'),
  ('eh-darmstadt.de', 'h48'),
  ('eh-ludwigsburg.de', 'h229'),
  ('evhn.de', 'h201'),
  ('evh-bochum.de', 'h231'),
  ('eh-tabor.de', 'h426'),
  ('fh-aachen.de', 'h2'),
  ('fhdw.de', 'h216'),
  ('fh-mittelstand.de', 'h331'),
  ('fh-dortmund.de', 'h52'),
  ('fh-dresden.eu', 'h428'),
  ('fh-erfurt.de', 'h67'),
  ('fhdw-hannover.de', 'h311'),
  ('fhf.brandenburg.de', 'h471'),
  ('fh-guestrow.de', 'h479'),
  ('fhsmp.de', 'h443'),
  ('fh-potsdam.de', 'h222'),
  ('fh-swf.de', 'h343'),
  ('fh-wedel.de', 'h263'),
  ('fh-westkueste.de', 'h269'),
  ('fau.de', 'h70'),
  ('fernuni-hagen.de', 'h100'),
  ('fhms.eu', 'h192'),
  ('filmuniversitaet.de', 'h223'),
  ('fliedner-fachhochschule.de', 'h433'),
  ('folkwang-uni.de', 'h72'),
  ('fom.de', 'h286'),
  ('frankfurt-school.de', 'h83'),
  ('frankfurt-university.de', 'h79'),
  ('zedat.fu-berlin.de', 'fu'),
  ('fu-berlin.de', 'fu'),
  ('giu-berlin.de', 'h728'),
  ('gisma.com', 'h518'),
  ('stud.uni-frankfurt.de', 'ffm'),
  ('uni-frankfurt.de', 'ffm'),
  ('hcu-hamburg.de', 'h362'),
  ('hsba.de', 'h358'),
  ('hawk.de', 'h128'),
  ('hi-university.de', 'h390'),
  ('hsu-hh.de', 'h106'),
  ('hertie-school.org', 'h384'),
  ('hoems.hessen.de', 'h408'),
  ('hfh-fernstudium.de', 'h316'),
  ('hhl.de', 'h295'),
  ('health-and-medical-university-erfurt.de', 'h517'),
  ('health-and-medical-university.de', 'h729'),
  ('hs21.de', 'h363'),
  ('hs-aalen.de', 'h3'),
  ('hs-albsig.de', 'h4'),
  ('hs-anhalt.de', 'h5'),
  ('hs-ansbach.de', 'h312'),
  ('hochschule-biberach.de', 'h26'),
  ('hsbi.de', 'h28'),
  ('hochschule-bochum.de', 'h30'),
  ('h-brs.de', 'h294'),
  ('hs-bremen.de', 'h40'),
  ('hs-bremerhaven.de', 'h41'),
  ('hs-coburg.de', 'h44'),
  ('h-da.de', 'h47'),
  ('hdbw-hochschule.de', 'h467'),
  ('hbk-essen.de', 'h454'),
  ('hbksaar.de', 'h239'),
  ('hdba.de', 'h457'),
  ('hochschule-diakonie.de', 'h375'),
  ('hdm-stuttgart.de', 'h250'),
  ('hdwm.de', 'h432'),
  ('hsbund.de', 'h469'),
  ('hs-duesseldorf.de', 'h60'),
  ('hs-emden-leer.de', 'h405'),
  ('hs-esslingen.de', 'h73'),
  ('hs-flensburg.de', 'h77'),
  ('hs-fresenius.de', 'h271'),
  ('hs-fulda.de', 'h92'),
  ('haw-hamburg.de', 'h107'),
  ('haw-kiel.de', 'h145'),
  ('fham.de', 'h369'),
  ('staedelschule.de', 'h80'),
  ('hbk-bs.de', 'h37'),
  ('hfbk-dresden.de', 'h56'),
  ('hfbk-hamburg.de', 'h109'),
  ('hfk-bayreuth.de', 'h339'),
  ('hff-muc.de', 'h190'),
  ('finanzverwaltung.nrw.de', 'h488'),
  ('s-hochschule.de', 'h352'),
  ('hs-rottenburg.net', 'h300'),
  ('hfgg.de', 'h468'),
  ('hfg-offenbach.de', 'h207'),
  ('hfg-gmuend.de', 'h244'),
  ('gesundheit-hochschule.de', 'h692'),
  ('hgb-leipzig.de', 'h164'),
  ('hfjs.eu', 'h121'),
  ('hfkm-regensburg.de', 'h346'),
  ('khkt.de', 'h241'),
  ('hochschule-kirchenmusik.de', 'h126'),
  ('kirchenmusik-dresden.de', 'h58'),
  ('hfk-heidelberg.de', 'h124'),
  ('kirchenmusik-hochschule.org', 'h325'),
  ('kirchenmusikhochschule.de', 'h75'),
  ('hfk-bremen.de', 'h39'),
  ('hks-ottersberg.de', 'h213'),
  ('hfm-berlin.de', 'h21'),
  ('hfm-detmold.de', 'h49'),
  ('hfmdd.de', 'h57'),
  ('mh-freiburg.de', 'h90'),
  ('hfm-karlsruhe.de', 'h141'),
  ('hfm-nuernberg.de', 'h321'),
  ('hfmsaar.de', 'h240'),
  ('hfmdk-frankfurt.de', 'h81'),
  ('muho-mannheim.de', 'h123'),
  ('hmdk-stuttgart.de', 'h254'),
  ('hfmt-koeln.de', 'h153'),
  ('hfmt-hamburg.de', 'h110'),
  ('hmt-leipzig.de', 'h162'),
  ('hmtm.de', 'h188'),
  ('hmt-rostock.de', 'h234'),
  ('hfm-weimar.de', 'h267'),
  ('hfm-wuerzburg.de', 'h278'),
  ('hmtm-hannover.de', 'h117'),
  ('hnee.de', 'h64'),
  ('hfoev.bremen.de', 'h470'),
  ('hs-ludwigsburg.de', 'h466'),
  ('hfph.de', 'h189'),
  ('hfpol-bw.de', 'h504'),
  ('hspv.nrw.de', 'h484'),
  ('hfs-berlin.de', 'h23'),
  ('hsap.de', 'h458'),
  ('hft-stuttgart.de', 'h251'),
  ('htw-berlin.de', 'h16'),
  ('htwsaar.de', 'h236'),
  ('htw-dresden.de', 'h54'),
  ('htwk-leipzig.de', 'h160'),
  ('hs-offenburg.de', 'h208'),
  ('hwg-lu.de', 'h307'),
  ('hwr-berlin.de', 'h17'),
  ('hfwu.de', 'h203'),
  ('hs-furtwangen.de', 'h94'),
  ('hs-geisenheim.de', 'h446'),
  ('hshl.de', 'h399'),
  ('hs-hannover.de', 'h115'),
  ('hs-harz.de', 'h118'),
  ('hs-heilbronn.de', 'h125'),
  ('hof-university.de', 'h287'),
  ('hs-kl.de', 'h306'),
  ('h-ka.de', 'h138'),
  ('hs-kempten.de', 'h143'),
  ('hs-koblenz.de', 'h305'),
  ('htwg-konstanz.de', 'h155'),
  ('haw-landshut.de', 'h157'),
  ('h2.de', 'h173'),
  ('hs-mainz.de', 'h310'),
  ('hsf.sachsen.de', 'h498'),
  ('hs-merseburg.de', 'h180'),
  ('hs-mittweida.de', 'h181'),
  ('hm.edu', 'h291'),
  ('hnu.de', 'h319'),
  ('hs-nb.de', 'h195'),
  ('hs-niederrhein.de', 'h197'),
  ('hs-nordhausen.de', 'h315'),
  ('hs-osnabrueck.de', 'h214'),
  ('hs-pforzheim.de', 'h219'),
  ('rwu.de', 'h224'),
  ('reutlingen-university.de', 'h227'),
  ('hochschule-rhein-waal.de', 'h400'),
  ('hs-rm.de', 'h270'),
  ('hochschule-ruhr-west.de', 'h409'),
  ('hs-schmalkalden.de', 'h242'),
  ('hochschule-stralsund.de', 'h247'),
  ('hochschule-trier.de', 'h308'),
  ('hswt.de', 'h264'),
  ('hsw-hameln.de', 'h427'),
  ('hs-wismar.de', 'h274'),
  ('hs-worms.de', 'h309'),
  ('hszg.de', 'h282'),
  ('hs-doepfer.de', 'h455'),
  ('hu-berlin.de', 'hu'),
  ('ipu-berlin.de', 'h401'),
  ('ism.de', 'h285'),
  ('ihl.eu', 'h434'),
  ('sdi-muenchen.de', 'h376'),
  ('inu.de', 'h525'),
  ('ist-hochschule.de', 'h449'),
  ('iu.prf.hn', 'h329'),
  ('jade-hs.de', 'h406'),
  ('karlshochschule.de', 'h359'),
  ('kh-freiburg.de', 'h88'),
  ('khsb-berlin.de', 'h24'),
  ('kh-mz.de', 'h175'),
  ('katho-nrw.de', 'h151'),
  ('ksh-muenchen.de', 'h186'),
  ('ku.de', 'h65'),
  ('kiho-wuppertal.de', 'h281'),
  ('student.kit.edu', 'kit'),
  ('kit.edu', 'kit'),
  ('kolping-hochschule.de', 'h520'),
  ('klu.org', 'h429'),
  ('kunstakademie-duesseldorf.de', 'h61'),
  ('kunstakademie-karlsruhe.de', 'h139'),
  ('kunstakademie-muenster.de', 'h193'),
  ('khm.de', 'h152'),
  ('uni-hannover.de', 'h114'),
  ('leibniz-fh.de', 'h439'),
  ('leuphana.de', 'h171'),
  ('campus.lmu.de', 'lmu'),
  ('lmu.de', 'lmu'),
  ('lthh-oberursel.de', 'h205'),
  ('macromedia-fachhochschule.de', 'h366'),
  ('mediadesign.de', 'h353'),
  ('medicalschool-berlin.de', 'h448'),
  ('medicalschool-hamburg.de', 'h421'),
  ('mhb-fontane.de', 'h463'),
  ('mh-hannover.de', 'h112'),
  ('mul-ct.de', 'h762'),
  ('merz-akademie.de', 'h252'),
  ('media-university.de', 'h420'),
  ('munich-business-school.de', 'h336'),
  ('uni-munich.de', 'h763'),
  ('mh-luebeck.de', 'h170'),
  ('muthesius-kunsthochschule.de', 'h289'),
  ('nordakademie.de', 'h220'),
  ('nbs.de', 'h460'),
  ('oth-aw.de', 'h280'),
  ('oth-regensburg.de', 'h226'),
  ('ostfalia.de', 'h36'),
  ('ph-freiburg.de', 'h87'),
  ('ph-heidelberg.de', 'h120'),
  ('ph-karlsruhe.de', 'h137'),
  ('ph-ludwigsburg.de', 'h166'),
  ('ph-gmuend.de', 'h243'),
  ('ph-weingarten.de', 'h268'),
  ('palucca.eu', 'h324'),
  ('sankt-georgen.de', 'h82'),
  ('phwt.de', 'h320'),
  ('pfh.de', 'h299'),
  ('psychologische-hochschule.de', 'h441'),
  ('rh-koeln.de', 'h150'),
  ('rsh-duesseldorf.de', 'h62'),
  ('rptu.de', 'h135'),
  ('rwth-aachen.de', 'rwth'),
  ('mobile-university.de', 'h313'),
  ('srh-university.de', 'h122'),
  ('abk-stuttgart.de', 'h253'),
  ('hfg-karlsruhe.de', 'h140'),
  ('hfm-trossingen.de', 'h257'),
  ('steinbeis-hochschule.de', 'h330'),
  ('th-ab.de', 'h333'),
  ('tha.de', 'h7'),
  ('th-bingen.de', 'h304'),
  ('th-brandenburg.de', 'h34'),
  ('th-deg.de', 'h284'),
  ('thga.de', 'h31'),
  ('thi.de', 'h288'),
  ('th-koeln.de', 'h149'),
  ('th-luebeck.de', 'h169'),
  ('th-mannheim.de', 'h177'),
  ('thm.de', 'h97'),
  ('studium.th-nuernberg.de', 'h200'),
  ('th-owl.de', 'h165'),
  ('th-rosenheim.de', 'h232'),
  ('thu.de', 'h260'),
  ('th-wildau.de', 'h272'),
  ('thws.de', 'h277'),
  ('utn.de', 'h691'),
  ('thf-fulda.de', 'h93'),
  ('thf-paderborn.de', 'h217'),
  ('theologie-trier.de', 'h256'),
  ('th-elstal.de', 'h407'),
  ('th-ewersbach.de', 'h447'),
  ('thh-friedensau.de', 'h91'),
  ('th-reutlingen.de', 'h360'),
  ('tiho-hannover.de', 'h113'),
  ('tomorrow-university', 'h657'),
  ('tu-freiberg.de', 'h85'),
  ('campus.tu-berlin.de', 'tub'),
  ('tu-berlin.de', 'tub'),
  ('tu-braunschweig.de', 'h35'),
  ('tu-chemnitz.de', 'h42'),
  ('tu-clausthal.de', 'h43'),
  ('tu-darmstadt.de', 'h46'),
  ('tu-dortmund.de', 'h51'),
  ('mailbox.tu-dresden.de', 'tud'),
  ('tu-dresden.de', 'tud'),
  ('tuhh.de', 'h105'),
  ('tu-ilmenau.de', 'h130'),
  ('tum.de', 'tum'),
  ('mytum.de', 'tum'),
  ('studium.uni-hamburg.de', 'uhh'),
  ('uni-hamburg.de', 'uhh'),
  ('stud.uni-heidelberg.de', 'hd'),
  ('uni-heidelberg.de', 'hd'),
  ('smail.uni-koeln.de', 'koeln'),
  ('uni-koeln.de', 'koeln'),
  ('students.uni-mannheim.de', 'ma'),
  ('uni-mannheim.de', 'ma'),
  ('uni-muenster.de', 'ms'),
  ('univie.ac.at', 'wien'),
  ('uni-augsburg.de', 'h6'),
  ('uni-bamberg.de', 'h8'),
  ('uni-bayreuth.de', 'h9'),
  ('uni-bielefeld.de', 'h27'),
  ('ruhr-uni-bochum.de', 'h29'),
  ('uni-bonn.de', 'h32'),
  ('uni-bremen.de', 'h38'),
  ('unibw.de', 'h185'),
  ('udk-berlin.de', 'h20'),
  ('uni-saarland.de', 'h235'),
  ('uni-due.de', 'h71'),
  ('hhu.de', 'h59'),
  ('uni-erfurt.de', 'h66'),
  ('uni-freiburg.de', 'h86'),
  ('uni-speyer.de', 'h246'),
  ('uni-giessen.de', 'h96'),
  ('uni-goettingen.de', 'h98'),
  ('uni-greifswald.de', 'h99'),
  ('uni-halle.de', 'h101'),
  ('uni-hildesheim.de', 'h127'),
  ('uni-hohenheim.de', 'h129'),
  ('uni-jena.de', 'h133'),
  ('uni-kassel.de', 'h142'),
  ('uni-koblenz.de', 'h146'),
  ('uni-konstanz.de', 'h154'),
  ('uni-leipzig.de', 'h159'),
  ('ovgu.de', 'h172'),
  ('uni-mainz.de', 'h174'),
  ('uni-marburg.de', 'h179'),
  ('uol.de', 'h209'),
  ('uni-osnabrueck.de', 'h211'),
  ('meine.uni-paderborn.de', 'h215'),
  ('uni-passau.de', 'h218'),
  ('uni-potsdam.de', 'h221'),
  ('uni-regensburg.de', 'h225'),
  ('uni-rostock.de', 'h233'),
  ('uni-siegen.de', 'h245'),
  ('uni-stuttgart.de', 'h248'),
  ('uni-trier.de', 'h255'),
  ('uni-tuebingen.de', 'h258'),
  ('uni-ulm.de', 'h259'),
  ('uni-vechta.de', 'h293'),
  ('uni-weimar.de', 'h266'),
  ('uni-wh.de', 'h275'),
  ('uni-wuerzburg.de', 'h276'),
  ('uni-kiel.de', 'h144'),
  ('uni-luebeck.de', 'h168'),
  ('ue-germany.com', 'h335'),
  ('university-of-labour.de', 'h524'),
  ('vp-uni.de', 'h262'),
  ('kh-berlin.de', 'h22'),
  ('w-hs.de', 'h95'),
  ('whz.de', 'h283'),
  ('whitecliffe.de', 'h462'),
  ('whu.edu', 'h261'),
  ('wb-fernstudium.de', 'h317'),
  ('xu-university.com', 'h515'),
  ('zu.de', 'h351')
on conflict (domain) do nothing;

create function public.email_domain(email text) returns text
language sql immutable set search_path = '' as $$
  select lower(split_part(coalesce(email, ''), '@', 2))
$$;

-- (The parameter is not called "domain": inside the query that name would mean the column.)
create function public.domain_uni(dom text) returns text
language sql stable set search_path = '' as $$
  select d.uni_id from public.uni_domains d
  where dom = d.domain or dom like '%.' || d.domain
  order by length(d.domain) desc
  limit 1
$$;

create function public.is_academic_email(email text) returns boolean
language sql stable set search_path = '' as $$
  select public.domain_uni(public.email_domain(email)) is not null
    or public.email_domain(email) ~ '\.(edu|ac\.[a-z]{2})$'
    or public.email_domain(email) ~ '(^|\.)(uni|tu|th|fh|hs|ph|htw)-[a-z0-9-]+\.(de|at|ch)$'
    or public.email_domain(email) ~ '(^|\.)uni[a-z]*\.(de|at|ch|it)$'
$$;

-- Listed universities must match the email domain; unlisted ones are grouped by domain ("d:example.edu").
create function public.email_fits_uni(email text, uni text) returns boolean
language sql stable set search_path = '' as $$
  select case
    when uni like 'd:%' then uni = 'd:' || public.email_domain(email) and public.is_academic_email(email)
    else public.domain_uni(public.email_domain(email)) is not distinct from uni
  end
$$;

-- ── Tables ──────────────────────────────────────────────────────────────────────

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 60),
  birth_year int check (birth_year between 1930 and 2015),
  uni_id text not null,
  uni_name text not null check (char_length(uni_name) <= 120),
  uni_short text not null check (char_length(uni_short) <= 60),
  major text not null check (char_length(major) <= 20),
  minor text check (char_length(minor) <= 20),
  semester int not null default 1 check (semester between 1 and 20),
  interests text[] not null default '{}' check (cardinality(interests) <= 30),
  bio text check (char_length(bio) <= 300),
  photo_url text check (char_length(photo_url) <= 500),
  status text check (char_length(status) <= 20),
  status_at timestamptz,
  last_active timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index profiles_uni_idx on public.profiles (uni_id);

create table public.blocks (
  blocker_id uuid not null references public.profiles (id) on delete cascade,
  blocked_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);
create index blocks_blocked_idx on public.blocks (blocked_id);

-- A wave is "Connect"; two waves in opposite directions are a match.
create table public.waves (
  from_id uuid not null references public.profiles (id) on delete cascade,
  to_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (from_id, to_id),
  check (from_id <> to_id)
);
create index waves_to_idx on public.waves (to_id);

create table public.reports (
  id bigint generated always as identity primary key,
  reporter_id uuid references public.profiles (id) on delete set null,
  reported_id uuid not null references public.profiles (id) on delete cascade,
  reason text not null check (reason in ('fake', 'harassment', 'inappropriate', 'spam', 'other')),
  note text check (char_length(note) <= 500),
  status text not null default 'open' check (status in ('open', 'actioned', 'dismissed')),
  created_at timestamptz not null default now()
);

create table public.groups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles (id) on delete set null,
  uni_id text not null,
  emoji text not null check (char_length(emoji) <= 16),
  name text not null check (char_length(name) between 1 and 40),
  about text check (char_length(about) <= 120),
  audience text check (char_length(audience) <= 20),
  created_at timestamptz not null default now()
);
create index groups_uni_idx on public.groups (uni_id);

create table public.group_members (
  group_id uuid not null references public.groups (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'member' check (status in ('member', 'invited')),
  invited_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (group_id, user_id)
);
create index group_members_user_idx on public.group_members (user_id);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('dm', 'group')),
  group_id uuid unique references public.groups (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.conversation_members (
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  last_read_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);
create index conversation_members_user_idx on public.conversation_members (user_id);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid references public.profiles (id) on delete cascade,
  kind text not null default 'text' check (kind in ('text', 'system')),
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index messages_conversation_idx on public.messages (conversation_id, created_at);

create table public.hangouts (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references public.profiles (id) on delete cascade,
  uni_id text not null,
  type text not null check (type in ('coffee', 'mensa', 'study', 'sport', 'party')),
  title text not null check (char_length(title) between 1 and 80),
  place text not null check (char_length(place) between 1 and 80),
  starts_at timestamptz not null,
  duration_minutes int not null default 30 check (duration_minutes between 30 and 360 and duration_minutes % 30 = 0),
  max_people int not null check (max_people between 2 and 50),
  audience text check (char_length(audience) <= 20),
  created_at timestamptz not null default now()
);
create index hangouts_uni_idx on public.hangouts (uni_id, starts_at);

create table public.hangout_members (
  hangout_id uuid not null references public.hangouts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (hangout_id, user_id)
);
create index hangout_members_user_idx on public.hangout_members (user_id);

create table public.notifications (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('wave', 'match', 'hangout', 'group_invite', 'group_join')),
  actor_id uuid references public.profiles (id) on delete cascade,
  ref_id uuid,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index notifications_user_idx on public.notifications (user_id, created_at desc);

-- ── Helpers for policies (security definer so policies don't recurse) ───────────

create function public.my_uni() returns text
language sql stable security definer set search_path = '' as $$
  select uni_id from public.profiles where id = auth.uid()
$$;

create function public.audience_ok(audience text) returns boolean
language sql stable security definer set search_path = '' as $$
  select audience is null or exists (select 1 from public.profiles p where p.id = auth.uid() and audience in (p.major, p.minor))
$$;

create function public.is_blocked(a uuid, b uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.blocks where (blocker_id = a and blocked_id = b) or (blocker_id = b and blocked_id = a))
$$;

-- Someone who blocked you disappears for you; people you blocked stay readable so you can unblock them.
create function public.blocked_me(other uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.blocks where blocker_id = other and blocked_id = auth.uid())
$$;

create function public.is_member(conversation uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.conversation_members where conversation_id = conversation and user_id = auth.uid())
$$;

create function public.group_role(g uuid) returns text
language sql stable security definer set search_path = '' as $$
  select status from public.group_members where group_id = g and user_id = auth.uid()
$$;

-- In a direct chat, nobody can write once either side has blocked the other.
create function public.dm_blocked(conversation uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.conversation_members m
    join public.conversations c on c.id = m.conversation_id
    where m.conversation_id = conversation and c.kind = 'dm' and m.user_id <> auth.uid() and public.is_blocked(auth.uid(), m.user_id)
  )
$$;

-- ── Row level security ──────────────────────────────────────────────────────────

alter table public.profiles enable row level security;
create policy "profiles: read own and same uni" on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (uni_id = public.my_uni() and not public.blocked_me(id)));
create policy "profiles: create own with matching uni email" on public.profiles for insert to authenticated
  with check (id = (select auth.uid()) and public.email_fits_uni((select auth.jwt()) ->> 'email', uni_id));
create policy "profiles: update own" on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()) and public.email_fits_uni((select auth.jwt()) ->> 'email', uni_id));

alter table public.blocks enable row level security;
create policy "blocks: own" on public.blocks for all to authenticated
  using (blocker_id = (select auth.uid())) with check (blocker_id = (select auth.uid()));

alter table public.waves enable row level security;
create policy "waves: sent or received" on public.waves for select to authenticated using ((select auth.uid()) in (from_id, to_id));
create policy "waves: send to visible people" on public.waves for insert to authenticated
  with check (from_id = (select auth.uid()) and exists (select 1 from public.profiles p where p.id = to_id));
create policy "waves: take back" on public.waves for delete to authenticated using (from_id = (select auth.uid()));

alter table public.reports enable row level security;
create policy "reports: file" on public.reports for insert to authenticated with check (reporter_id = (select auth.uid()));

alter table public.groups enable row level security;
create policy "groups: read" on public.groups for select to authenticated
  using (uni_id = public.my_uni() and (public.audience_ok(audience) or public.group_role(id) is not null));
create policy "groups: create" on public.groups for insert to authenticated
  with check (owner_id = (select auth.uid()) and uni_id = public.my_uni() and public.audience_ok(audience));
create policy "groups: owner edits" on public.groups for update to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy "groups: owner deletes" on public.groups for delete to authenticated using (owner_id = (select auth.uid()));

alter table public.group_members enable row level security;
create policy "group_members: read" on public.group_members for select to authenticated
  using (exists (select 1 from public.groups g where g.id = group_id));
create policy "group_members: join or invite" on public.group_members for insert to authenticated
  with check (
    (user_id = (select auth.uid()) and status = 'member' and invited_by is null
      and exists (select 1 from public.groups g where g.id = group_id and public.audience_ok(g.audience)))
    or (status = 'invited' and invited_by = (select auth.uid()) and public.group_role(group_id) = 'member'
      and exists (select 1 from public.profiles p where p.id = user_id))
  );
create policy "group_members: accept invite" on public.group_members for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()) and status = 'member');
create policy "group_members: leave or decline" on public.group_members for delete to authenticated using (user_id = (select auth.uid()));

alter table public.conversations enable row level security;
create policy "conversations: members" on public.conversations for select to authenticated using (public.is_member(id));

alter table public.conversation_members enable row level security;
create policy "conversation_members: read" on public.conversation_members for select to authenticated using (public.is_member(conversation_id));
create policy "conversation_members: mark read" on public.conversation_members for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

alter table public.messages enable row level security;
create policy "messages: read" on public.messages for select to authenticated using (public.is_member(conversation_id));
create policy "messages: send" on public.messages for insert to authenticated
  with check (sender_id = (select auth.uid()) and kind = 'text' and public.is_member(conversation_id) and not public.dm_blocked(conversation_id));

alter table public.hangouts enable row level security;
create policy "hangouts: read" on public.hangouts for select to authenticated
  using (uni_id = public.my_uni() and public.audience_ok(audience) and not public.is_blocked((select auth.uid()), host_id));
create policy "hangouts: create" on public.hangouts for insert to authenticated
  with check (host_id = (select auth.uid()) and uni_id = public.my_uni() and public.audience_ok(audience));
create policy "hangouts: host edits" on public.hangouts for update to authenticated
  using (host_id = (select auth.uid())) with check (host_id = (select auth.uid()));
create policy "hangouts: host deletes" on public.hangouts for delete to authenticated using (host_id = (select auth.uid()));

alter table public.hangout_members enable row level security;
create policy "hangout_members: read" on public.hangout_members for select to authenticated
  using (exists (select 1 from public.hangouts h where h.id = hangout_id));
create policy "hangout_members: join" on public.hangout_members for insert to authenticated
  with check (user_id = (select auth.uid()) and exists (select 1 from public.hangouts h where h.id = hangout_id));
create policy "hangout_members: leave" on public.hangout_members for delete to authenticated using (user_id = (select auth.uid()));

alter table public.notifications enable row level security;
create policy "notifications: own" on public.notifications for select to authenticated using (user_id = (select auth.uid()));
create policy "notifications: mark read" on public.notifications for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- ── Triggers ────────────────────────────────────────────────────────────────────

create function public.on_wave() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if exists (select 1 from public.waves where from_id = new.to_id and to_id = new.from_id) then
    insert into public.notifications (user_id, kind, actor_id) values (new.to_id, 'match', new.from_id), (new.from_id, 'match', new.to_id);
  else
    insert into public.notifications (user_id, kind, actor_id) values (new.to_id, 'wave', new.from_id);
  end if;
  return new;
end $$;
create trigger waves_notify after insert on public.waves for each row execute function public.on_wave();

create function public.on_block() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  delete from public.waves where (from_id = new.blocker_id and to_id = new.blocked_id) or (from_id = new.blocked_id and to_id = new.blocker_id);
  return new;
end $$;
create trigger blocks_cleanup after insert on public.blocks for each row execute function public.on_block();

create function public.on_hangout() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.hangout_members (hangout_id, user_id) values (new.id, new.host_id);
  return new;
end $$;
create trigger hangouts_host_joins after insert on public.hangouts for each row execute function public.on_hangout();

create function public.before_hangout_join() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if (select count(*) from public.hangout_members where hangout_id = new.hangout_id)
     >= (select max_people from public.hangouts where id = new.hangout_id) then
    raise exception 'hangout_full';
  end if;
  return new;
end $$;
create trigger hangout_members_capacity before insert on public.hangout_members for each row execute function public.before_hangout_join();

create function public.after_hangout_join() returns trigger
language plpgsql security definer set search_path = '' as $$
declare host uuid;
begin
  select host_id into host from public.hangouts where id = new.hangout_id;
  if host is distinct from new.user_id then
    insert into public.notifications (user_id, kind, actor_id, ref_id) values (host, 'hangout', new.user_id, new.hangout_id);
  end if;
  return new;
end $$;
create trigger hangout_members_notify after insert on public.hangout_members for each row execute function public.after_hangout_join();

-- Every group gets a chat; members (not invitees) are in it.
create function public.on_group() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.conversations (kind, group_id) values ('group', new.id);
  if new.owner_id is not null then
    insert into public.group_members (group_id, user_id) values (new.id, new.owner_id);
  end if;
  return new;
end $$;
create trigger groups_setup after insert on public.groups for each row execute function public.on_group();

create function public.on_group_member() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  convo uuid;
  owner uuid;
begin
  select c.id, g.owner_id into convo, owner from public.conversations c join public.groups g on g.id = c.group_id where c.group_id = coalesce(new.group_id, old.group_id);
  if tg_op = 'DELETE' then
    delete from public.conversation_members where conversation_id = convo and user_id = old.user_id;
    return old;
  end if;
  if new.status = 'member' then
    insert into public.conversation_members (conversation_id, user_id) values (convo, new.user_id) on conflict do nothing;
    if owner is distinct from new.user_id and (tg_op = 'INSERT' or old.status = 'invited') then
      insert into public.notifications (user_id, kind, actor_id, ref_id) values (owner, 'group_join', new.user_id, new.group_id);
    end if;
  elsif tg_op = 'INSERT' then
    insert into public.notifications (user_id, kind, actor_id, ref_id) values (new.user_id, 'group_invite', new.invited_by, new.group_id);
  end if;
  return new;
end $$;
create trigger group_members_sync after insert or update or delete on public.group_members for each row execute function public.on_group_member();

-- ── Functions the app calls ─────────────────────────────────────────────────────

-- Opens (or finds) the direct chat with someone at your uni.
create function public.start_dm(other uuid) returns uuid
language plpgsql security definer set search_path = '' as $$
declare convo uuid;
begin
  if auth.uid() is null or other = auth.uid() then
    raise exception 'invalid';
  end if;
  if not exists (select 1 from public.profiles p where p.id = other and p.uni_id = public.my_uni()) or public.is_blocked(auth.uid(), other) then
    raise exception 'not_allowed';
  end if;
  select c.id into convo from public.conversations c
    join public.conversation_members a on a.conversation_id = c.id and a.user_id = auth.uid()
    join public.conversation_members b on b.conversation_id = c.id and b.user_id = other
    where c.kind = 'dm'
    limit 1;
  if convo is null then
    insert into public.conversations (kind) values ('dm') returning id into convo;
    insert into public.conversation_members (conversation_id, user_id) values (convo, auth.uid()), (convo, other);
  end if;
  return convo;
end $$;

-- Deletes the signed-in account; every table cascades from it. The app removes the photos first.
create function public.delete_my_account() returns void
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then
    raise exception 'not_signed_in';
  end if;
  delete from auth.users where id = auth.uid();
end $$;

revoke execute on function public.start_dm(uuid), public.delete_my_account() from public, anon;
grant execute on function public.start_dm(uuid), public.delete_my_account() to authenticated;

-- ── Profile photos ──────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict (id) do nothing;
create policy "avatars: read own folder" on storage.objects for select to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "avatars: upload to own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "avatars: replace own" on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "avatars: delete own" on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- ── Realtime ────────────────────────────────────────────────────────────────────

alter publication supabase_realtime add table
  public.messages, public.waves, public.notifications, public.hangout_members, public.group_members, public.conversation_members;
