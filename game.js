let spaceship;
let spaceship_animations, missile_animation;
let goodMissiles, badMissiles;
let playerIsAlive;

let controls = {
  xAxis: 0,
  yAxis: 0
}

const SCALE = 2;
const SPEED = 70;
const BRAKING = 3;
const ASSETS_STYLE = "color";

function preload() {
  // specify width and height of each frame and number of frames
  loadJSON("./assets/spritemap.json", animations => {
    
    spaceship_animations = {
      idle: loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.spaceship.idle)),
      die:  loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.spaceship.die))
    };

    bad_missile_animation = loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.missile.bad));
    good_missile_animation = loadAnimation(loadSpriteSheet(`./assets/spritesheet_${ASSETS_STYLE}.png`, animations.missile.good));

    spaceship_animations.die.looping = false;
  });
  
}

function setup() {
  createCanvas(800, 600);
  
  spaceship = createSprite(width/2, height - (8 * SCALE + 10) , 16, 16);
  spaceship.setCollider("circle", 0, 0, 8)
  spaceship.addAnimation("idle", spaceship_animations.idle);
  spaceship.addAnimation("die", spaceship_animations.die);
  spaceship.limitSpeed(SPEED);
  spaceship.scale = SCALE;
  spaceship.friction = 0.1;
  badMissiles = new Group();
  goodMissiles = new Group();
  noSmooth();
  frameRate(30);
  playerIsAlive = true
}

function draw() {
  // clear();
  background(0, 0, 0, 180);
  
  handleControls();
  spaceshipMovement();

  if (Math.random() > 0.95) {
    new Missile({x: Math.random() * width, y: 0}, 180, true);
  }

  drawSprites();
}

function spaceshipMovement() {
  if (playerIsAlive) {
    spaceship.addSpeed(controls.xAxis * 2, 0);
    spaceship.rotation = spaceship.velocity.x * 1.2;

    if (controls.space) {
      new Missile(spaceship.position, spaceship.rotation, false);
    }
    
    spaceship.overlap(badMissiles, (me, missile) => {
      spaceship.changeAnimation("die");
      // spaceship.setSpeed(0);
      spaceship.rotation = 0;
      playerIsAlive = false;
    });
  }
  
  if (spaceship.getAnimationLabel() === "die" && spaceship && spaceship.animation.getFrame() === spaceship.animation.getLastFrame()) {
    spaceship.remove();
    setTimeout(() => location.reload(), 1500);
  }
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

class Missile {
  constructor(lanchPosition, direction, fromEnemy, speed = 10) {
    this.fromEnemy = fromEnemy;
    this.missile = createSprite(lanchPosition.x, lanchPosition.y , 16, 16);
    this.missile.setCollider("rectangle", 0, 0, 3, 8);
    this.missile.addAnimation("basic", fromEnemy ? bad_missile_animation : good_missile_animation);
    this.missile.scale = SCALE;
    this.direction = direction;
    this.missile.rotation = this.direction;
    this.missile.addSpeed(speed, this.direction - 90);
    if (fromEnemy) {
      badMissiles.add(this.missile);
    } else {
      goodMissiles.add(this.missile);
    }
  }
}


// class Enemy {
//   constructor(position) {
//     this.enemy = createSprite(lanchPosition.x, lanchPosition.y , 16, 16);
//     this.enemy.setCollider("circle", 0, 0, 8);
//     this.enemy.addAnimation("basic", fromEnemy ? bad_missile_animation : good_missile_animation);
//     this.enemy.scale = SCALE;
//     this.direction = direction;
//     this.enemy.rotation = this.direction;
//     this.enemy.addSpeed(speed, this.direction - 90);
//   }
// }