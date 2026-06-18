// 60+ original stories featuring Stitch, SpongeBob, and Luna
// Leveled by Fountas & Pinnell: C, D, E, F, G, H, I, J/K

export const STORIES = [
  // ── Level C (8 stories) ────────────────────────────────────────────────
  {
    id: 'story_001', title: 'Stitch Finds a Fish', level: 'C',
    setting: 'ocean', illustration: '🐟',
    text: [
      "Stitch sees a fish.",
      "The fish is blue.",
      "Stitch likes the fish.",
      "Do you like fish too?"
    ],
    questions: [
      { question: "What did Stitch see?", options: ["A dog", "A fish", "A bird"], correct: 1, type: "literal" },
      { question: "What color was the fish?", options: ["Red", "Green", "Blue"], correct: 2, type: "literal" },
      { question: "Do you think Stitch was happy?", options: ["Yes", "No", "Maybe"], correct: 0, type: "inferential" },
    ]
  },
  {
    id: 'story_002', title: 'The Big Wave', level: 'C',
    setting: 'beach', illustration: '🌊',
    text: [
      "Stitch sat on the sand.",
      "A big wave came.",
      "It got Stitch wet.",
      "Stitch ran and ran!"
    ],
    questions: [
      { question: "Where was Stitch?", options: ["In a tree", "On the sand", "In the sky"], correct: 1, type: "literal" },
      { question: "What happened to Stitch?", options: ["He got wet", "He got lost", "He fell asleep"], correct: 0, type: "literal" },
      { question: "How did Stitch feel about the wave?", options: ["Scared", "Happy", "Bored"], correct: 0, type: "inferential" },
    ]
  },
  {
    id: 'story_003', title: 'Luna Runs Fast', level: 'C',
    setting: 'meadow', illustration: '🦄',
    text: [
      "Luna is a unicorn.",
      "She can run fast.",
      "She runs and runs.",
      "She is so happy!"
    ],
    questions: [
      { question: "What is Luna?", options: ["A dog", "A cat", "A unicorn"], correct: 2, type: "literal" },
      { question: "What can Luna do?", options: ["Swim", "Run fast", "Sing"], correct: 1, type: "literal" },
      { question: "How does Luna feel?", options: ["Happy", "Sad", "Tired"], correct: 0, type: "inferential" },
    ]
  },
  {
    id: 'story_004', title: 'Stitch Eats', level: 'C',
    setting: "Stitch's house", illustration: '🍕',
    text: [
      "Stitch is hungry.",
      "He gets some food.",
      "Stitch eats it all up.",
      "Now he is not hungry."
    ],
    questions: [
      { question: "How did Stitch feel at the start?", options: ["Tired", "Hungry", "Happy"], correct: 1, type: "literal" },
      { question: "What did Stitch do?", options: ["He ate food", "He slept", "He ran"], correct: 0, type: "literal" },
      { question: "How did Stitch feel at the end?", options: ["Still hungry", "Full", "Scared"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_005', title: 'SpongeBob Cooks', level: 'C',
    setting: 'underwater', illustration: '🍔',
    text: [
      "SpongeBob likes to cook.",
      "He makes a big meal.",
      "It smells so good.",
      "Stitch wants some too!"
    ],
    questions: [
      { question: "What does SpongeBob like to do?", options: ["Sleep", "Cook", "Run"], correct: 1, type: "literal" },
      { question: "How did the meal smell?", options: ["Bad", "Good", "Funny"], correct: 1, type: "literal" },
      { question: "Why does Stitch want some?", options: ["He is bored", "It smells good", "He is sad"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_006', title: 'Stitch and the Stars', level: 'C',
    setting: 'space', illustration: '⭐',
    text: [
      "Stitch looks up.",
      "He sees the stars.",
      "There are so many!",
      "Stitch loves the stars."
    ],
    questions: [
      { question: "What did Stitch look at?", options: ["The ocean", "The stars", "The trees"], correct: 1, type: "literal" },
      { question: "How many stars were there?", options: ["One", "Two", "So many"], correct: 2, type: "literal" },
      { question: "What does Stitch love?", options: ["Rain", "Stars", "Mud"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_007', title: 'Luna Finds a Rainbow', level: 'C',
    setting: 'meadow', illustration: '🌈',
    text: [
      "It rains a little.",
      "Then the sun comes out.",
      "Luna sees a rainbow.",
      "It is red and blue!"
    ],
    questions: [
      { question: "What came after the rain?", options: ["More rain", "The sun", "Snow"], correct: 1, type: "literal" },
      { question: "What did Luna see?", options: ["A flower", "A rainbow", "A star"], correct: 1, type: "literal" },
      { question: "What colors were in the rainbow?", options: ["Red and blue", "Green and pink", "Yellow only"], correct: 0, type: "literal" },
    ]
  },
  {
    id: 'story_008', title: 'Stitch Gets Wet', level: 'C',
    setting: 'beach', illustration: '🌧️',
    text: [
      "Stitch went out to play.",
      "It started to rain.",
      "Stitch got all wet.",
      "He ran to get dry!"
    ],
    questions: [
      { question: "What did Stitch go out to do?", options: ["Eat", "Play", "Sleep"], correct: 1, type: "literal" },
      { question: "What happened outside?", options: ["It snowed", "It rained", "It was hot"], correct: 1, type: "literal" },
      { question: "Why did Stitch run inside?", options: ["He was scared", "He was hungry", "He wanted to get dry"], correct: 2, type: "inferential" },
    ]
  },

  // ── Level D (8 stories) ────────────────────────────────────────────────
  {
    id: 'story_009', title: 'Stitch at the Beach', level: 'D',
    setting: 'beach', illustration: '🏖️',
    text: [
      "Stitch went to the beach today.",
      "He played in the warm sand.",
      "He found a big red shell.",
      "He put it up to his ear.",
      "He could hear the ocean inside!"
    ],
    questions: [
      { question: "Where did Stitch go?", options: ["The park", "The beach", "The forest"], correct: 1, type: "literal" },
      { question: "What did Stitch find?", options: ["A fish", "A big red shell", "A hat"], correct: 1, type: "literal" },
      { question: "What did Stitch hear in the shell?", options: ["Music", "The ocean", "Voices"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_010', title: "SpongeBob's New Friend", level: 'D',
    setting: 'underwater', illustration: '🧽',
    text: [
      "SpongeBob met a new fish today.",
      "The fish was small and yellow.",
      "SpongeBob said hello with a big smile.",
      "The fish smiled back.",
      "Now they are good friends!"
    ],
    questions: [
      { question: "What was the new fish like?", options: ["Big and blue", "Small and yellow", "Old and red"], correct: 1, type: "literal" },
      { question: "What did SpongeBob do when he said hello?", options: ["He frowned", "He smiled", "He ran"], correct: 1, type: "literal" },
      { question: "What do you think makes a good friend?", options: ["Being mean", "Being kind", "Running away"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_011', title: 'Luna Helps a Bird', level: 'D',
    setting: 'meadow', illustration: '🐦',
    text: [
      "Luna found a little bird.",
      "The bird had a hurt wing.",
      "Luna sat by the bird all day.",
      "She kept it warm and safe.",
      "The next day, the bird flew away."
    ],
    questions: [
      { question: "What was wrong with the bird?", options: ["It was lost", "It had a hurt wing", "It was hungry"], correct: 1, type: "literal" },
      { question: "What did Luna do for the bird?", options: ["She left it alone", "She kept it warm", "She fed it"], correct: 1, type: "literal" },
      { question: "Was Luna a good friend to the bird?", options: ["Yes", "No", "We don't know"], correct: 0, type: "inferential" },
    ]
  },
  {
    id: 'story_012', title: 'Stitch Builds a Fort', level: 'D',
    setting: "Stitch's house", illustration: '🏰',
    text: [
      "Stitch got big blankets.",
      "He put them over chairs.",
      "He made a cozy fort!",
      "Stitch went inside his fort.",
      "It was his favorite place to read."
    ],
    questions: [
      { question: "What did Stitch use to build his fort?", options: ["Sticks", "Blankets", "Mud"], correct: 1, type: "literal" },
      { question: "What did Stitch do in his fort?", options: ["Slept", "Read", "Ate"], correct: 1, type: "literal" },
      { question: "How do you think Stitch felt in his fort?", options: ["Sad", "Cozy and happy", "Scared"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_013', title: 'The Crab Race', level: 'D',
    setting: 'beach', illustration: '🦀',
    text: [
      "Stitch saw two crabs on the sand.",
      "One crab was red and one was brown.",
      "They started to race along the shore.",
      "Stitch cheered them both on.",
      "The red crab won the race!"
    ],
    questions: [
      { question: "What colors were the crabs?", options: ["Blue and green", "Red and brown", "Yellow and pink"], correct: 1, type: "literal" },
      { question: "What were the crabs doing?", options: ["Swimming", "Sleeping", "Racing"], correct: 2, type: "literal" },
      { question: "Which crab won the race?", options: ["The brown crab", "The red crab", "Neither"], correct: 1, type: "literal" },
    ]
  },
  {
    id: 'story_014', title: "Luna's Magic Horn", level: 'D',
    setting: 'meadow', illustration: '✨',
    text: [
      "Luna has a golden horn.",
      "When she touches it to a flower, it glows.",
      "The flower gets big and bright.",
      "Luna loves to make flowers glow.",
      "The meadow looks like the stars!"
    ],
    questions: [
      { question: "What color is Luna's horn?", options: ["Silver", "Golden", "White"], correct: 1, type: "literal" },
      { question: "What happens when Luna touches a flower?", options: ["It wilts", "It glows", "It moves"], correct: 1, type: "literal" },
      { question: "What does the meadow look like after Luna?", options: ["A forest", "The stars", "A beach"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_015', title: 'Stitch Learns to Swim', level: 'D',
    setting: 'ocean', illustration: '🏊',
    text: [
      "Stitch stood at the edge of the water.",
      "He put one paw in.",
      "It felt cold at first!",
      "Then he jumped in with a big splash.",
      "Stitch could swim after all!"
    ],
    questions: [
      { question: "How did the water feel at first?", options: ["Warm", "Cold", "Hot"], correct: 1, type: "literal" },
      { question: "What did Stitch do next?", options: ["He ran away", "He jumped in", "He cried"], correct: 1, type: "literal" },
      { question: "What is Stitch learning at the start of the story?", options: ["To cook", "To swim", "To fly"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_016', title: "SpongeBob's Krabby Patty", level: 'D',
    setting: 'underwater', illustration: '🍔',
    text: [
      "SpongeBob made a Krabby Patty.",
      "He put on pickles and cheese.",
      "He brought it to Stitch.",
      "Stitch took one big bite.",
      "His eyes went wide. It was the best!"
    ],
    questions: [
      { question: "What did SpongeBob put on the patty?", options: ["Ketchup", "Pickles and cheese", "Peanut butter"], correct: 1, type: "literal" },
      { question: "Who got the Krabby Patty?", options: ["Luna", "Stitch", "Patrick"], correct: 1, type: "literal" },
      { question: "What did Stitch think of the Krabby Patty?", options: ["He hated it", "It was okay", "It was the best"], correct: 2, type: "inferential" },
    ]
  },

  // ── Level E (8 stories) ────────────────────────────────────────────────
  {
    id: 'story_017', title: 'The Lost Treasure', level: 'E',
    setting: 'beach', illustration: '💎',
    text: [
      "Stitch found an old map on the beach.",
      "The map showed a big X near the palm trees.",
      "Stitch ran to the palm trees and started to dig.",
      "He dug and dug with his big paws.",
      "Under the sand was a shiny box!",
      "Stitch opened it up and smiled a big smile."
    ],
    questions: [
      { question: "Where did Stitch find the map?", options: ["In the ocean", "On the beach", "In a tree"], correct: 1, type: "literal" },
      { question: "What did the X on the map mean?", options: ["A school", "The treasure spot", "A restaurant"], correct: 1, type: "inferential" },
      { question: "What was inside the box?", options: ["The story doesn't say", "Gold coins", "More maps"], correct: 0, type: "inferential" },
    ]
  },
  {
    id: 'story_018', title: 'Luna and the Storm', level: 'E',
    setting: 'meadow', illustration: '⛈️',
    text: [
      "Dark clouds came over the meadow.",
      "Luna could hear thunder far away.",
      "She ran to find a safe place to stay.",
      "She found a big oak tree with long branches.",
      "Luna stood under it and waited.",
      "When the storm ended, a rainbow came out!"
    ],
    questions: [
      { question: "What did Luna hear?", options: ["A song", "Thunder", "Stitch calling"], correct: 1, type: "literal" },
      { question: "Where did Luna hide from the storm?", options: ["In a cave", "Under a tree", "In a barn"], correct: 1, type: "literal" },
      { question: "What came after the storm?", options: ["More thunder", "A rainbow", "Snow"], correct: 1, type: "literal" },
    ]
  },
  {
    id: 'story_019', title: "Stitch's Messy Room", level: 'E',
    setting: "Stitch's house", illustration: '🧹',
    text: [
      "Stitch had a very messy room.",
      "There were toys on the floor and books on the bed.",
      "Lilo said he needed to clean up.",
      "Stitch picked up all the toys one by one.",
      "He put the books back on the shelf.",
      "His room looked so clean he almost didn't know it!"
    ],
    questions: [
      { question: "What was wrong with Stitch's room?", options: ["It was too dark", "It was very messy", "It was too small"], correct: 1, type: "literal" },
      { question: "Who told Stitch to clean up?", options: ["Luna", "SpongeBob", "Lilo"], correct: 2, type: "literal" },
      { question: "How did Stitch feel when his room was clean?", options: ["Mad", "Proud and surprised", "Hungry"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_020', title: 'The Singing Fish', level: 'E',
    setting: 'underwater', illustration: '🎵',
    text: [
      "Deep in the ocean there lived a fish who loved to sing.",
      "Every morning she sang as the sun came up.",
      "SpongeBob heard the singing one day.",
      "He swam toward the sound.",
      "He found a little blue fish with a big voice.",
      "SpongeBob clapped his square hands and cheered!"
    ],
    questions: [
      { question: "What did the fish love to do?", options: ["Dance", "Sing", "Cook"], correct: 1, type: "literal" },
      { question: "When did she sing?", options: ["At night", "In the morning", "At lunch"], correct: 1, type: "literal" },
      { question: "Why did SpongeBob swim toward the sound?", options: ["He wanted to eat", "He was curious", "He was lost"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_021', title: 'A Day at the Tide Pools', level: 'E',
    setting: 'beach', illustration: '🦞',
    text: [
      "Stitch, Luna, and SpongeBob went to the tide pools.",
      "They bent down to look at tiny creatures.",
      "Stitch found a sea star with five arms.",
      "Luna spotted a little crab hiding under a rock.",
      "SpongeBob said he recognized some neighbors from Bikini Bottom.",
      "They looked and looked until the sun went down."
    ],
    questions: [
      { question: "Who went to the tide pools?", options: ["Only Stitch", "Stitch and Luna", "Stitch, Luna, and SpongeBob"], correct: 2, type: "literal" },
      { question: "How many arms did the sea star have?", options: ["Three", "Four", "Five"], correct: 2, type: "literal" },
      { question: "Why did SpongeBob recognize some of the creatures?", options: ["He had seen pictures", "They were his neighbors", "He made them up"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_022', title: "Luna's Star Gift", level: 'E',
    setting: 'space', illustration: '💫',
    text: [
      "One night, a star fell from the sky.",
      "It landed right next to Luna in the meadow.",
      "The star was small and still glowing.",
      "Luna picked it up gently in her mouth.",
      "She carried it to the top of the hill.",
      "Then she tossed it back into the sky where it belonged."
    ],
    questions: [
      { question: "Where did the star land?", options: ["In the ocean", "Next to Luna", "On a tree"], correct: 1, type: "literal" },
      { question: "What did Luna do with the star?", options: ["She kept it", "She gave it to Stitch", "She put it back in the sky"], correct: 2, type: "literal" },
      { question: "Why do you think Luna put the star back?", options: ["She didn't like it", "It belonged in the sky", "It was too heavy"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_023', title: 'Stitch Tries Something New', level: 'E',
    setting: 'beach', illustration: '🏄',
    text: [
      "Lilo gave Stitch a surfboard for his birthday.",
      "Stitch had never surfed before.",
      "He carried it to the water and pushed off.",
      "The first time he fell right away!",
      "He got back up and tried again.",
      "By the end of the day, he could ride a wave!"
    ],
    questions: [
      { question: "What did Lilo give Stitch?", options: ["A kite", "A surfboard", "A boat"], correct: 1, type: "literal" },
      { question: "What happened the first time Stitch tried?", options: ["He was great", "He fell", "He swam away"], correct: 1, type: "literal" },
      { question: "What lesson does this story teach?", options: ["Give up when things are hard", "Keep trying and you'll get better", "Never try new things"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_024', title: "SpongeBob's Bad Day", level: 'E',
    setting: 'underwater', illustration: '😢',
    text: [
      "SpongeBob burned the Krabby Patties that morning.",
      "Then he tripped and fell in front of Squidward.",
      "Squidward laughed, which made SpongeBob sad.",
      "He sat outside and looked at the bubbles rising up.",
      "Stitch sat down next to him quietly.",
      "Just having a friend nearby made SpongeBob feel better."
    ],
    questions: [
      { question: "What went wrong for SpongeBob first?", options: ["He was late", "He burned the Patties", "He lost his pants"], correct: 1, type: "literal" },
      { question: "Who made SpongeBob feel better?", options: ["Squidward", "Mr. Krabs", "Stitch"], correct: 2, type: "literal" },
      { question: "What did Stitch do to help?", options: ["Told a joke", "Just sat nearby", "Made food"], correct: 1, type: "inferential" },
    ]
  },

  // ── Level F (8 stories) ────────────────────────────────────────────────
  {
    id: 'story_025', title: 'The Island Storm', level: 'F',
    setting: 'beach', illustration: '🌪️',
    text: [
      "A big storm was coming to the island.",
      "Stitch could see the dark clouds gathering over the water.",
      "He ran from house to house warning everyone.",
      "Luna helped move the animals to higher ground.",
      "SpongeBob made sure his friends had enough food and water.",
      "They all worked together all afternoon.",
      "When the storm finally passed, the island was safe.",
      "Everyone cheered for the friends who helped."
    ],
    questions: [
      { question: "What was coming to the island?", options: ["A big ship", "A storm", "A parade"], correct: 1, type: "literal" },
      { question: "What did Stitch do to help?", options: ["He hid", "He warned everyone", "He flew away"], correct: 1, type: "literal" },
      { question: "What is the most important thing the friends did?", options: ["They ran away", "They worked together", "They slept"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_026', title: "Luna's Nighttime Adventure", level: 'F',
    setting: 'meadow', illustration: '🌙',
    text: [
      "Most nights Luna slept in the soft grass of the meadow.",
      "But one night she heard a sound she had never heard before.",
      "It was a tiny, sad crying coming from behind a bush.",
      "Luna walked slowly toward the sound.",
      "Hiding behind the bush was a small baby deer.",
      "Luna nuzzled it gently with her nose.",
      "The crying stopped, and the baby deer fell asleep against her side.",
      "Luna stood very still all night, keeping watch."
    ],
    questions: [
      { question: "What did Luna hear?", options: ["Singing", "Sad crying", "Thunder"], correct: 1, type: "literal" },
      { question: "What was hiding behind the bush?", options: ["A bird", "Stitch", "A baby deer"], correct: 2, type: "literal" },
      { question: "Why did Luna stand still all night?", options: ["She was tired", "She was keeping the deer safe", "She was lost"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_027', title: "Stitch's Space Dream", level: 'F',
    setting: 'space', illustration: '🚀',
    text: [
      "Stitch dreamed he was flying through outer space.",
      "He zipped past planets of purple and green.",
      "He saw moons made of ice that sparkled like diamonds.",
      "Then he found a planet that looked just like Hawaii.",
      "It had blue oceans and tall green mountains.",
      "He landed gently on the warm sand.",
      "When Stitch woke up, he smiled.",
      "No matter where he flew, home was the best place of all."
    ],
    questions: [
      { question: "What did Stitch see in his dream?", options: ["Fish", "Purple and green planets", "A school"], correct: 1, type: "literal" },
      { question: "What did the planet he found look like?", options: ["A city", "Hawaii", "The ocean floor"], correct: 1, type: "literal" },
      { question: "What is the message of this story?", options: ["Space is scary", "Adventures are fun but home is best", "Never dream"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_028', title: "SpongeBob's Big Contest", level: 'F',
    setting: 'underwater', illustration: '🏆',
    text: [
      "There was a cooking contest in Bikini Bottom.",
      "SpongeBob practiced his best Krabby Patty recipe.",
      "He stayed up all night getting every detail right.",
      "On contest day, his hands were shaking.",
      "Stitch gave him a big thumbs up from the crowd.",
      "SpongeBob took a deep breath and cooked his very best.",
      "When the judge tasted it, her eyes went wide.",
      "'This is the best patty I have ever tasted!' she said."
    ],
    questions: [
      { question: "What was SpongeBob getting ready for?", options: ["A race", "A cooking contest", "A dance show"], correct: 1, type: "literal" },
      { question: "How did SpongeBob feel before he started cooking?", options: ["Bored", "Nervous, his hands shook", "Angry"], correct: 1, type: "literal" },
      { question: "Why did Stitch give a thumbs up?", options: ["He was bored", "To encourage SpongeBob", "He wanted food"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_029', title: 'The Message in a Bottle', level: 'F',
    setting: 'beach', illustration: '🍾',
    text: [
      "Stitch was walking along the beach when he spotted a bottle.",
      "It was bobbing in the shallow water near the rocks.",
      "He waded in and picked it up.",
      "Inside was a rolled-up piece of paper.",
      "He pulled it out carefully and unrolled it.",
      "It said: 'To whoever finds this — you are wonderful!'",
      "Stitch didn't know who wrote it.",
      "But he kept the note in his pocket forever."
    ],
    questions: [
      { question: "Where did Stitch find the bottle?", options: ["In a cave", "Near the rocks in the water", "Under a tree"], correct: 1, type: "literal" },
      { question: "What was inside the bottle?", options: ["Sand", "A map", "A note"], correct: 2, type: "literal" },
      { question: "Why do you think Stitch kept the note forever?", options: ["It was funny", "It made him feel special", "He forgot to throw it away"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_030', title: "Luna and the Sleepy Dragon", level: 'F',
    setting: 'meadow', illustration: '🐉',
    text: [
      "Everyone in the valley was afraid of the big dragon.",
      "But Luna walked right up and said hello.",
      "The dragon blinked his huge orange eyes.",
      "'No one has ever talked to me before,' he said.",
      "Luna sat with him under the shade of a big tree.",
      "They talked all afternoon about clouds and fire and flying.",
      "When the sun set, the dragon yawned a sleepy yawn.",
      "'Thank you, Luna,' he said. 'I was just lonely.'"
    ],
    questions: [
      { question: "Why was everyone afraid?", options: ["Because of the storm", "Because of the big dragon", "Because it was dark"], correct: 1, type: "literal" },
      { question: "How did the dragon feel when Luna talked to him?", options: ["Angry", "Surprised and glad", "Scared"], correct: 1, type: "inferential" },
      { question: "What was really wrong with the dragon?", options: ["He was sick", "He was lonely", "He was hungry"], correct: 1, type: "literal" },
    ]
  },
  {
    id: 'story_031', title: "Stitch and the Spelling Bee", level: 'F',
    setting: "Stitch's house", illustration: '🐝',
    text: [
      "Stitch entered the island spelling bee.",
      "He studied hard every evening with Lilo.",
      "They made flash cards and tested each other.",
      "On the day of the contest, Stitch stood at the microphone.",
      "His first word was 'beautiful.'",
      "He closed his eyes, thought of all his practice nights, and spelled it out.",
      "'B-E-A-U-T-I-F-U-L. Beautiful!'",
      "The whole crowd cheered — including a very proud Lilo."
    ],
    questions: [
      { question: "What did Stitch and Lilo use to study?", options: ["Books only", "Flash cards", "A computer"], correct: 1, type: "literal" },
      { question: "What was Stitch's first word in the contest?", options: ["Beautiful", "Rainbow", "Island"], correct: 0, type: "literal" },
      { question: "What helped Stitch spell the word correctly?", options: ["Guessing", "Thinking of his practice", "Looking at the answer"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_032', title: 'The Sandcastle King', level: 'F',
    setting: 'beach', illustration: '🏰',
    text: [
      "Every summer there was a sandcastle contest on the beach.",
      "This year, Stitch and SpongeBob decided to build one together.",
      "SpongeBob had ideas about towers and walls.",
      "Stitch wanted to add a moat filled with real water.",
      "They argued a little, then agreed to use both ideas.",
      "By sunset they had built the most amazing sandcastle anyone had ever seen.",
      "It had towers and walls and a moat that sparkled.",
      "They won first place, but the best prize was building it together."
    ],
    questions: [
      { question: "What did Stitch want to add to the sandcastle?", options: ["A flag", "A moat", "A bridge"], correct: 1, type: "literal" },
      { question: "What happened when they used both ideas?", options: ["It fell down", "They won first place", "They quit"], correct: 1, type: "literal" },
      { question: "What was the real best prize, according to the story?", options: ["The trophy", "Building it together", "The money"], correct: 1, type: "inferential" },
    ]
  },

  // ── Level G (8 stories) ────────────────────────────────────────────────
  {
    id: 'story_033', title: "Stitch's Secret Garden", level: 'G',
    setting: 'meadow', illustration: '🌸',
    text: [
      "Behind Stitch's house was a patch of land no one ever visited.",
      "One spring day, Stitch decided to plant a garden there.",
      "He dug the earth with a small shovel, making neat rows.",
      "He planted seeds for sunflowers, tomatoes, and sweet strawberries.",
      "Every morning he watered them carefully.",
      "Week by week, green shoots pushed through the dark soil.",
      "By summer, the garden was so full of color that neighbors stopped on the path to look.",
      "Stitch gave away bags of tomatoes to everyone on the street.",
      "He discovered that growing things is one of the best feelings there is."
    ],
    questions: [
      { question: "What three things did Stitch plant?", options: ["Roses, corn, and beans", "Sunflowers, tomatoes, and strawberries", "Trees, grass, and flowers"], correct: 1, type: "literal" },
      { question: "What did Stitch do with his tomatoes?", options: ["He ate them all himself", "He threw them away", "He gave them to neighbors"], correct: 2, type: "literal" },
      { question: "What lesson did Stitch learn from the garden?", options: ["Gardening is too much work", "Growing things feels wonderful", "Tomatoes are not tasty"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_034', title: 'Luna and the Lost Foal', level: 'G',
    setting: 'meadow', illustration: '🐴',
    text: [
      "One misty morning, Luna came across a small foal standing alone at the edge of the forest.",
      "The foal was trembling and looking around with wide, worried eyes.",
      "Luna approached slowly, speaking in a gentle, quiet voice.",
      "'Don't be afraid. I'm Luna. I'll help you find your mother.'",
      "Together they walked through the tall grass, Luna leading the way.",
      "Luna listened carefully to every sound.",
      "After a long time, she heard a distant whinny echoing from the valley below.",
      "The foal's ears perked straight up.",
      "They galloped down the hill, and there, waiting at the stream, was the foal's mother.",
      "The reunion was the sweetest thing Luna had ever seen."
    ],
    questions: [
      { question: "How was the foal feeling when Luna found it?", options: ["Excited and happy", "Trembling and worried", "Angry and loud"], correct: 1, type: "literal" },
      { question: "How did Luna find the mother?", options: ["She saw her", "She smelled her", "She heard a whinny"], correct: 2, type: "literal" },
      { question: "What character trait does this story show about Luna?", options: ["She is selfish", "She is kind and patient", "She is scared"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_035', title: 'SpongeBob Learns to Ride a Wave', level: 'G',
    setting: 'beach', illustration: '🏄',
    text: [
      "SpongeBob had always lived under the ocean, never on top of it.",
      "When Stitch invited him surfing, SpongeBob agreed, though his knees wobbled.",
      "The first wave knocked him off the board completely.",
      "He came up spluttering, board spinning beside him.",
      "Stitch paddled over. 'Your balance was perfect — you just needed more timing,' he said.",
      "SpongeBob tried seven more times before he finally felt the wave lift him up.",
      "He stood. The world slowed down. He was riding the wave!",
      "He let out a noise somewhere between a shout and a laugh.",
      "When it ended, he looked back at Stitch with shining eyes.",
      "'Again!' he yelled."
    ],
    questions: [
      { question: "Why were SpongeBob's knees wobbling?", options: ["He was cold", "He was nervous", "He was hungry"], correct: 1, type: "inferential" },
      { question: "What did Stitch say SpongeBob needed more of?", options: ["Strength", "Practice", "Timing"], correct: 2, type: "literal" },
      { question: "What does SpongeBob shout at the end, and what does it tell us about him?", options: ["He wants to stop", "He loves it and wants to do it again", "He is angry"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_036', title: "The Night of Shooting Stars", level: 'G',
    setting: 'space', illustration: '🌠',
    text: [
      "Every August, shooting stars streaked across the sky above the island.",
      "Stitch, Luna, and SpongeBob carried blankets to the top of the hill.",
      "They lay on their backs in the cool grass, watching.",
      "SpongeBob wished on the very first star for a new spatula.",
      "Luna wished quietly and kept her wish secret, the way you're supposed to.",
      "Stitch watched star after star burn bright and fade.",
      "He thought about where he came from — far beyond those lights.",
      "He thought about where he was now — right here, with his people.",
      "'Ohana,' he said softly into the dark.",
      "Nobody replied. But everybody understood."
    ],
    questions: [
      { question: "Where did the three friends go to watch the stars?", options: ["The beach", "The top of the hill", "The meadow"], correct: 1, type: "literal" },
      { question: "What did SpongeBob wish for?", options: ["A friend", "A new spatula", "A sunny day"], correct: 1, type: "literal" },
      { question: "What did Stitch mean when he said 'Ohana'?", options: ["He was tired", "He was thinking about his family — his friends", "He saw something"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_037', title: 'The Library Day', level: 'G',
    setting: "Stitch's house", illustration: '📚',
    text: [
      "There was a tiny library in the village, and Stitch had never been inside.",
      "Luna convinced him to come one rainy afternoon.",
      "The shelves reached all the way to the ceiling and smelled of old paper and adventure.",
      "Stitch ran his paw along the spines of the books.",
      "A librarian with round glasses smiled at him.",
      "'What do you like?' she asked.",
      "'Things that fly,' said Stitch. 'And things that are funny.'",
      "She pulled out two books without hesitating.",
      "Stitch sat in a beanbag chair in the corner and didn't leave until the library closed.",
      "He borrowed both books, plus three more."
    ],
    questions: [
      { question: "Why did Stitch visit the library for the first time?", options: ["He was bored", "Luna convinced him", "It was his idea"], correct: 1, type: "literal" },
      { question: "What two kinds of things did Stitch say he liked?", options: ["Fish and swimming", "Things that fly and things that are funny", "Stars and music"], correct: 1, type: "literal" },
      { question: "How do you know Stitch enjoyed the library?", options: ["He said he hated it", "He stayed until it closed and borrowed five books", "He never went back"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_038', title: "Luna's Great Race", level: 'G',
    setting: 'meadow', illustration: '🏁',
    text: [
      "The annual Meadow Run was the biggest race in the valley.",
      "Luna entered, though she knew a big fast stallion named Thunder was also running.",
      "All the other animals were sure Thunder would win.",
      "Luna didn't run to beat Thunder — she ran because she loved to run.",
      "At the starting horn, Thunder burst ahead in a thunder of hooves.",
      "Luna ran smooth and steady, breathing easy, finding her rhythm.",
      "By the second mile, Thunder had slowed from going too fast too soon.",
      "Luna passed him gently, still moving, still steady.",
      "She crossed the finish line first.",
      "But when she looked back and saw Thunder panting, she waited and cheered him in too."
    ],
    questions: [
      { question: "Who was Luna racing against?", options: ["A deer named Flash", "A stallion named Thunder", "SpongeBob"], correct: 1, type: "literal" },
      { question: "Why did Thunder slow down?", options: ["He got scared", "He stopped to eat", "He went too fast too soon"], correct: 2, type: "literal" },
      { question: "What does it tell us that Luna waited and cheered Thunder in?", options: ["She was showing off", "She was kind and a good sport", "She was waiting for a prize"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_039', title: 'Stitch and the Baby Turtle', level: 'G',
    setting: 'beach', illustration: '🐢',
    text: [
      "One evening at sunset, Stitch noticed something moving in the sand near the water's edge.",
      "He crouched down and saw it was a baby sea turtle, smaller than his paw.",
      "The turtle was heading the wrong way — away from the ocean.",
      "Stitch picked it up gently and turned it to face the waves.",
      "He watched it toddle across the wet sand, then into the foam, then into the deep water.",
      "Just before it disappeared, it turned its tiny head back.",
      "Stitch lifted one paw in a small wave.",
      "He sat on the sand for a long time after, watching the place where the turtle had gone.",
      "Some goodbyes, he thought, are worth staying to watch."
    ],
    questions: [
      { question: "What was the baby turtle doing wrong?", options: ["It was going too fast", "It was heading away from the ocean", "It was crying"], correct: 1, type: "literal" },
      { question: "What did Stitch do with the turtle?", options: ["He kept it", "He ignored it", "He turned it toward the water and watched it go"], correct: 2, type: "literal" },
      { question: "What does 'Some goodbyes are worth staying to watch' mean?", options: ["Goodbyes are sad", "Some moments matter enough to slow down for", "Stitch was tired"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_040', title: "SpongeBob's New Recipe", level: 'G',
    setting: 'underwater', illustration: '🧪',
    text: [
      "SpongeBob had a wild idea: a Krabby Patty topped with pineapple.",
      "Everyone at the Krusty Krab thought it was a terrible idea.",
      "Squidward made a face. Mr. Krabs shook his head.",
      "But SpongeBob believed in it, so he made one anyway.",
      "He took one cautious bite.",
      "His eyes widened. His mouth opened into a huge square smile.",
      "It was spectacular.",
      "He made fifty more and left them on the counter.",
      "By closing time, every single one was gone.",
      "Mr. Krabs found SpongeBob afterward and said just one word: 'Again.'"
    ],
    questions: [
      { question: "What was SpongeBob's new idea?", options: ["A patty with cheese", "A patty with pineapple", "A patty with ice cream"], correct: 1, type: "literal" },
      { question: "What happened to the fifty patties SpongeBob made?", options: ["They were thrown away", "He ate them all", "They were all eaten by closing time"], correct: 2, type: "literal" },
      { question: "What does Mr. Krabs saying 'Again' tell us?", options: ["He hated them", "He wanted SpongeBob to stop", "He loved them and wanted more"], correct: 2, type: "inferential" },
    ]
  },

  // ── Level H (7 stories) ────────────────────────────────────────────────
  {
    id: 'story_041', title: "The Storm That Taught Stitch to Listen", level: 'H',
    setting: 'beach', illustration: '🌊',
    text: [
      "The old fisherman on the dock had warned Stitch three times not to go into the water that morning.",
      "'The water is angry today,' he said, pointing at the dark line on the horizon.",
      "Stitch had looked at the gentle ripples near the shore and decided the old man was just being cautious.",
      "He waded in up to his waist.",
      "Within minutes, a swell lifted him off his feet.",
      "He tumbled in the white water, disoriented, fins flailing.",
      "He found the bottom with one paw and pushed hard toward the light.",
      "He came up gasping just a few feet from shore.",
      "The fisherman was there, hand extended, steady as a post.",
      "Stitch held it and pulled himself out.",
      "He sat on the wet rocks for a long time, listening to the sea.",
      "The old man said nothing. He didn't need to."
    ],
    questions: [
      { question: "How many times did the fisherman warn Stitch?", options: ["Once", "Twice", "Three times"], correct: 2, type: "literal" },
      { question: "Why did Stitch ignore the warning?", options: ["He couldn't hear", "The water near the shore looked calm", "He wanted to prove something"], correct: 1, type: "literal" },
      { question: "Why do you think the old man said nothing after rescuing Stitch?", options: ["He was angry", "He knew Stitch had already learned the lesson", "He forgot what to say"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_042', title: "Luna's Longest Night", level: 'H',
    setting: 'meadow', illustration: '🌙',
    text: [
      "It was the winter solstice — the longest night of the year.",
      "Luna walked farther than she had ever walked before, just to see where the meadow ended.",
      "The stars above her were extraordinary, each one impossibly bright in the cold air.",
      "She passed a frozen pond that reflected the sky perfectly.",
      "For a moment she couldn't tell which was up and which was down.",
      "She walked until she reached a cliff she had never seen.",
      "Below it, far in the distance, were lights — a whole village glowing warm and gold.",
      "She realized how large the world was.",
      "She also realized that somewhere in that world, her friends were sleeping.",
      "She turned around and walked home, and the stars lit every step."
    ],
    questions: [
      { question: "What is the winter solstice?", options: ["A festival", "The longest night of the year", "A type of storm"], correct: 1, type: "literal" },
      { question: "What two things did Luna realize at the cliff?", options: ["The world was small and her friends were lost", "The world was large and her friends were home", "She was lost and it was cold"], correct: 1, type: "inferential" },
      { question: "What does the frozen pond reflecting the sky suggest about this moment?", options: ["It was dangerous", "It was a magical, dreamlike moment", "Luna was confused"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_043', title: "SpongeBob Writes a Letter", level: 'H',
    setting: 'underwater', illustration: '✉️',
    text: [
      "SpongeBob decided to write a letter to Sandy, who had gone to Texas for the summer.",
      "He sat down with paper and a very sharp pencil.",
      "He started three times and crossed out three beginnings.",
      "Too formal. Too silly. Too short.",
      "He thought about what he actually wanted to say.",
      "He wanted to say that the Krusty Krab felt quieter without her.",
      "That the science had gone out of the ocean temporarily.",
      "That he was proud to know someone who was so smart and so brave.",
      "He wrote those things exactly.",
      "Then he added a drawing of a starfish and sealed the envelope.",
      "Three weeks later, a letter arrived back with a drawing of an armadillo.",
      "He put both letters in a box he kept under his pineapple house."
    ],
    questions: [
      { question: "Why did SpongeBob cross out three beginnings?", options: ["He made mistakes", "None of them said what he really wanted to say", "He ran out of ink"], correct: 1, type: "inferential" },
      { question: "What three things did SpongeBob say in his letter?", options: ["He missed her, he liked her science, and he was proud of her", "He wanted her to come back, he was hungry, he missed the sun"], correct: 0, type: "literal" },
      { question: "Why did SpongeBob keep both letters in a box?", options: ["He forgot to mail them", "They were precious to him", "Sandy asked him to"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_044', title: "Stitch and the Argument", level: 'H',
    setting: "Stitch's house", illustration: '💬',
    text: [
      "Stitch and Lilo had a real argument one Tuesday morning.",
      "It started over something small — whose turn it was to walk the dog.",
      "But it grew until they were both saying things they didn't quite mean.",
      "Stitch went to his room and lay flat on the floor, staring at the ceiling.",
      "He replayed the argument in his mind and noticed where it had started to go wrong.",
      "After an hour, he knocked on Lilo's door.",
      "'I said some things that weren't fair,' he said.",
      "Lilo opened the door. 'Me too.'",
      "They sat on the porch with lemonade and worked it out.",
      "It was harder than any puzzle Stitch had ever solved.",
      "But the friendship that came out the other side felt stronger."
    ],
    questions: [
      { question: "What did the argument start over?", options: ["A toy", "Whose turn to walk the dog", "A sandwich"], correct: 1, type: "literal" },
      { question: "What did Stitch do after going to his room?", options: ["He fell asleep", "He replayed the argument in his mind", "He called SpongeBob"], correct: 1, type: "literal" },
      { question: "What does 'the friendship that came out the other side felt stronger' mean?", options: ["They had new friends", "Working through hard things can make a friendship better", "The argument never happened"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_045', title: "Luna Paints the Sky", level: 'H',
    setting: 'meadow', illustration: '🎨',
    text: [
      "They say that every morning Luna races across the sky just before dawn.",
      "As her hooves strike the air, sparks fly off — pink, gold, and soft orange.",
      "Those sparks spread out and fade slowly into the blue as the sun climbs.",
      "That's what a sunrise is, if you believe the valley's oldest story.",
      "Luna has never confirmed or denied this.",
      "But on very clear mornings, if you are patient enough to watch from a hilltop,",
      "you might see, for just one second, a white shape crossing the horizon.",
      "Gone before you can be sure.",
      "The sky flushed brilliant gold behind it.",
      "Draw your own conclusions."
    ],
    questions: [
      { question: "According to the story, what happens when Luna's hooves strike the air?", options: ["It rains", "Sparks of color fly off", "Thunder sounds"], correct: 1, type: "literal" },
      { question: "Why does the story say 'draw your own conclusions'?", options: ["You need to paint a picture", "The story leaves whether it's true up to the reader", "Luna told you to draw"], correct: 1, type: "inferential" },
      { question: "What is this story really describing?", options: ["Luna painting", "A sunrise", "A race"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_046', title: "The Deepest Part of the Ocean", level: 'H',
    setting: 'underwater', illustration: '🌊',
    text: [
      "SpongeBob had always wondered what lived at the very bottom of the deepest trench.",
      "With a waterproof flashlight and his best determination, he began to descend.",
      "The light faded. The pressure grew.",
      "Strange fish drifted by — their own bodies glowing blue-green.",
      "The water temperature dropped to just above freezing.",
      "SpongeBob pressed on, keeping his flashlight steady.",
      "At the very bottom, in the absolute dark, he found something extraordinary.",
      "A single flower, growing from the rock. Bright yellow. Perfectly alive.",
      "He sat beside it for a long time.",
      "He did not pick it. Some things are right where they belong."
    ],
    questions: [
      { question: "What did SpongeBob take with him?", options: ["A map", "A waterproof flashlight", "Sandy"], correct: 1, type: "literal" },
      { question: "What did SpongeBob find at the very bottom?", options: ["A treasure chest", "A glowing fish", "A single yellow flower"], correct: 2, type: "literal" },
      { question: "Why didn't SpongeBob pick the flower?", options: ["It was too small", "He thought it belonged exactly where it was", "He forgot"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_047', title: "Stitch Teaches What He Knows", level: 'H',
    setting: 'beach', illustration: '👨‍🏫',
    text: [
      "A younger alien named Zippy had just arrived on Earth and was very confused.",
      "Everything frightened Zippy — the waves, the sand, the crowds of humans.",
      "Stitch remembered exactly how that felt.",
      "He took Zippy to the quiet end of the beach, away from the crowds.",
      "He showed him how the tide came in and went out on a schedule.",
      "He showed him which shells were safe to pick up.",
      "He showed him that humans mostly just wanted to play in the water.",
      "With each small thing Stitch explained, Zippy relaxed a little more.",
      "By sunset they were both eating shave ice on the pier.",
      "Stitch thought that the best way to use what you've learned is to hand it forward."
    ],
    questions: [
      { question: "Why was Zippy frightened of everything?", options: ["He was sick", "He had just arrived on Earth and it was all new", "Stitch scared him"], correct: 1, type: "literal" },
      { question: "How did Stitch know how to help Zippy?", options: ["He read about it", "He remembered exactly how Zippy felt when he arrived", "Luna told him"], correct: 1, type: "literal" },
      { question: "What does Stitch mean by 'handing it forward'?", options: ["Passing a baton", "Teaching others what you have learned", "Moving to a new place"], correct: 1, type: "inferential" },
    ]
  },

  // ── Level I (7 stories) ────────────────────────────────────────────────
  {
    id: 'story_048', title: "The Map That Was Wrong", level: 'I',
    setting: 'beach', illustration: '🗺️',
    text: [
      "According to the map, the waterfall was supposed to be behind the third mountain.",
      "Stitch, Luna, and SpongeBob had been walking for four hours before they admitted it.",
      "The third mountain had no waterfall. Just rocks and persistent goats.",
      "'The map is wrong,' SpongeBob said finally, sitting down on a boulder.",
      "Stitch looked around. The path they'd taken had led through extraordinary countryside.",
      "A field of silver grass. A valley full of wild horses. A river so clear you could read through it.",
      "'I don't think the map was useless,' Stitch said.",
      "'We just didn't find what we were looking for. We found other things instead.'",
      "Luna was already walking again, toward a ridge that wasn't on any map.",
      "She called back, 'Come on. Let's find out what else it got wrong.'"
    ],
    questions: [
      { question: "What were they trying to find?", options: ["A cave", "A waterfall", "A village"], correct: 1, type: "literal" },
      { question: "What unusual things did they see on the walk?", options: ["A desert and cacti", "Silver grass, wild horses, and a clear river", "A beach and ocean"], correct: 1, type: "literal" },
      { question: "What does Luna's last line suggest about her attitude toward the trip?", options: ["She is frustrated", "She sees the wrong turns as more adventures", "She wants to go home"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_049', title: "The Night SpongeBob Got Lost", level: 'I',
    setting: 'underwater', illustration: '🔦',
    text: [
      "The current was stronger than SpongeBob had expected.",
      "He had turned left at the kelp forest — or had it been right? — and now nothing looked familiar.",
      "The water around him was a deep, quiet dark.",
      "He thought carefully. Panic would not help.",
      "He remembered what Sandy had told him: in the ocean, look for the current and work with it, not against it.",
      "He relaxed and let the current carry him, watching for landmarks.",
      "After twenty minutes he saw the faint glow of Bikini Bottom's lights below him.",
      "He angled himself downward and swam toward them.",
      "He came out next to Patrick's rock, breathing hard but relieved.",
      "Patrick was sitting on top of the rock eating a starfish sandwich, entirely unaware anything had happened."
    ],
    questions: [
      { question: "What had confused SpongeBob about his direction?", options: ["It was foggy", "He couldn't remember if he turned left or right at the kelp forest", "His flashlight broke"], correct: 1, type: "literal" },
      { question: "What advice from Sandy helped SpongeBob?", options: ["Swim as fast as you can", "Work with the current, not against it", "Call for help immediately"], correct: 1, type: "literal" },
      { question: "Why does the story end with Patrick eating a sandwich?", options: ["To show Patrick is hungry", "To show how normal and calm everything is after SpongeBob's big adventure", "Patrick found SpongeBob's sandwich"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_050', title: "Luna and the Glass Mountain", level: 'I',
    setting: 'meadow', illustration: '🏔️',
    text: [
      "The Glass Mountain was perfectly smooth on all sides.",
      "Everyone said it was impossible to climb.",
      "Luna decided to try anyway, not because she needed to reach the top, but because the puzzle interested her.",
      "Her hooves found no grip on the smooth surface.",
      "She tried three different approaches over three separate days.",
      "On the fourth day she noticed something: where the mountain met the earth, a line of tiny quartz crystals caught the morning light.",
      "She stepped on them carefully. They held.",
      "She worked her way up the crystal seam, step by careful step.",
      "It took the whole morning.",
      "At the top, there was nothing remarkable — just the view.",
      "But what a view.",
      "She could see all the way to the horizon in every direction.",
      "She stayed until she had looked as far as she could see."
    ],
    questions: [
      { question: "Why did Luna decide to climb the mountain?", options: ["To prove others wrong", "She needed to get to the other side", "The puzzle interested her"], correct: 2, type: "literal" },
      { question: "What did Luna discover on the fourth day?", options: ["A path", "A line of quartz crystals she could step on", "A door in the mountain"], correct: 1, type: "literal" },
      { question: "What is the value of persistence that this story shows?", options: ["Give up after three tries", "The answer often comes when you keep looking and thinking", "Climbing is always worth it"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_051', title: "Stitch and the Photograph", level: 'I',
    setting: "Stitch's house", illustration: '📸',
    text: [
      "Cleaning out a drawer, Stitch found an old photograph he didn't remember taking.",
      "In it, he was maybe two years younger, and so was Lilo.",
      "They were standing in front of the shave ice stand on Kalakaua Avenue.",
      "Both of them were laughing at something outside the frame.",
      "Stitch stared at the photo for a long time.",
      "He tried to remember what had been so funny.",
      "He couldn't.",
      "But whatever it had been, the laughter in their faces was real — total and unguarded.",
      "He looked at that version of himself: smaller, wilder, less certain of everything.",
      "Then he walked into the kitchen where Lilo was making toast.",
      "'What are you doing?' she asked.",
      "'Looking at you,' Stitch said.",
      "Lilo looked up and smiled, which was exactly the expression in the photograph."
    ],
    questions: [
      { question: "Where was the old photo taken?", options: ["The beach", "The shave ice stand on Kalakaua Avenue", "The library"], correct: 1, type: "literal" },
      { question: "What is Stitch trying to remember?", options: ["Lilo's name", "What had been so funny in the photo", "Where the shave ice stand was"], correct: 1, type: "literal" },
      { question: "Why does the story end with Lilo smiling the same expression as in the photo?", options: ["They are very similar", "Some things stay the same even as time passes", "Stitch took another picture"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_052', title: "The Deep Blue Reading", level: 'I',
    setting: 'underwater', illustration: '📖',
    text: [
      "SpongeBob had read every book in the Bikini Bottom Public Library.",
      "Every single one. Even the boring ones about coral taxonomy.",
      "He had started keeping a list of favorites, organized by how they made him feel.",
      "Sandy had given him a new one for his birthday: a thick novel about an explorer who mapped unknown islands.",
      "He read it in three sittings.",
      "When he finished, he set it carefully down and sat very still.",
      "There is a particular kind of quiet that comes after a great book.",
      "As if the story is still settling somewhere inside you.",
      "SpongeBob sat in that quiet for a full ten minutes.",
      "Then he added the book to the top of his favorites list,",
      "under the heading: 'Books That Changed My Idea of What's Possible.'"
    ],
    questions: [
      { question: "Who gave SpongeBob the new book?", options: ["Patrick", "Stitch", "Sandy"], correct: 2, type: "literal" },
      { question: "What was the book about?", options: ["A fish who could fly", "An explorer who mapped unknown islands", "A cooking competition"], correct: 1, type: "literal" },
      { question: "What does the heading 'Books That Changed My Idea of What's Possible' tell us about SpongeBob?", options: ["He is just making a list", "He believes reading can expand how you see the world", "He doesn't like the book"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_053', title: "Luna Before the Thunder", level: 'I',
    setting: 'meadow', illustration: '⚡',
    text: [
      "Luna had always been afraid of thunder.",
      "Not afraid exactly — but deeply unsettled, in a way she found embarrassing given how large and capable she was.",
      "This summer she decided to study it instead of just enduring it.",
      "She learned that thunder was the sound of lightning superheating the air.",
      "That the time between the flash and the sound measured the distance.",
      "That the longest part of a storm was usually the waiting before it.",
      "On the next stormy night she stood in the field and counted.",
      "Flash. One, two, three, four, five.",
      "Thunder.",
      "One mile away. Only one mile.",
      "She kept counting, and the miles grew, and the storm moved away.",
      "By the end of the night the fear had not vanished entirely, but it had become something she could work with."
    ],
    questions: [
      { question: "How did Luna decide to handle her fear of thunder?", options: ["She hid from it", "She studied it", "She asked for help"], correct: 1, type: "literal" },
      { question: "What does each second between flash and thunder tell you?", options: ["How loud the storm is", "How far away the lightning is", "How long the storm will last"], correct: 1, type: "literal" },
      { question: "What is the story saying about fear in its final line?", options: ["Fear always goes away", "Understanding something doesn't always remove fear but can make it manageable", "Luna is still scared"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_054', title: "Stitch Builds Something New", level: 'I',
    setting: "Stitch's house", illustration: '🔧',
    text: [
      "Stitch had been inventing things since before he came to Earth.",
      "But his inventions back then had mostly been designed to break things.",
      "One afternoon he sat in the garage, surrounded by engine parts, considering what to make.",
      "He thought about what was actually needed in his neighborhood.",
      "Mrs. Kahale's mailbox was always getting knocked over in the wind.",
      "Mr. Pua's mango tree had branches too high to reach.",
      "He built Mrs. Kahale a weighted mailbox post that couldn't tip.",
      "He built Mr. Pua a clever telescoping pole with a fruit catcher at the end.",
      "Neither invention was dramatic or impressive.",
      "But both were used every single day.",
      "Stitch thought that was better, somehow, than impressive."
    ],
    questions: [
      { question: "What were Stitch's old inventions designed to do?", options: ["Help people", "Break things", "Travel through space"], correct: 1, type: "literal" },
      { question: "What did Stitch make for Mr. Pua?", options: ["A weighted mailbox post", "A telescoping pole with a fruit catcher", "A ladder"], correct: 1, type: "literal" },
      { question: "What does 'used every single day' being better than 'impressive' mean?", options: ["Simple useful things matter more than showy ones", "Stitch is lazy", "The inventions were boring"], correct: 0, type: "inferential" },
    ]
  },

  // ── Level J/K (6 stories) ──────────────────────────────────────────────
  {
    id: 'story_055', title: "The Year in Letters", level: 'J',
    setting: "Stitch's house", illustration: '📬',
    text: [
      "At the end of every year, Stitch wrote the same letter to himself.",
      "He had started the tradition the year he arrived on Earth, when everything was confusing and nothing made sense yet.",
      "The letter was always addressed: To Stitch, One Year From Now.",
      "He wrote about what he had learned, what he had gotten wrong, and what he planned to do differently.",
      "He folded each letter and put it in a tin box in the closet.",
      "On the first of every January, he opened the box and read the previous year's letter.",
      "Some years it made him laugh. Some years it made him quiet.",
      "This year's letter — the one he was writing now — was the longest one yet.",
      "At the top, he wrote: 'By the time you read this, you'll know which of these things you actually did.'",
      "He liked that it was honest.",
      "He liked that future-Stitch would hold present-Stitch accountable.",
      "He sealed the envelope and wrote his name on the front.",
      "Then he put the kettle on and sat down to finish the evening."
    ],
    questions: [
      { question: "When did Stitch start writing letters to himself?", options: ["When he was born", "When he first arrived on Earth", "When he met Lilo"], correct: 1, type: "literal" },
      { question: "What three things did Stitch write about in his letter?", options: ["Dreams, wishes, and hopes", "What he learned, what he got wrong, and plans for next year", "His favorite foods, friends, and trips"], correct: 1, type: "literal" },
      { question: "What does the idea of 'future-Stitch holding present-Stitch accountable' mean?", options: ["Stitch has two personalities", "Stitch uses his own past words to check if he kept his promises to himself", "He is writing a punishment"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_056', title: "What SpongeBob Left Behind", level: 'J',
    setting: 'underwater', illustration: '🌱',
    text: [
      "SpongeBob was a creature of habit, which is to say he left traces everywhere.",
      "A particular booth at the Krusty Krab always had the faintest smell of happiness.",
      "The path between his house and Sandy's dome had been walked so often it had its own groove in the seafloor.",
      "He taught Gary four new tricks and never realized he had done it.",
      "He named every coral on his morning swim route, though he never wrote the names down.",
      "He helped twelve different sea creatures find their way through the kelp forest, and remembered none of them.",
      "He changed small things by simply being consistently, reliably himself.",
      "Sandy once said that SpongeBob was 'like water — you only notice the effect, not the passing.'",
      "SpongeBob had no idea what she meant.",
      "He was just happy to be somewhere at all."
    ],
    questions: [
      { question: "What did SpongeBob name, though he never wrote the names down?", options: ["The sea creatures he helped", "Every coral on his morning swim route", "His friends at school"], correct: 1, type: "literal" },
      { question: "What does Sandy mean by 'like water — you only notice the effect, not the passing'?", options: ["SpongeBob is wet", "You feel SpongeBob's influence without always noticing he's the reason", "Sandy doesn't like SpongeBob"], correct: 1, type: "inferential" },
      { question: "What kind of character is SpongeBob, based on this story?", options: ["A big show-off who wants credit", "A person who has quiet, unseen impact on others", "Someone who doesn't care about anything"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_057', title: "The Oldest Tree on the Island", level: 'J',
    setting: 'beach', illustration: '🌳',
    text: [
      "There was a tree on the north end of the island that was older than any living person could remember.",
      "Its trunk was wider than four people standing with arms spread.",
      "Its roots reached the shore and curled into the sand like old hands.",
      "Generations of children had carved initials into its bark — not to damage it, but as a way of saying: I was here.",
      "Stitch found it on a long walk and put his paw on the bark.",
      "He could feel how solid it was — how little it moved even in the ocean wind.",
      "He read some of the initials. Dates going back a hundred years.",
      "All those people, all gone now, but their moment preserved here.",
      "'It's a kind of memory,' he said to Luna, who had come to stand beside him.",
      "'Of course,' Luna said. 'That's what trees are for.'"
    ],
    questions: [
      { question: "Why did generations of children carve initials into the tree?", options: ["To practice writing", "As a way of saying 'I was here'", "They were bored"], correct: 1, type: "literal" },
      { question: "What did Stitch mean when he called the tree 'a kind of memory'?", options: ["The tree was old", "The tree held traces of all the people who had been there", "He was studying trees"], correct: 1, type: "inferential" },
      { question: "What does Luna's final line 'That's what trees are for' suggest?", options: ["Trees are useful for wood", "The natural world holds human history and feeling", "Luna planted the tree"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_058', title: "Luna at the Edge of the Map", level: 'K',
    setting: 'meadow', illustration: '🧭',
    text: [
      "Every map has an edge — a place where the known world runs out and the cartographer has simply written: unknown.",
      "Luna had always been drawn to those edges.",
      "She had crossed the third ridge, then the valley beyond it, then the forest that supposedly had no other side.",
      "It had an other side.",
      "Beyond it: a plateau she had no name for.",
      "The air was different here — thinner, sharper, smelling of ice even in summer.",
      "The grass was a variety she had never seen, close-cropped and pale blue-grey.",
      "There were no tracks of any animal.",
      "She was, as far as she could tell, the first creature to walk here.",
      "She stood very still.",
      "Not because she was afraid.",
      "Because she wanted to feel it properly: the particular weight of being somewhere new.",
      "The responsibility of noticing.",
      "She took one step forward.",
      "Then another.",
      "She had all the time in the world."
    ],
    questions: [
      { question: "What does a cartographer write at the edge of a map?", options: ["The end", "Unknown", "Do not enter"], correct: 1, type: "literal" },
      { question: "What three obstacles had Luna already crossed before reaching the plateau?", options: ["A lake, a desert, and a mountain", "The third ridge, the valley, and the forest", "A river, a cliff, and a cave"], correct: 1, type: "literal" },
      { question: "What does 'the responsibility of noticing' mean in this story?", options: ["She had to write a report", "Being first somewhere means it matters that you pay real attention", "She was looking for something lost"], correct: 1, type: "inferential" },
    ]
  },
  {
    id: 'story_059', title: "Stitch on the Last Day", level: 'K',
    setting: 'beach', illustration: '🌅',
    text: [
      "Every summer had a last day.",
      "Stitch always knew when it was coming — not by the calendar but by the way things felt.",
      "The shadows got longer in the afternoon.",
      "The water cooled just enough to remind you of something.",
      "Lilo would start stacking school supplies on the kitchen table.",
      "On the actual last day, Stitch would go to the beach alone in the early morning.",
      "He would sit at the edge of the water and think about the summer.",
      "He ran through it the way you flip through a book — not reading everything, just letting the pages move.",
      "The things that had been good. The things that could have been better.",
      "What he would carry into the next part.",
      "This summer he thought: we read more books. We had more arguments, but better ones. We got better at things.",
      "He looked at the ocean.",
      "The ocean looked back.",
      "He stood up, shook the sand off his paws, and walked home.",
      "The next thing was already waiting."
    ],
    questions: [
      { question: "How did Stitch know summer was ending — not by the calendar but by what?", options: ["By what Lilo said", "By the way things felt — the shadows, the water, Lilo's school supplies", "By the news"], correct: 1, type: "literal" },
      { question: "What does it mean to flip through a summer 'the way you flip through a book'?", options: ["Stitch was reading a book about summer", "He was quickly scanning his memories without analyzing every one", "He was writing a story"], correct: 1, type: "inferential" },
      { question: "What three things did Stitch note about this summer?", options: ["More swimming, more eating, more sleeping", "More books, better arguments, and getting better at things", "More adventures, new friends, and more sun"], correct: 1, type: "literal" },
    ]
  },
  {
    id: 'story_060', title: "The Thing About Ohana", level: 'K',
    setting: 'beach', illustration: '❤️',
    text: [
      "Stitch had heard the word his whole life, but it had taken him years to understand it.",
      "Ohana didn't mean the people you were born to.",
      "It meant the people you showed up for.",
      "It meant the ones you called when things went wrong.",
      "The ones whose names you knew the sound of in the dark.",
      "He had tested this understanding against his own life and it held.",
      "Luna, who was not his species, not his kind, not even from his world.",
      "SpongeBob, who was nothing like him in any measurable way.",
      "Lilo, who had found him when he was lost and kept him when nobody else would.",
      "Ohana wasn't a thing you discovered. It was a thing you built.",
      "You built it by showing up, by being honest, by staying.",
      "Stitch sat on the warm sand and looked out at the water.",
      "He had started with nothing.",
      "He had built something.",
      "He thought: that was enough. That was everything."
    ],
    questions: [
      { question: "According to this story, what does Ohana mean?", options: ["The people you were born to", "The people you show up for", "The island you live on"], correct: 1, type: "literal" },
      { question: "How does Stitch build Ohana, according to the story?", options: ["By sharing food", "By showing up, being honest, and staying", "By being the best at everything"], correct: 1, type: "literal" },
      { question: "What does 'He had started with nothing. He had built something.' mean in the context of this whole story?", options: ["He built a house", "He came to Earth alone and created a family through love and loyalty", "He learned to cook"], correct: 1, type: "inferential" },
    ]
  },
]

export const getStoriesByLevel = (level) => STORIES.filter(s => s.level === level)
export const getStoryById = (id) => STORIES.find(s => s.id === id)
export const getAllLevels = () => ['C','D','E','F','G','H','I','J','K']
