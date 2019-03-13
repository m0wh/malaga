class Enemy {
  constructor(startPosition, speed, fireRate) {
    this.sprite = createSprite(startPosition.x, startPosition.y , 16, 16);
    this.sprite.setCollider("circle", 0, 0, 8);
    enemies.add(this.sprite);
    this.sprite.addAnimation("idle", enemy_animations.idle[Math.floor(Math.random() * enemy_animations.idle.length)]);
    this.sprite.addAnimation("die", enemy_animations.die);
    this.sprite.rotation = 180;
    this.sprite.scale = SCALE;
    this.sprite.friction = 0.1;
    this.isAlive = true;
    this.speed = random() * .4 + speed - .2;
    this.fireRate = fireRate;
  }

  launchMissile() {
    new Missile(this.sprite.position, this.sprite.rotation, true);
  }

  update(target) {
    if (this.isAlive) {
      const relativePosToTarget = target.sprite.position.x - this.sprite.position.x;
      this.sprite.addSpeed(relativePosToTarget > 0 ? this.speed : -this.speed, 0);
      this.sprite.addSpeed(this.speed / 3, 90);
      this.sprite.rotation = this.sprite.velocity.x * -4 + 180;

      if (Math.random()*30 > 30 - this.fireRate && Math.abs(relativePosToTarget) <= 30) { this.launchMissile() }

      this.sprite.overlap(goodMissiles, (enemy, missile) => {
        this.sprite.changeAnimation("die");
        this.sprite.rotation = 0;
        this.isAlive = false;
        sounds.enemy_die.play();
        gameManager.addScore(1);
        missile.remove();
      });

      if (this.sprite.position.y > height + 8) {
        this.isAlive = false;
        this.sprite.remove();
        gameManager.addScore(-5);
      }
    }


    if (this.sprite.getAnimationLabel() === "die" && this.sprite.animation.getFrame() === this.sprite.animation.getLastFrame()) {
      this.sprite.remove();
    }
  }
}