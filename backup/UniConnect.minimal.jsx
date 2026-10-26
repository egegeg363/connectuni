/**
 * UniConnect — campus social & friend-finder prototype.
 *
 * Single-file React component, styled with Tailwind CSS, icons from lucide-react.
 * Everything runs on local React state with mock data:
 *   Welcome → onboarding (uni email + OTP, university, Hauptfach/Nebenfach, interests)
 *   → Home · Explore (My Fach hub) · Events (Mensa meetups) · Social (chats & groups)
 *
 * Demo verification code: 482910
 */
import { createContext, Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BadgeCheck,
  Beer,
  Bell,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  CalendarPlus,
  Check,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Clapperboard,
  Clock,
  Coffee,
  Cog,
  Compass,
  Dna,
  Dumbbell,
  FlaskConical,
  Globe,
  GraduationCap,
  Hourglass,
  House,
  Info,
  Landmark,
  Languages,
  Laptop,
  LoaderCircle,
  Lock,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Minus,
  Plus,
  RotateCcw,
  Scale,
  School,
  Search,
  SendHorizontal,
  ShieldCheck,
  Sigma,
  Sparkles,
  Stethoscope,
  Target,
  Trash2,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  Utensils,
  Vote,
  X,
  Zap,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────────────────
 * i18n
 * ──────────────────────────────────────────────────────────────────────────── */

const STRINGS = {
  en: {
    back: "Back",
    next: "Continue",
    close: "Close",
    cancel: "Cancel",
    optional: "optional",
    you: "You",
    online: "Online",
    offline: "Offline",
    today: "Today",
    tomorrow: "Tomorrow",
    now: "now",
    minAgo: "{n} min ago",
    hAgo: "{n} h ago",
    dAgo: "{n} d ago",
    inMin: "in {n} min",
    liveNow: "Live now",
    semesterN: "Semester {n}",
    semShort: "Sem. {n}",
    ersti: "Ersti",
    major: "Major",
    minor: "Minor",
    noMinor: "No minor",
    language: "Language",

    welcomeEyebrow: "Students only · verified with your uni email",
    welcomeTitleA: "Find ",
    welcomeTitleB: "your people",
    welcomeTitleC: " on campus.",
    welcomeLead: "Meet students who share your major or minor, find company for Mensa lunch and start study groups in seconds.",
    welcomeCta: "Create my profile",
    welcomeDemo: "Look around with a demo profile",
    welcomeNote: "Takes about a minute. Only verified university emails get in.",
    feat1Title: "Matched by subject",
    feat1Body: "People from your Hauptfach and Nebenfach show up first.",
    feat2Title: "Spontaneous meetups",
    feat2Body: "Mensa, coffee, library: see who's going today.",
    feat3Title: "Groups & chats",
    feat3Body: "Ersti groups, study groups and DMs in one place.",
    previewChat: "Mensa at 12:30? I'll save us a table.",

    stepOf: "Step {n} of {total}",
    stepEmail: "Uni email",
    stepUni: "University",
    stepStudies: "Studies",
    stepInterests: "Interests",

    emailTitle: "What's your university email?",
    emailLead: "UniConnect is for verified students only. We'll send a 6-digit code to this address.",
    emailLabel: "University email",
    emailPlaceholder: "firstname.lastname@uni-hamburg.de",
    emailAccepted: "Accepted, for example",
    emailDemo: "Use demo address",
    emailOk: "Academic domain recognized",
    emailErrFormat: "Enter a complete email address, like name@tum.de.",
    emailErrPersonal: "{provider} is a personal email provider. Use the address your university gave you so we can confirm you're a student.",
    emailErrDomain: "@{domain} doesn't look like a university domain. Use your student address, usually ending in .edu, .ac.uk or @uni-….de.",
    emailSend: "Send code",
    emailSending: "Sending…",
    emailVerifiedNote: "{email} is already verified.",
    emailPrivacy: "Your email address never appears on your profile.",

    otpTitle: "Check your inbox",
    otpLead: "Enter the 6-digit code we sent to {email}.",
    otpDemoTag: "Demo mode",
    otpDemoText: "Your verification code is {code}",
    otpDemoFill: "Fill in",
    otpMailFrom: "Uni Mail",
    otpVerify: "Verify email",
    otpVerifying: "Checking…",
    otpWrong: "That code doesn't match. Use the one from the demo banner.",
    otpVerified: "Email verified",
    otpResendIn: "Resend code in {s}s",
    otpResend: "Resend code",
    otpChange: "Change email",
    otpDigit: "Digit {n}",

    uniTitle: "Choose your university",
    uniLead: "You'll see students, events and groups from this campus.",
    uniSearch: "Search by name or city",
    uniMatchesEmail: "Matches your email",
    uniNoResults: "No university matches “{q}”.",
    uniAddCustom: "Not listed? Add your university",
    uniCustomLabel: "University name",
    uniCustomPlaceholder: "e.g. Hochschule Darmstadt",
    uniCustomUse: "Use this",
    uniCustomBadge: "Added by you",

    studiesTitle: "What do you study?",
    studiesLead: "Your major decides who you match with first. Add a minor if you have one.",
    majorLabel: "Major (Hauptfach)",
    minorLabel: "Minor (Nebenfach)",
    subjectSearch: "Search subjects",
    noSubject: "No subject matches “{q}”.",
    minorToggle: "I have a minor (Nebenfach)",
    minorToggleHint: "Common in combined-subject degrees",
    semesterLabel: "Current semester",
    degreeLabel: "Degree",
    erstiNote: "First semester? Welcome, Ersti!",
    peersWaiting: "{n} students in {subject} are already here",
    fewer: "Fewer",
    more: "More",

    interestsTitle: "Interests & vibe",
    interestsLead: "Shared interests help the right people find you.",
    nameLabel: "Display name",
    namePlaceholder: "What should people call you?",
    avatarLabel: "Avatar",
    colorLabel: "Color",
    interestsLabel: "Interests",
    interestsHint: "Pick at least 3.",
    interestsMore: "Pick {n} more",
    interestsCount: "{n} selected",
    bioLabel: "Short bio",
    bioPlaceholder: "e.g. First semester in Computer Science. Mensa at 12:30, board games on Fridays.",
    finish: "Finish profile",

    settingUp: "Setting up your campus…",
    setupProfile: "Creating your profile",
    setupPeers: "Finding students in {subject}",
    setupEvents: "Loading Mensa meetups",
    doneTitle: "Welcome, {name}!",
    doneLead: "Your campus card for {uni} is ready.",
    doneSameMajor: "students share your major",
    doneEvents: "meetups coming up",
    doneGroups: "groups you can join",
    doneEnter: "Enter UniConnect",

    cardTitle: "Campus card",
    cardVerified: "Verified",
    cardPending: "Not verified yet",
    cardNamePlaceholder: "Your name",
    termWinter: "Winter {y}",
    termSummer: "Summer {y}",

    navHome: "Home",
    navExplore: "Explore",
    navEvents: "Events",
    navSocial: "Social",
    navExploreSub: "My Fach",
    notifications: "Notifications",
    markAllRead: "Mark all as read",
    noNotifications: "You're all caught up.",
    myProfile: "My profile",

    greetMorning: "Good morning, {name}",
    greetDay: "Hey {name}",
    greetEvening: "Good evening, {name}",
    qaEventTitle: "Start Mensa / Campus Event",
    qaEventBody: "Find lunch company in minutes",
    qaGroupTitle: "Create Study/Social Group",
    qaGroupBody: "For your Fach or the whole uni",
    qaBuddyTitle: "Find Study Buddy",
    qaBuddyBody: "Matched by Fach & interests",
    recTitle: "Your Major & Interests",
    recLead: "Students who share your Hauptfach, Nebenfach or hobbies",
    seeAll: "See all",
    feedTitle: "Live campus feed",
    feedLead: "Spontaneous meetups in the next 48 hours",
    allEvents: "All events",
    mensaTitle: "Today at the Mensa",
    mensaHours: "Lunch 11:00–14:30",
    mensaPriceNote: "Student prices",
    mensaCta: "Find lunch company",
    vegan: "vegan",
    veggie: "veggie",
    friendsOnline: "Friends online",
    noFriendsOnline: "None of your friends are online right now.",

    mSameMajor: "Same major: {subject}",
    mSameMinor: "Also minors in {subject}",
    mStudiesYourMinor: "Studies your minor: {subject}",
    mMinorsInYourMajor: "Minors in {subject}",
    mShared: "{n} shared interests",
    mShared_one: "1 shared interest",

    addFriend: "Add Friend",
    requestSent: "Request sent",
    connected: "Connected",
    accept: "Accept",
    decline: "Decline",
    message: "Message",
    cancelRequest: "Cancel request",
    wantsToConnect: "wants to connect",

    exploreTitle: "Explore",
    exploreLead: "{n} students at {uni}",
    hubTitle: "{subject} Hub",
    hubLead: "Everyone and everything in your Hauptfach",
    hubStudents: "students",
    hubEvents: "events",
    hubGroups: "groups",
    hubShow: "Show my Fach",
    hubPlan: "Plan a meetup",
    searchPeople: "Search name, subject or hobby",
    fMyMajor: "My major",
    fMyMinor: "My minor",
    fAll: "All majors",
    noMinorSet: "You haven't set a minor",
    profilesCount: "{n} profiles",
    profilesCount_one: "1 profile",
    sortedByMatch: "best matches first",
    emptyPeopleTitle: "Nobody matches these filters",
    emptyPeopleBody: "Try a different interest or switch to all majors.",
    resetFilters: "Reset filters",

    eventsTitle: "Events & Mensa meetups",
    eventsLead: "Spontaneous plans on campus. Join one or start your own.",
    createEvent: "Create event",
    fAllTypes: "All",
    fMine: "My events",
    previewRestricted: "Preview restricted events",
    hiddenEvents: "{n} events are only for other majors and hidden from your feed.",
    hiddenEvents_one: "1 event is only for another major and hidden from your feed.",
    previewOn: "They're shown greyed out so you can see how the filter works.",
    audienceOpen: "Open to All",
    audienceOnly: "{subject} Only",
    join: "Join",
    joined: "Joined",
    leave: "Leave",
    requestJoin: "Request to Join",
    requested: "Requested",
    full: "Full",
    notEligible: "Only for {subject} students",
    hosting: "You're hosting",
    cancelEvent: "Cancel event",
    confirmCancel: "Cancel for everyone?",
    yesCancel: "Yes, cancel",
    keep: "Keep it",
    hostedBy: "Hosted by {name}",
    going: "{n}/{max} going",
    spotsLeft: "{n} spots left",
    spotsLeft_one: "1 spot left",
    approvalNote: "Host approves requests",
    later: "Later this week",
    emptyEventsTitle: "Nothing planned here yet",
    emptyEventsBody: "Start something yourself. Spontaneous plans work best.",

    ceTitle: "Create event",
    ceLead: "Spontaneous plans fill up fast. Keep it simple.",
    ceType: "What's the plan?",
    ceName: "Title",
    ceDay: "Day",
    ceTime: "Time",
    ceLocation: "Location",
    ceLocationPlaceholder: "Where exactly?",
    ceMax: "Max participants",
    ceDetails: "Details",
    ceDetailsPlaceholder: "Anything people should know? e.g. I'll wear a yellow beanie.",
    ceAudience: "Who can join?",
    ceOnlyMajor: "Only My Major",
    ceOnlyMajorBody: "Only students with {subject} as Hauptfach or Nebenfach can see and join.",
    ceOpenAll: "Open to All Majors",
    ceOpenAllBody: "Everyone at your university can see and join.",
    ceRestrictTo: "Restrict to",
    cePreview: "Preview in the feed",
    ceSubmit: "Create event",
    ceErrTitle: "Give your event a title.",
    ceErrLocation: "Add a location so people can find you.",
    ceErrPast: "Pick a time in the future.",

    tEventCreated: "Event created",
    tEventCreatedBody: "“{title}” is now in the campus feed.",
    tJoined: "You're in!",
    tJoinedBody: "{title} · {when}",
    tLeft: "You left “{title}”",
    tRequestSent: "Request sent",
    tRequestSentBody: "{name} will confirm shortly.",
    tEventCancelled: "Event cancelled",
    nRequestApproved: "{name} accepted your request to join “{title}”.",
    nJoinedYourEvent: "{name} joined your event “{title}”.",
    tFriendRequest: "Friend request sent to {name}",
    nFriendAccepted: "{name} accepted your friend request.",
    tNowConnected: "You and {name} are now connected",
    nNewMessage: "{name}: {text}",
    tNewMessageFrom: "New message from {name}",
    nGroupJoined: "{name} joined “{group}”.",
    tGroupCreated: "Group created",
    tGroupCreatedBody: "{n} friends invited.",
    tGroupCreatedBody_one: "1 friend invited.",
    tGroupCreatedNoInvites: "Invite friends anytime from the group card.",
    tGroupJoined: "You joined “{group}”",
    tGroupLeft: "You left “{group}”",
    tInvitesSent: "Invites sent",
    tInvitesSentBody: "{n} friends invited to “{group}”.",
    tInvitesSentBody_one: "1 friend invited to “{group}”.",
    nWelcome: "Welcome to UniConnect! Your profile is live.",
    nIncoming: "{name} wants to connect with you.",
    openChat: "Open chat",

    socialTitle: "Social",
    socialLead: "Friends, direct messages and groups.",
    tabChats: "Messages & Friends",
    tabGroups: "Groups",
    friendRequests: "Friend requests",
    friendsTitle: "Friends",
    friendsCount: "{n} connected",
    findMore: "Find more",
    conversations: "Conversations",
    searchChats: "Search chats",
    noChats: "No conversations yet",
    noChatsBody: "Message someone from your Fach to get started.",
    noChatMatches: "No chats match “{q}”.",
    typing: "{name} is typing",
    messagePlaceholder: "Write a message…",
    send: "Send",
    pickChat: "Pick a conversation",
    pickChatBody: "Direct messages and group chats appear here.",
    membersN: "{n} members",
    groupChat: "Group chat",
    sysCreated: "You created the group.",
    sysInvited: "You invited {names}.",
    sysJoined: "{name} joined the group.",
    sysYouJoined: "You joined the group.",
    chatStart: "This is the start of your chat with {name}.",
    viewProfile: "View profile",

    createGroup: "Create group",
    myGroups: "My groups",
    discoverGroups: "Discover groups",
    joinGroup: "Join",
    leaveGroup: "Leave",
    invite: "Invite",
    uniWide: "University-wide",
    invitedN: "{n} invited",
    hiddenGroups: "{n} groups for other majors are hidden.",
    hiddenGroups_one: "1 group for another major is hidden.",
    noMyGroups: "You haven't joined a group yet. Pick one below or start your own.",
    allGroupsJoined: "You've joined every group open to you. Time to start a new one!",

    cgTitle: "Create group",
    cgLead: "Study group, Ersti crew or Mensa regulars.",
    cgName: "Group name",
    cgNamePlaceholder: "e.g. Linear Algebra study group",
    cgNameError: "Use at least 3 characters.",
    cgDesc: "Description",
    cgDescPlaceholder: "What's the group about? When do you meet?",
    cgVisibility: "Visibility",
    cgMajorOnly: "Major only",
    cgMajorOnlyBody: "Only {subject} students can find and join it.",
    cgUniWide: "University-wide",
    cgUniWideBody: "Anyone at your university can find and join it.",
    cgInvite: "Invite friends",
    selectAll: "Select all",
    selectNone: "Select none",
    notInSubject: "Not in {subject}",
    noFriendsToInvite: "Connect with people first, then invite them here.",
    cgSubmit: "Create group",
    cgSubmitInvite: "Create & invite {n}",
    inviteTitle: "Invite to “{group}”",
    inviteLead: "Pick friends to invite. They'll get a notification.",
    inviteSend: "Send {n} invites",
    inviteSend_one: "Send 1 invite",
    inviteNone: "Select friends",
    memberTag: "Member",
    invitedTag: "Invited",
    allFriendsInGroup: "All your friends are already in this group.",

    about: "About",
    whyMatch: "Why you match",
    goingTo: "Going to",

    sbTitle: "Find a study buddy",
    sbLead: "Ranked by Hauptfach, Nebenfach and shared interests.",
    sbMatch: "match",
    sbSkip: "Skip",
    sbConnect: "Connect",
    sbCounter: "{i} of {n}",
    sbDoneTitle: "That's everyone for now",
    sbDoneBody: "Browse the full directory, or check back after your next lecture.",
    sbBrowse: "Browse all students",
    sbRestart: "Start over",

    statFriends: "Friends",
    statEvents: "Events",
    statGroups: "Groups",
    verifiedVia: "Verified via {domain}",
    restartDemo: "Log out & restart demo",
  },

  de: {
    back: "Zurück",
    next: "Weiter",
    close: "Schließen",
    cancel: "Abbrechen",
    optional: "optional",
    you: "Du",
    online: "Online",
    offline: "Offline",
    today: "Heute",
    tomorrow: "Morgen",
    now: "jetzt",
    minAgo: "vor {n} Min.",
    hAgo: "vor {n} Std.",
    dAgo: "vor {n} T.",
    inMin: "in {n} Min.",
    liveNow: "Läuft gerade",
    semesterN: "{n}. Semester",
    semShort: "{n}. Sem.",
    ersti: "Ersti",
    major: "Hauptfach",
    minor: "Nebenfach",
    noMinor: "Kein Nebenfach",
    language: "Sprache",

    welcomeEyebrow: "Nur für Studierende · verifiziert per Uni-Mail",
    welcomeTitleA: "Finde ",
    welcomeTitleB: "deine Leute",
    welcomeTitleC: " auf dem Campus.",
    welcomeLead:
      "Lerne Kommiliton:innen aus deinem Haupt- und Nebenfach kennen, verabrede dich spontan zur Mensa und gründe Lerngruppen in Sekunden.",
    welcomeCta: "Profil erstellen",
    welcomeDemo: "Mit Demo-Profil umschauen",
    welcomeNote: "Dauert etwa eine Minute. Nur verifizierte Uni-Mail-Adressen kommen rein.",
    feat1Title: "Nach Fach gematcht",
    feat1Body: "Leute aus deinem Haupt- und Nebenfach siehst du zuerst.",
    feat2Title: "Spontane Treffen",
    feat2Body: "Mensa, Kaffee, Bib: Sieh, wer heute dabei ist.",
    feat3Title: "Gruppen & Chats",
    feat3Body: "Ersti-Gruppen, Lerngruppen und Direktnachrichten an einem Ort.",
    previewChat: "Mensa um 12:30? Ich halt uns einen Tisch frei.",

    stepOf: "Schritt {n} von {total}",
    stepEmail: "Uni-Mail",
    stepUni: "Hochschule",
    stepStudies: "Studium",
    stepInterests: "Interessen",

    emailTitle: "Wie lautet deine Uni-Mail?",
    emailLead: "UniConnect ist nur für verifizierte Studierende. Wir schicken dir einen 6-stelligen Code an diese Adresse.",
    emailLabel: "Uni-E-Mail-Adresse",
    emailPlaceholder: "vorname.nachname@uni-hamburg.de",
    emailAccepted: "Akzeptiert werden z. B.",
    emailDemo: "Demo-Adresse verwenden",
    emailOk: "Hochschul-Domain erkannt",
    emailErrFormat: "Gib eine vollständige E-Mail-Adresse ein, z. B. name@tum.de.",
    emailErrPersonal:
      "{provider} ist ein privater Mail-Anbieter. Nutze die Adresse deiner Hochschule, damit wir bestätigen können, dass du studierst.",
    emailErrDomain:
      "@{domain} sieht nicht nach einer Hochschule aus. Nutze deine Studierenden-Adresse, meist mit .edu, .ac.uk oder @uni-….de am Ende.",
    emailSend: "Code senden",
    emailSending: "Wird gesendet …",
    emailVerifiedNote: "{email} ist bereits bestätigt.",
    emailPrivacy: "Deine E-Mail-Adresse erscheint nie auf deinem Profil.",

    otpTitle: "Schau in dein Postfach",
    otpLead: "Gib den 6-stelligen Code ein, den wir an {email} geschickt haben.",
    otpDemoTag: "Demo-Modus",
    otpDemoText: "Dein Bestätigungscode lautet {code}",
    otpDemoFill: "Einsetzen",
    otpMailFrom: "Uni-Mail",
    otpVerify: "E-Mail bestätigen",
    otpVerifying: "Wird geprüft …",
    otpWrong: "Der Code stimmt nicht. Nimm den aus dem Demo-Banner.",
    otpVerified: "E-Mail bestätigt",
    otpResendIn: "Neuer Code in {s} s",
    otpResend: "Code erneut senden",
    otpChange: "E-Mail ändern",
    otpDigit: "Ziffer {n}",

    uniTitle: "Wähle deine Hochschule",
    uniLead: "Du siehst Studierende, Events und Gruppen von diesem Campus.",
    uniSearch: "Nach Name oder Stadt suchen",
    uniMatchesEmail: "Passt zu deiner Mail",
    uniNoResults: "Keine Hochschule passt zu „{q}“.",
    uniAddCustom: "Nicht dabei? Hochschule hinzufügen",
    uniCustomLabel: "Name der Hochschule",
    uniCustomPlaceholder: "z. B. Hochschule Darmstadt",
    uniCustomUse: "Übernehmen",
    uniCustomBadge: "Von dir hinzugefügt",

    studiesTitle: "Was studierst du?",
    studiesLead: "Dein Hauptfach bestimmt, mit wem du zuerst gematcht wirst. Ein Nebenfach kannst du auch angeben.",
    majorLabel: "Hauptfach",
    minorLabel: "Nebenfach",
    subjectSearch: "Fächer suchen",
    noSubject: "Kein Fach passt zu „{q}“.",
    minorToggle: "Ich habe ein Nebenfach",
    minorToggleHint: "Typisch im Zwei-Fächer-Bachelor",
    semesterLabel: "Fachsemester",
    degreeLabel: "Abschluss",
    erstiNote: "Erstes Semester? Willkommen, Ersti!",
    peersWaiting: "{subject}: {n} Studierende sind schon dabei",
    fewer: "Weniger",
    more: "Mehr",

    interestsTitle: "Interessen & Vibe",
    interestsLead: "Gemeinsame Interessen helfen den richtigen Leuten, dich zu finden.",
    nameLabel: "Anzeigename",
    namePlaceholder: "Wie sollen dich andere nennen?",
    avatarLabel: "Avatar",
    colorLabel: "Farbe",
    interestsLabel: "Interessen",
    interestsHint: "Wähle mindestens 3.",
    interestsMore: "Noch {n} auswählen",
    interestsCount: "{n} ausgewählt",
    bioLabel: "Kurze Bio",
    bioPlaceholder: "z. B. Ersti in Informatik. Mensa um 12:30, freitags Spieleabend.",
    finish: "Profil abschließen",

    settingUp: "Dein Campus wird eingerichtet …",
    setupProfile: "Profil wird erstellt",
    setupPeers: "Suche Leute aus {subject}",
    setupEvents: "Lade Mensa-Treffs",
    doneTitle: "Willkommen, {name}!",
    doneLead: "Deine Campus-Karte für {uni} ist bereit.",
    doneSameMajor: "teilen dein Hauptfach",
    doneEvents: "anstehende Treffen",
    doneGroups: "Gruppen für dich",
    doneEnter: "Los geht's",

    cardTitle: "Campus-Karte",
    cardVerified: "Verifiziert",
    cardPending: "Noch nicht verifiziert",
    cardNamePlaceholder: "Dein Name",
    termWinter: "WiSe {y}",
    termSummer: "SoSe {y}",

    navHome: "Start",
    navExplore: "Entdecken",
    navEvents: "Events",
    navSocial: "Social",
    navExploreSub: "Mein Fach",
    notifications: "Benachrichtigungen",
    markAllRead: "Alle als gelesen markieren",
    noNotifications: "Du bist auf dem neuesten Stand.",
    myProfile: "Mein Profil",

    greetMorning: "Guten Morgen, {name}",
    greetDay: "Hey {name}",
    greetEvening: "Guten Abend, {name}",
    qaEventTitle: "Mensa- / Campus-Event starten",
    qaEventBody: "In Minuten Leute zum Essen finden",
    qaGroupTitle: "Lern- / Freizeitgruppe gründen",
    qaGroupBody: "Für dein Fach oder die ganze Uni",
    qaBuddyTitle: "Lernpartner:in finden",
    qaBuddyBody: "Gematcht nach Fach & Interessen",
    recTitle: "Dein Fach & deine Interessen",
    recLead: "Leute mit deinem Haupt- oder Nebenfach oder deinen Hobbys",
    seeAll: "Alle ansehen",
    feedTitle: "Live auf dem Campus",
    feedLead: "Spontane Treffen in den nächsten 48 Stunden",
    allEvents: "Alle Events",
    mensaTitle: "Heute in der Mensa",
    mensaHours: "Mittagessen 11:00–14:30",
    mensaPriceNote: "Preise für Studierende",
    mensaCta: "Leute zum Essen finden",
    vegan: "vegan",
    veggie: "vegetarisch",
    friendsOnline: "Freund:innen online",
    noFriendsOnline: "Gerade ist niemand von deinen Freund:innen online.",

    mSameMajor: "Gleiches Hauptfach: {subject}",
    mSameMinor: "Auch Nebenfach {subject}",
    mStudiesYourMinor: "Studiert dein Nebenfach: {subject}",
    mMinorsInYourMajor: "Nebenfach {subject}",
    mShared: "{n} gemeinsame Interessen",
    mShared_one: "1 gemeinsames Interesse",

    addFriend: "Hinzufügen",
    requestSent: "Anfrage gesendet",
    connected: "Verbunden",
    accept: "Annehmen",
    decline: "Ablehnen",
    message: "Nachricht",
    cancelRequest: "Anfrage zurückziehen",
    wantsToConnect: "möchte sich vernetzen",

    exploreTitle: "Entdecken",
    exploreLead: "{n} Studierende · {uni}",
    hubTitle: "{subject}-Hub",
    hubLead: "Alle Leute und Events aus deinem Hauptfach",
    hubStudents: "Studierende",
    hubEvents: "Events",
    hubGroups: "Gruppen",
    hubShow: "Mein Fach zeigen",
    hubPlan: "Treffen planen",
    searchPeople: "Name, Fach oder Hobby suchen",
    fMyMajor: "Mein Hauptfach",
    fMyMinor: "Mein Nebenfach",
    fAll: "Alle Fächer",
    noMinorSet: "Du hast kein Nebenfach angegeben",
    profilesCount: "{n} Profile",
    profilesCount_one: "1 Profil",
    sortedByMatch: "beste Matches zuerst",
    emptyPeopleTitle: "Niemand passt zu diesen Filtern",
    emptyPeopleBody: "Probier ein anderes Interesse oder wechsle zu allen Fächern.",
    resetFilters: "Filter zurücksetzen",

    eventsTitle: "Events & Mensa-Treffs",
    eventsLead: "Spontane Pläne auf dem Campus. Mach mit oder starte dein eigenes.",
    createEvent: "Event erstellen",
    fAllTypes: "Alle",
    fMine: "Meine Events",
    previewRestricted: "Gesperrte Events anzeigen",
    hiddenEvents: "{n} Events sind nur für andere Fächer und in deinem Feed ausgeblendet.",
    hiddenEvents_one: "1 Event ist nur für ein anderes Fach und in deinem Feed ausgeblendet.",
    previewOn: "Sie werden ausgegraut angezeigt, damit du siehst, wie der Filter funktioniert.",
    audienceOpen: "Offen für alle",
    audienceOnly: "Nur {subject}",
    join: "Mitmachen",
    joined: "Dabei",
    leave: "Absagen",
    requestJoin: "Anfrage senden",
    requested: "Angefragt",
    full: "Voll",
    notEligible: "Nur für {subject}-Studierende",
    hosting: "Du bist Gastgeber:in",
    cancelEvent: "Event absagen",
    confirmCancel: "Für alle absagen?",
    yesCancel: "Ja, absagen",
    keep: "Behalten",
    hostedBy: "Von {name}",
    going: "{n}/{max} dabei",
    spotsLeft: "Noch {n} Plätze",
    spotsLeft_one: "Noch 1 Platz",
    approvalNote: "Gastgeber:in bestätigt Anfragen",
    later: "Später diese Woche",
    emptyEventsTitle: "Hier ist noch nichts geplant",
    emptyEventsBody: "Starte selbst etwas. Spontane Pläne funktionieren am besten.",

    ceTitle: "Event erstellen",
    ceLead: "Spontane Pläne sind schnell voll. Halte es einfach.",
    ceType: "Was ist der Plan?",
    ceName: "Titel",
    ceDay: "Tag",
    ceTime: "Uhrzeit",
    ceLocation: "Ort",
    ceLocationPlaceholder: "Wo genau?",
    ceMax: "Max. Teilnehmende",
    ceDetails: "Details",
    ceDetailsPlaceholder: "Was sollten die anderen wissen? z. B. Ich trage eine gelbe Mütze.",
    ceAudience: "Wer darf mitmachen?",
    ceOnlyMajor: "Nur mein Fach",
    ceOnlyMajorBody: "Nur Studierende mit {subject} als Haupt- oder Nebenfach sehen das Event und können mitmachen.",
    ceOpenAll: "Alle Studiengänge",
    ceOpenAllBody: "Alle Studierenden deiner Uni sehen das Event und können mitmachen.",
    ceRestrictTo: "Beschränken auf",
    cePreview: "Vorschau im Feed",
    ceSubmit: "Event erstellen",
    ceErrTitle: "Gib deinem Event einen Titel.",
    ceErrLocation: "Gib einen Ort an, damit man dich findet.",
    ceErrPast: "Wähle einen Zeitpunkt in der Zukunft.",

    tEventCreated: "Event erstellt",
    tEventCreatedBody: "„{title}“ ist jetzt im Campus-Feed.",
    tJoined: "Du bist dabei!",
    tJoinedBody: "{title} · {when}",
    tLeft: "Du hast „{title}“ abgesagt",
    tRequestSent: "Anfrage gesendet",
    tRequestSentBody: "{name} bestätigt gleich.",
    tEventCancelled: "Event abgesagt",
    nRequestApproved: "{name} hat deine Anfrage für „{title}“ angenommen.",
    nJoinedYourEvent: "{name} macht bei deinem Event „{title}“ mit.",
    tFriendRequest: "Anfrage an {name} gesendet",
    nFriendAccepted: "{name} hat deine Anfrage angenommen.",
    tNowConnected: "Du und {name} seid jetzt verbunden",
    nNewMessage: "{name}: {text}",
    tNewMessageFrom: "Neue Nachricht von {name}",
    nGroupJoined: "{name} ist „{group}“ beigetreten.",
    tGroupCreated: "Gruppe gegründet",
    tGroupCreatedBody: "{n} Freund:innen eingeladen.",
    tGroupCreatedBody_one: "1 Freund:in eingeladen.",
    tGroupCreatedNoInvites: "Einladen kannst du jederzeit über die Gruppenkarte.",
    tGroupJoined: "Du bist „{group}“ beigetreten",
    tGroupLeft: "Du hast „{group}“ verlassen",
    tInvitesSent: "Einladungen verschickt",
    tInvitesSentBody: "{n} Freund:innen zu „{group}“ eingeladen.",
    tInvitesSentBody_one: "1 Freund:in zu „{group}“ eingeladen.",
    nWelcome: "Willkommen bei UniConnect! Dein Profil ist online.",
    nIncoming: "{name} möchte sich mit dir vernetzen.",
    openChat: "Chat öffnen",

    socialTitle: "Social",
    socialLead: "Freund:innen, Direktnachrichten und Gruppen.",
    tabChats: "Chats & Freund:innen",
    tabGroups: "Gruppen",
    friendRequests: "Anfragen",
    friendsTitle: "Freund:innen",
    friendsCount: "{n} verbunden",
    findMore: "Mehr finden",
    conversations: "Unterhaltungen",
    searchChats: "Chats durchsuchen",
    noChats: "Noch keine Unterhaltungen",
    noChatsBody: "Schreib jemandem aus deinem Fach, um loszulegen.",
    noChatMatches: "Kein Chat passt zu „{q}“.",
    typing: "{name} schreibt",
    messagePlaceholder: "Nachricht schreiben …",
    send: "Senden",
    pickChat: "Wähle eine Unterhaltung",
    pickChatBody: "Direktnachrichten und Gruppenchats erscheinen hier.",
    membersN: "{n} Mitglieder",
    groupChat: "Gruppenchat",
    sysCreated: "Du hast die Gruppe gegründet.",
    sysInvited: "Du hast {names} eingeladen.",
    sysJoined: "{name} ist der Gruppe beigetreten.",
    sysYouJoined: "Du bist der Gruppe beigetreten.",
    chatStart: "Hier beginnt dein Chat mit {name}.",
    viewProfile: "Profil ansehen",

    createGroup: "Gruppe gründen",
    myGroups: "Meine Gruppen",
    discoverGroups: "Gruppen entdecken",
    joinGroup: "Beitreten",
    leaveGroup: "Verlassen",
    invite: "Einladen",
    uniWide: "Uniweit",
    invitedN: "{n} eingeladen",
    hiddenGroups: "{n} Gruppen für andere Fächer sind ausgeblendet.",
    hiddenGroups_one: "1 Gruppe für ein anderes Fach ist ausgeblendet.",
    noMyGroups: "Du bist noch in keiner Gruppe. Tritt unten einer bei oder gründe deine eigene.",
    allGroupsJoined: "Du bist in allen Gruppen, die dir offenstehen. Zeit, eine neue zu gründen!",

    cgTitle: "Gruppe gründen",
    cgLead: "Lerngruppe, Ersti-Crew oder Mensa-Stammtisch.",
    cgName: "Gruppenname",
    cgNamePlaceholder: "z. B. Lerngruppe Lineare Algebra",
    cgNameError: "Mindestens 3 Zeichen.",
    cgDesc: "Beschreibung",
    cgDescPlaceholder: "Worum geht's? Wann trefft ihr euch?",
    cgVisibility: "Sichtbarkeit",
    cgMajorOnly: "Nur mein Fach",
    cgMajorOnlyBody: "Nur {subject}-Studierende können sie finden und beitreten.",
    cgUniWide: "Uniweit",
    cgUniWideBody: "Alle an deiner Uni können sie finden und beitreten.",
    cgInvite: "Freund:innen einladen",
    selectAll: "Alle auswählen",
    selectNone: "Auswahl aufheben",
    notInSubject: "Nicht in {subject}",
    noFriendsToInvite: "Vernetz dich zuerst mit Leuten, dann kannst du sie hier einladen.",
    cgSubmit: "Gruppe gründen",
    cgSubmitInvite: "Gründen & {n} einladen",
    inviteTitle: "Zu „{group}“ einladen",
    inviteLead: "Wähle Freund:innen aus. Sie bekommen eine Benachrichtigung.",
    inviteSend: "{n} Einladungen senden",
    inviteSend_one: "1 Einladung senden",
    inviteNone: "Freund:innen auswählen",
    memberTag: "Mitglied",
    invitedTag: "Eingeladen",
    allFriendsInGroup: "Alle deine Freund:innen sind schon in dieser Gruppe.",

    about: "Über mich",
    whyMatch: "Warum ihr passt",
    goingTo: "Ist dabei bei",

    sbTitle: "Lernpartner:in finden",
    sbLead: "Sortiert nach Haupt-, Nebenfach und gemeinsamen Interessen.",
    sbMatch: "Match",
    sbSkip: "Überspringen",
    sbConnect: "Vernetzen",
    sbCounter: "{i} von {n}",
    sbDoneTitle: "Das war's fürs Erste",
    sbDoneBody: "Stöbere im ganzen Verzeichnis oder schau nach der nächsten Vorlesung wieder rein.",
    sbBrowse: "Alle Studierenden ansehen",
    sbRestart: "Von vorn",

    statFriends: "Freund:innen",
    statEvents: "Events",
    statGroups: "Gruppen",
    verifiedVia: "Verifiziert über {domain}",
    restartDemo: "Abmelden & Demo neu starten",
  },
};

const QUICK_REPLIES = {
  en: ["Mensa later?", "Study session this week?", "Haha, true"],
  de: ["Später Mensa?", "Diese Woche zusammen lernen?", "Haha, stimmt"],
};

// Simulated replies, picked by keyword so chats feel alive.
const REPLIES = {
  mensa: {
    en: [
      "Mensa sounds perfect. 12:30 at entrance B?",
      "I'm in! Apparently the Tagesgericht is Käsespätzle today 🧀",
      "Yes please, I'm starving. Meet at the tray return?",
    ],
    de: [
      "Mensa klingt perfekt. 12:30 an Eingang B?",
      "Bin dabei! Heute gibt's angeblich Käsespätzle 🧀",
      "Ja bitte, ich hab Hunger. Treffen an der Tablettrückgabe?",
    ],
  },
  study: {
    en: [
      "Good idea, the exam is closer than it looks 😅 Library, 2nd floor?",
      "I'm in. I'll bring my notes from the last lecture.",
      "Pomodoro style? 25 minutes focus, 5 minutes memes.",
    ],
    de: [
      "Gute Idee, die Klausur ist näher als gedacht 😅 Bib, 2. OG?",
      "Bin dabei. Ich bring meine Mitschrift aus der letzten Vorlesung mit.",
      "Pomodoro-Style? 25 Minuten Fokus, 5 Minuten Memes.",
    ],
  },
  party: {
    en: ["Count me in 🍻 Who else is coming?", "Only if we end up at the student pub after 😄"],
    de: ["Bin dabei 🍻 Wer kommt noch?", "Nur wenn wir danach noch in der Studikneipe landen 😄"],
  },
  thanks: {
    en: ["Anytime! 🙌", "No worries 😊"],
    de: ["Immer gern! 🙌", "Kein Ding 😊"],
  },
  greeting: {
    en: ["Hey! 👋 How's your semester going?", "Hi! Nice to hear from you 😊"],
    de: ["Hey! 👋 Wie läuft dein Semester?", "Hi! Schön, von dir zu hören 😊"],
  },
  question: {
    en: ["Good question 🤔 I'll check and get back to you after the lecture.", "Honestly not sure. Want to figure it out over coffee?"],
    de: ["Gute Frage 🤔 Ich schau nach und melde mich nach der Vorlesung.", "Ehrlich gesagt keine Ahnung. Wollen wir's beim Kaffee rausfinden?"],
  },
  generic: {
    en: ["Haha, true 😄", "Sounds good to me!", "Love that. Let's do it this week 🙌", "Totally. See you on campus!"],
    de: ["Haha, stimmt 😄", "Klingt gut!", "Find ich super. Lass uns das diese Woche machen 🙌", "Auf jeden Fall. Bis später auf dem Campus!"],
  },
};

const REPLY_RULES = [
  ["mensa", /mensa|lunch|essen|mittag|hunger|food|eat|kantine|tagesgericht|🍽/i],
  ["study", /lern|study|exam|klausur|bib\b|library|übung|uebung|lecture|vorlesung|homework|aufgabe|sheet|blatt|pomodoro|📚/i],
  ["party", /party|bier|beer|drinks?|kneipe|\bbar\b|feiern|club|techno|🍻/i],
  ["thanks", /thank|danke|thx|merci/i],
  ["greeting", /^(hi|hey|hallo|hello|moin|servus|na)\b/i],
  ["question", /\?\s*$/],
];

/* ────────────────────────────────────────────────────────────────────────────
 * Campus data (all mock)
 * ──────────────────────────────────────────────────────────────────────────── */

const DEMO_CODE = "482910";
const DEMO_EMAIL = "max.mustermann@tum.de";
const ME = "me";
const EVENT_DURATION = 90 * 60 * 1000;
const MIN_INTERESTS = 3;

const UNIVERSITIES = [
  {
    id: "tum",
    name: "Technische Universität München",
    short: "TUM",
    city: { en: "Munich", de: "München" },
    country: "DE",
    domains: ["tum.de", "mytum.de"],
  },
  {
    id: "lmu",
    name: "Ludwig-Maximilians-Universität München",
    short: "LMU",
    city: { en: "Munich", de: "München" },
    country: "DE",
    domains: ["lmu.de", "campus.lmu.de"],
  },
  { id: "rwth", name: "RWTH Aachen University", short: "RWTH", city: "Aachen", country: "DE", domains: ["rwth-aachen.de"] },
  { id: "hu", name: "Humboldt-Universität zu Berlin", short: "HU Berlin", city: "Berlin", country: "DE", domains: ["hu-berlin.de"] },
  { id: "fu", name: "Freie Universität Berlin", short: "FU Berlin", city: "Berlin", country: "DE", domains: ["fu-berlin.de", "zedat.fu-berlin.de"] },
  {
    id: "tub",
    name: "Technische Universität Berlin",
    short: "TU Berlin",
    city: "Berlin",
    country: "DE",
    domains: ["tu-berlin.de", "campus.tu-berlin.de"],
  },
  {
    id: "heidelberg",
    name: "Universität Heidelberg",
    short: "Uni Heidelberg",
    city: "Heidelberg",
    country: "DE",
    domains: ["uni-heidelberg.de", "stud.uni-heidelberg.de"],
  },
  {
    id: "koeln",
    name: "Universität zu Köln",
    short: "Uni Köln",
    city: { en: "Cologne", de: "Köln" },
    country: "DE",
    domains: ["uni-koeln.de", "smail.uni-koeln.de"],
  },
  { id: "hamburg", name: "Universität Hamburg", short: "UHH", city: "Hamburg", country: "DE", domains: ["uni-hamburg.de", "studium.uni-hamburg.de"] },
  {
    id: "frankfurt",
    name: "Goethe-Universität Frankfurt",
    short: "Goethe-Uni",
    city: { en: "Frankfurt", de: "Frankfurt am Main" },
    country: "DE",
    domains: ["uni-frankfurt.de", "stud.uni-frankfurt.de"],
  },
  { id: "kit", name: "Karlsruher Institut für Technologie", short: "KIT", city: "Karlsruhe", country: "DE", domains: ["kit.edu", "student.kit.edu"] },
  {
    id: "tud",
    name: "Technische Universität Dresden",
    short: "TU Dresden",
    city: "Dresden",
    country: "DE",
    domains: ["tu-dresden.de", "mailbox.tu-dresden.de"],
  },
  { id: "muenster", name: "Universität Münster", short: "Uni Münster", city: "Münster", country: "DE", domains: ["uni-muenster.de"] },
  { id: "freiburg", name: "Universität Freiburg", short: "Uni Freiburg", city: "Freiburg", country: "DE", domains: ["uni-freiburg.de"] },
  { id: "bonn", name: "Universität Bonn", short: "Uni Bonn", city: "Bonn", country: "DE", domains: ["uni-bonn.de"] },
  { id: "eth", name: "ETH Zürich", short: "ETH", city: { en: "Zurich", de: "Zürich" }, country: "CH", domains: ["ethz.ch", "student.ethz.ch"] },
  { id: "wien", name: "Universität Wien", short: "Uni Wien", city: { en: "Vienna", de: "Wien" }, country: "AT", domains: ["univie.ac.at"] },
  { id: "oxford", name: "University of Oxford", short: "Oxford", city: "Oxford", country: "GB", domains: ["ox.ac.uk"] },
  { id: "cambridge", name: "University of Cambridge", short: "Cambridge", city: "Cambridge", country: "GB", domains: ["cam.ac.uk"] },
  { id: "imperial", name: "Imperial College London", short: "Imperial", city: "London", country: "GB", domains: ["imperial.ac.uk", "ic.ac.uk"] },
  { id: "uva", name: "Universiteit van Amsterdam", short: "UvA", city: "Amsterdam", country: "NL", domains: ["uva.nl", "student.uva.nl"] },
  { id: "delft", name: "TU Delft", short: "TU Delft", city: "Delft", country: "NL", domains: ["tudelft.nl", "student.tudelft.nl"] },
  { id: "leuven", name: "KU Leuven", short: "KU Leuven", city: "Leuven", country: "BE", domains: ["kuleuven.be", "student.kuleuven.be"] },
  { id: "mit", name: "Massachusetts Institute of Technology", short: "MIT", city: "Cambridge, MA", country: "US", domains: ["mit.edu"] },
  { id: "stanford", name: "Stanford University", short: "Stanford", city: "Stanford", country: "US", domains: ["stanford.edu"] },
  { id: "berkeley", name: "University of California, Berkeley", short: "UC Berkeley", city: "Berkeley", country: "US", domains: ["berkeley.edu"] },
  { id: "toronto", name: "University of Toronto", short: "U of T", city: "Toronto", country: "CA", domains: ["utoronto.ca", "mail.utoronto.ca"] },
];
const UNI_BY_ID = Object.fromEntries(UNIVERSITIES.map((u) => [u.id, u]));

const MAJORS = [
  { id: "cs", en: "Computer Science", de: "Informatik", icon: Laptop, aliases: "cs informatics coding software" },
  { id: "med", en: "Medicine", de: "Medizin", icon: Stethoscope, aliases: "humanmedizin med doctor" },
  { id: "bwl", en: "Business Administration", de: "BWL", icon: Briefcase, aliases: "betriebswirtschaftslehre business management wirtschaft" },
  { id: "psy", en: "Psychology", de: "Psychologie", icon: Brain, aliases: "psych" },
  { id: "law", en: "Law", de: "Jura", icon: Scale, aliases: "rechtswissenschaft jus" },
  { id: "mech", en: "Mechanical Engineering", de: "Maschinenbau", icon: Cog, aliases: "mb engineering ingenieurwesen" },
  { id: "econ", en: "Economics", de: "VWL", icon: TrendingUp, aliases: "volkswirtschaftslehre wirtschaft" },
  { id: "math", en: "Mathematics", de: "Mathematik", icon: Sigma, aliases: "mathe maths" },
  { id: "phys", en: "Physics", de: "Physik", icon: Atom, aliases: "" },
  { id: "bio", en: "Biology", de: "Biologie", icon: Dna, aliases: "life sciences" },
  { id: "chem", en: "Chemistry", de: "Chemie", icon: FlaskConical, aliases: "" },
  { id: "ee", en: "Electrical Engineering", de: "Elektrotechnik", icon: Zap, aliases: "etechnik etit" },
  { id: "arch", en: "Architecture", de: "Architektur", icon: Landmark, aliases: "" },
  { id: "germ", en: "German Studies", de: "Germanistik", icon: BookOpen, aliases: "deutsch literature literatur" },
  { id: "polsci", en: "Political Science", de: "Politikwissenschaft", icon: Vote, aliases: "politik sowi politics" },
  { id: "edu", en: "Teacher Education", de: "Lehramt", icon: School, aliases: "teaching education pädagogik" },
  { id: "media", en: "Media Studies", de: "Medienwissenschaft", icon: Clapperboard, aliases: "medien film communication" },
  { id: "ling", en: "Linguistics", de: "Linguistik", icon: Languages, aliases: "sprachwissenschaft" },
];
const MAJOR_BY_ID = Object.fromEntries(MAJORS.map((m) => [m.id, m]));

const DEGREES = [
  { id: "bachelor", en: "Bachelor", de: "Bachelor" },
  { id: "master", en: "Master", de: "Master" },
  { id: "state", en: "State exam", de: "Staatsexamen" },
  { id: "phd", en: "PhD", de: "Promotion" },
];
const DEGREE_BY_ID = Object.fromEntries(DEGREES.map((d) => [d.id, d]));

const INTERESTS = [
  { id: "mensa_coffee", en: "Mensa Coffee", de: "Mensa-Kaffee" },
  { id: "board_games", en: "Board Games", de: "Brettspiele" },
  { id: "gym", en: "Gym", de: "Gym" },
  { id: "coding", en: "Coding", de: "Coden" },
  { id: "hiking", en: "Hiking", de: "Wandern" },
  { id: "techno", en: "Techno", de: "Techno" },
  { id: "study_buddy", en: "Study Buddy", de: "Lernpartner:in" },
  { id: "language_exchange", en: "Language Exchange", de: "Sprachtandem" },
  { id: "football", en: "Football", de: "Fußball" },
  { id: "climbing", en: "Bouldering", de: "Bouldern" },
  { id: "cooking", en: "Cooking", de: "Kochen" },
  { id: "gaming", en: "Gaming", de: "Gaming" },
  { id: "photography", en: "Photography", de: "Fotografie" },
  { id: "music", en: "Making Music", de: "Musik machen" },
  { id: "running", en: "Running", de: "Laufen" },
  { id: "yoga", en: "Yoga", de: "Yoga" },
  { id: "film", en: "Film Nights", de: "Filmabende" },
  { id: "art", en: "Art & Design", de: "Kunst & Design" },
  { id: "politics", en: "Politics", de: "Politik" },
  { id: "travel", en: "Travel", de: "Reisen" },
  { id: "chess", en: "Chess", de: "Schach" },
  { id: "startups", en: "Startups", de: "Start-ups" },
  { id: "volunteering", en: "Volunteering", de: "Ehrenamt" },
  { id: "nightlife", en: "Nightlife", de: "Feiern gehen" },
];
const INTEREST_BY_ID = Object.fromEntries(INTERESTS.map((i) => [i.id, i]));

const EVENT_TYPES = [
  {
    id: "mensa",
    icon: Utensils,
    label: { en: "Mensa Meetup", de: "Mensa-Treff" },
    title: { en: "Mensa lunch, who's in?", de: "Mensa, wer kommt mit?" },
    time: "12:30",
    max: 6,
  },
  {
    id: "coffee",
    icon: Coffee,
    label: { en: "Coffee Break", de: "Kaffeepause" },
    title: { en: "Quick coffee between lectures", de: "Schneller Kaffee zwischen den Vorlesungen" },
    time: "10:00",
    max: 4,
  },
  {
    id: "study",
    icon: BookOpen,
    label: { en: "Study Session", de: "Lernsession" },
    title: { en: "Pomodoro study session", de: "Pomodoro-Lernsession" },
    time: "14:00",
    max: 6,
  },
  {
    id: "sport",
    icon: Dumbbell,
    label: { en: "Campus Sport", de: "Unisport" },
    title: { en: "Volleyball after lectures", de: "Volleyball nach der Uni" },
    time: "17:30",
    max: 12,
  },
  {
    id: "party",
    icon: Beer,
    label: { en: "Party / Night Out", de: "Party / Ausgehen" },
    title: { en: "Drinks at the student pub", de: "Feierabendbier in der Studikneipe" },
    time: "20:30",
    max: 15,
  },
];
const EVENT_TYPE_BY_ID = Object.fromEntries(EVENT_TYPES.map((e) => [e.id, e]));

// Avatars are initials on a soft tint: students get one by position, the user picks theirs.
const AVATAR_TINTS = {
  indigo: "bg-indigo-50 text-indigo-700",
  sky: "bg-sky-50 text-sky-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-800",
  rose: "bg-rose-50 text-rose-700",
  zinc: "bg-zinc-100 text-zinc-700",
};
const TINT_ORDER = Object.keys(AVATAR_TINTS);

const LOCATIONS = {
  mensa: [
    { en: "Main Mensa – Entrance B", de: "Hauptmensa – Eingang B" },
    { en: "North Campus Mensa", de: "Mensa am Campus Nord" },
    { en: "Cafeteria, lecture hall building", de: "Cafeteria im Hörsaalgebäude" },
  ],
  coffee: [
    { en: "Courtyard Café", de: "Café im Innenhof" },
    { en: "Library café, ground floor", de: "Bib-Café, Erdgeschoss" },
  ],
  study: [
    { en: "Main Library, 2nd floor", de: "Zentralbibliothek, 2. OG" },
    { en: "Learning centre, room 0.12", de: "Lernzentrum, Raum 0.12" },
  ],
  sport: [
    { en: "Uni sports centre", de: "Hochschulsportzentrum" },
    { en: "Beach volleyball courts", de: "Beachvolleyballfelder" },
  ],
  party: [
    { en: "Student pub “Die Kurve”", de: "Studikneipe „Die Kurve“" },
    { en: "Dorm bar, building C", de: "Wohnheim-Bar, Haus C" },
  ],
};

const MENSA_MENU = [
  { name: { en: "Lentil dal with basmati rice", de: "Linsen-Dal mit Basmatireis" }, price: 2.3, tag: "vegan" },
  { name: { en: "Cheese spätzle with crispy onions", de: "Käsespätzle mit Röstzwiebeln" }, price: 2.9, tag: "veggie" },
  { name: { en: "Schnitzel with fries", de: "Schnitzel mit Pommes" }, price: 3.6, tag: null },
];

const BASE_STUDENTS = [
  {
    id: "s1",
    name: "Lena Hoffmann",
    major: "cs",
    minor: "psy",
    semester: 3,
    degree: "bachelor",
    online: true,
    interests: ["coding", "board_games", "mensa_coffee", "hiking"],
    bio: {
      en: "Building tiny apps between lectures. Will trade debugging help for Mensa coffee.",
      de: "Baue kleine Apps zwischen den Vorlesungen. Tausche Debugging-Hilfe gegen Mensa-Kaffee.",
    },
  },
  {
    id: "s2",
    name: "Jonas Weber",
    major: "bwl",
    minor: "cs",
    semester: 5,
    degree: "bachelor",
    online: false,
    interests: ["gym", "startups", "techno", "football"],
    bio: {
      en: "Founding my first startup. Up for Mensa lunch any weekday at 12:30.",
      de: "Gründe gerade mein erstes Start-up. Werktags um 12:30 immer für die Mensa zu haben.",
    },
  },
  {
    id: "s3",
    name: "Aylin Demir",
    major: "psy",
    minor: "ling",
    semester: 2,
    degree: "bachelor",
    online: true,
    interests: ["language_exchange", "yoga", "film", "mensa_coffee"],
    bio: {
      en: "Psychology nerd and tea snob. Looking for a Turkish–German tandem partner.",
      de: "Psychologie-Nerd und Tee-Snob. Suche ein Tandem Türkisch–Deutsch.",
    },
  },
  {
    id: "s4",
    name: "Mateo García",
    major: "mech",
    minor: "econ",
    semester: 4,
    degree: "bachelor",
    online: true,
    interests: ["football", "climbing", "cooking", "language_exchange"],
    bio: {
      en: "From Valencia. Building a Formula Student car and cooking paella for anyone who helps.",
      de: "Aus Valencia. Schraube am Formula-Student-Auto und koche Paella für alle, die helfen.",
    },
  },
  {
    id: "s5",
    name: "Priya Sharma",
    major: "med",
    minor: null,
    semester: 6,
    degree: "state",
    online: false,
    interests: ["study_buddy", "running", "cooking", "volunteering"],
    bio: {
      en: "Survived the Physikum. Anatomy flashcards in the morning, running club at night.",
      de: "Physikum überlebt. Morgens Anatomie-Karteikarten, abends Lauftreff.",
    },
  },
  {
    id: "s6",
    name: "Lukas Schmidt",
    major: "law",
    minor: "polsci",
    semester: 7,
    degree: "state",
    online: false,
    interests: ["chess", "politics", "mensa_coffee", "running"],
    bio: {
      en: "Deep in Examen prep. A game of chess in the Mensa after lunch? Always.",
      de: "Mitten in der Examensvorbereitung. Nach dem Mittag eine Partie Schach in der Mensa? Immer.",
    },
  },
  {
    id: "s7",
    name: "Sophie Becker",
    major: "cs",
    minor: "math",
    semester: 1,
    degree: "bachelor",
    online: true,
    interests: ["gaming", "coding", "board_games", "techno"],
    bio: {
      en: "Ersti! Still getting lost in the maths building. Show me the good Mensa.",
      de: "Ersti! Verlaufe mich noch im Mathebau. Zeig mir die gute Mensa.",
    },
  },
  {
    id: "s8",
    name: "Kofi Mensah",
    major: "econ",
    minor: "polsci",
    semester: 3,
    degree: "bachelor",
    online: true,
    interests: ["football", "music", "travel", "language_exchange"],
    bio: { en: "Accra → campus. Economics, Afrobeats and long walks to the Mensa.", de: "Accra → Campus. VWL, Afrobeats und lange Wege zur Mensa." },
  },
  {
    id: "s9",
    name: "Elif Yılmaz",
    major: "arch",
    minor: null,
    semester: 5,
    degree: "bachelor",
    online: false,
    interests: ["photography", "art", "hiking", "nightlife"],
    bio: {
      en: "Model building at 2 a.m. is a lifestyle. Always hunting for good light.",
      de: "Modellbau um 2 Uhr nachts ist ein Lebensstil. Immer auf der Suche nach gutem Licht.",
    },
  },
  {
    id: "s10",
    name: "Noah Fischer",
    major: "phys",
    minor: "cs",
    semester: 4,
    degree: "bachelor",
    online: true,
    interests: ["climbing", "coding", "chess", "study_buddy"],
    bio: {
      en: "Quantum mechanics by day, bouldering by night. Looking for a study partner for Theo II.",
      de: "Tagsüber Quantenmechanik, abends Bouldern. Suche Lernpartner:in für Theo II.",
    },
  },
  {
    id: "s11",
    name: "Hannah Schulz",
    major: "bio",
    minor: "chem",
    semester: 2,
    degree: "bachelor",
    online: false,
    interests: ["hiking", "volunteering", "photography", "yoga"],
    bio: {
      en: "Lab coat on weekdays, hiking boots on weekends. Ask me about mosses.",
      de: "Unter der Woche im Laborkittel, am Wochenende in Wanderschuhen. Frag mich nach Moosen.",
    },
  },
  {
    id: "s12",
    name: "Yuki Tanaka",
    major: "germ",
    minor: "ling",
    semester: 3,
    degree: "master",
    online: true,
    interests: ["language_exchange", "music", "film", "board_games"],
    bio: {
      en: "Here on exchange from Osaka. Reading Kafka slowly, loving the Mensa Käsespätzle.",
      de: "Im Auslandssemester aus Osaka hier. Lese langsam Kafka und liebe die Käsespätzle in der Mensa.",
    },
  },
  {
    id: "s13",
    name: "Amara Okafor",
    major: "med",
    minor: "psy",
    semester: 3,
    degree: "state",
    online: true,
    interests: ["running", "gym", "music", "study_buddy"],
    bio: {
      en: "Medicine with a soft spot for neuroscience. Gym at 7, lectures at 8.",
      de: "Medizin mit Faible für Neurowissenschaften. Um 7 ins Gym, um 8 in die Vorlesung.",
    },
  },
  {
    id: "s14",
    name: "Finn Neumann",
    major: "bwl",
    minor: "psy",
    semester: 1,
    degree: "bachelor",
    online: false,
    interests: ["techno", "nightlife", "football", "startups"],
    bio: {
      en: "Brand-new Ersti. I'm organizing the pub crawl, so blame me for Thursday morning.",
      de: "Ganz frisch an der Uni. Ich organisiere die Kneipentour, Donnerstagmorgen geht also auf mich.",
    },
  },
  {
    id: "s15",
    name: "Clara Wolf",
    major: "psy",
    minor: "cs",
    semester: 4,
    degree: "bachelor",
    online: true,
    interests: ["board_games", "art", "film", "study_buddy"],
    bio: {
      en: "Stats tutor with a board game collection that's getting out of hand.",
      de: "Statistik-Tutorin mit einer Brettspielsammlung, die langsam außer Kontrolle gerät.",
    },
  },
  {
    id: "s16",
    name: "Omar Haddad",
    major: "cs",
    minor: "bwl",
    semester: 5,
    degree: "bachelor",
    online: false,
    interests: ["coding", "startups", "gym", "gaming"],
    bio: {
      en: "Working student at a startup, hackathon regular. Happy to look over your code.",
      de: "Werkstudent in einem Start-up, Stammgast bei Hackathons. Schau mir gern deinen Code an.",
    },
  },
];

// Extra peers generated for whichever Hauptfach the user picks, so the app never feels empty.
const PEER_NAMES = ["Mia Wagner", "Paul Zimmermann", "Zeynep Kaya", "Felix Braun", "Ana Silva", "Chen Wei", "Emma Richter", "Leon Krüger"];
const PEER_BIOS = [
  (M, n) => ({
    en: `${M.en}, semester ${n}. Looking for people to get through the semester with, Mensa included.`,
    de: `${M.de} im ${n}. Semester. Suche Leute, um gemeinsam durchs Semester zu kommen, Mensa inklusive.`,
  }),
  (M) => ({
    en: `Happy to share notes and old exams in ${M.en}. Coffee is my love language.`,
    de: `Teile gern Mitschriften und Altklausuren in ${M.de}. Kaffee ist meine Liebessprache.`,
  }),
  (M) => ({
    en: `Still fairly new to ${M.en}. Let's start a study group before exam season.`,
    de: `Noch recht neu in ${M.de}. Lass uns vor der Klausurphase eine Lerngruppe gründen.`,
  }),
  (M) => ({
    en: `${M.en} by day, board games by night. Always up for a library session.`,
    de: `Tagsüber ${M.de}, abends Brettspiele. Immer für eine Session in der Bib zu haben.`,
  }),
];

// `at` is a wall-clock time; it rolls over to the next day once it has passed.
const BASE_EVENTS = [
  {
    id: "e1",
    type: "mensa",
    at: { h: 12, m: 30 },
    host: "s1",
    attendees: ["s1", "s3", "s8"],
    max: 8,
    audience: "open",
    title: { en: "Mensa lunch: Tagesgericht & chill", de: "Mensa: Tagesgericht & quatschen" },
    location: { en: "Main Mensa – Entrance B", de: "Hauptmensa – Eingang B" },
    description: { en: "Big table by the window. Look for the green tote bag.", de: "Großer Tisch am Fenster. Achtet auf den grünen Jutebeutel." },
  },
  {
    id: "e2",
    type: "study",
    live: true,
    host: "s10",
    attendees: ["s10", "s16", "s5"],
    max: 6,
    audience: "open",
    title: { en: "Library Pomodoro session", de: "Pomodoro-Session in der Bib" },
    location: { en: "Main Library, 2nd floor, group room 4", de: "Zentralbibliothek, 2. OG, Gruppenraum 4" },
    description: {
      en: "25 minutes focus, 5 minutes break. Bring your own exercise sheets.",
      de: "25 Minuten Fokus, 5 Minuten Pause. Bring deine eigenen Übungsblätter mit.",
    },
  },
  {
    id: "e3",
    type: "coffee",
    at: { h: 10, m: 15 },
    host: "s3",
    attendees: ["s3", "s15"],
    max: 5,
    audience: "major",
    subject: "psy",
    title: { en: "Coffee & statistics panic", de: "Kaffee & Statistik-Panik" },
    location: { en: "Courtyard Café", de: "Café im Innenhof" },
    description: {
      en: "Let's go through the SPSS exercises together before the tutorial.",
      de: "Wir gehen vor dem Tutorium zusammen die SPSS-Übungen durch.",
    },
  },
  {
    id: "e4",
    type: "sport",
    at: { h: 17, m: 30 },
    host: "s4",
    attendees: ["s4", "s2", "s11", "s8", "s13"],
    max: 12,
    audience: "open",
    approval: true,
    title: { en: "Beach volleyball after lectures", de: "Beachvolleyball nach der Uni" },
    location: { en: "Uni sports centre, court 2", de: "Hochschulsportzentrum, Feld 2" },
    description: {
      en: "All levels welcome. Mateo keeps track so the teams stay even.",
      de: "Alle Level willkommen. Mateo achtet darauf, dass die Teams aufgehen.",
    },
  },
  {
    id: "e5",
    type: "party",
    at: { h: 21, m: 0 },
    host: "s14",
    attendees: ["s14", "s2", "s7", "s9", "s12", "s6"],
    max: 25,
    audience: "open",
    title: { en: "Ersti pub crawl", de: "Ersti-Kneipentour" },
    location: { en: "Meet at the Mensa steps", de: "Treffpunkt: Mensatreppe" },
    description: {
      en: "Four bars, one stamp card. Non-drinkers very welcome.",
      de: "Vier Kneipen, eine Stempelkarte. Auch ohne Alkohol herzlich willkommen.",
    },
  },
  {
    id: "e6",
    type: "study",
    at: { h: 14, m: 0 },
    host: "s5",
    attendees: ["s5", "s13"],
    max: 4,
    audience: "major",
    subject: "med",
    title: { en: "Anatomy flashcards before the Testat", de: "Anatomie-Karteikarten vorm Testat" },
    location: { en: "Learning centre, room 0.12", de: "Lernzentrum, Raum 0.12" },
    description: { en: "Upper limb muscles. Bring your Anki deck.", de: "Muskeln der oberen Extremität. Bring dein Anki-Deck mit." },
  },
  {
    id: "e7",
    type: "mensa",
    at: { h: 12, m: 0, day: 1 },
    host: "s16",
    attendees: ["s16", "s1", "s7"],
    max: 6,
    audience: "major",
    subject: "cs",
    title: { en: "Informatik Mensa table", de: "Informatik-Mensatisch" },
    location: { en: "North Campus Mensa", de: "Mensa am Campus Nord" },
    description: {
      en: "Weekly lunch for CS students. We usually end up arguing about tabs vs. spaces.",
      de: "Wöchentliches Mittagessen der Informatik. Meistens streiten wir über Tabs vs. Leerzeichen.",
    },
  },
  {
    id: "e8",
    type: "study",
    at: { h: 18, m: 0, day: 1 },
    host: "s2",
    attendees: ["s2", "s14"],
    max: 8,
    audience: "major",
    subject: "bwl",
    title: { en: "Case study night: marketing exam", de: "Fallstudien-Abend: Marketing-Klausur" },
    location: { en: "Lecture hall building, room 2.07", de: "Hörsaalgebäude, Raum 2.07" },
    description: {
      en: "We go through last year's exam case by case. The Fachschaft pays for pizza.",
      de: "Wir gehen die Altklausur Fall für Fall durch. Die Pizza zahlt die Fachschaft.",
    },
  },
];

const BASE_GROUPS = [
  {
    id: "g1",
    name: "Informatik Ersti-Gruppe",
    audience: "major",
    subject: "cs",
    members: ["s7", "s1", "s16"],
    extra: 41,
    description: {
      en: "Survival tips for your first semester: Mensa hacks, old exams and where room 00.13 actually is.",
      de: "Überlebenstipps fürs erste Semester: Mensa-Hacks, Altklausuren und wo Raum 00.13 wirklich ist.",
    },
  },
  {
    id: "g2",
    name: "Mensa Gourmets",
    audience: "open",
    members: ["s12", "s8", "s1", "s3"],
    extra: 128,
    description: {
      en: "Daily Tagesgericht ratings and a shared table at 12:30 sharp.",
      de: "Tägliche Bewertung des Tagesgerichts und ein gemeinsamer Tisch um Punkt 12:30.",
    },
  },
  {
    id: "g3",
    name: "BWL Lerngruppe",
    audience: "major",
    subject: "bwl",
    members: ["s2", "s14"],
    extra: 17,
    description: {
      en: "Accounting, marketing and statistics. We meet Tuesdays in the library.",
      de: "ReWe, Marketing und Statistik. Wir treffen uns dienstags in der Bib.",
    },
  },
  {
    id: "g4",
    name: "Campus Boulder Crew",
    audience: "open",
    members: ["s10", "s4", "s11"],
    extra: 36,
    description: {
      en: "Bouldering twice a week at the uni gym. Beginners get a free intro.",
      de: "Zweimal pro Woche Bouldern in der Uni-Halle. Wer neu ist, bekommt eine Einführung.",
    },
  },
  {
    id: "g5",
    name: "Tandem Café",
    audience: "open",
    members: ["s3", "s12", "s4", "s8"],
    extra: 52,
    description: {
      en: "Language exchange every Thursday at 18:00: German, English, Spanish, Turkish, Japanese and more.",
      de: "Sprachtandem jeden Donnerstag um 18 Uhr: Deutsch, Englisch, Spanisch, Türkisch, Japanisch und mehr.",
    },
  },
  {
    id: "g6",
    name: "Medizin Physikum-Crew",
    audience: "major",
    subject: "med",
    members: ["s5", "s13"],
    extra: 23,
    description: {
      en: "Anki decks, Testat dates and moral support until the Physikum.",
      de: "Anki-Decks, Testat-Termine und moralischer Beistand bis zum Physikum.",
    },
  },
];

const GROUP_SEED = {
  g1: [
    { from: "s7", ago: 95, text: { en: "Does anyone know where room 00.13 is? 😭", de: "Weiß jemand, wo Raum 00.13 ist? 😭" } },
    {
      from: "s16",
      ago: 92,
      text: {
        en: "Ground floor, past the coffee machine. Just follow the smell ☕",
        de: "Erdgeschoss, hinter dem Kaffeeautomaten. Einfach dem Geruch folgen ☕",
      },
    },
    {
      from: "s1",
      ago: 31,
      text: {
        en: "Reminder: the Fachschaft has old exams for Discrete Maths!",
        de: "Reminder: Die Fachschaft hat Altklausuren für Diskrete Strukturen!",
      },
    },
  ],
  g2: [
    {
      from: "s12",
      ago: 140,
      text: {
        en: "Today's Tagesgericht: Käsespätzle. 8/10, would queue again.",
        de: "Tagesgericht heute: Käsespätzle. 8/10, würde wieder anstehen.",
      },
    },
    { from: "s8", ago: 126, text: { en: "Table by the window at 12:30?", de: "Tisch am Fenster um 12:30?" } },
    {
      from: "s3",
      ago: 121,
      text: { en: "Saving seats! Look for the green tote bag 💚", de: "Ich halte Plätze frei! Achtet auf den grünen Jutebeutel 💚" },
    },
  ],
  g3: [
    {
      from: "s2",
      ago: 300,
      text: { en: "Accounting exercise 4 is cursed. Has anyone solved it?", de: "ReWe-Aufgabe 4 ist verflucht. Hat die schon jemand gelöst?" },
    },
    {
      from: "s14",
      ago: 280,
      text: { en: "Tuesday in the library, I'll explain it with pizza 🍕", de: "Dienstag in der Bib, ich erklär's mit Pizza 🍕" },
    },
  ],
  g4: [
    {
      from: "s10",
      ago: 400,
      text: { en: "New routes at the uni gym! The yellow one is evil.", de: "Neue Routen in der Uni-Halle! Die gelbe ist fies." },
    },
    { from: "s11", ago: 385, text: { en: "Thursday at 19:00? I'll bring chalk.", de: "Donnerstag um 19 Uhr? Ich bring Chalk mit." } },
  ],
  g5: [
    {
      from: "s4",
      ago: 600,
      text: {
        en: "¿Alguien para practicar español? I can help with German grammar in return.",
        de: "¿Alguien para practicar español? Helfe dafür gern mit deutscher Grammatik.",
      },
    },
    { from: "s12", ago: 570, text: { en: "Anyone up for a Japanese–German tandem? 🇯🇵", de: "Jemand Lust auf ein Tandem Japanisch–Deutsch? 🇯🇵" } },
  ],
  g6: [
    {
      from: "s5",
      ago: 220,
      text: { en: "Testat dates are online. Upper limb comes first 💀", de: "Testat-Termine sind online. Obere Extremität kommt zuerst 💀" },
    },
    {
      from: "s13",
      ago: 205,
      text: { en: "Anki deck updated, link is in the description!", de: "Anki-Deck aktualisiert, der Link steht in der Beschreibung!" },
    },
  ],
};

// Two active DM threads; "them" is filled in with a friend when the world is built.
const DM_SEED = [
  [
    {
      from: "them",
      ago: 52,
      text: {
        en: "Did you get the exercise sheet for Thursday? I'm stuck on task 3 😅",
        de: "Hast du das Übungsblatt für Donnerstag schon? Ich häng bei Aufgabe 3 fest 😅",
      },
    },
    {
      from: ME,
      ago: 47,
      text: {
        en: "Not yet. Library after lunch? Then we'll do it together.",
        de: "Noch nicht. Nach dem Mittag in die Bib? Dann machen wir's zusammen.",
      },
    },
    {
      from: "them",
      ago: 44,
      text: {
        en: "Deal! Mensa first though, the Tagesgericht looks decent today 🍝",
        de: "Deal! Aber erst Mensa, das Tagesgericht sieht heute ganz gut aus 🍝",
      },
    },
  ],
  [
    { from: "them", ago: 190, text: { en: "Are you coming to Tandem Café on Thursday?", de: "Kommst du Donnerstag zum Tandem Café?" } },
    { from: ME, ago: 176, text: { en: "Probably! What time again?", de: "Wahrscheinlich! Wann nochmal?" } },
    {
      from: "them",
      ago: 171,
      text: { en: "18:00 at the Courtyard Café. Bring someone if you like 🙂", de: "18 Uhr im Café im Innenhof. Bring gern jemanden mit 🙂" },
    },
  ],
];

const PERSONAL_PROVIDERS = {
  "gmail.com": "Gmail",
  "googlemail.com": "Gmail",
  "yahoo.com": "Yahoo",
  "yahoo.de": "Yahoo",
  "ymail.com": "Yahoo",
  "outlook.com": "Outlook",
  "outlook.de": "Outlook",
  "hotmail.com": "Hotmail",
  "hotmail.de": "Hotmail",
  "live.com": "Outlook",
  "live.de": "Outlook",
  "msn.com": "MSN",
  "icloud.com": "iCloud",
  "me.com": "iCloud",
  "mac.com": "iCloud",
  "aol.com": "AOL",
  "gmx.de": "GMX",
  "gmx.net": "GMX",
  "gmx.at": "GMX",
  "gmx.ch": "GMX",
  "web.de": "WEB.DE",
  "t-online.de": "T-Online",
  "freenet.de": "freenet",
  "posteo.de": "Posteo",
  "mailbox.org": "mailbox.org",
  "proton.me": "Proton Mail",
  "protonmail.com": "Proton Mail",
  "pm.me": "Proton Mail",
  "tutanota.com": "Tuta",
  "tuta.io": "Tuta",
  "yandex.com": "Yandex",
  "yandex.ru": "Yandex",
  "mail.ru": "Mail.ru",
  "zoho.com": "Zoho",
  "mail.com": "mail.com",
  "mail.de": "mail.de",
  "arcor.de": "Arcor",
};
const PROVIDER_PREFIXES = { yahoo: "Yahoo", hotmail: "Hotmail", outlook: "Outlook", live: "Outlook", gmx: "GMX" };

// Academic domains that don't follow the .edu / .ac.xx / uni-*.de patterns.
const EXTRA_ACADEMIC_DOMAINS = [
  "uzh.ch",
  "unibas.ch",
  "unibe.ch",
  "unisg.ch",
  "epfl.ch",
  "unil.ch",
  "fau.de",
  "rub.de",
  "uni.lu",
  "vu.nl",
  "uu.nl",
  "leidenuniv.nl",
  "rug.nl",
  "eur.nl",
  "tue.nl",
  "utwente.nl",
  "ku.dk",
  "dtu.dk",
  "kth.se",
  "lu.se",
  "su.se",
  "uio.no",
  "ntnu.no",
  "helsinki.fi",
  "aalto.fi",
  "unimi.it",
  "polimi.it",
  "unibo.it",
  "uniroma1.it",
  "uam.es",
  "ucm.es",
  "sorbonne-universite.fr",
  "sciencespo.fr",
  "mcgill.ca",
  "ubc.ca",
  "cuni.cz",
  "tcd.ie",
  "ucd.ie",
];

const DEMO_PROFILE = {
  name: "Max Mustermann",
  email: DEMO_EMAIL,
  uni: UNI_BY_ID.tum,
  major: "cs",
  minor: "psy",
  semester: 3,
  degree: "bachelor",
  interests: ["coding", "mensa_coffee", "board_games", "hiking", "study_buddy"],
  bio: {
    en: "Computer Science, semester 3. Mensa at 12:30, board games on Fridays.",
    de: "Informatik im 3. Semester. Mensa um 12:30, freitags Spieleabend.",
  },
  avatarColor: "indigo",
};

/* ────────────────────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────────────────────── */

const cx = (...classes) => classes.filter(Boolean).join(" ");
const LOCALES = { en: "en-GB", de: "de-DE" };

function tx(value, lang) {
  if (value == null) return "";
  if (typeof value === "object") return value[lang] ?? value.en ?? "";
  return String(value);
}

let idCounter = 0;
const uid = (prefix = "id") => `${prefix}-${Date.now().toString(36)}-${(idCounter++).toString(36)}`;

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
const firstName = (name) => name.split(/\s+/)[0];
const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// mulberry32: small seeded PRNG so generated peers stay stable for a given profile.
function seededRandom(seed) {
  let a = seed || 1;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(list, rand = Math.random) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const domainOf = (email) => (email.split("@")[1] || "").toLowerCase();
const matchesDomain = (domain, d) => domain === d || domain.endsWith(`.${d}`);

function nameFromEmail(email) {
  const local = (email.split("@")[0] || "").replace(/\d+/g, "");
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function detectUni(email) {
  const domain = domainOf(email);
  if (!domain) return null;
  return UNIVERSITIES.find((u) => u.domains.some((d) => matchesDomain(domain, d))) || null;
}

function checkUniEmail(raw) {
  const email = raw.trim().toLowerCase();
  if (!/^[^\s@]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(email)) return { ok: false, code: "format" };
  const domain = domainOf(email);
  if (PERSONAL_PROVIDERS[domain]) return { ok: false, code: "personal", provider: PERSONAL_PROVIDERS[domain], domain };
  const academic =
    /(^|\.)edu(\.[a-z]{2})?$/.test(domain) ||
    /(^|\.)ac\.[a-z]{2}$/.test(domain) ||
    /(^|\.)(uni|tu|th|fh|hs|ph)-[a-z0-9-]+\.(de|at|ch)$/.test(domain) ||
    /(^|\.)(univ|universit|hochschule)[a-z-]*\./.test(domain) ||
    /^(stud|student|students|studium|campus|smail)\./.test(domain) ||
    UNIVERSITIES.some((u) => u.domains.some((d) => matchesDomain(domain, d))) ||
    EXTRA_ACADEMIC_DOMAINS.some((d) => matchesDomain(domain, d));
  if (academic) return { ok: true, domain };
  const provider = PROVIDER_PREFIXES[domain.split(".")[0]];
  if (provider) return { ok: false, code: "personal", provider, domain };
  return { ok: false, code: "domain", domain };
}

/* Dates */

function atNext({ h, m, day = 0 }, now) {
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  d.setDate(d.getDate() + day);
  if (d.getTime() < now - 10 * 60 * 1000) d.setDate(d.getDate() + 1);
  return d.getTime();
}

function liveStart(now) {
  const d = new Date(now - 20 * 60 * 1000);
  d.setMinutes(d.getMinutes() - (d.getMinutes() % 5), 0, 0);
  return d.getTime();
}

const sameDay = (a, b) => new Date(a).toDateString() === new Date(b).toDateString();
function dayBucket(ts, now) {
  if (sameDay(ts, now)) return "today";
  if (sameDay(ts, now + 864e5)) return "tomorrow";
  return "later";
}

const pad2 = (n) => String(n).padStart(2, "0");
function toDateInput(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function fromInputs(date, time) {
  if (!date || !time) return NaN;
  return new Date(`${date}T${time}`).getTime();
}
function defaultSlot(time, now) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  if (d.getTime() < now + 15 * 60 * 1000) d.setDate(d.getDate() + 1);
  return { date: toDateInput(d.getTime()), time };
}

const fmtTime = (ts, lang) => new Intl.DateTimeFormat(LOCALES[lang], { hour: "2-digit", minute: "2-digit" }).format(ts);
function fmtDay(ts, now, lang, t) {
  const bucket = dayBucket(ts, now);
  if (bucket === "today") return t("today");
  if (bucket === "tomorrow") return t("tomorrow");
  return new Intl.DateTimeFormat(LOCALES[lang], { weekday: "short", day: "numeric", month: "short" }).format(ts);
}
function fmtWhen(ev, now, lang, t) {
  if (isLive(ev, now)) return t("liveNow");
  const mins = Math.round((ev.start - now) / 60000);
  if (mins >= 0 && mins < 60) return t("inMin", { n: Math.max(1, mins) });
  return `${fmtDay(ev.start, now, lang, t)} · ${fmtTime(ev.start, lang)}`;
}
function fmtAgo(ts, now, t) {
  const mins = Math.floor((now - ts) / 60000);
  if (mins < 1) return t("now");
  if (mins < 60) return t("minAgo", { n: mins });
  const hours = Math.floor(mins / 60);
  if (hours < 24) return t("hAgo", { n: hours });
  return t("dAgo", { n: Math.floor(hours / 24) });
}
const fmtPrice = (n, lang) => new Intl.NumberFormat(LOCALES[lang], { style: "currency", currency: "EUR" }).format(n);
function fmtList(items, lang) {
  try {
    return new Intl.ListFormat(LOCALES[lang], { style: "long", type: "conjunction" }).format(items);
  } catch {
    return items.join(", ");
  }
}

// German universities run a winter (Oct–Mar) and a summer (Apr–Sep) semester.
function termLabel(now, t) {
  const d = new Date(now);
  const y = d.getFullYear() % 100;
  const month = d.getMonth();
  if (month >= 9) return t("termWinter", { y: `${y}/${y + 1}` });
  if (month <= 2) return t("termWinter", { y: `${y - 1}/${y}` });
  return t("termSummer", { y });
}

/* Campus logic */

const isLive = (ev, now) => ev.start <= now && now < ev.start + EVENT_DURATION;
const isUpcoming = (ev, now) => ev.start + EVENT_DURATION > now;

// Events and groups are either open to everyone or restricted to one subject (as Hauptfach or Nebenfach).
const canAccess = (item, profile) =>
  item.audience === "open" ||
  item.host === ME ||
  (item.members && item.members.includes(ME)) ||
  item.subject === profile.major ||
  (!!profile.minor && item.subject === profile.minor);
const studentCanAccess = (s, item) => item.audience === "open" || s.major === item.subject || s.minor === item.subject;

function matchInfo(profile, s) {
  const reasons = [];
  let score = 0;
  if (s.major === profile.major) {
    score += 50;
    reasons.push({ key: "mSameMajor", subject: s.major });
  }
  if (profile.minor && s.minor === profile.minor) {
    score += 25;
    reasons.push({ key: "mSameMinor", subject: profile.minor });
  }
  if (profile.minor && s.major === profile.minor) {
    score += 20;
    reasons.push({ key: "mStudiesYourMinor", subject: profile.minor });
  }
  if (s.minor && s.minor === profile.major) {
    score += 18;
    reasons.push({ key: "mMinorsInYourMajor", subject: profile.major });
  }
  const shared = s.interests.filter((i) => profile.interests.includes(i));
  score += shared.length * 9;
  if (Math.abs(s.semester - profile.semester) <= 1) score += 4;
  return { score, reasons, shared, relevant: reasons.length > 0 || shared.length > 0, pct: Math.min(98, 48 + Math.round(score * 0.5)) };
}

// Builds the campus around the new profile: mock students plus generated peers in the
// user's Hauptfach, events, groups, two friends with active chats and one incoming request.
function buildWorld(profile, now) {
  const M = MAJOR_BY_ID[profile.major];
  const rand = seededRandom(hashString(`${profile.email}|${profile.major}|${profile.minor || ""}`));
  const students = BASE_STUDENTS.map((s, i) => ({ ...s, hue: i % TINT_ORDER.length }));

  const baseSameMajor = students.filter((s) => s.major === profile.major).length;
  const otherSubjects = MAJORS.map((m) => m.id).filter((id) => id !== profile.major && id !== profile.minor);
  const otherInterests = INTERESTS.map((i) => i.id).filter((id) => !profile.interests.includes(id));
  for (let i = 0; i < Math.max(0, 4 - baseSameMajor); i++) {
    const semester = Math.max(1, profile.semester + [0, 1, -1, 2][i % 4]);
    students.push({
      id: `p${i + 1}`,
      name: PEER_NAMES[i],
      major: profile.major,
      minor: i === 0 && profile.minor ? profile.minor : rand() < 0.4 ? null : otherSubjects[Math.floor(rand() * otherSubjects.length)],
      semester,
      degree: profile.degree,
      online: i % 2 === 0,
      interests: [...shuffled(profile.interests, rand).slice(0, 2 + (i % 2)), ...shuffled(otherInterests, rand).slice(0, 2)],
      bio: PEER_BIOS[i % PEER_BIOS.length](M, semester),
      hue: (i + 2) % TINT_ORDER.length,
    });
  }
  const rank = (list) => [...list].sort((a, b) => matchInfo(profile, b).score - matchInfo(profile, a).score);
  const sameMajor = rank(students.filter((s) => s.major === profile.major));

  const events = BASE_EVENTS.map((e) => ({ ...e, attendees: [...e.attendees], start: e.live ? liveStart(now) : atNext(e.at, now) }));
  if (!events.some((e) => e.audience === "major" && e.subject === profile.major)) {
    events.push({
      id: "e9",
      type: "study",
      start: atNext({ h: 16, m: 0 }, now),
      host: sameMajor[0].id,
      attendees: sameMajor.slice(0, 2).map((s) => s.id),
      max: 6,
      audience: "major",
      subject: profile.major,
      title: { en: `${M.en}: exam prep session`, de: `${M.de}: Klausurvorbereitung` },
      location: { en: "Main Library, 3rd floor", de: "Zentralbibliothek, 3. OG" },
      description: { en: "Old exams, shared notes and a lot of coffee.", de: "Altklausuren, geteilte Mitschriften und viel Kaffee." },
    });
  }
  events.sort((a, b) => a.start - b.start);

  const groups = BASE_GROUPS.map((g) => ({ ...g, members: [...g.members], invited: [] }));
  const groupSeed = { ...GROUP_SEED };
  if (!groups.some((g) => g.audience === "major" && g.subject === profile.major)) {
    groups.unshift({
      id: "g7",
      name: { en: `${M.en} Study Group`, de: `Lerngruppe ${M.de}` },
      audience: "major",
      subject: profile.major,
      members: sameMajor.slice(0, 3).map((s) => s.id),
      invited: [],
      extra: 12,
      description: { en: `Exercise sheets, old exams and study dates for ${M.en}.`, de: `Übungsblätter, Altklausuren und Lerntermine für ${M.de}.` },
    });
    groupSeed.g7 = [
      {
        from: sameMajor[0].id,
        ago: 75,
        text: {
          en: "Anyone have last year's exam? I'll share my notes in return 📄",
          de: "Hat jemand die Altklausur vom letzten Jahr? Ich teile dafür meine Mitschriften 📄",
        },
      },
      { from: sameMajor[1].id, ago: 68, text: { en: "Sent it to you! Library on Wednesday?", de: "Hab sie dir geschickt! Mittwoch in die Bib?" } },
    ];
  }

  const friendIds = [...new Set([sameMajor[0].id, "s3", "s4", "s8"])].slice(0, 3);
  const incoming = rank(students).find((s) => !friendIds.includes(s.id));
  const friends = Object.fromEntries(friendIds.map((id) => [id, "friends"]));
  if (incoming) friends[incoming.id] = "incoming";

  const threads = {};
  DM_SEED.forEach((seed, i) => {
    const other = friendIds[i];
    const id = `dm:${other}`;
    threads[id] = {
      id,
      kind: "dm",
      with: other,
      unread: i === 0 ? 1 : 0,
      messages: seed.map((m, k) => ({ id: `${id}-seed-${k}`, from: m.from === "them" ? other : ME, text: m.text, ts: now - m.ago * 60000 })),
    };
  });
  groups.forEach((g) => {
    const id = `group:${g.id}`;
    threads[id] = {
      id,
      kind: "group",
      group: g.id,
      unread: 0,
      messages: (groupSeed[g.id] || []).map((m, k) => ({ id: `${id}-seed-${k}`, from: m.from, text: m.text, ts: now - m.ago * 60000 })),
    };
  });

  const notifications = [{ id: "n-welcome", key: "nWelcome", ts: now, read: false, kind: "welcome" }];
  if (incoming) {
    notifications.push({
      id: "n-incoming",
      key: "nIncoming",
      vars: { name: incoming.name },
      ts: now - 12 * 60000,
      read: false,
      kind: "friend",
      person: incoming.id,
      go: { tab: "social" },
    });
  }
  return { students, events, groups, friends, threads, notifications };
}

function pickReply(text, lang, counter) {
  const rule = REPLY_RULES.find(([, re]) => re.test(text.trim()));
  const pool = REPLIES[rule ? rule[0] : "generic"][lang];
  return pool[counter % pool.length];
}

/* ────────────────────────────────────────────────────────────────────────────
 * Contexts
 * ──────────────────────────────────────────────────────────────────────────── */

const I18nContext = createContext(null);
const AppContext = createContext(null);
const useI18n = () => useContext(I18nContext);
const useApp = () => useContext(AppContext);

function makeI18n(lang, setLang) {
  const dict = STRINGS[lang];
  const t = (key, vars) => {
    const template = (vars && vars.n === 1 && dict[`${key}_one`]) || dict[key] || STRINGS.en[key] || key;
    if (!vars) return template;
    return template.replace(/\{(\w+)\}/g, (_, k) => {
      const v = vars[k];
      if (v == null) return "";
      return Array.isArray(v)
        ? fmtList(
            v.map((x) => tx(x, lang)),
            lang,
          )
        : tx(v, lang);
    });
  };
  return { lang, setLang, t, tx: (v) => tx(v, lang), subject: (id) => tx(MAJOR_BY_ID[id], lang) };
}

function initialLang() {
  try {
    const saved = localStorage.getItem("uniconnect.lang");
    if (saved === "en" || saved === "de") return saved;
  } catch {
    // Storage can be unavailable (private mode, sandboxed frames).
  }
  return typeof navigator !== "undefined" && /^de\b/i.test(navigator.language || "") ? "de" : "en";
}

/* ────────────────────────────────────────────────────────────────────────────
 * Design tokens & global styles
 *
 * Light only and deliberately quiet: white surfaces, hairline borders, zinc greys,
 * one indigo accent for primary actions and selection, a single typeface (Geist).
 * ──────────────────────────────────────────────────────────────────────────── */

// Inputs are composed from a base plus one color set and one size set, so no two
// classes ever fight over the same property.
const INPUT_BASE = "rounded-lg border bg-white text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:ring-4";
const INPUT_OK = "border-zinc-200 focus:border-indigo-500 focus:ring-indigo-500/10";
const INPUT_ERROR = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10";
const inputCls = (size, error = false) => cx(INPUT_BASE, error ? INPUT_ERROR : INPUT_OK, size);

const C = {
  card: "rounded-xl border border-zinc-200 bg-white",
  muted: "text-zinc-500",
  body: "text-zinc-600",
  label: "mb-1.5 block text-sm font-medium text-zinc-900",
  input: inputCls("w-full px-3 py-2 text-[15px]"),
  search: inputCls("w-full py-2 pl-9 pr-3 text-[15px]"),
};
const HEAD = "text-[13px] font-medium text-zinc-500";
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white";
const LINK = `rounded font-medium text-indigo-600 underline-offset-2 transition hover:text-indigo-700 hover:underline ${FOCUS}`;
const BTN = `inline-flex items-center justify-center gap-1.5 rounded-lg text-center font-medium leading-tight transition disabled:pointer-events-none disabled:opacity-40 ${FOCUS}`;
const btn = {
  primary: `${BTN} bg-indigo-600 text-white hover:bg-indigo-700`,
  secondary: `${BTN} border border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50`,
  quiet: `${BTN} border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50`,
  ghost: `${BTN} text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900`,
  danger: `${BTN} bg-rose-600 text-white hover:bg-rose-700`,
  dangerGhost: `${BTN} text-rose-600 hover:bg-rose-50`,
  sm: "px-2.5 py-1.5 text-[13px]",
  md: "px-3.5 py-2 text-sm",
  lg: "px-5 py-2.5 text-[15px]",
};
const CHIP = `inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[13px] font-medium transition ${FOCUS}`;
const CHIP_ON = "border-indigo-600 bg-indigo-50 text-indigo-700";
const CHIP_OFF = "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900";
const TILE = `rounded-xl border text-left transition ${FOCUS}`;
const TILE_ON = "border-indigo-600 bg-indigo-50/50";
const TILE_OFF = "border-zinc-200 bg-white hover:border-zinc-300";

const GLOBAL_CSS = `
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@400..700&display=swap");
.uc-root { font-family: "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; color-scheme: light; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; -webkit-tap-highlight-color: transparent; }
.uc-root h1, .uc-root h2, .uc-root h3 { text-wrap: balance; }
.uc-root button:not(:disabled), .uc-root [role="button"], .uc-root label[for] { cursor: pointer; }
.uc-tnum { font-variant-numeric: tabular-nums; }
.uc-noscrollbar { scrollbar-width: none; }
.uc-noscrollbar::-webkit-scrollbar { display: none; }
@keyframes uc-in-right { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }
@keyframes uc-in-left { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: none; } }
@keyframes uc-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes uc-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes uc-pop { from { opacity: 0; transform: translateY(6px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes uc-sheet { from { transform: translateY(100%); } to { transform: none; } }
@keyframes uc-drop { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
@keyframes uc-shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }
@keyframes uc-dot { 0%, 80%, 100% { opacity: .35; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-2px); } }
@keyframes uc-flash { 0%, 50% { background-color: rgb(238 242 255); } 100% { background-color: rgb(255 255 255 / 0); } }
@keyframes uc-toast { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
.uc-in-right { animation: uc-in-right .3s cubic-bezier(.2,.8,.2,1) both; }
.uc-in-left { animation: uc-in-left .3s cubic-bezier(.2,.8,.2,1) both; }
.uc-rise { animation: uc-rise .4s cubic-bezier(.2,.8,.2,1) both; }
.uc-fade { animation: uc-fade .2s ease-out both; }
.uc-sheet { animation: uc-sheet .3s cubic-bezier(.2,.8,.2,1) both; }
@media (min-width: 640px) { .uc-sheet { animation-name: uc-pop; animation-duration: .2s; } }
.uc-drop { animation: uc-drop .35s cubic-bezier(.2,.8,.2,1) both; }
.uc-shake { animation: uc-shake .4s ease-in-out both; }
.uc-dot { animation: uc-dot 1.1s ease-in-out infinite; }
.uc-flash { animation: uc-flash 2.6s ease-out both; }
.uc-toast { animation: uc-toast .25s cubic-bezier(.2,.8,.2,1) both; }
@media (prefers-reduced-motion: reduce) {
  .uc-root *, .uc-root *::before, .uc-root *::after { animation-duration: 1ms !important; animation-delay: 0ms !important; animation-iteration-count: 1 !important; transition-duration: 1ms !important; scroll-behavior: auto !important; }
}
`;

const GlobalStyles = () => <style>{GLOBAL_CSS}</style>;

/* ────────────────────────────────────────────────────────────────────────────
 * UI primitives
 * ──────────────────────────────────────────────────────────────────────────── */

function LogoMark({ className = "size-7" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" className="fill-indigo-600" />
      <circle cx="10.5" cy="9.5" r="3.1" fill="#fff" />
      <circle cx="21.5" cy="9.5" r="3.1" fill="#c7d2fe" />
      <path d="M8.2 15v1.6a7.8 7.8 0 0 0 15.6 0V15" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function Logo({ className }) {
  return (
    <span className={cx("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight">UniConnect</span>
    </span>
  );
}

function LangToggle({ className }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div role="group" aria-label={t("language")} className={cx("inline-flex shrink-0 items-center text-[13px] font-medium", className)}>
      {["en", "de"].map((code, i) => (
        <Fragment key={code}>
          {i > 0 && (
            <span className="text-zinc-300" aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={cx(
              "rounded px-1.5 py-1 uppercase tracking-wide transition",
              FOCUS,
              lang === code ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-700",
            )}
          >
            {code}
          </button>
        </Fragment>
      ))}
    </div>
  );
}

const AVATAR_SIZES = {
  xs: "size-6 text-[9px]",
  sm: "size-8 text-[11px]",
  md: "size-10 text-[13px]",
  lg: "size-12 text-[15px]",
  xl: "size-20 text-xl",
};
const DOT_SIZES = { xs: "size-2", sm: "size-2", md: "size-2.5", lg: "size-3", xl: "size-3.5" };

function Avatar({ person, size = "md", online = false, className }) {
  if (!person) return null;
  const tint = AVATAR_TINTS[person.avatarColor] || AVATAR_TINTS[TINT_ORDER[(person.hue ?? hashString(person.name)) % TINT_ORDER.length]];
  return (
    <span className={cx("relative inline-flex shrink-0", className)}>
      <span aria-hidden="true" className={cx("grid place-items-center rounded-full font-medium", AVATAR_SIZES[size], tint)}>
        {initials(person.name)}
      </span>
      {online && <span className={cx("absolute bottom-0 right-0 rounded-full bg-emerald-500 ring-2 ring-white", DOT_SIZES[size])} />}
    </span>
  );
}

function AudienceBadge({ item, group = false }) {
  const { t } = useI18n();
  if (item.audience === "open") {
    return (
      <span className="inline-flex items-center gap-1 text-zinc-500">
        <Globe className="size-3.5 shrink-0" aria-hidden="true" />
        {group ? t("uniWide") : t("audienceOpen")}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-medium text-indigo-600">
      <Lock className="size-3.5 shrink-0" aria-hidden="true" />
      {t("audienceOnly", { subject: MAJOR_BY_ID[item.subject] })}
    </span>
  );
}

const LiveDot = () => <span className="inline-block size-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />;

function Switch({ checked, onChange, label, id }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cx(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors",
        FOCUS,
        checked ? "bg-indigo-600" : "bg-zinc-200",
      )}
    >
      <span
        className={cx(
          "inline-block size-4 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-[2px]",
        )}
      />
    </button>
  );
}

// Underlined tabs for switching views or filters.
function Tabs({ options, value, onChange, label, className }) {
  return (
    <div role="tablist" aria-label={label} className={cx("uc-noscrollbar flex gap-6 overflow-x-auto border-b border-zinc-200", className)}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={o.disabled}
            title={o.title}
            onClick={() => onChange(o.value)}
            className={cx(
              "-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 pb-2.5 pt-1 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40",
              FOCUS,
              active ? "border-zinc-900 text-zinc-900" : "border-transparent text-zinc-500 hover:text-zinc-900",
            )}
          >
            {o.label}
            {o.count != null && <span className="uc-tnum text-xs font-normal text-zinc-400">{o.count}</span>}
            {o.badge > 0 && (
              <span className="uc-tnum grid h-4 min-w-4 place-items-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white">
                {o.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// Single choice from a few options, as chips.
function Choice({ options, value, onChange, label, className }) {
  return (
    <div role="radiogroup" aria-label={label} className={cx("flex flex-wrap gap-1.5", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          onClick={() => onChange(o.value)}
          className={cx(CHIP, o.value === value ? CHIP_ON : CHIP_OFF)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function IconButton({ label, onClick, className, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cx(
        "grid size-9 shrink-0 place-items-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900",
        FOCUS,
        className,
      )}
    >
      {children}
    </button>
  );
}

function Modal({ open, onClose, title, subtitle, footer, wide = false, layer = "z-50", children }) {
  const { t } = useI18n();
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);
  if (!open) return null;
  return (
    <div
      className={cx("fixed inset-0 flex items-end justify-center sm:items-center sm:p-6", layer)}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="uc-fade absolute inset-0 bg-zinc-900/20" onClick={onClose} />
      <div
        className={cx(
          "uc-sheet relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/10 sm:rounded-2xl",
          wide ? "sm:max-w-2xl" : "sm:max-w-lg",
        )}
      >
        <header className="flex items-start justify-between gap-4 px-5 pb-1 pt-5">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            {subtitle && <p className={cx("mt-0.5 text-sm", C.muted)}>{subtitle}</p>}
          </div>
          <IconButton label={t("close")} onClick={onClose} className="-mr-2 -mt-1.5">
            <X className="size-5" />
          </IconButton>
        </header>
        <div
          className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-4"
          style={footer ? undefined : { paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))" }}
        >
          {children}
        </div>
        {footer && (
          <footer className="border-t border-zinc-100 px-5 pt-3" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))" }}>
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

function Field({ label, htmlFor, hint, error, aside, children }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className={C.label}>
          {label}
        </label>
        {aside}
      </div>
      {children}
      {error ? (
        <p className="mt-1.5 flex items-start gap-1.5 text-sm text-rose-600" role="alert">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p className={cx("mt-1.5 text-sm", C.muted)}>{hint}</p>
      ) : null}
    </div>
  );
}

function EmptyState({ icon: Icon, title, body, action, bare = false, className }) {
  return (
    <div className={cx("flex flex-col items-center px-6 py-12 text-center", !bare && "rounded-xl border border-dashed border-zinc-200", className)}>
      {Icon && <Icon className="size-6 text-zinc-300" aria-hidden="true" />}
      {title && <h3 className="mt-3 font-medium">{title}</h3>}
      {body && <p className={cx("mt-1 max-w-sm text-sm", C.muted)}>{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

function SectionTitle({ title, lead, action }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        {lead && <p className={cx("mt-0.5 text-sm", C.muted)}>{lead}</p>}
      </div>
      {action}
    </div>
  );
}

function PageHeader({ title, lead, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {lead && <p className={cx("mt-1", C.muted)}>{lead}</p>}
      </div>
      {action}
    </div>
  );
}

// The profile card shown during onboarding and in "My profile", sized like a student ID.
function CampusCard({ profile, uni, verified, className }) {
  const { t, lang } = useI18n();
  const major = profile.major && MAJOR_BY_ID[profile.major];
  const minor = profile.minor && MAJOR_BY_ID[profile.minor];
  const degree = DEGREE_BY_ID[profile.degree];
  return (
    <div className={cx("aspect-[1.586/1] w-full max-w-[380px] select-none rounded-2xl border border-zinc-200 bg-white p-5 text-left", className)}>
      <div className="flex h-full flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <LogoMark className="size-6 shrink-0" />
            <div className="min-w-0 leading-tight">
              <p className="text-[13px] font-semibold">UniConnect</p>
              <p className={cx("min-w-0 truncate text-[11px]", C.muted)}>{uni?.name || t("cardTitle")}</p>
            </div>
          </div>
          <span className={cx("uc-tnum shrink-0 rounded-full border border-zinc-200 px-2 py-0.5 text-[11px] font-medium", C.muted)}>
            {termLabel(Date.now(), t)}
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <Avatar person={{ name: profile.name || "?", avatarColor: profile.avatarColor }} size="lg" />
          <div className="min-w-0">
            <p className="min-w-0 truncate text-lg font-semibold tracking-tight">{profile.name || t("cardNamePlaceholder")}</p>
            <p className={cx("mt-0.5 flex min-w-0 items-center gap-1.5 text-xs", C.muted)}>
              {verified ? (
                <span className="inline-flex shrink-0 items-center gap-1 font-medium text-emerald-700">
                  <BadgeCheck className="size-3.5" aria-hidden="true" />
                  {t("cardVerified")}
                </span>
              ) : (
                <span className="shrink-0">{t("cardPending")}</span>
              )}
              <span aria-hidden="true">·</span>
              <span className="min-w-0 truncate">
                {t("semesterN", { n: profile.semester || 1 })}
                {degree ? ` · ${tx(degree, lang)}` : ""}
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-zinc-100 pt-3">
          {[
            ["major", major],
            ["minor", minor],
          ].map(([key, subject]) => (
            <div key={key} className="min-w-0">
              <p className={cx("text-[11px]", C.muted)}>{t(key)}</p>
              <p className="min-w-0 truncate text-sm font-medium">{subject ? tx(subject, lang) : "—"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TOAST_ICONS = {
  check: CircleCheck,
  user: UserPlus,
  message: MessageCircle,
  calendar: CalendarDays,
  group: Users,
  info: Info,
  send: SendHorizontal,
};

function Toasts({ toasts, onDismiss, person }) {
  const { t } = useI18n();
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-[calc(0.75rem_+_env(safe-area-inset-top,0px))] z-[70] flex flex-col items-center gap-2 px-4 lg:bottom-6 lg:left-auto lg:right-6 lg:top-auto lg:items-end lg:px-0"
    >
      {toasts.map((item) => {
        const Icon = TOAST_ICONS[item.icon] || Info;
        return (
          <div
            key={item.id}
            role="status"
            className="uc-toast pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3 pr-2 shadow-lg shadow-zinc-900/[0.08]"
          >
            {item.person ? (
              <Avatar person={person(item.person)} size="sm" />
            ) : (
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-600">
                <Icon className="size-4" aria-hidden="true" />
              </span>
            )}
            <div className="min-w-0 flex-1 py-0.5">
              <p className="text-sm font-medium leading-snug">{t(item.title, item.titleVars)}</p>
              {(item.body || item.bodyRaw) && (
                <p className={cx("mt-0.5 line-clamp-2 text-[13px] leading-snug", C.muted)}>{item.bodyRaw ?? t(item.body, item.bodyVars)}</p>
              )}
            </div>
            {item.action && (
              <button
                type="button"
                onClick={() => {
                  item.action.run();
                  onDismiss(item.id);
                }}
                className="shrink-0 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-indigo-600 transition hover:bg-indigo-50"
              >
                {t(item.action.label)}
              </button>
            )}
            <button
              type="button"
              aria-label={t("close")}
              onClick={() => onDismiss(item.id)}
              className="shrink-0 rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Welcome
 * ──────────────────────────────────────────────────────────────────────────── */

function previewStudent(id) {
  const i = BASE_STUDENTS.findIndex((s) => s.id === id);
  return { ...BASE_STUDENTS[i], hue: i % TINT_ORDER.length };
}

function Welcome({ onStart, onDemo }) {
  const { t } = useI18n();
  const features = [
    { icon: GraduationCap, title: t("feat1Title"), body: t("feat1Body") },
    { icon: Utensils, title: t("feat2Title"), body: t("feat2Body") },
    { icon: MessageCircle, title: t("feat3Title"), body: t("feat3Body") },
  ];
  return (
    <div className="min-h-[100dvh]">
      <header
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pb-5 sm:px-6"
        style={{ paddingTop: "calc(1.25rem + env(safe-area-inset-top, 0px))" }}
      >
        <Logo />
        <LangToggle />
      </header>
      <main className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20 lg:pb-24 lg:pt-16">
        <section className="uc-rise">
          <p className={cx("inline-flex items-center gap-1.5 text-[13px] font-medium", C.muted)}>
            <ShieldCheck className="size-4" aria-hidden="true" />
            {t("welcomeEyebrow")}
          </p>
          <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[3.25rem] lg:text-[3.6rem]">
            {t("welcomeTitleA")}
            <span className="text-indigo-600">{t("welcomeTitleB")}</span>
            {t("welcomeTitleC")}
          </h1>
          <p className={cx("mt-5 max-w-lg text-lg leading-relaxed", C.muted)}>{t("welcomeLead")}</p>
          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
            <button type="button" onClick={onStart} className={cx(btn.primary, btn.lg)}>
              {t("welcomeCta")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={onDemo} className={cx(btn.secondary, btn.lg)}>
              {t("welcomeDemo")}
            </button>
          </div>
          <p className={cx("mt-4 text-sm", C.muted)}>{t("welcomeNote")}</p>
        </section>
        <WelcomePreview />
      </main>
      <section className="border-t border-zinc-100">
        <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
          {features.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <Icon className="size-5 text-zinc-400" aria-hidden="true" />
              <p className="mt-3 font-medium">{title}</p>
              <p className={cx("mt-1 text-sm leading-relaxed", C.muted)}>{body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// A quiet glimpse of the app: a match, a Mensa meetup and a chat message.
function WelcomePreview() {
  const { t, tx } = useI18n();
  const lena = previewStudent("s1");
  const lunch = BASE_EVENTS[0];
  return (
    <div aria-hidden="true" className="uc-rise mx-auto flex w-full max-w-md select-none flex-col gap-3" style={{ animationDelay: "120ms" }}>
      <div className={cx(C.card, "p-4")}>
        <div className="flex items-center gap-3">
          <Avatar person={lena} size="md" online />
          <div className="min-w-0 flex-1">
            <p className="min-w-0 truncate font-medium">{lena.name}</p>
            <p className={cx("min-w-0 truncate text-[13px]", C.muted)}>
              {tx(MAJOR_BY_ID.cs)} · {t("semesterN", { n: lena.semester })}
            </p>
          </div>
          <span className={cx(btn.secondary, btn.sm, "shrink-0")}>
            <UserPlus className="size-3.5" />
            {t("addFriend")}
          </span>
        </div>
        <p className="mt-3 text-[13px] text-indigo-600">
          {t("mSameMajor", { subject: MAJOR_BY_ID.cs })} · {t("mShared", { n: 3 })}
        </p>
      </div>
      <div className={cx(C.card, "flex gap-4 p-4 lg:ml-10")}>
        <div className="w-16 shrink-0">
          <p className="uc-tnum text-[15px] font-semibold">12:30</p>
          <p className={cx("text-xs", C.muted)}>{t("today")}</p>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium leading-snug">{tx(lunch.title)}</p>
          <p className={cx("mt-0.5 flex min-w-0 items-center gap-1.5 text-[13px]", C.muted)}>
            <Utensils className="size-3.5 shrink-0" />
            <span className="min-w-0 truncate">{tx(lunch.location)}</span>
          </p>
          <p className={cx("mt-2 flex flex-wrap items-center gap-x-3 text-[13px]", C.muted)}>
            <AudienceBadge item={lunch} />
            <span>{t("going", { n: 4, max: 8 })}</span>
          </p>
        </div>
      </div>
      <div className="flex items-end gap-2 lg:mr-10">
        <Avatar person={previewStudent("s2")} size="sm" />
        <p className="rounded-2xl rounded-bl-md bg-zinc-100 px-3.5 py-2 text-[15px]">{t("previewChat")}</p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Onboarding wizard
 * ──────────────────────────────────────────────────────────────────────────── */

const STEPS = ["email", "uni", "studies", "interests"];
const STEP_LABELS = { email: "stepEmail", uni: "stepUni", studies: "stepStudies", interests: "stepInterests" };
const FLOW = ["email", "otp", "uni", "studies", "interests", "done"];
const EMPTY_DRAFT = {
  email: "",
  verifiedEmail: null,
  uniId: null,
  customUni: "",
  major: null,
  hasMinor: false,
  minor: null,
  semester: 1,
  degree: "bachelor",
  interests: [],
  bio: "",
  avatarColor: "indigo",
  name: "",
};

function draftToProfile(d) {
  const custom = d.customUni.trim();
  const uni = d.uniId === "custom" ? { id: "custom", name: custom, short: custom, city: "", country: "" } : UNI_BY_ID[d.uniId] || null;
  return {
    name: d.name.trim() || nameFromEmail(d.email),
    email: d.email,
    uni,
    major: d.major,
    minor: d.hasMinor ? d.minor : null,
    semester: d.semester,
    degree: d.degree,
    interests: d.interests,
    bio: d.bio.trim(),
    avatarColor: d.avatarColor,
  };
}

function Onboarding({ onExit, onComplete }) {
  const { t } = useI18n();
  const [step, setStep] = useState("email");
  const [dir, setDir] = useState(1);
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const update = useCallback((patch) => setDraft((d) => ({ ...d, ...patch })), []);

  const go = (next) => {
    setDir(FLOW.indexOf(next) >= FLOW.indexOf(step) ? 1 : -1);
    setStep(next);
    window.scrollTo({ top: 0 });
  };

  if (step === "done") return <DoneScreen draft={draft} onEnter={() => onComplete(draftToProfile(draft))} />;

  const index = step === "otp" ? 0 : STEPS.indexOf(step);
  const preview = draftToProfile(draft);
  return (
    <div className="min-h-[100dvh] lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <BrandPanel profile={preview} verified={!!draft.verifiedEmail} />
      <div className="flex min-h-[100dvh] flex-col">
        <header
          className="sticky top-0 z-20 bg-white/90 px-4 pb-3 backdrop-blur-md sm:px-8"
          style={{ paddingTop: "calc(1rem + env(safe-area-inset-top, 0px))" }}
        >
          <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
            <span className="lg:hidden">
              <Logo />
            </span>
            <span className={cx("hidden text-sm lg:block", C.muted)}>{t("stepOf", { n: index + 1, total: STEPS.length })}</span>
            <LangToggle />
          </div>
          <StepProgress index={index} halfway={step === "otp"} />
        </header>
        <main className="flex flex-1 flex-col px-4 pt-8 sm:px-8">
          <div key={step} className={cx("mx-auto flex w-full max-w-xl flex-1 flex-col", dir > 0 ? "uc-in-right" : "uc-in-left")}>
            {step === "email" && <StepEmail draft={draft} update={update} onBack={onExit} onNext={(verified) => go(verified ? "uni" : "otp")} />}
            {step === "otp" && <StepOtp draft={draft} update={update} onBack={() => go("email")} onNext={() => go("uni")} />}
            {step === "uni" && <StepUni draft={draft} update={update} onBack={() => go("email")} onNext={() => go("studies")} />}
            {step === "studies" && <StepStudies draft={draft} update={update} onBack={() => go("uni")} onNext={() => go("interests")} />}
            {step === "interests" && <StepInterests draft={draft} update={update} onBack={() => go("studies")} onNext={() => go("done")} />}
          </div>
        </main>
      </div>
    </div>
  );
}

function StepProgress({ index, halfway }) {
  const { t } = useI18n();
  return (
    <div className="mx-auto mt-4 max-w-xl">
      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={index + 1}
        aria-valuetext={`${t("stepOf", { n: index + 1, total: STEPS.length })}: ${t(STEP_LABELS[STEPS[index]])}`}
      >
        {STEPS.map((s, i) => (
          <div key={s} className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-indigo-600 transition-[width] duration-500 ease-out"
              style={{ width: i < index ? "100%" : i === index ? (halfway ? "66%" : "34%") : "0%" }}
            />
          </div>
        ))}
      </div>
      <ol className="mt-2 hidden grid-cols-4 gap-1 text-xs sm:grid">
        {STEPS.map((s, i) => (
          <li key={s} className={i === index ? "font-medium text-zinc-900" : "text-zinc-500"}>
            {t(STEP_LABELS[s])}
          </li>
        ))}
      </ol>
      <p className={cx("mt-2 text-xs sm:hidden", C.muted)}>
        {t("stepOf", { n: index + 1, total: STEPS.length })} · <span className="font-medium text-zinc-900">{t(STEP_LABELS[STEPS[index]])}</span>
      </p>
    </div>
  );
}

function StepShell({ title, lead, footer, children }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 pb-10">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">{title}</h1>
        {lead && <p className={cx("mt-2 text-[15px] leading-relaxed", C.muted)}>{lead}</p>}
        <div className="mt-7">{children}</div>
      </div>
      <div
        className="sticky bottom-0 -mx-4 border-t border-zinc-100 bg-white/95 px-4 pt-3 backdrop-blur-md sm:-mx-8 sm:px-8"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))" }}
      >
        {footer}
      </div>
    </div>
  );
}

function StepNav({ onBack, onNext, nextLabel, disabled, loading, hint }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={onBack} className={cx(btn.ghost, btn.md)}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t("back")}
      </button>
      {hint && <span className={cx("ml-auto text-right text-sm", C.muted)}>{hint}</span>}
      <button type="button" onClick={onNext} disabled={disabled || loading} className={cx(btn.primary, btn.lg, "min-w-[8.5rem]", !hint && "ml-auto")}>
        {loading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
        {nextLabel || t("next")}
        {!loading && <ArrowRight className="size-4" aria-hidden="true" />}
      </button>
    </div>
  );
}

function StepEmail({ draft, update, onBack, onNext }) {
  const { t } = useI18n();
  const [value, setValue] = useState(draft.email);
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const result = useMemo(() => checkUniEmail(value), [value]);
  const email = value.trim().toLowerCase();
  const verified = !!draft.verifiedEmail && draft.verifiedEmail === email;
  const detected = result.ok ? detectUni(email) : null;
  let error = null;
  if (touched && !result.ok) {
    if (result.code === "personal") error = t("emailErrPersonal", { provider: result.provider });
    else if (result.code === "domain") error = t("emailErrDomain", { domain: result.domain });
    else error = t("emailErrFormat");
  }

  const submit = (e) => {
    e?.preventDefault();
    if (sending) return;
    setTouched(true);
    if (!result.ok) {
      inputRef.current?.focus();
      return;
    }
    update({ email, name: draft.name || nameFromEmail(email), uniId: detected ? detected.id : draft.uniId });
    if (verified) {
      onNext(true);
      return;
    }
    setSending(true);
    timer.current = setTimeout(() => onNext(false), 800);
  };

  return (
    <StepShell
      title={t("emailTitle")}
      lead={t("emailLead")}
      footer={
        <StepNav onBack={onBack} onNext={submit} loading={sending} nextLabel={verified ? t("next") : sending ? t("emailSending") : t("emailSend")} />
      }
    >
      <form onSubmit={submit} noValidate>
        <Field label={t("emailLabel")} htmlFor="uc-email" error={error}>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
            <input
              ref={inputRef}
              id="uc-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setTouched(false);
              }}
              onBlur={() => value.trim() && setTouched(true)}
              placeholder={t("emailPlaceholder")}
              aria-invalid={!!error}
              aria-describedby="uc-email-domains"
              className={inputCls("w-full py-2.5 pl-9 pr-9 text-[15px]", !!error)}
            />
            {result.ok && <CircleCheck className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-emerald-600" aria-hidden="true" />}
          </div>
        </Field>
      </form>
      {result.ok && !error && (
        <p className="mt-2 text-sm text-emerald-700">
          {verified ? t("emailVerifiedNote", { email }) : t("emailOk")}
          {detected && !verified ? ` · ${detected.short}` : ""}
        </p>
      )}

      <div id="uc-email-domains" className="mt-8">
        <p className={cx("text-sm", C.muted)}>{t("emailAccepted")}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[".edu", ".ac.uk", "@uni-….de", "@tu-….de", "@rwth-aachen.de", "@tum.de"].map((d) => (
            <code key={d} className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
              {d}
            </code>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setValue(DEMO_EMAIL);
            setTouched(false);
            inputRef.current?.focus();
          }}
          className={cx(LINK, "mt-4 text-sm")}
        >
          {t("emailDemo")}
        </button>
      </div>
      <p className={cx("mt-8 flex items-center gap-2 text-sm", C.muted)}>
        <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
        {t("emailPrivacy")}
      </p>
    </StepShell>
  );
}

function StepOtp({ draft, update, onBack, onNext }) {
  const { t } = useI18n();
  const [digits, setDigits] = useState(() => Array(6).fill(""));
  const [status, setStatusState] = useState("idle"); // idle | checking | wrong | ok
  const [banner, setBanner] = useState(false);
  const [cooldown, setCooldown] = useState(30);
  const statusRef = useRef("idle");
  const refs = useRef([]);
  const timers = useRef([]);

  const setStatus = (s) => {
    statusRef.current = s;
    setStatusState(s);
  };
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  useEffect(() => {
    const id = setTimeout(() => setBanner(true), 700);
    refs.current[0]?.focus();
    return () => {
      clearTimeout(id);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const verify = (code) => {
    if (code.length < 6 || statusRef.current === "checking" || statusRef.current === "ok") return;
    setStatus("checking");
    later(() => {
      if (code === DEMO_CODE) {
        setStatus("ok");
        update({ verifiedEmail: draft.email });
        later(onNext, 900);
      } else {
        setStatus("wrong");
      }
    }, 650);
  };

  const fill = (start, chars) => {
    const next = [...digits];
    chars
      .slice(0, 6 - start)
      .split("")
      .forEach((ch, k) => {
        next[start + k] = ch;
      });
    setDigits(next);
    if (statusRef.current === "wrong") setStatus("idle");
    const firstEmpty = next.findIndex((d) => !d);
    refs.current[firstEmpty === -1 ? 5 : firstEmpty]?.focus();
    if (next.every(Boolean)) verify(next.join(""));
  };

  const onChange = (i, e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value) {
      const next = [...digits];
      next[i] = "";
      setDigits(next);
      return;
    }
    // Typing into a filled box: keep only the newly typed digit.
    if (value.length === 2 && digits[i]) value = value.startsWith(digits[i]) ? value.slice(1) : value.slice(0, 1);
    fill(i, value);
  };

  const onKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      e.preventDefault();
      const next = [...digits];
      next[i - 1] = "";
      setDigits(next);
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      refs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < 5) {
      e.preventDefault();
      refs.current[i + 1]?.focus();
    } else if (e.key === "Enter") {
      verify(digits.join(""));
    }
  };

  const onPaste = (i, e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    e.preventDefault();
    fill(i, text);
  };

  const fillDemo = () => {
    setDigits(DEMO_CODE.split(""));
    refs.current[5]?.focus();
    verify(DEMO_CODE);
  };

  const resend = () => {
    setCooldown(30);
    setBanner(false);
    setDigits(Array(6).fill(""));
    setStatus("idle");
    later(() => setBanner(true), 600);
    refs.current[0]?.focus();
  };

  const code = digits.join("");
  return (
    <StepShell
      title={t("otpTitle")}
      lead={t("otpLead", { email: draft.email })}
      footer={
        <StepNav
          onBack={onBack}
          onNext={() => verify(code)}
          disabled={code.length < 6 || status === "ok"}
          loading={status === "checking"}
          nextLabel={status === "checking" ? t("otpVerifying") : t("otpVerify")}
        />
      }
    >
      {/* The simulated "email" lands here; its space is reserved so the code boxes never jump. */}
      <div className="mb-6 min-h-[5.25rem]" aria-live="polite">
        {banner && (
          <button type="button" onClick={fillDemo} className={cx(TILE, TILE_OFF, "uc-drop flex w-full items-center gap-3 p-3")}>
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-600">
              <Mail className="size-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-xs">
                <span className="font-medium">{t("otpMailFrom")}</span>
                <span className={C.muted}>{t("now")}</span>
                <span className="ml-auto text-[11px] font-medium uppercase tracking-wide text-amber-700">{t("otpDemoTag")}</span>
              </span>
              <span className="mt-0.5 block text-sm">
                {t("otpDemoText", { code: "" })}
                <b className="uc-tnum font-semibold tracking-widest">{DEMO_CODE}</b>
              </span>
            </span>
            <span className="shrink-0 text-[13px] font-medium text-indigo-600">{t("otpDemoFill")}</span>
          </button>
        )}
      </div>
      <div className={cx("flex items-center gap-1.5 sm:gap-2.5", status === "wrong" && "uc-shake")}>
        {digits.map((d, i) => (
          <Fragment key={i}>
            {i === 3 && <span className="h-px w-2.5 shrink-0 bg-zinc-300" aria-hidden="true" />}
            <input
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              inputMode="numeric"
              id={`uc-otp-${i + 1}`}
              autoComplete={i === 0 ? "one-time-code" : "off"}
              aria-label={t("otpDigit", { n: i + 1 })}
              onChange={(e) => onChange(i, e)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onPaste={(e) => onPaste(i, e)}
              onFocus={(e) => e.target.select()}
              disabled={status === "ok"}
              className={cx(
                "uc-tnum h-12 w-full min-w-0 max-w-[3rem] rounded-lg border bg-white text-center text-xl font-semibold outline-none transition sm:h-14 sm:max-w-[3.25rem] sm:text-2xl",
                status === "wrong"
                  ? "border-rose-400 text-rose-600"
                  : status === "ok"
                    ? "border-emerald-500 text-emerald-700"
                    : "border-zinc-200 text-zinc-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10",
              )}
            />
          </Fragment>
        ))}
      </div>
      <div className="mt-4 min-h-6" aria-live="polite">
        {status === "wrong" && (
          <p className="flex items-center gap-1.5 text-sm text-rose-600">
            <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
            {t("otpWrong")}
          </p>
        )}
        {status === "ok" && (
          <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
            <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
            {t("otpVerified")}
          </p>
        )}
      </div>
      <div className={cx("mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm", C.muted)}>
        {cooldown > 0 ? (
          <span className="uc-tnum">{t("otpResendIn", { s: cooldown })}</span>
        ) : (
          <button type="button" onClick={resend} className={cx(LINK, "inline-flex items-center gap-1.5")}>
            <RotateCcw className="size-3.5" aria-hidden="true" />
            {t("otpResend")}
          </button>
        )}
        <span aria-hidden="true">·</span>
        <button type="button" onClick={onBack} className={LINK}>
          {t("otpChange")}
        </button>
      </div>
    </StepShell>
  );
}

function StepUni({ draft, update, onBack, onNext }) {
  const { t, tx } = useI18n();
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(draft.uniId === "custom");
  const [custom, setCustom] = useState(draft.customUni);
  const suggested = useMemo(() => detectUni(draft.email), [draft.email]);
  const list = useMemo(() => {
    const q = normalize(query.trim());
    const hits = UNIVERSITIES.filter((u) => !q || normalize(`${u.name} ${u.short} ${tx(u.city)} ${u.country}`).includes(q));
    return suggested && hits.includes(suggested) ? [suggested, ...hits.filter((u) => u !== suggested)] : hits;
  }, [query, suggested, tx]);

  const applyCustom = () => {
    const name = custom.trim();
    if (name.length >= 3) update({ uniId: "custom", customUni: name });
  };
  const canContinue = !!draft.uniId && (draft.uniId !== "custom" || draft.customUni.trim().length >= 3);

  return (
    <StepShell title={t("uniTitle")} lead={t("uniLead")} footer={<StepNav onBack={onBack} onNext={onNext} disabled={!canContinue} />}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
        <input
          id="uc-uni-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("uniSearch")}
          aria-label={t("uniSearch")}
          className={C.search}
        />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {list.map((u) => {
          const selected = draft.uniId === u.id;
          return (
            <button
              key={u.id}
              type="button"
              aria-pressed={selected}
              onClick={() => update({ uniId: u.id })}
              className={cx(TILE, "flex items-center gap-3 px-3.5 py-3", selected ? TILE_ON : TILE_OFF)}
            >
              <span className="min-w-0 flex-1">
                <span className="block min-w-0 truncate text-sm font-medium">{u.name}</span>
                <span className={cx("mt-0.5 block min-w-0 truncate text-[13px]", C.muted)}>
                  {u.short} · {tx(u.city)} · {u.country}
                </span>
                {u === suggested && (
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-700">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    {t("uniMatchesEmail")}
                  </span>
                )}
              </span>
              {selected && <Check className="size-4 shrink-0 text-indigo-600" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      {list.length === 0 && <p className={cx("mt-4 text-sm", C.muted)}>{t("uniNoResults", { q: query.trim() })}</p>}

      <div className="mt-4">
        {!adding ? (
          <button
            type="button"
            onClick={() => {
              setAdding(true);
              if (query.trim()) setCustom(query.trim());
            }}
            className={cx(
              "flex w-full items-center gap-2 rounded-xl border border-dashed border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900",
              FOCUS,
            )}
          >
            <Plus className="size-4" aria-hidden="true" />
            {t("uniAddCustom")}
          </button>
        ) : (
          <div className={cx("rounded-xl border p-4", draft.uniId === "custom" ? TILE_ON : "border-zinc-200")}>
            <Field label={t("uniCustomLabel")} htmlFor="uc-custom-uni">
              <div className="flex gap-2">
                <input
                  id="uc-custom-uni"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyCustom()}
                  placeholder={t("uniCustomPlaceholder")}
                  className={C.input}
                  autoFocus
                />
                <button type="button" onClick={applyCustom} disabled={custom.trim().length < 3} className={cx(btn.secondary, btn.md, "shrink-0")}>
                  {t("uniCustomUse")}
                </button>
              </div>
            </Field>
            {draft.uniId === "custom" && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-indigo-700">
                <Check className="size-4" aria-hidden="true" />
                {draft.customUni} · {t("uniCustomBadge")}
              </p>
            )}
          </div>
        )}
      </div>
    </StepShell>
  );
}

function StepStudies({ draft, update, onBack, onNext }) {
  const { t, tx } = useI18n();
  const [query, setQuery] = useState("");
  const majors = useMemo(() => {
    const q = normalize(query.trim());
    return q ? MAJORS.filter((m) => normalize(`${m.en} ${m.de} ${m.aliases}`).includes(q)) : MAJORS;
  }, [query]);
  const peers = draft.major ? Math.max(4, BASE_STUDENTS.filter((s) => s.major === draft.major).length) : 0;
  const canContinue = !!draft.major && (!draft.hasMinor || !!draft.minor);

  return (
    <StepShell title={t("studiesTitle")} lead={t("studiesLead")} footer={<StepNav onBack={onBack} onNext={onNext} disabled={!canContinue} />}>
      <Field label={t("majorLabel")} htmlFor="uc-subject-search">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
          <input
            id="uc-subject-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("subjectSearch")}
            className={C.search}
          />
        </div>
      </Field>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {majors.map((m) => {
          const selected = draft.major === m.id;
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              type="button"
              aria-pressed={selected}
              onClick={() => update({ major: m.id, minor: draft.minor === m.id ? null : draft.minor })}
              className={cx(TILE, "flex min-h-14 items-center gap-2.5 px-3 py-2.5 text-sm font-medium leading-tight", selected ? TILE_ON : TILE_OFF)}
            >
              <Icon className={cx("size-4 shrink-0", selected ? "text-indigo-600" : "text-zinc-400")} aria-hidden="true" />
              <span className="min-w-0 break-words">{tx(m)}</span>
            </button>
          );
        })}
      </div>
      {majors.length === 0 && <p className={cx("mt-3 text-sm", C.muted)}>{t("noSubject", { q: query.trim() })}</p>}
      {draft.major && (
        <p className="mt-3 flex items-center gap-2 text-sm text-emerald-700">
          <Users className="size-4 shrink-0" aria-hidden="true" />
          {t("peersWaiting", { n: peers, subject: MAJOR_BY_ID[draft.major] })}
        </p>
      )}

      <div className="mt-8 border-t border-zinc-100 pt-6">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="uc-minor" className="min-w-0">
            <span className="block text-sm font-medium">{t("minorToggle")}</span>
            <span className={cx("block text-sm", C.muted)}>{t("minorToggleHint")}</span>
          </label>
          <Switch
            id="uc-minor"
            checked={draft.hasMinor}
            onChange={(v) => update({ hasMinor: v, minor: v ? draft.minor : null })}
            label={t("minorToggle")}
          />
        </div>
        {draft.hasMinor && (
          <div className="uc-fade mt-4">
            <p className={C.label}>{t("minorLabel")}</p>
            <div className="flex flex-wrap gap-1.5">
              {MAJORS.filter((m) => m.id !== draft.major).map((m) => {
                const selected = draft.minor === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => update({ minor: selected ? null : m.id })}
                    className={cx(CHIP, selected ? CHIP_ON : CHIP_OFF)}
                  >
                    {tx(m)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 border-t border-zinc-100 pt-6 sm:grid-cols-2">
        <div>
          <p id="uc-semester-label" className={C.label}>
            {t("semesterLabel")}
          </p>
          <div className="flex items-center gap-2" role="group" aria-labelledby="uc-semester-label">
            <button
              type="button"
              aria-label={t("fewer")}
              onClick={() => update({ semester: Math.max(1, draft.semester - 1) })}
              disabled={draft.semester <= 1}
              className={cx(btn.secondary, "size-10 shrink-0")}
            >
              <Minus className="size-4" aria-hidden="true" />
            </button>
            <div aria-live="polite" className="uc-tnum flex-1 text-center text-[15px] font-semibold">
              {t("semesterN", { n: draft.semester })}
            </div>
            <button
              type="button"
              aria-label={t("more")}
              onClick={() => update({ semester: Math.min(14, draft.semester + 1) })}
              disabled={draft.semester >= 14}
              className={cx(btn.secondary, "size-10 shrink-0")}
            >
              <Plus className="size-4" aria-hidden="true" />
            </button>
          </div>
          {draft.semester === 1 && <p className="mt-2 text-sm text-indigo-600">{t("erstiNote")}</p>}
        </div>
        <div>
          <p className={C.label}>{t("degreeLabel")}</p>
          <Choice
            label={t("degreeLabel")}
            value={draft.degree}
            onChange={(v) => update({ degree: v })}
            options={DEGREES.map((d) => ({ value: d.id, label: tx(d) }))}
          />
        </div>
      </div>
    </StepShell>
  );
}

function StepInterests({ draft, update, onBack, onNext }) {
  const { t, tx } = useI18n();
  const count = draft.interests.length;
  const missing = Math.max(0, MIN_INTERESTS - count);
  const toggle = (id) => update({ interests: draft.interests.includes(id) ? draft.interests.filter((x) => x !== id) : [...draft.interests, id] });
  const canFinish = draft.name.trim().length > 0 && missing === 0;

  return (
    <StepShell
      title={t("interestsTitle")}
      lead={t("interestsLead")}
      footer={
        <StepNav
          onBack={onBack}
          onNext={onNext}
          disabled={!canFinish}
          nextLabel={t("finish")}
          hint={missing > 0 ? t("interestsMore", { n: missing }) : null}
        />
      }
    >
      <div className="grid grid-cols-1 gap-8">
        <Field label={t("nameLabel")} htmlFor="uc-name">
          <input
            id="uc-name"
            value={draft.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder={t("namePlaceholder")}
            maxLength={40}
            autoComplete="name"
            className={C.input}
          />
        </Field>

        <div>
          <p className={C.label}>{t("avatarLabel")}</p>
          <div className="flex items-center gap-5">
            <Avatar person={{ name: draft.name || "?", avatarColor: draft.avatarColor }} size="xl" />
            <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label={t("colorLabel")}>
              {Object.entries(AVATAR_TINTS).map(([id, tint]) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={draft.avatarColor === id}
                  aria-label={id}
                  onClick={() => update({ avatarColor: id })}
                  className={cx(
                    "grid size-8 place-items-center rounded-full transition",
                    tint,
                    FOCUS,
                    draft.avatarColor === id ? "ring-2 ring-indigo-600 ring-offset-2 ring-offset-white" : "hover:ring-1 hover:ring-zinc-300",
                  )}
                >
                  <span className="size-2.5 rounded-full bg-current" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <p className={C.label}>{t("interestsLabel")}</p>
            <span className={cx("uc-tnum text-sm", missing ? C.muted : "text-emerald-700")}>
              {missing ? t("interestsHint") : t("interestsCount", { n: count })}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {INTERESTS.map((interest) => {
              const on = draft.interests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(interest.id)}
                  className={cx(CHIP, on ? CHIP_ON : CHIP_OFF)}
                >
                  {tx(interest)}
                  {on && <Check className="size-3.5" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>

        <Field
          label={t("bioLabel")}
          htmlFor="uc-bio"
          aside={
            <span className={cx("uc-tnum text-xs", C.muted)}>
              {draft.bio.length}/160 · {t("optional")}
            </span>
          }
        >
          <textarea
            id="uc-bio"
            rows={3}
            maxLength={160}
            value={draft.bio}
            onChange={(e) => update({ bio: e.target.value })}
            placeholder={t("bioPlaceholder")}
            className={cx(C.input, "resize-none")}
          />
        </Field>
      </div>
    </StepShell>
  );
}

function BrandPanel({ profile, verified }) {
  const { t } = useI18n();
  return (
    <aside className="sticky top-0 hidden h-[100dvh] flex-col border-r border-zinc-200 bg-zinc-50 p-10 lg:flex xl:p-14">
      <Logo />
      <div className="my-auto">
        <p className={cx("text-[13px] font-medium", C.muted)}>{t("cardTitle")}</p>
        <p className="mt-2 max-w-sm text-3xl font-semibold leading-tight tracking-tight">
          {t("welcomeTitleA")}
          <span className="text-indigo-600">{t("welcomeTitleB")}</span>
          {t("welcomeTitleC")}
        </p>
        <CampusCard profile={profile} uni={profile.uni} verified={verified} className="mt-10" />
      </div>
    </aside>
  );
}

function DoneScreen({ draft, onEnter }) {
  const { t } = useI18n();
  const profile = useMemo(() => draftToProfile(draft), [draft]);
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (phase > 3) return undefined;
    const id = setTimeout(() => setPhase((p) => p + 1), phase === 0 ? 300 : 560);
    return () => clearTimeout(id);
  }, [phase]);

  const stats = useMemo(() => {
    const now = Date.now();
    const world = buildWorld(profile, now);
    return [
      { n: world.students.filter((s) => s.major === profile.major).length, label: t("doneSameMajor") },
      { n: world.events.filter((e) => isUpcoming(e, now) && canAccess(e, profile)).length, label: t("doneEvents") },
      { n: world.groups.filter((g) => canAccess(g, profile)).length, label: t("doneGroups") },
    ];
  }, [profile, t]);

  const steps = [t("setupProfile"), t("setupPeers", { subject: MAJOR_BY_ID[profile.major] }), t("setupEvents")];
  const ready = phase > 3;

  return (
    <div className="relative grid min-h-[100dvh] grid-cols-1 place-items-center px-4 py-12">
      <div className="absolute right-4" style={{ top: "max(1rem, env(safe-area-inset-top, 0px))" }}>
        <LangToggle />
      </div>
      {!ready ? (
        <div className="uc-fade w-full max-w-sm">
          <LogoMark className="size-8" />
          <h1 className="mt-5 text-xl font-semibold tracking-tight">{t("settingUp")}</h1>
          <ul className="mt-6 space-y-3">
            {steps.map((label, i) => (
              <li key={label} className={cx("flex items-center gap-3 text-[15px]", phase < i && "text-zinc-400")}>
                {phase > i ? (
                  <CircleCheck className="size-5 shrink-0 text-emerald-600" aria-hidden="true" />
                ) : phase === i ? (
                  <LoaderCircle className="size-5 shrink-0 animate-spin text-indigo-600" aria-hidden="true" />
                ) : (
                  <span className="grid size-5 shrink-0 place-items-center" aria-hidden="true">
                    <span className="size-1.5 rounded-full bg-zinc-300" />
                  </span>
                )}
                {label}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="uc-rise flex w-full max-w-md flex-col items-center text-center">
          <CampusCard profile={profile} uni={profile.uni} verified className="mx-auto" />
          <h1 className="mt-10 text-3xl font-semibold tracking-tight">{t("doneTitle", { name: firstName(profile.name) })}</h1>
          <p className={cx("mt-2", C.muted)}>{t("doneLead", { uni: profile.uni?.short })}</p>
          <dl className="mt-8 grid w-full grid-cols-3 divide-x divide-zinc-100 border-y border-zinc-100 py-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse px-2">
                <dt className={cx("mt-1 text-xs leading-snug", C.muted)}>{s.label}</dt>
                <dd className="uc-tnum text-2xl font-semibold">{s.n}</dd>
              </div>
            ))}
          </dl>
          <button type="button" onClick={onEnter} className={cx(btn.primary, btn.lg, "mt-8 w-full sm:w-auto sm:px-8")}>
            {t("doneEnter")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * People
 * ──────────────────────────────────────────────────────────────────────────── */

function FriendButton({ id, size = "md", className }) {
  const app = useApp();
  const { t } = useI18n();
  const status = app.friends[id];
  const sizing = size === "sm" ? btn.sm : btn.md;
  if (status === "friends") {
    return (
      <span
        className={cx(
          "inline-flex items-center justify-center gap-1.5 border border-transparent font-medium leading-tight text-emerald-700",
          sizing,
          className,
        )}
      >
        <Check className="size-4 shrink-0" aria-hidden="true" />
        {t("connected")}
      </span>
    );
  }
  if (status === "pending") {
    return (
      <button type="button" onClick={() => app.toggleFriend(id)} title={t("cancelRequest")} className={cx(btn.quiet, sizing, className)}>
        <Clock className="size-4 shrink-0" aria-hidden="true" />
        {t("requestSent")}
      </button>
    );
  }
  if (status === "incoming") {
    return (
      <button type="button" onClick={() => app.acceptRequest(id)} className={cx(btn.primary, sizing, className)}>
        <UserCheck className="size-4 shrink-0" aria-hidden="true" />
        {t("accept")}
      </button>
    );
  }
  return (
    <button type="button" onClick={() => app.toggleFriend(id)} className={cx(btn.secondary, sizing, className)}>
      <UserPlus className="size-4 shrink-0" aria-hidden="true" />
      {t("addFriend")}
    </button>
  );
}

function MessageButton({ id, size = "md", iconOnly = false, className }) {
  const app = useApp();
  const { t } = useI18n();
  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={() => app.messageStudent(id)}
        aria-label={t("message")}
        title={t("message")}
        className={cx(btn.secondary, "size-8 shrink-0", className)}
      >
        <MessageCircle className="size-4" aria-hidden="true" />
      </button>
    );
  }
  return (
    <button type="button" onClick={() => app.messageStudent(id)} className={cx(btn.secondary, size === "sm" ? btn.sm : btn.md, className)}>
      <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
      {t("message")}
    </button>
  );
}

// Why two students match, as one quiet line: "Same major: Informatik · 3 shared interests".
function MatchLine({ match, limit = 2, className }) {
  const { t } = useI18n();
  const parts = match.reasons.map((r) => t(r.key, { subject: MAJOR_BY_ID[r.subject] }));
  if (match.shared.length) parts.push(t("mShared", { n: match.shared.length }));
  if (!parts.length) return null;
  return <p className={cx("text-[13px] leading-snug text-indigo-600", className)}>{parts.slice(0, limit).join(" · ")}</p>;
}

// Interests as a comma-separated line; the ones you share are set in full ink.
function InterestText({ ids, shared = [], limit, className }) {
  const { tx } = useI18n();
  const ordered = [...ids].sort((a, b) => shared.includes(b) - shared.includes(a));
  const shown = limit ? ordered.slice(0, limit) : ordered;
  return (
    <p className={cx("text-[13px] leading-snug", C.muted, className)}>
      {shown.map((id, i) => (
        <Fragment key={id}>
          {i > 0 && ", "}
          <span className={shared.includes(id) ? "font-medium text-zinc-900" : undefined}>{tx(INTEREST_BY_ID[id])}</span>
        </Fragment>
      ))}
      {limit && ids.length > limit && ` +${ids.length - limit}`}
    </p>
  );
}

function SubjectLines({ student: s }) {
  const { t, subject } = useI18n();
  return (
    <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-0.5 text-sm">
      <dt className={C.muted}>{t("major")}</dt>
      <dd className="min-w-0 truncate">{subject(s.major)}</dd>
      <dt className={C.muted}>{t("minor")}</dt>
      <dd className={cx("min-w-0 truncate", !s.minor && C.muted)}>{s.minor ? subject(s.minor) : t("noMinor")}</dd>
    </dl>
  );
}

function ProfileCard({ student: s }) {
  const app = useApp();
  const { t, tx } = useI18n();
  const match = matchInfo(app.profile, s);
  return (
    <article className={cx(C.card, "flex flex-col p-4")}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => app.openProfile(s.id)}
          aria-label={`${t("viewProfile")}: ${s.name}`}
          className={cx("shrink-0 rounded-full", FOCUS)}
        >
          <Avatar person={s} size="md" online={s.online} />
        </button>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => app.openProfile(s.id)}
            className="block min-w-0 max-w-full truncate text-left font-medium transition hover:text-indigo-600"
          >
            {s.name}
          </button>
          <p className={cx("text-[13px]", C.muted)}>
            {t("semesterN", { n: s.semester })} · {tx(DEGREE_BY_ID[s.degree])}
            {s.semester === 1 ? ` · ${t("ersti")}` : ""}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <SubjectLines student={s} />
      </div>
      <MatchLine match={match} limit={3} className="mt-3" />
      <InterestText ids={s.interests} shared={match.shared} className="mt-1" />
      <p className={cx("mt-3 line-clamp-2 text-sm", C.body)}>{tx(s.bio)}</p>
      <div className="mt-auto flex gap-2 pt-4">
        <FriendButton id={s.id} className="flex-1" />
        <MessageButton id={s.id} className="flex-1" />
      </div>
    </article>
  );
}

function MiniProfileCard({ student: s, match }) {
  const app = useApp();
  const { t, subject } = useI18n();
  return (
    <article className={cx(C.card, "flex w-64 shrink-0 snap-start flex-col p-4")}>
      <button type="button" onClick={() => app.openProfile(s.id)} className={cx("flex items-center gap-3 rounded-lg text-left", FOCUS)}>
        <Avatar person={s} size="md" online={s.online} />
        <span className="min-w-0">
          <span className="block min-w-0 truncate font-medium">{s.name}</span>
          <span className={cx("block min-w-0 truncate text-[13px]", C.muted)}>
            {subject(s.major)} · {t("semShort", { n: s.semester })}
          </span>
        </span>
      </button>
      <MatchLine match={match} className="mt-3" />
      <div className="mt-auto flex gap-2 pt-4">
        <FriendButton id={s.id} size="sm" className="flex-1" />
        <MessageButton id={s.id} iconOnly />
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Events & groups
 * ──────────────────────────────────────────────────────────────────────────── */

// One event as a row: time on the left, the plan and its action on the right.
function EventCard({ event: ev, preview = false, highlight = false, compact = false }) {
  const app = useApp();
  const { t, tx, lang } = useI18n();
  const [confirming, setConfirming] = useState(false);
  const type = EVENT_TYPE_BY_ID[ev.type];
  const TypeIcon = type.icon;
  const host = app.person(ev.host);
  const eligible = preview || canAccess(ev, app.profile);
  const joined = ev.attendees.includes(ME);
  const isHost = ev.host === ME;
  const requested = !!app.eventRequests[ev.id];
  const count = ev.attendees.length;
  const full = count >= ev.max;
  const live = isLive(ev, app.now);
  const left = Math.max(0, ev.max - count);
  const description = tx(ev.description);

  let action;
  if (preview) {
    action = <span className={cx(btn.secondary, btn.sm, "pointer-events-none")}>{t("join")}</span>;
  } else if (!eligible) {
    action = (
      <span className={cx("inline-flex items-center gap-1.5 text-[13px]", C.muted)}>
        <Lock className="size-3.5" aria-hidden="true" />
        {t("notEligible", { subject: MAJOR_BY_ID[ev.subject] })}
      </span>
    );
  } else if (isHost) {
    action = confirming ? (
      <>
        <span className={cx("text-[13px]", C.muted)}>{t("confirmCancel")}</span>
        <button type="button" onClick={() => setConfirming(false)} className={cx(btn.ghost, btn.sm)}>
          {t("keep")}
        </button>
        <button type="button" onClick={() => app.cancelEvent(ev)} className={cx(btn.danger, btn.sm)}>
          {t("yesCancel")}
        </button>
      </>
    ) : (
      <button type="button" onClick={() => setConfirming(true)} className={cx(btn.dangerGhost, btn.sm, "-ml-2.5")}>
        <Trash2 className="size-3.5" aria-hidden="true" />
        {t("cancelEvent")}
      </button>
    );
  } else if (joined) {
    action = (
      <>
        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-emerald-700">
          <Check className="size-4" aria-hidden="true" />
          {t("joined")}
        </span>
        <button type="button" onClick={() => app.leaveEvent(ev)} className={cx(btn.ghost, btn.sm)}>
          {t("leave")}
        </button>
      </>
    );
  } else if (requested) {
    action = (
      <button type="button" onClick={() => app.requestJoin(ev)} title={t("cancelRequest")} className={cx(btn.quiet, btn.sm)}>
        <Hourglass className="size-3.5" aria-hidden="true" />
        {t("requested")}
      </button>
    );
  } else if (full) {
    action = <span className={cx("text-[13px]", C.muted)}>{t("full")}</span>;
  } else if (ev.approval) {
    action = (
      <button type="button" onClick={() => app.requestJoin(ev)} className={cx(btn.secondary, btn.sm)}>
        {t("requestJoin")}
      </button>
    );
  } else {
    action = (
      <button type="button" onClick={() => app.joinEvent(ev)} className={cx(btn.secondary, btn.sm)}>
        <Plus className="size-3.5" aria-hidden="true" />
        {t("join")}
      </button>
    );
  }

  return (
    <article className={cx("flex gap-4 p-4", !eligible && "opacity-50", highlight && "uc-flash")}>
      <div className="w-16 shrink-0">
        <p className="uc-tnum flex items-center gap-1.5 text-[15px] font-semibold leading-tight">
          {fmtTime(ev.start, lang)}
          {live && <LiveDot />}
        </p>
        <p className={cx("mt-0.5 text-xs", live ? "font-medium text-emerald-700" : C.muted)}>
          {live ? t("liveNow") : fmtDay(ev.start, app.now, lang, t)}
        </p>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-medium leading-snug">{tx(ev.title)}</h3>
        <p className={cx("mt-0.5 flex min-w-0 items-center gap-1.5 text-sm", C.muted)}>
          <TypeIcon className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="min-w-0 truncate">
            {tx(type.label)} · {tx(ev.location)}
          </span>
        </p>
        {!compact && description && <p className={cx("mt-1.5 line-clamp-2 text-sm", C.body)}>{description}</p>}
        <p className={cx("mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]", C.muted)}>
          <AudienceBadge item={ev} />
          <span className="uc-tnum">{t("going", { n: count, max: ev.max })}</span>
          {!full && left <= 2 && <span className="text-rose-600">{t("spotsLeft", { n: left })}</span>}
          <span>{isHost ? t("hosting") : t("hostedBy", { name: firstName(host.name) })}</span>
          {ev.approval && !isHost && <span>{t("approvalNote")}</span>}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">{action}</div>
      </div>
    </article>
  );
}

function EventList({ events, compact = false }) {
  const app = useApp();
  return (
    <ul className="divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-200 bg-white">
      {events.map((e) => (
        <li key={e.id}>
          <EventCard event={e} compact={compact} highlight={app.highlight === e.id} />
        </li>
      ))}
    </ul>
  );
}

function GroupMark({ name, size = "md" }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "grid shrink-0 place-items-center rounded-lg bg-zinc-100 font-semibold text-zinc-700",
        size === "md" ? "size-10 text-[13px]" : "size-8 text-[11px]",
      )}
    >
      {initials(name)}
    </span>
  );
}

function GroupCard({ group: g, highlight = false }) {
  const app = useApp();
  const { t, tx } = useI18n();
  const member = g.members.includes(ME);
  const description = tx(g.description);
  return (
    <article className={cx(C.card, "flex flex-col p-4", highlight && "uc-flash")}>
      <div className="flex items-start gap-3">
        <GroupMark name={tx(g.name)} />
        <div className="min-w-0 flex-1">
          <h3 className="font-medium leading-snug">{tx(g.name)}</h3>
          <p className={cx("mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[13px]", C.muted)}>
            <AudienceBadge item={g} group />
            <span className="uc-tnum">{t("membersN", { n: g.members.length + g.extra })}</span>
            {g.invited.length > 0 && <span className="uc-tnum">{t("invitedN", { n: g.invited.length })}</span>}
          </p>
        </div>
      </div>
      {description && <p className={cx("mt-3 line-clamp-2 text-sm", C.body)}>{description}</p>}
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {member ? (
          <>
            <button type="button" onClick={() => app.openThread(`group:${g.id}`)} className={cx(btn.secondary, btn.sm)}>
              <MessageCircle className="size-3.5" aria-hidden="true" />
              {t("openChat")}
            </button>
            <button type="button" onClick={() => app.openModal({ type: "invite", groupId: g.id })} className={cx(btn.ghost, btn.sm)}>
              <UserPlus className="size-3.5" aria-hidden="true" />
              {t("invite")}
            </button>
            <button type="button" onClick={() => app.leaveGroup(g)} className={cx(btn.ghost, btn.sm, "ml-auto")}>
              {t("leaveGroup")}
            </button>
          </>
        ) : (
          <button type="button" onClick={() => app.joinGroup(g)} className={cx(btn.secondary, btn.sm)}>
            <Plus className="size-3.5" aria-hidden="true" />
            {t("joinGroup")}
          </button>
        )}
      </div>
    </article>
  );
}

function InviteChecklist({ candidates, selected, onChange, blocked = {} }) {
  const { t, subject } = useI18n();
  const selectable = candidates.filter((s) => !blocked[s.id]);
  const allOn = selectable.length > 0 && selectable.every((s) => selected.includes(s.id));
  const toggle = (id) => onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  return (
    <div>
      {selectable.length > 1 && (
        <div className="mb-2 flex justify-end">
          <button type="button" onClick={() => onChange(allOn ? [] : selectable.map((s) => s.id))} className={cx(LINK, "text-sm")}>
            {allOn ? t("selectNone") : t("selectAll")}
          </button>
        </div>
      )}
      <ul className="divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-200">
        {candidates.map((s) => {
          const reason = blocked[s.id];
          const on = selected.includes(s.id);
          return (
            <li key={s.id}>
              <label
                className={cx(
                  "flex items-center gap-3 px-3 py-2.5 transition",
                  reason ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-zinc-50",
                )}
              >
                <input
                  id={`uc-invite-${s.id}`}
                  type="checkbox"
                  className="peer sr-only"
                  checked={on}
                  disabled={!!reason}
                  onChange={() => toggle(s.id)}
                />
                <span
                  aria-hidden="true"
                  className={cx(
                    "grid size-4 shrink-0 place-items-center rounded border transition peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2",
                    on ? "border-indigo-600 bg-indigo-600 text-white" : "border-zinc-300 bg-white",
                  )}
                >
                  {on && <Check className="size-3" strokeWidth={3} />}
                </span>
                <Avatar person={s} size="sm" online={s.online} />
                <span className="min-w-0 flex-1">
                  <span className="block min-w-0 truncate text-sm font-medium">{s.name}</span>
                  <span className={cx("block min-w-0 truncate text-xs", C.muted)}>
                    {subject(s.major)}
                    {s.minor ? ` · ${subject(s.minor)}` : ""}
                  </span>
                </span>
                {reason && <span className={cx("shrink-0 text-xs", C.muted)}>{reason}</span>}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AudienceOption({ checked, onSelect, icon: Icon, title, body }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className={cx(TILE, "flex items-start gap-3 p-3.5", checked ? TILE_ON : TILE_OFF)}
    >
      <Icon className={cx("mt-0.5 size-4 shrink-0", checked ? "text-indigo-600" : "text-zinc-400")} aria-hidden="true" />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{title}</span>
        <span className={cx("mt-0.5 block text-[13px] leading-snug", C.muted)}>{body}</span>
      </span>
      <span
        aria-hidden="true"
        className={cx("mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border", checked ? "border-indigo-600" : "border-zinc-300")}
      >
        {checked && <span className="size-2 rounded-full bg-indigo-600" />}
      </span>
    </button>
  );
}

// "Only my major" can target the Hauptfach or, if there is one, the Nebenfach.
function SubjectPicker({ value, onChange }) {
  const app = useApp();
  const { t, subject } = useI18n();
  const P = app.profile;
  if (!P.minor) return null;
  return (
    <div className="uc-fade mt-3 flex flex-wrap items-center gap-2">
      <span className={cx("text-sm", C.muted)}>{t("ceRestrictTo")}</span>
      <Choice
        label={t("ceRestrictTo")}
        value={value}
        onChange={onChange}
        options={[
          { value: P.major, label: `${subject(P.major)} · ${t("major")}` },
          { value: P.minor, label: `${subject(P.minor)} · ${t("minor")}` },
        ]}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Modals
 * ──────────────────────────────────────────────────────────────────────────── */

function ModalActions({ onCancel, children }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-end gap-2">
      <button type="button" onClick={onCancel} className={cx(btn.ghost, btn.md)}>
        {t("cancel")}
      </button>
      {children}
    </div>
  );
}

function CreateEventModal({ preset, presetAudience, onClose }) {
  const app = useApp();
  const { t, tx } = useI18n();
  const initial = EVENT_TYPE_BY_ID[preset] || EVENT_TYPES[0];
  const [type, setType] = useState(initial.id);
  const [title, setTitle] = useState(() => tx(initial.title));
  const [location, setLocation] = useState(() => tx(LOCATIONS[initial.id][0]));
  const [slot, setSlot] = useState(() => defaultSlot(initial.time, Date.now()));
  const [max, setMax] = useState(initial.max);
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState(presetAudience || "open");
  const [restrictTo, setRestrictTo] = useState(app.profile.major);
  const [edited, setEdited] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const mark = (field) => setEdited((e) => (e[field] ? e : { ...e, [field]: true }));

  // Picking a preset fills in sensible defaults, without overwriting what the user typed.
  const chooseType = (id) => {
    const next = EVENT_TYPE_BY_ID[id];
    setType(id);
    if (!edited.title) setTitle(tx(next.title));
    if (!edited.location) setLocation(tx(LOCATIONS[id][0]));
    if (!edited.slot) setSlot(defaultSlot(next.time, Date.now()));
    if (!edited.max) setMax(next.max);
  };

  const start = fromInputs(slot.date, slot.time);
  const errors = {
    title: title.trim() ? null : t("ceErrTitle"),
    location: location.trim() ? null : t("ceErrLocation"),
    slot: start > Date.now() ? null : t("ceErrPast"),
  };
  const valid = !errors.title && !errors.location && !errors.slot;
  const today = toDateInput(Date.now());
  const tomorrow = toDateInput(Date.now() + 864e5);
  const setDay = (date) => {
    setSlot((s) => ({ ...s, date }));
    mark("slot");
  };

  const submit = () => {
    setSubmitted(true);
    if (!valid) return;
    app.createEvent({
      type,
      title: title.trim(),
      location: location.trim(),
      description: description.trim(),
      start,
      max,
      audience,
      subject: audience === "major" ? restrictTo : undefined,
    });
  };

  const draft = {
    id: "draft",
    type,
    title: title.trim() || tx(EVENT_TYPE_BY_ID[type].title),
    location: location.trim() || "…",
    description: description.trim(),
    start: Number.isFinite(start) ? start : Date.now(),
    max,
    audience,
    subject: audience === "major" ? restrictTo : undefined,
    host: ME,
    attendees: [ME],
  };

  return (
    <Modal
      open
      wide
      onClose={onClose}
      title={t("ceTitle")}
      subtitle={t("ceLead")}
      footer={
        <ModalActions onCancel={onClose}>
          <button type="button" onClick={submit} className={cx(btn.primary, btn.md)}>
            {t("ceSubmit")}
          </button>
        </ModalActions>
      }
    >
      <div className="grid grid-cols-1 gap-6">
        <fieldset>
          <legend className={C.label}>{t("ceType")}</legend>
          <div className="uc-noscrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
            {EVENT_TYPES.map((et) => {
              const on = et.id === type;
              const Icon = et.icon;
              return (
                <button
                  key={et.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => chooseType(et.id)}
                  className={cx(
                    TILE,
                    "flex w-[6.5rem] shrink-0 flex-col items-center gap-1.5 px-2 py-3 text-center text-[13px] font-medium leading-tight sm:w-auto",
                    on ? TILE_ON : TILE_OFF,
                  )}
                >
                  <Icon className={cx("size-5", on ? "text-indigo-600" : "text-zinc-400")} aria-hidden="true" />
                  {tx(et.label)}
                </button>
              );
            })}
          </div>
        </fieldset>

        <Field label={t("ceName")} htmlFor="uc-ev-title" error={submitted && errors.title}>
          <input
            id="uc-ev-title"
            value={title}
            maxLength={80}
            onChange={(e) => {
              setTitle(e.target.value);
              mark("title");
            }}
            className={inputCls("w-full px-3 py-2 text-[15px]", submitted && !!errors.title)}
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className={C.label}>{t("ceDay")}</p>
            <div className="flex flex-wrap items-center gap-2">
              {[
                [today, t("today")],
                [tomorrow, t("tomorrow")],
              ].map(([date, label]) => (
                <button
                  key={date}
                  type="button"
                  aria-pressed={slot.date === date}
                  onClick={() => setDay(date)}
                  className={cx(CHIP, slot.date === date ? CHIP_ON : CHIP_OFF)}
                >
                  {label}
                </button>
              ))}
              <input
                id="uc-ev-date"
                type="date"
                aria-label={t("ceDay")}
                value={slot.date}
                min={today}
                onChange={(e) => setDay(e.target.value)}
                className={inputCls("min-w-0 flex-1 px-2.5 py-1.5 text-sm")}
              />
            </div>
          </div>
          <Field label={t("ceTime")} htmlFor="uc-ev-time" error={submitted && errors.slot}>
            <input
              id="uc-ev-time"
              type="time"
              step={300}
              value={slot.time}
              onChange={(e) => {
                setSlot((s) => ({ ...s, time: e.target.value }));
                mark("slot");
              }}
              // appearance-none: iOS otherwise renders time fields wider than their column.
              className={inputCls("w-full appearance-none px-3 py-2 text-[15px]", submitted && !!errors.slot)}
            />
          </Field>
        </div>

        <Field label={t("ceLocation")} htmlFor="uc-ev-location" error={submitted && errors.location}>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
            <input
              id="uc-ev-location"
              value={location}
              maxLength={80}
              placeholder={t("ceLocationPlaceholder")}
              onChange={(e) => {
                setLocation(e.target.value);
                mark("location");
              }}
              className={inputCls("w-full py-2 pl-9 pr-3 text-[15px]", submitted && !!errors.location)}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {LOCATIONS[type].map((loc) => {
              const label = tx(loc);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setLocation(label);
                    mark("location");
                  }}
                  className={cx(CHIP, location === label ? CHIP_ON : CHIP_OFF)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
          <div>
            <p id="uc-ev-max" className={C.label}>
              {t("ceMax")}
            </p>
            <div className="flex items-center gap-2" role="group" aria-labelledby="uc-ev-max">
              <button
                type="button"
                aria-label={t("fewer")}
                disabled={max <= 2}
                onClick={() => {
                  setMax((m) => Math.max(2, m - 1));
                  mark("max");
                }}
                className={cx(btn.secondary, "size-9 shrink-0")}
              >
                <Minus className="size-4" aria-hidden="true" />
              </button>
              <span className="uc-tnum w-10 text-center text-[15px] font-semibold" aria-live="polite">
                {max}
              </span>
              <button
                type="button"
                aria-label={t("more")}
                disabled={max >= 50}
                onClick={() => {
                  setMax((m) => Math.min(50, m + 1));
                  mark("max");
                }}
                className={cx(btn.secondary, "size-9 shrink-0")}
              >
                <Plus className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <Field label={t("ceDetails")} htmlFor="uc-ev-details" aside={<span className={cx("text-xs", C.muted)}>{t("optional")}</span>}>
            <textarea
              id="uc-ev-details"
              rows={2}
              maxLength={200}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("ceDetailsPlaceholder")}
              className={cx(C.input, "resize-none")}
            />
          </Field>
        </div>

        <fieldset>
          <legend className={C.label}>{t("ceAudience")}</legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="radiogroup" aria-label={t("ceAudience")}>
            <AudienceOption
              checked={audience === "major"}
              onSelect={() => setAudience("major")}
              icon={Lock}
              title={t("ceOnlyMajor")}
              body={t("ceOnlyMajorBody", { subject: MAJOR_BY_ID[restrictTo] })}
            />
            <AudienceOption
              checked={audience === "open"}
              onSelect={() => setAudience("open")}
              icon={Globe}
              title={t("ceOpenAll")}
              body={t("ceOpenAllBody")}
            />
          </div>
          {audience === "major" && <SubjectPicker value={restrictTo} onChange={setRestrictTo} />}
        </fieldset>

        <div>
          <p className={cx(HEAD, "mb-2")}>{t("cePreview")}</p>
          <div className="overflow-hidden rounded-xl border border-zinc-200">
            <EventCard event={draft} preview />
          </div>
        </div>
      </div>
    </Modal>
  );
}

function CreateGroupModal({ onClose }) {
  const app = useApp();
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("major");
  const [restrictTo, setRestrictTo] = useState(app.profile.major);
  const [invites, setInvites] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Friends who can't join a major-only group are shown, but can't be selected.
  const blocked = {};
  app.friendList.forEach((f) => {
    if (!studentCanAccess(f, { audience, subject: restrictTo })) blocked[f.id] = t("notInSubject", { subject: MAJOR_BY_ID[restrictTo] });
  });
  const validInvites = invites.filter((id) => !blocked[id]);
  const nameError = name.trim().length < 3 ? t("cgNameError") : null;

  const submit = () => {
    setSubmitted(true);
    if (nameError) return;
    app.createGroup({
      name: name.trim(),
      description: description.trim(),
      audience,
      subject: audience === "major" ? restrictTo : undefined,
      invites: validInvites,
    });
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={t("cgTitle")}
      subtitle={t("cgLead")}
      footer={
        <ModalActions onCancel={onClose}>
          <button type="button" onClick={submit} className={cx(btn.primary, btn.md)}>
            {validInvites.length ? t("cgSubmitInvite", { n: validInvites.length }) : t("cgSubmit")}
          </button>
        </ModalActions>
      }
    >
      <div className="grid grid-cols-1 gap-6">
        <Field label={t("cgName")} htmlFor="uc-group-name" error={submitted && nameError}>
          <input
            id="uc-group-name"
            value={name}
            maxLength={50}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("cgNamePlaceholder")}
            className={inputCls("w-full px-3 py-2 text-[15px]", submitted && !!nameError)}
          />
        </Field>
        <Field label={t("cgDesc")} htmlFor="uc-group-desc" aside={<span className={cx("text-xs", C.muted)}>{t("optional")}</span>}>
          <textarea
            id="uc-group-desc"
            rows={2}
            maxLength={200}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("cgDescPlaceholder")}
            className={cx(C.input, "resize-none")}
          />
        </Field>

        <fieldset>
          <legend className={C.label}>{t("cgVisibility")}</legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="radiogroup" aria-label={t("cgVisibility")}>
            <AudienceOption
              checked={audience === "major"}
              onSelect={() => setAudience("major")}
              icon={Lock}
              title={t("cgMajorOnly")}
              body={t("cgMajorOnlyBody", { subject: MAJOR_BY_ID[restrictTo] })}
            />
            <AudienceOption
              checked={audience === "open"}
              onSelect={() => setAudience("open")}
              icon={Globe}
              title={t("cgUniWide")}
              body={t("cgUniWideBody")}
            />
          </div>
          {audience === "major" && <SubjectPicker value={restrictTo} onChange={setRestrictTo} />}
        </fieldset>

        <div>
          <p className={C.label}>{t("cgInvite")}</p>
          {app.friendList.length ? (
            <InviteChecklist candidates={app.friendList} selected={validInvites} onChange={setInvites} blocked={blocked} />
          ) : (
            <p className={cx("rounded-xl border border-dashed border-zinc-200 p-4 text-sm", C.muted)}>{t("noFriendsToInvite")}</p>
          )}
        </div>
      </div>
    </Modal>
  );
}

function InviteModal({ groupId, onClose }) {
  const app = useApp();
  const { t } = useI18n();
  const [selected, setSelected] = useState([]);
  const g = app.groups.find((x) => x.id === groupId);
  if (!g) return null;

  const blocked = {};
  app.friendList.forEach((f) => {
    if (g.members.includes(f.id)) blocked[f.id] = t("memberTag");
    else if (g.invited.includes(f.id)) blocked[f.id] = t("invitedTag");
    else if (!studentCanAccess(f, g)) blocked[f.id] = t("notInSubject", { subject: MAJOR_BY_ID[g.subject] });
  });
  const valid = selected.filter((id) => !blocked[id]);
  const anyInvitable = app.friendList.some((f) => !blocked[f.id]);

  return (
    <Modal
      open
      onClose={onClose}
      title={t("inviteTitle", { group: g.name })}
      subtitle={t("inviteLead")}
      footer={
        <ModalActions onCancel={onClose}>
          <button type="button" disabled={!valid.length} onClick={() => app.inviteToGroup(g, valid)} className={cx(btn.primary, btn.md)}>
            {valid.length ? t("inviteSend", { n: valid.length }) : t("inviteNone")}
          </button>
        </ModalActions>
      }
    >
      {app.friendList.length === 0 ? (
        <p className={cx("text-sm", C.muted)}>{t("noFriendsToInvite")}</p>
      ) : (
        <>
          {!anyInvitable && <p className={cx("mb-3 text-sm", C.muted)}>{t("allFriendsInGroup")}</p>}
          <InviteChecklist candidates={app.friendList} selected={valid} onChange={setSelected} blocked={blocked} />
        </>
      )}
    </Modal>
  );
}

function StudentProfileModal({ id, onClose }) {
  const app = useApp();
  const { t, tx, lang } = useI18n();
  const s = app.byId[id];
  if (!s) return null;
  const match = matchInfo(app.profile, s);
  const going = app.events.filter((e) => e.attendees.includes(s.id) && isUpcoming(e, app.now) && canAccess(e, app.profile));
  return (
    <Modal
      open
      layer="z-[60]"
      onClose={onClose}
      title={s.name}
      subtitle={`${app.profile.uni?.short} · ${t("semesterN", { n: s.semester })} · ${tx(DEGREE_BY_ID[s.degree])}`}
      footer={
        <div className="flex gap-2">
          <FriendButton id={s.id} className="flex-1" />
          <MessageButton id={s.id} className="flex-1" />
        </div>
      }
    >
      <div className="flex items-center gap-4">
        <Avatar person={s} size="xl" online={s.online} />
        <div className="min-w-0 flex-1">
          <SubjectLines student={s} />
          <p className={cx("mt-1.5 text-xs", s.online ? "text-emerald-700" : C.muted)}>{s.online ? t("online") : t("offline")}</p>
        </div>
      </div>
      <section className="mt-6">
        <h3 className={HEAD}>{t("about")}</h3>
        <p className={cx("mt-1", C.body)}>{tx(s.bio)}</p>
      </section>
      {match.relevant && (
        <section className="mt-5">
          <h3 className={HEAD}>{t("whyMatch")}</h3>
          <MatchLine match={match} limit={5} className="mt-1" />
        </section>
      )}
      <section className="mt-5">
        <h3 className={HEAD}>{t("interestsLabel")}</h3>
        <InterestText ids={s.interests} shared={match.shared} className="mt-1" />
      </section>
      {going.length > 0 && (
        <section className="mt-5">
          <h3 className={HEAD}>{t("goingTo")}</h3>
          <ul className="mt-1 divide-y divide-zinc-100">
            {going.map((e) => (
              <li key={e.id} className="flex items-center gap-3 py-2">
                <span className="min-w-0 flex-1 truncate text-sm">{tx(e.title)}</span>
                <span className={cx("shrink-0 text-xs", C.muted)}>{fmtWhen(e, app.now, lang, t)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Modal>
  );
}

function MatchRing({ pct, children }) {
  const r = 47;
  const circumference = 2 * Math.PI * r;
  return (
    <div className="relative grid size-28 place-items-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="3" className="stroke-zinc-100" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct / 100)}
          className="stroke-indigo-600 transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      {children}
    </div>
  );
}

function StudyBuddyModal({ onClose }) {
  const app = useApp();
  const { t } = useI18n();
  // Ranked once when the modal opens, so the list doesn't reshuffle while swiping.
  const [candidates] = useState(() =>
    app.students
      .filter((s) => app.friends[s.id] !== "friends")
      .map((s) => ({ s, match: matchInfo(app.profile, s), boost: s.interests.includes("study_buddy") ? 15 : 0 }))
      .filter((c) => c.match.score >= 20 || c.boost > 0)
      .sort((a, b) => b.match.score + b.boost - (a.match.score + a.boost)),
  );
  const [index, setIndex] = useState(0);
  const current = candidates[index];
  return (
    <Modal open onClose={onClose} title={t("sbTitle")} subtitle={t("sbLead")}>
      {current ? (
        <BuddyCard
          key={current.s.id}
          student={current.s}
          match={current.match}
          position={t("sbCounter", { i: index + 1, n: candidates.length })}
          onNext={() => setIndex((i) => i + 1)}
        />
      ) : (
        <EmptyState
          bare
          icon={Sparkles}
          title={t("sbDoneTitle")}
          body={t("sbDoneBody")}
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" onClick={() => setIndex(0)} className={cx(btn.secondary, btn.md)}>
                <RotateCcw className="size-4" aria-hidden="true" />
                {t("sbRestart")}
              </button>
              <button type="button" onClick={() => app.goTab("explore")} className={cx(btn.primary, btn.md)}>
                {t("sbBrowse")}
              </button>
            </div>
          }
        />
      )}
    </Modal>
  );
}

function BuddyCard({ student: s, match, position, onNext }) {
  const app = useApp();
  const { t, tx, lang, subject } = useI18n();
  const status = app.friends[s.id];
  const pct = new Intl.NumberFormat(LOCALES[lang], { style: "percent" }).format(match.pct / 100);
  const connect = () => {
    if (status === "incoming") app.acceptRequest(s.id);
    else if (!status) app.toggleFriend(s.id);
    onNext();
  };
  return (
    <div className="uc-fade">
      <p className={cx("uc-tnum text-center text-xs", C.muted)}>{position}</p>
      <div className="mt-4 flex flex-col items-center text-center">
        <MatchRing pct={match.pct}>
          <Avatar person={s} size="xl" online={s.online} />
        </MatchRing>
        <p className="mt-2 text-sm text-indigo-600">
          <span className="uc-tnum font-semibold">{pct}</span> {t("sbMatch")}
        </p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight">{s.name}</h3>
        <p className={cx("text-sm", C.muted)}>
          {subject(s.major)}
          {s.minor ? ` + ${subject(s.minor)}` : ""} · {t("semesterN", { n: s.semester })}
        </p>
        <MatchLine match={match} limit={4} className="mt-3" />
        <InterestText ids={s.interests} shared={match.shared} className="mt-1" />
        <p className={cx("mt-4 max-w-sm text-sm", C.body)}>{tx(s.bio)}</p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        <button type="button" onClick={onNext} className={cx(btn.secondary, "px-2 py-2 text-sm")}>
          <X className="size-4 shrink-0" aria-hidden="true" />
          {t("sbSkip")}
        </button>
        <button type="button" onClick={() => app.messageStudent(s.id)} className={cx(btn.secondary, "px-2 py-2 text-sm")}>
          <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
          {t("message")}
        </button>
        <button type="button" onClick={connect} disabled={status === "pending"} className={cx(btn.primary, "px-2 py-2 text-sm")}>
          {status === "incoming" ? (
            <UserCheck className="size-4 shrink-0" aria-hidden="true" />
          ) : (
            <UserPlus className="size-4 shrink-0" aria-hidden="true" />
          )}
          {status === "pending" ? t("requestSent") : status === "incoming" ? t("accept") : t("sbConnect")}
        </button>
      </div>
    </div>
  );
}

function MyProfileModal({ onClose }) {
  const app = useApp();
  const { t, tx } = useI18n();
  const P = app.profile;
  const bio = tx(P.bio);
  const stats = [
    { label: t("statFriends"), n: app.friendList.length },
    { label: t("statEvents"), n: app.events.filter((e) => e.attendees.includes(ME) && isUpcoming(e, app.now)).length },
    { label: t("statGroups"), n: app.groups.filter((g) => g.members.includes(ME)).length },
  ];
  return (
    <Modal
      open
      onClose={onClose}
      title={t("myProfile")}
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <LangToggle />
          <button type="button" onClick={app.logout} className={cx(btn.dangerGhost, btn.md)}>
            <LogOut className="size-4" aria-hidden="true" />
            {t("restartDemo")}
          </button>
        </div>
      }
    >
      <CampusCard profile={P} uni={P.uni} verified className="mx-auto" />
      <p className={cx("mt-3 flex items-center justify-center gap-1.5 text-sm", C.muted)}>
        <BadgeCheck className="size-4 text-emerald-600" aria-hidden="true" />
        {t("verifiedVia", { domain: domainOf(P.email) })}
      </p>
      <dl className="mt-5 grid grid-cols-3 divide-x divide-zinc-100 border-y border-zinc-100 py-3 text-center">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse">
            <dt className={cx("text-xs", C.muted)}>{s.label}</dt>
            <dd className="uc-tnum text-xl font-semibold">{s.n}</dd>
          </div>
        ))}
      </dl>
      {bio && (
        <section className="mt-6">
          <h3 className={HEAD}>{t("about")}</h3>
          <p className={cx("mt-1", C.body)}>{bio}</p>
        </section>
      )}
      <section className="mt-5">
        <h3 className={HEAD}>{t("interestsLabel")}</h3>
        <InterestText ids={P.interests} className="mt-1" />
      </section>
    </Modal>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Home
 * ──────────────────────────────────────────────────────────────────────────── */

function HomeView() {
  const app = useApp();
  const { t, subject } = useI18n();
  const P = app.profile;
  const hour = new Date(app.now).getHours();
  const greeting = hour >= 5 && hour < 11 ? "greetMorning" : hour >= 11 && hour < 18 ? "greetDay" : "greetEvening";
  const recommendations = useMemo(
    () =>
      app.students
        .map((s) => ({ s, match: matchInfo(P, s) }))
        .filter((x) => x.match.relevant)
        .sort((a, b) => b.match.score - a.match.score)
        .slice(0, 8),
    [app.students, P],
  );
  const feed = app.events.filter((e) => isUpcoming(e, app.now) && canAccess(e, P)).slice(0, 4);
  const context = [P.uni?.short, `${subject(P.major)}${P.minor ? ` + ${subject(P.minor)}` : ""}`, t("semesterN", { n: P.semester })]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t(greeting, { name: firstName(P.name) })}</h1>
        <p className={cx("mt-1", C.muted)}>{context}</p>
      </header>

      <QuickActions />

      <section>
        <SectionTitle
          title={t("recTitle")}
          lead={t("recLead")}
          action={
            <button type="button" onClick={() => app.goTab("explore")} className={cx(LINK, "shrink-0 text-sm")}>
              {t("seeAll")}
            </button>
          }
        />
        <div className="uc-noscrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8">
          {recommendations.map(({ s, match }) => (
            <MiniProfileCard key={s.id} student={s} match={match} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
        <section>
          <SectionTitle
            title={
              <span className="inline-flex items-center gap-2">
                {t("feedTitle")}
                <LiveDot />
              </span>
            }
            lead={t("feedLead")}
            action={
              <button type="button" onClick={() => app.goTab("events")} className={cx(LINK, "shrink-0 text-sm")}>
                {t("allEvents")}
              </button>
            }
          />
          <EventList events={feed} compact />
        </section>
        <aside className="flex flex-col gap-10">
          <MensaCard />
          <FriendsOnline />
        </aside>
      </div>
    </div>
  );
}

function QuickActions() {
  const app = useApp();
  const { t } = useI18n();
  const actions = [
    { icon: Utensils, title: t("qaEventTitle"), body: t("qaEventBody"), run: () => app.openModal({ type: "createEvent", preset: "mensa" }) },
    { icon: Users, title: t("qaGroupTitle"), body: t("qaGroupBody"), run: () => app.openModal({ type: "createGroup" }) },
    { icon: Target, title: t("qaBuddyTitle"), body: t("qaBuddyBody"), run: () => app.openModal({ type: "buddy" }) },
  ];
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {actions.map(({ icon: Icon, title, body, run }) => (
        <button key={title} type="button" onClick={run} className={cx(TILE, TILE_OFF, "flex items-start gap-3 p-4 hover:bg-zinc-50")}>
          <Icon className="mt-0.5 size-5 shrink-0 text-indigo-600" aria-hidden="true" />
          <span className="min-w-0">
            <span className="block font-medium leading-snug">{title}</span>
            <span className={cx("mt-0.5 block text-sm", C.muted)}>{body}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

function MensaCard() {
  const app = useApp();
  const { t, tx, lang } = useI18n();
  return (
    <section>
      <SectionTitle title={t("mensaTitle")} lead={t("mensaHours")} />
      <ul className="divide-y divide-zinc-100 border-y border-zinc-100">
        {MENSA_MENU.map((dish) => (
          <li key={dish.name.en} className="flex items-start justify-between gap-3 py-2.5">
            <div className="min-w-0">
              <p className="text-sm leading-snug">{tx(dish.name)}</p>
              {dish.tag && <p className="mt-0.5 text-xs text-emerald-700">{t(dish.tag)}</p>}
            </div>
            <span className="uc-tnum shrink-0 text-sm">{fmtPrice(dish.price, lang)}</span>
          </li>
        ))}
      </ul>
      <p className={cx("mt-2 text-xs", C.muted)}>{t("mensaPriceNote")}</p>
      <button
        type="button"
        onClick={() => app.openModal({ type: "createEvent", preset: "mensa" })}
        className={cx(btn.secondary, btn.md, "mt-4 w-full")}
      >
        {t("mensaCta")}
      </button>
    </section>
  );
}

function FriendsOnline() {
  const app = useApp();
  const { t, subject } = useI18n();
  const online = app.friendList.filter((f) => f.online);
  return (
    <section>
      <SectionTitle title={t("friendsOnline")} action={<span className={cx("uc-tnum text-sm", C.muted)}>{online.length}</span>} />
      {online.length ? (
        <ul className="-mx-2 grid grid-cols-1 gap-0.5">
          {online.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => app.messageStudent(f.id)}
                className={cx("flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-zinc-50", FOCUS)}
              >
                <Avatar person={f} size="sm" online />
                <span className="min-w-0 flex-1">
                  <span className="block min-w-0 truncate text-sm font-medium">{f.name}</span>
                  <span className={cx("block min-w-0 truncate text-xs", C.muted)}>{subject(f.major)}</span>
                </span>
                <MessageCircle className="size-4 shrink-0 text-zinc-400" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={cx("text-sm", C.muted)}>{t("noFriendsOnline")}</p>
      )}
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Explore / My Fach
 * ──────────────────────────────────────────────────────────────────────────── */

function searchText(s, tx) {
  const major = MAJOR_BY_ID[s.major];
  const minor = s.minor && MAJOR_BY_ID[s.minor];
  return [
    s.name,
    major.en,
    major.de,
    major.aliases,
    minor && minor.en,
    minor && minor.de,
    ...s.interests.flatMap((id) => [INTEREST_BY_ID[id].en, INTEREST_BY_ID[id].de]),
    tx(s.bio),
  ]
    .filter(Boolean)
    .join(" ");
}

const INTEREST_PREVIEW = 10;

function ExploreView() {
  const app = useApp();
  const { t, tx } = useI18n();
  const P = app.profile;
  const { scope, interests, query } = app.explore;
  const [showAll, setShowAll] = useState(false);
  const setFilter = (patch) => app.setExplore((f) => ({ ...f, ...patch }));
  const resetFilters = () => app.setExplore({ scope: "all", interests: [], query: "" });
  const M = MAJOR_BY_ID[P.major];
  const MajorIcon = M.icon;

  const inScope = useCallback(
    (s, sc) => (sc === "major" ? s.major === P.major : sc === "minor" ? !!P.minor && (s.major === P.minor || s.minor === P.minor) : true),
    [P],
  );
  const counts = {
    major: app.students.filter((s) => inScope(s, "major")).length,
    minor: app.students.filter((s) => inScope(s, "minor")).length,
    all: app.students.length,
  };
  const results = useMemo(() => {
    const q = normalize(query.trim());
    return app.students
      .filter((s) => inScope(s, scope))
      .filter((s) => !interests.length || interests.some((i) => s.interests.includes(i)))
      .filter((s) => !q || normalize(searchText(s, tx)).includes(q))
      .map((s) => ({ s, score: matchInfo(P, s).score }))
      .sort((a, b) => b.score - a.score)
      .map((x) => x.s);
  }, [app.students, scope, interests, query, P, tx, inScope]);

  const hub = [
    { key: "hubStudents", n: counts.major },
    { key: "hubEvents", n: app.events.filter((e) => e.audience === "major" && e.subject === P.major && isUpcoming(e, app.now)).length },
    { key: "hubGroups", n: app.groups.filter((g) => g.audience === "major" && g.subject === P.major).length },
  ];
  const order = [...P.interests, ...INTERESTS.map((i) => i.id).filter((id) => !P.interests.includes(id))];
  const visibleInterests = showAll ? order : order.filter((id, i) => i < INTEREST_PREVIEW || interests.includes(id));
  const toggleInterest = (id) => setFilter({ interests: interests.includes(id) ? interests.filter((x) => x !== id) : [...interests, id] });
  const filtersActive = scope !== "all" || interests.length > 0 || query.trim() !== "";

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={t("exploreTitle")} lead={t("exploreLead", { n: app.students.length, uni: P.uni?.short })} />

      <section className={cx(C.card, "p-5")}>
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <MajorIcon className="mt-1 size-5 shrink-0 text-indigo-600" aria-hidden="true" />
            <div className="min-w-0">
              <p className={cx("text-[13px] font-medium", C.muted)}>{t("navExploreSub")}</p>
              <h2 className="text-lg font-semibold tracking-tight">{t("hubTitle", { subject: M })}</h2>
              <p className={cx("text-sm", C.muted)}>{t("hubLead")}</p>
            </div>
          </div>
          <dl className="flex gap-8 md:shrink-0">
            {hub.map((h) => (
              <div key={h.key} className="flex flex-col-reverse">
                <dt className={cx("text-xs", C.muted)}>{t(h.key)}</dt>
                <dd className="uc-tnum text-xl font-semibold">{h.n}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 border-t border-zinc-100 pt-4">
          <button type="button" onClick={() => setFilter({ scope: "major", interests: [], query: "" })} className={cx(btn.secondary, btn.sm)}>
            {t("hubShow")}
          </button>
          <button
            type="button"
            onClick={() => app.openModal({ type: "createEvent", preset: "study", audience: "major" })}
            className={cx(btn.ghost, btn.sm)}
          >
            <CalendarPlus className="size-3.5" aria-hidden="true" />
            {t("hubPlan")}
          </button>
        </div>
      </section>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
          <input
            id="uc-people-search"
            type="search"
            value={query}
            onChange={(e) => setFilter({ query: e.target.value })}
            placeholder={t("searchPeople")}
            aria-label={t("searchPeople")}
            className={C.search}
          />
        </div>
        <Tabs
          label={t("exploreTitle")}
          value={scope}
          onChange={(v) => setFilter({ scope: v })}
          options={[
            { value: "major", label: t("fMyMajor"), count: counts.major },
            {
              value: "minor",
              label: t("fMyMinor"),
              count: P.minor ? counts.minor : undefined,
              disabled: !P.minor,
              title: P.minor ? undefined : t("noMinorSet"),
            },
            { value: "all", label: t("fAll"), count: counts.all },
          ]}
        />
        <div
          className="uc-noscrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          role="group"
          aria-label={t("interestsLabel")}
        >
          {visibleInterests.map((id) => {
            const on = interests.includes(id);
            return (
              <button key={id} type="button" aria-pressed={on} onClick={() => toggleInterest(id)} className={cx(CHIP, on ? CHIP_ON : CHIP_OFF)}>
                {tx(INTEREST_BY_ID[id])}
              </button>
            );
          })}
          <button type="button" onClick={() => setShowAll((v) => !v)} className={cx(LINK, "shrink-0 px-2 py-1 text-[13px]")}>
            {showAll ? t("fewer") : `${t("more")} +${order.length - visibleInterests.length}`}
          </button>
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm">
            <span className="font-medium">{t("profilesCount", { n: results.length })}</span> <span className={C.muted}>· {t("sortedByMatch")}</span>
          </p>
          {filtersActive && (
            <button type="button" onClick={resetFilters} className={cx(LINK, "text-sm")}>
              {t("resetFilters")}
            </button>
          )}
        </div>
        {results.length ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {results.map((s) => (
              <ProfileCard key={s.id} student={s} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Search}
            title={t("emptyPeopleTitle")}
            body={t("emptyPeopleBody")}
            action={
              <button type="button" onClick={resetFilters} className={cx(btn.secondary, btn.md)}>
                {t("resetFilters")}
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Events
 * ──────────────────────────────────────────────────────────────────────────── */

function EventsView() {
  const app = useApp();
  const { t, tx } = useI18n();
  const P = app.profile;
  const { type, preview } = app.eventFilter;
  const setFilter = (patch) => app.setEventFilter((f) => ({ ...f, ...patch }));

  const upcoming = app.events.filter((e) => isUpcoming(e, app.now));
  const hidden = upcoming.filter((e) => !canAccess(e, P));
  const base = preview ? upcoming : upcoming.filter((e) => canAccess(e, P));
  const isMine = (e) => e.host === ME || e.attendees.includes(ME) || !!app.eventRequests[e.id];
  const list = base.filter((e) => (type === "all" ? true : type === "mine" ? isMine(e) : e.type === type));
  const sections = ["today", "tomorrow", "later"]
    .map((key) => ({ key, items: list.filter((e) => dayBucket(e.start, app.now) === key) }))
    .filter((s) => s.items.length);
  const sectionTitle = { today: t("today"), tomorrow: t("tomorrow"), later: t("later") };
  const options = [
    { value: "all", label: t("fAllTypes"), count: base.length },
    ...EVENT_TYPES.map((et) => ({ value: et.id, label: tx(et.label), count: base.filter((e) => e.type === et.id).length })),
    { value: "mine", label: t("fMine"), count: base.filter(isMine).length },
  ];
  const create = () => app.openModal({ type: "createEvent", preset: EVENT_TYPE_BY_ID[type] ? type : undefined });
  const createButton = (
    <button type="button" onClick={create} className={cx(btn.primary, btn.md)}>
      <Plus className="size-4" aria-hidden="true" />
      {t("createEvent")}
    </button>
  );

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <PageHeader title={t("eventsTitle")} lead={t("eventsLead")} action={createButton} />
      <Tabs label={t("eventsTitle")} value={type} onChange={(v) => setFilter({ type: v })} options={options} />

      {hidden.length > 0 && (
        <div className="flex flex-col gap-3 rounded-xl bg-zinc-50 p-4 sm:flex-row sm:items-center">
          <p className={cx("flex min-w-0 flex-1 items-start gap-2 text-sm", C.body)}>
            <Lock className="mt-0.5 size-4 shrink-0 text-zinc-400" aria-hidden="true" />
            <span>
              {t("hiddenEvents", { n: hidden.length })}
              {preview && <span className={cx("block", C.muted)}>{t("previewOn")}</span>}
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-2.5 pl-6 sm:pl-2">
            <label htmlFor="uc-preview-restricted" className="text-sm font-medium">
              {t("previewRestricted")}
            </label>
            <Switch id="uc-preview-restricted" checked={preview} onChange={(v) => setFilter({ preview: v })} label={t("previewRestricted")} />
          </div>
        </div>
      )}

      {sections.length ? (
        sections.map((section) => (
          <section key={section.key}>
            <h2 className={cx(HEAD, "mb-2")}>{sectionTitle[section.key]}</h2>
            <EventList events={section.items} />
          </section>
        ))
      ) : (
        <EmptyState icon={CalendarDays} title={t("emptyEventsTitle")} body={t("emptyEventsBody")} action={createButton} />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Social: messages, friends & groups
 * ──────────────────────────────────────────────────────────────────────────── */

const lastActivity = (thread) => (thread.messages.length ? thread.messages[thread.messages.length - 1].ts : Number.MAX_SAFE_INTEGER);
const messageText = (m, t, tx) => (m.from === "sys" ? t(m.key, m.vars) : tx(m.text));

function threadTitle(thread, app, tx) {
  if (thread.kind === "dm") return app.byId[thread.with]?.name || "";
  return tx(app.groups.find((g) => g.id === thread.group)?.name);
}

function ThreadAvatar({ thread }) {
  const app = useApp();
  const { tx } = useI18n();
  if (thread.kind === "dm") {
    const s = app.byId[thread.with];
    return <Avatar person={s} size="md" online={s.online} />;
  }
  return <GroupMark name={tx(app.groups.find((x) => x.id === thread.group)?.name) || "?"} />;
}

function SocialView() {
  const app = useApp();
  const { t } = useI18n();
  const myGroups = app.groups.filter((g) => g.members.includes(ME)).length;
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t("socialTitle")}
        lead={t("socialLead")}
        action={
          app.socialTab === "groups" ? (
            <button type="button" onClick={() => app.openModal({ type: "createGroup" })} className={cx(btn.primary, btn.md)}>
              <Plus className="size-4" aria-hidden="true" />
              {t("createGroup")}
            </button>
          ) : null
        }
      />
      <Tabs
        label={t("socialTitle")}
        value={app.socialTab}
        onChange={app.setSocialTab}
        options={[
          { value: "chats", label: t("tabChats"), badge: app.unreadTotal + app.requestCount },
          { value: "groups", label: t("tabGroups"), count: myGroups },
        ]}
      />
      {app.socialTab === "chats" ? <ChatsPane /> : <GroupsPane />}
    </div>
  );
}

function ChatsPane() {
  const app = useApp();
  const { t, tx, subject } = useI18n();
  const [query, setQuery] = useState("");
  const requests = app.students.filter((s) => app.friends[s.id] === "incoming");
  const threads = app.visibleThreads;
  const q = normalize(query.trim());
  const filtered = q ? threads.filter((th) => normalize(threadTitle(th, app, tx)).includes(q)) : threads;
  const active = app.activeThread && app.threads[app.activeThread] ? app.activeThread : null;

  // On wide screens the chat sits next to the list, so open the latest conversation.
  useEffect(() => {
    if (!app.activeThread && threads[0] && window.matchMedia("(min-width: 1024px)").matches) app.setActiveThread(threads[0].id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid grid-cols-1 gap-8 lg:h-[calc(100dvh_-_17.75rem_-_env(safe-area-inset-top,0px))] lg:min-h-[520px] lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
      <div className="flex min-h-0 flex-col gap-8 lg:overflow-y-auto lg:pr-1">
        {requests.length > 0 && (
          <section>
            <h2 className={cx(HEAD, "mb-2")}>{t("friendRequests")}</h2>
            <ul className="grid grid-cols-1 gap-2">
              {requests.map((s) => {
                const match = matchInfo(app.profile, s);
                return (
                  <li key={s.id} className={cx(C.card, "p-3")}>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => app.openProfile(s.id)}
                        className={cx("shrink-0 rounded-full", FOCUS)}
                        aria-label={`${t("viewProfile")}: ${s.name}`}
                      >
                        <Avatar person={s} size="md" online={s.online} />
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-snug">
                          <span className="font-medium">{s.name}</span> <span className={C.muted}>{t("wantsToConnect")}</span>
                        </p>
                        <p className={cx("min-w-0 truncate text-xs", C.muted)}>
                          {subject(s.major)} · {t("mShared", { n: match.shared.length })}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => app.declineRequest(s.id)} className={cx(btn.secondary, btn.sm)}>
                        {t("decline")}
                      </button>
                      <button type="button" onClick={() => app.acceptRequest(s.id)} className={cx(btn.primary, btn.sm)}>
                        {t("accept")}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <section>
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2 className={HEAD}>
              {t("friendsTitle")} · {t("friendsCount", { n: app.friendList.length })}
            </h2>
            <button type="button" onClick={() => app.goTab("explore")} className={cx(LINK, "text-sm")}>
              {t("findMore")}
            </button>
          </div>
          <div className="uc-noscrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:px-0">
            {app.friendList.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => app.messageStudent(f.id)}
                className={cx("flex w-16 shrink-0 flex-col items-center gap-1.5 rounded-lg p-1 text-center", FOCUS)}
              >
                <Avatar person={f} size="lg" online={f.online} />
                <span className="w-full min-w-0 truncate text-xs">{firstName(f.name)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="flex min-h-0 flex-col">
          <h2 className={cx(HEAD, "mb-2")}>{t("conversations")}</h2>
          <div className="relative mb-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
            <input
              id="uc-chat-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchChats")}
              aria-label={t("searchChats")}
              className={inputCls("w-full py-1.5 pl-9 pr-3 text-sm")}
            />
          </div>
          {filtered.length ? (
            <ul className="grid grid-cols-1 gap-0.5">
              {filtered.map((th) => (
                <ThreadRow key={th.id} thread={th} active={th.id === active} />
              ))}
            </ul>
          ) : threads.length ? (
            <p className={cx("px-2 py-4 text-sm", C.muted)}>{t("noChatMatches", { q: query.trim() })}</p>
          ) : (
            <EmptyState icon={MessageCircle} title={t("noChats")} body={t("noChatsBody")} />
          )}
        </section>
      </div>

      <div className={cx(active ? "fixed inset-0 z-40 flex lg:static lg:z-auto" : "hidden lg:flex", "min-h-0 flex-col")}>
        {active ? (
          <ChatWindow key={active} threadId={active} />
        ) : (
          <div className={cx(C.card, "grid h-full place-items-center")}>
            <EmptyState bare icon={MessagesSquare} title={t("pickChat")} body={t("pickChatBody")} />
          </div>
        )}
      </div>
    </div>
  );
}

function ThreadRow({ thread, active }) {
  const app = useApp();
  const { t, tx } = useI18n();
  const last = thread.messages[thread.messages.length - 1];
  const typingId = app.typing[thread.id];
  let preview = "";
  if (typingId) {
    preview = `${t("typing", { name: firstName(app.person(typingId).name) })}…`;
  } else if (last) {
    const prefix =
      last.from === ME ? `${t("you")}: ` : thread.kind === "group" && last.from !== "sys" ? `${firstName(app.person(last.from).name)}: ` : "";
    preview = prefix + messageText(last, t, tx);
  }
  return (
    <li>
      <button
        type="button"
        onClick={() => app.openThread(thread.id)}
        aria-current={active ? "true" : undefined}
        className={cx(
          "flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition",
          FOCUS,
          active ? "bg-zinc-100" : "hover:bg-zinc-50",
        )}
      >
        <ThreadAvatar thread={thread} />
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-2">
            <span className="min-w-0 truncate text-sm font-medium">{threadTitle(thread, app, tx)}</span>
            {last && (
              <span className={cx("shrink-0 text-[11px]", thread.unread ? "font-medium text-indigo-600" : C.muted)}>
                {fmtAgo(last.ts, app.now, t)}
              </span>
            )}
          </span>
          <span className="mt-0.5 flex items-center justify-between gap-2">
            <span className={cx("min-w-0 truncate text-[13px]", typingId ? "text-indigo-600" : thread.unread ? "text-zinc-900" : C.muted)}>
              {preview}
            </span>
            {thread.unread > 0 && (
              <span className="uc-tnum grid h-4 min-w-4 shrink-0 place-items-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white">
                {thread.unread}
              </span>
            )}
          </span>
        </span>
      </button>
    </li>
  );
}

function ChatWindow({ threadId }) {
  const app = useApp();
  const { t, tx, lang, subject } = useI18n();
  const thread = app.threads[threadId];
  const [text, setText] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const typingId = app.typing[threadId];
  const count = thread.messages.length;

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [count, typingId]);

  const { markThreadRead } = app;
  useEffect(() => {
    if (thread.unread) markThreadRead(threadId);
  }, [thread.unread, threadId, markThreadRead]);

  const isGroup = thread.kind === "group";
  const other = isGroup ? null : app.byId[thread.with];
  const group = isGroup ? app.groups.find((g) => g.id === thread.group) : null;
  const typer = typingId ? app.person(typingId) : null;

  const send = (value) => {
    const message = (value ?? text).trim();
    if (!message) return;
    app.sendMessage(threadId, message);
    if (value == null) setText("");
    inputRef.current?.focus();
  };

  return (
    <section className="flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-white lg:rounded-xl lg:border lg:border-zinc-200">
      <header
        className="flex items-center gap-3 border-b border-zinc-100 px-3 pb-2.5 sm:px-4"
        style={{ paddingTop: "max(0.625rem, env(safe-area-inset-top, 0px))" }}
      >
        <IconButton label={t("back")} onClick={() => app.setActiveThread(null)} className="-ml-1 lg:hidden">
          <ArrowLeft className="size-5" />
        </IconButton>
        {isGroup ? (
          <ThreadAvatar thread={thread} />
        ) : (
          <button
            type="button"
            onClick={() => app.openProfile(other.id)}
            aria-label={`${t("viewProfile")}: ${other.name}`}
            className={cx("shrink-0 rounded-full", FOCUS)}
          >
            <Avatar person={other} size="md" online={other.online} />
          </button>
        )}
        <div className="min-w-0 flex-1">
          <p className="min-w-0 truncate font-medium leading-tight">{isGroup ? tx(group?.name) : other.name}</p>
          <p className={cx("min-w-0 truncate text-xs", typer ? "text-indigo-600" : C.muted)}>
            {typer
              ? `${t("typing", { name: firstName(typer.name) })}…`
              : isGroup
                ? `${t("groupChat")} · ${t("membersN", { n: (group?.members.length || 0) + (group?.extra || 0) })}`
                : `${subject(other.major)} · ${other.online ? t("online") : t("offline")}`}
          </p>
        </div>
        {!isGroup && (
          <span className="hidden sm:block">
            <button type="button" onClick={() => app.openProfile(other.id)} className={cx(btn.ghost, btn.sm)}>
              {t("viewProfile")}
            </button>
          </span>
        )}
      </header>

      <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-5">
        <p className={cx("mx-auto mb-4 max-w-xs text-center text-xs", C.muted)}>
          {isGroup ? tx(group?.description) : t("chatStart", { name: firstName(other.name) })}
        </p>
        <ol className="flex flex-col gap-1">
          {thread.messages.map((m, i) => {
            if (m.from === "sys") {
              return (
                <li key={m.id} className={cx("my-2 self-center text-center text-xs", C.muted)}>
                  {t(m.key, m.vars)}
                </li>
              );
            }
            const mine = m.from === ME;
            const prev = thread.messages[i - 1];
            const next = thread.messages[i + 1];
            const firstOfRun = !prev || prev.from !== m.from;
            const lastOfRun = !next || next.from !== m.from;
            const sender = app.person(m.from);
            return (
              <li key={m.id} className={cx("flex items-end gap-2", mine ? "justify-end" : "justify-start", firstOfRun && i > 0 && "mt-2")}>
                {!mine && isGroup && (lastOfRun ? <Avatar person={sender} size="xs" /> : <span className="w-6 shrink-0" aria-hidden="true" />)}
                <div className={cx("flex max-w-[78%] flex-col", mine ? "items-end" : "items-start")}>
                  {isGroup && !mine && firstOfRun && <p className={cx("mb-0.5 ml-3 text-[11px]", C.muted)}>{firstName(sender.name)}</p>}
                  <div
                    className={cx(
                      "rounded-2xl px-3.5 py-2 text-[15px] leading-snug",
                      mine ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-900",
                      mine && lastOfRun && "rounded-br-md",
                      !mine && lastOfRun && "rounded-bl-md",
                    )}
                  >
                    <span className="whitespace-pre-wrap break-words">{tx(m.text)}</span>
                  </div>
                  {lastOfRun && <p className={cx("mt-1 px-1 text-[10px]", C.muted)}>{fmtTime(m.ts, lang)}</p>}
                </div>
              </li>
            );
          })}
          {typer && (
            <li className="mt-2 flex items-end gap-2">
              {isGroup && <Avatar person={typer} size="xs" />}
              <div className="flex gap-1 rounded-2xl rounded-bl-md bg-zinc-100 px-3.5 py-3" aria-label={t("typing", { name: firstName(typer.name) })}>
                {[0, 1, 2].map((d) => (
                  <span key={d} className="uc-dot size-1.5 rounded-full bg-zinc-400" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </div>
            </li>
          )}
        </ol>
      </div>

      <div className="border-t border-zinc-100 px-3 pt-2.5 sm:px-4" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))" }}>
        <div className="uc-noscrollbar -mx-3 mb-2 flex gap-1.5 overflow-x-auto px-3 sm:-mx-4 sm:px-4">
          {QUICK_REPLIES[lang].map((reply) => (
            <button key={reply} type="button" onClick={() => send(reply)} className={cx(CHIP, CHIP_OFF)}>
              {reply}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-2"
        >
          <label htmlFor={`uc-msg-${threadId}`} className="sr-only">
            {t("messagePlaceholder")}
          </label>
          <input
            id={`uc-msg-${threadId}`}
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("messagePlaceholder")}
            autoComplete="off"
            maxLength={500}
            className={C.input}
          />
          <button type="submit" disabled={!text.trim()} aria-label={t("send")} title={t("send")} className={cx(btn.primary, "size-10 shrink-0")}>
            <SendHorizontal className="size-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}

function GroupsPane() {
  const app = useApp();
  const { t } = useI18n();
  const P = app.profile;
  const visible = app.groups.filter((g) => canAccess(g, P));
  const hiddenCount = app.groups.length - visible.length;
  const mine = visible.filter((g) => g.members.includes(ME));
  const discover = visible.filter((g) => !g.members.includes(ME));
  return (
    <div className="flex flex-col gap-10">
      <section>
        <SectionTitle title={t("myGroups")} />
        {mine.length ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {mine.map((g) => (
              <GroupCard key={g.id} group={g} highlight={app.highlight === g.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Users}
            body={t("noMyGroups")}
            action={
              <button type="button" onClick={() => app.openModal({ type: "createGroup" })} className={cx(btn.secondary, btn.md)}>
                <Plus className="size-4" aria-hidden="true" />
                {t("createGroup")}
              </button>
            }
          />
        )}
      </section>
      <section>
        <SectionTitle title={t("discoverGroups")} />
        {discover.length ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {discover.map((g) => (
              <GroupCard key={g.id} group={g} />
            ))}
          </div>
        ) : (
          <p className={cx("text-sm", C.muted)}>{t("allGroupsJoined")}</p>
        )}
        {hiddenCount > 0 && (
          <p className={cx("mt-4 flex items-center gap-2 text-sm", C.muted)}>
            <Lock className="size-4 shrink-0" aria-hidden="true" />
            {t("hiddenGroups", { n: hiddenCount })}
          </p>
        )}
      </section>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * App shell
 * ──────────────────────────────────────────────────────────────────────────── */

const NAV = [
  { id: "home", icon: House, label: "navHome" },
  { id: "explore", icon: Compass, label: "navExplore", sub: "navExploreSub" },
  { id: "events", icon: CalendarDays, label: "navEvents" },
  { id: "social", icon: MessageCircle, label: "navSocial" },
];

function Sidebar() {
  const app = useApp();
  const { t, subject } = useI18n();
  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-zinc-200 bg-white px-3 lg:flex"
      style={{ paddingTop: "calc(1.25rem + env(safe-area-inset-top, 0px))", paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="px-2">
        <Logo />
      </div>
      <nav className="mt-8 flex flex-col gap-0.5" aria-label="UniConnect">
        {NAV.map((item) => {
          const active = app.tab === item.id;
          const badge = item.id === "social" ? app.unreadTotal + app.requestCount : 0;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => app.goTab(item.id)}
              aria-current={active ? "page" : undefined}
              className={cx(
                "flex items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition",
                FOCUS,
                active ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
              )}
            >
              <item.icon className="size-[18px] shrink-0" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">
                {t(item.label)}
                {item.sub && <span className="ml-1.5 text-xs font-normal text-zinc-500">{t(item.sub)}</span>}
              </span>
              {badge > 0 && (
                <span className="uc-tnum grid h-5 min-w-5 place-items-center rounded-full bg-indigo-600 px-1.5 text-[11px] font-medium text-white">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <button type="button" onClick={() => app.openModal({ type: "createEvent" })} className={cx(btn.secondary, btn.md, "mt-6")}>
        <Plus className="size-4" aria-hidden="true" />
        {t("createEvent")}
      </button>
      <div className="mt-auto">
        <button
          type="button"
          onClick={() => app.openModal({ type: "me" })}
          className={cx("flex w-full items-center gap-3 rounded-lg p-2 text-left transition hover:bg-zinc-50", FOCUS)}
        >
          <Avatar person={app.me} size="sm" />
          <span className="min-w-0 flex-1">
            <span className="block min-w-0 truncate text-sm font-medium">{app.profile.name}</span>
            <span className={cx("block min-w-0 truncate text-xs", C.muted)}>
              {app.profile.uni?.short} · {subject(app.profile.major)}
            </span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-zinc-400" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}

const NOTIFICATION_ICONS = { friend: UserPlus, event: CalendarDays, message: MessageCircle, group: Users, welcome: Sparkles };

function NotificationsBell() {
  const app = useApp();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const unread = app.notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <IconButton label={t("notifications")} onClick={() => setOpen((o) => !o)} className="relative">
        <Bell className="size-[18px]" aria-hidden="true" />
        {unread > 0 && (
          <span className="uc-tnum absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white ring-2 ring-white">
            {unread}
          </span>
        )}
      </IconButton>
      {open && (
        <div className="uc-fade fixed inset-x-4 top-[calc(4.5rem_+_env(safe-area-inset-top,0px))] z-40 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg shadow-zinc-900/[0.08] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[22rem]">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-4 py-3">
            <p className="text-sm font-semibold">{t("notifications")}</p>
            {unread > 0 && (
              <button type="button" onClick={app.markAllRead} className={cx(LINK, "text-[13px]")}>
                {t("markAllRead")}
              </button>
            )}
          </div>
          {app.notifications.length ? (
            <ul className="max-h-[60vh] divide-y divide-zinc-100 overflow-y-auto">
              {app.notifications.map((n) => {
                const Icon = NOTIFICATION_ICONS[n.kind] || Bell;
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => {
                        app.openNotification(n);
                        setOpen(false);
                      }}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-zinc-50"
                    >
                      {n.person ? (
                        <Avatar person={app.person(n.person)} size="sm" />
                      ) : (
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-600">
                          <Icon className="size-4" aria-hidden="true" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className={cx("block text-sm leading-snug", !n.read && "font-medium")}>{t(n.key, n.vars)}</span>
                        <span className={cx("mt-0.5 block text-xs", C.muted)}>{fmtAgo(n.ts, app.now, t)}</span>
                      </span>
                      {!n.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-indigo-600" aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={cx("px-4 py-8 text-center text-sm", C.muted)}>{t("noNotifications")}</p>
          )}
        </div>
      )}
    </div>
  );
}

function TopBar() {
  const app = useApp();
  const { t, subject } = useI18n();
  const P = app.profile;
  return (
    <header
      className="sticky top-0 z-30 border-b border-zinc-100 bg-white/85 backdrop-blur-md"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <span className="lg:hidden">
          <Logo />
        </span>
        <p className={cx("hidden min-w-0 items-center gap-2 text-sm lg:flex", C.muted)}>
          <span className="min-w-0 truncate text-zinc-900">{P.uni?.name}</span>
          <span aria-hidden="true">·</span>
          <span className="min-w-0 truncate">
            {subject(P.major)}
            {P.minor ? ` + ${subject(P.minor)}` : ""}
          </span>
        </p>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <LangToggle />
          <NotificationsBell />
          <button
            type="button"
            onClick={() => app.openModal({ type: "me" })}
            aria-label={t("myProfile")}
            className={cx("rounded-full lg:hidden", FOCUS)}
          >
            <Avatar person={app.me} size="sm" />
          </button>
        </div>
      </div>
    </header>
  );
}

function BottomNav() {
  const app = useApp();
  const { t } = useI18n();
  return (
    <nav
      aria-label="UniConnect"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white/95 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto grid max-w-md grid-cols-4">
        {NAV.map((item) => {
          const active = app.tab === item.id;
          const badge = item.id === "social" ? app.unreadTotal + app.requestCount : 0;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => app.goTab(item.id)}
              aria-current={active ? "page" : undefined}
              className={cx(
                "relative flex flex-col items-center gap-1 pb-2 pt-2.5 text-[11px] font-medium transition",
                FOCUS,
                active ? "text-indigo-600" : "text-zinc-500",
              )}
            >
              <item.icon className="size-5" aria-hidden="true" />
              {t(item.label)}
              {badge > 0 && (
                <span className="uc-tnum absolute left-1/2 top-1.5 ml-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white ring-2 ring-white">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Main app (state + actions)
 * ──────────────────────────────────────────────────────────────────────────── */

const omit = (obj, key) => {
  const next = { ...obj };
  delete next[key];
  return next;
};

function MainApp({ profile, onLogout }) {
  const { t, tx, lang } = useI18n();
  const [world] = useState(() => buildWorld(profile, Date.now()));
  const [now, setNow] = useState(() => Date.now());
  const [events, setEvents] = useState(world.events);
  const [groups, setGroups] = useState(world.groups);
  const [friends, setFriends] = useState(world.friends);
  const [threads, setThreads] = useState(world.threads);
  const [notifications, setNotifications] = useState(world.notifications);
  const [eventRequests, setEventRequests] = useState({});
  const [typing, setTyping] = useState({});
  const [toasts, setToasts] = useState([]);
  const [tab, setTab] = useState("home");
  const [socialTab, setSocialTab] = useState("chats");
  const [activeThread, setActiveThread] = useState(null);
  const [modal, setModal] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const [explore, setExplore] = useState({ scope: "major", interests: [], query: "" });
  const [eventFilter, setEventFilter] = useState({ type: "all", preview: false });

  const students = world.students;
  const byId = useMemo(() => Object.fromEntries(students.map((s) => [s.id, s])), [students]);
  const me = useMemo(() => ({ id: ME, name: profile.name, avatarColor: profile.avatarColor }), [profile]);
  const person = useCallback((id) => (id === ME ? me : byId[id]), [me, byId]);

  // Simulated replies and approvals fire later, so they read the latest state from here.
  const latest = useRef({});
  useEffect(() => {
    latest.current = { events, groups, friends, eventRequests, tab, activeThread };
  });

  const timers = useRef(new Map());
  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach(clearTimeout);
      pending.clear();
    };
  }, []);
  const later = useCallback((fn, ms, key = uid("timer")) => {
    if (timers.current.has(key)) clearTimeout(timers.current.get(key));
    timers.current.set(
      key,
      setTimeout(() => {
        timers.current.delete(key);
        fn();
      }, ms),
    );
  }, []);
  const cancelLater = useCallback((key) => {
    clearTimeout(timers.current.get(key));
    timers.current.delete(key);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  const dismissToast = useCallback((id) => setToasts((list) => list.filter((x) => x.id !== id)), []);
  const toast = useCallback(
    (item) => {
      const id = uid("toast");
      setToasts((list) => [...list.slice(-2), { ...item, id }]);
      later(() => dismissToast(id), 4500);
    },
    [later, dismissToast],
  );
  const notify = useCallback((n) => {
    const entry = { id: uid("n"), ts: Date.now(), read: false, ...n };
    setNotifications((list) => [entry, ...list].slice(0, 40));
  }, []);

  /* Navigation */

  const goTab = useCallback((next) => {
    setTab(next);
    if (next !== "social") setActiveThread(null);
    setModal(null);
    window.scrollTo({ top: 0 });
  }, []);
  const flash = useCallback(
    (id) => {
      setHighlight(id);
      later(() => setHighlight((h) => (h === id ? null : h)), 2800, "highlight");
    },
    [later],
  );
  const openThread = useCallback((threadId) => {
    setThreads((all) => (all[threadId]?.unread ? { ...all, [threadId]: { ...all[threadId], unread: 0 } } : all));
    setActiveThread(threadId);
    setSocialTab("chats");
    setTab("social");
    setModal(null);
    setProfileId(null);
    window.scrollTo({ top: 0 });
  }, []);
  const messageStudent = useCallback(
    (id) => {
      const threadId = `dm:${id}`;
      setThreads((all) => (all[threadId] ? all : { ...all, [threadId]: { id: threadId, kind: "dm", with: id, unread: 0, messages: [] } }));
      openThread(threadId);
    },
    [openThread],
  );
  const markThreadRead = useCallback((threadId) => {
    setThreads((all) => (all[threadId]?.unread ? { ...all, [threadId]: { ...all[threadId], unread: 0 } } : all));
  }, []);
  const appendMessage = useCallback((threadId, message) => {
    const entry = { id: uid("m"), ts: Date.now(), ...message };
    setThreads((all) => (all[threadId] ? { ...all, [threadId]: { ...all[threadId], messages: [...all[threadId].messages, entry] } } : all));
  }, []);

  /* Friends */

  const acceptRequest = (id) => {
    setFriends((f) => ({ ...f, [id]: "friends" }));
    setNotifications((list) => list.map((n) => (n.kind === "friend" && n.person === id ? { ...n, read: true } : n)));
    toast({
      icon: "check",
      title: "tNowConnected",
      titleVars: { name: firstName(byId[id].name) },
      person: id,
      action: { label: "message", run: () => messageStudent(id) },
    });
  };
  const declineRequest = (id) => {
    setFriends((f) => omit(f, id));
    setNotifications((list) => list.map((n) => (n.kind === "friend" && n.person === id ? { ...n, read: true } : n)));
  };
  // none → pending (accepted automatically after a moment) → friends; clicking while pending cancels.
  const toggleFriend = (id) => {
    const status = friends[id];
    const s = byId[id];
    if (status === "friends") return;
    if (status === "incoming") {
      acceptRequest(id);
      return;
    }
    if (status === "pending") {
      cancelLater(`friend:${id}`);
      setFriends((f) => omit(f, id));
      return;
    }
    setFriends((f) => ({ ...f, [id]: "pending" }));
    toast({ icon: "user", title: "tFriendRequest", titleVars: { name: firstName(s.name) }, person: id });
    later(
      () => {
        if (latest.current.friends[id] !== "pending") return;
        setFriends((f) => ({ ...f, [id]: "friends" }));
        notify({ key: "nFriendAccepted", vars: { name: s.name }, kind: "friend", person: id, go: { profile: id } });
        toast({
          icon: "check",
          title: "tNowConnected",
          titleVars: { name: firstName(s.name) },
          person: id,
          action: { label: "message", run: () => messageStudent(id) },
        });
      },
      2400 + Math.random() * 1800,
      `friend:${id}`,
    );
  };

  /* Events */

  const addAttendee = (eventId, who) =>
    setEvents((list) =>
      list.map((e) =>
        e.id === eventId && !e.attendees.includes(who) && e.attendees.length < e.max ? { ...e, attendees: [...e.attendees, who] } : e,
      ),
    );

  const joinEvent = (ev) => {
    addAttendee(ev.id, ME);
    toast({ icon: "check", title: "tJoined", body: "tJoinedBody", bodyVars: { title: ev.title, when: fmtWhen(ev, Date.now(), lang, t) } });
  };
  const leaveEvent = (ev) => {
    setEvents((list) => list.map((e) => (e.id === ev.id ? { ...e, attendees: e.attendees.filter((a) => a !== ME) } : e)));
    toast({ icon: "info", title: "tLeft", titleVars: { title: ev.title } });
  };
  const requestJoin = (ev) => {
    const key = `request:${ev.id}`;
    if (eventRequests[ev.id]) {
      cancelLater(key);
      setEventRequests((r) => omit(r, ev.id));
      return;
    }
    const host = person(ev.host);
    setEventRequests((r) => ({ ...r, [ev.id]: true }));
    toast({ icon: "send", title: "tRequestSent", body: "tRequestSentBody", bodyVars: { name: firstName(host.name) } });
    later(
      () => {
        if (!latest.current.eventRequests[ev.id]) return;
        setEventRequests((r) => omit(r, ev.id));
        addAttendee(ev.id, ME);
        const vars = { name: firstName(host.name), title: ev.title };
        notify({ key: "nRequestApproved", vars, kind: "event", person: ev.host, go: { tab: "events" } });
        toast({ icon: "check", title: "tJoined", body: "nRequestApproved", bodyVars: vars, person: ev.host });
      },
      3200,
      key,
    );
  };
  const createEvent = (draft) => {
    const ev = { id: uid("e"), host: ME, attendees: [ME], ...draft };
    setEvents((list) => [...list, ev].sort((a, b) => a.start - b.start));
    setEventFilter({ type: "all", preview: false });
    goTab("events");
    flash(ev.id);
    toast({ icon: "calendar", title: "tEventCreated", body: "tEventCreatedBody", bodyVars: { title: ev.title } });
    // A couple of eligible students (friends first) join shortly after.
    const pool = shuffled(students.filter((s) => studentCanAccess(s, ev))).sort(
      (a, b) => (friends[b.id] === "friends") - (friends[a.id] === "friends"),
    );
    pool.slice(0, Math.min(2, ev.max - 1)).forEach((s, i) => {
      later(
        () => {
          const current = latest.current.events.find((e) => e.id === ev.id);
          if (!current || current.attendees.includes(s.id) || current.attendees.length >= current.max) return;
          addAttendee(ev.id, s.id);
          const vars = { name: firstName(s.name), title: ev.title };
          notify({ key: "nJoinedYourEvent", vars, kind: "event", person: s.id, go: { tab: "events" } });
          toast({ icon: "user", title: "nJoinedYourEvent", titleVars: vars, person: s.id });
        },
        5000 + i * 4500,
      );
    });
  };
  const cancelEvent = (ev) => {
    setEvents((list) => list.filter((e) => e.id !== ev.id));
    toast({ icon: "info", title: "tEventCancelled", bodyRaw: tx(ev.title) });
  };

  /* Groups */

  const scheduleInviteAccepts = (g, ids) => {
    ids.forEach((id, i) => {
      later(
        () => {
          const current = latest.current.groups.find((x) => x.id === g.id);
          if (!current || !current.invited.includes(id)) return;
          const name = firstName(byId[id].name);
          setGroups((list) =>
            list.map((x) => (x.id === g.id ? { ...x, invited: x.invited.filter((v) => v !== id), members: [...x.members, id] } : x)),
          );
          appendMessage(`group:${g.id}`, { from: "sys", key: "sysJoined", vars: { name } });
          notify({ key: "nGroupJoined", vars: { name, group: g.name }, kind: "group", person: id, go: { thread: `group:${g.id}` } });
        },
        3500 + i * 2600 + Math.random() * 1200,
      );
    });
  };
  const joinGroup = (g) => {
    setGroups((list) => list.map((x) => (x.id === g.id && !x.members.includes(ME) ? { ...x, members: [...x.members, ME] } : x)));
    appendMessage(`group:${g.id}`, { from: "sys", key: "sysYouJoined" });
    toast({
      icon: "group",
      title: "tGroupJoined",
      titleVars: { group: g.name },
      action: { label: "openChat", run: () => openThread(`group:${g.id}`) },
    });
  };
  const leaveGroup = (g) => {
    setGroups((list) => list.map((x) => (x.id === g.id ? { ...x, members: x.members.filter((m) => m !== ME) } : x)));
    if (activeThread === `group:${g.id}`) setActiveThread(null);
    toast({ icon: "info", title: "tGroupLeft", titleVars: { group: g.name } });
  };
  const createGroup = (draft) => {
    const g = {
      id: uid("g"),
      name: draft.name,
      description: draft.description,
      audience: draft.audience,
      subject: draft.subject,
      members: [ME],
      invited: draft.invites,
      extra: 0,
    };
    const threadId = `group:${g.id}`;
    const names = draft.invites.map((id) => firstName(byId[id].name));
    const messages = [{ id: uid("m"), from: "sys", key: "sysCreated", ts: Date.now() }];
    if (names.length) messages.push({ id: uid("m"), from: "sys", key: "sysInvited", vars: { names }, ts: Date.now() });
    setGroups((list) => [g, ...list]);
    setThreads((all) => ({ ...all, [threadId]: { id: threadId, kind: "group", group: g.id, unread: 0, messages } }));
    setSocialTab("groups");
    goTab("social");
    flash(g.id);
    toast({
      icon: "group",
      title: "tGroupCreated",
      body: names.length ? "tGroupCreatedBody" : "tGroupCreatedNoInvites",
      bodyVars: { n: names.length },
      action: { label: "openChat", run: () => openThread(threadId) },
    });
    scheduleInviteAccepts(g, draft.invites);
  };
  const inviteToGroup = (g, ids) => {
    setGroups((list) => list.map((x) => (x.id === g.id ? { ...x, invited: [...new Set([...x.invited, ...ids])] } : x)));
    appendMessage(`group:${g.id}`, { from: "sys", key: "sysInvited", vars: { names: ids.map((id) => firstName(byId[id].name)) } });
    setModal(null);
    toast({ icon: "send", title: "tInvitesSent", body: "tInvitesSentBody", bodyVars: { n: ids.length, group: g.name } });
    scheduleInviteAccepts(g, ids);
  };

  /* Chat */

  const replyCounter = useRef(0);
  const sendMessage = (threadId, text) => {
    const thread = threads[threadId];
    if (!thread) return;
    appendMessage(threadId, { from: ME, text });
    const key = `reply:${threadId}`;
    if (timers.current.has(key)) return; // one simulated reply at a time per chat
    let responder = thread.kind === "dm" ? thread.with : null;
    if (thread.kind === "group") {
      const others = (groups.find((g) => g.id === thread.group)?.members || []).filter((m) => m !== ME);
      responder = others[Math.floor(Math.random() * others.length)] || null;
    }
    if (!responder) return;
    const reply = pickReply(text, lang, replyCounter.current++);
    later(() => setTyping((all) => ({ ...all, [threadId]: responder })), 650, `${key}:typing`);
    later(
      () => {
        setTyping((all) => omit(all, threadId));
        const viewing = latest.current.tab === "social" && latest.current.activeThread === threadId;
        const entry = { id: uid("m"), from: responder, text: reply, ts: Date.now() };
        setThreads((all) => ({
          ...all,
          [threadId]: { ...all[threadId], messages: [...all[threadId].messages, entry], unread: viewing ? 0 : (all[threadId].unread || 0) + 1 },
        }));
        if (!viewing) {
          const name = firstName(byId[responder].name);
          notify({ key: "nNewMessage", vars: { name, text: reply }, kind: "message", person: responder, go: { thread: threadId } });
          toast({
            icon: "message",
            title: "tNewMessageFrom",
            titleVars: { name },
            bodyRaw: reply,
            person: responder,
            action: { label: "openChat", run: () => openThread(threadId) },
          });
        }
      },
      1900 + Math.random() * 1300,
      key,
    );
  };

  /* Notifications */

  const markAllRead = () => setNotifications((list) => list.map((n) => ({ ...n, read: true })));
  const openNotification = (n) => {
    setNotifications((list) => list.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
    if (n.go?.thread) openThread(n.go.thread);
    else if (n.go?.profile) setProfileId(n.go.profile);
    else if (n.go?.tab) {
      if (n.go.tab === "social") setSocialTab("chats");
      goTab(n.go.tab);
    }
  };

  /* Derived */

  const friendList = useMemo(() => students.filter((s) => friends[s.id] === "friends"), [students, friends]);
  const requestCount = students.filter((s) => friends[s.id] === "incoming").length;
  const visibleThreads = useMemo(
    () =>
      Object.values(threads)
        .filter((th) =>
          th.kind === "dm" ? th.messages.length > 0 || th.id === activeThread : groups.some((g) => g.id === th.group && g.members.includes(ME)),
        )
        .sort((a, b) => lastActivity(b) - lastActivity(a)),
    [threads, groups, activeThread],
  );
  const unreadTotal = visibleThreads.reduce((sum, th) => sum + (th.unread || 0), 0);

  const app = {
    profile,
    me,
    students,
    byId,
    person,
    now,
    events,
    groups,
    friends,
    threads,
    typing,
    notifications,
    eventRequests,
    highlight,
    tab,
    goTab,
    socialTab,
    setSocialTab,
    activeThread,
    setActiveThread,
    openThread,
    messageStudent,
    markThreadRead,
    openProfile: setProfileId,
    openModal: setModal,
    toggleFriend,
    acceptRequest,
    declineRequest,
    joinEvent,
    leaveEvent,
    requestJoin,
    createEvent,
    cancelEvent,
    joinGroup,
    leaveGroup,
    createGroup,
    inviteToGroup,
    sendMessage,
    markAllRead,
    openNotification,
    explore,
    setExplore,
    eventFilter,
    setEventFilter,
    friendList,
    requestCount,
    visibleThreads,
    unreadTotal,
    logout: onLogout,
  };

  const closeModal = () => setModal(null);
  return (
    <AppContext.Provider value={app}>
      <div className="min-h-[100dvh]">
        <Sidebar />
        <div className="lg:pl-60">
          <TopBar />
          <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-12 lg:pt-8">
            {/* Opacity-only fade: a transform here would break the fixed chat overlay on phones. */}
            <div key={tab} className={tab === "social" ? undefined : "uc-fade"}>
              {tab === "home" && <HomeView />}
              {tab === "explore" && <ExploreView />}
              {tab === "events" && <EventsView />}
              {tab === "social" && <SocialView />}
            </div>
          </main>
        </div>
        <BottomNav />
        {modal?.type === "createEvent" && <CreateEventModal preset={modal.preset} presetAudience={modal.audience} onClose={closeModal} />}
        {modal?.type === "createGroup" && <CreateGroupModal onClose={closeModal} />}
        {modal?.type === "invite" && <InviteModal groupId={modal.groupId} onClose={closeModal} />}
        {modal?.type === "buddy" && <StudyBuddyModal onClose={closeModal} />}
        {modal?.type === "me" && <MyProfileModal onClose={closeModal} />}
        {profileId && <StudentProfileModal id={profileId} onClose={() => setProfileId(null)} />}
        <Toasts toasts={toasts} onDismiss={dismissToast} person={person} />
      </div>
    </AppContext.Provider>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Root
 * ──────────────────────────────────────────────────────────────────────────── */

export default function UniConnect() {
  const [lang, setLang] = useState(initialLang);
  const [stage, setStage] = useState("welcome"); // welcome | onboarding | app
  const [profile, setProfile] = useState(null);
  const i18n = useMemo(() => makeI18n(lang, setLang), [lang]);

  useEffect(() => {
    try {
      localStorage.setItem("uniconnect.lang", lang);
    } catch {
      // Storage can be unavailable (private mode, sandboxed frames).
    }
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stage]);

  const enterApp = (p) => {
    setProfile(p);
    setStage("app");
  };

  return (
    <I18nContext.Provider value={i18n}>
      <div className="uc-root min-h-[100dvh] overflow-x-clip bg-white text-zinc-900">
        <GlobalStyles />
        {stage === "welcome" && <Welcome onStart={() => setStage("onboarding")} onDemo={() => enterApp(DEMO_PROFILE)} />}
        {stage === "onboarding" && <Onboarding onExit={() => setStage("welcome")} onComplete={enterApp} />}
        {stage === "app" && profile && (
          <MainApp
            key={profile.email}
            profile={profile}
            onLogout={() => {
              setProfile(null);
              setStage("welcome");
            }}
          />
        )}
      </div>
    </I18nContext.Provider>
  );
}
