//generalyStats
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let currentArmor = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let wardrobe = ["torn robe"]
//
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");

const eqStats = document.querySelector("#eqStats");
const weaponName = document.querySelector("#weaponName");
const power = document.querySelector("#power");
const inventoryText = document.querySelector("#inventory");
const armorName = document.querySelector("#armorName");
const armor = document.querySelector("#armor");
const wardrobeText = document.querySelector("#wardrobe");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//objects
const weapons = [
  { name: 'stick', power: 5, prize: 30},
  { name: 'dagger', power: 30, prize: 36},
  { name: 'claw hammer', power: 50, prize: 45},
  { name: 'sword', power: 100, prize: 60}
];

const armors = [
  {name: 'torn robe', armor: 0, prize: 20},
  {name: 'leather armor', armor: 25, prize: 28},
  {name: 'knight armor', armor: 50, prize: 36},
  {name: 'enchanted robe', armor: 75, prize: 45},
  {name: 'god armor', armor: 100, prize: 60},
]

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy armor", "Buy weapon", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  },
  {
    name: 'equipment',
    "button text": ["Go to store", "Go to cave", "Go to town square?"],
    "button functions": [goStore, goCave, goTown],
    text: 'This is your equipment'
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = showEQ;

//movement functions
function update(location) {
  monsterStats.style.display = "none";
  eqStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function showEQ() {
  update(locations[8]);
  button4.style.display = "none";
  weaponName.innerText = weapons[currentWeapon].name;
  power.innerText = weapons[currentWeapon].power;
  inventoryText.innerText = inventory;
  armorName.innerText = armors[currentArmor].name;
  armor.innerText = armors[currentArmor].armor;
  wardrobeText.innerText = wardrobe;
  eqStats.style.display = "flex";
}

function goTown() {
  update(locations[0]);
  button4.style.display = "inline-block";
  button4.onclick = showEQ;
  button4.innerText = "Equipment B)";
}

function goStore() {
  update(locations[1]);
  button4.style.display = "nline-block";
  button4.innerText = "Heal yourself (20 gold)";
  button4.onclick = heal;
  button2.innerText = "Buy weapon (" + weapons[currentWeapon + 1].prize + " gold)";
  button1.innerText = "Buy armor (" + armors[currentArmor + 1].prize + " gold)";
}

function goCave() {
  update(locations[2]);
  button4.style.display = "none";
}

//store functions
function heal() {
  if(gold > 20) {
    gold -= 20;
    goldText.innerText = gold;
    health = 100 + armors[currentArmor].armor;
    healthText.innerText = health;
    text.innerText = "You have been healed";
  } else {
    text.innerText = "You don't have enaught money!"
  }
}

function buyHealth() {
  if (currentArmor < armors.length - 1) {
    if (gold >= armors[currentArmor + 1].prize) {
      gold -= armors[currentArmor + 1].prize;
      currentArmor++;
      health += armors[currentArmor].armor;
      healthText.innerText = health;
      goldText.innerText = gold;
      let newArmor = armors[currentArmor].name;
      text.innerText = "You now have a " + newArmor + ".\n";
      wardrobe.push(newArmor);
      text.innerText += " In your wardrobe you have: " + wardrobe + "\n";
      text.innerText += "You get +" + armors[currentArmor].armor + "HP";
      button1.innerText = "Buy armor (" + armors[currentArmor + 1].prize + " gold)";
    } else {
      text.innerText = "You do not have enough gold to buy a armor.";
    }
  } else {
    text.innerText = "You already have the most powerful armor!";
    button2.innerText = "Sell armor for 15 gold";
    button2.onclick = sellArmor;
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= weapons[currentWeapon + 1].prize) {
      gold -= weapons[currentWeapon + 1].prize;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
      button2.innerText = "Buy weapon (" + weapons[currentWeapon + 1].prize + " gold)";
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellArmor() {
  if (wardrobe.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentArmor = wardrobe.shift();
    text.innerText = "You sold a " + currentArmor + ".";
    text.innerText += " In your wardrobe you have: " + wardrobe;
  } else {
    text.innerText = "Don't sell your only armor!";
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

//select monster and go fight
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  button4.style.display = "none";
}

//battle logic
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

//fight contest
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

//easterEgg
function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}