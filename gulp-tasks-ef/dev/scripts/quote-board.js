//Using tutorial by Coding Train

let bubbles = [];

let quote;
let quotes = [];

function preload() {
  quote = loadImage('quotes/quote1.jpg');
  for (let i = 0; i < 6; i++) {
    quotes[i] = loadImage(`quotes/quote${i}.jpg`);
  }
}

function setup() {
  let quoteBoard = createCanvas(600, 600);
  for (let i = 0; i < 1; i++) {
    let x = 0;
    let y = 0;
    let r = random(600, 600);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
  }
  quoteBoard.parent(`quote-board`)
}

function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked(mouseX, mouseY);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r, img) {
    this.x = 0;
    this.y = 0;
    this.r = r;
    this.quote = random(quotes);
 }

 clicked(px, py) {
    if (px > this.x && px < this.x + this.r && py > this.y && py < this.y + this.r) {
      this.quote = random(quotes);
    }
  }

show() {
    image(this.quote, this.x, this.y, this.r, this.r);
  }
}
