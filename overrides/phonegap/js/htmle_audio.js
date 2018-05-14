var audioFiles = {};
var bgm_current;
var bgm_current_name;
var bgm_crossFadeTime = 4000;
var bgm_current_volume = 1;

var bgm_fading_out;
var bgm_fading_in;

var bgm_fadeOut_volume = 1;
var bgm_fadeIn_volume = 0;

var bgm_fade_int;

function initSound() {
	bgm_fade_int = setInterval(updateFades, Math.ceil(bgm_crossFadeTime / 10));
}

function playSound(NAME) {
	audioFiles[NAME].play();
}

function playMusic(NAME) {
	if (bgm_current) {
		fadeOut(bgm_current_name);
	}
	audioFiles[NAME].play({ numberOfLoops: 99, playAudioWhenScreenIsLocked: false });
	audioFiles[NAME].setVolume(bgm_current_volume);
	fadeIn(NAME);
	bgm_current = audioFiles[NAME];
	bgm_current_name = NAME;
}

function fadeOut(NAME) {
	bgm_fading_out = audioFiles[NAME];
	bgm_fadeOut_volume = bgm_current_volume;
	bgm_fading_out.setVolume(bgm_current_volume);
}

function fadeIn(NAME) {
	bgm_fading_in = audioFiles[NAME];
	bgm_fadeIn_volume = 0;
	bgm_fading_in.setVolume(0);
}

function updateFades() {
	bgm_fadeOut_volume -= 0.1;
	bgm_fadeIn_volume += 0.1;

	if (bgm_fading_in) {
		bgm_fading_in.setVolume(bgm_fadeIn_volume.toString());
		if (bgm_fadeIn_volume >= bgm_current_volume) {
			bgm_fading_in = null;
		}
	}
	if (bgm_fading_out) {
		bgm_fading_out.setVolume(bgm_fadeOut_volume.toString());
		if (bgm_fadeOut_volume <= 0) {
			bgm_fading_out.stop();
			bgm_fading_out = null;
		}
	}
}


function stopMusic() {
	bgm_current.stop();
	bgm_current = null;
	bgm_current_name = null;
	bgm_fading_in = null;
	bgm_fading_out = null;
}

function setVolume(NUM) {
	bgm_current.setVolume(NUM.toString());
	bgm_current_volume = NUM;
}

function onSuccess(msg) {
	//alert('Success: ' + JSON.stringify(msg));
}

function onFail(msg) {
	alert('Audio Playback Error: ' + JSON.stringify(msg));
}

function onLoadSuccess(msg) {
	//alert('Success: ' + JSON.stringify(msg));
}

function onLoadFail(msg) {
	alert('Audio Load Error: ' + JSON.stringify(msg));
}

function onUnloadSuccess(msg) {
	//alert('Success: ' + JSON.stringify(msg));
}

function onUnloadFail(msg) {
	alert('Audio Unload Error: ' + JSON.stringify(msg));
}