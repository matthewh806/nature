// var theta;

var canvas;
var tree = [];
var leaves = [];
var iter = 0;

const MAX_ITER = 10;
const SELF_SUSTAINING = true;

var plant_tree_btn;

var tree_planted = false;

function preload() {

}

function setup() {
	canvas = createCanvas(640, 360);
	canvas.class("garden");

	background('#cdebf9');	

	plant_tree_btn = createButton('Plant tree!');
	plant_tree_btn.position(580, 19);
	plant_tree_btn.mousePressed(plantTree);
}

function plantTree() {
	if(tree_planted)
		return;

	setupTree();
	tree_planted = true;
}

function updateTree() {
	if(!tree_planted)
		return;

	if(SELF_SUSTAINING || iter > MAX_ITER)
		return;

	growTree();	
}

function draw() {
	background('#cdebf9');

	for(var i = 0; i < tree.length; i++) {
		tree[i].show();
	}

	for(var i = 0; i < leaves.length; i++) {
		fill(255, 0, 100, 100);
		ellipse(leaves[i].x, leaves[i].y, 8, 8);
		// leaves[i].y += random(-1, 1);
	}
}

function setupTree() {
	var a = createVector(width / 2, height);
	var b = createVector(width / 2, height - 100);
	var root = new Branch(a, b);

	tree[0] = root;

	if(SELF_SUSTAINING) {
		interval = setInterval(function() {
			growTree();

			if(iter > MAX_ITER) {
				// tree complete
				clearInterval(interval);

				for(var i = 0; i < tree.length; i++) {
					if(!tree[i].finished) {
						var leaf = tree[i].end.copy();
						leaves.push(leaf);
					}
				}
			}
		}, 1000);
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