// Description: Snake game using js

let snake;
let food;
let gridSize = 20;
let score
let highScore

function setup()
{
    createCanvas(400, 400);
    frameRate(10);
    snake = new Snake();
    food = placeFood();
    score = 0;
    highScore = 0;
}

function draw()
{
    background(220);
    snake.move();
    snake.checkCollision();
    snake.display();

    if (snake.eat(food))
    {
        food = placeFood();
        score++;
        if (score > highScore)
            highScore = score;
    }

    fill(255, 0, 0);
    rect(food.x, food.y, gridSize, gridSize);

    displayScore();
}

function keyPressed()
{
    if (keyCode === UP_ARROW && snake.ySpeed === 0)
    {
        snake.setDirection(0, -1);
    }
    else if (keyCode === DOWN_ARROW && snake.ySpeed === 0)
    {
        snake.setDirection(0, 1);
    }
    else if (keyCode === LEFT_ARROW && snake.xSpeed === 0)
    {
        snake.setDirection(-1, 0);
    }
    else if (keyCode === RIGHT_ARROW && snake.xSpeed === 0)
    {
        snake.setDirection(1, 0);
    }
    else
    {
        snake.restart();
    }
}

function placeFood()
{
    let cols = Math.floor(width / gridSize);
    let rows = Math.floor(height / gridSize);
    return createVector(Math.floor(random(cols)), Math.floor(random(rows))).mult(gridSize);
}

function displayScore()
{
    fill(0);
    textSize(20);
    text(`Score: ${score}  High Score ${highScore}`, 10, 30);
}



class Snake
{
    constructor()
    {
        this.body = [];
        this.body[0] = createVector(Math.floor(width / 2), Math.floor(height / 2));
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    setDirection(x, y)
    {
        this.xSpeed = x;
        this.ySpeed = y;
    }

    move()
    {
        let head = this.body[this.body.length - 1].copy();
        this.body.shift();
        head.x += this.xSpeed * gridSize;
        head.y += this.ySpeed * gridSize;
        this.body.push(head);
    }

    eat(pos)
    {
        let head = this.body[this.body.length - 1];
        if (head.x === pos.x && head.y === pos.y)
        {
            this.body.push(createVector(pos.x, pos.y));
            return true;
        }
        return false;
    }

    checkCollision()
    {
        let head = this.body[this.body.length - 1];
        if (head.x >= width || head.x < 0 || head.y >= height || head.y < 0)
        {
            this.restart();
        }

        for (let i = 0; i < this.body.length - 1; i++)
        {
            let part = this.body[i];
            if (head.x === part.x && head.y === part.y)
                this.restart();
        }
    }


    display()
    {
        for (let i = 0; i < this.body.length; i++)
        {
            fill(0);
            noStroke();
            rect(this.body[i].x, this.body[i].y, gridSize, gridSize);
        }
    }

    restart()
    {
        this.body = [];
        this.body[0] = createVector(Math.floor(width / 2), Math.floor(height / 2));
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    static get getScore()
    {
        return highScore;
    }
}
module.exports = Snake;