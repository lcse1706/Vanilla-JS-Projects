const list = document.getElementById('list');
const income = document.getElementById('money-plus');
const expense = document.getElementById('money-minus');
const balance = document.getElementById('balance');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
];

const transactions = dummyTransactions;

function uppdateValues() {
  const amounts = transactions.map((trans) => trans.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  const inc = amounts
    .filter((num) => num > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const exp =
    amounts
      .filter((num) => num < 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2) * -1;

  balance.innerHTML = `$${total}`;
  income.innerHTML = `+$${inc}`;
  expense.innerHTML = `-$${exp}`;
}

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
  uppdateValues();
}

startApp();
