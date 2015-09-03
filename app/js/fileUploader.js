var wm_fileuploader;

;(function( $ ) {
	$(function() {
		'use strict';

		wm_fileuploader = (function() {

			var url = 'php/upload.php';

			$('.send_files').fileupload({
				url      : url,
				dataType : 'json',
				done: function (e, data) {
					console.log( data.result );
					//$('#fsdf').html('<img src="' + data.result.file_url + '" />');
				},
				progressall: function (e, data) {
					/*var progress = parseInt(data.loaded / data.total * 100, 10);
					$('#progress').text(
						progress + '%'
					);*/
				}
			});

			return { init : init };
		})();
	});
})( jQuery );