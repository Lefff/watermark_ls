<?php
	/*
	 * ### Файл с функциями и переменными ###
	 *
	 * DRY
	 */


	//Корень сайта
	$document_root = str_replace( '\\', '/', realpath( $_SERVER['DOCUMENT_ROOT'] ) );
	define('SITE_ROOT', $document_root);



	//Уникальный ключ
	$uniqNum = '';
	if( !isset( $_COOKIE['user_unique'] ) || empty( $_COOKIE['user_unique'] ) ) {
		$uniqNum = !empty( $_SERVER['REMOTE_ADDR'] ) ? hash('sha256', $_SERVER['REMOTE_ADDR'] ) : hash( 'sha256', time() );

		setcookie('user_unique', $uniqNum, time() + 60*60*24*7 );
	} else {
		$uniqNum = $_COOKIE['user_unique'];
	}
	define('USER_UNIQUE', $uniqNum);



	//Подключаем бибилиотеки
	require_once( realpath( dirname( __FILE__ ) . "/lib/PHPImageWorkshop/ImageWorkshop.php") );
	use PHPImageWorkshop\ImageWorkshop;



	/**
	 * Возвращает абсолютную ссылку на файл
	 * @param  string $relative_file_url Относительная ссылка на файл
	 * @return string                    Абсолютная ссылка на файл
	 */
	function file_proper_link( $relative_file_url, $withoutTime = false ) {
		$additionalText = $withoutTime ? '' : '?' . time();
		
		if( isset( $relative_file_url ) ) {
			return sprintf(
				"%s://%s%s%s",
				isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
				$_SERVER['HTTP_HOST'],
				$relative_file_url,
				$additionalText
			);
		}
	}