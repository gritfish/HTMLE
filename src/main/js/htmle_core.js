var os;
var gui;

if(typeof require !== 'undefined'){
	os = require('os');
	gui = require('nw.gui');
}

function quitGame() {
	if(typeof require !== 'undefined'){
		gui.App.closeAllWindows();
		gui.App.quit();
	}else{
		console.log('quitGame not available');
	}
}

function enterFullScreen() {
	if(typeof require !== 'undefined'){
		var win = gui.Window.get();
		win.enterFullscreen();
	}else{
		console.log('enterFullScreen not available');
	}
}

function leaveFullscreen() {
	if(typeof require !== 'undefined'){
		var win = gui.Window.get();
		win.leaveFullscreen();
	}else{
		console.log('leaveFullscreen not available');
	}
}

function zoomIn() {
	if(typeof require !== 'undefined'){
		var win = gui.Window.get();
		win.zoomLevel++;
	}else{
		console.log('zoomIn not available');
	}
}

function zoomOut() {
	if(typeof require !== 'undefined'){
		var win = gui.Window.get();
		win.zoomLevel--;
	}else{
		console.log('zoomOut not available');
	}
}

function zoomDefault() {
	if(typeof require !== 'undefined'){
		var win = gui.Window.get();
		win.zoomLevel = 0;
	}else{
		console.log('zoomDefault not available');
	}
}