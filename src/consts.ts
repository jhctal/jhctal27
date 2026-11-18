// Site-wide content.

export const SITE_DESCRIPTION =
  "Software engineer & designer who likes knowing how things work beneath the abstractions.";

export const PROFILE = {
  name: "Latch",
  fullName: "Latchlern Jack",
  role: "Software Engineer & Designer",
  tagline: "who likes knowing how things work beneath the abstractions.",
  location: "London, UK",
  timeZone: "Europe/London",
  status: "Building",
  email: "latch.jack@gmail.com",
};

export const SITE_TITLE = `${PROFILE.fullName} — Software Engineer`;

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/jhctal" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jhctal/" },
  { label: "Bluesky", href: "https://bsky.app/profile/jhctal.bsky.social" },
  //   { label: "Read.cv", href: "https://read.cv/" },
];

export const PROJECTS = [
  {
    title: "Motion",
    description:
      "A workout logging app in TypeScript and React for recording sets, reps and weights in as few taps as possible. I’m building it to get the fundamentals of a full CRUD app right: data modelling, forms, validation, optimistic updates and keeping the UI fast as history grows.",
    tags: ["Web App", "React", "TypeScript"],
    year: "2026",
    href: "https://motion.latch.dev/",
  },
  {
    title: "CoreKit",
    description:
      "A component library that sits underneath design systems, so they consume it and add their own tokens and styles on top instead of starting from scratch. I’m building it to learn what makes UI truly reusable: accessible defaults, composable APIs, theming, and versioning without breaking the people who depend on it.",
    tags: ["Design Systems", "React", "TypeScript"],
    year: "2026",
    href: "https://github.com/jhctal/jackstack-corekit",
  },
  {
    title: "Tally",
    description:
      "A money ledger API built from scratch in TypeScript on raw Node and Postgres, with no framework or ORM. I’m building it to learn backend development deeply: routing, transactions, concurrency, auth, caching and queues. I break each piece on purpose before fixing it.",
    tags: ["Backend", "Node", "Postgres"],
    year: "2026",
    href: "https://github.com/jhctal/tally",
  },
];

export const NOW = [
  { label: "Work", text: "Front-end for B2B SaaS products" },
  { label: "Building", text: "Tally, to learn Postgres the hard way" },
  { label: "Learning", text: "System design and networking" },
  { label: "Watching", text: "My Hero Academia" },
  { label: "Reading", text: "Absolute Batman" },
];
