export const character = {
  name: 'ANGELINA WU',
  class: 'ML ENGINEER',
  affiliation: 'LEA',
  origin: 'Earth · Sector 001',
  level: 24,
  stats: [
    { label: 'INTELLIGENCE', value: 96 },
    { label: 'SPEED',        value: 88 },
    { label: 'CREATIVITY',   value: 93 },
    { label: 'EXECUTION',    value: 91 },
    { label: 'VISION',       value: 94 },
    { label: 'CHARISMA',     value: 86 },
  ],
  contact: {
    email: 'angelina@getlea.io',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
  },
}

export const panels = {
  experience: {
    type: 'experience',
    title: 'WORK EXPERIENCE',
    emoji: '💼',
    color: '#1565C0',
    items: [
      {
        role: 'ML ENGINEER',
        company: 'LEA',
        period: '2023 — PRESENT',
        desc: 'Building AI products that actually help people. Training models, building pipelines, shipping features that matter.',
      },
      {
        role: 'SOFTWARE ENGINEER',
        company: 'PREV. ROLE',
        period: '2021 — 2023',
        desc: 'Full-stack engineering, shipped production systems used by thousands of users.',
      },
    ],
  },
  skills: {
    type: 'skills',
    title: 'SKILLS & TECH',
    emoji: '⚡',
    color: '#6A1B9A',
    categories: [
      { name: 'ML & AI',       items: ['LLM Fine-tuning', 'RAG Pipelines', 'PyTorch', 'ML Deployment', 'Prompt Engineering'] },
      { name: 'Languages',     items: ['Python', 'TypeScript', 'SQL'] },
      { name: 'Tools & Cloud', items: ['AWS', 'Docker', 'Git', 'Cursor'] },
      { name: 'Soft Skills',   items: ['Systems Thinking', 'Fast Shipping', 'Cross-functional'] },
    ],
  },
  story0: {
    type: 'story',
    title: 'ORIGIN',
    emoji: '🌱',
    color: '#2E7D32',
    text: 'In the beginning, there was code. Angelina Wu — forged from curiosity and late-night debugging sessions — discovered the arcane arts of computing and never looked back. Where others saw complexity, she saw puzzles waiting to be solved.',
  },
  story1: {
    type: 'story',
    title: 'THE TRAINING ARC',
    emoji: '📖',
    color: '#1565C0',
    text: 'She honed her craft through countless hours of study — mastering algorithms, shipping her first products, and learning that the best systems are built with empathy for the humans who use them. Each challenge made her sharper. Each bug, a lesson.',
  },
  story2: {
    type: 'story',
    title: 'CURRENT ARC · LEA',
    emoji: '🚀',
    color: '#E65100',
    text: 'Now, at Lea, she wields machine learning as her primary weapon — building AI products that actually help people. The mission is ambitious. The stack is deep. The grind is real. She is just getting started.',
  },
  contact: {
    type: 'contact',
    title: 'GET IN TOUCH',
    emoji: '📱',
    color: '#00695C',
    links: [
      { label: 'EMAIL',    value: 'angelina@getlea.io',        href: 'mailto:angelina@getlea.io', icon: '✉️' },
      { label: 'LINKEDIN', value: 'linkedin.com/in/angelinawu', href: 'https://linkedin.com/in/',  icon: '💼' },
      { label: 'GITHUB',   value: 'github.com/angelinawu',     href: 'https://github.com/',       icon: '⚡' },
    ],
  },
  profile: {
    type: 'profile',
    title: 'CHARACTER PROFILE',
    emoji: '🧍',
    color: '#43A047',
  },
}

export const hotspots = [
  {
    id: 'computer',
    icon: '💻',
    label: 'COMPUTER',
    pos: { left: '62%', top: '14%' },
    bgColor: '#E3F2FD',
    borderColor: '#1565C0',
    actions: [
      { id: 'experience', label: 'View Work Experience', icon: '💼', panel: 'experience', need: 'creativity', verb: 'Working at computer...' },
      { id: 'skills',     label: 'Browse Tech Skills',   icon: '⚡', panel: 'skills',     need: 'focus',      verb: 'Browsing skills...'    },
    ],
  },
  {
    id: 'bookshelf',
    icon: '📚',
    label: 'BOOKSHELF',
    pos: { left: '8%', top: '10%' },
    bgColor: '#F3E5F5',
    borderColor: '#6A1B9A',
    actions: [
      { id: 'story0', label: 'Read Origin Story', icon: '🌱', panel: 'story0', need: 'energy',     verb: 'Reading the journal...'    },
      { id: 'story1', label: 'Career Journey',    icon: '📖', panel: 'story1', need: 'energy',     verb: 'Flipping through pages...' },
      { id: 'story2', label: 'Current Chapter',   icon: '🚀', panel: 'story2', need: 'creativity', verb: 'Writing new chapter...'    },
    ],
  },
  {
    id: 'phone',
    icon: '📱',
    label: 'PHONE',
    pos: { left: '78%', top: '48%' },
    bgColor: '#E8F5E9',
    borderColor: '#2E7D32',
    actions: [
      { id: 'contact', label: 'Contact Angelina', icon: '✉️', panel: 'contact', need: 'social', verb: 'Checking messages...' },
    ],
  },
  {
    id: 'mirror',
    icon: '🪞',
    label: 'MIRROR',
    pos: { left: '18%', top: '48%' },
    bgColor: '#FFF9C4',
    borderColor: '#F9A825',
    actions: [
      { id: 'profile', label: 'View Character Stats', icon: '✨', panel: 'profile', need: 'creativity', verb: 'Checking the mirror...' },
    ],
  },
]
