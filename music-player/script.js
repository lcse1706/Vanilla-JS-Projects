const title = document.querySelector('.info');
const cover = document.querySelector('.cover');
const audio = document.getElementById('audio');
const musicContainer = document.querySelector('.music-container');
const prevBtn = document.querySelector('.action-button.prev');
const playBtn = document.querySelector('.action-button.play');
const nextBtn = document.querySelector('.action-button.next');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 0;

loadSong(songIndex);

function loadSong(songIndex) {
  title.innerText = `${songs[songIndex]}`;
  cover.src = `images/${songs[songIndex]}.jpg`;
  audio.src = `music/${songs[songIndex]}.mp3`;
}

function handlePrevBtn() {
  songIndex === 0 ? (songIndex = songs.length - 1) : (songIndex -= 1);
  loadSong(songIndex);
  audio.play();
}

function handlePlayBtn() {
  if (musicContainer.classList.contains('play')) {
    musicContainer.classList.remove('play');
    playBtn.querySelector('.fas').classList.remove('fa-pause');
    playBtn.querySelector('.fas').classList.add('fa-play');
    audio.pause();
  } else {
    musicContainer.classList.add('play');
    playBtn.querySelector('.fas').classList.remove('fa-play');
    playBtn.querySelector('.fas').classList.add('fa-pause');
    audio.play();
  }
}

function handleNextBtn() {
  songIndex === songs.length - 1 ? (songIndex = 0) : (songIndex += 1);
  loadSong(songIndex);
  audio.play();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressBar = (100 * currentTime) / duration;
  progress.style.width = `${progressBar}%`;
}

function handleProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click', handlePrevBtn);
playBtn.addEventListener('click', handlePlayBtn);
nextBtn.addEventListener('click', handleNextBtn);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', handleProgress);
audio.addEventListener('ended', handleNextBtn);
