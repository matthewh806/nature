var radius = 200;
var chords = 0;

var font;
var fontSize = 40;

function preload() {
	font = loadFont('../assets/SourceSansPro-Regular.otf');
}

function setup() {
	createCanvas(400, 600);
	background(255, 255, 255);

	stroke(20, 20, 20, 60);
}

function draw() {
	randomChord();
	randomChord();

	// fill(255, 255, 255, 1);
	// rect(400, 100, 0, 500);
	// text("chords " + chords, width*0.5, 500);
}

function randomChord() {
	var r1 = randomAngle();
	var x1 = r1[0];
	var y1 = r1[1];

	var r2 = randomAngle();
	var x2 = r2[0];
	var y2 = r2[1];

	line(x1, y1, x2, y2);

	chords++;
}

function randomAngle() {
	var angle = random(0, 2*PI);
	var xPos = radius + radius * cos(angle);
	var yPos = radius + radius * sin(angle);

	return [xPos, yPos]
}