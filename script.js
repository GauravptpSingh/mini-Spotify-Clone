console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/ram.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Mere ghar Ram aaye hai by T-series", filePath: "songs/1.mp3", coverPath: "covers/meregharram.jpg"},
    {songName: "Ram Siya Ram by Sachet tandon.....", filePath: "songs/2.mp3", coverPath: "covers/ramsiyaram.jpg"},
    {songName: "Most listen of Jubin-Nautiyal.....", filePath: "songs/3.mp3", coverPath: "covers/nautiyal.jpg"},
    {songName: "Most listen Song of Darshan-Rawal.", filePath: "songs/4.mp3", coverPath: "covers/darshanrawal.jpg"},
    {songName: "Best Song of Hansharaj-Raghuvanshi", filePath: "songs/5.mp3", coverPath: "covers/hansaraj.jpg"},
    {songName: "Most listen Song of Arijit-Singh..", filePath: "songs/6.mp3", coverPath: "covers/arijit.jpg"},
    {songName: "Most listen Song of Tuksi-Kumar...", filePath: "songs/7.mp3", coverPath: "covers/tulsikr.jpg"},
    {songName: "Best Song of Sachet-Parampara.....", filePath: "songs/8.mp3", coverPath: "covers/sachetparam.jpg"},
    {songName: "Most listen Song of Honey-Singh...", filePath: "songs/9.mp3", coverPath: "covers/honey.jpg"},
    {songName: "Most listen Song of Jass-manak lofi", filePath: "songs/10.mp3", coverPath: "covers/jass.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})