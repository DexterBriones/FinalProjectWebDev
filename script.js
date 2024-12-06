
    function playSong() {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.play();
    }

        const audioPlayer = document.getElementById('audioPlayer');
    const musicScrubber = document.getElementById('musicScrubber');

    // Play or Pause the Audio
    function togglePlay() {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    }

    // Seek Audio Position
    function seekAudio(value) {
        const duration = audioPlayer.duration || 0;
        audioPlayer.currentTime = (value / 100) * duration;
    }

    // Update Scrubber Position
    function updateScrubber() {
        const duration = audioPlayer.duration || 1;
        const currentTime = audioPlayer.currentTime || 0;
        musicScrubber.value = (currentTime / duration) * 100;
    }

    // Change Volume
    function changeVolume(value) {
        audioPlayer.volume = value / 100;
    }