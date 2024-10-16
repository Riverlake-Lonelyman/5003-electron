const videoPlayer = document.getElementById("video-player");
const videoIdSpan = document.getElementById("video-id");
const exitBtn = document.getElementById("exit-btn");
const popup = document.getElementById("popup");
let screenshotCount = 0;

const randomIndex = Math.floor(Math.random() * 12) + 1;
const selectedVideo = `videos/${randomIndex}.MP4`;
videoPlayer.src = selectedVideo;
videoIdSpan.textContent = randomIndex;

exitBtn.addEventListener("click", () => {
  const videoId = videoIdSpan.textContent;
  window.location.href = `testFinish.html?video_id=${videoId}`;
});

videoPlayer.addEventListener("ended", () => {
  popup.style.display = "block";
});
