import * as p5 from './p5.js'

const DEV_MODE = false;
var canvas;

var iter = 0;

var trees = [];
var plant_tree_btn;

var day;

var tree_planted = false;

const TREE_WIDTH = 200;
const TREE_GROWTH_SPEEDS = {"SLOW": 3000,"MEDIUM": 1500, "FAST": 1000, "STUPID_FAST_DEV_SPEED": 0} // milliseconds
const Y_AXIS = 1;
const X_AXIS = 2;

function preload() {

}

function getRandomProperty(obj) {
	// TODO: This is very hacky
	if(DEV_MODE) {
		return TREE_GROWTH_SPEEDS["STUPID_FAST_DEV_SPEED"];
	}

	var keys = Object.keys(obj);
	return obj[keys [ keys.length * Math.random() << 0]];
}

function setup() {
	canvas = createCanvas(1200, 600);
	canvas.class("garden");

	day = new Day();

	plant_tree_btn = createButton('Plant tree!');
	plant_tree_btn.position(580, 19);
	plant_tree_btn.mousePressed(plantTreeClicked);

	this.max_trees = int(width / 200);

	if(DEV_MODE) {
		for(var i = 0; i < this.max_trees; i++) {
			plantTree();
		}
	}

	console.log("Max trees: " + this.max_trees);
}

function plantTreeClicked() {
	if(DEV_MODE) {
		console.log("Dev mode this doesn't work -- nah nah!");
		return;
	}

	plantTree();
}

function plantTree() {
	if(maxTreesPlanted()) {
		console.log("Max trees planted!");
		return;
	}

	var idx = trees.length;
	console.log(width/(this.max_trees+1));

	var speed = getRandomProperty(TREE_GROWTH_SPEEDS)
	var scheme = day.getTreeColorSchemeForCurrentTime();

	var config = {
		colorScheme: scheme
	};

	var x_pos = (idx/this.max_trees)*width+(width/(this.max_trees*2));
	var tree = new Tree(idx, x_pos, height, speed, config);
	tree.setupTree();
	trees.push(tree);

	tree_planted = true;
}

function draw() {
	var target_c = day.getColorForCurrentTime();
	setGradient(0, 0, width, height, color('#ffffff'), target_c, Y_AXIS);

	if(tree_planted) {
		_.each(trees, function(t) { t.drawTree(); });
	}
}

function maxTreesPlanted() {
	console.log(trees.length);
	return trees.length === this.max_trees;
}

function setGradient(x, y, w, h, c1, c2, axis) {
	noFill();

	if(axis == Y_AXIS) {
		for(var i = y; i <= y+h; i++) {
			var inter = map(i, y, y+h, 0, 1);
			var c = lerpColor(c2, c1, inter); // This is just a hack to get around the inverse y axis of processing!
			stroke(c);
			line(x, i, x+w, i);
		}
	} else if(axis == X_AXIS) {
		for(var i = x; i <= x+w; i++) {
			var inter = map(i, x, x+w, 0, 1);
			var c = lerpColor(c1, c2, inter);
			stroke(c);
			line(i, y, i, y+h)
		}
	}
}