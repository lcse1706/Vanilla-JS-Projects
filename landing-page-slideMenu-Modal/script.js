const menuBtn = document.getElementById('toggle');
const body = document.querySelector('body');
const register = document.getElementById('open');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close');

function removeModal() {
  modal.classList.remove('open');
}

menuBtn.addEventListener('click', () => {
  body.classList.toggle('showNav');
});

register.addEventListener('click', () => {
  modal.classList.add('open');
});

closeModal.addEventListener('click', removeModal);
modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-container')) {
    removeModal();
  }
});
