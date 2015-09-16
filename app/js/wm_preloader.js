/**
 * Preloader на все случаи жизни
 * Скроет уродства, до зарузки всех стилей для всех элементов
 * Заблокирет человеческий фактор, и не допустит "многоанажатия"
 */



;var wm_preloader;

(function( $ ) {

	wm_preloader = (function() {
		var
			bodySelect,
			processPrldr,
			_startPrldr,
			_clickBlocker;

		var init = function() {
			bodySelect   = $('body');
			processPrldr = $('.preloader_progress');

			bodySelect.length && _loadPageTrigger();
		};

		var _loadPageTrigger = function() {
			bodySelect.addClass('page-loaded');
		};

		var getBody = function() {
			return bodySelect;
		};

		var getProcessPreload = function() {
			return processPrldr || $('.preloader_progress');
		};

		return {
			init     : init,
			getBody  : getBody,
			getPP    : getProcessPreload
		};
	})();

})( jQuery );
