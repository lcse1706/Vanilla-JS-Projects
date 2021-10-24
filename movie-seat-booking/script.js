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

    //populate movie, numebr of seats, price
    [...moviePick.options].forEach((option) => {    
        if (option.value === restoredMovie){      
            moviePick.options.selectedIndex = option.index;
            moviePrice = moviePick.value;
        }  
    })
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
    localStorage.setItem('pickedMovie', moviePick.value)
}

function updateData() {
    
    const selectedSeats = seatsContainer.querySelectorAll('.selected');
    moviePick.addEventListener('change', () => {
        moviePrice = moviePick.value; 
        storageData(selectedSeats);
        updateData();
        
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
updateData();
