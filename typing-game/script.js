const word = document.querySelector('.word');
const time = document.querySelector('.time');
const gameContainer = document.querySelector('.game-container');
const endgameContainer = document.querySelector('.endgame-container');
const scoreDisplay = document.querySelector('.score');
const input = document.querySelector('.typeWord');
const total = document.querySelector('.total');
const difficulty = document.getElementById('difficulty');
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

let startTime = 10;
let score = 0;
let currentWord = '';
let difficultyTime = 5;
let timer;

function drawIndex() {
  return Math.floor(Math.random() * words.length);
}

function showWord() {
  currentWord = words[drawIndex()];
  word.innerText = currentWord;
}

function endgame() {
  total.innerText = score;
  gameContainer.style.display = 'none';
  endgameContainer.style.display = 'flex';
  clearInterval(timer);
}

function setTime() {
  timer = setInterval(() => {
    startTime -= 1;
    time.innerText = `${startTime}s`;
    if (startTime < 0) {
      endgame(timer);
    }
  }, 1000);
}

function countingScore() {
  score += 10;
  scoreDisplay.innerText = score;
}

function checkWord() {
  if (input.value === currentWord) {
    startTime += difficultyTime;
    startTime > 10 ? (startTime = 10) : startTime;
    time.innerText = `${startTime}s`;
    input.value = '';
    countingScore();
    clearInterval(timer);
    setTime();
    showWord();
  }
}

showWord();
setTime();

input.addEventListener('input', checkWord);
difficulty.addEventListener('change', () => {
  if (difficulty.value === 'hard') {
    difficultyTime = 2;
  } else if (difficulty.value === 'medium') {
    difficultyTime = 3;
  } else {
    difficultyTime = 5;
  }

  console.log(difficulty.value);
});
