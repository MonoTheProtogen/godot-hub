// renderer.js

// startup

let appOptions
async function startup() {
    appOptions = await window.electronAPI.getSettings()
    console.log(appOptions)
}

var username
async function setUsername() {
  username = await window.electronAPI.getUsername()
}
setUsername()
// when they switch to the settings tab use appOptions to populate the 2 textboxes

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded')
    startup()
})

// titlebar functions

document.querySelector('.close').addEventListener("click", window.electronAPI.closeApp)

document.querySelector('.minimize').addEventListener("click", window.electronAPI.minimizeApp)

document.querySelector('.credits').addEventListener("click", window.electronAPI.openCredits)

// Main view portion

const body = document.querySelector(".body")

const projects = document.querySelector(".projects")
const versions = document.querySelector(".versions")
const settings = document.querySelector(".settings")
const home = document.querySelector(".home")
const news = document.querySelector(".news")

var bodyTab = 3 // 0 = Projects tab, 1 = Versions tab, 2 = Settings tab, 3 = Home tab, 4 = News tab

projects.addEventListener("click", function() {bodyTab = 0; bodyPrint()})
versions.addEventListener("click", function() {bodyTab = 1; bodyPrint()})
settings.addEventListener("click", function() {bodyTab = 2; bodyPrint()})
home.addEventListener("click", function() {bodyTab = 3; bodyPrint()})
news.addEventListener("click", function() {bodyTab = 4; bodyPrint()})

function bodyPrint() {
    body.innerHTML = ''
    
    switch(bodyTab) {
        case 0:
            body.innerHTML += '<div class="utilitybar"> <h2 class="title">Projects</h2> <p class="newproj">+</p> <br><p class="note">To begin, double click one of the projects below or click the \"+\" button to create a new project</p> </div>'

            

            const newproj = document.querySelector(".newproj")

            break;
        case 1:
            body.innerHTML += '<div class="utilitybar"> <h2 class="title">Versions</h2> <p class="mirrorp">Version: <select class="mirror"><option value="stable">Stable</option><option value="mono">Stable (Mono)</option><option value="rc">RC</option><option value="beta">Beta</option><option value="dev">Dev (Alpha)</option> </select></p> </div>'



            const mirror = document.querySelector(".mirror")

            break;
        case 2:
            body.innerHTML += '<div class="utilitybar"> <h2 class="title">Settings</h2> </div>'

            body.innerHTML += '<div class="settingbody"> <p>Projects folder path: <input type="text" class="projectpath" value=""> <input type="button" value="Browse" class="projbrowse"> </p> <p>Godot versions folder path: <input type="text" class="versionpath" value=""> <input type="button" value="Browse" class="verbrowse"></div>'
            
            const projectpath = document.querySelector(".projectpath")
            const versionpath = document.querySelector(".versionpath")
            projectpath.value = appOptions.projectFolder
            versionpath.value = appOptions.versionFolder
            

            document.querySelector('.projbrowse').addEventListener('click', async () => {
                const folder = await window.electronAPI.setProjectFolder()
                if (folder) {
                  // a folder was set so do whatever is next
                  projectpath.value = folder
                }
              })

            document.querySelector('.verbrowse').addEventListener('click', async () => {
                const folder = await window.electronAPI.setVersionFolder()
                if (folder) {
                  // a folder was set so do whatever is next
                  versionpath.value = folder
                }
              })

            projectpath.value = appOptions.projectFolder
            versionpath.value = appOptions.versionFolder 

            break;
        
        case 3:
            // body.innerHTML += '<div class="utilitybar"> <h2 class="title">Home</h2> <p class="greet">Welcome ' + username + ', have a good time making games!</p> </div>'
            body.innerHTML += '<div class="utilitybar"> <h2 class="title">Home</h2> <p class="greet">Welcome! Have a good time making games!</p> </div>'
            // body.innerHTML += '<div class="utilitybar"> <h2 class="title">Home</h2>  </div>'

            break;

        case 4:
            body.innerHTML += '<div class="utilitybar"> <h2 class="title">Blog</h2> <div class="newsnote">This is currently (and probably forever) a webview tag. <br> To go back to the Blog homepage click the tab on the left again.</div>'

            body.innerHTML += '<div class="newsbody"> <webview src="https://godotengine.org/blog/"></webview> </div>'

            break;
    }

}

// unused function, don't mind this if you're modifying this software please, I was just trying some things out

// function startupPrint() {
//   body.innerHTML = ""
//   body.innerHTML += '<div class="loadingBody"><h1>Loading...</h1><progress></div>'
// }
// startupPrint()

// setTimeout(() => {
//   bodyPrint()
// }, 1300)

bodyPrint()