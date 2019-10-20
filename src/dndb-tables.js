export const CLASSES = [
    "Battlebro",
    "Bowslinger",
    "Hippy",
    "Knight of Tushuze",
    "Minstrel",
    "Mixologist",
    "Ne'erdowell",
    "Ragesmasher",
    "Runegoon",
    "Verbpriest",
    "Wizcaster",
    "Zoomaster"
];

export const CLASS_SKILLS = {
    "Battlebro": ["Brute Force", "Rad Moves"],
    "Bowslinger": ["Creepin'", "Spottin'"],
    "Hippy": ["Cardio", "Man vs. Wild"],
    "Knight of Tushuze": ["Believe in Yourself", "Brute Force"],
    "Minstrel": ["Believe in Yourself", "Creepin'"],
    "Mixologist": ["Macgyver", "Thinkiness"],
    "Ne'erdowell": ["Creepin'", "Macgyver"],
    "Ragesmasher": ["Brute Force", "Man vs. Wild"],
    "Runegoon": ["Cardio", "Macgyver"],
    "Verbpriest": ["Believe in Yourself", "Rad Moves"],
    "Wizcaster": ["Spottin'", "Thinkiness"],
    "Zoomaster": ["Man vs. Wild", "Rad Moves"]
};

export const CLASS_COLORS = {
    "Battlebro": "darkorange",
    "Bowslinger": "darkolivegreen",
    "Hippy": "forestgreen",
    "Knight of Tushuze": "gold",
    "Minstrel": "royalblue",
    "Mixologist": "lightcoral",
    "Ne'erdowell": "slategray",
    "Ragesmasher": "darkred",
    "Runegoon": "cadetblue",
    "Verbpriest": "darkgoldenrod",
    "Wizcaster": "darkmagenta",
    "Zoomaster": "darkgreen"
}

export const ALTRACES = [
    //Make dynamic
    "Animal-person",
    //
    "Dwarf",
    "Edgy demon",
    "Elf (christmas)",
    "Elf (pretty)",
    "Facechanger",
    "Golem",
    "Merman",
    "Ogre",
    "Ork",
    "Thiefling",
    "Zombie"
];

export const SKILLS = [
    "Believe in Yourself",
    "Brute Force",
    "Cardio",
    "Creepin'",
    "Macgyver",
    "Man vs. Wild",
    "Rad Moves",
    "Spottin'",
    "Thinkiness"
];

export const ELEMENTS = [
    "Acid",
    "Bee",
    "Bone",
    "Chaos",
    "Crystal",
    "Darkness",
    "Earth",
    "Fear",
    "Flame",
    "Force",
    "Glass",
    "Gold",
    "Goop",
    "Ice",
    "Laser",
    "Life",
    "Light",
    "Lightning",
    "Madness",
    "Magma",
    "Meme",
    "Metal",
    "Mind",
    "Plant",
    "Poison",
    "Rat",
    "Sleep",
    "Smoke",
    "Sound",
    "Sparkle",
    "Stasis",
    "Stink",
    "Time",
    "Water",
    "Weather",
    "Wind"
];

export const ELEMENTS_OF = [
    "Acid",
    "Bees",
    "Bones",
    "Chaos",
    "Crystal",
    "Darkness",
    "Earth",
    "Fear",
    "Flame",
    "Force",
    "Glass",
    "Gold",
    "Goop",
    "Ice",
    "Laser",
    "Life",
    "Light",
    "Lightning",
    "Madness",
    "Magma",
    "Memes",
    "Metal",
    "Mind",
    "Plants",
    "Poison",
    "Rats",
    "Sleep",
    "Smoke",
    "Sound",
    "Sparkles",
    "Stasis",
    "Stink",
    "Time",
    "Water",
    "Weather",
    "Wind"
];

export const VERBS = [
    "Absorb",
    "Blast",
    "Blind",
    "Charm",
    "Conceal",
    "Control",
    "Crush",
    "Curse",
    "Deceive",
    "Destroy",
    "Duplicate",
    "Enlarge",
    "Ensnare",
    "Explode",
    "Hasten",
    "Heal",
    "Hinder",
    "Immobilize",
    "Levitate",
    "Nullify",
    "Pierce",
    "Protect",
    "Regenerate",
    "Repel",
    "Restore",
    "Reveal",
    "See",
    "Shrink",
    "Silence",
    "Summon",
    "Teleport",
    "Terrify",
    "Transform",
    "Understand",
    "Warp",
    "Wither"
];

export const GERUNDS = [
    "Absorbing",
    "Blasting",
    "Blinding",
    "Charming",
    "Concealing",
    "Controling",
    "Crushing",
    "Cursing",
    "Deceiving",
    "Destroying",
    "Duplicating",
    "Enlarging",
    "Ensnaring",
    "Exploding",
    "Hastening",
    "Healing",
    "Hindering",
    "Immobilizing",
    "Levitating",
    "Nullifying",
    "Piercing",
    "Protecting",
    "Regenerating",
    "Repeling",
    "Restoring",
    "Revealing",
    "Seeing",
    "Shrinking",
    "Silencing",
    "Summoning",
    "Teleporting",
    "Terrifying",
    "Transforming",
    "Understanding",
    "Warping",
    "Withering"
];

//index 0-17 == Melee
//index 18-35 == Ranged
export const WEAPONS = [
    "Battleaxe",
    "Beatstick",
    "Broadsword",
    "Claymore",
    "Dagger",
    "Flail",
    "Gauntlets",
    "Hatchet",
    "Knife",
    "Mace",
    "Polearm",
    "Rapier",
    "Scimitar",
    "Scythe",
    "Short sword",
    "Spear",
    "Staff",
    "Whip",
    "Arbalest",
    "Blunderbuss",
    "Bolas",
    "Boomerang",
    "Chakram",
    "Composite bow",
    "Crossbow",
    "Heavy rock",
    "Hunting bow",
    "Javelins",
    "Longbow",
    "Musket",
    "Pistol",
    "Recurve bow",
    "Shuriken",
    "Sling",
    "Throwing axes",
    "Throwing knives"
]

export function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}