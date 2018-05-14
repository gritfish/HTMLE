var NwBuilder = require('nw-builder');

var appPlatform = 'desktop';
var appName = 'testApp';
var appVersion = '1.0.0';

function build_version(VERSION){
	VERSION.build().then(function () {
	   console.log('all done!');
	}).catch(function (error) {
	    console.log(error);
	});
}

appPlatform = process.argv[2];
appName = process.argv[3];
appVersion = process.argv[4];

var options_desktop = {
    appName: appName,
    appVersion: appVersion,
	platforms: ['win64','osx64','linux'],
    version: '0.26.6',
	files: ['./temp/desktop/**/**'],
	buildDir: './dist/'+appName+'_desktop - '+appVersion,
	credits: './temp/desktop/index.html',
	macCredits: './temp/desktop/index.html',
	macIcns: './src/icons/appIcon.hqx',
	winIco: './src/icons/appIcon.ico',
};
var options_steam = {
    appName: appName,
    appVersion: appVersion,
	platforms: ['win64','osx64','linux'],
    version: '0.26.6',
	files: ['./temp/steam/**/**'],
	buildDir: './dist/'+appName+'_steam - '+appVersion,
	credits: './temp/steam/index.html',
	macCredits: './temp/steam/index.html',
	macIcns: './src/icons/appIcon.hqx',
	winIco: './src/icons/appIcon.ico',
};
var options_itch = {
    appName: appName,
    appVersion: appVersion,
	platforms: ['win64','osx64','linux'],
    version: '0.26.6',
	files: ['./temp/itch/**/**'],
	buildDir: './dist/'+appName+'_itch - '+appVersion,
	credits: './temp/itch/index.html',
	macCredits: './temp/itch/index.html',
	macIcns: './src/icons/appIcon.hqx',
	winIco: './src/icons/appIcon.ico',
};

var nw_desktop = new NwBuilder(options_desktop);
var nw_steam = new NwBuilder(options_steam);
var nw_itch = new NwBuilder(options_itch);

nw_desktop.on('log',  console.log);
nw_steam.on('log',  console.log);
nw_itch.on('log',  console.log);

if(appPlatform == 'desktop'){
	build_version(nw_desktop);
}else if(appPlatform == 'steam'){
	build_version(nw_steam);
}else if(appPlatform == 'itch'){
	build_version(nw_itch);
}