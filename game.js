let spaceship,
    spaceship_animations,
    missile_animations,
    goodMissiles,
    badMissiles,
    enemyObjects = [],
    enemies,
    sounds,
    enemySpawnRate,
    enemyFireRate,
    enemySpeed,
    gameManager;

let controls = {
  xAxis: 0,
  yAxis: 0
}

let font;

const SCALE = 2;
const SPEED = 70;
const BRAKING = 3;
const ASSETS_STYLE = "test3";
const MAX_ENEMIES = 100;
const DIFFICULTY = {
  spawnRate: {
    start: 1,  // number of enemies per second
    speed: 0.01 // increment when an enemy dies
  },
  speed: {
    start: 0.1, // enemy speed
    speed: 0.01 // increment when an enemy dies
  },
  fireRate: {
    start: 0.2, // number of missiles per second per enemy
    speed: 0.01 // increment when an enemy dies
  }
}

function preload() {
  font = loadFont('assets/fonts/MaisonNeue-Bold.ttf');
  loadJSON("./assets/spritemap.json", animations => {
    spaceship_animations = {
      idle: loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.spaceship.idle)),
      die:  loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.spaceship.die))
    };  

    missile_animations = {
      bad: loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.missile.bad)),
      good: loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.missile.good))
    };

    enemy_animations = {
      idle: [
        loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.enemies.bee.idle)),
        loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.enemies.mantis.idle)),
        loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.enemies.butterfly.idle)),
      ],
      die: loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.enemies.die))
    };

    spaceship_animations.die.looping = false;
    enemy_animations.die.looping = false;
  });

  sounds = {
    missile: loadSound("./assets/soundfx/laser_default.wav"),
    spaceship_die: loadSound("./assets/soundfx/fighter_destroyed.wav"),
    enemy_die: loadSound("./assets/soundfx/galaga_destroyed.wav"),
  }
}

function setup() {
  createCanvas(800, 600);

  spaceship = new Spaceship();
  badMissiles = new Group();
  goodMissiles = new Group();
  enemies = new Group();
  gameManager = new GameManager();
  enemySpawnRate = DIFFICULTY.spawnRate.start;
  enemyFireRate = DIFFICULTY.fireRate.start;
  enemySpeed = DIFFICULTY.speed.start;
  noSmooth();
  frameRate(30);
}

function draw() {
  if (ASSETS_STYLE !== "color") {
    background(255, 255, 255, 180);
  } else {
    background(0, 0, 0, 180);
  }

  if (Math.random() * 30 > 30 - enemySpawnRate && enemyObjects.filter(e => e.isAlive).length < MAX_ENEMIES) {
    console.log(enemyObjects.filter(e => e.isAlive).length);
    enemyObjects.push(new Enemy({x: Math.random() * width, y: -50}, enemySpeed, enemyFireRate));
  }
  
  handleControls();
  spaceship.update(controls);
  enemyObjects.forEach(enemy => {
    enemy.update(spaceship);  
  });
  
  drawSprites();
  gameManager.updateHUD();
}

function handleControls() {
  controls.xAxis = 0;
  controls.space = false;

  if (keyDown("q") || keyDown("LEFT")) {
    controls.xAxis -= 1;
  }
  
  if (keyDown("d") || keyDown("RIGHT")) {
    controls.xAxis += 1;
  }

  if (keyWentDown("SPACE")) {
    controls.space = true;
  }
}