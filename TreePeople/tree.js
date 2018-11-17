const MAX_ITER = 10;
const SELF_SUSTAINING = true;
const LEAF_COLORS = ['#ff0064', '#a0d5b5', '#ffffff', '#cf4532', '#cf9332', '#bdcf32'];

function Tree(index, position_x, position_y, growth_rate) {
	this.branches = []; // includes trunk b careful!!
	this.leaves = [];
	this.iter = 0;
	this.index = index;
	this.fixed_angle = undefined;
	this.fully_grown = false; 
	this.leaf_color = color(LEAF_COLORS[int(random(0, LEAF_COLORS.length))]);
	this.tree_size = int(random(70, 130));
	this.growth_rate = (typeof growth_rate === 'undefined') ? 1000 : growth_rate;

	this.setupTree = function() {
		console.log("setup:" + this.getTreeName());
		this.fixed_angle = this.setFixedAngle();

		var a = createVector(position_x, position_y);
		var b = createVector(position_x, position_y - this.tree_size);

		var angle = this.fixed_angle ? random(PI/6, PI/2) : undefined;
		var root = new Branch(a, b, undefined, angle, this.fixed_angle, 0.67);

		this.branches[0] = root;

		if(SELF_SUSTAINING) {
			this.interval = setInterval(_.bind(this._growTree, this), this.growth_rate);
		}

		console.log("Finished setup: " + this.getTreeDescriptionString());	
	}

	this.getTreeName = function() {
		return "Tree: " + this.index;
	}

	this.setFixedAngle = function() {
		var val = random();

		if(val < 0.25) {
			return true;
		}

		return false;
	}

	this.getTreeDescriptionString = function() {
		return "Tree: id: " + this.index + ", leaf col: " + this.leaf_color + 
		", growth_rate (ms): " + this.growth_rate + ", tree_size: " + this.tree_size + ", fixed_angle: " + this.fixed_angle +  ", branch scale factor: " + this.branches[0].scale_factor;
	}

	this.drawTree = function() {
		for(var i = 0; i < this.branches.length; i++) {
			this.branches[i].show();
		}

		for(var i = 0; i < this.leaves.length; i++) {
			fill(this.leaf_color);
			ellipse(this.leaves[i].x, this.leaves[i].y, 8, 8);
		}
	}

	this._growTree = function() {
		if(this.fully_grown)
			return;

		console.log("grow:" + this.getTreeName() + ", iter: " + this.iter);

		this._addBranches();

		if(this.iter === MAX_ITER) {
			// tree complete
			console.log("finish growing: " + this.getTreeName() + ", branches: " + this.branches.length);
			clearInterval(this.interval);
			this._addLeaves();

			this.fully_grown = true;
		}
	}

	this._addBranches = function() {
		for(var i = this.branches.length-1; i >= 0; i--) {
			if(!this.branches[i].finished) {
				this.branches.push(this.branches[i].branchA());
				this.branches.push(this.branches[i].branchB());
			}

			this.branches[i].finished = true;
		}

		this.iter++;
	}

	this._addLeaves = function() {
		for(var i = 0; i < this.branches.length; i++) {
			if(!this.branches[i].finished) {
				var leaf = this.branches[i].end.copy();
				this.leaves.push(leaf);
			}
		}
	}
}

