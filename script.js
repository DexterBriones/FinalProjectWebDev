let currentSongIndex = 0; // To keep track of the current song
const songs = [
    { 
        title: 'Chanel', 
        artist: 'Frank Ocean', 
        src: './songs/Chanel - Frank Ocean.mp3', 
        img: './images/frank.jpg', // Song cover image
        rightContentImg: './images/frankabout.jpg', // Image for the right content
        bio: 'Frank Ocean is an American singer, songwriter, and record producer known for his unique style and contribution to contemporary music.' 
    },
    { 
        title: 'Count Me Out', 
        artist: 'Kendrick Lamar', 
        src: './songs/Kendrick Lamar - Count Me Out.mp3', 
        img: './images/mr.morale.jpg', // Song cover image
        rightContentImg: './images/kendrickabout.webp', // Image for the right content
        bio: 'Kendrick Lamar is an American rapper, songwriter, and record producer, recognized for his introspective and socially aware lyricism.' 
    },
    { 
        title: 'One Call', 
        artist: 'Rich Amiri', 
        src: './songs/Rich Amiri - One Call.mp3', 
        img: './images/onecall.jpg', // Song cover
        rightContentImg: './images/richabout.jpg', // Image for the right content
        bio: 'Rich Amiri is an American rapper and music artist known for his contributions to the underground hip-hop scene. He gained recognition with his unique style and music, often blending elements of trap and cloud rap.' 
    },
    { 
        title: 'Ryd', 
        artist: 'Steve Lacy', 
        src: './songs/Ryd.mp3', 
        img: './images/rydcover.jpg', // Song cover
        rightContentImg: './images/steveabout.jpg', // Image for the right content
        bio: 'Steve Lacy is an American musician, singer, and producer, best known as the guitarist of The Internet and for his solo work blending R&B, funk, and soul.' 
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

// Event listener for scrubber updates
audioPlayer.addEventListener('timeupdate', updateScrubber);

// Event listener for scrubber seeking
scrubber.addEventListener('input', seekAudio);

// Event listener for volume changes
const volumeControl = document.getElementById('volumeControl'); // Assuming an input range with id="volumeControl"
volumeControl.addEventListener('input', changeVolume);

// Initialize the audio player on page load
initializePlayer();







// Add a song to liked songs in localStorage
function addToLikedSongs(song) {
    let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    // Check if the song is already liked
    if (!likedSongs.some(s => s.title === song.title && s.artist === song.artist)) {
        likedSongs.push(song);
        localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
    }
}
// Remove a song from liked songs in localStorage
function removeFromLikedSongs(songTitle) {
    let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    likedSongs = likedSongs.filter(song => song.title !== songTitle);
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
}

// Load liked songs for the Liked Songs page
function loadLikedSongs() {
    const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    const container = document.getElementById("likedSongsContainer");

    if (likedSongs.length === 0) {
        container.innerHTML = '<p class="text-white">No liked songs yet!</p>';
        return;
    }

    likedSongs.forEach(song => {
        const songCard = `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card bg-dark text-white">
                    <img src="${song.img}" class="card-img-top" alt="${song.title}">
                    <div class="card-body">
                        <h6 class="card-title">${song.title}</h6>
                        <p class="card-text">${song.artist}</p>
                        <button class="btn btn-danger btn-sm" onclick="removeFromLikedSongs('${song.title}'); loadLikedSongs();">Remove</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += songCard;
    });
}
function toggleLike() {
    const likeButton = document.getElementById("likeButton");
    const songTitle = document.getElementById("nowPlayingTitle").innerText;
    const songArtist = document.getElementById("nowPlayingArtist").innerText;
    const songImage = document.getElementById("nowPlayingImage").src;

    let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    const song = {
        title: songTitle,
        artist: songArtist,
        img: songImage
    };

    // Check if the song is already liked
    const isLiked = likedSongs.some(s => s.title === song.title && s.artist === song.artist);

    if (isLiked) {
        // Remove from liked songs
        removeFromLikedSongs(songTitle);
        likeButton.textContent = "♡"; // Update button to unlike
    } else {
        // Add to liked songs
        addToLikedSongs(song);
        likeButton.textContent = "♥"; // Update button to liked
    }
}
function playSong(src, title, artist, img) {
    audioPlayer.src = src;
    audioPlayer.play();
    document.getElementById('playPauseButton').textContent = '⏸';

    const songIndex = songs.findIndex(song => song.title === title && song.artist === artist);

    updateNowPlayingInfo(songIndex);

    // Update like button state
    const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    const isLiked = likedSongs.some(song => song.title === title && song.artist === artist);
    document.getElementById("likeButton").textContent = isLiked ? "♥" : "♡";
}

function loadLikedSongs() {
    const likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
    const container = document.getElementById("likedSongsContainer");

    // Clear the container to avoid duplication
    container.innerHTML = "";

    if (likedSongs.length === 0) {
        container.innerHTML = '<p class="text-white">No liked songs yet!</p>';
        return;
    }

    likedSongs.forEach(song => {
        const songCard = `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card bg-dark text-white">
                    <img src="${song.img}" class="card-img-top" alt="${song.title}">
                    <div class="card-body">
                        <h6 class="card-title">${song.title}</h6>
                        <p class="card-text">${song.artist}</p>
                        <button class="btn btn-danger btn-sm" onclick="removeFromLikedSongs('${song.title}'); loadLikedSongs();">Remove</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += songCard;
    });
}
