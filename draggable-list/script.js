const draggable_list = document.getElementById('draggable-list');

const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

const listItems = [];

let dragStartIndex;
let dragEndIndex;

createList();

function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable = "true">
            <p class="person-name"> ${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter() {
  this.classList.add('over');
}
function dragLeave() {
  this.classList.remove('over');
}
function dragDrop() {
  console.log('drop');
  dragEndIndex = +this.closest('li').getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function swapItems(firstIndex, secondIndex) {
  const itemOne = listItems[firstIndex].querySelector('.draggable');
  const itemTwo = listItems[secondIndex].querySelector('.draggable');

  listItems[firstIndex].appendChild(itemTwo);
  listItems[secondIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.person-name').innerText.trim();

    if (personName === richestPeople[index]) {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    } else {
      listItem.classList.remove('right');
      listItem.classList.add('wrong');
    }
  });
}

function addEventListeners() {
  const items = document.querySelectorAll('.draggable-list li');

  items.forEach((item) => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);
