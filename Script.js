const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const gameUI = document.getElementById('game-ui');
const successUI = document.getElementById('success-msg');

let box = 15; 
let score = 0;
let direction;
let gameActive = true;

let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

document.addEventListener('keydown', setDirection);

function setDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) return true;
    }
    return false;
}

function draw() {
    if (!gameActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "#22d3ee" : "rgba(34, 211, 238, 0.4)";
        ctx.strokeStyle = "#0a0f1e";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    
    ctx.fillStyle = "#ff4d4d";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ff4d4d";
    ctx.fillRect(food.x, food.y, box, box);
    ctx.shadowBlur = 0; 

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

   
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreDisplay.textContent = score;
        
       
        if (score >= 5) {
            verifyHuman();
        }

        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Game Over Logic
    if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(gameInterval);
        alert("Game Over! Try again to prove you are human.");
        location.reload();
    }

    snake.unshift(newHead);
}

function verifyHuman() {
    gameActive = false;
    clearInterval(gameInterval);
    gameUI.classList.add('hidden');
    successUI.classList.remove('hidden');
}

// Start Game
let gameInterval = setInterval(draw, 100);