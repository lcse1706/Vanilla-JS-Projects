const selectedEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const selectedEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateResult = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
  const currencyOne = selectedEl_one.value;
  const currencyTwo = selectedEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[currencyTwo];
      rateResult.innerHTML = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

function swapCurrency() {
  const temp = selectedEl_one.value;
  selectedEl_one.value = selectedEl_two.value;
  selectedEl_two.value = temp;
  calculate();
}

//Events
selectedEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
selectedEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', swapCurrency);

calculate();
