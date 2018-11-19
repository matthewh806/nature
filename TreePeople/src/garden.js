import _ from 'underscore'
import Day from './day'
import Tree from './tree'

const TREE_WIDTH = 200;
const TREE_GROWTH_SPEEDS = {"SLOW": 3000,"MEDIUM": 1500, "FAST": 1000, "STUPID_FAST_DEV_SPEED": 0} // milliseconds
const Y_AXIS = 1;
const X_AXIS = 2;

export default class Garden {
	constructor() {
		this.trees = [];
		this.plant_tree_btn;
		this.day = new Day();
		this.max_trees = myp5.int(myp5.width / 200);

		this.plant_tree_btn = myp5.select('.js-make-tree');
		this.plant_tree_btn.mousePressed(_.bind(function() {
			this.plantTreeClicked();
		}, this));

		this.iterations_select = myp5.select('.js-select-iterations');
		this.iterations_select.changed(_.bind(function() {
			this.clearGarden();

			if(DEBUG) {
				for(var i = 0; i < this.max_trees; i++) {
					this.plantTree();
				}
			}
		}, this));

		this.tree_count_txt = myp5.select('.js-no-trees').html(0);
		this.branch_count_txt = myp5.select('.js-no-branches').html(0);
		this.leaf_count_txt = myp5.select('.js-no-leaves').html(0);
		
		if(DEBUG) {
			for(var i = 0; i < this.max_trees; i++) {
				this.plantTree();
			}
		}

		console.log("Max trees: " + this.max_trees);
	}

	draw() {
		var target_c = this.day.getColorForCurrentTime();
		this.setGradient(0, 0, myp5.width, myp5.height, myp5.color('#ffffff'), target_c, Y_AXIS);

		_.each(this.trees, function(t) { t.drawTree(); });

		this.updateUI()
	}

	updateUI() {
		var branches = this.trees.reduce((s, t) => s + t.getNumberOfBranches(), 0) - this.trees.length;
		var leaves = this.trees.reduce((s, t) => s + t.getNumberOfLeaves(), 0);

		this.branch_count_txt.html(branches);
		this.leaf_count_txt.html(leaves);
	}

	clearGarden() {
		this.trees = [];
	}

	plantTreeClicked() {
		if(DEBUG) {
			console.log("Dev mode this doesn't work -- nah nah!");
			return;
		}

		this.plantTree();
	}

	plantTree() { 
		if(this.maxTreesPlanted()) {
			console.log("Max trees planted!");
			return;
		}

		var idx = this.trees.length;
		console.log(myp5.width/(this.max_trees+1));

		var speed = this.getRandomProperty(TREE_GROWTH_SPEEDS);
		var scheme = this.day.getTreeColorSchemeForCurrentTime();

		var config = {
			colorScheme: scheme,
			maxIter: this.iterations_select.value()
		};

		var x_pos = (idx/this.max_trees)*myp5.width+(myp5.width/(this.max_trees*2));
		var tree = new Tree(idx, x_pos, myp5.height, speed, config);
		tree.setupTree();
		this.trees.push(tree);

		this.tree_planted = true;

		this.tree_count_txt.html(this.trees.length);
	}

	maxTreesPlanted() {
		return this.trees.length === this.max_trees;
	}

	setGradient(x, y, w, h, c1, c2, axis) {
		myp5.noFill();

		if(axis == Y_AXIS) {
			for(var i = y; i <= y+h; i++) {
				var inter = myp5.map(i, y, y+h, 0, 1);
				var c = myp5.lerpColor(c2, c1, inter); // This is just a hack to get around the inverse y axis of processing!
				myp5.stroke(c);
				myp5.line(x, i, x+w, i);
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

	getRandomProperty(obj) {
		// TODO: This is very hacky
		if(DEBUG) {
			return TREE_GROWTH_SPEEDS["STUPID_FAST_DEV_SPEED"];
		}

		var keys = Object.keys(obj);
		return obj[keys [ keys.length * Math.random() << 0]];
	}
}