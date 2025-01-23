// pages
const mainMenu = document.getElementById('mainMenu');
const instructionPage = document.getElementById('instructionPage');
const gameContainer = document.getElementById('gameContainer');
const gameOverContainer = document.getElementById('gameOver');
const pauseGame = document.getElementById('pauseGame');

// buttons
const startGame = document.getElementById('startGame');
const showInstruction = document.getElementById('showInstruction');
const closeInstructionBtn = document.getElementById('closeInstructionBtn');
const saveScore = document.getElementById('saveScore');
const restartBtn = document.getElementById('restartBtn');
const continueBtn = document.getElementById('continueBtn');

// inputs
const usernameInput = document.getElementById('usernameInput');
const selectLevel = document.getElementById('selectLevel');

const gunSkin1 = document.getElementById('gunSkin1');
const gunSkin2 = document.getElementById('gunSkin2');
const targetSkin1 = document.getElementById('targetSkin1');
const targetSkin2 = document.getElementById('targetSkin2');
const targetSkin3 = document.getElementById('targetSkin3');

// open instruction
showInstruction.addEventListener('click', () => {
    instructionPage.style.display = 'flex';
})

// close instruction
closeInstructionBtn.addEventListener('click', () => {
    instructionPage.style.display = 'none';
})

// start game
startGame.addEventListener('click', () => {
    let username = usernameInput.value;
    const selectedGun = document.querySelector('input[name="gun"]:checked');
    const selectedTarget = document.querySelector('input[name="target"]:checked');
    let selectedLevel = selectLevel.value;

    if (username.trim() === '') {
        alert('please input your name');
        return;
    } else if (!selectedGun) {
        alert('please select a gun');
        return;
    } else if (!selectedTarget) {
        alert('please select a target');
        return;
    } else if (selectedLevel === '0') {
        alert('please select a level');
        return;
    }



    mainMenu.style.display = 'none';
    gameContainer.style.display = 'flex';

    gameStart();

})