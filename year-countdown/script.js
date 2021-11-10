const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const year = document.getElementById('year');
const countdown = document.getElementById('countdown');

const loading = document.getElementById('loading');

function handleCountdown() {
  const currentYear = new Date().getFullYear();
  const timeToNewYear = new Date(`January 1 ${currentYear + 1} 00:00:00`);
  const currentTime = new Date();
  const difference = timeToNewYear - currentTime;

  const d = Math.floor(difference / 1000 / 60 / 60 / 24);
  const h = Math.floor((difference / 1000 / 60 / 60) % 24);
  const m = Math.floor((difference / 1000 / 60) % 60);
  const s = Math.floor((difference / 1000) % 60);

  days.innerHTML = d < 10 ? '0' + d : d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
  year.innerHTML = currentYear;
}

setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

setInterval(handleCountdown, 1000);
