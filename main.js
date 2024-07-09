// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, shell, dialog, } = require('electron')
const path = require('node:path')
const fs = require('node:fs')
const user = require("os").userInfo().username

let mainWindow

const appOptions = {
  windowX: undefined,
  windowY: undefined,
  projectFolder: undefined,
  versionFolder: undefined
}
const appConfig = path.join(app.getPath('userData'), 'app-config.json')

// options handling

async function getOptions() {
  if (fs.existsSync(appConfig)) {
      const result = fs.readFileSync(appConfig)
      const options = JSON.parse(result)
      appOptions.windowX = options.windowX || undefined
      appOptions.windowY = options.windowY || undefined
      appOptions.projectFolder = options.projectFolder || ''
      appOptions.versionFolder = options.versionFolder || ''
      console.log(appOptions)
  }
}

async function setOptions() {
  fs.writeFileSync(appConfig, JSON.stringify(appOptions, null, '\t'))
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      enableRemoteModule: false,
    },
    frame: false,
    resizable: false,
    icon: "./images/icons/hub_icon_512x512.png",
    darkTheme: true,


    // show: false,
  })
  mainWindow.setBackgroundColor('#343445')
  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show()
  // })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
async function startup() {
  console.log(appConfig)
  await getOptions()
  if (appOptions.windowX) {
      mainWindowOptions.x = appOptions.windowX
      mainWindowOptions.y = appOptions.windowY
  }
  createWindow()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', startup)

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// get options

ipcMain.handle('settings:getSettings', () => {
  return {
    projectFolder: appOptions.projectFolder,
    versionFolder: appOptions.versionFolder
  }
})

// titlebar and credits link

ipcMain.handle('action:close', () => {
  app.quit()
})

ipcMain.handle('action:minimize', () => {
  BrowserWindow.getFocusedWindow().minimize()
})

ipcMain.handle('link:credits', () => {
  // shell.openExternal('https://github.com/MonoTheProtogen')
  shell.openExternal('https://github.com/MonoTheProtogen/godot-hub')
})

ipcMain.handle('settings:saveSettings', () => {
  setOptions()
})

// folder handling

async function browseProjectFolder() {
  const projectFolder = await dialog.showOpenDialog(mainWindow, {
    title: 'Choose a Project folder',
    properties: ['openDirectory']
  })
  // console.log(homeFolder)
  if (projectFolder.canceled) {
    return null
  } else {
    const pathNormalized = projectFolder.filePaths[0].replace(/\\/msg, '/')
    appOptions.projectFolder = pathNormalized
    await setOptions()
    return appOptions.projectFolder
  }
}

ipcMain.handle('settings:setProjectFolder', async (event, folder) => {
  return await browseProjectFolder()
})

async function browseVersionFolder() {
  const versionFolder = await dialog.showOpenDialog(mainWindow, {
    title: 'Choose a Version folder',
    properties: ['openDirectory']
  })
  // console.log(homeFolder)
  if (versionFolder.canceled) {
    return null
  } else {
    const pathNormalized = versionFolder.filePaths[0].replace(/\\/msg, '/')
    appOptions.versionFolder = pathNormalized
    await setOptions()
    return appOptions.versionFolder
  }
}

ipcMain.handle('settings:setVersionFolder', async (event, folder) => {
  return await browseVersionFolder()
})

// username grab

async function usernameGrabber() {
  return user
}

ipcMain.handle('os:username', async () => {
  return await usernameGrabber()
})