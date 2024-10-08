import { outsideGrid } from './grid.js'
import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
let Gameover = new Audio('GO.mp3');
let Music = new Audio('Music.mp3');
let lastRenderTime = 0
let gameOver = false
let score = 0;
const gameBoard = document.getElementById('game-board')
function main(currentTime) {
  if (gameOver) {
    Gameover.play();
    alert('You lost, Press Enter to continue') 
    setTimeout(function() {
      location.reload();}, 1);
    return
  }
  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
  lastRenderTime = currentTime
  update()
  draw()
}
window.requestAnimationFrame(main)
function update() {
  updateSnake()
  updateFood()
  checkDeath()
}
function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}
function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}