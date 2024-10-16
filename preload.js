const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('myAPI', {
  saveImage: (blob, video_id) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = Buffer.from(reader.result);
      ipcRenderer.send('save-image', buffer, video_id);
    };
    reader.readAsArrayBuffer(blob);
  }
});
