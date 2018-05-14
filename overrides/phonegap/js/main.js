$(function() {
	$('.shot').mouseup(function() {
		playSound('sfx_shot');
	});
	$('.song').mouseup(function() {
		playMusic('bgm_song');
	});
	$('.song2').mouseup(function() {
		playMusic('bgm_song2');
	});
	$('.vol1').mouseup(function() {
		setVolume(0.0);
	});
	$('.vol2').mouseup(function() {
		setVolume(0.2);
	});
	$('.vol3').mouseup(function() {
		setVolume(0.4);
	});
	$('.vol4').mouseup(function() {
		setVolume(0.6);
	});
	$('.vol5').mouseup(function() {
		setVolume(0.8);
	});
	$('.vol6').mouseup(function() {
		setVolume(1.0);
	});
	$('.stop').mouseup(function() {
		stopMusic();
	});
});

function loadSounds() {
	if (device.platform == 'Android') {
		audioFiles.sfx_shot = new Media("/android_asset/www/assets/shot.mp3", onLoadSuccess, onLoadFail);
		audioFiles.bgm_song = new Media("/android_asset/www/assets/song.mp3", onLoadSuccess, onLoadFail);
		audioFiles.bgm_song2 = new Media("/android_asset/www/assets/song2.mp3", onLoadSuccess, onLoadFail);
	} else {
		audioFiles.sfx_shot = new Media("assets/shot.mp3", onLoadSuccess, onLoadFail);
		audioFiles.bgm_song = new Media("assets/song.mp3", onLoadSuccess, onLoadFail);
		audioFiles.bgm_song2 = new Media("assets/song2.mp3", onLoadSuccess, onLoadFail);
	}
	initSound();
}
document.addEventListener("deviceready", loadSounds, false);