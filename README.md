# HTMLE Helps To Make Life Easier
### HTML goes in, games come out.

**HTMLE is a project template and a set of scripts that take care of a lot of the work involved in setting up these tools and simplifying everything.**

## Before we get started
1) **You're going to need to install:**
* [Node.js](https://nodejs.org/en/download/)
* [The itch.io app](https://itch.io/app) or [Butler](https://itch.io/docs/butler)

2) **Download the HTMLE zip, and extract it where you like on your computer.**

3) **Install Grunt**
On PC: right-click "install grunt.bat" and select "Run as administrator"
On Mac: double click "install grunt.command"
In Terminal: Type "npm install -g grunt-cli" and hit enter

*The window will close when it's finished*
*You may see some "warnings" during the installation but it'll be fine.*

4) **Install HTMLE files**
On PC: right-click "install htmle.bat" and select "Run as administrator"
On Mac: double click "install htmle.command"
In Terminal: Type "npm install" and hit enter

*This task will take a while to run, as it downloads things. It'll close when it's finished*
*If these steps went well, you'll now have a "node_modules" folder inside the htmle folder*

5) **Create a config.json file**
Create a copy of config.example.json named config.json, and update the information in it.

---

## The example project
In src/main and the overrides folders, you'll find an example app that shows the basic functionality capable with HTMLE.
You'll also find JavaScript files "htmle_audio.js","htmle_core.js" and "htmle_achievements.js" - you'll need to include these in your html file the way they're included in the index.html files in each folder.

There are some subtle differences between the main index.html file and the Steam/Phonegap ones.

The Phonegap file includes some extra js:
```
<script src="cordova.js"></script>
<script src="device.js"></script>
<script src="media.js"></script>
```
And the Steam file includes a canvas element and an onload attribute on the body tag:
```
<body onload="forceRefresh();">
...
<canvas id="forceRefresh" width="1" height="1"></canvas>
```
These will need to be kept in your own project to keep things functioning properly, but otherwise you can do what you like! There's no reason you can't strip out jquery, buzz and localforage and replace them with libraries you prefer!

---

## Building for PC/Mac/Linux (Difficulty: Super Easy)
1) **Open "src/main/package.json" and enter some information about your game.**
YOUR_GAME_NAME

2) **Replace the default icons in "src/icons" with your own.**
You can use a free online tool to make Windows/mac icons here: [https://iconverticons.com/online/]()

3) **Run the compiler:**
On PC: right-click "build for desktop.bat" and select "Run as administrator"
On Mac: double click "build for desktop.command"
In Terminal: Type "grunt desktop" and hit enter

*This task compiles src/main to dist/desktop.*

**The first time the compiler runs, it'll download a bunch of files that will take a while.**

---

## Building for PC/Mac/Linux with itch.io (Difficulty: Easy)
1) **Open "src/main/package.json" and enter some information about your game.**
YOUR_GAME_NAME

2) **Replace these bits in gruntfile.js with your itch.io details:**
YOUR_ITCH_ACCOUNT/YOUR_ITCH_GAME_URL

3) **Replace the default icons in "src/icons" with your own.**
(There's instructions in that folder on how to make icons)

4) **Run the compiler:**
On PC: right-click "build for itch.bat" and select "Run as administrator"
On Mac: double click "build for itch.command"
In Terminal: "grunt itch" and hit enter

5) **Run the uploader:**
On PC: right-click "upload to itch.bat" and select "Run as administrator"
On Mac: double click "upload to itch.command"
In Terminal: "grunt upload-itch" and hit enter

---

## Building for PC/Mac/Linux with Steam (Difficulty: Medium)
For integrating Steam with your game, you'll need to do a bit of extra downloading.

1) **You'll need to download:**
* Greenworks ([https://github.com/greenheartgames/greenworks/releases]()) and download all of the "greenworks-v0.12.0-nw-v0.26.6" releases
* Steam SDK v1.41 (available through your steam admin page - [https://partner.steamgames.com]()) - HTMLE expects the Steam SDK to exist at C:/SteamSDK/ but you can change this in the gruntfile.js file.

2) **Copy files from the Greenworks Release and the Steam SDK so that your "overrides/steam" folder looks like this:**
Follow the guide here: [https://github.com/greenheartgames/greenworks/blob/master/docs/quick-start-nwjs.md]()
```
greenworks.js
steam_appid.txt
/lib
	greenworks-linux32.node
	greenworks-linux64.node
	greenworks-osx64.node
	greenworks-win32.node
	greenworks-win64.node
	libsteam_api.dylib
	libsteam_api.so
	steam_api.dll
	steam_api.lib
	steam_api64.dll
	steam_api64.lib
	/Linux32
		libsteam_api.so
	/Linux64
		libsteam_api.so
	/Osx32
		libsteam_api.dylib
	/Win64
		steam_api64.dll
		steam_api64.lib
```

3) **Run the compiler:**
On PC: right-click "build for steam.bat" and select "Run as administrator"
On Mac: double click "build for steam.command"
In Terminal: Type "grunt steam" and hit enter

5) **Run the uploader:**
On PC: right-click "upload to steam.bat" and select "Run as administrator"
On Mac: double click "upload to steam.command"
In Terminal: "grunt upload-steam" and hit enter


---

## Building for iOS and Android with Phonegap (Difficulty: Hard)
1) **You'll need to make an account on build.phonegap.com.**
Making one app at a time is free, and you can add more with a small monthly fee.

2) **Then you'll need to add signing keys for ios and android to your account, there's instructions here:**
[http://docs.phonegap.com/phonegap-build/signing]() (This is probably the hardest part of the entire process.)

3) **When that's done, replace these bits in the config.json file with your phonegap details:**
```
PHONEGAP_APP_ID
PHONEGAP_EMAIL
PHONEGAP_PASSWORD
PHONEGAP_IOS_PASSWORD
PHONEGAP_ANDROID_PASSWORD
PHONEGAP_ANDROID_KEYSTORE_PASSWORD
```

4) **Run the compiler:**
On PC: right-click "build for phonegap.bat" and select "Run as administrator"
On Mac: double click "build for phonegap.command"
In Terminal: Type "grunt phonegap" and hit enter

5) **Run the uploader:**
On PC: right-click "upload to phonegap.bat" and select "Run as administrator"
On Mac: double click "upload to phonegap.command"
In Terminal: "grunt upload-phonegap" and hit enter

Large files might time out using the uploader. If this happens, you'll need to upload the zip file from the /dist folder manually through the web interface.

---

## Build and upload to all platforms
**Congratulations! If you've made it this far, you should be able to run the 'build and upload all' script, which does EVERYTHING at once!**
On PC: right-click "build and upload all.bat" and select "Run as administrator"
On Mac: double click "build and upload all.command"
In Terminal: Type "grunt runall" and hit enter

---

## FAQs and things to remember
**Audio:** Look at the htmle_audio.js and main.js files for examples on how to code audio consistently.
**Icons and loading screens:** iOS and Android need a lot of differently sized images for icons and loading screens. There's a separate tool avaiable at [https://gritfish.itch.io/windowdresser]() that takes a lot of the work out of this process.

---

## Credits/License things:
**Example sounds used:**
* [https://freesound.org/people/Connum/sounds/12691/]()
* [https://freesound.org/people/TexasMusicForge/sounds/2684/]()
* [https://freesound.org/people/coolguy244e/sounds/266915/]()
