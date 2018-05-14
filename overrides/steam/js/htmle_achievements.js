var fps = 30;
var greenworks = require('./greenworks.js');

function startSteamAPI() {
	if (!greenworks) {
		console.log('Greenworks not support for ' + os.platform() + ' platform');
	} else {
		if (!greenworks.initAPI()) {
			console.log('Error on initializing steam API.');
		} else {
			console.log('Steam API initialized successfully.');
		}
	}
}

function forceRefresh() {
	setTimeout(function() {
		document.getElementById("forceRefresh").getContext("2d").clearRect(0, 0, 1, 1);
		window.requestAnimationFrame(forceRefresh);
	}, 1000 / fps);
}

function activateAchievement(ACHIEVEMENT_NAME) {
	console.log('achievement "Friend Requested" activated');
	if (greenworks) {
		greenworks.activateAchievement(ACHIEVEMENT_NAME,
			function() { console.log('Activating achievement successfully'); },
			function(err) { console.log('Failed on activating achievement.'); });
	} else {
		console.log("Error: Greenworks not found");
	}
}


document.addEventListener('DOMContentLoaded', function() { startSteamAPI() });