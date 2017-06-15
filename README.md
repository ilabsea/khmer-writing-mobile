# khmer-writing-mobile

Khmer writing helps grade 1 to grade 3 students to improve writing khmer word.  

## Development Setup
Khmer writing is an application developed using ionic.
We use:
* Ionic 2.1.12
* Cordova 6.5
* Angular 1.6.3.7

## Plugins
Khmer writing uses external plugins to make the application run as native mobile application as following:
* cordova-plugin-compat 1.1.0 "Compat"
* cordova-plugin-console 1.0.5 "Console"
* cordova-plugin-device 1.1.4 "Device"
* cordova-plugin-file 4.3.1 "File"
* cordova-plugin-file-transfer 1.6.1 "File Transfer"
* cordova-plugin-media 2.4.1 "Media"
* cordova-plugin-splashscreen 4.0.1 "Splashscreen"
* cordova-plugin-sqlite-2 1.0.4 "SQLitePlugin"
* cordova-plugin-statusbar 2.2.1 "StatusBar"
* cordova-plugin-whitelist 1.3.1 "Whitelist"
* ionic-plugin-keyboard 2.2.1 "Keyboard"

## Running on mobile
To start the application on device, first of all, we should install all the developments set up and plugins.
Moreover, we have to create a endpoint file in www/js/app.endpoint.js
as app.endpoint.sample.js by changing to your server. After that, you can start the command as below.

$ ionic platform rm android
$ ionic platform add android
$ ionic run android --device
