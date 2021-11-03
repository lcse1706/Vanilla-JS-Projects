const word = document.getElementById('word');

const wordContainer = ['programming', 'frontEnd'];

let correctLetters = [];
let wrogLetters = [];

const selectedWord =
  wordContainer[Math.floor(Math.random() * wordContainer.length)];

function displayWord() {
  word.innerHTML = ` ${selectedWord
    .split('')
    .map(
      (letter) => `
        <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </span>
       `
    )
    .join('')}
    `;
}

displayWord();
