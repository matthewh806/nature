// var theta;

var tree = [];
var iter = 0;

const MAX_ITER = 10;
const SELF_SUSTAINING = true;

function preload() {

}

function setup() {
	createCanvas(640, 360);
	background('#cdebf9');	

	var a = createVector(width / 2, height);
	var b = createVector(width / 2, height - 100);
	var root = new Branch(a, b);

	tree[0] = root;

	if(SELF_SUSTAINING) {
		interval = setInterval(function() {
			growTree();

			if(iter > MAX_ITER) {
				clearInterval(interval);
			}
		}, 1000);
	}
}

function mousePressed() {
	if(SELF_SUSTAINING || iter > MAX_ITER)
		return;

	console.log(iter);
	growTree();	
}

function draw() {
	for(var i = 0; i < tree.length; i++) {
		tree[i].show();
	}
}

function growTree() {
	for(var i = tree.length-1; i >= 0; i--) {
		if(!tree[i].finished) {
			tree.push(tree[i].branchA());
			tree.push(tree[i].branchB());
		}

		tree[i].finished = true;
	}

	iter++;
}

// function setup() {
// 	createCanvas(640, 360);
// 	background('#cdebf9');
	
// 	translate(width/2,height);

// 	theta = random(0, PI/2);

// 	// (x0, y0, x1, y2)
// 	stroke('#000000 ');
// 	strokeWeight(11);
// 	branch(120);
// }

// function draw() {
// }

// function branch(len) {
// 	line(0, 0, 0, -len);
// 	translate(0, -len);

//   	sw = map(len,2,120,1,10);
//   	strokeWeight(sw);
// 	len *=0.6;

// 	if(len > 2) {
// 		push();
// 		rotate(theta);
// 		branch(len);
// 		pop();

// 		push();
// 		rotate(-theta);
// 		branch(len);
// 		pop();
// 	}
// }