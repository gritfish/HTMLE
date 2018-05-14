var count = 0;

function increaseCount(){
	count ++;
	localforage.setItem('count', count).then(function (value) {
		updateCount();
	})
}

function decreaseCount(){
	count --;
	localforage.setItem('count', count).then(function (value) {
		updateCount();
	})
}

function updateCount(){
	$('#count').text('The current count is '+count);
}

$(function() {
	audioFiles.sfx_shot = new buzz.sound("assets/shot.mp3", { volume: 100 });
	audioFiles.bgm_song = new buzz.sound("assets/song.mp3", { loop: true });
	audioFiles.bgm_song2 = new buzz.sound("assets/song2.mp3", { loop: true });
	initSound();
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
	$('.quitGame').mouseup(function(){
		quitGame();
	});
	$('.enterFullScreen').mouseup(function(){
		enterFullScreen();
	});
	$('.leaveFullscreen').mouseup(function(){
		leaveFullscreen();
	});
	$('.zoomIn').mouseup(function(){
		zoomIn();
	});
	$('.zoomOut').mouseup(function(){
		zoomOut();
	});
	$('.zoomDefault').mouseup(function(){
		zoomDefault();
	});
	$('.decreaseCount').mouseup(function(){
		decreaseCount();
	})
	$('.increaseCount').mouseup(function(){
		increaseCount();
	})
	localforage.getItem('count').then(function (value) {
		count = value;
		updateCount();
	});
})