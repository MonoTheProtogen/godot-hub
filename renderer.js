// titlebar functions

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
    body.innerHTML = ''
    
    switch(bodyTab) {
        case 0:
            body.innerHTML += '<div class="utilitybar"> <h2 class="title">Projects</h2> <p class="newproj">+</p> </div>'

            

            const newproj = document.querySelector(".newproj")

            break;
        case 1:
            body.innerHTML += '<div class="utilitybar"> <h2 class="title">Versions</h2> </div>'



            break;
        case 2:
            body.innerHTML += '<div class="utilitybar"> <h2 class="title">Settings</h2> <p class="setsave">Apply</p>  </div>'

            body.innerHTML += '<div class="settingbody"> <p>Projects folder path: <input type="text" class="projpath"> <input type="button" value="Browse" class="projbrowse"> </p> <p>Godot versions folder path: <input type="text" class="verpath"> <input type="button" value="Browse" class="verbrowse"> </p> <p class="note">Note: Changes won\'t take effect until clicking the apply button and restarting the app.</p> </div>'
            
            const projpath = document.querySelector(".projpath")
            const projbrowse = document.querySelector(".projbrowse")
            const verpath = document.querySelector(".verpath")
            const verbrowse = document.querySelector(".verbrowse")
            const setsave = document.querySelector(".setsave")

            

            break;
    }

}

bodyPrint()