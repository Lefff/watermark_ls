/**
 * Переключение языков
 * с эмуляцией POST запроса
 * для чистой URL
 */



;var wm_langsw;

(function( $ ) {

	'use strict';

	wm_langsw = (function() {
		var
			_switcherClass;

		var init = function( switcherClass ) {
			_switcherClass = $( switcherClass );

			_switcherClass.length && _events();
		};

		var _events = function() {
			_switcherClass.on('click', function( e ) {
				var sendParam = this.search.substr(1);

				e.preventDefault();

				wm_preloader
							.getBody()
							.removeClass('page-loaded')
							.delay( 400 )
							.queue(function() {
								$( this ).dequeue();

								$.sendEmul('/', sendParam );
							});
			});
		};

		return {
			init : init
		};
	})();

})( jQuery );