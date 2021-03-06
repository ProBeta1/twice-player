const header = document.querySelector(".heading");
const musicContainer = document.querySelector(".music-container");
const dj1 = document.querySelector("#dj1");
const dj2 = document.querySelector("#dj2");
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

const songs = ["scorpion", "kurakura", "drum", "sham", "aaoge"];
const songHeaders = [
  "Over night, over night ... kitto itsuka wa I will find you ..",
  "Lose control of my heart and soul (Magic)...",
  "Dum, dee-dum-dum ... Watch the drum go dum ..",
  "Ke boom-boom-boom para.. para...Hai khamosh dono",
  "Barsega saawan jhoom jhoom ke",
];

let songId = 2;

initialHeaderSet();

function initialHeaderSet() {
  header.innerText = "Welcome to my world";
}

loadSong(songs[songId], songHeaders[songId]);

function loadSong(song, songHeader) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  audio.preload = "auto";
  audio.loop = true;
  cover.src = `images/${song}.jpeg`;
}

function startBeats() {
  musicBars.classList.remove("smoothen");
  musicBars.classList.add("play");
  musicContainer.classList.add("play");
  dj1.classList.add("play");
  dj2.classList.add("play");
}

async function startTheSong() {
  header.innerText = "Loading ...";
  await audio.play();
  setTimeout(startBeats, 2000);
  header.innerText = songHeaders[songId];
  header.classList.add("play");
}

function playSong() {
  musicBars.classList.remove("pause");
  musicBars.classList.add("smoothen");

  startTheSong();

  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
}
function pauseSong() {
  musicContainer.classList.remove("play");
  dj1.classList.remove("play");
  dj2.classList.remove("play");
  musicBars.classList.remove("play");
  musicBars.classList.add("pause");
  header.innerText = "Paused  :(";
  header.classList.remove("play");
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
