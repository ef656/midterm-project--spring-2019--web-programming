let video;

function setup() {
	let myCanvas = createCanvas (320, 240);
	myCanvas.parent(`image-of-photobooth`);
	background (51);
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.parent(`video-of-photobooth`);
	button = createButton('Snap');
	button.mousePressed(takeSnap);
	button.parent(`button-to-take-snap`);

}

function takeSnap() {
	image (video, 0, 0);

	save('your-beautiful-face.png');
}
function draw() {
	//image (video, 0, 0);
}