class Spaceship {
  constructor() {
    this.sprite = createSprite(width/2, height - (8 * SCALE + 10) , 16, 16);
    this.sprite.setCollider("circle", 0, 0, 8);
    this.sprite.addAnimation("idle", spaceship_animations.idle);
    this.sprite.addAnimation("die", spaceship_animations.die);
    this.sprite.scale = SCALE;
    this.sprite.friction = 0.1;
    this.isAlive = true;
  }
  
  launchMissile() {
    new Missile(this.sprite.position, this.sprite.rotation, false);
  }
  
  update(controls) {
    this.sprite.limitSpeed(SPEED + enemySpeed);
    if (this.isAlive) {
      this.sprite.addSpeed(controls.xAxis * 2, 0);
      this.sprite.rotation = this.sprite.velocity.x * 1.2;
      
      if (20 + controls.xAxis * 2 >= this.sprite.position.x) {
        this.sprite.position.x = 20 + controls.xAxis * 2;
      } else if (this.sprite.position.x >= width - 20 + controls.xAxis * 2) {
        this.sprite.position.x = width - 20 + controls.xAxis * 2;
      }
      
      
      if (controls.space) { this.launchMissile() }
      
      this.sprite.overlap(badMissiles, (me, missile) => {
        this.sprite.changeAnimation("die");
        this.sprite.rotation = 0;
        this.isAlive = false;
        sounds.spaceship_die.play();
      });
    }
    
    if (!this.sprite.removed && this.sprite.getAnimationLabel() === "die" && this.sprite.animation.getFrame() === this.sprite.animation.getLastFrame()) {
      this.sprite.remove();
      gameManager.endGame();
    }
  }
}