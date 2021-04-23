const header = document.querySelector(".heading");
const musicContainer = document.querySelector(".music-container");
const musicBars = document.querySelector(".music-bars");
const bar = document.querySelector(".bar");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// const equalizer = [
//   {
//     tranform: "translateY(100px) scale(2)",
//   },
//   {
//     tranform: "translateY(110px)",
//     offset: 0.2,
//   },
//   {
//     tranform: "translateY(120px)",
//     offset: 0.4,
//   },
//   {
//     tranform: "translateY(130px)",
//     offset: 0.6,
//   },
// ];

// cloneBars();

// function cloneBars() {
//   for (let i = 0; i < 10; i++) {
//     const newBar = document.createElement("div");
//     newBar.className = "bar";
//     newBar.animate(equalizer, { delay: 1200, iterations: Infinity });
//     musicBars.appendChild(newBar);
//   }
// }

const songs = ["scorpion", "kurakura", "drum"];
const songHeaders = [
  "Over night, over night ... kitto itsuka wa I will find you ..",
  "Lose control of my heart and soul (Magic)...",
  "Got no peak, I got no summit, I'm not average, I don't sum it",
];

let songId = 0;

loadSong(songs[songId], songHeaders[songId]);

function loadSong(song, songHeader) {
  title.innerText = song;
  header.innerText = songHeader;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpeg`;
}

function startBeats() {
  musicBars.classList.remove("smoothen");
  musicBars.classList.add("play");
}

function playSong() {
  musicContainer.classList.add("play");
  musicBars.classList.remove("pause");
  musicBars.classList.add("smoothen");
  setTimeout(startBeats, 2000);

  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  musicBars.classList.remove("play");
  musicBars.classList.add("pause");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

function prevSong() {
  songId -= 1;
  if (songId < 0) songId = songs.length - 1;
  loadSong(songs[songId], songHeaders[songId]);
  playSong();
}

function nextSong() {
  songId += 1;
  if (songId === songs.length) songId = 0;
  loadSong(songs[songId], songHeaders[songId]);
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
