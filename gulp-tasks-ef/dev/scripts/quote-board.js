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