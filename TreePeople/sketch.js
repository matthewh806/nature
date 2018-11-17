// var theta;

var canvas;

var iter = 0;

var trees = [];
var plant_tree_btn;

var tree_planted = false;

var TREE_WIDTH = 200;

function preload() {

}

function setup() {
	canvas = createCanvas(600, 600);
	canvas.class("garden");

	background('#cdebf9');	

	plant_tree_btn = createButton('Plant tree!');
	plant_tree_btn.position(580, 19);
	plant_tree_btn.mousePressed(plantTree);

	this.max_trees = int(width / 200);

	console.log("Max trees: " + this.max_trees);
}

function plantTree() {
	if(maxTreesPlanted()) {
		console.log("Max trees planted!");
		return;
	}

	var idx = trees.length;
	console.log(width/(this.max_trees+1));
	var tree = new Tree(idx, (idx/this.max_trees)*width+(width/(this.max_trees*2)), height);
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
	console.log(trees.length);
	return trees.length === this.max_trees;
}