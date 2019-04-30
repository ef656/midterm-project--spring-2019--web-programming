var video;

function liveVideo() {
	createCanvas (320, 240);
	background (51);
	video = createCapture(VIDEO);
	video.size(320, 240);
}

function drawImage() {
	image (video, 0, 0);
}