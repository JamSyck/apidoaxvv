const audio = document.getElementById('audio');
const btnPlayPause = document.getElementById('play-pause');
const btnRewind = document.getElementById('rewind');
const btnForward = document.getElementById('forward');
const btnStop = document.getElementById("stop")
const btnRepeat = document.getElementById("repeat")
const currentTimeElement = document.getElementById('current-time');
const durationTimeElement = document.getElementById('duration-time');
const seekBar = document.getElementById('seek-bar');

// Función para formatear el tiempo en minutos:segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Función para pintar la barra de progreso
function updateSeekBar() {
    const percentage = (audio.currentTime / audio.duration) * 100;
    seekBar.style.background = `linear-gradient(to right, #fff93c 0%, #fff93c ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
    seekBar.value = audio.currentTime;
    currentTimeElement.textContent = formatTime(audio.currentTime);
}

// Cargar la duración total cuando el audio esté listo
audio.addEventListener('loadedmetadata', () => {
    durationTimeElement.textContent = formatTime(audio.duration);
    seekBar.max = audio.duration;
    btnPlayPause.disabled = false
});

// Actualizar la barra de progreso y el tiempo transcurrido
audio.addEventListener('timeupdate', () => {
    seekBar.value = audio.currentTime;
    currentTimeElement.textContent = formatTime(audio.currentTime);
    updateSeekBar()
});

// Reproducir/pausar el audio
btnPlayPause.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        btnPlayPause.className = 'bi bi-pause-circle';
        btnPlayPause.setAttribute('title', 'Pause')
    } else {
        audio.pause()
        btnPlayPause.className = 'bi bi-play-circle';
        btnPlayPause.setAttribute('title', 'Play')
    }
});

// Cambiar la posición de la canción al mover la barra de progreso
seekBar.addEventListener('input', () => {
    audio.currentTime = seekBar.value;
    updateSeekBar()
});

// Retroceder 10 segundos
btnRewind.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
});

// Avanzar 10 segundos
btnForward.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
});

// Detener la cancion
btnStop.addEventListener('click', () => {
    audio.pause()
    audio.currentTime = 0
    btnPlayPause.className = 'bi bi-play-circle';
})

// Activar loop
btnRepeat.addEventListener('click', () => {
    audio.loop = !audio.loop
    if (audio.loop) {
        btnRepeat.className = 'bi bi-repeat-1'
        btnRepeat.setAttribute('title', 'Disable loop')
    } else {
        btnRepeat.className = 'bi bi-repeat'
        btnRepeat.setAttribute('title', 'Enable loop')
    }
})

// Cuando termina la cancion
audio.addEventListener('ended', () => {
    btnPlayPause.className = 'bi bi-play-circle'
    btnPlayPause.setAttribute('title', 'Play')
})