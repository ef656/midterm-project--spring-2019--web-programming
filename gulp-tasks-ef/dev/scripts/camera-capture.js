var video;

function setup() {
	createCanvas (320, 240);
	background (51);
	video = createCapture(VIDEO);
	video.size(320, 240);
	button = createButton('Snap');
	button.mousePressed(takeSnap);

}

function draw() {
	image (video, 0, 0);
}