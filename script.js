let currentSongIndex = 0; // To keep track of the current song
const songs = [
    { 
        title: 'Chanel', 
        artist: 'Frank Ocean', 
        src: '/songs/Chanel - Frank Ocean.mp3', 
        img: '/images/frank.jpg', // Song cover image
        rightContentImg: '/images/frankabout.jpg', // Image for the right content
        bio: 'Frank Ocean is an American singer, songwriter, and record producer known for his unique style and contribution to contemporary music.' 
    },
    { 
        title: 'Count Me Out', 
        artist: 'Kendrick Lamar', 
        src: '/songs/Kendrick Lamar - Count Me Out.mp3', 
        img: '/images/mr.morale.jpg', // Song cover image
        rightContentImg: '/images/kendrickabout.webp', // Image for the right content
        bio: 'Kendrick Lamar is an American rapper, songwriter, and record producer, recognized for his introspective and socially aware lyricism.' 
    },
    { 
        title: 'One Call', 
        artist: 'Rich Amiri', 
        src: '/songs/Rich Amiri - One Call.mp3', 
        img: '/images/onecall.jpg', // Song cover
        rightContentImg: '/images/richabout.jpg', // Image for the right content
        bio: 'Rich Amiri is an American rapper and music artist known for his contributions to the underground hip-hop scene. He gained recognition with his unique style and music, often blending elements of trap and cloud rap.' 
    },
    { 
        title: 'Ryd', 
        artist: 'Steve Lacy', 
        src: '/songs/Ryd.mp3', 
        img: '/images/rydcover.jpg', // Song cover
        rightContentImg: '/images/steveabout.jpg', // Image for the right content
        bio: 'Artist bio goes here.' 
    }
];

const audioPlayer = document.getElementById('audioPlayer');
const scrubber = document.getElementById('musicScrubber');
let isPlaying = false; // Ensure this is declared globally

// Initialize the audio player
function initializePlayer() {
    audioPlayer.src = songs[currentSongIndex].src;
    updateNowPlayingInfo(currentSongIndex);
}

// Play the next song in the array
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0; // Go back to the first song if we're at the end
    }
    playSong(songs[currentSongIndex].src, songs[currentSongIndex].title, songs[currentSongIndex].artist, songs[currentSongIndex].rightContentImg);
}

// Play the previous song in the array
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1; // Go back to the last song if we're at the beginning
    }
    playSong(songs[currentSongIndex].src, songs[currentSongIndex].title, songs[currentSongIndex].artist, songs[currentSongIndex].rightContentImg);
}

// Play the song and update the content
function playSong(src, title, artist, img) {
    audioPlayer.src = src; // Set the song source
    audioPlayer.play();    // Start playing the song
    document.getElementById('playPauseButton').textContent = '⏸'; // Update button to Pause

    // Find the song index based on the title
    const songIndex = songs.findIndex(song => song.title === title && song.artist === artist);

    // Update right content dynamically
    updateNowPlayingInfo(songIndex); // Update the main and right content
}
    
function updateNowPlayingInfo(index) {
    document.getElementById('nowPlayingTitle').textContent = songs[index].title;
    document.getElementById('nowPlayingArtist').textContent = songs[index].artist;
    document.getElementById('nowPlayingImage').src = songs[index].img;
    
    // Update right content dynamically with separate image
    document.getElementById('artistName').textContent = songs[index].artist;
    document.getElementById('artistBio').textContent = songs[index].bio;
    document.getElementById('albumArt').src = songs[index].rightContentImg; // Use the separate image for the right content
}

// Update the scrubber as the audio plays
function updateScrubber() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    scrubber.value = progress;
}

// Pause the song
function pauseSong() {
    audioPlayer.pause();
    document.getElementById('playPauseButton').textContent = '⏯'; // Update button to Play
}

let isButtonClicking = false; // Prevent multiple rapid clicks on the button

// Toggle between play and pause
function togglePlay() {
    console.log("Toggle play button pressed"); // Debugging line to confirm button press

    // Prevent multiple button presses in quick succession
    if (isButtonClicking) return;

    isButtonClicking = true; // Set to true to block further clicks for a short time

    setTimeout(function() {
        isButtonClicking = false; // Reset after a short delay
    }, 300);  // 300ms delay to prevent rapid clicks

    console.log("Audio paused state: ", audioPlayer.paused); // Debugging to check if audio is paused or playing

    if (audioPlayer.paused) {  // Check if audio is paused
        audioPlayer.play();    // Play the audio
        document.getElementById('playPauseButton').textContent = '⏸'; // Update button to Pause
        console.log("Audio is playing now"); // Debugging line to confirm audio is playing
    } else { 
        audioPlayer.pause();   // Pause the audio
        document.getElementById('playPauseButton').textContent = '⏯'; // Update button to Play
        console.log("Audio is paused now"); // Debugging line to confirm audio is paused
    }

    // Prevent double toggling by adding a slight delay after each action
    setTimeout(function() {
        console.log("Button state has been updated."); // Debugging line to confirm delay handling
    }, 100);
}

// Additional debugging to ensure audio can play again after pause
audioPlayer.addEventListener('pause', function() {
    console.log('Audio has been paused.');
});

audioPlayer.addEventListener('play', function() {
    console.log('Audio is now playing.');
});




// Change the volume of the audio player
function changeVolume(value) {
    audioPlayer.volume = value / 100;  // Volume value should be between 0 and 1
}

// Seek the audio position based on the scrubber value
function seekAudio(value) {
    const seekTime = (value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
}

// Event listeners for Next, Previous, and Play/Pause buttons
document.getElementById('nextButton').addEventListener('click', nextSong);
document.getElementById('prevButton').addEventListener('click', prevSong);

// Event listener for Play/Pause button
document.getElementById('playPauseButton').addEventListener('click', togglePlay);

// Initialize the audio player on page load
initializePlayer();
