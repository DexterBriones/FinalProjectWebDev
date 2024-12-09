// Playlist Data
const playlist = [
    { title: "White Ferrari", artist: "Frank Ocean", src: "/songs/White_Ferrari.mp3" },
    { title: "Song 2", artist: "Artist 2", src: "/songs/Song2.mp3" },
    { title: "Song 3", artist: "Artist 3", src: "/songs/Song3.mp3" },
];

// State Management
let currentSongIndex = 0;

// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const musicScrubber = document.getElementById('musicScrubber');
const playPauseButton = document.getElementById('playPauseButton');
const volumeControl = document.getElementById('volumeControl');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');
const nowPlaying = document.getElementById('nowPlaying'); // Optional UI for showing current song

// Play a Specific Song
function playSong(index) {
    if (index < 0 || index >= playlist.length) {
        console.error("Invalid song index.");
        return;
    }
    currentSongIndex = index;
    const song = playlist[currentSongIndex];
    audioPlayer.src = song.src;
    audioPlayer.play();
    updatePlayPauseButton(true);
    updateNowPlaying(song); // Update UI with the current song details
    console.log(`Now playing: ${song.title} by ${song.artist}`);
}

// Update Now Playing UI
function updateNowPlaying(song) {
    if (nowPlaying) {
        nowPlaying.textContent = `Now Playing: ${song.title} by ${song.artist}`;
    }
}

// Toggle Play/Pause
function togglePlay() {
    if (audioPlayer.paused || audioPlayer.ended) {
        audioPlayer.play();
        updatePlayPauseButton(true);
    } else {
        audioPlayer.pause();
        updatePlayPauseButton(false);
    }
}

// Play the Next Song
function playNext() {
    if (currentSongIndex < playlist.length - 1) {
        playSong(currentSongIndex + 1);
    } else {
        console.log("End of playlist reached.");
    }
}

// Play the Previous Song
function playPrevious() {
    if (currentSongIndex > 0) {
        playSong(currentSongIndex - 1);
    } else {
        console.log("Already at the first song.");
    }
}

// Update Play/Pause Button
function updatePlayPauseButton(isPlaying) {
    playPauseButton.innerHTML = isPlaying ? "⏸" : "⏯";
}

// Seek Audio Based on Scrubber Position
function seekAudio(value) {
    if (audioPlayer.duration) {
        audioPlayer.currentTime = (value / 100) * audioPlayer.duration;
    }
}

// Update Scrubber During Playback
function updateScrubber() {
    if (audioPlayer.duration) {
        musicScrubber.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
}

// Adjust Volume
function changeVolume(value) {
    audioPlayer.volume = value / 100;
}

// Event: Reset Player on Song End
audioPlayer.addEventListener('ended', () => {
    playNext(); // Automatically play the next song
});

// Event Listeners
audioPlayer.addEventListener('timeupdate', updateScrubber); // Update scrubber
musicScrubber.addEventListener('input', (e) => seekAudio(e.target.value)); // Scrubber input
volumeControl.addEventListener('input', (e) => changeVolume(e.target.value)); // Volume control
playPauseButton.addEventListener('click', togglePlay); // Play/pause button
nextButton.addEventListener('click', playNext); // Next button
prevButton.addEventListener('click', playPrevious); // Previous button

// Initialize Player
playSong(currentSongIndex);
