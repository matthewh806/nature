import p5 from 'p5'
import _ from 'underscore'
import 'p5/lib/addons/p5.dom'
import Day from './day'
import Tree from './tree'

const sketch = function(myp5) {
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

	window.myp5 = myp5;
	window.DEBUG = true;

	myp5.preload = function() {

	}

	myp5.setup = function(){
		canvas = myp5.createCanvas(1200, 600);
		canvas.class("garden");

		day = new Day();

		plant_tree_btn = myp5.createButton('Plant tree!');
		plant_tree_btn.position(580, 19);
		plant_tree_btn.mousePressed(_.bind(this.plantTreeClicked, this));

		this.max_trees = myp5.int(myp5.width / 200);

		if(DEBUG) {
			for(var i = 0; i < this.max_trees; i++) {
				this.plantTree();
			}
		}

		console.log("Max trees: " + this.max_trees);
	}

	myp5.draw = function() {
		var target_c = day.getColorForCurrentTime();
		// this.setGradient(0, 0, myp5.width, myp5.height, myp5.color('#ffffff'), target_c, Y_AXIS);

		if(tree_planted) {
			_.each(trees, function(t) { t.drawTree(); });
		}
	}

	myp5.getRandomProperty = function(obj) {
		// TODO: This is very hacky
		if(DEBUG) {
			return TREE_GROWTH_SPEEDS["STUPID_FAST_DEV_SPEED"];
		}

		var keys = Object.keys(obj);
		return obj[keys [ keys.length * Math.random() << 0]];
	}

	myp5.plantTreeClicked = function() {
		if(DEBUG) {
			console.log("Dev mode this doesn't work -- nah nah!");
			return;
		}

		this.plantTree();
	}

	myp5.plantTree = function() { 
		if(this.maxTreesPlanted()) {
			console.log("Max trees planted!");
			return;
		}

		var idx = trees.length;
		console.log(myp5.width/(this.max_trees+1));

		var speed = this.getRandomProperty(TREE_GROWTH_SPEEDS);
		var scheme = day.getTreeColorSchemeForCurrentTime();

		var config = {
			colorScheme: scheme
		};

		var x_pos = (idx/this.max_trees)*myp5.width+(myp5.width/(this.max_trees*2));
		var tree = new Tree(idx, x_pos, myp5.height, speed, config);
		tree.setupTree();
		trees.push(tree);

		tree_planted = true;
	}

	myp5.maxTreesPlanted = function() {
		console.log(trees.length);
		return trees.length === this.max_trees;
	}

	myp5.setGradient = function(x, y, w, h, c1, c2, axis) {
		myp5.noFill();

		if(axis == Y_AXIS) {
			for(var i = y; i <= y+h; i++) {
				var inter = myp5.map(i, y, y+h, 0, 1);
				var c = lerpColor(c2, c1, inter); // This is just a hack to get around the inverse y axis of processing!
				stroke(c);
				line(x, i, x+w, i);
			}
		} else if(axis == X_AXIS) {
			for(var i = x; i <= x+w; i++) {
				var inter = myp5.map(i, x, x+w, 0, 1);
				var c = myp5.lerpColor(c1, c2, inter);
				myp5.stroke(c);
				myp5.line(i, y, i, y+h)
			}
		}
	}
}

export default sketch;
