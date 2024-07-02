const ipc = require('electron').ipcRenderer

function closeApp(e) {
    e.preventDefault()
    ipc.send('close')
}

function minimizeApp() {
    ipc.send('minimize')
}

function openCredits() {
    ipc.send('credits')
}

document.querySelector('.close').addEventListener("click", closeApp)

document.querySelector('.minimize').addEventListener("click", minimizeApp)

document.querySelector('.credits').addEventListener("click", openCredits)