import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import { Storage } from "@ionic/storage";
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlacePage } from '../pages/place/place';
import { SetLocationPage } from '../pages/set-location/set-location';
import { AddPlacePage } from '../pages/add-place/add-place';

import { AgmCoreModule } from '@agm/core';//Google maps
import { PlacesService } from "../services/places";
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';
//import { File } from "ionic-native";



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlacePage,
    AddPlacePage,
    SetLocationPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
       apiKey: 'AIzaSyA1zC7PE61CxYGG0_YSNYoHdimzXUHNzv8'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacePage,
    AddPlacePage,
    SetLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PlacesService,
    Camera,
    Storage,
    File,
    Geolocation,
    // Storage,//no longer applicable to Ionic 3 + Angular 5
   {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
