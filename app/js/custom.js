
/**
 * Эмулирования отправки формы с параметрами
 * @param  {string} url    Адрес обработчика
 * @param  {string} data   Параметры в формате key1=val1&key2=val2...
 * @param  {string} method get, post (post по умолчанию)
 */
//Обновляет имена файлов в инпутах

$.sendEmul = function( url, data, method ) {
	var inputs = '';

	if( url && data ) {

		data = typeof data == 'string' ? data : $.param( data );

		$.each( data.split('&'), function() {
			var pair = this.split('=');

			inputs += '<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />';
		});

		$form   = $("<form />").attr({
			'action' : url,
			'method' : ( method || 'post' )
		})
		.html( inputs )
		.appendTo('body')
		.submit()
		.remove();
	}

};
