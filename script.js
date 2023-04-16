const music = document.querySelector("audio");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const image = document.querySelector("img");
const titel = document.getElementById("title");
const artist = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const durationEl = document.querySelector(".duration");
const currentTimeEl = document.querySelector(".current-time");

const songs = [
  {
    name: "jacinto-1",
    artistName: "Sandeep",
    sTitel: "Solo machine",
  },
  {
    name: "jacinto-2",
    artistName: "Erty jeo",
    sTitel: "Remix machine",
  },
  {
    name: "jacinto-3",
    artistName: "Louty Neo",
    sTitel: "Motivate remix chill machine",
  },
  {
    name: "metric-1",
    artistName: "Jantico/neo plasy",
    sTitel: "Metric song Machine",
  },
 
  {
    name: "m2",
    artistName: "Artists",
    sTitel: "Krishna Bhajan",
  },
  {
    name: "m3",
    artistName: "Artists",
    sTitel: "Krishna Bhajan",
  },
  {
    name: "m4",
    artistName: "Artists",
    sTitel: "Krishna Bhajan",
  },
  {
    name: "m5",
    artistName: "Artists",
    sTitel: "Krishna Bhajan",
  },
  {
    name: "m6",
    artistName: "Artists",
    sTitel: "Krishna Bhajan",
  },
  {
    name: "m7",
    artistName: "Artists",
    sTitel: "Krishna Bhajan",
  },
];

//check the song is playing
let isPlaying = false;

//play the song

function playSong() {
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  isPlaying = true;
  music.play();
}

//pause the song
function pauseSong() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  isPlaying = false;
  music.pause();
}

// playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong));
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

//uplaod dom

const loadSong = (song) => {
  titel.textContent = song.sTitel;
  artist.textContent = song.artistName;
  image.src = `./img/${song.name}.jpg`;
  music.src = `./music/${song.name}.mp3`;
};

//current index of the song
let currentIndex = 0;
loadSong(songs[currentIndex]);

//next song
const nextSong = () => {
  currentIndex++;
  if (currentIndex > songs.length - 1) {
    currentIndex = 0;
  }
  loadSong(songs[currentIndex]);
  console.log(currentIndex);
  playSong();
};

//prev song
const prevSong = () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = songs.length - 1;
  }
  loadSong(songs[currentIndex]);
  playSong();
  console.log(currentIndex);
};

//next song and prev song on click
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

//progress update
const progressUpdate = (e) => {
  if (isPlaying) {
    console.log(e);
    const { currentTime, duration } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //calculate display for duration
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    //after delay show the duration
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    //change the current time
    //calculate display for current
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    //after delay show the current

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

//progress bar

//update when clicking the progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  const curr = (clickX / width) * duration;
  music.currentTime = curr;
}

//progress container
progressContainer.addEventListener("click", setProgressBar);

music.addEventListener("timeupdate", progressUpdate);
music.addEventListener("ended", nextSong);
