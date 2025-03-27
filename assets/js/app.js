

const body = document.querySelector("body");


const infoContainer = document.createElement("div");
infoContainer.style.display = "flex";
infoContainer.style.display = "none"; // Initially hidden
infoContainer.style.flexDirection = "column";
infoContainer.style.justifyContent = "center";
infoContainer.style.alignItems = "center";
infoContainer.style.backgroundColor = "#6A5ACD";
infoContainer.style.fontSize = "15px";
infoContainer.style.position = "fixed"; // Changed to fixed
infoContainer.style.top = "50%";
infoContainer.style.left = "50%";
infoContainer.style.transform = "translate(-50%, -50%)"; // Center the container
infoContainer.style.height = "50%";
infoContainer.style.width = "35%";
infoContainer.style.zIndex = "1000"; // Ensure it appears in front of other elements
body.appendChild(infoContainer);

const buttonContainer = document.createElement("div");
buttonContainer.style.display = "flex";
buttonContainer.style.justifyContent = "center";
buttonContainer.style.marginTop = "20px";
buttonContainer.style.gap = "10px";

const prevButton = document.createElement("button");
prevButton.innerHTML = "Previous";
prevButton.style.backgroundColor = "#9370DB"; 
buttonContainer.appendChild(prevButton);
prevButton.addEventListener("click", previousSong);
prevButton.addEventListener("click", imgSize);

const infoButton = document.createElement("button");
infoButton.innerHTML = "Info";
infoButton.style.backgroundColor = "#9370DB";
buttonContainer.appendChild(infoButton);
infoButton.addEventListener("click", showInfo);

const playButton = document.createElement("button");
playButton.innerHTML = "Play";
playButton.style.backgroundColor = "#9370DB";
buttonContainer.appendChild(playButton);
playButton.addEventListener("click", removeButton);
playButton.addEventListener("click", playSong);
playButton.addEventListener("click", imgSize);

const stopButton = document.createElement("button");
stopButton.innerHTML = "Stop";
stopButton.style.backgroundColor = "#9370DB";
stopButton.style.display = "none"; // Initially hidden
buttonContainer.appendChild(stopButton);
stopButton.addEventListener("click", showButton);
stopButton.addEventListener("click", stopSong);

const nextButton = document.createElement("button");
nextButton.innerHTML = "Next";
nextButton.style.backgroundColor = "#9370DB";
buttonContainer.appendChild(nextButton);
nextButton.addEventListener("click", nextSong);
nextButton.addEventListener("click", imgSize);

function showInfo() {
    if (infoContainer.style.display === "none") {
        const song = sanger[currentSongIndex];
        infoContainer.innerHTML = `
            <p><strong>Song:</strong> ${song.name}</p>
            <p><strong>Artist:</strong> ${song.artist}</p>
            <p><strong>Type:</strong> ${song.type}</p>
            <p><strong>Year:</strong> ${song.year}</p>
            <p><strong>Nation:</strong> ${song.nation}</p>
            <p><strong>Info:</strong> ${song.beskrivelse}</p>
        `;

        infoContainer.style.display = "flex";
        body.appendChild(infoContainer);
    } else {
        infoContainer.style.display = "none";
    }
}

body.appendChild(buttonContainer);

function showButton() {
    stopButton.style.display = "none";
    buttonContainer.appendChild(playButton);
    buttonContainer.appendChild(nextButton);
}

function removeButton() {
    buttonContainer.removeChild(playButton);
    stopButton.style.display = "block";
}

let currentSongIndex = 0;
let currentTime = 0;

function playSong() {
    const lyd = document.querySelector("#lyd");
    const audio1 = sanger.map(song => new Audio(song.sound));
    
    if (currentSongIndex === 0 && currentTime === 0) {
        lyd.innerHTML = `<audio id="audio" controls type="audio/mp3" src="${audio1[currentSongIndex].src}" autoplay></audio>`;
        const audioElement = document.getElementById("audio");
        audioElement.play();
    } else {
        const audioElement = document.getElementById("audio");
        audioElement.src = audio1[currentSongIndex].src;
        audioElement.currentTime = currentTime; // Set the current time to resume from where it left off
        audioElement.play();
    }
}

function stopSong() {
    const audioElement = document.getElementById("audio");
    currentTime = audioElement.currentTime; // Save the current time
    audioElement.pause();
}

function nextSong() {
    if (currentSongIndex < sanger.length - 1) {
        currentSongIndex++;
        currentTime = 0;
        playSong();
    }
}

function previousSong() {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        currentTime = 0;
        playSong();
    }
}

// Add audio tag to each songDiv
sanger.slice(0, 5).forEach((song, index) => {
    const songDiv = document.getElementById(`sang${index + 1}`);
    songDiv.innerHTML = `
        <img src="../img/${song.bilde}" alt="${song.name}" style="width: 200px; height: 200px;" />
        <h4>${song.name}</h4>
        <p>${song.artist}</p>
        <audio id="audio${index}" controls type="audio/mp3" src="${song.sound}"></audio>
    `;
});

// Import sanger from JSON file
import sanger from "../json/sanger.json" with {type:"json"};

console.log(sanger);

sanger.slice(0, 5).forEach((song, index) => {
    const songDiv = document.getElementById(`sang${index + 1}`);
    songDiv.innerHTML = `
        <img src="../img/${song.bilde}" alt="${song.name}" style="width: 200px; height: 200px;" />
        <h4>${song.name}</h4>
        <p>${song.artist}</p> 
    `;
});



function imgSize() {
    sanger.slice(0, 5).forEach((song, index) => {
        const songDiv = document.getElementById(`sang${index + 1}`);
        const img = songDiv.querySelector("img"); // Select the existing <img> element

        if (index === currentSongIndex) {
            // Apply larger size for the current song
            img.style.width = "250px";
            img.style.height = "250px";
        } else {
            // Reset size for other songs
            img.style.width = "200px";
            img.style.height = "200px";
        }

        // Ensure the transition is applied
        img.style.transition = "all 0.5s ease";
    });
}

function startSize() {
    const firstSongDiv = document.getElementById("sang1");
    const firstImg = firstSongDiv.querySelector("img"); // Select the <img> element of the first song

    // Apply larger size for the first song
    firstImg.style.width = "250px";
    firstImg.style.height = "250px";

    // Ensure the transition is applied
    firstImg.style.transition = "all 0.5s ease";
}

startSize();