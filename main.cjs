const { app, BrowserWindow, ipcMain, protocol } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');

const appScheme = 'deck';
const usesBuiltApp = app.isPackaged || process.env.DESKTOP_USE_BUILT_APP === 'true';
const appDirectory = path.join(__dirname, 'dist', 'deck-of-many-more-things', 'browser');
const contentTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml'
};

function getInstallSessionsPath() {
  const installDirectory = app.isPackaged ? path.dirname(app.getPath('exe')) : __dirname;
  return path.join(installDirectory, 'data', 'sessions.json');
}

function getUserSessionsPath() {
  return path.join(app.getPath('userData'), 'data', 'sessions.json');
}

async function writeSessionFile(sessionsPath, contents) {
  const directory = path.dirname(sessionsPath);
  const temporaryPath = `${sessionsPath}.${process.pid}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`;
  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(temporaryPath, contents, 'utf8');
  await fs.rename(temporaryPath, sessionsPath);
}

function registerSessionStorage() {
  ipcMain.handle('sessions:read', async () => {
    const installSessionsPath = getInstallSessionsPath();
    const userSessionsPath = getUserSessionsPath();
    const sessionsPaths = [...new Set([installSessionsPath, userSessionsPath])];
    for (const sessionsPath of sessionsPaths) {
      try {
        return await fs.readFile(sessionsPath, 'utf8');
      } catch (error) {
        if (error.code === 'ENOENT') continue;
        if (sessionsPath === installSessionsPath && ['EACCES', 'EPERM', 'EROFS'].includes(error.code)) {
          continue;
        }
        throw error;
      }
    }
    return null;
  });

  ipcMain.handle('sessions:write', async (_event, contents) => {
    if (typeof contents !== 'string') {
      throw new TypeError('Session data must be serialized text.');
    }

    try {
      await writeSessionFile(getInstallSessionsPath(), contents);
    } catch (error) {
      if (!['EACCES', 'EPERM', 'EROFS'].includes(error.code)) throw error;
      await writeSessionFile(getUserSessionsPath(), contents);
    }
  });
}

if (usesBuiltApp) {
  protocol.registerSchemesAsPrivileged([
    { scheme: appScheme, privileges: { standard: true, secure: true, supportFetchAPI: true } }
  ]);
}

async function loadAppFile(request) {
  let requestedPath;
  try {
    requestedPath = decodeURIComponent(new URL(request.url).pathname).replace(/^\/+/, '');
  } catch {
    return new Response('Invalid application path', { status: 400 });
  }

  const relativePath = requestedPath || 'index.html';
  const filePath = path.resolve(appDirectory, relativePath);
  const resolvedPath = path.relative(appDirectory, filePath);

  if (resolvedPath.startsWith(`..${path.sep}`) || resolvedPath === '..' || path.isAbsolute(resolvedPath)) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    const contents = await fs.readFile(filePath);
    const contentType = contentTypes[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
    return new Response(contents, {
      headers: {
        'Content-Type': `${contentType}; charset=utf-8`,
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (error) {
    console.error(`Unable to load desktop app asset "${relativePath}":`, error);
    return new Response('Application asset not found', { status: 404 });
  }
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1240,
    height: 860,
    minWidth: 360,
    minHeight: 600,
    backgroundColor: '#111815',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

  if (usesBuiltApp) {
    void window.loadURL(`${appScheme}://bundle/index.html`);
  } else {
    void window.loadURL('http://127.0.0.1:4300');
  }
}

app.whenReady().then(() => {
  registerSessionStorage();

  if (usesBuiltApp) {
    protocol.handle(appScheme, loadAppFile);
  }

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
