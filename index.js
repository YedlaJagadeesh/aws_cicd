const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 50,
    y: canvas.height - 70,
    width: 50,
    height: 50,
    color: 'red',
    dy: 0,
    jumpForce: 15,
    grounded: false,
    speed: 5,
    dx: 0,
    gravity: 1,
};

const keys = {
    right: false,
    left: false,
    up: false,
};

const platforms = [
    { x: 0, y: canvas.height - 20, width: canvas.width, height: 20, color: 'green' },
    { x: 150, y: 450, width: 100, height: 20, color: 'green' },
    { x: 300, y: 300, width: 100, height: 20, color: 'green' },
    { x: 450, y: 200, width: 100, height: 20, color: 'green' },
];

const coins = [
    { x: 180, y: 420, width: 20, height: 20, color: 'gold' },
    { x: 330, y: 270, width: 20, height: 20, color: 'gold' },
    { x: 480, y: 170, width: 20, height: 20, color: 'gold' },
];

let score = 0;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function drawCoins() {
    coins.forEach(coin => {
        ctx.fillStyle = coin.color;
        ctx.fillRect(coin.x, coin.y, coin.width, coin.height);
    });
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function updatePlayer() {
    if (keys.right) {
        player.dx = player.speed;
    } else if (keys.left) {
        player.dx = -player.speed;
    } else {
        player.dx = 0;
    }

    if (keys.up && player.grounded) {
        player.dy = -player.jumpForce;
        player.grounded = false;
    }

    player.dy += player.gravity;
    player.x += player.dx;
    player.y += player.dy;

    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y) {
            player.grounded = true;
            player.dy = 0;
            player.y = platform.y - player.height;
        }
    });

    if (player.y + player.height > canvas.height) {
        player.grounded = true;
        player.dy = 0;
        player.y = canvas.height - player.height;
    }

    coins.forEach((coin, index) => {
        if (player.x < coin.x + coin.width &&
            player.x + player.width > coin.x &&
            player.y < coin.y + coin.height &&
            player.y + player.height > coin.y) {
            coins.splice(index, 1);
            score += 10;
        }
    });

    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatforms();
    drawPlayer();
    drawCoins();
    drawScore();
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowUp') keys.up = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') keys.right = false;
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowUp') keys.up = false;
});

gameLoop();
