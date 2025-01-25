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
const countdownText = document.getElementById('countdownText');
let score = 0;
let username;
let timer;
let timerInterval;
let level;
let running = false;
let countdownTimer = 3;
let countdownInterval;
let paused = false;
let countdownPauseTimer = 3;
let pauseInterval;


// level timer
function startGameTimer() {
    timerInterval = setInterval(() => {
        timer -= 1;
        timerText.innerHTML = timer;
    }, 1000);
}

// countdown timer
function startCountdownGameStart() {
    username = usernameInput.value;
    usernameText.innerHTML = username;
    level = selectLevel.value;
    score = 0;
    scoreText.innerHTML = score;
    countdownInterval = setInterval(() => {
        countdownTimer -= 1;
        countdownText.innerHTML = countdownTimer;
        if (countdownTimer < 1) {
            clearInterval(countdownInterval);
            running = true;
            gameStart();
            countdownText.style.display = 'none';
        }
    }, 1000);
}

// pause timer
function startPauseCountdown() {
    countdownText.style.display = 'block';
    pauseInterval = setInterval(() => {
        countdownPauseTimer -= 1;
        countdownText.innerHTML = countdownPauseTimer;
        if (countdownPauseTimer < 1) {
            clearInterval(pauseInterval);
            running = true;
            paused = false;
            countdownText.style.display = 'none';
            gameContinue();
        }
    }, 1000)
}

// images
const backgroundImage = new Image();
backgroundImage.src = './Sprites/background.jpg';

const imageGun1 = new Image();
imageGun1.src = './Sprites/gun1.png';

const imageGun2 = new Image();
imageGun2.src = './Sprites/gun2.png';

const imageTarget1 = new Image();
imageTarget1.src = './Sprites/target1.png';

const imageTarget2 = new Image();
imageTarget2.src = './Sprites/target2.png';

const imageTarget3 = new Image();
imageTarget3.src = './Sprites/target3.png';

const imagePointer = new Image();
imagePointer.src = './Sprites/pointer.png';

const imageBoom = new Image();
imageBoom.src = './Sprites/boom.png';

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
        height: target.height,
        scale: 0,
        maxScale: 1,
        scaleSpeed: 0.05
    }
}

// every 3 second, a target is spawned
function spawnTarget() {
    targetInterval = setInterval(() => {
        targets.push(createTarget());
    }, 3000);
}

// draw the target depending on the skin user selected
function drawTarget() {
    const selectedTarget = document.querySelector('input[name="target"]:checked');

    targets.forEach(target => {
        if (target.scale < target.maxScale) {
            target.scale = Math.min(target.maxScale, target.scale + target.scaleSpeed);
        }

        const scaledWidth = target.width * target.scale;
        const scaledHeight = target.height * target.scale;
        const drawX = target.x + (target.width - scaledWidth) / 2;
        const drawY = target.y + (target.height - scaledHeight) / 2;

        if (selectedTarget && selectedTarget.value === "1") {
            if (imageTarget1.complete) {
                ctx.drawImage(imageTarget1, drawX, drawY, scaledWidth, scaledHeight);
            }
        } else if (selectedTarget && selectedTarget.value === "2") {
            if (imageTarget2.complete) {
                ctx.drawImage(imageTarget2, drawX, drawY, scaledWidth, scaledHeight);
            }
        } else if (selectedTarget && selectedTarget.value === "3") {
            if (imageTarget3.complete) {
                ctx.drawImage(imageTarget3, drawX, drawY, scaledWidth, scaledHeight);
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
                score += 1;
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

    if (running && !paused) {
        drawBackground();
        drawTarget();
        drawGun();
        drawPointer();
        
        requestAnimationFrame(gameLoop);
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
        height: 150,
        scale: 0,
        maxScale: 1,
        scaleSpeed: 0.05
    },
    {
        x: Math.floor(Math.random() * cWidth - 100),
        y: Math.floor(Math.random() * cHeight / 2),
        width: 150,
        height: 150,
        scale: 0,
        maxScale: 1,
        scaleSpeed: 0.05
    },
    {
        x: Math.floor(Math.random() * cWidth - 100),
        y: Math.floor(Math.random() * cHeight / 2),
        width: 150,
        height: 150,
        scale: 0,
        maxScale: 1,
        scaleSpeed: 0.05
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
restartBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, cWidth, cHeight);
    countdownTimer = 3;
    countdownText.style.display = 'block';
    countdownText.innerHTML = countdownTimer;
    gameOverContainer.style.display = 'none';
    startCountdownGameStart();
});


// pause game
function gamePause() {
    clearInterval(timerInterval);
    clearInterval(targetInterval);
    running = false;
    paused = true;
    pauseGame.style.display = 'flex';
}

window.addEventListener('keydown', (e) => {
    const pressedKey = e.key;
    console.log(pressedKey);

    if (pressedKey === 'Escape' && running && !paused) {
        gamePause();
    } else if (pressedKey === 'Escape' && !running && paused && countdownPauseTimer <= 0) {
        countdownPauseTimer = 3;
        countdownText.innerHTML = countdownPauseTimer;
        pauseGame.style.display = 'none';
        startPauseCountdown();
    }

    if (pressedKey === ' ') {
        
    }

})


// continue game
continueBtn.addEventListener('click', () => {
    countdownPauseTimer = 3;
    countdownText.innerHTML = countdownPauseTimer;
    pauseGame.style.display = 'none';
    startPauseCountdown();
})

function gameContinue() {

    startGameTimer();
    createTarget();
    spawnTarget();
    gameLoop();
}

// save score
const saveScoreBtn = document.getElementById('saveScore');

saveScoreBtn.addEventListener('click', setLeaderboard);

function setLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    if (leaderboard) {
        let usernameHighScore = leaderboard.find(function (val) {
            return val.name == usernameInput.value
        });

        if (!usernameHighScore) {
            leaderboard.push({
                name: usernameInput.value,
                score: score
            })
        }
        else {
            usernameHighScore.score = Math.max(usernameHighScore.score, score);
        }
    }
    else {
        localStorage.setItem('leaderboard', JSON.stringify({
            name: usernameInput.value,
            score: score
        }));
        return;

    }
    
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    location.reload();
}

// show leaderboard
let leaderboardDisplay = JSON.parse(localStorage.getItem('leaderboard'));
leaderboardDisplay = leaderboardDisplay.sort((a, b) => {
    return b.score - a.score;
})

const leaderboardShow = document.getElementById('leaderboardShow');
leaderboardDisplay.forEach((val) => {
    const row = document.createElement('div');
    row.classList.add('player');
    row.innerHTML = `<div>
                    <p>${val.name}</p>
                    <p>Score: ${val.score}</p>
                    </div>
                    <button><i>Detail</i></button>`

    const innerRowDiv = row.querySelector('div');
    const innerRowBtn = row.querySelector('button');
    innerRowDiv.classList.add('stats');
    innerRowBtn.classList.add('detail-btn');
    leaderboardShow.appendChild(row);
});
