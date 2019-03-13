class GameManager {
  constructor() {
    this.score = 0;
    this.scoresArray = localStorage.getItem("scores") ? JSON.parse(localStorage.getItem("scores")) : [];
  }

  addScore(inc) {
    this.score += inc;
    enemySpawnRate += DIFFICULTY.spawnRate.speed;
    enemySpeed += DIFFICULTY.speed.speed;
    enemyFireRate += DIFFICULTY.fireRate.speed;
  }

  updateHUD() {
    textFont(font);
    textSize(32);
    textAlign(RIGHT, CENTER);
    fill(ASSETS_STYLE === "color" ? "#fff" : "#000");
    text(this.score, width - 30, 50);
    
    textSize(16);
    if (this.score > Math.max(...this.scoresArray)) {
      text("New Highscore!", width - 30, 80);
    }
  }

  startLevel(enemyNumber) {
    
  }

  endGame() {
    setTimeout(() => {
      this.scoresArray.push(this.score);
      localStorage.setItem("scores", JSON.stringify(this.scoresArray));
      location.replace(`/?ls=${this.score}`);
    }, 1500);
  }
}