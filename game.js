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
let vel = {x: 20, y: 0};


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

function drawSnakePart(snakePart) {
  context.fillStyle = '#1affff';
  context.strokestyle = 'black';
  context.fillRect(snakePart.x, snakePart.y, 20, 20);
  context.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function updateSnake() {
  let head = {x: snake[0].x + vel.x, y: snake[0].y + vel.y};
  snake.unshift(head);
  if (snake[0].x == foodx && snake[0].y == foody) {
    initfood();
  }
  else {
    snake.pop();
  }
}

function drawFood() {
  context.fillStyle = '#ff4dff';
  context.strokestyle = 'black';
  context.fillRect(foodx, foody, 20, 20);
  context.strokeRect(foodx, foody, 20, 20);
}

function endgame() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      return true;
    }
  }
  return (snake[0].x < 0 || snake[0].x > canvas.width - 20 || snake[0].y < 0
          || snake[0].y > canvas.height - 20)
}

function eat(part) {
  if (part.x == foodx && part.y == foody){
    initfood();
  }
}

function initfood() {
  foodx = Math.round((Math.random() * (canvas.width - 20-0) + 0) / 20) * 20;
  foody = Math.round((Math.random() * (canvas.height - 20-0) + 0) / 20) * 20;
  snake.forEach(eat);
}

document.addEventListener("keydown", change_direction);
function change_direction(e) {
  let LEFT_KEY = 37;
  let RIGHT_KEY = 39;
  let UP_KEY = 38;
  let DOWN_KEY = 40;

  if (changing_direction) return;
  changing_direction = true;
  let goingUp = vel.y
  let goingDown = vel.y
  let goingRight = vel.x
  let goingLeft = vel.x
  if (e.keyCode == LEFT_KEY && goingRight != 20) {
    vel.x = -20;
    vel.y = 0;
  }
  else if (e.keyCode == UP_KEY && goingDown != 20) {
    vel.x = 0;
    vel.y = -20;
  }
  else if (e.keyCode == RIGHT_KEY && goingLeft != -20) {
    vel.x = 20;
    vel.y = 0;
  }
  else if (e.keyCode == DOWN_KEY && goingUp != -20) {
    vel.x = 0;
    vel.y = 20;
  }
}
