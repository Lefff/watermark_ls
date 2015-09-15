<?php

	if( isset( $_POST['filename'] ) && !empty( $_POST['filename'] ) ) {

		$filename   = $_POST['filename'];
		$result     = pathinfo( $filename );
		$result     = realpath( dirname( __FILE__ ) . '/../img/tmp_imgs/' . $result['basename'] );
		$resultName = 'watermark_result-' . time() . '.png';

		if ( file_exists( $result ) ) {
			header('Content-Description: File Transfer');
			header('Content-Type: application/octet-stream');
			header('Content-Disposition: attachment; filename=' . $resultName);
			header('Expires: 0');
			header('Cache-Control: must-revalidate');
			header('Pragma: public');
			header('Content-Length: ' . filesize( $result ));
			readfile( $result );
			exit;
		} else {
			echo 'Oops! Файл не найден';
		}

	}