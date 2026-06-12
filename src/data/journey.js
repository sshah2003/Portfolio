import { PROFILE } from './profile.js';

// Real WMATA line colors for the little station bullets (authentic per stop).
export const LINE_DOTS = {
  RD: '#e51636',
  OR: '#f7941d',
  BL: '#1574c4',
  GR: '#00b140',
  YL: '#ffd200',
  SV: '#a2a4a1',
};

export const STATIONS = [
  {
    id: 'union-station',
    station: 'Union Station',
    title: 'Sohil Shah',
    accent: 'var(--m-red)',
    lines: ['RD'],
    nav: 'Intro',
  },
  {
    id: 'metro-center',
    station: 'Metro Center',
    title: 'About me',
    kicker: 'Now arriving',
    accent: 'var(--m-blue)',
    lines: ['RD', 'OR', 'BL', 'SV'],
    nav: 'About',
  },
  {
    id: 'mcpherson-square',
    station: 'McPherson Square',
    title: 'The Washington Post',
    kicker: 'Current line of work',
    accent: 'var(--m-orange)',
    lines: ['OR', 'BL', 'SV'],
    nav: 'Work',
  },
  {
    id: 'gallery-place',
    station: 'Gallery Place',
    title: 'Projects',
    kicker: 'Doors opening',
    accent: 'var(--m-yellow)',
    lines: ['RD', 'GR', 'YL'],
    nav: 'Projects',
  },
  {
    id: 'foggy-bottom',
    station: 'Foggy Bottom',
    title: 'Skills & stack',
    kicker: 'Transfer station',
    accent: 'var(--m-blue)',
    lines: ['OR', 'BL', 'SV'],
    nav: 'Skills',
  },
  {
    id: 'navy-yard',
    station: 'Navy Yard',
    title: 'Startup energy',
    kicker: 'Express service',
    accent: 'var(--m-green)',
    lines: ['GR'],
    nav: 'Startups',
  },
  {
    id: 'smithsonian',
    station: 'Smithsonian',
    title: 'Teaching & leadership',
    kicker: 'Exhibit hall',
    accent: 'var(--m-silver)',
    lines: ['OR', 'BL', 'SV'],
    nav: 'Teaching',
  },
  {
    id: 'noma',
    station: 'NoMa–Gallaudet U',
    title: 'The route so far',
    kicker: 'Service history',
    accent: 'var(--m-red)',
    lines: ['RD'],
    nav: 'Timeline',
  },
  {
    id: 'dulles',
    station: 'Dulles Airport',
    title: 'Where to next?',
    kicker: 'Final stop',
    accent: 'var(--m-silver)',
    lines: ['SV'],
    nav: 'Contact',
  },
];

export const HERO = {
  tagline: 'Building thoughtful iOS experiences — from the DC Metro line to millions of readers.',
  sub: 'iOS Engineer at The Washington Post · Washington, DC',
};

export const ABOUT = {
  paragraphs: [
    'I’m an iOS engineer who likes products that feel effortless and systems that hold up underneath them. At The Washington Post I ship consumer features end-to-end — purchases, audio, sharing — inside an app read by millions of people.',
    'The details users actually feel are the ones I chase: fast launches, smooth playback, flows that don’t make anyone think twice. I sweat analytics and accessibility for the same reason — products should work, measurably, for everyone.',
    'Outside the newsroom I gravitate toward startups, consumer apps, AI tools, and media tech — places where craft and speed have to coexist.',
  ],
  chips: ['Product-minded', 'End-to-end ownership', 'Performance & polish', 'Mobile-first'],
};

export const WORK = {
  intro:
    'Day to day, I build and ship consumer-facing iOS features — owning them from kickoff to release alongside product, design, marketing, and backend teams.',
  board: [
    ['ONE DAY PASS', 'Shipped'],
    ['PODCAST SHARING', 'Shipped'],
    ['PERSONALIZED AUDIO', 'Live'],
    ['PUSH CAMPAIGNS', 'Rolling out'],
    ['APP RELEASES', 'On schedule'],
  ],
  cards: [
    {
      id: 'storekit',
      name: 'StoreKit + Subscriptions',
      tag: 'Revenue',
      detail:
        'Built and shipped the One Day Pass — a StoreKit 2 purchase flow that drove 100 purchases in its first two weeks across a four-variant pricing test. Regular work across the paywall, subscriptions, and identity surfaces.',
    },
    {
      id: 'audio',
      name: 'Personalized Audio',
      tag: 'Architecture',
      detail:
        'Lead the playback architecture for live and stitched personalized audio: multi-segment sequencing, CarPlay integration, and the production debugging that keeps playback and seeking smooth.',
    },
    {
      id: 'deeplinks',
      name: 'Deep Links & Sharing',
      tag: 'Growth',
      detail:
        'Built personalized podcast sharing on AppsFlyer / OneLink — including app-not-installed flows and a personalized listening UI for the person on the receiving end.',
    },
    {
      id: 'analytics',
      name: 'Analytics',
      tag: 'Data',
      detail:
        'Audited and closed analytics gaps across multiple features so decisions ride on accurate data, and moved key surfaces onto Iterable to unlock targeted push campaigns.',
    },
    {
      id: 'releases',
      name: 'Release Management',
      tag: 'Shipping',
      detail:
        'Release manager for the iOS app — coordinating release cuts, approvals, and rollouts so features land predictably.',
    },
    {
      id: 'reliability',
      name: 'Production Reliability',
      tag: 'On-call',
      detail:
        'On-call rotations, incident triage, and crash investigations — the unglamorous work that keeps a consumer app dependable at scale.',
    },
  ],
};

