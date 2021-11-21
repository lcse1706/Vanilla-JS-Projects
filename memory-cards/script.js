const cardsContainer = document.querySelector('.cards-container');
const currentValue = document.querySelector('.current');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentActiveCard = 0;
const cardsEl = [];
const cardsData = [
  {
    question: 'What is variable ?',
    answer: 'Container for a piece of data.',
  },
  {
    question: ' What doeas case sensitive mean ?',
    answer: 'Sensitivity on upper and lowercase',
  },
];

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

prevBtn.addEventListener('click', prevCard);
nextBtn.addEventListener('click', nextCard);
