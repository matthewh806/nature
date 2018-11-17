function Branch(begin, end, color, angle, fixed_angle, scale_factor) {
	this.begin = begin;
	this.end = end;
	this.finished = false;
	this.mag = p5.Vector.sub(this.end, this.begin).mag();
	this.sw = map(this.mag, 2,120,1,10);
	this.fixed_angle = fixed_angle;
	this.angle = (typeof angle === 'undefined') ? random(0, PI/2) : angle;
	this.scale_factor = (typeof scale_factor === 'undefined') ? random(0.45, 0.68) : scale_factor;
	this.color = (typeof color === 'undefined') ? '#000000' : color;

	this.show = function() {
		strokeWeight(this.sw);
		stroke("#000000");
		line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	}

	this.branchA = function() {
		return this._createBranch(this.begin, this.end, this.angle, this.scale_factor);
	}

	this.branchB = function() {
		return this._createBranch(this.begin, this.end, -this.angle, this.scale_factor);
	}

	this._createBranch = function(begin, end, angle, mult_factor) {
		var dir = p5.Vector.sub(end, begin);
		dir.rotate(angle);
		dir.mult(mult_factor);

		var newEnd = p5.Vector.add(end, dir);
		var b = new Branch(end, newEnd, color, this.fixed_angle ? angle : undefined, this.fixed_angle, mult_factor);

		// console.log("Created Branch: begin: " + b.begin + " , end: " + b.end, ", angle: " + b.angle + ", color: " + b.color + ", scale_factor: " + b.scale_factor);
		return b;
	}
}