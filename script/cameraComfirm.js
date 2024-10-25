const video = document.getElementById('video');
const finishButton = document.getElementById('finish-btn');

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.error("Error accessing the camera", error);
    });

// Redirect to another page on Finish button click
finishButton.addEventListener('click', () => {
    window.location.href = './videoTest.html';
});
