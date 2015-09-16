/**
 * Шаринг соц. сетей
 * 
 * Если подключен js, берем из href всю строку и открываем в popup
 */

;var wm_sharer;

(function( $ ) {

	'use strict';

	wm_sharer = (function() {
		var
			_btnsClass;

		var init = function( btnsClass ) {
			_btnsClass = $( btnsClass || '[rel="share-link"]' );

			_btnsClass.length && _events();
		};

		var _events = function() {
			_btnsClass.on('click', function( e ) {
				var hrefStr   = this.href,
					popWidth  = 640,
					popHeight = 480;

				var leftoff  = ( screen.availWidth / 2 ) - ( popWidth / 2 );
				var topoff  = ( screen.availHeight / 2 ) - ( popHeight / 2 );

				e.preventDefault();

				if( hrefStr !== '' && this.search !== '' ) {
					window.open( hrefStr, '', 'location=0, toolbar=0, status=0, left=' + leftoff + ', top=' + topoff + ', width=' + popWidth + ', height=' + popHeight);
				}
			});
		};

		return {
			init : init
		};
	})();

})( jQuery );