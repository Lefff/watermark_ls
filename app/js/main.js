;(function( $ ) {

	//DOM Ready
	$(function() {

		//Загрузка файла
		wm_fileuploader.init();

		//Основные манипуляции (перемещение, прозрачность, скачивание результата и т.д.)
		wm_actions.init();

		//Переключалка языка
		wm_langsw.init('.language-option__inner');

		//Социал шаринг
		wm_sharer.init();

	});

	//All Document Ready
	$(window).load(function() {

		//Прелоадер
		wm_preloader.init();

	});

})( jQuery );
