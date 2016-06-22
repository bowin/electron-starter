const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let server;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
    server = null
  })
}

let patientInfo;
function startServer() {
  server = require('koa')();
  server.use(require('koa-body')());
  server.use(function *(next) {
    if (this.method === 'GET') {
      this.body = patientInfo;
      patientInfo = null;
    } else if (this.method === 'POST') {
      console.log('body: ', this.request.body);
      patientInfo = this.request.body;
      this.body = ''
    }
  });
  server.listen(4000);
  console.log('server listen at 4000')
}

function init() {
  createWindow();
  startServer()
}

app.on('ready', init);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});
