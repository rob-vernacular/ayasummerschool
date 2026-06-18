export const REWARDS = {
  outfits: [
    { id: 'surfboard_hat', name: 'Surfboard Hat', emoji: '🏄', unlockCondition: 'level_2', description: 'Reach Beach Explorer level!' },
    { id: 'grass_skirt', name: 'Grass Skirt', emoji: '🌿', unlockCondition: 'level_4', description: 'Reach Ocean Champion level!' },
    { id: 'graduation_cap', name: 'Graduation Cap', emoji: '🎓', unlockCondition: 'level_8', description: 'Reach Grade 2 Ready level!' },
    { id: 'unicorn_horn', name: 'Unicorn Horn', emoji: '🦄', unlockCondition: 'sightwords_25', description: 'Master 25 sight words!' },
    { id: 'spongebob_costume', name: 'SpongeBob Costume', emoji: '🧽', unlockCondition: 'streak_14', description: '14-day streak!' },
  ],
  backgrounds: [
    { id: 'alien_planet', name: 'Alien Planet', emoji: '🪐', unlockCondition: 'level_3', description: 'Reach Island Adventurer!' },
    { id: 'underwater_world', name: 'Underwater World', emoji: '🌊', unlockCondition: 'reading_10', description: 'Read 10 stories!' },
    { id: 'unicorn_meadow', name: 'Unicorn Meadow', emoji: '🌈', unlockCondition: 'sightwords_50', description: 'Master 50 sight words!' },
    { id: 'rainbow_beach', name: 'Rainbow Beach', emoji: '🏖️', unlockCondition: 'level_5', description: 'Reach Star Reader!' },
    { id: 'space_station', name: 'Space Station', emoji: '🚀', unlockCondition: 'level_7', description: 'Reach Story Master!' },
  ],
  coloringPages: [
    { id: 'luna_coloring', name: 'Luna Coloring Page', emoji: '🦄', unlockCondition: 'sightwords_25', description: 'Master 25 sight words!' },
    { id: 'spongebob_scene', name: 'SpongeBob Scene', emoji: '🧽', unlockCondition: 'first_story', description: 'Read your first story!' },
    { id: 'stitch_adventure', name: 'Stitch Adventure', emoji: '👽', unlockCondition: 'level_3', description: 'Reach Level 3!' },
  ],
  trophies: [
    { id: 'phonics_star', name: 'Phonics Star', emoji: '⭐', unlockCondition: 'phonics_level_3', description: 'Reach Phonics Level 3!' },
    { id: 'sight_word_champ', name: 'Sight Word Champ', emoji: '🏆', unlockCondition: 'sightwords_10', description: 'Master 10 sight words!' },
    { id: 'fluency_reader', name: 'Fluency Reader', emoji: '📖', unlockCondition: 'reading_5', description: 'Read 5 stories!' },
    { id: 'story_writer', name: 'Story Writer', emoji: '✏️', unlockCondition: 'writing_3', description: 'Write 3 stories!' },
    { id: 'math_explorer', name: 'Math Explorer', emoji: '🔢', unlockCondition: 'math_unlock', description: 'Unlock Math!' },
  ],
  special: [
    { id: 'ohana_medal', name: 'Ohana Medal', emoji: '❤️', unlockCondition: 'streak_30', description: '30-day streak! You are family.' },
    { id: 'spongebob_companion', name: 'SpongeBob Companion', emoji: '🧽', unlockCondition: 'streak_14', description: '14-day streak!' },
    { id: 'seven_day_bonus', name: '7-Day Hero', emoji: '🔥', unlockCondition: 'streak_7', description: '7-day streak!' },
  ]
}

export const LEVEL_REWARDS = {
  2: { outfit: 'surfboard_hat', message: "You're a Beach Explorer now!" },
  3: { background: 'alien_planet', coloring: 'stitch_adventure', message: "Island Adventurer unlocked!" },
  4: { outfit: 'grass_skirt', message: "Ocean Champion! Amazing!" },
  5: { background: 'rainbow_beach', message: "Star Reader! You're incredible!" },
  7: { background: 'space_station', message: "Story Master! Stitch is SO proud!" },
  8: { outfit: 'graduation_cap', message: "Grade 2 Ready! You did it!" },
}
