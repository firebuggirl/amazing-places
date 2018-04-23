## https://www.udemy.com/ionic-2-the-practical-guide-to-building-ios-android-apps/learn/v4/content

### NOTES:

  * create project via CLI:

    ` ionic start awesome-places blank `

    ` cd awesome-places `

    ` ionic generate page place `

    ` ionic generate page add-place `

    ` ionic generate page set-location `

    ` npm i ionic-native --save `//app won't run without this!



  * Google Maps:

      ` npm install --save @agm/core `

      - `app.module`:

          - `import { AgmCoreModule } from '@agm/core';`

          - Import + configure the SAME module (in AppModule  imports[] , add ` AgmCoreModule.forRoot({...}) ` +  add this to imports:

             ` AgmCoreModule.forRoot({
                  apiKey: '......'
               }) `


          - Use different component names: `<agm-map> ` instead of <sebm-google-map> , `<agm-marker> ` instead of <sebm-google-map-marker>

               https://angular-maps.com/guides/getting-started/

          - have to set a height on `<agm-map>` in `set-location.scss`

          - get Google maps API key:

                  - https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key  

                  - click on ` Get an API key` (note: will also see all Firebase projects in drop down list) + `create new project` `awesome-places`

                  - copy API key and place in `AgmCoreModule` via `app.module.ts`


                    * Configuring Maps:

                        - `set-location/set-location.ts`

                        +

                        - ` add-place/add-place.ts`

### Ionic storage

    - uses SQL-lite

    - import in `services/places.ts`

    Update Steps:

    https://github.com/ionic-team/ionic-storage/releases/tag/v2.0.0

    - Run ` npm install @ionic/storage --save `

    - Remove `Storage` from your providers in app.module.ts

    - `import { IonicStorageModule } from '@ionic/storage'` instead of import { IonicStorage } from '@ionic/storage' in `app.module.ts`

    - Add `IonicStorageModule.forRoot()` to the imports array in `app.module.ts`


## Using Ionic Native 3 instead of 2

  -  if you want to use Ionic-native 3, you should follow the instructions provided in this official blog post and the official upgrade readme.

  - Ionic-native 3 changes the way you provide and use the native plugins (such as the camera)....

  http://blog.ionic.io/ionic-native-3-x/

  https://github.com/driftyco/ionic-native/blob/master/README.md

  https://ionicframework.com/docs/native/geolocation

  https://ionicframework.com/docs/native/camera/


  ` npm install @ionic-native/core --save `

  * import and add the plugin provider to your @NgModule, and then inject it where you wish to use it.

    - app.module.ts:

       ` import { Camera } from '@ionic-native/camera'; `

  ` ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"
 `

 ` npm install --save @ionic-native/geolocation `

 ` ionic cordova plugin add cordova-plugin-camera `

 ` npm install @ionic-native/camera --save
 `

 ` import { Geolocation } from '@ionic-native/geolocation'; `

 * add this to `config.html`?


    `<edit-config file="*-Info.plist" mode="merge" target="NSLocationWhenInUseUsageDescription">
        <string>We want your location! Best regards NSA</string>
    </edit-config> `


## Test in device

### iOS:

- ` ionic cordova platform add ios ` //will add iOS as a platform + also execute a build

- To re-build again later:

    ` ionic cordova build ios `


* Open xCode and navigate to project `directory->platforms->ios->awesome-places.xcodeproj`


              * ..Only needs to be done once: go to `preferences->accounts-> + to create Apple ID `..
                  then `view details ` ....need to set up a `signing identity` for `iOS Development` -> `create`
                  ...can create one if don't have one already

                    - NOTE: can't create one for Developer Distribution w/out paid Apple developer account

                    - go back to project in xCode editor and choose your personal `team` in `signing` block/area

                      - can now run it on a device or on a simulator

              - Pick device that want to test on from drop down list and hit `play` in top left hand corner of Xcode

              - NOTE: there is a console that logs out the progress of the build along with any errors.

            * To `run on device` from command line:

              - ` ionic cordova run ios --device `

            * To `run on emulator` via command line:

              - ` ionic cordova emulate ios `

### Building for Android

* Requirements:

https://cordova.apache.org/docs/en/latest/guide/platforms/android/

- Java Development Kit (JDK)
http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html


- Android SDK Manager OR Stand alone tools

https://developer.android.com/studio/index.html
- Open the `Android SDK Manager` (run android or sdkmanager from the terminal) and make sure the following are installed:

      -  Android Platform SDK for your targeted version of Android
        Android SDK build-tools version 19.1.0 or higher
        Android Support Repository (found under "Extras")
        See Android's documentation on Installing SDK Packages for more details.

        https://developer.android.com/studio/intro/update.html

      - pick Android version (in Android SDK Manager) + make sure compatible w/ Cordova ...pick the highest version that you want to support

      - under `extras`, check `Android Support Repository` to install as well ...allows for the support of older devices

        - `install`

      * To use simulator:

      - ` ionic cordova platform add android `//add platform

- ` ionic cordova build android `

- ` ionic cordova emulate android `//run from command line

* Open existing android project in Android SDK Manager + load `android` folder in `platforms` directory

* GO to `tools/Android/AVD Manager` to create a new virtual device ...follow prompts in window


- hit `play`

## Run from command line:

` ionic cordova emulate android `//not working!!

- try: ` ionic cordova platform update android `

- also try ` ionic cordova emulate android --livereload `///then choose

           ` http://localhost:8100 `

` ionic cordova run android --device `//to run on device

## Run from Browser

` ionic cordova platform add browser `

` ionic cordova run browser `




## Troubleshoot camera issues

https://github.com/ionic-team/ionic-native/issues/2020

https://www.udemy.com/ionic-2-the-practical-guide-to-building-ios-android-apps/learn/v4/questions/3411606

## Android issues

http://cordova.apache.org/docs/en/7.x/index.html#page-toc-source


## Ionic File

    - This plugin implements a File API `allowing read/write access to files` residing on the device

    https://ionicframework.com/docs/native/file/


    ` ionic cordova plugin add cordova-plugin-file `

    ` npm install --save @ionic-native/file `

    - `add-place.ts`:

        ` import { File } from '@ionic-native/file';

          constructor(private file: File) { }

          ...

          this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn't exist'));`

            - ` cordova.file.dataDirectory ` =  Persistent and private data storage within the application's sandbox using internal memory (on Android, if you need to use external memory, use .externalDataDirectory). On iOS, this directory is not synced with iCloud (use .syncedDataDirectory). (iOS, Android, BlackBerry 10, windows)

            https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/


## Auto Generate Splash and Icon images for all device sizes

    ` ionic cordova resources `

   * For iOS caching issues related to updating splash.png &/or icon.png in `resources` directory:

      - right click on project path in Xcode upon opening Xcode and delete `.xcodeproj` file.

      - delete `platforms/ios` directory + re-run `ionic cordova platform add ios`

## Configuring App for Deployment

    - in `config.xml`:

        - `id="io.ionic.starter"` = will need this later when publishing application

        - `version="0.0.1"` = influences what gets shown in the stores...can change to `1.0.0`

        - change name of

          - app `<name>Awesome Places</name>`

          - description `<description>An awesome places app.</description>`

          - author `Juliette Tworsey`...etc...

    * more info on config.xml:

      https://cordova.apache.org/docs/en/latest/config_ref/

## Publishing App

  https://ionicframework.com/docs/v1/guide/publishing.html

  https://www.udemy.com/ionic-2-the-practical-guide-to-building-ios-android-apps/learn/v4/t/lecture/6381782?start=0

  * Step 1:

      - build project

      - need to `sign` it

      - have to create a `publisher` account on `Google Play Developer Console`

      - have to create a developer account on `Apple Developer Program` -> one time fee $99 per year

      - have to create a developer account for `Android` -> one time fee $25



  * Deploy:

        ` ionic cordova build ios release `

        ` ionic cordova build android release `

        - iOS troubleshooting: http://masteringionic.com/blog/2017-04-14-lazy-loading-and-deep-linking-with-ionic-3/


        * Android

          https://developer.android.com/studio/publish/index.html



        * iOS

          https://ionicframework.com/docs/v1/guide/publishing.html


        * Google Play
