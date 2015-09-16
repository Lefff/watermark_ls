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
		$layer_link = substr( $_POST['layerURL'], 0, strpos($_POST['layerURL'], '?') );
		$wm_link    = substr( $_POST['watermarkURL'], 0, strpos( $_POST['watermarkURL'], '?') );
		$wm_opacity = isset( $_POST['opacity'] ) && $_POST['opacity'] >= 0 ? $_POST['opacity'] : 100;
		$wm_type    = isset( $_POST['actionType'] ) && !empty( $_POST['actionType'] ) ? $_POST['actionType'] : 'single';
		$wm_pos_top = isset( $_POST['top'] ) && $_POST['top'] >= 0 ? $_POST['top'] : 0;
		$wm_pos_lft = isset( $_POST['left'] ) && $_POST['left'] >= 0 ? $_POST['left'] : 0;
		$wm_offset  = array(
			'X' => isset( $_POST['offsetX'] ) && $_POST['offsetX'] >= 0 ? $_POST['offsetX'] : 0,
			'Y' => isset( $_POST['offsetY'] ) && $_POST['offsetY'] >= 0 ? $_POST['offsetY'] : 0
		);

		$layer     = PHPImageWorkshop\ImageWorkshop::initFromPath( SITE_ROOT . '/img/tmp_imgs/' . basename( $layer_link ) );
		$watermark = PHPImageWorkshop\ImageWorkshop::initFromPath(  SITE_ROOT . '/img/tmp_imgs/' . basename( $wm_link ) );

		$layerWidth  = $layer->getWidth();
		$layerHeight = $layer->getHeight();

		//Двойная проверка не повредит
		if( $layerWidth > 650 ) {
			$layer->resizeInPixel(650, null, true);
		}

		//Проверка watermark
		if( $watermark->getWidth() > $layerWidth ) {
			$watermark->resizeInPixel( $layerWidth, null, true );
		}

		$watermarkWidth  = $watermark->getWidth();
		$watermarkHeight = $watermark->getHeight();

		//Прозрачность watermark
		$watermark->opacity( ( $wm_opacity * 100 ) );

		//Тип наложения
		if( $wm_type == 'multi' ) {
			$col = ceil( $layerWidth / $watermarkWidth) * 3;
			$row = ceil( $layerHeight / $watermarkHeight ) * 3;

			$i = 0;
			$j = 0;

			for( $i = 0; $i < $row; $i++ ) {
				$rowCoordX = 0 + ( $wm_pos_lft - $layerWidth );
				$rowCoordY = ( ( $watermarkHeight + $wm_offset['Y'] ) * $i ) + ( $wm_pos_top - $layerHeight );

				$layer->addLayerOnTop( $watermark, $rowCoordX, $rowCoordY, "LT");

				for( $j = 1; $j < $col; $j++ ) {
					$colCoordX = ( ( $watermarkWidth + $wm_offset['X'] ) * $j ) + $rowCoordX;

					$layer->addLayerOnTop( $watermark, $colCoordX, $rowCoordY, "LT");
				}
			}
		} else {
			$layer->addLayerOnTop($watermark, $wm_pos_lft, $wm_pos_top, "LT");
		}


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