export const PROJECTS = {
  featured: {
    name: 'ClassMate',
    status: 'In active development',
    description:
      'A full-stack iOS marketplace where college students buy, sell, and connect inside verified university communities.',
    tech: ['Swift', 'Firebase', 'OpenAI', 'MVVM'],
    points: [
      'Core iOS architecture built on MVVM for modularity as features grow',
      'Firebase authentication, database, and user-generated content workflows',
      'Safety-first interactions: profile-based communication and controlled posting flows',
    ],
    demo: PROFILE.classmateUrl,
    github: PROFILE.links.find((l) => l.id === 'github').url,
  },
  upcoming: [
    { name: 'AI product experiments', note: 'Small, sharp tools built around LLM workflows.' },
    { name: 'iOS prototypes', note: 'Interaction ideas that deserve a weekend.' },
    { name: 'SwiftUI / UIKit experiments', note: 'Pushing on animation and layout details.' },
    { name: 'Startup ideas', note: 'Mobile-first products in the notes app, waiting their turn.' },
    { name: 'Full-stack tools', note: 'Firebase + TypeScript utilities that scratch real itches.' },
  ],
};

export const SKILL_LINES = [
  {
    name: 'iOS Line',
    color: 'var(--m-blue)',
    items: ['Swift', 'SwiftUI', 'UIKit', 'MVVM', 'Combine', 'StoreKit 2', 'AVFoundation', 'Core Data', 'REST APIs'],
  },
  {
    name: 'Product Systems Line',
    color: 'var(--m-red)',
    items: ['Analytics', 'Paywalls', 'Subscriptions', 'Deep links', 'Push campaigns', 'Release management', 'On-call debugging'],
  },
  {
    name: 'Full-Stack Line',
    color: 'var(--m-green)',
    items: ['Firebase', 'Node.js', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    name: 'Tools Line',
    color: 'var(--m-silver)',
    items: ['Xcode', 'Git / GitHub', 'Postman', 'Docker', 'AWS', 'Google Cloud', 'Proxyman', 'TestFlight'],
  },
  {
    name: 'Creative / Frontend Line',
    color: 'var(--m-orange)',
    items: ['React', 'Next.js', 'Three.js', 'Material UI'],
  },
  {
    name: 'AI / Data Line',
    color: 'var(--m-yellow)',
    items: ['OpenAI', 'Python', 'Pandas', 'NumPy'],
  },
];

export const STARTUP = {
  title: 'Building like a startup, shipping like a product team.',
  intro:
    'Big-app rigor, small-team instincts. The work I find most fun sits where those overlap:',
  cards: [
    ['Consumer apps', 'Products people open on purpose, not out of habit.'],
    ['AI-powered tools', 'Models in service of the user, not the demo.'],
    ['Mobile-first marketplaces', 'ClassMate is the current obsession.'],
    ['Media technology', 'News, audio, and the systems that deliver them.'],
    ['Rapid prototyping', 'Idea → TestFlight before the excitement fades.'],
    ['Clean user experiences', 'Fewer taps, fewer surprises, more delight.'],
    ['Product analytics', 'Knowing what happened — and trusting the numbers.'],
    ['Startup ideas', 'Always collecting. Occasionally shipping.'],
  ],
};

export const TEACHING = {
  exhibits: [
    {
      label: 'Exhibit A',
      title: 'Student Lecturer — George Mason University',
      period: 'May 2024 – Jan 2025',
      body: 'Taught 20+ students to build dynamic, responsive iOS apps with SwiftUI, UIKit, and API-driven features — and designed the assignments, projects, and quizzes they learned with.',
    },
    {
      label: 'Exhibit B',
      title: 'Eagle Scout — Boy Scouts of America',
      period: '2021',
      body: 'The original lesson in leading a team and finishing what you start.',
    },
    {
      label: 'Exhibit C',
      title: 'CodePath — Intro to iOS Development Certificate',
      period: '2024',
      body: 'Where the iOS obsession got formalized.',
    },
  ],
};

export const TIMELINE = [
  {
    org: 'The Washington Post',
    role: 'Software Engineer — iOS',
    period: 'Jun 2025 – Present',
    accent: 'var(--m-orange)',
    details: [
      'Ship consumer-facing iOS features end-to-end: StoreKit purchases, personalized audio, deep-link sharing.',
      'Release manager for iOS app releases; on-call for production incident triage.',
    ],
  },
  {
    org: 'George Mason University',
    role: 'Student Lecturer / Instructor',
    period: 'May 2024 – Jan 2025',
    accent: 'var(--m-green)',
    details: [
      'Taught 20+ students iOS development: SwiftUI, UIKit, API requests, responsive apps.',
      'Built and graded assignments, projects, and quizzes.',
    ],
  },
  {
    org: 'The Washington Post',
    role: 'Software Engineering Intern — Ad Engineering',
    period: 'Jun 2024 – Aug 2024',
    accent: 'var(--m-blue)',
    details: [
      'Built a DevTools targeting page (TypeScript, Node.js) used across five departments.',
      'Shipped analytics tooling for ad display patterns, improving brand safety.',
    ],
  },
  {
    org: 'George Mason University',
    role: 'B.S. Computer Science',
    period: 'Aug 2021 – May 2025',
    accent: 'var(--m-red)',
    details: ['Arrived a CS student, left an iOS engineer — with a teaching detour along the way.'],
  },
];

export const CONTACT = {
  copy: 'I’m always interested in startups, consumer products, iOS engineering, AI tools, and ambitious teams building useful things.',
};
