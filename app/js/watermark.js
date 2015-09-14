var watermark = (function() {

	var watermark          = $('#wrapper__watermark'),
		watermarkImg       = $('#watermark'),
		parent             = $('#wrapper__img-parent'),
		parentImg          = $('#img-parent'),
		currentPosX        = watermark.css('left'),
		currentPosXint     = parseInt(currentPosX, 10),
		currentPosY        = watermark.css('top'),
		currentPosYint     = parseInt(currentPosY, 10),
		container          = $('#tab-container'),
		tabContainerpos    = container.find('.tab-inner_pos'),
		tabContainergut    = container.find('.tab-inner_gut'),
		tabContainer       = container.find('.tab-inner'),
		tabs1Container     = $('#tabs1'),
		tabs2Container     = $('#tabs2'),
		spanHor            = $('.gutter-preview-horizontal'),
		spanVert           = $('.gutter-preview-vertical'),
		divForDrag         = $('.divForDrag'), //Дополнительный див для ограничения области клонированных WM
		gutterPreview      = 2,
		gutterWidth        = $('#gutter-width'),
		gutterHeight       = $('#gutter-height'),
		positionVertical   = $('#position-vertical'),
		positionHorizontal = $('#position-horizontal'),
		watermarkPosition  = $('.watermark-position'),
		canvasPreview      = $('.canvas-preview'),
		input              = $('.input'),
		position           = $('.position'),
		multiply           = $('.multiply'),
		resetGreyBtn       = $('.grey-btn'),
		opacityBlock       = {};

	// Инициализирует наш модуль
	var init = function () {
		_setUpListners();
		dragDrop();
		initSlider();
		_currentPos();
		initSpinner();
	};
	// Прослушивает события
	var _setUpListners = function (){
		watermarkPosition.on('click', moveWMbyFixPos);
		positionVertical.on('spin', moveWMbyStepY);
		positionHorizontal.on('spin', moveWMbyStepX);
		input.on('keydown', disableInputChar);
		position.on('change', changePosWm);
		multiply.on('change', changeMarginWm);
		tabContainer.on('click', toogleTabs);
		tabContainerpos.on('click', cloneWm);
		gutterWidth.on('spin', changeMarginLeft);
		gutterHeight.on('spin', changeMarginBottom);
		resetGreyBtn.on('click', _reset);
	};

	//Инициализирует плагин со слайдером
	function initSlider(){
		opacityBlock = $( '#slider' ).slider({
			animate: true,
			range: 'min',
			value: 1,
			min: 0,
			max: 1,
			step: 0.001,
			slide: changeOpacity
		});
	}

	 //Инициализирует плагин со спинером
	var initSpinner =function() {
		gutterWidth.spinner({
			max: 550,
			min: 0
		});
		gutterHeight.spinner({
			max: 500,
			min: 0
		});
		positionVertical.spinner({
			max: 535,
			min: 0
		});
		positionHorizontal.spinner({
			max: 650,
			min: 0
		});
	};

	//Выводит прозрачность вотермарки
	var changeOpacity = function(event, ui){
		slideVal = (ui.value);
		watermark.css( 'opacity', slideVal);
	};

	// Drag & drop
	var dragDrop = function() {

		if( tabContainergut.hasClass('active') ){
			watermark.draggable({
				containment: parent,
				snap: parent.selector,
				snapTolerance: 0,
				cursor: 'move',
				drag: function(event, ui) {
					watermark.removeClass('wrapper__watermark_animated');

					watermarkPosition.removeClass('active-watermark-position');
					
					_currentPos();
				},
				stop: _currentPos,
			})
		}
		else {
			watermark.draggable({
				containment: divForDrag,
				cursor: 'move'
			});
		}
	};

	//Выводит текущую позицию в инпутах
	var _currentPos = function() {
		var coordinate = watermark.position();

		positionHorizontal.val(
		Math.round((coordinate.left))
		);
		positionVertical.val(
		Math.round((coordinate.top))
		);
	};

	// Запрещает вводить буквы в инпутах
	var disableInputChar = function(event) {
		// Разрешаем: backspace, delete, tab и escape
		if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
			 // Разрешаем: Ctrl+A
			(event.keyCode == 65 && event.ctrlKey === true) ||
			 // Разрешаем: home, end, влево, вправо
			(event.keyCode >= 35 && event.keyCode <= 39)) {
				 // Ничего не делаем
				 return;
		}
		else {
			// Убеждаемся, что это цифра, и останавливаем событие keypress
			if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
				event.preventDefault();
			}
		}
	};

	//Сбрасывает все настройки
	 var _clean = function(ui){
		input.val(0);
		spanHor.height(gutterPreview);
		spanVert.width(gutterPreview);
		canvasPreview.find('.active-watermark-position').removeClass('active-watermark-position');
		$('#top-left').addClass('active-watermark-position');
	}

	//вызывает табы
	var toogleTabs = function( e ) {
		e.preventDefault();

		tabContainer.removeClass('active');

		$(this).addClass('active');

		if( tabContainerpos.hasClass('active') ){
			tabs1Container.css('display', 'block');
			tabs2Container.css('display', 'none');
			dragDrop();
			_clean();
		}
		else {
			tabs2Container.css('display', 'block');
			tabs1Container.css('display', 'none');
			watermarkImg.nextAll().remove();
			divForDrag.removeClass('divForDragMultiply');
			watermark.removeAttr('style');
			watermarkImg.removeAttr('style');
			dragDrop();
			_clean();
		}
	};

	//Манипуляции с одной вотермаркой:

	//Передвигает вотермарк по фиксированным позициям
	var moveWMbyFixPos = function (ui){

		var
			$this = $( this ),
			pos   = '';
			flag  = true;

		switch( $this.attr('id') ) {
			case 'top-left':
				pos = 'left top';
				break
			case 'top-center':
				pos = 'center top';
				break
			case 'top-right':
				pos = 'right top';
				break
			case 'middle-left':
				pos = 'left center';
				break
			case 'middle-center':
				pos = 'center center';
				break
			case 'middle-right':
				pos = 'right center';
				break
			case 'bottom-left':
				pos = 'left bottom';
				break
			case 'bottom-center':
				pos = 'center bottom';
				break
			case 'bottom-right':
				pos = 'right bottom';
				break
			default:
				flag = false;
				break
		}
		if( flag ) {
			watermark
					.addClass('wrapper__watermark_animated')
					.position({
						my: pos,
						at: pos,
						of: parent,
						collision: 'none none',
					})
					.delay( 400 )
					.queue(function() {
						$( this ).dequeue();

						_currentPos();
					});

			canvasPreview
						.find('.active-watermark-position')
						.removeClass('active-watermark-position');

			$this.addClass('active-watermark-position');

			//setTimeout(_currentPos, 400)
			 //_currentPos();
		}
	};
	$(window).resize(function(){
		moveWMbyFixPos();
	});


	//Передвигает вотермарк с помощью спиннера
	var  moveWMbyStepX = function (event, ui){

		var currentVal = parseInt(ui.value,10),
			maxWidth =  parseInt(parent.innerWidth(), 10)-parseInt(watermark.innerWidth(),10),
			minWidth = 0;

		watermarkPosition.removeClass('active-watermark-position');
		positionHorizontal.spinner({
				max: maxWidth
		});
		if (currentVal <= maxWidth){
			watermark.css('left', currentVal);
			 _currentPos();
		}
		else{
			 return;
		}
	};

	var moveWMbyStepY = function (event, ui){

		var currentVal = parseInt(ui.value,10),
			maxHeight = parseInt(parent.innerHeight()-watermark.innerHeight(),10),
			minHeight = 0;

		watermarkPosition.removeClass('active-watermark-position');
		positionVertical.spinner({
				max: maxHeight,
		});
		if (currentVal <= maxHeight){
			watermark.css('top', currentVal);
			 _currentPos();
		}
		else{
			 return;
		}
	};


	// Меняет позицию вотермарки после изменения в импутах
	var changePosWm = function (){

		var currentValX = positionHorizontal.val(),
			currentValY = positionVertical.val(),
			currentValXint = parseInt(currentValX, 10),
			currentValYint = parseInt(currentValY, 10),
			maxWidth = parent.innerWidth()-watermark.innerWidth(),
			minWidth = 0,
			maxHeight = parent.innerHeight()-watermark.innerHeight(),
			minHeight = 0;

		if (currentValXint <= maxWidth){
			watermark.css('left', currentValXint);
		}
		else {
			watermark.css('left', maxWidth);
			_currentPos();
		}
		if (currentValYint <= maxHeight){
			watermark.css('top', currentValYint);
		}
		else {
			watermark.css('top', maxHeight);
			_currentPos();
		}
	};

	//Манипуляции с клонируемыми вотермарками:

	// Клонирует WM по всему фону
	var cloneWm = function( e ){
		e.preventDefault();

		var
			watermarkWidth = parent.width()*3,
			watermarkHeight = parent.height()*3,
			rows = Math.round(watermarkWidth/watermark.width()),
			columns = Math.round(watermarkHeight/watermark.height()),
			count = columns*rows;

		watermark.css({
			'width': watermarkWidth,
			'height': watermarkHeight,
			'left': parent.width(),
			'top': parent.height()
		});

		divForDrag
				.addClass('divForDragMultiply')
				.css({
					'left': -parent.width(),
					'top': -parent.height()
				});

		for (var i = 1; i < count; i++){
			watermarkImg.clone().removeAttr('id').appendTo(watermark);
		}
	};

	//Меняет расстояние по ширине между WM
	var changeMarginLeft = function( event, ui ){

		var
			cloneWM    = $('.watermark'),
			currentVal = parseInt( ui.value, 10 ),
			widthSpan  = gutterPreview + currentVal;

		cloneWM.css('margin-right', currentVal);

		spanVert.width (widthSpan );
	};

	//Меняет расстояние по высоте между WM
	var changeMarginBottom = function(event, ui){

		var
			cloneWM    = $('.watermark'),
			currentVal = parseInt( ui.value, 10 ),
			heightSpan = parseInt( spanHor.height(), 10 );

		heightSpan = gutterPreview+currentVal;

		cloneWM.css('margin-bottom', currentVal);
		spanHor.height(heightSpan);
	};

	 //Меняет расстояние между картинками после изменения в инпутах
	var changeMarginWm = function (){

		var cloneWM = $('.watermark'),
			currentValLeft = gutterWidth.val(),
			currentValBottom = gutterHeight.val(),
			currentValLeftint = parseInt(currentValLeft, 10),
			currentValBottomint = parseInt(currentValBottom, 10),
			maxMarginLeft = 550,
			maxMarginBottom = 500;

		if (currentValLeftint <= maxMarginLeft){
			cloneWM.css('margin-right', currentValLeftint);
			spanVert.width(currentValLeftint+gutterPreview);
		}
		else {
			cloneWM.css('margin-right', maxMarginLeft);
			gutterWidth.val(maxMarginLeft);
			spanVert.width(maxMarginLeft+gutterPreview);
		}
		if (currentValBottomint <= maxMarginBottom){
			cloneWM.css('margin-bottom', currentValBottomint);
			spanHor.height(currentValBottomint+gutterPreview);
		}
		else {
			cloneWM.css('margin-bottom', maxMarginBottom);
			gutterHeight.val(maxMarginBottom);
			spanHor.height(maxMarginBottom+gutterPreview);
		}
	};

	//Обнуляет x и y, чтобы небыло проблем с размером картинки
	var resetPosition = function() {
		watermark.css({
			'top'  : 0,
			'left' : 0
		});
	};

	// вызывает reset
	var _reset = function(){
		_clean();
		watermark.css( 'opacity', 1);
		console.log( opacityBlock );
		$( '.ui-slider-range' ).css('width', '100%');
		$( '.ui-slider-handle' ).css('left', '100%');
		watermarkImg.removeAttr('src');
		parentImg.removeAttr('src');
	};

	return {
		init          : init,
		resetPosition : resetPosition
	};
})();

watermark.init();
