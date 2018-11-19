// This class is for encapsulating every related to day and getting all attributes (color etc) for that day
// TODO: Should be a singleton!

var PART_OF_DAY = {
	MORNING: 1,
	AFTERNOON: 2,
	EVENING: 3,
	NIGHT: 4
};

var FIXED_TIME = PART_OF_DAY.EVENING;

export default class Day {
	getTreeColorSchemeForCurrentTime() {
		if(this._isMorning() || this._isAfternoon()) 
			return { 
				leafColorSet: ['#ff0064', '#a0d5b5', '#ffffff', '#cf4532', '#cf9332', '#bdcf32'],
				branchColor: '#000000'
			}

		if(this._isEvening()) 
			return { 
				leafColorSet: ['#bfff00'],
				branchColor: '#000000'
			}

		if(this._isNight()) 
			return { 
				leafColorSet: ['#ff9933'],
				branchColor: '#ffffff'
			}
	}

	getColorForCurrentTime() {
		if(this._isMorning() || this._isAfternoon()) 
			return myp5.color('#cdebf9');

		if(this._isEvening()) 
			return myp5.color('#ffd6d6');

		if(this._isNight()) 
			return myp5.color('#000000');
	}

	_isMorning(part_of_day) {
		return this._getPartOfDay() === PART_OF_DAY.MORNING;
	}

	_isAfternoon(part_of_day) {
		return this._getPartOfDay() === PART_OF_DAY.AFTERNOON;
	}

	_isEvening(part_of_day) {
		return this._getPartOfDay() === PART_OF_DAY.EVENING;
	}

	_isNight(part_of_day) {
		return this._getPartOfDay() === PART_OF_DAY.NIGHT;
	}

	_getPartOfDay() {
		if(DEBUG)
			return FIXED_TIME;

		if(myp5.hour() < 12) 
			return PART_OF_DAY.DAY;

		if(myp5.hour() < 17) 
			return PART_OF_DAY.AFTERNOON;

		if(myp5.hour() < 21)
			return PART_OF_DAY.EVENING;

		return PART_OF_DAY.NIGHT;
	}
}


