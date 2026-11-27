export const profile = {
  name: 'Haadil Basha',
  fullName: 'Haadil Hayath Basha',
  email: 'haadilhayath.b25@iiits.in',
  githubHandle: 'Haadil-iiitian',
  githubUrl: 'https://github.com/Haadil-iiitian',
  linkedinUrl: '',
  creatorHandle: '@codeh',
  availability: 'Available for Dec 2026 hackathons & roles',
}

export const navLinks = [
  { id: 'architecture', label: '01. ARCHITECTURE' },
  { id: 'deployments', label: '02. DEPLOYMENTS' },
  { id: 'telemetry', label: '03. TELEMETRY' },
  { id: 'transmit', label: '04. TRANSMIT' },
]

export const tickerItems = [
  'World Record Holder',
  'AI/ML Researcher @ IIIT Sri City',
  '@codeh Creator',
  'BNB Hackathon Participant',
  'GDG AI/ML Executive',
  '90+ LeetCode Problems',
]

export const callouts = [
  { slot: 'tl', key: 'ROLE', value: 'Full-Stack & AI Systems Engineer' },
  { slot: 'tr', key: 'BASE', value: 'IIIT Sri City • India' },
  { slot: 'bl', key: 'LEADERSHIP', value: 'GDG AI/ML Executive Member' },
  { slot: 'br', key: 'STATUS', value: 'Available for Dec 2026 hackathons & roles' },
] as const

export const principles = [
  {
    title: 'Forecast, don’t react',
    text: 'DrowsyAhead predicts fatigue before it shows, instead of flagging it after the fact.',
  },
  {
    title: 'Pipelines over notebooks',
    text: 'Imputation, transforms and evaluation are built as repeatable stages, not one-off cells.',
  },
  {
    title: 'Teach what you ship',
    text: 'Every build turns into a breakdown other developers can learn from.',
  },
]

export const education = [
  { key: 'Program', value: 'B.Tech, Computer Science & Engineering' },
  { key: 'Institute', value: 'IIIT Sri City' },
  { key: 'Graduation', value: 'Class of 2029' },
  { key: 'Focus', value: 'AI/ML • Deep Learning • Backend Systems' },
]

export type SchematicKind = 'radar' | 'signal' | 'vitals' | 'regression' | 'orbit'

export type Project = {
  id: string
  name: string
  subtitle: string
  description: string
  pill: { label: string; tone: 'crimson' | 'gold' | 'cyan' }
  schematic: SchematicKind
  metrics: { key: string; value: string }[]
  stack: string[]
  span: 3 | 4 | 5 | 7
}

export const projects: Project[] = [
  {
    id: 'DPL-01',
    name: 'Smart Hire AI',
    subtitle: '6-Dimensional Candidate Evaluation Engine',
    description:
      'AI interview evaluation platform built for the BNB Hackathon. Candidate responses are scored across six dimensions with the Gemini API behind a FastAPI service and a JavaScript front end.',
    pill: { label: 'BNB Hackathon', tone: 'crimson' },
    schematic: 'radar',
    metrics: [
      { key: 'Dimensions', value: '06' },
      { key: 'Engine', value: 'Gemini API' },
      { key: 'Service', value: 'FastAPI' },
    ],
    stack: ['Gemini API', 'FastAPI', 'JavaScript', 'Python'],
    span: 7,
  },
  {
    id: 'DPL-02',
    name: 'House Price Prediction System',
    subtitle: 'Advanced ML Regression Pipeline',
    description:
      'A regression pipeline that uses k-NN imputation for missing values and log transformations to tame skewed features and targets.',
    pill: { label: 'ML Pipeline', tone: 'gold' },
    schematic: 'regression',
    metrics: [
      { key: 'Imputation', value: 'k-NN' },
      { key: 'Transform', value: 'Log' },
    ],
    stack: ['Python', 'Regression', 'k-NN Imputation'],
    span: 7,
  },
  {
    id: 'DPL-03',
    name: 'Python Automation Suite',
    subtitle: 'ISS Overhead Notifier & Utilities',
    description: 'An ISS overhead notifier and a set of everyday utilities scripted in Python.',
    pill: { label: 'Utilities', tone: 'cyan' },
    schematic: 'orbit',
    metrics: [{ key: 'Module', value: 'ISS Notifier' }],
    stack: ['Python', 'Automation'],
    span: 5,
  },
]

export const stackMatrix = [
  {
    id: 'SPEC-A',
    title: 'Core Languages',
    items: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 78 },
      { name: 'SQL', level: 76 },
      { name: 'JavaScript', level: 74 },
    ],
  },
  {
    id: 'SPEC-B',
    title: 'AI & Inference',
    items: [
      { name: 'Regression & feature pipelines', level: 84 },
      { name: 'Sequence models (GRU / TCN)', level: 82 },
      { name: 'Gemini API', level: 80 },
      { name: 'MediaPipe', level: 76 },
    ],
  },
  {
    id: 'SPEC-C',
    title: 'Backend & Databases',
    items: [
      { name: 'FastAPI', level: 84 },
      { name: 'Streamlit', level: 80 },
      { name: 'MySQL 8.0', level: 78 },
      { name: 'Java JDBC', level: 72 },
    ],
  },
  {
    id: 'SPEC-D',
    title: 'Systems & DevOps',
    items: [
      { name: 'Python automation', level: 86 },
      { name: 'Git & GitHub', level: 82 },
      { name: 'REST API design', level: 78 },
      { name: 'Google Cloud', level: 64 },
    ],
  },
]

export const impactStats = [
  { value: 200, suffix: '+', label: 'Registrations', detail: 'Google Cloud Study Jams organised' },
  { value: 175, suffix: '+', label: 'Participants', detail: 'Technical sessions led' },
  { value: 90, suffix: '+', label: 'Problems', detail: 'Solved on LeetCode' },
]

export const roles = [
  {
    org: 'Google Developer Groups (GDG)',
    role: 'Executive Member — AI/ML Domain',
    text: 'Organising Google Cloud Study Jams and running AI/ML sessions for the campus developer community.',
  },
]

export const creatorTopics = ['Software architecture', 'ML implementations', 'Backend logic']

export const credential = {
  label: 'Guinness World Records',
  title: 'Verified Record Participant',
  meta: 'Largest picture mosaic formed by people — 4,500 participants, Jeddah, 14 Nov 2017',
  image: '/images/guinness-certificate.jpg',
  alt: 'Guinness World Records Certificate of Participation issued to Haadil Hayath Basha for contributing to the record for the largest picture mosaic formed by people',
}
