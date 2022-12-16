//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var score;
var hightest;
//snake head location
var snakeHeadX = blockSize * Math.floor(cols * Math.random());
var snakeHeadY = blockSize * Math.floor(cols * Math.random());

var velocityX = 0;
var velocityY = 0;

var numEatenFruit = 0;
//snake body
var snakeBody = [];

var gameOver = false;
var keyPressed;
// var updateTime = 200;

window.onload = function () {
  snakeGame();
};

function snakeGame() {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  document.getElementById("highestScore").innerText =
    localStorage.getItem("highestScore");
  document.getElementById("currentScore").innerText = numEatenFruit;

  placeFood();
  document.addEventListener("keydown", changeDirection);

  // setTimeout(update, updateTime);
  setInterval(update, 150); //150ms

  console.log(numEatenFruit);
}

function update() {
  keyPressed = false;
  if (gameOver) {
    return;
  }
  //draw board
  context.fillStyle = "#f4d9b8";
  context.fillRect(0, 0, board.width, board.height);

  //check if eat the food
  if (snakeHeadX == foodX && snakeHeadY == foodY) {
    snakeBody.push([foodX, foodY]);
    console.log(snakeBody);
    placeFood();
    numEatenFruit++;
    score = document.getElementById("currentScore");
    score.innerText = numEatenFruit;
    // updateTime = 1000 / (200 - numEatenFruit);
    // setTimeout(update, updateTime);
  }

  //update the body
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeHeadX, snakeHeadY];
  }

  //draw food
  context.fillStyle = "#b53f45";
  context.fillRect(foodX, foodY, blockSize - 1, blockSize - 1);

  //draw snake head
  context.fillStyle = "#142847";
  snakeHeadX += velocityX * blockSize;
  snakeHeadY += velocityY * blockSize;
  context.fillRect(snakeHeadX, snakeHeadY, blockSize - 1, blockSize - 1);

  //draw the snakebody
  context.fillStyle = "#848180";
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(
      snakeBody[i][0],
      snakeBody[i][1],
      blockSize - 2,
      blockSize - 2
    );
  }

  //game over conditions
  //check wall collision
  if (
    snakeHeadX < 0 ||
    snakeHeadX > (cols - 1) * blockSize ||
    snakeHeadY < 0 ||
    snakeHeadY > (rows - 1) * blockSize
  ) {
    gameOver = true;
    storeHighestScore(numEatenFruit);
    alert("Game Over");
  }

  //check body collision
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]) {
      gameOver = true;
      storeHighestScore(numEatenFruit);
      alert("Game Over");
    }
  }
}

function changeDirection(keyInterrupt) {
  if (
    (keyInterrupt.code == "ArrowUp" || keyInterrupt.code == "KeyW") &&
    velocityY != 1 &&
    !keyPressed
  ) {
    velocityX = 0;
    velocityY = -1;
    keyPressed = true;
  } else if (
    (keyInterrupt.code == "ArrowDown" || keyInterrupt.code == "KeyS") &&
    velocityY != -1 &&
    !keyPressed
  ) {
    velocityX = 0;
    velocityY = 1;
    keyPressed = true;
  } else if (
    (keyInterrupt.code == "ArrowLeft" || keyInterrupt.code == "KeyA") &&
    velocityX != 1 &&
    !keyPressed
  ) {
    velocityX = -1;
    velocityY = 0;
    keyPressed = true;
  } else if (
    (keyInterrupt.code == "ArrowRight" || keyInterrupt.code == "KeyD") &&
    velocityX != -1 &&
    !keyPressed
  ) {
    velocityX = 1;
    velocityY = 0;
    keyPressed = true;
  }
}

function placeFood() {
  console.log(snakeBody);

  foodX = Math.floor(cols * Math.random()) * blockSize;
  foodY = Math.floor(rows * Math.random()) * blockSize;
  for (let i = 0; i < snakeBody.length; i++) {
    while (foodX == snakeBody[i][0] && foodY == snakeBody[i][1]) {
      foodX = Math.floor(cols * Math.random()) * blockSize;
      foodY = Math.floor(rows * Math.random()) * blockSize;
      i = 0;
    }
  }
  console.log([foodX, foodY]);
}

function storeHighestScore(currentScore) {
  if (localStorage.getItem("highestScore") == null) {
    localStorage.setItem("highestScore", 0);
  }

  if (localStorage.getItem("highestScore") < currentScore) {
    localStorage.setItem("highestScore", currentScore);
  }

  document.getElementById("highestScore").innerText =
    localStorage.getItem("highestScore");
}
