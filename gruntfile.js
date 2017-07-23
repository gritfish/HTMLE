module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-nw-builder');
	grunt.loadNpmTasks('grunt-phonegap-build');

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
						'overrides/phonegap',
					]
				}
			}
		},

		// Clears folders before 
		clean: {
			all: ['./dist','./temp'],
			desktop: ['./dist/desktop','./temp/desktop'],
			steam: ['./dist/steam','./temp/steam'],
			itch: ['./dist/itch','./temp/itch'],
			phonegap: ['./temp/phonegap'],
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
		},

		// Creates the desktop builds
		nwjs: {
			desktop:{
				options: {
					platforms: ['win','osx64','linux'],
					buildDir: './dist/desktop',
					version: '0.22.3',
					credits: './temp/desktop/index.html',
					macCredits: './temp/desktop/index.html',
					macIcns: './src/icons/appIcon.hqx',
					winIco: './src/icons/appIcon.ico'
				},
				src: ['./temp/desktop/**/*']
			},
			steam:{
				options: {
					platforms: ['win','osx64','linux'],
					buildDir: './dist/steam',
					version: '0.22.3',
					credits: './temp/steam/index.html',
					macCredits: './temp/steam/index.html',
					macIcns: './src/icons/appIcon.hqx',
					winIco: './src/icons/appIcon.ico'
				},
				src: ['./temp/steam/**/*']
			},
			itch:{
				options: {
					platforms: ['win','osx64','linux'],
					buildDir: './dist/itch',
					version: '0.22.3',
					credits: './temp/itch/index.html',
					macCredits: './temp/itch/index.html',
					macIcns: './src/icons/appIcon.hqx',
					winIco: './src/icons/appIcon.ico'
				},
				src: ['./temp/itch/**/*']
			}
		},

		// Creates the zip file to upload to Adobe Phonegap Build
		compress: {
			phonegap: {
				options: {
					archive: 'dist/phonegap.zip'
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
					archive: "dist/phonegap.zip",
					"appId": "YOUR_APP_ID",
					"user": {
						"email": "YOUR_EMAIL",
						"password": "YOUR_PASSWORD"
					},
					download: {
						ios: 'dist/ios/ios.ipa',
						android: 'dist/android/android.apk'
					},
					keys: {
						ios: { "password": "YOUR_IOS_PASSWORD" },
						android: { "key_pw": "YOUR_ANDROID_PASSWORD", "keystore_pw": "YOUR_ANDROID_KEYSTORE_PASSWORD" }
					}
				}
			}
		},
		
		exec: {
			butlerlogin: 	'butler login',
			butlerwin32: 	'butler push dist/itch/nw/win32 YOUR_ITCH_ACCOUNT/YOUR_ITCH_GAME_URL:win32',
			butlerwin64: 	'butler push dist/itch/nw/win64 YOUR_ITCH_ACCOUNT/YOUR_ITCH_GAME_URL:win64',
			butlermac: 		'butler push dist/itch/nw/osx64 YOUR_ITCH_ACCOUNT/YOUR_ITCH_GAME_URL:mac',
			butlerlinux32: 	'butler push dist/itch/nw/linux32 YOUR_ITCH_ACCOUNT/YOUR_ITCH_GAME_URL:linux32',
			butlerlinux64: 	'butler push dist/itch/nw/linux64 YOUR_ITCH_ACCOUNT/YOUR_ITCH_GAME_URL:linux64',
			butlerandroid: 	'butler push dist/android YOUR_ITCH_ACCOUNT/YOUR_ITCH_GAME_URL:android'
		}

	})


	grunt.registerTask('cleanfolders', 	['clean:all']);
	grunt.registerTask('setup', 	['mkdir:defaults']);
	grunt.registerTask('desktop', 	['clean:desktop', 'copy:desktop', 'nwjs:desktop']);
	grunt.registerTask('steam', 	['clean:steam', 'copy:steam', 'copy:steamOverrides', 'nwjs:steam']);
	grunt.registerTask('itch', 		['clean:itch', 'copy:itch', 'copy:itchOverrides', 'nwjs:itch', 'exec:butlerlogin','exec:butlerwin32','exec:butlerwin64','exec:butlermac','exec:butlerlinux32','exec:butlerlinux64']);
	grunt.registerTask('phonegap',	['clean:phonegap', 'copy:phonegap', 'copy:phonegapOverrides', 'compress:phonegap', 'phonegap-build']);
	grunt.registerTask('phonegapitch',	['clean:phonegap', 'copy:phonegap', 'copy:phonegapOverrides', 'compress:phonegap', 'phonegap-build', 'butlerandroid']);

	grunt.registerTask('runall', ['cleanfolders', 'desktop', 'steam', 'itch', 'phonegapitch']);

};

