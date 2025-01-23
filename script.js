// canvas game code
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const cWidth = canvas.width;
const cHeight = canvas.height;

// game variables
const usernameText = document.getElementById('usernameText');
const scoreText = document.getElementById('scoreText');
const timerText = document.getElementById('timerText');
let score = 0;
let username;
let timer;
let timerInterval;
let level;
let running = false;

// level timer
function startGameTimer() {
    timerInterval = setInterval(() => {
        timer -= 1;
        timerText.innerHTML = timer;
        console.log(timer);
    }, 1000);
}


// images
const backgroundImage = new Image();
backgroundImage.src = './MODULE_CLIENT_MEDIA/Sprites/background.jpg';

const imageGun1 = new Image();
imageGun1.src = './MODULE_CLIENT_MEDIA/Sprites/gun1.png';

const imageGun2 = new Image();
imageGun2.src = './MODULE_CLIENT_MEDIA/Sprites/gun2.png';

const imageTarget1 = new Image();
imageTarget1.src = './MODULE_CLIENT_MEDIA/Sprites/target1.png';

const imageTarget2 = new Image();
imageTarget2.src = './MODULE_CLIENT_MEDIA/Sprites/target2.png';

const imageTarget3 = new Image();
imageTarget3.src = './MODULE_CLIENT_MEDIA/Sprites/target3.png';

const imagePointer = new Image();
imagePointer.src = './MODULE_CLIENT_MEDIA/Sprites/pointer.png';

const imageBoom = new Image();
imageBoom.src = './MODULE_CLIENT_MEDIA/Sprites/boom.png';

// cursor to pointer
let cursor = {
    x: cWidth / 2,
    y: cHeight / 2,
    width: 50,
    height: 50
}

// pointer follow cursor
canvas.addEventListener('mousemove', (e) => {
    cursor.x = e.offsetX - cursor.width / 2;
    cursor.y = e.offsetY - cursor.height / 2;
})

// draw Cursor (pointer)
function drawPointer() {
    if (imagePointer.complete) {
        ctx.drawImage(imagePointer, cursor.x, cursor.y, cursor.width, cursor.height);
    }
}

// draw gun
function drawGun() {
    const selectedGun = document.querySelector('input[name="gun"]:checked');

    if (selectedGun && selectedGun.value === "1") {
        if (imageGun1.complete) {
            ctx.drawImage(imageGun1, cursor.x, 350, 500, 400);
        }
    } else if (selectedGun && selectedGun.value === "2") {
        if (imageGun2.complete) {
            ctx.drawImage(imageGun2, cursor.x, 350, 500, 400);
        }
    }
}

// setup target
let targets = [];
let target = {
    x: 0,
    y: 0,
    width: 150,
    height: 150
}
let targetInterval;

// create target position
function createTarget() {
    const targetX = Math.floor(Math.random() * cWidth - 100);
    const targetY = Math.floor(Math.random() * cHeight / 2);

    return {
        x: targetX,
        y: targetY,
        width: target.width,
        height: target.height
    }
}

// every 3 second, a target is spawned
function spawnTarget() {
    targetInterval = setInterval(() => {
        targets.push(createTarget());
    }, 1000);
}

// draw the target depending on the skin user selected
function drawTarget() {
    const selectedTarget = document.querySelector('input[name="target"]:checked');

    targets.forEach(target => {
        if (selectedTarget && selectedTarget.value === "1") {
            if (imageTarget1.complete) {
                ctx.drawImage(imageTarget1, target.x, target.y, target.width, target.height);
            }
        } else if (selectedTarget && selectedTarget.value === "2") {
            if (imageTarget2.complete) {
                ctx.drawImage(imageTarget2, target.x, target.y, target.width, target.height);
            }
        } else if (selectedTarget && selectedTarget.value === "3") {
            if (imageTarget3.complete) {
                ctx.drawImage(imageTarget3, target.x, target.y, target.width, target.height);
            }
        }
    });
}

// shoot target
canvas.addEventListener('click', () => {
    if (running) {
        let hit = false;
    
        targets = targets.filter(target => {
            const isHit = (
                cursor.x < target.x + target.width &&
                cursor.x + 5 > target.x &&
                cursor.y < target.y + target.height &&
                cursor.y + 5 > target.y
            );
    
            if (isHit) {
                score += 10;
                scoreText.innerHTML = score;
                hit = true;
                // if (imageBoom.complete) {
                //     ctx.drawImage(imageBoom, cursor.x, cursor.y, 50, 50)
                // }
            }
    
            return !isHit;
    
        });
        
        if (!hit && running) {
            timer -= 5;
            timerText.innerHTML = timer;
        }
    }

})


// draw background
function drawBackground() {
    if (backgroundImage.complete) {
        ctx.drawImage(backgroundImage, 0, 0, cWidth, cHeight)
    }
}

// game loop
function gameLoop() {
    if (running) {
        drawBackground();
        drawGun();
        drawTarget();
        drawPointer();
        
        requestAnimationFrame(gameLoop);

        window.addEventListener('keydown', (e) => {
            const pressedKey = e.key;
            console.log(pressedKey);
        
            if (pressedKey === 'Escape') {
                gamePause();
            }
        })
    }


    if (timer <= 0) {
        running = false;
        clearInterval(timerInterval);
        clearInterval(targetInterval);
        gameOver();
    }
}

// game start
function gameStart() {
    ctx.clearRect(0, 0, cWidth, cHeight);
    gameOverContainer.style.display = 'none';
    running = true;
    username = usernameInput.value;
    usernameText.innerHTML = username;
    level = selectLevel.value;
    score = 0;
    scoreText.innerHTML = score;
    clearInterval(timerInterval);
    clearInterval(targetInterval);

    if (level === '1') {
        timer = 30;
        timerText.innerHTML = timer;
    } else if (level === '2') {
        timer = 20;
        timerText.innerHTML = timer;
    } else if (level === '3') {
        timer = 15;
        timerText.innerHTML = timer;
    }

    targets = [{
        x: Math.floor(Math.random() * cWidth - 100),
        y: Math.floor(Math.random() * cHeight / 2),
        width: 150,
        height: 150
    },
    {
        x: Math.floor(Math.random() * cWidth - 100),
        y: Math.floor(Math.random() * cHeight / 2),
        width: 150,
        height: 150
    },
    {
        x: Math.floor(Math.random() * cWidth - 100),
        y: Math.floor(Math.random() * cHeight / 2),
        width: 150,
        height: 150
    },
    ]

    startGameTimer();
    createTarget();
    spawnTarget();
    gameLoop();
}

// game over
const usernameGameOver = document.getElementById('usernameGameOver');
const scoreGameOver = document.getElementById('scoreGameOver');

function gameOver() {
    gameOverContainer.style.display = 'flex';
    usernameGameOver.innerHTML = username;
    scoreGameOver.innerHTML = score;
}

// restart
restartBtn.addEventListener('click', gameStart);

// pause game
function gamePause() {
    clearInterval(timerInterval);
    clearInterval(targetInterval);
    running = false;
    pauseGame.style.display = 'flex';
}

// continue game
continueBtn.addEventListener('click', () => {
    running = true;
    pauseGame.style.display = 'none';
})

