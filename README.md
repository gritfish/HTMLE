There's plenty of tools to help you create phone and desktop apps with HTML, CSS  and JavaScript. These tools tend to involve a LOT of work and a lot of knowledge of web development to get up and running. This fine for me. I've been doing web development for 10 years. It's not so easy for everyone else. So, while porting Killing Time at Lightspeed to mobile, I decided to strip out all my compiling code, clean it up and make...

# HTMLE Helps To Make Life Easier
### HTML goes in, games come out.

**HTMLE is a project template and a set of scripts that take care of a lot of the work involved in setting up these tools and simplifying everything.**

## How HTMLE works
1) It copies your main folder to a temporary location
2) It copies in extra files specific to whatever type of build you're doing (overwriting any files that are there)
3) Then
	a) Builds that HTML folder to a PC/Mac/Linux app **or**
	b) Zips the HTML folder and uploads to http://build.phonegap.com

## Before we get started
1) **You're going to need to install:**
Node.js (https://nodejs.org/en/download/)
The itch.io app (https://itch.io/app) or Butler (https://itch.io/docs/butler)

*If you're on Mac, you'll also need to install XQuartz (https://www.xquartz.org/) and Wine (https://www.winehq.org/)*

2) **Download the HTMLE zip, and extract it where you like on your computer.**

3) **Install Grunt**
On PC: double click "install grunt.bat"
On Mac: double click "install grunt.command"
In Terminal: Type "npm install -g grunt-cli" and hit enter

*The window will close when it's finished*
*You may see some "warnings" during the installation but it'll be fine.*

4) **Install HTMLE files**
On PC: double click "install htmle.bat"
On Mac: double click "install htmle.command"
In Terminal: Type "npm install" and hit enter

*This task will take a while to run, as it downloads things. It'll close when it's finished*
*If these steps went well, you'll now have a "node_modules" folder inside the htmle folder*

---

## Now all you need to do is put your html files in "src/main"
*Your main file needs to be called "index.html"*

---

## Building for PC/Mac/Linux (Difficulty: Super Easy)
1) **Open "src/main/package.json" and enter some information about your game.**
YOUR_GAME_NAME

2) **Replace the default icons in "src/icons" with your own.**
You can use a free online tool to make Windows/mac icons here: https://iconverticons.com/online/

3) **Run the compiler:**
On PC: double click "build for desktop.bat"
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
On PC: double click "build for itch.bat"
On Mac: double click "build for itch.command"
In Terminal: "grunt itch" and hit enter

*This task merges src/main with overrides/itch, compiles the result and uploads it to itch.io.*

---

## Building for PC/Mac/Linux with Steam (Difficulty: Medium)
For integrating Steam with your game, you'll need to do a bit of extra downloading.

1) **You'll need to download:**
Greenworks (https://github.com/greenheartgames/greenworks/releases) and download the latest release.
Steam SDK (available through your steam admin page - https://partner.steamgames.com)

2) **Copy files from the Greenworks Release and the Steam SDK so that your "overrides/steam" folder looks like this:**
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

3) **Go into the gruntfile.js file and change "version: '0.13.0-beta7'" to whatever version greenworks is built for.**
For example, if you downloaded "Greenworks v0.10.0 for NW.js v0.22.3 & Electron v1.7.2 Beta" you'd change it to "version: '0.22.3'". 
These versions MUST match or all your Steam stuff will break.

4) **Run the compiler:**
On PC: double click "build for steam.bat"
On Mac: double click "build for steam.command"
In Terminal: Type "grunt steam" and hit enter

*This task merges src/main with overrides/steam, and compiles the result in the /dist/steam folder. You'll then need to use the SteamSDK ContentBuilder tool to upload your games.*


---

## Building for iOS and Android with Phonegap (Difficulty: Hard)
1) **You'll need to make an account on build.phonegap.com.**
Making one app at a time is free, and you can add more with a small monthly fee.

2) **Then you'll need to add signing keys for ios and android to your account, there's instructions here:**
http://docs.phonegap.com/phonegap-build/signing (This is probably the hardest part of the entire process.)

3) **When that's done, replace these bits in the gruntfile.js file with your phonegap details:**
YOUR_APP_ID
YOUR_EMAIL
YOUR_PASSWORD
YOUR_IOS_PASSWORD
YOUR_ANDROID_PASSWORD
YOUR_ANDROID_KEYSTORE_PASSWORD
and change this information in "overrides/phonegap/config.xml"
YOUR_GAME_NAME
YOUR_GAME_DESCRIPTION
YOUR_WEBSITE
YOUR_EMAIL
YOUR_NAME

4) **Run the compiler:**
On PC: double click "build for phonegap.bat"
On Mac: double click "build for phonegap.command"
In Terminal: Type "grunt phonegap" and hit enter

*This task merges src/main with overrides/phonegap, zips the result, uploads it to phonegap, downloads the .ipa and .apk files*

On PC: double click "build for phonegap and upload to itch.bat"
On Mac: double click "build for phonegap and upload to itch.command"
In Terminal: Type "grunt phonegapitch" and hit enter

*This task merges src/main with overrides/phonegap, zips the result, uploads it to phonegap, downloads the .ipa and .apk files, and uploads the .apk file to itch.*

---

## FAQs and things to remember
**Audio is still platform-dependant.**
You can use JS libraries like Buzz (http://buzz.jaysalvat.com/) to write easy cross-platform audio code for Desktop.
For mobile, you'll need to use a specific audio plugin that gets bundled into the app. Here's a code sample (mp3 works on iOS and Android):
*code sample coming soon*

**Overrides can be used to hack/patch over platform dependant stuff.**

**Include "phonegap.js" and "media.js" in your HTML (even though they don't exist in your filesystem)**
*Twine might throw an error about the files missing in some browsers*

**Make sure greenworks.js is included in your HTML for Steam stuff**

## Also if you make something cool let me know about it! 