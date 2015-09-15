<?php
	//Получаем сокращенное называние языка
	if ( isset( $_GET['lang'] ) || isset( $_POST['lang'] ) ) {
		if ( !set_lang_id( $_GET['lang'] ) ) {
			set_lang_id( get_lang_id() );
		}
	}
	else if ( isset( $_POST['lang'] ) ) {
		if ( !set_lang_id( $_POST['lang'] ) ) {
			set_lang_id( get_lang_id() );
		}
	}
	else {
		set_lang_id( get_lang_id() );
	}

	//Определяем какие языки вообще доступны, если таких нет - возвращаем язык по умолчанию
	function exit_lang( $lang_id ) {
		$langs = array( "en", "ru" );

		return ( in_array( $lang_id, $langs ) ) ? true : false;
	}

	function set_lang_id( $lang_id ) {
		if ( strlen( $lang_id ) == 2 && exit_lang( $lang_id ) ) {
			$language_file = realpath( dirname( __FILE__ ) . '/lang/' . $lang_id . ".php" );

			if ( is_file( $language_file ) && file_exists( $language_file ) ) {

				//Устанавливаем куки на год
				$expiration_date = time() + 3600 * 24 * 365;
				setcookie( 'lang', $lang_id, $expiration_date, '/');
				include_once( $language_file );
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	}

	//Проверяем есть ли у нас кукисы и если есть, проверяем на правильный формат + поддерживаем ли язык
	function get_lang_id() {
		return ( isset( $_COOKIE['lang'] ) && strlen( $_COOKIE['lang'] ) == 2 && exit_lang( $_COOKIE['lang'] ) ) ? htmlspecialchars($_COOKIE['lang']) : 'ru';
	}

	//Функция вывода перевода
	function set_transition( $setter_string = '' ) {
		global $lang;

		if( isset( $setter_string ) && !empty( $setter_string ) ) {
			echo array_key_exists( $setter_string, $lang ) ? $lang[ $setter_string ] : '';
		}
	}