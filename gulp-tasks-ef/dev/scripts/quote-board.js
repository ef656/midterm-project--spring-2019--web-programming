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