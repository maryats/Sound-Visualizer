var mic = new p5.AudioIn();
var sel, song, song0, song1, song2, song3,
  buttonMicOn, buttonMicOff, buttonWBG, buttonBBG,
  loadingLabel, Rlabel, Glabel, Blabel,
  pWidth, micLevel,
  BGcolor,
  vol;

function preload() {
  createCanvas(windowWidth, windowHeight);
  mic.start();
  
  song0 = loadSound('assets/blank.mp3');
  song1 = loadSound('assets/UptownFunk.mp3');
  song2 = loadSound('assets/Breezeblocks.mp3');
  song3 = loadSound('assets/A-Punk.mp3');

  loadingLabel = createP('Loading...');
  loadingLabel.class('loadingUI');
  loadingLabel.position(15,18);

  BGcolor = "#222";  
}

// ------------------------------------- UI -------------------------------------
function setup() {
  // plays blank mp3 to give amp and rate analyzers something to work with
  song = song0;
  song.play();
  
  // button turns microphone on. It's also on by default.
  buttonMicOn = createButton('Mic On');
  buttonMicOn.position(15, 15);
  buttonMicOn.mousePressed(micOn);
  // button turns microphone off, so particles stop changing size.
  // sometimes you need to restart the program for this button to work
  buttonMicOff = createButton('Mic Off');
  buttonMicOff.position(75, 15);
  buttonMicOff.mousePressed(micOff);
  
  // creates drop-down song selection 
  sel = createSelect();
  sel.position(15, 43);
  sel.option('No Music');
  sel.option('Uptown Funk');
  sel.option('Breezeblocks');
  sel.option('A-Punk');
  sel.changed(mySelectEvent);
  
  // creates sliders for color
  sliderR = createSlider(0, 255, 250);
  sliderR.position(35, 68);
  sliderR.class('slider');
  sliderG = createSlider(0, 255, 250);
  sliderG.position(35, 88);
  sliderG.class('slider');
  sliderB = createSlider(0, 255, 250);
  sliderB.position(35, 108);
  sliderB.class('slider');
  
  // labels sliders for color
  Rlabel = createP('R');
  Rlabel.position(20,71);
  Glabel = createP('G');
  Glabel.position(19,91);
  Blabel = createP('B');
  Blabel.position(20,111);
  
  // buttons change background color
  buttonWBG = createButton('LightBG');
  buttonWBG.position(15,132);
  buttonWBG.mousePressed(lightBG);
  buttonBBG = createButton('DarkBG');
  buttonBBG.position(75,132);
  buttonBBG.mousePressed(darkBG);
}

function draw() {
  var R = sliderR.value();
  var G = sliderG.value();
  var B = sliderB.value();
  
  pColor = color(R, G, B);
}

// UI buttons turn microphone on/off
function micOn(){
  mic.start();
}
function micOff() {
  mic.stop();
}

// song selection dropdown
function mySelectEvent() {
  if (sel.value()=='No Music') {
    song.stop();
    song = song0;
    song.play();
  }
  if (sel.value()=='Uptown Funk') {
    song.stop();
    song = song1;
    song.play();
  }
  if (sel.value()=='Breezeblocks') {
    song.stop();
    song = song2;
    song.play();
  }
  if (sel.value()=='A-Punk') {
    song.stop();
    song = song3;
    song.play();
  }
}
//buttons change background color
function lightBG() {
  BGcolor = "#eee";
}
function darkBG() {
  BGcolor = "#222";
}

// --------------------------------- PARTICLES ---------------------------------
// Using modified code from: http://www.playfuljs.com/particle-effects-are-easy/
// Note: there's some code in the index.html as well.

// Defines particle properties
function Particle(x, y) {
  this.x = this.oldX = x;
  this.y = this.oldY = y;
}

// Particles slow down over time. Larger number = slow down less.
var DAMPING = 0.999;

// Builds velocity vectors for particles
Particle.prototype.integrate = function() {
  var velocityX = (this.x - this.oldX) * DAMPING;
  var velocityY = (this.y - this.oldY) * DAMPING;
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += velocityX;
  this.y += velocityY;
};

// Particles are more strongly attracted to mouse the closer they get to it
Particle.prototype.attract = function(x, y) {
  var dx = x - this.x;
  var dy = y - this.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  this.x += dx / (distance/4);
  this.y += dy / (distance/4);
};

// Listens for mouse to move and saves coordinates of mouse at that moment
function onMousemove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

// Redraws particles and background that fills window each frame
requestAnimationFrame(frame);
function frame() {
  requestAnimationFrame(frame);
  ctx.fillStyle = BGcolor;
  ctx.fillRect(0, 0, width, height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].attract(mouse.x, mouse.y);
    particles[i].integrate();
    particles[i].draw();
  }
}

Particle.prototype.draw = function() {
  micLevel = mic.getLevel();
  pWidth = micLevel*150 + 1;
  
  ctx.strokeStyle = pColor;
  ctx.lineWidth = pWidth;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(this.oldX, this.oldY);
  ctx.lineTo(this.x, this.y);
  ctx.stroke();
};