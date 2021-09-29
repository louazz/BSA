'use strict'

// Import parts of electron to use
const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path')
const db = require('electron-db');
const url = require('url');
const fs = require('fs');
let csvToJson = require('convert-csv-to-json');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Keep a reference for dev mode
let dev = false

// Broken:
// if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
//   dev = true
// }

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
  dev = true
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}
const location = path.join(__dirname, '')
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: __dirname + '/preload.js'
        }
  })
  // and load the index.html of the app.
  let indexPath

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    })
  }

  mainWindow.loadURL(indexPath)

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()

    // Open the DevTools automatically if developing
    if (dev) {
      const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

      installExtension(REACT_DEVELOPER_TOOLS)
        .catch(err => console.log('Error loading React DevTools: ', err))
      mainWindow.webContents.openDevTools()
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
 /* let json = csvToJson.fieldDelimiter(',').getJsonFromCsv("sample3.csv");
for(let i=0; i<json.length;i++){
    console.log(json[i]);
    var code=json[i].Code;
    var price= json[i].PrixPharm;
    var name= json[i].Spécialités+ json[i].Présentations;
    var text={
        "name": name,
        "code": code,
        "price": price
    }
    db.insertTableContent("medicine",
    location, text, (succ, msg) => {
   console.log(msg) })
}*/
  db.createTable("medicine", location, (succ, data)=> {
    if(succ){
    }
  })
  db.createTable("clients", location, (succ, data)=> {
    if(succ){
    }
  })
  db.createTable("transactions", location, (succ, data)=> {
    if(succ){
    }
  })
  ipcMain.on('add transaction', (event,arg) => {
    db.insertTableContent("transactions",
    location, arg, (succ, msg) => {

       event.returnValue =  msg

    })
  })
  ipcMain.on('transaction by id', (event,arg) => {
    db.getAll('transactions',location, (succ, data) => {
    data.map(function(item){
      console.log(item[0].id.toString())
      console.log(arg.toString())
      console.log(item[0].id.toString()==arg.toString())
      console.log("---------------------------------------------------------")
      if(item[0].id.toString()==arg.toString()){
        console.log("found")
        console
        event.returnValue=item
      }
    })
    })

  /*  db.search('transactions',location, 'id', "4kwku41gwmt", (succ, data) => {
    console.log(data)
    console.log(succ)
    if (succ) {
       event.returnValue =  data;
    }
  });*/
  })



  ipcMain.on('add client', (event,arg) => {
    db.insertTableContent("clients",
    location, arg, (succ, msg) => {
      event.returnValue =  msg})
  })
  ipcMain.on('add medicine', (event,arg) => {
    db.insertTableContent("medicine",
    location, arg, (succ, msg) => {
      event.returnValue =  msg})
  })
  ipcMain.on('get medicine', (event) => {
  db.getAll('medicine',location, (succ, data) => {
    event.returnValue =  data
  })  })
  ipcMain.on('get client', (event) => {
    db.getAll('clients',location, (succ, data) => {
      event.returnValue =  data
    })  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
