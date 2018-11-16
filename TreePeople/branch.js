function Branch(begin, end, color) {
	this.begin = begin;
	this.end = end;
	this.finished = false;
	this.mag = p5.Vector.sub(this.end, this.begin).mag();
  	this.sw = map(this.mag, 2,120,1,10);
  	this.angle = random(0, PI/2);

	this.show = function() {
		strokeWeight(this.sw);
		stroke('#000000');
		line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	}

	this.branchA = function() {
		return this._createBranch(this.begin, this.end, this.angle, 0.67);
	}

	this.branchB = function() {
		return this._createBranch(this.begin, this.end, -this.angle, 0.67);
	}

	this._createBranch = function(begin, end, angle, mult_factor) {
		var dir = p5.Vector.sub(end, begin);
		dir.rotate(angle);
		dir.mult(mult_factor);

		var newEnd = p5.Vector.add(end, dir);
		var b = new Branch(end, newEnd);

		return b;
	}
}