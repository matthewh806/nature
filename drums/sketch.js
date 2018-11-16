var kicks = []
var drums

var rect_x = 150;
var rect_y = 150;
var rect_w = 100;
var rect_h = 100;

function preload() {
	soundFormats('wav');
	kicks = [loadSound('../assets/sounds/kick1.wav'), loadSound('../assets/sounds/kick2.wav'), loadSound('../assets/sounds/kick3.wav'), loadSound('../assets/sounds/kick4.wav')]
}

function setup() {
	createCanvas(800, 800);
	background('#ffb6c1');

	fill('#ffd4b6');
	noStroke();
	rect(rect_x, rect_y, rect_w, rect_h);

	circles = new Group(); 

	for(var i = 0; i < 90; i++) {
		var c = createSprite(random(0, width), random(0, height));
		c.addAnimation('normal', '../assets/asterisk_circle0006.png', '../assets/asterisk_circle0008.png');

		c.setCollider('circle', -2, 2, 55);
		c.setSpeed(random(2, 3), random(0, 360));

		c.scale = random(0.5, 1);
		c.mass = c.scale;

		circles.add(c);
	}

	for(var i = 0; i < kicks.length; i++) {
		kicks[i].setVolume(0.4);
	}
}

function draw() {
	background('#ffb6c1');

	circles.bounce(circles, function(a, b) {
		kicks[int(random(0, kicks.length))].play();
	});

	for(var i=0; i < circles.length; i++) {
		var c = circles[i];

		if(c.position.x < 0 ) {
			c.position.x = 1;
			c.velocity.x = abs(c.velocity.x);
		}

		if(c.position.x > width) {
			c.position.x = width-1;
			c.velocity.x = -abs(c.velocity.x);
		}

		if(c.position.y < 0) {
			c.position.y = 1;
			c.velocity.y = abs(c.velocity.y);
		}

		if(c.position.y > height) {
			c.position.y = height-1;
			c.velocity.y = -abs(c.velocity.y);
		}
	}

	drawSprites();
}