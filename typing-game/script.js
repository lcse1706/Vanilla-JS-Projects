const word = document.querySelector('.word');
const time = document.querySelector('.time');
const gameContainer = document.querySelector('.game-container');
const endgameContainer = document.querySelector('.endgame-container');
const scoreDisplay = document.querySelector('.score');
const input = document.querySelector('.typeWord');
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

function drawIndex() {
  return Math.floor(Math.random() * words.length - 1);
}

function showWord() {
  currentWord = words[drawIndex()];
  word.innerText = currentWord;
}

function setTime() {
  const timer = setInterval(() => {
    startTime -= 1;
    time.innerText = `${startTime}s`;
    if (startTime < 0) {
      gameContainer.style.display = 'none';
      endgameContainer.style.display = 'flex';
      clearInterval(timer);
    }
  }, 1000);
}

function checkWord(e) {
  const buffor = e.value;
  //   if (e.value === currentWord) {
  //     console.log('ok');
  //   }

  console.log(currentWord, buffor);
}

showWord();
setTime();

input.addEventListener('input', checkWord);
