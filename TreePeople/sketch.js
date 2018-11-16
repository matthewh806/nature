// var theta;

var canvas;

var iter = 0;

const MAX_ITER = 10;
const SELF_SUSTAINING = true;

var tree;
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

	tree = new Tree();
	tree.setupTree();
	tree_planted = true;
}

function updateTree() {
	if(!tree_planted)
		return;

	if(SELF_SUSTAINING || iter > MAX_ITER)
		return;

	tree.growTree();	
}

function draw() {
	background('#cdebf9');

	if(tree_planted)
		tree.drawTree();
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