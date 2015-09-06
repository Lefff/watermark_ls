var wm_fileuploader;

;(function( $ ) {
	$(function() {
		'use strict';

		wm_fileuploader = (function() {
			var
				_canvas,
				_currentFile,
				_optionBox,
				_preloader,
				_uploadOptions = {
					url      : './php/upload.php',
					dataType : 'json'
				};

			var init = function() {
				_canvas      = $('.wrapper__img-parent');
				_optionBox   = $('.settings-body');
				_preloader   = $('.preloader_progress');
				_currentFile = {};

				_canvas.length && _events();
			}

			var _events = function() {
				$('[rel=fileupload]')
									.fileupload( _uploadOptions )
									.on( 'fileuploadadd', _beforeSendAction )
									.on( 'fileuploadprogressall', _moveProgress )
									.on( 'fileuploaddone', _setImage )
									.on( 'fileuploadalways', _progressHide );
			};

			var _beforeSendAction = function( e, data ) {
				var
					fType = $( this ).attr('name');

				_currentFile = {
					'type' : fType
				};

				_preloader
							.find('.preloader__progress-line-inner')
							.width( 0 )
							.end()
							.addClass('active')
							.delay( 300 )
							.queue(function() {
								$( this ).dequeue();
							});

			};

			var _progressHide = function() {
				_preloader.removeClass('active');
			};

			var _setImage = function (e, data) {
				var
					typeBlock = _currentFile.type === 'base_image' ? '.img-parent' : '.watermark';

					if( data && data.result.errors === false ) {
						_canvas
								.find( typeBlock )
								.attr('src', data.result.file_url );

						if( _currentFile.type === 'base_image' ) {
							_optionBox.addClass('settings-body_base-loaded');
						}
					}
			};

			var _moveProgress = function( e, data ) {
				var progress = parseInt( data.loaded / data.total * 100, 10 );

				_preloader
						.find('.preloader__progress-line-inner')
						.width( progress + '%' );
			};

			return { init : init };
		})();
	});
})( jQuery );