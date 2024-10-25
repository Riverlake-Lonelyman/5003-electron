document.addEventListener("DOMContentLoaded", function () {
  const continueButton = document.getElementById("continue");
  const quitButton = document.getElementById("quit");

  // 获取 URL 参数
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("video_id");

  // 更新页面内容
  const highlightSpan = document.querySelector(".highlight");
  if (highlightSpan && videoId) {
    switch (videoId) {
      case "1":
        highlightSpan.textContent = "1st";
        break;
      case "2":
        highlightSpan.textContent = "2nd";
        break;
      case "3":
        highlightSpan.textContent = "3rd";
        break;
      default:
        highlightSpan.textContent = `${videoId}th`;
    }
  }

  continueButton.addEventListener("click", function () {
    window.location.href = "./index.html";
  });

  quitButton.addEventListener("click", function () {
    window.close();
  });
});
