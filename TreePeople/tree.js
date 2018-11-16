function Tree() {

	this.branches = []; // includes trunk b careful!!
	this.leaves = [];

	this.setupTree = function() {
		var a = createVector(width / 2, height);
		var b = createVector(width / 2, height - 100);
		var root = new Branch(a, b);

		this.branches[0] = root;

		if(SELF_SUSTAINING) {
			interval = setInterval(_.bind(this._growTree, this), 1000);
		}
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
		this._addBranches();

		if(iter > MAX_ITER) {
			// tree complete
			clearInterval(interval);
			this._addLeaves();
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

		iter++;
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

