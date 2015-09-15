<?php
	/**
	 * Подключаем локализацию языка
	 */
	require_once( realpath( dirname( __FILE__ ) . "/php/lang.php") );
?>

<!DOCTYPE html>
<!--[if lt IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"><![endif]-->
<html class="no-js" lang="<?php echo $lang['lang_code']; ?>">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name="viewport" content="width=device-width">
		<meta name="description" content="сайт на jade &amp; sass">
		<link rel="stylesheet" type="text/css" href="bower/normalize.css/normalize.css" media="screen, projection, print">
		<link rel="stylesheet" type="text/css" href="bower/jquery-ui/themes/base/jquery-ui.min.css" media="screen, projection, print">
		<link rel="stylesheet" type="text/css" href="css/main.css" media="screen, projection, print">
		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
		<link rel="icon" href="favicon.ico" type="image/x-icon">
		<script src="bower/modernizr/modernizr.js"></script>
		<title><?php echo $lang['title']; ?></title>
	</head>
	<body>
		<div class="preloader-starter"><?php echo $lang['loading']; ?></div>
		<div class="wrapper">
			<div class="options-box">
				<ul class="language-select">
					<li class="language-select__option"><a href="?lang=ru" id="rus" class="language-option__inner">rus</a></li>
					<li class="language-select__option"><a href="?lang=en" id="eng" class="language-option__inner">eng</a></li>
				</ul>
				<div class="socials-box">
					<ul class="socials-list">
						<li class="socials-item"><a href="#" class="social-item__fb">fb</a></li>
						<li class="socials-item"><a href="#" class="social-item__tw">tw</a></li>
						<li class="socials-item"><a href="#" class="social-item__vk">vk</a></li>
					</ul>
				</div>
			</div>
			<div class="main-box">
				<div class="left-column">
					<div class="gen-head">
						<h1 class="gen-heading"><?php echo $lang['title']; ?></h1>
					</div>
					<div class="gen-body">
						<div class="img-box">
							<div id="wrapper__img-parent" class="wrapper__img-parent"><img id="img-parent" src="" draggable="false" class="img-parent">
								<div class="divForDrag">
									<div id="wrapper__watermark" class="wrapper__watermark"><img id="watermark" src="" class="watermark"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="right-column">
					<div class="settings-head">
						<div class="settings-heading"><?php echo $lang['settings']; ?></div>
						<div class="settings-body">
							<form class="settings-form">
								<div class="settings-block setting-block_decorated">
									<div class="fileupload-wrap">
										<div class="settings-block__hint"><?php echo $lang['source_img']; ?></div>
										<input type="file" placeholder="<?php echo $lang['source_img']; ?>" name="base_image" rel="fileupload">
									</div>
									<div class="fileupload-wrap">
										<div class="settings-block__hint"><?php echo $lang['watermark_img']; ?></div>
										<input type="file" placeholder="<?php echo $lang['watermark_img']; ?>" name="watermark_image" rel="fileupload">
									</div>
								</div>
								<div class="settings-block setting-block_decorated">
									<div class="settings-block__hint"><?php echo $lang['position']; ?></div>
									<div class="tab-container no-jump">
										<ul class="etabs">
											<li class="tab"><a href="#tabs1" class="tab-inner tab-inner_pos"><?php echo $lang['position']; ?></a></li>
											<li class="tab"><a href="#tabs2" class="tab-inner tab-inner_gut active"><?php echo $lang['repeater']; ?></a></li>
										</ul>
										<div class="tabs1 tabs-wrapper">
											<div class="canvas-preview"><span class="gutter-preview-vertical"></span><span class="gutter-preview-horizontal"></span></div>
											<ul class="parameters-list right-float">
												<li class="parameter">
													<div class="parametr-hint parametr-hint_gutter-height"></div>
													<div class="parament-input-wrap">
														<input id="gutter-height" value="0" class="multiply input">
													</div>
												</li>
												<li class="parameter">
													<div class="parametr-hint parametr-hint_gutter-width"></div>
													<div class="parament-input-wrap">
														<input id="gutter-width" value="0" class="multiply input">
													</div>
												</li>
											</ul>
										</div>
										<div class="tabs2 tabs-wrapper">
											<div class="canvas-preview">
												<div id="top-left" class="watermark-position active-watermark-position"></div>
												<div id="top-center" class="watermark-position"></div>
												<div id="top-right" class="watermark-position"></div>
												<div id="middle-left" class="watermark-position"></div>
												<div id="middle-center" class="watermark-position"></div>
												<div id="middle-right" class="watermark-position"></div>
												<div id="bottom-left" class="watermark-position"></div>
												<div id="bottom-center" class="watermark-position"></div>
												<div id="bottom-right" class="watermark-position"></div>
											</div>
											<ul class="parameters-list right-float">
												<li class="parameter">
													<div class="parametr-hint">X</div>
													<div class="parament-input-wrap">
														<input id="position-horizontal" value="0" class="position input">
													</div>
												</li>
												<li class="parameter">
													<div class="parametr-hint">Y</div>
													<div class="parament-input-wrap">
														<input id="position-vertical" value="0" class="position input">
													</div>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="settings-block setting-block_decorated">
									<div class="settings-block__hint"><?php echo $lang['opactiy']; ?></div>
									<div id="slider"></div>
								</div>
								<div class="settings-block settings-block_buttons">
									<div class="button-group">
										<button type="reset" class="grey-btn reset-btn"><?php echo $lang['reset']; ?></button>
										<button type="submit" class="pink-btn right-float"><?php echo $lang['download']; ?></button>
									</div>
								</div>
							</form>
							<div class="preloader__blocker"></div>
						</div>
					</div>
				</div>
				<div class="preloader preloader_progress">
					<div class="preloader__progress-line">
						<div class="preloader__progress-line-inner"></div>
					</div>
				</div>
			</div>
			<footer class="footer-main">
				<div class="copyright">&copy; 2015, <?php set_transition('copy_r'); ?></div>
			</footer>
		</div>
		<script src="bower/jquery/dist/jquery.min.js"></script>
		<script src="bower/jquery-ui/jquery-ui.min.js"></script>
		<script src="bower/blueimp-file-upload/js/vendor/jquery.ui.widget.js"></script>
		<script src="bower/blueimp-file-upload/js/jquery.iframe-transport.js"></script>
		<script src="bower/blueimp-file-upload/js/jquery.fileupload.js"></script>
		<script src="js/jquery.easytabs.min.js"></script>
		<script src="js/jquery.nicefileinput.min.js"></script>
		<script src="js/custom.js"></script>
		<script src="js/wm_preloader.js"></script>
		<script src="js/fileUploader.js"></script>
		<script src="js/watermark.js"></script>
		<script src="js/main.js"></script>
	</body>
</html>