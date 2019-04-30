let video;

function setup() {
	let myCanvas = createCanvas (320, 240);
	myCanvas.parent(`video-of-photobooth`);
	background (51);
	video = createCapture(VIDEO);
	video.size(320, 240);
	button = createButton('Snap');
	button.mousePressed(takeSnap);
}

function takeSnap() {
	image (video, 0, 0);

	save('your-beautiful-face.png');
}
function draw() {
	//image (video, 0, 0);
}