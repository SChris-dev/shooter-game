// pages
const mainMenu = document.getElementById('mainMenu');
const instructionMenu = document.getElementById('instructionWrap')
const gameContainer = document.getElementById('gameContainer');

// buttons
const startBtn = document.getElementById('startBtn');
const instructionBtn = document.getElementById('instructionBtn');
const closeBtn = document.getElementById('closeBtn');

// inputs
const usernameInput = document.getElementById('usernameInput');
const selectDifficulty = document.getElementById('selectDifficulty');

// play game
startBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    difficulty = parseInt(selectDifficulty.value, 10);
    const selectedGun = document.querySelector('input[name="gun"]:checked')?.value;
    const selectedTarget = document.querySelector('input[name="target"]:checked')?.value;

    if (username.trim() === '') {
        alert('Please enter your username')
        return;
    }

    if (!difficulty) {
        alert('Please select a level')
        return;
    }

    if (!selectedGun) {
        alert('Please select gun')
        return;
    }

    if (!selectedTarget) {
        alert('Please select target')
        return;
    }

    mainMenu.style.display = 'none';
    gameContainer.style.display = 'flex';

    startGame({
        gun: selectedGun,
        target: selectedTarget
    });
})

// see instruction
instructionBtn.addEventListener('click', () => {
    instructionMenu.style.display = 'flex';
})

// close instruction
closeBtn.addEventListener('click', () => {
    instructionMenu.style.display = 'none';
})

