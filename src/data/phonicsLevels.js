export const PHONICS_LEVELS = [
  {
    level: 1,
    name: 'Short Vowels',
    description: 'CVC words with short vowel sounds',
    pattern: 'Short Vowels (a, e, i, o, u)',
    words: ['cat','bat','hat','rat','mat','can','fan','man','pan','ran','cap','map','nap','tap','wag',
            'bed','red','fed','led','net','pet','set','wet','big','dig','fig','pig','wig','sit','hit',
            'bit','fit','kit','pit','hot','dot','got','lot','pot','rot','cot','bug','dug','hug','mug',
            'rug','run','fun','sun','bun','gun','cup','pup','cut','gut','nut','but'],
    sortCategories: [
      { label: 'Short A', words: ['cat','bat','hat','rat','mat','can','fan','man','pan','ran'] },
      { label: 'Short I', words: ['big','dig','fig','pig','wig','sit','hit','bit','fit','kit'] },
    ],
    pictures: {
      cat: '🐱', bat: '🦇', hat: '👒', rat: '🐭', map: '🗺️', fan: '💨',
      bed: '🛏️', red: '🔴', net: '🥅', pet: '🐾', wet: '💦',
      pig: '🐷', big: '🐘', dig: '⛏️', wig: '💇', sit: '🪑',
      hot: '🔥', dot: '🔵', pot: '🍳',
      bug: '🐛', hug: '🤗', run: '🏃', sun: '☀️', cup: '🥤', nut: '🥜',
    }
  },
  {
    level: 2,
    name: 'Consonant Blends',
    description: 'Two consonants blended together at the start of words',
    pattern: 'bl, cl, fl, pl, sl, br, cr, dr, fr, gr, pr, tr',
    words: ['blue','clap','flag','play','sled','brag','crab','drip','frog','grip','pray','trip',
            'black','clam','flat','plan','slim','brad','cram','drag','from','grab','pram','trim',
            'blend','click','flea','plum','slip','brand','crop','drop','frill','grin','press','truck'],
    sortCategories: [
      { label: 'L Blends', words: ['blue','clap','flag','play','sled','black','clam','flat','plan','slim'] },
      { label: 'R Blends', words: ['brag','crab','drip','frog','grip','pray','trip','brand','cram'] },
    ],
    pictures: { blue: '🔵', flag: '🚩', frog: '🐸', crab: '🦀', trip: '✈️', play: '🎮',
                truck: '🚛', drop: '💧', clap: '👏', grip: '✊', black: '⬛', flat: '📄' }
  },
  {
    level: 3,
    name: 'Digraphs',
    description: 'Two letters that make one sound',
    pattern: 'ch, sh, th, wh, ph',
    words: ['chip','shop','this','when','phone','chat','shed','that','whip','photo',
            'chin','shell','them','wheel','graph','chess','ship','then','white','phew',
            'chop','fish','thin','which','elephant','check','wish','thick','wheat','alphabet'],
    sortCategories: [
      { label: 'ch words', words: ['chip','chat','chin','chess','chop','check'] },
      { label: 'sh words', words: ['shop','shed','shell','ship','fish','wish'] },
    ],
    pictures: { chip: '🍟', shop: '🏪', fish: '🐟', wheel: '⚙️', phone: '📱', elephant: '🐘',
                chess: '♟️', ship: '🚢', white: '⬜', wheat: '🌾', chin: '😤', wish: '⭐' }
  },
  {
    level: 4,
    name: 'Long Vowels (Silent E)',
    description: 'The magic e makes the vowel say its name',
    pattern: 'a_e, i_e, o_e, u_e',
    words: ['cake','bike','bone','tune','make','hike','home','cute','lake','like','note','dune',
            'bake','kite','hope','mule','rake','life','rose','use','take','mine','code','cube',
            'fame','mice','hole','rule','same','price','vote','flute','name','nice','smoke','huge'],
    sortCategories: [
      { label: 'a_e (long A)', words: ['cake','make','lake','bake','rake','take','fame','same','name'] },
      { label: 'i_e (long I)', words: ['bike','hike','like','kite','life','mine','mice','nice','price'] },
    ],
    pictures: { cake: '🎂', bike: '🚲', bone: '🦴', kite: '🪁', rose: '🌹', flute: '🎵',
                home: '🏠', cube: '🧊', lake: '🏞️', note: '📝', make: '🔨', like: '👍' }
  },
  {
    level: 5,
    name: 'Vowel Teams',
    description: 'Two vowels that work together to make one sound',
    pattern: 'ai, ay, ee, ea, oa, ow',
    words: ['rain','play','tree','eat','boat','snow','mail','day','feet','leaf','road','flow',
            'tail','say','bee','heat','coat','glow','sail','may','see','sea','toad','slow',
            'train','stay','keep','cream','goat','know','chain','clay','sleep','dream','load','show'],
    sortCategories: [
      { label: 'ai/ay', words: ['rain','play','mail','day','tail','say','sail','may','train','stay','chain','clay'] },
      { label: 'ee/ea', words: ['tree','eat','feet','leaf','bee','heat','see','sea','keep','cream','sleep','dream'] },
    ],
    pictures: { rain: '🌧️', bee: '🐝', boat: '⛵', leaf: '🍃', snow: '❄️', train: '🚂',
                tree: '🌳', coat: '🧥', dream: '💭', cream: '🍦', play: '🎮', eat: '🍽️' }
  },
  {
    level: 6,
    name: 'R-Controlled Vowels',
    description: 'The letter R changes the vowel sound',
    pattern: 'ar, er, ir, or, ur',
    words: ['car','her','bird','corn','burn','star','fern','girl','fork','hurt','bar','over','shirt','horn','turn',
            'far','under','swirl','storm','surf','part','flower','third','sport','curve','dark','winter','birth','short','purse'],
    sortCategories: [
      { label: 'ar words', words: ['car','star','bar','far','part','dark'] },
      { label: 'or words', words: ['corn','fork','horn','storm','sport','short'] },
    ],
    pictures: { car: '🚗', bird: '🐦', corn: '🌽', star: '⭐', girl: '👧', horn: '📯',
                storm: '⛈️', flower: '🌸', shirt: '👕', fork: '🍴', sport: '⚽', winter: '🌨️' }
  },
  {
    level: 7,
    name: 'Diphthongs',
    description: 'Two vowels that glide together',
    pattern: 'oi, oy, ou, ow',
    words: ['oil','boy','out','cow','coin','toy','our','how','soil','joy','loud','now',
            'coil','royal','cloud','brown','point','enjoy','found','down','joint','annoy','sound','town',
            'foil','destroy','mouth','clown','broil','voyage','house','crown'],
    sortCategories: [
      { label: 'oi/oy', words: ['oil','boy','coin','toy','soil','joy','coil','royal','point','enjoy','foil'] },
      { label: 'ou/ow', words: ['out','cow','our','how','loud','now','cloud','brown','found','down','sound'] },
    ],
    pictures: { oil: '🫙', boy: '👦', cow: '🐄', cloud: '☁️', coin: '🪙', crown: '👑',
                toy: '🧸', house: '🏠', mouth: '👄', town: '🏘️', sound: '🔊', clown: '🤡' }
  },
  {
    level: 8,
    name: 'Advanced Patterns',
    description: 'Tricky spelling patterns',
    pattern: 'igh, ough, silent letters',
    words: ['night','though','know','write','light','through','knee','wrap','might','thought','knife','wrong',
            'bright','bought','gnome','lamb','fight','rough','sign','comb','right','tough','hour','climb',
            'sight','enough','island','thumb','tight','cough','ghost','wrist'],
    sortCategories: [
      { label: 'igh words', words: ['night','light','might','bright','fight','right','sight','tight'] },
      { label: 'silent letters', words: ['know','knife','gnome','wrap','wrong','lamb','sign','comb'] },
    ],
    pictures: { night: '🌙', light: '💡', knife: '🔪', lamb: '🐑', ghost: '👻', island: '🏝️',
                thumb: '👍', knee: '🦵', cough: '😷', hour: '⏰', bright: '✨', wrist: '⌚' }
  },
]

export const getPhonicsLevel = (level) => PHONICS_LEVELS.find(l => l.level === level) || PHONICS_LEVELS[0]
