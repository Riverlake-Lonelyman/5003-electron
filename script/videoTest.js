const videoPlayer = document.getElementById("video-player");
const videoIdSpan = document.getElementById("video-id");
const exitBtn = document.getElementById("exit-btn");
const popup = document.getElementById("popup");
let screenshotCount = 0;

const video_id = Math.floor(Math.random() * 12) + 1;
const selectedVideo = `videos/${video_id}.MP4`;
videoPlayer.src = selectedVideo;
videoIdSpan.textContent = video_id;

// set up camera stream
let cameraStream;
const captureInterval = 1000; // 1 FPS

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    cameraStream = stream;
    const videoTrack = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(videoTrack);
    startCapturing(imageCapture, video_id);
  })
  .catch((err) => {
    console.error("Error accessing camera:", err);
  });

function startCapturing(imageCapture, video_id) {
  setInterval(() => {
    imageCapture
      .grabFrame()
      .then((bitmap) => {
        processFrame(bitmap, video_id);
      })
      .catch((err) => {
        console.error("Error capturing frame:", err);
      });
  }, captureInterval);
}

function processFrame(bitmap, video_id) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const size = 128;

  const minSize = Math.min(bitmap.width, bitmap.height);
  canvas.width = size;
  canvas.height = size;

  context.drawImage(
    bitmap,
    (bitmap.width - minSize) / 2,
    (bitmap.height - minSize) / 2,
    minSize,
    minSize,
    0,
    0,
    size,
    size
  );

  // 将Canvas图像转换为Blob并存储
  canvas.toBlob((blob) => {
    window.myAPI.saveImage(blob, video_id); // 调用 preload.js 中暴露的 myAPI.saveImage 方法
  }, "image/jpeg");
}

exitBtn.addEventListener("click", () => {
  window.location.href = `testFinish.html?video_id=${video_id}`;
});

videoPlayer.addEventListener("ended", () => {
  popup.style.display = "block";
});
