const cardsContainer = document.querySelector('.cards-container');
const currentValue = document.querySelector('.current');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const showBtn = document.querySelector('.show');
const hideBtn = document.querySelector('.hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.querySelector('.add-card');
const clearBtn = document.querySelector('.clear');
const addContainer = document.querySelector('.add-container');

let currentActiveCard = 0;
const cardsEl = [];

const cardsData = getDataFromLocalStorage();
// const cardsData = [
//   {
//     question: 'What is variable ?',
//     answer: 'Container for a piece of data.',
//   },
//   {
//     question: ' What doeas case sensitive mean ?',
//     answer: 'Sensitivity on upper and lowercase',
//   },
// ];

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create single card in DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
        <div class="inner-card">
          <div class="inner-card-front">
            <p>${data.question}</p>
          </div>
          <div class="inner-card-back">
            <p>${data.answer}</p>
          </div>
        </div>
  `;

  card.addEventListener('click', () => {
    card.classList.toggle('show-answer');
  });

  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCardNumber();
}

function getDataFromLocalStorage() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

function setCardsToLocalStorage(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

function updateCardNumber() {
  currentValue.innerHTML = `
        ${currentActiveCard + 1}/${cardsData.length}
    `;
}

function prevCard() {
  cardsEl[currentActiveCard].className = 'card';
  currentActiveCard -= 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCardNumber();
}

function nextCard() {
  cardsEl[currentActiveCard].className = 'card left';
  currentActiveCard += 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCardNumber();
}

function addCard() {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    // const card = { question : question, answer: answer};
    const card = { question, answer };

    createCards(card);
    questionEl.value = '';
    answerEl.value = '';
    addContainer.classList.remove('show');

    cardsData.push(card);
    setCardsToLocalStorage(cardsData);
  }
}
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
});
showBtn.addEventListener('click', () => addContainer.classList.add('show'));
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));
addCardBtn.addEventListener('click', addCard);
prevBtn.addEventListener('click', prevCard);
nextBtn.addEventListener('click', nextCard);
