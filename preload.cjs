const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopSessionStorage', {
  read: () => ipcRenderer.invoke('sessions:read'),
  write: contents => ipcRenderer.invoke('sessions:write', contents)
});
