const moviePick = document.querySelector('#movie');
// const showCase = document.querySelector('.showcase');
const seatsContainer = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');

//price of movie
let moviePrice = moviePick.value;

function restoreData(){
    const restoredSeats = JSON.parse(localStorage.getItem('selectedSeatsIndex'));
    const restoredMovie = localStorage.getItem('pickedMovie');

    //populate seats
    seats.forEach( (seat, index) => {
        if (restoredSeats.includes(index)){
            seat.classList.add('selected');
        };
    })
}

function storageData(selectedSeats){
    //Saving index of seats
    const selectedSeatsIndex = [...selectedSeats].map( seat => 
        [...seats].indexOf(seat));

    localStorage.setItem('selectedSeatsIndex', JSON.stringify(selectedSeatsIndex));
    // localStorage.setItem('countSeats', count.innerText);        
    // localStorage.setItem('price', total.innerText);
    localStorage.setItem('pickedMovie', moviePick.value)
}

function updateData() {
    
    const selectedSeats = seatsContainer.querySelectorAll('.selected');

    moviePick.addEventListener('change', () => {
        moviePrice = moviePick.value; 
        updatePrice();
    })

    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * moviePrice;
    
    storageData(selectedSeats);
            
}


function markSeats(e) {
    if(e.target.matches('.seat') && !e.target.matches('.occupied')){
        e.target.classList.toggle('selected');
    }
    updateData();
}


seatsContainer.addEventListener('click', (e) => markSeats(e))

restoreData();

// document.addEventListener('click', (e) => {
//     console.log(e.target);
// })