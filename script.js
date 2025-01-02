// canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

// variables
let score = 0;
let timer = 30;
let difficulty;

// timer
if (difficulty === 1) {
    timer = 30;
}
if (difficulty === 2) {
    timer = 20;
}
if (difficulty === 3) {
    timer = 15;
}

// background img
const backgroundImage = new Image();
backgroundImage.src = 'Sprites/background.jpg';

// cursor img
const cursorImage = new Image();
cursorImage.src = 'Sprites/pointer.png';

// gun img
const gunImage = new Image();

// target img
const targetImage = new Image();


function drawBackground() {
    if (backgroundImage.complete) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } 
    else {
        backgroundImage.onload = () => ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }
}

const cursor = {
    x: 0,
    y: 0,
    width: 50,
    height: 50
}

const targets = [];

const target = {
    x: Math.random() * (canvas.width - 60),
    y: Math.random() * (canvas.height - 60),
    width: 150,
    height: 150
}

canvas.addEventListener('mousemove', (e) => {
    cursor.x = e.offsetX - cursor.width / 2,
    cursor.y = e.offsetY - cursor.height / 2
})

function drawCursor() {
    if (cursorImage.complete) {
        ctx.drawImage(cursorImage, cursor.x, cursor.y, cursor.width, cursor.height);
    }
    else {
        cursorImage.onload = () => ctx.drawImage(cursorImage, cursor.x, cursor.y, cursor.width, cursor.height);
    }
}

function drawGun() {
    if (gunImage.complete) {
        ctx.drawImage(gunImage, cursor.x, 300, 300, 300);
    }
    else {
        gunImage.onload = () => ctx.drawImage(gunImage, cursor.x, 300, 300, 300);
    }
}

function drawTarget() {
    const position = {
        x: Math.random() * (canvas.width - target.width),
        y: Math.random() * (canvas.height - target.height),
        width: target.width,
        height: target.height,
        skin: targetImage
    };

    targets.push(position);

}


function drawTargets() {
    targets.forEach((target) => {
        ctx.drawImage(target.skin, target.x, target.y, target.width, target.height);
    });
}

function startSpawn() {
    setInterval(drawTarget, 3000);
}

canvas.addEventListener('click', (e) => {
    const shootX = e.offsetX;
    const shootY = e.offsetY;

    targets.forEach((target, index) => {
        if (
            shootX >= target.x &&
            shootX <= target.x + target.width &&
            shootY >= target.y &&
            shootY <= target.y + target.height
        ) {
            targets.splice(index, 1); // Remove the clicked target
            score += 10; // Increment score
        }
    });
});

function animate() {

    drawBackground();
    drawTargets();
    drawCursor();
    drawGun();
    requestAnimationFrame(animate);
}

function startCountdown(callback) {
    let countdown = 3;

    const countdownInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBackground();


        ctx.fillStyle = "black";
        ctx.font = "160px Arial";
        ctx.textAlign = "center";
        ctx.fillText(countdown, canvas.width / 2, canvas.height / 2);

        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            callback();
        }
    }, 1000);
}


function startGame(options) {
    drawBackground();

    const { gun, target } = options;

    gunImage.src = `Sprites/${gun}.png`;
    targetImage.src = `Sprites/${target}.png`;

    startCountdown(() => {
        startSpawn();
        animate();
    })
}

