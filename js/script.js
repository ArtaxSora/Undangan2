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
const playPauseButton = document.getElementById("playPauseButton");

// Fungsi untuk memulai atau menghentikan pemutaran musik
function togglePlayPause() {
    if (bgMusic.paused) {
        bgMusic.play();
        playPauseButton.classList.remove("play");
        playPauseButton.classList.add("pause");
        playPauseButton.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.pause();
        playPauseButton.classList.remove("pause");
        playPauseButton.classList.add("play");
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

// Menambahkan event listener pada tombol play/pause
playPauseButton.addEventListener("click", togglePlayPause);


function countdown() {
    var targetDate = new Date("2023-12-16T08:00:00"); // Contoh: 31 Desember 2023, pukul 10:30
    var now = new Date();
    var timeLeft = targetDate - now;

    if (timeLeft < 0) {
        document.getElementById("countdown").innerHTML = "Selamat menikah!";
    } else {
        var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML = days + " hari, " + hours + " jam, " + minutes + " menit, " + seconds + " detik";
        setTimeout(countdown, 1000);
    }
}

window.onload = function () {
    countdown();
};


var senders = [];

// Konfigurasi pagination
var itemsPerPage = 2;
var currentPage = 1;

document.getElementById("greetingForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    var attendance = document.getElementById("attendance").value;

    var sender = {
        name: name,
        message: message,
        attendance: attendance
    };

    senders.unshift(sender);

    saveSenderInfo();

    displaySenderInfo();

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    document.getElementById("attendance").value = "Hadir";
});

function saveSenderInfo() {
    localStorage.setItem("senders", JSON.stringify(senders));
}

function displaySenderInfo() {
    var senderInfoElement = document.getElementById("senderInfo");
    senderInfoElement.innerHTML = "";

    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var paginatedSenders = senders.slice(startIndex, endIndex);

    if (paginatedSenders.length > 0) {
        paginatedSenders.forEach(function (sender) {
            var senderMessageElement = document.createElement("div");
            senderMessageElement.classList.add("sender-message");
            senderMessageElement.innerHTML = "<h3>Pengirim Kartu Ucapan:</h3>" +
                "<p><strong>Nama:</strong> " + sender.name + "</p>" +
                "<p><strong>Kata Ucapan:</strong></p>" +
                "<p>" + sender.message.replace(/\n/g, "<br>") + "</p>" +
                "<p><strong>Keterangan Hadir:</strong> " + sender.attendance + "</p>";

            senderInfoElement.appendChild(senderMessageElement);
        });
    }

    senderInfoElement.style.display = "block";

    displayPagination();
}

function loadSenderInfo() {
    var storedSenders = localStorage.getItem("senders");

    if (storedSenders) {
        senders = JSON.parse(storedSenders);
        displaySenderInfo();
    }
}

function displayPagination() {
    var paginationElement = document.getElementById("pagination");
    paginationElement.innerHTML = "";

    var totalPages = Math.ceil(senders.length / itemsPerPage);

    if (totalPages > 1) {
        var ul = document.createElement("ul");
        ul.classList.add("pagination");

        for (var i = 1; i <= totalPages; i++) {
            var li = document.createElement("li");
            li.classList.add("page-item");
            li.innerHTML = '<a class="page-link" href="#">' + i + '</a>';

            if (i === currentPage) {
                li.classList.add("active");
            }

            li.addEventListener("click", function (event) {
                event.preventDefault();
                currentPage = parseInt(event.target.innerHTML);
                displaySenderInfo();
            });

            ul.appendChild(li);
        }

        paginationElement.appendChild(ul);
    }
}

// Memanggil fungsi untuk menampilkan data pengirim saat halaman dimuat
loadSenderInfo();