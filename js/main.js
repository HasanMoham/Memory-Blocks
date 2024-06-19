document.getElementById('start-game-btn').onclick = function () {
  let playerName = document.getElementById('player-name').value.trim();
  if (!playerName) {
    alert("Please enter your name.");
    return;
  }

  let selectedLevel = document.getElementById('level-select').value;
  let gameDuration = 0; // in seconds

  switch (selectedLevel) {
    case 'easy':
      gameDuration = 5 * 60; // 5 minutes
      break;
    case 'medium':
      gameDuration = 2 * 60 + 30; // 2 minutes 30 seconds
      break;
    case 'hard':
      gameDuration = 1 * 60 + 30; // 1 minute 30 seconds
      break;
    default:
      alert("Invalid level selection. Please choose Easy, Medium, or Hard.");
      return; // Exit function if level selection is invalid
  }

  startGame(playerName, selectedLevel, gameDuration);
};

let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);

let timerInterval;
let timerDisplay = document.getElementById('timer');
let triesElement = document.querySelector('.tries span');
let playerNameDisplay = document.querySelector('.name span');
let selectedLevelDisplay = document.getElementById('selected-level');

function startGame(playerName, selectedLevel, duration) {
  // Display player name
  playerNameDisplay.textContent = playerName;

  // Display chosen level
  selectedLevelDisplay.textContent = selectedLevel;

  // Remove splash screen
  document.querySelector(".control-buttons").remove();

  // Shuffle the blocks
  shuffle(blocks);

  // Append shuffled blocks back to the container
  blocks.forEach(block => blocksContainer.appendChild(block));

  // Show all blocks for 5 seconds
  blocks.forEach(block => block.classList.add('is-flipped'));
  
  setTimeout(() => {
    blocks.forEach(block => block.classList.remove('is-flipped'));

    // Enable card flipping
    blocks.forEach((block) => {
      block.addEventListener('click', function () {
        flipBlock(block);
      });
    });

    // Start countdown timer
    startTimer(duration);
  }, 4000); // 5000ms = 5 seconds
}

function startTimer(duration) {
  let timer = duration, minutes, seconds;
  timerInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(timerInterval);
      // Handle end of game logic here
      alert("Time's up!");
    }
  }, 1000);
}

function flipBlock(selectedBlock) {
  selectedBlock.classList.add('is-flipped');

  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add('no-clicking');
  setTimeout(() => {
    blocksContainer.classList.remove('no-clicking');
  }, 1000);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');
    document.getElementById('success').play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');
    }, 1000);
    document.getElementById('fail').play();
  }
}

function shuffle(array) {
  let current = array.length, temp, random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
