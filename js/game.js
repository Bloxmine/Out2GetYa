// Description: This file contains the game logic. The game is Outrun, a classic arcade game, but with a Carmageddon twist.
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

let lastTime;
let deltaTime;
let gameObjects = [];
let score = 0;
let gameOver = false;

function init() {
    let player = new Player();
    gameObjects.push(player);
    lastTime = Date.now();
    gameLoop();
}

function gameLoop() {
    let now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    update();
    render();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
}

function update() {
    gameObjects.forEach(object => {
        object.update();
    });
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameObjects.forEach(object => {
        object.render();
    });
}

class Player {
    constructor() {
        this.width = 154;
        this.height = 88;
        this.x = (canvas.width - this.width) / 2;
        this.y = (canvas.height - this.height) / 2 + 150;
        this.targetX = this.x;
        this.targetY = this.y;
        this.speed = 200;
        this.image = new Image();
        this.image.src = '../images/Player/PlayerBack.png'; // default image
        this.image.classList.add('player');

        // directions, temp
        this.images = {
            up: '../images/Player/PlayerBack.png',
            down: '../images/Player/PlayerFront.png',
            left: '../images/Player/PlayerLeft.png',
            right: '../images/Player/PlayerRight.png'
        };

        this.directionX = 0;
        this.directionY = 0;

        // event listeners
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.directionY = -1;
                    this.image.src = this.images.up;
                    break;
                case 'ArrowLeft':
                    this.directionX = -1;
                    this.image.src = this.images.left;
                    break;
                case 'ArrowRight':
                    this.directionX = 1;
                    this.image.src = this.images.right;
                    break;
            }
        });

        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.directionY = 0;
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    this.directionX = 0;
                    break;
            }
        });
    }

        // direcion based movement
        update() {
            const movementX = this.directionX * this.speed * (deltaTime / 1000);
            const movementY = this.directionY * this.speed * (deltaTime / 1000);

            this.x += movementX;
            this.y += movementY;

            // restrain the player within the canvas boundaries, doesn't work?
            this.x = Math.max(0, Math.min(this.x, canvas.width - this.width));
            this.y = Math.max(0, Math.min(this.y, canvas.height - this.height));
        };

        render() {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
        }

init();

