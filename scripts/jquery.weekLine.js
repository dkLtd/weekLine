﻿(function ($) {

	$.fn.weekLine = function (params) {
		if (methods[params]) {
			return methods[params].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof params === 'object' || !params) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + params + ' does not exist on jQuery.weekLine');
		}
	};

	$.fn.weekLine.defaultSettings = {
		dayLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		mousedownSel: true,
		startDate: null,
		singleDaySelect: false,
		allowDeselect: true,
		// dark, white, jquery-ui
		theme: "dark",
		onChange: null
	};

	var methods = {
		init: function (options) {
			return this.each(function () {
				var $week = $(this),
					mouseDown = false,
					selectedDay = "selectedDay",
					weekDaysStyle = "",
					weekHTML = "";
				$week.settings =
						$.extend(true, {}, $.fn.weekLine.defaultSettings, options || {});
				var	theme = $week.settings.theme;

				for (i in $week.settings.dayLabels) {
					weekHTML += "<a data-index-number='" + i +
						(theme == "jquery-ui" ? "' class='ui-state-default'>" : "'>") +
						$week.settings.dayLabels[i] + "</a>";
				}

				if (theme == "jquery-ui") {
					weekDaysStyle = "ui-widget ui-WeekDays";
					selectedDay = "ui-state-active";
				} else {
					weekDaysStyle = "cleanslate weekDays-" + theme;
				}

				$week.settings.selectedDay = selectedDay;
				$week.data("weekLine", $week.settings);

				$week
					.addClass(weekDaysStyle)
					.append(weekHTML)
					.mouseup(function () {
						mouseDown = false;
						return false;
					});

				$days = $week.children()
					.bind("mousedown", function () {
						if ($week.settings.mousedownSel) {
							mouseDown = true;
						}

						//do not select the day if disabled
						if(!$(this).attr('disabled')){
							selectDay(this)
						};
						return false;
					})
					.bind("mouseenter", function () {
						if (!mouseDown) {
							return false;
						}
						//do not select the day if disabled
						if(!$(this).attr('disabled')){
							selectDay(this)
						};
						return false;
					});

				if (theme == "jquery-ui") {
					$days.bind("hover", function () {
						$(this).toggleClass("ui-state-hover");
					});
				}

				function selectDay(day) {
					if ($week.settings.singleDaySelect) {
						$(day).siblings().removeClass(selectedDay);
					}

					if ($week.settings.allowDeselect || !$(day).hasClass(selectedDay))
					{
						$(day).toggleClass(selectedDay);
					}

					// Check if set (because its default is null)
					if ($.isFunction($week.settings.onChange)) {
						$week.settings.onChange.call($week);
					}
				}
			});
		},
		// Returns selected days in various formats
		getSelected: function (format, date) {
			var $settings = $(this).data("weekLine"),
				$prev = null,
				selected = "";

			this.children().each(function () {
				$day = $(this);

				if ($day.hasClass($settings.selectedDay)) {
					switch (format) {
						case "indexes":
							selected += $day.data('indexNumber') + ",";
							break;
						case "dates":
							selected +=
								addDays(date ? date :
									($settings.startDate ? $settings.startDate : new Date()),
								$day.data('indexNumber')) + ",";
							break;
						case "descriptive":
							if ($prev == null) {
								selected = $day.html();
							}
							else {
								if ($day.data('indexNumber') - $prev.data('indexNumber') == 1) {
									var parts =
										selected.split(',')[selected.split(',').length - 1].split('-');

									if (parts.length > 1) {
										selected =
											selected.replace(parts[parts.length - 1], $day.html());
									} else {
										selected += "-" + $day.html();
									}
								} else {
									selected += ", " + $day.html();
								}
							}

							$prev = $day;
							break;
						case "labels":
						default:
							selected += $day.html() + ",";
							break;
					}
				}
			});

			return selected.replace(/,+$/, '');
		},
		setSelected: function (selectedDays) {
			var $this = $(this),
				$settings = $this.data("weekLine"),
				$days = $this.children(),
				selDays = selectedDays.split(',');

			// Reset selected days
			$days.removeClass($settings.selectedDay);

			for (i in selDays) {
				$days.filter(isNaN(selDays[i]) ?
					"a:contains('" + selDays[i] + "')" :
					"a[data-index-number='" + selDays[i] + "']").addClass($settings.selectedDay);
			}
		},

		setDisabled: function (disabledDays) {
			var $this = $(this),
				$settings = $this.data("weekLine"),
				$days = $this.children(),
				selDays = disabledDays.split(',');

			// Reset disabled days
			$days.removeAttr( "disabled" );

			for (i in selDays) {
				$days.filter(isNaN(selDays[i]) ?
					"a:contains('" + selDays[i] + "')" :
					"a[data-index-number='" + selDays[i] + "']").attr( "disabled", true );
			}
		}

	};

	function addDays(strDt, days) {
		var dt = new Date(strDt),
			dt = new Date(dt.setDate(dt.getDate() + Number(days))),
			d = dt.getDate(),
			m = dt.getMonth() + 1,
			y = dt.getFullYear();

		// Return date in ISO 8601 format
		return y + "/" + (m < 10 ? '0' + m : m) + "/" + (d < 10 ? '0' + d : d);
	}

})(jQuery);

// Helper function for getting the next week day
// Monday (0) to Sunday (6)
function nextDay(dayNum) {
	return function(date) {
		var dt = new Date(date || new Date());
		return new Date(dt.getTime() + ((dayNum - dt.getDay() + 7) % 7 + 1) * 86400000);
	};
}
