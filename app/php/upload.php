<?php
	/*
	 * ### Загрузка файлов на сервер ###
	 *
	 * Загружаем картинки в папку и переименовывем их:
	 * layer - подложка картинки;
	 * watermark - изоброжание каоторое накладываем поверх;
	 *
	 * Чтобы картинки не перезаписывались, добавляем постфикс, в виде IP адреса без точек.
	 */



	function file_proper_link( $relative_file_url ) {
		if( isset( $relative_file_url ) ) {
			return sprintf(
				"%s://%s%s%s",
				isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
				$_SERVER['HTTP_HOST'],
				$relative_file_url,
				'?' . time()
			);
		}
	}



	//Папка для временных картинок
	$upload_dir = '/img/tmp_imgs/';
	if( !file_exists( $upload_dir ) ) {
		mkdir( $upload_dir, 0777, true );
	}





	//Ограничения для изображения
	$limit_file_size = 7 * 1024 * 1024;
	$limit_mime      = array(
		'image/gif',
		'image/jpeg',
		'image/png'
	);



	//Получаем файл
	$uploaded_file       = array();
	$uploaded_file_url   = '';
	$uploaded_file_ext   = '';
	$upload_file_postfix = str_replace('.', '', time());
	$uploaded_position   = 'base';

	if( isset( $_FILES['base_image'] ) ) {
		$uploaded_file = $_FILES['base_image'];
	} else if ( isset( $_FILES['watermark_image'] ) ) {
		$uploaded_file     = $_FILES['watermark_image'];
		$uploaded_position = 'watermark';
	}

	$uploaded_file_ext     = pathinfo( $uploaded_file['name'], PATHINFO_EXTENSION );
	$uploaded_file['name'] = pathinfo( $uploaded_file['name'], PATHINFO_FILENAME );
	$uploaded_file_url     = $upload_dir .
							 $uploaded_position .
							 $upload_file_postfix . '.' .
							 $uploaded_file_ext;

	//Массив с ответом
	$resp = array(
		'errors'   => false,
		'err_text' => '',
		'file_url' => ''
	);

	//Параметры загружаемого изображения
	$file_options = array(
		'f_name' => $uploaded_file['name'],
		'f_ext'  => $uploaded_file_ext,
		'f_url'  => $uploaded_file_url,
		'f_type' => $uploaded_file['type'],
		'f_size' => $uploaded_file['size'],
		'f_tmp'  => $uploaded_file['tmp_name'],
		'f_pos'  => $uploaded_position
	);

	//Проверяем размер и тип изображения
	if( $file_options['f_size'] > $limit_file_size ) {
		$resp['errors']   = true;
		$resp['err_text'] = 'Максимальный размер файла 7Mb';
	} else if( !in_array( $file_options['f_type'] , $limit_mime ) ) {
		$resp['errors']   = true;
		$resp['err_text'] = 'Не верный формат файла';
	} else if( !is_uploaded_file( $file_options['f_tmp'] ) ) {
		$resp['errors']   = true;
		$resp['err_text'] = 'Не стоит ломать сайт';
	} else if( !move_uploaded_file( $file_options['f_tmp'], $_SERVER['DOCUMENT_ROOT'] . $uploaded_file_url ) ) {
		$resp['errors']   = true;
		$resp['err_text'] = 'Не удалось загрузить файл';
	} else {
		$resp['file_url'] = file_proper_link( $file_options['f_url'] );
	}

	echo json_encode( $resp );
?>
