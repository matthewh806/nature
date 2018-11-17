const MAX_ITER = 10;
const SELF_SUSTAINING = true;

function Tree(index, position_x, position_y) {
	this.branches = []; // includes trunk b careful!!
	this.leaves = [];
	this.iter = 0;
	this.index = index;
	this.fully_grown = false;

	this.setupTree = function() {
		console.log("setup:" + this.getTreeName());

		var a = createVector(position_x, position_y);
		var b = createVector(position_x, position_y - 100);
		var root = new Branch(a, b);

		this.branches[0] = root;

		if(SELF_SUSTAINING) {
			this.interval = setInterval(_.bind(this._growTree, this), 1000);
		}
	}

	this.getTreeName = function() {
		return "Tree: " + this.index;
	}

	this.drawTree = function() {
		for(var i = 0; i < this.branches.length; i++) {
			this.branches[i].show();
		}

		for(var i = 0; i < this.leaves.length; i++) {
			fill(255, 0, 100, 100);
			ellipse(this.leaves[i].x, this.leaves[i].y, 8, 8);
			// leaves[i].y += random(-1, 1);
		}
	}

	this._growTree = function() {
		if(this.fully_grown)
			return;

		console.log("grow:" + this.getTreeName() + ", iter: " + this.iter);

		this._addBranches();

		if(this.iter === MAX_ITER) {
			// tree complete
			console.log("finish growing: " + this.getTreeName());
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

