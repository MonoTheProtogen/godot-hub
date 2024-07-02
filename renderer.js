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

// Main view portion

const body = document.querySelector(".body")

const projects = document.querySelector(".projects")
const versions = document.querySelector(".versions")
const settings = document.querySelector(".settings")

var bodyTab = 0 // 0 = Projects tab, 1 = Versions tab, 2 = Settings tab

projects.addEventListener("click", function() {bodyTab = 0; bodyPrint()})
versions.addEventListener("click", function() {bodyTab = 1; bodyPrint()})
settings.addEventListener("click", function() {bodyTab = 2; bodyPrint()})

function bodyPrint() {
    body.innerHTML = ""
    switch(bodyTab) {
        case 0:
            body.innerHTML += "<h2>Projects</h2>"

            break;
        case 1:
            body.innerHTML += "<h2>Versions</h2>"

            break;
        case 2:
            body.innerHTML += "<h2>Settings</h2>"
    }
}

bodyPrint()