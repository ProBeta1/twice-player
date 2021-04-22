const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

const songs = ["scorpion", "kurakura"];

let songId = 0;

loadSong(songs[songId]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpeg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

function prevSong() {
  songId -= 1;
  if (songId < 0) songId = songs.length - 1;
  loadSong(songs[songId]);
  playSong();
}

function nextSong() {
  songId += 1;
  if (songId === songs.length) songId = 0;
  loadSong(songs[songId]);
  playSong();
}

function updateProgress(e) {
  const total = e.srcElement.duration;
  const current = e.srcElement.currentTime;

  const perc = (current / total) * 100;

  progress.style.width = `${perc}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const X = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (X / width) * duration;
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
