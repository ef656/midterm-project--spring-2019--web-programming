let video;

function setup() {
	let myCanvas = createCanvas (480, 360);
	myCanvas.parent(`image-of-photobooth`);
	background (255,202,148);
	video = createCapture(VIDEO);
	video.size(480, 360);
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