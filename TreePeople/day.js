// This class is for encapsulating every related to day and getting all attributes (color etc) for that day
// TODO: Should be a singleton!

var PART_OF_DAY = {
	MORNING: 1,
	AFTERNOON: 2,
	EVENING: 3,
	NIGHT: 4
};

FIXED_TIME = PART_OF_DAY.MORNING;

function Day() {

	this.getTreeColorSchemeForCurrentTime = function() {
		if(this._isMorning() || this._isAfternoon()) 
			return { 
				leaf_color_set: ['#ff0064', '#a0d5b5', '#ffffff', '#cf4532', '#cf9332', '#bdcf32'],
				trunk_colors: []
			}

		if(this._isEvening()) 
			return { 
				leaf_color_set: ['#bfff00'],
				trunk_colors: []
			}

		if(this._isNight()) 
			return { 
				leaf_color_set: ['#ff9933'],
				trunk_colors: []
			}
	}

	this.getColorForCurrentTime = function() {
		if(this._isMorning() || this._isAfternoon()) 
			return color('#cdebf9');

		if(this._isEvening()) 
			return color('#ffd6d6');

		if(this._isNight()) 
			return color('#000000');
	}

	this._isMorning = function(part_of_day) {
		return this._getPartOfDay() === PART_OF_DAY.MORNING;
	}

	this._isAfternoon = function (part_of_day) {
		return this._getPartOfDay() === PART_OF_DAY.AFTERNOON;
	}

	this._isEvening = function(part_of_day) {
		return this._getPartOfDay() === PART_OF_DAY.EVENING;
	}

	this._isNight = function(part_of_day) {
		return this._getPartOfDay() === PART_OF_DAY.NIGHT;
	}

	this._getPartOfDay = function() {
		if(DEV_MODE)
			return FIXED_TIME;

		if(hour() < 7 || hour() > 21)
			return PART_OF_DAY.NIGHT;

		if(hour() < 12) 
			return PART_OF_DAY.DAY;

		if(hour() < 17) 
			return PART_OF_DAY.AFTERNOON;

		if(hour() < 21)
			return PART_OF_DAY.EVENING;
	}
}


