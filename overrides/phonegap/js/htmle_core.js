function quitGame() {
	console.log('quitGame not available');
}

function enterFullScreen() {
	console.log('enterFullScreen not available');
}

function leaveFullscreen() {
	console.log('leaveFullscreen not available');
}

function zoomIn() {
	console.log('zoomIn not available');
}

function zoomOut() {
	console.log('zoomOut not available');
}

function zoomDefault() {
	console.log('zoomDefault not available');
}

function initKeepAwake() {
	if (window.plugins && window.plugins.insomnia) {
		window.plugins.insomnia.keepAwake();
	} else {
		alert('insomnia not loaded')
	}
}

document.addEventListener("deviceready", initKeepAwake, false);