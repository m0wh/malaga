let spaceship_animations;
let spaceship;
let controls = {
  xAxis: 0,
  yAxis: 0
}

const SCALE = 3;
const MOVING_STYLE = "smooth";
const SPEED = 10;
const BRAKING = 2;

function preload() {
  // specify width and height of each frame and number of frames
  loadJSON("./assets/spritemap.json", animations => {
    spaceship_animations = {
      idle: loadAnimation(loadSpriteSheet("./assets/spritesheet.png", animations.spaceship.idle)),
      die:  loadAnimation(loadSpriteSheet("./assets/spritesheet.png", animations.spaceship.die))
    };

    spaceship_animations.die.looping = false;
  });
  
}

function setup() {
  createCanvas(800, 600);
  
  spaceship = createSprite(width/2, height - (8 * SCALE + 10) , 16, 16);
  spaceship.addAnimation('idle', spaceship_animations.idle);
  spaceship.addAnimation('die', spaceship_animations.die);
  spaceship.scale = SCALE;
  noSmooth();
  frameRate(30);
}

function draw() {
  clear();
  background("#fff");
  
  handleControls();
  spaceshipMovement();  

  drawSprites();
}

function spaceshipMovement() {
  if (MOVING_STYLE === "smooth") {

    
    spaceship.velocity.x += controls.xAxis * SPEED / 5;
    spaceship.velocity.x /= controls.xAxis === 0 ? BRAKING : 1
    
    spaceship.rotation = spaceship.velocity.x / 2;

    
  } else {
    spaceship.position.x += xAxis * SCALE * SPEED;
  }
  
}

function handleControls() {
  controls.xAxis = 0;

  if (keyDown("q")) {
    controls.xAxis -= 1;
  }
  
  if (keyDown("d")) {
    controls.xAxis += 1;
  }

  if (keyWentDown("SPACE")) {
    console.log("piou");
  }
}