// var theta;

var canvas;

var iter = 0;

const MAX_TREES = 2;

var trees = [];
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
	if(maxTreesPlanted())
		return;

	tree = new Tree(0, 0.25*width, height);
	tree.setupTree();
	trees.push(tree);

	tree = new Tree(0, 0.75*width, height);
	tree.setupTree();
	trees.push(tree);

	tree_planted = true;
}

function draw() {
	background('#cdebf9');

	if(tree_planted) {
		_.each(trees, function(t) { t.drawTree(); });
	}
}

function maxTreesPlanted() {
	return trees.length === MAX_TREES;
}