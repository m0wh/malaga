class GameManager {
  constructor() {
    this.score = 0;
    this.scoresArray = localStorage.getItem("scores") ? JSON.parse(localStorage.getItem("scores")) : [];
    this.canLoseByCrossing = false;
  }

  addScore(inc) {
    this.score += inc;
    enemySpawnRate += DIFFICULTY.spawnRate.speed;
    enemySpeed += DIFFICULTY.speed.speed;
    enemyFireRate += DIFFICULTY.fireRate.speed;
    if (inc > 0 && !this.canLoseByCrossing) {
      this.canLoseByCrossing = true;
    }
    if (this.canLoseByCrossing && this.score <= 0) {
      this.endGame(true);
    }
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
      document.title = this.score + " - New Highscore! — Malaga";
    } else {
      document.title = this.score + " — Malaga";
    }
  }

  startLevel(enemyNumber) {
    
  }

  endGame(immediate = false) {
    setTimeout(() => {
      this.scoresArray.push(this.score);
      localStorage.setItem("scores", JSON.stringify(this.scoresArray));
      location.replace(`index.html?ls=${this.score}`);
    }, immediate ? 0 : 1500);
  }
}