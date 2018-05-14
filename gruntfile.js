module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-nw-builder');
	grunt.loadNpmTasks('grunt-phonegap-build');
	grunt.loadNpmTasks('grunt-string-replace');

	let config;
	try {
		config = JSON.parse(require('fs').readFileSync('./config.json', 'utf8'));
	} catch (err) {
		console.warn('Config file not found, see README.md if compliling for PhoneGap or Itch');
		// Use a dummy config object so desktop building doesn't fail.
		config = {
			"GAME_ID": "com.htmle.example",
			"GAME_NAME": "HTMLE Example App",
			"GAME_VERSION": "1.0.0",
			"GAME_WINDOW_TITLE": "HTMLE Example App",
			"GAME_DESCRIPTION": "This is an example game.",
						
			"YOUR_WEBSITE": "http://gritfish.itch.io/htmle",
			"YOUR_EMAIL": "press@gritfish.net",
			"YOUR_NAME": "John Kane",

			"PHONEGAP_APP_ID": "123456",
			"PHONEGAP_EMAIL": "myPHONEGAPaccount@email.com",
			"PHONEGAP_PASSWORD": "thepasswordtomyaccount",
			"PHONEGAP_IOS_PASSWORD": "iossigningpassword",
			"PHONEGAP_ANDROID_PASSWORD": "androidsigningpassword",
			"PHONEGAP_ANDROID_KEYSTORE_PASSWORD": "keystorepassword",
			
			"ITCH_ACCOUNT": "itchusername",
			"ITCH_GAME_URL": "gameuristem",

			"STEAM_USERNAME": "steamusername",
			"STEAM_PASSWORD": "steampassword",
			"STEAM_BUILDFILE": "app_build_1000"
		};
	}

	grunt.initConfig({
		// Create folders
		mkdir: {
			defaults: {
				options: {
					create: [
						'src',
						'src/main',
						'temp',
						'dist',
						'overrides',
						'overrides/steam',
						'overrides/itch',
						'overrides/phonegap'
					]
				}
			}
		},

		'string-replace': {
			all: {
				files:{
					'./temp/': ['./temp/**/*.xml','./temp/**/*.html']
				},
				options: {
					replacements: [
						{pattern: 'GAME_NAME',			replacement: `${config.GAME_NAME}`},
						{pattern: 'GAME_ID',			replacement: `${config.GAME_ID}`},
						{pattern: 'GAME_NAME',			replacement: `${config.GAME_NAME}`},
						{pattern: 'GAME_VERSION',		replacement: `${config.GAME_VERSION}`},
						{pattern: 'GAME_WINDOW_TITLE',	replacement: `${config.GAME_WINDOW_TITLE}`},
						{pattern: 'GAME_DESCRIPTION',	replacement: `${config.GAME_DESCRIPTION}`},
						{pattern: 'YOUR_WEBSITE',		replacement: `${config.YOUR_WEBSITE}`},
						{pattern: 'YOUR_EMAIL',			replacement: `${config.YOUR_EMAIL}`},
						{pattern: 'YOUR_NAME',			replacement: `${config.YOUR_NAME}`}
					]
				}
			}
		},

		// Clears folders before 
		clean: {
			all: [
				'./dist/'+`${config.GAME_NAME}`+'desktop - '+`${config.GAME_VERSION}`,
				'./dist/'+`${config.GAME_NAME}`+'_steam - '+`${config.GAME_VERSION}`,
				'./dist/'+`${config.GAME_NAME}`+'_itch - '+`${config.GAME_VERSION}`,
				'./temp/contentbuilder',
				'./temp/android',
				'./temp'
			],
			desktop: ['./dist/'+`${config.GAME_NAME}`+'desktop - '+`${config.GAME_VERSION}`, './temp/desktop'],
			steam: ['./dist/'+`${config.GAME_NAME}`+'_steam - '+`${config.GAME_VERSION}`, './temp/steam'],
			itch: ['./dist/'+`${config.GAME_NAME}`+'_itch - '+`${config.GAME_VERSION}`, './temp/itch'],
			phonegap: ['./temp/phonegap']
		},

		// Copies all your files from src to temp
		copy: {
			desktop: { 				cwd: './src/main', 				dest: './temp/desktop', 				expand: true, 	src: '**' },
			steam: { 				cwd: './src/main', 				dest: './temp/steam', 					expand: true, 	src: '**' },
			steamOverrides: { 		cwd: './overrides/steam', 		dest: './temp/steam', 					expand: true, 	src: '**' },
			itch: { 				cwd: './src/main', 				dest: './temp/itch', 					expand: true, 	src: '**' },
			itchOverrides: { 		cwd: './overrides/itch', 		dest: './temp/itch', 					expand: true, 	src: '**' },
			phonegap: { 			cwd: './src/main', 				dest: './temp/phonegap', 				expand: true, 	src: '**' },
			phonegapOverrides: { 	cwd: './overrides/phonegap', 	dest: './temp/phonegap', 				expand: true, 	src: '**' },
			itchAndroid: {
				expand: true,
				src: ['dist/'+`${config.GAME_NAME}`+'_android - '+`${config.GAME_VERSION}`+'.apk'],
				rename: function () {
					return 'temp/android/'+`${config.GAME_NAME}`+'.apk';
				}
			},
			steamContentBuilder:{cwd:'./dist/'+`${config.GAME_NAME}`+'_steam - '+`${config.GAME_VERSION}`+'/'+`${config.GAME_NAME}`, dest:'./temp/contentbuilder', expand: true, src: '**'}
		},

		// Creates the zip file to upload to Adobe Phonegap Build
		compress: {
			phonegap: {
				options: {
					archive: 'dist/'+`${config.GAME_NAME}`+'_phonegap - '+`${config.GAME_VERSION}`+'.zip'
				},
				files: [
					{expand: true, cwd:'temp/phonegap', src: ["**"], dest: '.'}
				]
			}
		},

		//Phonegap build only works if the file is small, might need to be manually uploaded (EASY MODE)
		"phonegap-build": {
			build: {
				 options: {
					archive: 'dist/'+`${config.GAME_NAME}`+'_phonegap - '+`${config.GAME_VERSION}`+'.zip',
					"appId": `${config.PHONEGAP_APP_ID}`,
					"user": {
						"email": `${config.PHONEGAP_EMAIL}`,
						"password": `${config.PHONEGAP_PASSWORD}`
					},
					download: {
						ios: 'dist/'+`${config.GAME_NAME}`+'_ios - '+`${config.GAME_VERSION}`+'.ipa',
						android: 'dist/'+`${config.GAME_NAME}`+'_android - '+`${config.GAME_VERSION}`+'.apk'
					},
					keys: {
						ios: { "password": `${config.PHONEGAP_IOS_PASSWORD}` },
						android: { "key_pw": `${config.PHONEGAP_ANDROID_PASSWORD}`, "keystore_pw": `${config.PHONEGAP_ANDROID_KEYSTORE_PASSWORD}` }
					}
				}
			}
		},

		//Used to call node.js and butler scripts directly
		exec: {
			builddesktop:	'node build.js desktop "'+`${config.GAME_NAME}`+'" "'+`${config.GAME_VERSION}`+'"',
			builditch:		'node build.js itch "'+`${config.GAME_NAME}`+'" "'+`${config.GAME_VERSION}`+'"',
			buildsteam:		'node build.js steam "'+`${config.GAME_NAME}`+'" "'+`${config.GAME_VERSION}`+'"',

			butlerlogin: 	'butler login',
			butlerwin64: 	`butler push "dist/${config.GAME_NAME}_itch - ${config.GAME_VERSION}/${config.GAME_NAME}/win64" ${config.ITCH_ACCOUNT}/${config.ITCH_GAME_URL}:win64 --userversion ${config.GAME_VERSION}`,
			butlermac: 		`butler push "dist/${config.GAME_NAME}_itch - ${config.GAME_VERSION}/${config.GAME_NAME}/osx64" ${config.ITCH_ACCOUNT}/${config.ITCH_GAME_URL}:mac --userversion ${config.GAME_VERSION}`,
			butlerlinux64: 	`butler push "dist/${config.GAME_NAME}_itch - ${config.GAME_VERSION}/${config.GAME_NAME}/linux64" ${config.ITCH_ACCOUNT}/${config.ITCH_GAME_URL}:linux64 --userversion ${config.GAME_VERSION}`,
			butlerandroid: 	`butler push "temp/android" ${config.ITCH_ACCOUNT}/${config.ITCH_GAME_URL}:android --userversion ${config.GAME_VERSION}`,

			uploadsteam: 	'C:/SteamSDK/tools/ContentBuilder/builder/steamcmd.exe +login "'+`${config.STEAM_USERNAME}`+'" "'+`${config.STEAM_PASSWORD}`+'" +run_app_build_http ..\\scripts\\'+`${config.STEAM_BUILDFILE}`+'.vdf +quit'
		}

	});


	grunt.registerTask('cleanfolders', 		['clean:all']);
	grunt.registerTask('setup', 			['mkdir:defaults']);

	grunt.registerTask('desktop', 			['clean:desktop', 'copy:desktop', 'string-replace', 'exec:builddesktop']);
	grunt.registerTask('itch', 				['clean:itch', 'copy:itch', 'copy:itchOverrides', 'string-replace', 'exec:builditch']);
	grunt.registerTask('phonegap',			['clean:phonegap', 'copy:phonegap', 'copy:phonegapOverrides', 'string-replace', 'compress:phonegap']);
	grunt.registerTask('steam', 			['clean:steam', 'copy:steam', 'copy:steamOverrides', 'string-replace', 'exec:buildsteam', 'copy:steamContentBuilder']);
	
	grunt.registerTask('upload-itch',		['exec:butlerlogin', 'exec:butlerwin64', 'exec:butlermac', 'exec:butlerlinux64', 'exec:butlerandroid']);
	grunt.registerTask('upload-phonegap',	['phonegap-build']);
	grunt.registerTask('upload-steam',		['exec:uploadsteam']);

	grunt.registerTask('runall', 			['cleanfolders', 'desktop', 'steam', 'itch', 'phonegap', 'upload-phonegap', 'copy:itchAndroid', 'upload-itch', 'upload-steam']);

};

