const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const coins = [document.getElementById('coin1'), document.getElementById('coin2'), document.getElementById('coin3')];

let playerPos = { x: 50, y: 580, dx: 0, dy: 0, speed: 5, gravity: 1, jump: -15 };
let keys = { left: false, right: false, up: false };
let score = 0;

function update() {
    if (keys.left) playerPos.dx = -playerPos.speed;
    if (keys.right) playerPos.dx = playerPos.speed;
    if (keys.up && playerPos.dy === 0) playerPos.dy = playerPos.jump;

    playerPos.dy += playerPos.gravity;
    playerPos.x += playerPos.dx;
    playerPos.y += playerPos.dy;
    playerPos.dx *= 0.9;

    if (playerPos.y > 580) {
        playerPos.y = 580;
        playerPos.dy = 0;
    }

    player.style.left = playerPos.x + 'px';
    player.style.bottom = playerPos.y + 'px';

    coins.forEach(coin => {
        if (checkCollision(player, coin)) {
            coin.style.display = 'none';
            score += 10;
            console.log('Score: ' + score);
        }
    });

    requestAnimationFrame(update);
}

function checkCollision(rect1, rect2) {
    const rect1Pos = rect1.getBoundingClientRect();
    const rect2Pos = rect2.getBoundingClientRect();
    return !(
        rect1Pos.top > rect2Pos.bottom ||
        rect1Pos.bottom < rect2Pos.top ||
        rect1Pos.right < rect2Pos.left ||
        rect1Pos.left > rect2Pos.right
    );
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === 'ArrowUp') keys.up = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
    if (e.key === 'ArrowUp') keys.up = false;
});

update();
