// Content for the portfolio. Presentation-neutral — no theme metadata,
// just the words and the section list the nav is built from.

export const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const HERO = {
  tagline: 'Building thoughtful iOS experiences — products that feel effortless, for millions of readers.',
};

export const ABOUT = {
  paragraphs: [
    'I’m an iOS engineer who likes products that feel effortless and systems that hold up underneath them. At The Washington Post I ship consumer features end-to-end — purchases, audio, sharing — inside an app read by millions of people.',
    'The details users actually feel are the ones I chase: fast launches, smooth playback, flows that don’t make anyone think twice. I sweat analytics and accessibility for the same reason — products should work, measurably, for everyone.',
    'Outside work I gravitate toward startups, consumer apps, AI tools, and media tech — places where craft and speed have to coexist.',
  ],
  interests: ['Consumer apps', 'AI tools', 'Mobile-first marketplaces', 'Media technology', 'Rapid prototyping'],
};

export const WORK = {
  org: 'The Washington Post',
  role: 'iOS Engineer',
  intro:
    'I build and ship consumer-facing iOS features — owning them from kickoff to release alongside product, design, and backend teams.',
  highlights: [
    {
      name: 'StoreKit & Subscriptions',
      detail:
        'Built and shipped the One Day Pass — a StoreKit 2 purchase flow that drove 100 purchases in its first two weeks across a four-variant pricing test.',
    },
    {
      name: 'Personalized Audio',
      detail:
        'Lead the playback architecture for live and stitched personalized audio: multi-segment sequencing, CarPlay, and the debugging that keeps playback smooth.',
    },
    {
      name: 'Deep Links & Sharing',
      detail:
        'Built personalized podcast sharing on AppsFlyer / OneLink, including app-not-installed flows and a tailored listening UI for the recipient.',
    },
    {
      name: 'Release Management',
      detail:
        'Release manager for the iOS app — coordinating cuts, approvals, and rollouts so features land predictably. On-call for incident triage.',
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
  },
  more: [
    { name: 'AI product experiments', note: 'Small, sharp tools built around LLM workflows.' },
    { name: 'iOS prototypes', note: 'Interaction ideas that deserve a weekend.' },
    { name: 'Full-stack tools', note: 'Firebase + TypeScript utilities that scratch real itches.' },
  ],
};

export const SKILLS = [
  {
    name: 'iOS',
    items: ['Swift', 'SwiftUI', 'UIKit', 'MVVM', 'Combine', 'StoreKit 2', 'AVFoundation', 'Core Data'],
  },
  {
    name: 'Product Systems',
    items: ['Analytics', 'Paywalls', 'Subscriptions', 'Deep links', 'Push campaigns', 'Release management'],
  },
  {
    name: 'Full-Stack',
    items: ['Firebase', 'Node.js', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    name: 'Frontend & AI',
    items: ['React', 'Next.js', 'Three.js', 'OpenAI', 'Python', 'Pandas'],
  },
  {
    name: 'Tools',
    items: ['Xcode', 'Git', 'Docker', 'AWS', 'Google Cloud', 'TestFlight'],
  },
];

export const EXPERIENCE = [
  {
    org: 'The Washington Post',
    role: 'Software Engineer — iOS',
    period: 'Jun 2025 – Present',
    details:
      'Ship consumer-facing iOS features end-to-end: StoreKit purchases, personalized audio, deep-link sharing. Release manager and on-call for production triage.',
  },
  {
    org: 'George Mason University',
    role: 'Student Lecturer / Instructor',
    period: 'May 2024 – Jan 2025',
    details:
      'Taught 20+ students iOS development — SwiftUI, UIKit, API-driven apps — and designed the assignments, projects, and quizzes they learned with.',
  },
  {
    org: 'The Washington Post',
    role: 'Software Engineering Intern — Ad Engineering',
    period: 'Jun 2024 – Aug 2024',
    details:
      'Built a DevTools targeting page (TypeScript, Node.js) used across five departments, plus analytics tooling that improved brand safety.',
  },
  {
    org: 'George Mason University',
    role: 'B.S. Computer Science',
    period: 'Aug 2021 – May 2025',
    details: 'Arrived a CS student, left an iOS engineer — with a teaching detour along the way.',
  },
];

export const CONTACT = {
  copy: 'I’m always interested in startups, consumer products, iOS engineering, AI tools, and ambitious teams building useful things.',
};
