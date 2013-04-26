!function () {
	"use strict";

	/**
	 * Converts the date to a number for comparing.
	 * @param {String} date A date to convert in format dd.mm.yyyy or dd/mm/yyyy
	 * @returns {Number} A number representing the value of a date.
	 */
	function dateToNumber(date) {
		var date = date.replace(" ", "");

		if (date.indexOf('.') > 0) {
			// date a, format dd.mn.(yyyy) ; (year is optional)
			var eu_date = date.split('.');
		} else {
			// date a, format dd/mn/(yyyy) ; (year is optional)
			var eu_date = date.split('/');
		}

		// year (optional)
		if (eu_date[2]) {
			var year = eu_date[2];
		} else {
			var year = 0;
		}

		// month
		var month = eu_date[1];
		if (month.length == 1) {
			month = 0 + month;
		}

		// day
		var day = eu_date[0];
		if (day.length == 1) {
			day = 0 + day;
		}

		return year + month + day;
	}

	/**
	 * Compares two dates.
	 * @returns {number} -1 if the first date is smaller, 0 when they are equal, else 1.
	 */
	$.fn.dataTableExt.oSort['eu_date-asc'] = function (a, b) {
		var x = dateToNumber(a);
		var y = dateToNumber(b);

		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	};

	/**
	 * Compares two dates.
	 * @returns {number} 1 if the first date is smaller, 0 when they are equal, else -1.
	 */
	$.fn.dataTableExt.oSort['eu_date-desc'] = function (a, b) {
		var x = dateToNumber(a);
		var y = dateToNumber(b);

		return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	};

}();

