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
				_imgWrapper,
				_uploadOptions = {
					url      : './php/upload.php',
					dataType : 'json'
				};

			var init = function() {
				_canvas      = $('.wrapper__img-parent');
				_optionBox   = $('.settings-body');
				_preloader   = wm_preloader.getPP();
				_imgWrapper  = $('.gen-body');
				_currentFile = {};

				_canvas.length && _events();
			};

			var _events = function() {
				$('[rel=fileupload]')
									.fileupload( _uploadOptions )
									.on( 'fileuploadadd', _beforeSendAction )
									.on( 'fileuploadprogressall', _moveProgress )
									.on( 'fileuploaddone', _setImage )
									.on( 'fileuploadfail', _setError );
									/*.on( 'fileuploadalways', _progressHide );*/

			};

			//Узнать тип изображения(подложка или водный знак) и запуск прелоадера
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

			//Скрыть прелоадер, после загрузки
			var _progressHide = function() {
				_preloader.removeClass('active');
			};

			var _setImage = function(e, data) {
				var
					$this     = $( this ),
					typeBlock = _currentFile.type === 'base_image' ? '.img-parent' : '.watermark';


					if( data && data.result.errors === false ) {

						setTimeout(function(){
						_canvas
								.find( typeBlock )
								.load()
								.attr('src', data.result.file_url );



						if( _currentFile.type === 'base_image' ) {
							_optionBox.addClass('settings-body_base-loaded');
						} else {
							_optionBox.addClass('settings-body_watermark-loaded');
						}

						_progressHide();

						wm_actions
								.resetPosition()
								.refreshURLs();

						$this
							.closest('.label')
							.find('.inputtext')
							.text( data.files[0].name );

						//_setNewHeight();

						}, 1000);

						//watermark.resetPosition();
					} else if( data && data.result.errors === true ) {
						console.error( data.result.err_text );
						_progressHide();
					}
			};

			//На будущее, анимация высоты
			/*
			var _setNewHeight = function() {
				var
					initHeight  = 534,
					layerHeight = 0,
					layerImage  = _imgWrapper.find('.img-parent');

					layerImage.load(function() {
						layerHeight =  $( this ).height();

						if( initHeight < layerHeight ) {
							_imgWrapper
									.animate({
										height : layerHeight
									}, 400);
						} else {
							_imgWrapper
									.animate({
										height : initHeight
									}, 400);
						}
					});
			};
			*/

			var _setError = function(e, data) {
				console.error('Ошибка загрузки');
				console.log( e );
				console.log( data );
				_progressHide();
			};

			//Окно с отображением загрузки файла
			var _moveProgress = function( e, data ) {
				var progress = parseInt( data.loaded / data.total * 100, 10 );

				_preloader
						.find('.preloader__progress-line-inner')
						.width( progress + '%' );
			};

			//Ставим зажиту от человека, при reset
			var setBlocker = function() {
				_optionBox.removeClass('settings-body_base-loaded settings-body_watermark-loaded');
			};

			return {
				init       : init,
				setBlocker : setBlocker
			};
		})();
	});
})( jQuery );
