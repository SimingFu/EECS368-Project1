let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
let lose = document.getElementById('lose page');
lose.style.display = 'none';

let snake = [
  {x: 200, y: 200},
  {x: 180, y: 200},
  {x: 160, y: 200},
  {x: 140, y: 200},
  {x: 120, y: 200}
]

let changing_direction = false;
let foodx;
let foody;
let dx = 20;
let dy = 0;


// Start game
main();
initfood();

function main() {
    if (endgame()){
      lose.style.display = 'block';

      return;
    }

    changing_direction = false;
    setTimeout(function onTick() {
    clear_board();
    drawFood();
    updateSnake();
    drawSnake();
    // Repeat
    main();
  }, 100)
}

function clear_board() {
  context.fillStyle = "#ffff00";
  context.strokestyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach(drawSnakePart)
}

function drawFood() {
  context.fillStyle = '#ff4dff';
  context.strokestyle = 'black';
  context.fillRect(foodx, foody, 20, 20);
  context.strokeRect(foodx, foody, 20, 20);
}

function drawSnakePart(snakePart) {
  context.fillStyle = '#1affff';
  context.strokestyle = 'black';
  context.fillRect(snakePart.x, snakePart.y, 20, 20);
  context.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function endgame() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  let hitLeftWall = snake[0].x < 0;
  let hitRightWall = snake[0].x > canvas.width - 20;
  let hitToptWall = snake[0].y < 0;
  let hitBottomWall = snake[0].y > canvas.height - 20;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function initfood() {
  foodx = Math.round((Math.random() * (canvas.width - 20-0) + 0) / 20) * 20;
  foody = Math.round((Math.random() * (canvas.height - 20-0) + 0) / 20) * 20;
  snake.forEach(function has_snake_eaten_food(part) {
    let has_eaten = part.x == foodx && part.y == foody;
    if (has_eaten) initfood();
  });
}

document.addEventListener("keydown", change_direction);
function change_direction(e) {
  let LEFT_KEY = 37;
  let RIGHT_KEY = 39;
  let UP_KEY = 38;
  let DOWN_KEY = 40;

  if (changing_direction) return;
  changing_direction = true;
  let keyPressed = e.keyCode;
  let goingUp = dy === -20;
  let goingDown = dy === 20;
  let goingRight = dx === 20;
  let goingLeft = dx === -20;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -20;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -20;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 20;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 20;
  }
}

function updateSnake() {
  let head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  let eatfood = snake[0].x === foodx && snake[0].y === foody;
  if (eatfood) {
    initfood();
  }
  else {
    snake.pop();
  }
}
