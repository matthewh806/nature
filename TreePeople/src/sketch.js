import p5 from 'p5'
import _ from 'underscore'
import 'p5/lib/addons/p5.dom'
import Garden from './garden'

const sketch = function(myp5) {
	var canvas;
	window.myp5 = myp5;

	var garden;

	myp5.preload = function() {

	}

	myp5.setup = function(){
		canvas = myp5.createCanvas(800, 600);
		canvas.class("garden");

		garden = new Garden();
	}

	myp5.draw = function() {
		garden.draw();
	}
}
	

export default sketch;
