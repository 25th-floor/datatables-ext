!function () {
	"use strict";

	/**
	 * Converts the date to a normalized representation for comparing.
	 * @param {String} dateTime A date to convert in format `dd.MM.YYYY [hh:mm:ss]`
	 *                          or `dd/MM/YYYY [hh:mm:ss]`
	 * @returns {String} A normalized date string suitable for comparison.
	 */
	function normalizeDateTime(dateTime) {
		var dateTimeParts = dateTime.split(' ');
		var date = dateTimeParts[0];
		var time = dateTimeParts[1];

		// date

		var dateParts = date.split(/[\.\/]/);

		var year = dateParts[2] || '0000';
		(year.length === 2) && (year = '00' + year);
		var month = dateParts[1];
		(month.length === 1) && (month = '0' + month);
		var day = dateParts[0];
		(day.length === 1) && (day = '0' + day);

		date = year + month + day;
		if (!time) return date + '000000';

		// time

		var timeParts = time.split(':');

		var seconds = timeParts[2] || '00';
		(seconds.length === 1) && (seconds = '0' + seconds);
		var minutes = timeParts[1];
		(minutes.length === 1) && (minutes = '0' + minutes);
		var hours = timeParts[0];
		(hours.length === 1) && (hours = '0' + hours);

		time = hours + minutes + seconds;
		return date + time;
	}

	/**
	 * Compares two dates.
	 * @returns {number} -1 if the first date is smaller, 0 when they are equal, else 1.
	 */
	$.fn.dataTableExt.oSort['eu_date-asc'] = function (a, b) {
		var x = normalizeDateTime(a);
		var y = normalizeDateTime(b);

		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	};

	/**
	 * Compares two dates.
	 * @returns {number} 1 if the first date is smaller, 0 when they are equal, else -1.
	 */
	$.fn.dataTableExt.oSort['eu_date-desc'] = function (a, b) {
		var x = normalizeDateTime(a);
		var y = normalizeDateTime(b);

		return ((x < y) ? 1 : ((x > y) ? -1 : 0));
	};

}();

