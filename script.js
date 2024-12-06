
    function playSong() {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.play();
    }

    document.addEventListener('DOMContentLoaded', () => {
        const audioPlayer = document.getElementById('audioPlayer');
        const musicScrubber = document.getElementById('musicScrubber');
    
        // Play a Song
        document.querySelectorAll('.btn-success').forEach((button) => {
            button.addEventListener('click', () => {
                audioPlayer.play();
            });
        });
    
        // Play/Pause Toggle
        document.querySelector('.playback-bar .btn-success').addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        });
    
        // Update Scrubber Position
        audioPlayer.addEventListener('timeupdate', () => {
            const duration = audioPlayer.duration || 1;
            const currentTime = audioPlayer.currentTime || 0;
            musicScrubber.value = (currentTime / duration) * 100;
        });
    
        // Seek Audio Position
        musicScrubber.addEventListener('input', (event) => {
            const duration = audioPlayer.duration || 0;
            audioPlayer.currentTime = (event.target.value / 100) * duration;
        });
    
        // Change Volume
        document.querySelectorAll('input[type="range"]').forEach((volumeSlider) => {
            volumeSlider.addEventListener('input', (event) => {
                audioPlayer.volume = event.target.value / 100;
            });
        });
    });

    