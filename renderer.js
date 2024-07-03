// startup

let appOptions
async function startup() {
    appOptions = await window.electronAPI.getSettings()
}
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
            body.innerHTML += '<div class="utilitybar"> <h2 class="title">Versions</h2> <p class="mirrorp">Download Mirror: <select class="mirror"><option value="github">Github</option><option value="tuxfamily">Tuxfamily</option></select></p> </div>'



            const mirror = document.querySelector(".mirror")

            break;
        case 2:
            body.innerHTML += '<div class="utilitybar"> <h2 class="title">Settings</h2> </div>'

            body.innerHTML += '<div class="settingbody"> <p>Projects folder path: <input type="text" class="projectpath" value=""> <input type="button" value="Browse" class="projbrowse"> </p> <p>Godot versions folder path: <input type="text" class="versionpath" value=""> <input type="button" value="Browse" class="verbrowse"></div>'
            
            const projectpath = document.querySelector(".projectpath")
            const versionpath = document.querySelector(".versionpath")
            

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
    }

}

bodyPrint()