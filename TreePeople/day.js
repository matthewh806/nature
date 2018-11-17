// This class is for encapsulating every related to day and getting all attributes (color etc) for that day
// TODO: Should be a singleton!

var PART_OF_DAY = {
	MORNING: 1,
	AFTERNOON: 2,
	EVENING: 3,
	NIGHT: 4
};

FIXED_TIME = PART_OF_DAY.NIGHT;

function Day() {
	this.getColorForCurrentTime = function() {
		var part_of_day = this._getPartOfDay();

		if(part_of_day === PART_OF_DAY.MORNING || part_of_day === PART_OF_DAY.AFTERNOON) 
			return color('#cdebf9');

		if(part_of_day === PART_OF_DAY.EVENING) 
			return color('#ffd6d6');

		if(part_of_day === PART_OF_DAY.NIGHT) 
			return color('#000000');
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


