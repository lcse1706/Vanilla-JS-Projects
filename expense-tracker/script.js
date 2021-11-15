const list = document.getElementById('list');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
];

const transactions = dummyTransactions;

function addTransactionToDOM(transaction) {
  const sign = transaction.amount > 0 ? '+' : '-';

  const item = document.createElement('li');

  item.classList.add(`${transaction.amount > 0 ? 'plus' : 'minus'}`);

  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn">x</button>

    `;

  list.appendChild(item);
}

function startApp() {
  list.innerHTML = ``;
  transactions.forEach(addTransactionToDOM);
}

startApp();
