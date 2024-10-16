const fs = require("fs");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

function captureWebcamShot(videoElement, randomIndex, screenshotCount) {
  const canvas = createCanvas(
    videoElement.videoWidth,
    videoElement.videoHeight
  );
  const context = canvas.getContext("2d");
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  const screenshotPath = path.join(__dirname, "capture");
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath);
  }

  const screenshotName = `${randomIndex}_${screenshotCount}_${Date.now()}.jpg`;
  const screenshotFullPath = path.join(screenshotPath, screenshotName);

  const out = fs.createWriteStream(screenshotFullPath);
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('Screenshot saved:', screenshotFullPath));
  
  fs.writeFile(screenshotFullPath, imageBuffer, (err) => {
    if (err) {
      console.error("Failed to save screenshot", err);
    } else {
      console.log("Screenshot saved:", screenshotFullPath);
    }
  });
}

module.exports = { captureWebcamShot };
