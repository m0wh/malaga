class Missile {
  constructor(lanchPosition, direction, fromEnemy, speed = 10) {
    this.fromEnemy = fromEnemy;
    this.sprite = createSprite(lanchPosition.x, lanchPosition.y , 16, 16);
    this.sprite.setCollider("rectangle", 0, 0, 3, 8);
    this.sprite.addAnimation("basic", fromEnemy ? missile_animations.bad : missile_animations.good);
    this.sprite.scale = SCALE;
    this.direction = direction;
    this.sprite.rotation = this.direction;
    this.sprite.addSpeed(speed, this.direction - 90);
    sounds.missile.play(0, 0, .3);
    if (fromEnemy) {
      badMissiles.add(this.sprite);
    } else {
      goodMissiles.add(this.sprite);
    }
  }
}