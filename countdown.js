// shim Object.keys, because we can
if (typeof Object.keys !== "function") {
	Object.keys = function keys(o) {
		var hasOwn = Object.prototype.hasOwnProperty, res = [];
		for (var i in o) {
			if (hasOwn.call(o, i)) {
				res.push(i);
			}
		}
		return res;
	};
}

function theFinalCountdown() {
	var idx = 0;
	var now = Date.now();
	var times = Object.keys(things).sort();  // sort just in case
	while (idx < times.length && Date.parse(times[idx]) < now) {
		++idx;
	}
	if (idx === times.length) {
		$("#event").text("Freedom!");
		$("#countdown").text("... now!");
	} else {
		setCountdown(times[idx]);
	}
}

function setCountdown(time) {
	var date = new Date(time);
	$("#countdown").countdown(date)
	.on("update.countdown", updateCountdown)
	.on("finish.countdown", finishCountdown);

	var stuff = things[time];
	if (stuff.join) stuff = stuff.join(", ");
	$("#event").text(stuff);
	$("#eventtime").text(date.toLocaleFormat());
}

function updateCountdown(event) {
	var format = "%-Mm %Ss";

	if (event.offset.totalDays) {
		// some days left, show days *and* hours
		format = "%-Dd %-Hh " + format;
	} else if (event.offset.hours) {
		// some hours left, show hours
		format = "%-Hh " + format;
	}

	$(this).text(event.strftime(format));
}

function finishCountdown() {
	$(this).text("... now?");
	setTimeout(theFinalCountdown, 15000);
}

function switchEvents() {
	things = things == events ? exams : events;
	theFinalCountdown();
}

$(theFinalCountdown);
