import Branch from './branch'
import _ from 'underscore'

const SELF_SUSTAINING = true;
const MAX_ITER = 8;
const DEFAULT_LEAF_COLOR_SET = ['#ff0064', '#a0d5b5', '#ffffff', '#cf4532', '#cf9332', '#bdcf32'];

export default class Tree {
	constructor(index, position_x, position_y, growth_rate, config) {
		this.branches = []; // includes trunk b careful!!
		this.leaves = [];
		this.iter = 0;
		this.max_iter = MAX_ITER;
		this.position_x = position_x;
		this.position_y = position_y;
		this.index = index;
		this.fixed_angle = undefined;
		this.fully_grown = false; 
		this.leaf_color_set = DEFAULT_LEAF_COLOR_SET;
		this.branch_color = "#000000";
		this.tree_size = myp5.int(myp5.random(70, 130));
		this.growth_rate = (typeof growth_rate === 'undefined') ? 1000 : growth_rate;
		this.config = config;
	}

	setupTree() {
		console.log("setup:" + this.getTreeName());
		this.fixed_angle = this.setFixedAngle();

		if(this.config) {
			this.leaf_color_set = this.config.colorScheme.leafColorSet;
			this.branch_color = this.config.colorScheme.branchColor;
			this.max_iter = this.config.maxIter;
		}

		// this.max_iter = Math.min(this.max_iter, MAX_ITER);
		console.log("it ter ter ter: " + this.max_iter);
		this.leaf_color = myp5.color(this.leaf_color_set[myp5.int(myp5.random(0, this.leaf_color_set.length))])

		var a = myp5.createVector(this.position_x, this.position_y);
		var b = myp5.createVector(this.position_x, this.position_y - this.tree_size);

		var angle = this.fixed_angle ? myp5.random(myp5.PI/6, myp5.PI/2) : undefined;
		var root = new Branch(a, b, this.branch_color, angle, this.fixed_angle, 0.67);

		this.branches[0] = root;

		if(SELF_SUSTAINING) {
			this.interval = setInterval(_.bind(this._growTree, this), this.growth_rate);
		}

		console.log("Finished setup: " + this.getTreeDescriptionString());	
	}

	getTreeName() {
		return "Tree: " + this.index;
	}

	getNumberOfBranches() {
		return this.branches.length;
	}

	getNumberOfLeaves() {
		return this.leaves.length;
	}

	setFixedAngle() {
		var val = myp5.random();

		if(val < 0.25) {
			return true;
		}

		return false;
	}

	getTreeDescriptionString() {
		return "Tree: id: " + this.index + ", leaf col: " + this.leaf_color + 
		", growth_rate (ms): " + this.growth_rate + ", tree_size: " + this.tree_size + ", fixed_angle: " + this.fixed_angle +  ", branch scale factor: " + this.branches[0].scale_factor;
	}

	drawTree() {
		for(var i = 0; i < this.branches.length; i++) {
			this.branches[i].show();
		}

		for(var i = 0; i < this.leaves.length; i++) {
			myp5.fill(this.leaf_color);
			myp5.ellipse(this.leaves[i].x, this.leaves[i].y, 8, 8);
		}
	}

	_growTree() {
		if(this.fully_grown)
			return;

		console.log("grow:" + this.getTreeName() + ", iter: " + this.iter);

		console.log("this.iter: " + this.iter + ", max_iter: " + this.max_iter);
		if(this.iter >= this.max_iter) {
			// tree complete
			console.log("finish growing: " + this.getTreeName() + ", branches: " + this.branches.length);
			clearInterval(this.interval);
			this._addLeaves();

			this.fully_grown = true;

			return;
		}

		this._addBranches();
	}

	_addBranches() {
		for(var i = this.branches.length-1; i >= 0; i--) {
			if(!this.branches[i].finished) {
				this.branches.push(this.branches[i].branchA());
				this.branches.push(this.branches[i].branchB());
			}

			this.branches[i].finished = true;
		}

		this.iter++;
	}

	_addLeaves() {
		for(var i = 0; i < this.branches.length; i++) {
			if(!this.branches[i].finished) {
				var leaf = this.branches[i].end.copy();
				this.leaves.push(leaf);
			}
		}
	}
}

