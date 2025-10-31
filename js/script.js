// Mengambil elemen overlay dan tombol masuk
const overlay = document.getElementById('overlay');
const enterButton = document.getElementById('enterButton');

enterButton.addEventListener('click', () => {
    // Memulai pemutaran musik saat tombol masuk diklik
    playMusic();
    // Memanggil fungsi hideOverlay() untuk menghilangkan overlay
    hideOverlay();
});

// Fungsi untuk menghilangkan overlay
function hideOverlay() {
    overlay.style.transform = 'translateY(-100%)';
}

function playMusic() {
    bgMusic.play();
}

const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.3;

// const playPauseButton = document.getElementById("playPauseButton");

// // Fungsi untuk memulai atau menghentikan pemutaran musik
// function togglePlayPause() {
//     if (bgMusic.paused) {
//         bgMusic.play();
//         playPauseButton.classList.remove("play");
//         playPauseButton.classList.add("pause");
//         playPauseButton.innerHTML = '<i class="fas fa-music"></i>';
//     } else {
//         bgMusic.pause();
//         playPauseButton.classList.remove("pause");
//         playPauseButton.classList.add("play");
//         playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
//     }
// }

// // Menambahkan event listener pada tombol play/pause
// playPauseButton.addEventListener("click", togglePlayPause);


