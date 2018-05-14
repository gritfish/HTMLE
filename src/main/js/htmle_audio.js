var audioFiles = {};
var bgm_current;
var bgm_current_name;
var bgm_crossFadeTime = 4000;
var bgm_current_volume = 1;

function initSound() {
	if (!buzz.isSupported()) {
		alert("Your browser is too old, time to update!");
	}
	if (!buzz.isOGGSupported()) {
		alert("Your browser doesn't support OGG Format.");
	}
	if (!buzz.isWAVSupported()) {
		alert("Your browser doesn't support WAV Format.");
	}
	if (!buzz.isMP3Supported()) {
		alert("Your browser doesn't support MP3 Format.");
	}
	if (!buzz.isAACSupported()) {
		alert("Your browser doesn't support AAC Format.");
	}
}

function playSound(NAME) {
	audioFiles[NAME].play();
}

function playMusic(NAME) {
	audioFiles[NAME].setVolume(bgm_current_volume * 100);
	if (bgm_current) {
		bgm_current.fadeOut(bgm_crossFadeTime);
		audioFiles[NAME].setVolume(0).fadeTo(bgm_current_volume * 100, bgm_crossFadeTime);
	} else {
		audioFiles[NAME].play();
	}
	bgm_current = audioFiles[NAME];
	bgm_current_name = NAME;
}

function setVolume(NUM) {
	bgm_current_volume = NUM;
	if (bgm_current) {
		bgm_current.setVolume(bgm_current_volume * 100);
	}
}

function stopMusic() {
	if (bgm_current) {
		bgm_current.stop();
	}
	bgm_current = null;
	bgm_current_name = null;
}