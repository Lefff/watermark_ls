var wm_fileuploader;

;(function( $ ) {
	$(function() {
		'use strict';

		wm_fileuploader = (function() {

			//URL до нашего php файла обработчкиа
			var url = 'php/upload.php';

			var init = function() {
			$('.suka').fileupload({
				url      : url,
				dataType : 'json',
				done: function (e, data) {
					//В data.result у нас вся инва по файлу

					console.log( data.result );
					//$('#fsdf').html('<img src="' + data.result.file_url + '" />');
				},
				progressall: function (e, data) {
					//Прогресс бар на будущее

					/*var progress = parseInt(data.loaded / data.total * 100, 10);
					$('#progress').text(
						progress + '%'
					);*/
				}
			});
			};

			return { init : init };
		})();
	});
})( jQuery );