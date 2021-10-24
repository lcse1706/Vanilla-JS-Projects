const moviePick = document.querySelector('#movie');
const showCase = document.querySelector('.showcase');
const seatsContainer = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');

//price of movie
let moviePrice = moviePick.value;


function markSeats(e) {
    if(e.target.matches('.seat') && !e.target.matches('.occupied')){
        e.target.classList.toggle('selected')
        countPrice();
    }
}


seatsContainer.addEventListener('click', (e) => markSeats(e))



// document.addEventListener('click', (e) => {
//     console.log(e.target);
// })