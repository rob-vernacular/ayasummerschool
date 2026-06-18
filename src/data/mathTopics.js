export const MATH_TOPICS = [
  {
    id: 1,
    name: 'Counting',
    description: 'Count objects up to 100',
    icon: '🔢',
    items: [
      { count: 5, emoji: '🐟', label: 'fish' },
      { count: 8, emoji: '🌺', label: 'flowers' },
      { count: 3, emoji: '🦀', label: 'crabs' },
      { count: 10, emoji: '⭐', label: 'stars' },
      { count: 6, emoji: '🐠', label: 'tropical fish' },
      { count: 7, emoji: '🌊', label: 'waves' },
      { count: 4, emoji: '🐚', label: 'shells' },
      { count: 9, emoji: '🦋', label: 'butterflies' },
    ]
  },
  {
    id: 2,
    name: 'Addition to 20',
    description: 'Add numbers together up to 20',
    icon: '➕',
    problems: [
      { a: 2, b: 3, emoji: ['🐠', '🐡'] },
      { a: 5, b: 4, emoji: ['⭐', '🌟'] },
      { a: 7, b: 3, emoji: ['🦀', '🐚'] },
      { a: 6, b: 6, emoji: ['🌸', '🌺'] },
      { a: 8, b: 5, emoji: ['🐬', '🐳'] },
      { a: 4, b: 9, emoji: ['🦋', '🐛'] },
      { a: 10, b: 7, emoji: ['⭐', '💫'] },
      { a: 3, b: 8, emoji: ['🍍', '🥥'] },
    ]
  },
  {
    id: 3,
    name: 'Subtraction to 20',
    description: 'Subtract numbers up to 20',
    icon: '➖',
    problems: [
      { a: 10, b: 3, emoji: ['🐠'] },
      { a: 8, b: 5, emoji: ['⭐'] },
      { a: 15, b: 7, emoji: ['🦀'] },
      { a: 12, b: 4, emoji: ['🌸'] },
      { a: 20, b: 9, emoji: ['🐬'] },
      { a: 7, b: 2, emoji: ['🦋'] },
      { a: 14, b: 6, emoji: ['⭐'] },
      { a: 9, b: 4, emoji: ['🍍'] },
    ]
  },
  {
    id: 4,
    name: 'Skip Counting',
    description: 'Count by 2s, 5s, and 10s',
    icon: '🦘',
    sequences: [
      { by: 2, start: 2, count: 5, label: 'Count by 2s' },
      { by: 5, start: 5, count: 4, label: 'Count by 5s' },
      { by: 10, start: 10, count: 5, label: 'Count by 10s' },
      { by: 2, start: 10, count: 5, label: 'Count by 2s from 10' },
    ]
  },
  {
    id: 5,
    name: 'Shapes',
    description: 'Learn 2D and 3D shapes',
    icon: '🔷',
    shapes2d: ['circle','square','triangle','rectangle','star','heart','diamond','oval'],
    shapes3d: ['sphere','cube','cone','cylinder','pyramid'],
    colors: ['red','blue','green','yellow','orange','purple'],
  },
  {
    id: 6,
    name: 'Patterns',
    description: 'Complete the pattern!',
    icon: '🔄',
    patterns: [
      { type: 'AB', items: ['🌸','🌊','🌸','🌊','🌸','?'], answer: '🌊' },
      { type: 'AB', items: ['⭐','🐠','⭐','🐠','?','🐠'], answer: '⭐' },
      { type: 'ABC', items: ['🔴','🔵','🟡','🔴','🔵','?'], answer: '🟡' },
      { type: 'AABB', items: ['🌺','🌺','🌊','🌊','🌺','?'], answer: '🌺' },
      { type: 'ABC', items: ['🐬','🦀','🐚','🐬','?','🐚'], answer: '🦀' },
    ]
  },
  {
    id: 7,
    name: 'Telling Time',
    description: 'Read the clock — hour and half-hour',
    icon: '🕐',
    times: [
      { hour: 1, minutes: 0, label: '1 o\'clock' },
      { hour: 3, minutes: 0, label: '3 o\'clock' },
      { hour: 6, minutes: 30, label: 'half past 6' },
      { hour: 9, minutes: 0, label: '9 o\'clock' },
      { hour: 12, minutes: 30, label: 'half past 12' },
      { hour: 7, minutes: 0, label: '7 o\'clock' },
      { hour: 2, minutes: 30, label: 'half past 2' },
      { hour: 10, minutes: 0, label: '10 o\'clock' },
    ]
  },
  {
    id: 8,
    name: 'Measurement',
    description: 'Compare longer/shorter and heavier/lighter',
    icon: '📏',
    comparisons: [
      { type: 'length', a: { label: 'pencil', size: 3 }, b: { label: 'ruler', size: 7 }, question: 'Which is longer?' },
      { type: 'length', a: { label: 'ant', size: 1 }, b: { label: 'elephant', size: 9 }, question: 'Which is shorter?' },
      { type: 'weight', a: { label: 'feather', weight: 1 }, b: { label: 'rock', weight: 8 }, question: 'Which is heavier?' },
      { type: 'weight', a: { label: 'balloon', weight: 2 }, b: { label: 'watermelon', weight: 9 }, question: 'Which is lighter?' },
    ]
  },
]
