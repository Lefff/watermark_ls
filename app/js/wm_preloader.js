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
			_startPrldr,
			_processPrldr,
			_clickBlocker;

		var init = function() {
			bodySelect = $('body');

			bodySelect.length && loadPageTrigger();
		};

		var loadPageTrigger = function() {
			bodySelect.addClass('page-loaded');
		};

		var getBody = function() {
			return bodySelect;
		};

		return {
			init    : init,
			getBody : getBody
		};
	})();

})( jQuery );
