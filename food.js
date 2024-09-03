import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let foodsound = new Audio('Food.mp3');
let food = getRandomFoodPosition();
let score=0;
let hiscoreval=0;
const EXPANSION_RATE = 1

export function update() {
  if (onSnake(food)) {
    score += 1;
    if(score>Hiscore){
      hiscoreval = score;
      localStorage.setItem("Hiscore", JSON.stringify(hiscoreval));
      document.getElementById("hiscoreBox").innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    foodsound.play();
    expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition()
  }
}
let Hiscore= localStorage.getItem("Hiscore");
if(Hiscore===null)
{
  localStorage.setItem("Hiscore", JSON.stringify(hiscoreval));
}
else
{
  Hiscore= JSON.parse(Hiscore);
  document.getElementById("hiscoreBox").innerHTML = "HiScore: " + Hiscore;
}
export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}
function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}