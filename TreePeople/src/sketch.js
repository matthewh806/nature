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
		canvas = myp5.createCanvas(1200, 600);
		canvas.class("garden");

		garden = new Garden();

		var plant_tree_btn = myp5.createButton('Plant tree!');
		plant_tree_btn.position(580, 19);
		plant_tree_btn.mousePressed(function() {
			garden.plantTreeClicked();
		});
	}

	myp5.draw = function() {
		garden.draw();
	}
}
	

export default sketch;
