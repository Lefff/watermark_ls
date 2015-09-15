<?php
	/*
	 * ### Наложение изображения ###
	 *
	 * Получаем расположение файлов и их типы.
	 * layer - подложка;
	 * watermark - изоброжание которое накладываем поверх;
	 *
	 */



	//Подключаем зависимости
	require_once 'helpers.php';

	//Массив с ответом
	$resp = array(
		'errors'   => false,
		'err_text' => '',
		'file_url' => ''
	);

	//Получаем все данные с запроса
	if( isset( $_POST['layerURL'] ) && isset( $_POST['watermarkURL'] ) && !empty( $_POST['layerURL'] ) && !empty( $_POST['watermarkURL'] ) ) {
		$layerLink     = substr( $_POST['layerURL'], 0, strpos($_POST['layerURL'], '?') );
		$watermarkLink = substr( $_POST['watermarkURL'], 0, strpos( $_POST['watermarkURL'], '?') );

		$layer     = PHPImageWorkshop\ImageWorkshop::initFromPath( SITE_ROOT . '/img/tmp_imgs/' . basename( $layerLink ) );
		$watermark = PHPImageWorkshop\ImageWorkshop::initFromPath(  SITE_ROOT . '/img/tmp_imgs/' . basename( $watermarkLink ) );

		//Двойная проверка не повредит
		if( $layer->getWidth() > 650 ) {
			$layer->resizeInPixel(650, null, true);
		}

		//Проверка watermark
		if( $watermark->getWidth() > $layer->getWidth() ) {
			$watermark->resizeInPixel( $layer->getWidth(), null, true );
		}

		$watermark->opacity( ( $_POST['opacity'] * 100 ) );

		$layer->addLayerOnTop($watermark, $_POST['left'], $_POST['top'], "LT");

		$dirPath         = '/img/tmp_imgs/';
		$filename        = 'result' . USER_UNIQUE . '.png';
		$createFolders   = false;
		$backgroundColor = null;
		$imageQuality    = 8;

		$layer->save( SITE_ROOT . $dirPath, $filename, $createFolders, $backgroundColor, $imageQuality);

		$resp['file_url'] = file_proper_link( $dirPath . $filename, true );
	}

	header("Content-Type: application/json");
	echo json_encode( $resp );

	exit;
