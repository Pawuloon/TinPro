let bird;
let pipes;
let gameOver;
let score;
let highScore

function setup()
{
    createCanvas(400, 600);
    pipes = [];
    bird = new Bird();
    pipes.push(new Pipe());
    score = 0;
    highScore = 0;
    gameOver = false;
}

function draw()
{
    background(220);

    if (!gameOver)
    {
        bird.update();
        bird.show();

        if (frameCount % 100 === 0)
        {
            pipes.push(new Pipe());
        }

        for (let i = pipes.length - 1; i >= 0; i--)
        {
            pipes[i].update();
            pipes[i].show();

            if (pipes[i].hits(bird))
                gameOver = true;


            if (pipes[i].offscreen())
            {
                pipes.splice(i, 1);
                score++;
                if (score > highScore)
                    highScore = score;
            }
        }

        if (bird.offscreen())
            gameOver = true;

        fill(0);
        textSize(32);
        text(`Score: ${score}`, 10, 30);
    }
    else
    {
        fill(255, 0, 0);
        textSize(64);
        textAlign(CENTER, CENTER);
        text('Game Over', width / 2, height / 2);
        text(`Score: ${score} High Score: ${highScore}`, width / 2, height / 2 + 60);
    }
}

function keyPressed()
{
    if (keyCode === 32 && !gameOver)
    {
        bird.jump();
    }
    else if (keyCode === 32 && gameOver)
    {
        setup();
    }
}

class Bird
{
    constructor()
    {
        this.y = height / 2;
        this.x = 64;
        this.gravity = 0.6;
        this.lift = -15;
        this.velocity = 0;
    }

    jump()
    {
        this.velocity += this.lift;
    }

    update()
    {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y > height)
        {
            this.y = height;
            this.velocity = 0;
        }

        if (this.y < 0)
        {
            this.y = 0;
            this.velocity = 0;
        }
    }

    show()
    {
        fill(255, 255, 0);
        ellipse(this.x, this.y, 32, 32);
    }

    offscreen()
    {
        return this.y > height || this.y < 0;
    }
}

class Pipe {
    constructor()
    {
        this.spacing = 125;
        this.top = random(height / 6, 3 / 4 * height);
        this.bottom = height - (this.top + this.spacing);
        this.x = width;
        this.w = 40;
        this.speed = 2;
        this.highlight = false;
    }

    hits(bird)
    {
        if (bird.y < this.top || bird.y > height - this.bottom)
        {
            if (bird.x > this.x && bird.x < this.x + this.w)
            {
                this.highlight = true;
                return true;
            }
        }
        this.highlight = false;
        return false;
    }

    show()
    {
        fill(0, 255, 0);
        if (this.highlight)
        {
            fill(255, 0, 0);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
    }

    update()
    {
        this.x -= this.speed;
    }

    offscreen()
    {
        return this.x < -this.w;
    }
}