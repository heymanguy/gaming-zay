const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("startButton");
const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");

let score = 0;
let playerX = 230;
let targetX = 0;
let movingLeft = false;
let movingRight = false;

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function movePlayer() {
  if (movingLeft) playerX -= 8;
  if (movingRight) playerX += 8;

  playerX = Math.max(0, Math.min(playerX, gameArea.clientWidth - 28));
  player.style.left = `${playerX}px`;
}

function spawnTarget() {
  targetX = Math.random() * (gameArea.clientWidth - 30);
  const target = document.createElement("div");
  target.className = "target";
  target.style.position = "absolute";
  target.style.width = "20px";
  target.style.height = "20px";
  target.style.background = "#ef4444";
  target.style.borderRadius = "50%";
  target.style.left = `${targetX}px`;
  target.style.top = "10px";
  target.style.cursor = "pointer";

  target.addEventListener("click", () => {
    score += 1;
    updateScore();
    target.remove();
    spawnTarget();
  });

  gameArea.appendChild(target);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    movingLeft = true;
  }
  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    movingRight = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    movingLeft = false;
  }
  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    movingRight = false;
  }
});

startButton.addEventListener("click", () => {
  score = 0;
  updateScore();
  spawnTarget();
  startButton.textContent = "Restart Game";
});

setInterval(() => {
  movePlayer();
}, 16);

updateScore();