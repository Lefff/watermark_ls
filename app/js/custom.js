// вызывает слайдер (для установки прозрачности) из JQ UI
// https://jqueryui.com/slider/
$(function() {
	$("#slider").slider({
		max: 100,
		min: 0,
		range: "min",
		value: 100,
		animate: true
	});
});

// вызывает спиннер из JQ UI
// http://api.jqueryui.com/spinner/
$(function() {
	$('#gutter-width').spinner({
		max: 100,
		min: -100
	});
	$('#gutter-height').spinner({
		max: 100,
		min: -100
	});
	$('#position-vertical').spinner({
		max: 100,
		min: -100
	});
	$('#position-horizontal').spinner({
		max: 100,
		min: -100
	});
});

// вызывает табы
// http://os.alfajango.com/easytabs/#tabs1-js
$(function() {
	$( "#tab-container" ).easytabs({
		animationSpeed : "fast"
	});
});

// стилизация fileinput'ов
// http://moro.es/projects/jquery-nicefileinput-js/
$(function() {
	$("input[type=file]").nicefileinput();
});

