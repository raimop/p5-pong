const width = window.innerWidth;
const height = window.innerHeight;

let rad = 20; // Width of the shape
let xpos, ypos; // Starting position of shape

let xspeed = 10.2; // Speed of the shape
let yspeed = 8.8; // Speed of the shape

let xdirection = 1; // Left or Right
let ydirection = 1; // Top to Bottom

const game = {
  ball: {
    xspeed: 14,
    yspeed: 11,
    rad: 20,
  },
  paddleSpeed: 15,
  player1: {
    score: 0,
    x: 20,
    y: 20,
    width: 20,
    height: 200,
  },
  player2: {
    score: 0,
    x: width-40,
    y: 20,
    width: 20,
    height: 200,
  },
  penalty: 0.8
}

function setup() {
  createCanvas(width, height);
  noStroke();
  frameRate(30);
  ellipseMode(RADIUS);
  // Set the starting position of the shape
  xpos = width / 2;
  ypos = height / 2;
}

function draw() {
  background(255, 204, 0);
  let { rad, xspeed, yspeed } = game.ball;

  // Update the position of the shape
  xpos = xpos + xspeed * xdirection;
  ypos = ypos + yspeed * ydirection;
  
  // Test to see if the shape exceeds the boundaries of the screen
  // If it does, reverse its direction by multiplying by -1
  
  // start over if reaches over line
  xpos > width - rad ? game.player1.score += 1 : null;
  xpos < rad ? game.player2.score += 1 : null;

  if (xpos > width - rad || xpos < rad) {
    xpos = width / 2;
    ypos = height / 2;
    game.player1.height = 200;
    game.player2.height = 200;
  }

  // bounces off up and down
  if (ypos > height - rad || ypos < rad) {
    ydirection *= -1;
  }

  const { x: p1x, y: p1y, width: p1width, height: p1height } = game.player1;
  const { x: p2x, y: p2y, width: p2width, height: p2height } = game.player2;

  if (p1x+(p1width*2) > xpos && ( ypos > p1y && ypos < p1y+p1height)) {
    xdirection *= -1;
    game.player1.height *= game.penalty;
  }

  if (xpos > p2x-p2width && ( ypos > p2y && ypos < p2y+p2height)) {
    xdirection *= -1;
    game.player2.height *= game.penalty;
  }

  // Draw the shape
  ellipse(xpos, ypos, rad, rad);

  paddles();
  controls();
  score();
}

function score(){
  const { score: p1score } = game.player1;
  const { score: p2score } = game.player2;

  textSize(32);
  textAlign(CENTER);
  fill(0);
  text(`${p1score}-${p2score}`, width/2-50, 30);
}

function paddles(){
  const { x: p1x, y: p1y, width: p1width, height: p1height } = game.player1;
  const { x: p2x, y: p2y, width: p2width, height: p2height } = game.player2;

  rect(p1x, p1y, p1width, p1height);
  rect(p2x, p2y, p2width, p2height);
}

function controls(){
  /* keyIsDown(UP_ARROW) ? game.player2.y -= game.paddleSpeed : keyIsDown(DOWN_ARROW) ? game.player2.y += game.paddleSpeed : null;
  keyIsDown(87) ? game.player1.y -= game.paddleSpeed : keyIsDown(83) ? game.player1.y += game.paddleSpeed : null; */
  const { x: p1x, y: p1y, width: p1width, height: p1height } = game.player1;
  const { x: p2x, y: p2y, width: p2width, height: p2height } = game.player2;

  if (keyIsDown(UP_ARROW)){
    if (p2y > 0){
      game.player2.y -= game.paddleSpeed
    } 
  }
  
  if (keyIsDown(DOWN_ARROW)){
    if (p2y < height-p2height){
      game.player2.y += game.paddleSpeed
    }
  }

  if (keyIsDown(87)){
    if (p1y > 0){
      game.player1.y -= game.paddleSpeed
    } 
  }

  if (keyIsDown(83)){
    if (p1y < height-p1height){
      game.player1.y += game.paddleSpeed
    }
  }
}