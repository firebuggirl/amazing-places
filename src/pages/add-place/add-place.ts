import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NgForm } from "@angular/forms";
import { ModalController, LoadingController, ToastController } from "ionic-angular";
import { File, Entry, FileError } from '@ionic-native/file';
//import { File, Entry, FileError } from 'ionic-native';
import { Geolocation } from '@ionic-native/geolocation';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import { PlacesService } from "../../services/places";
import 'rxjs/add/operator/filter';

//import {normalizeURL} from 'ionic-angular';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

    public photos: any = [];
  //geolocation: Geolocation;
        location: Location = {
          lat: 33.873415,
          lng: -115.900992
        };
        locationIsSet = false;
        imageUrl = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private placesService: PlacesService,
              private geolocation: Geolocation,
              private camera: Camera,
              public file: File
            //  private entry: Entry,
            //  private fileError: FileError
            ) {

  }

  onSubmit(form: NgForm) {
    this.placesService
      .addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 33.873415,
      lng: -115.900992
    };
    this.imageUrl = '';
    this.locationIsSet = false;
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage,
      {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Couldn not get location, please pick it manually!',
            duration: 2500
          });
          toast.present();
        }

      );


          //Watch the current device’s position. Clear the watch by unsubscribing from Observable changes.
          const subscription = this.geolocation.watchPosition()
                  .filter((p) => p.coords !== undefined) //Filter Out Errors
                 .subscribe(position => {
                    console.log(position.coords.longitude + ' ' + position.coords.latitude);
                  });
          // To stop notifications
          subscription.unsubscribe();
      }


onTakePhoto() {

  const options: CameraOptions = {
                    // //quality: 100,
                    // //destinationType: this.camera.DestinationType.DATA_URL,
                    // encodingType: this.camera.EncodingType.JPEG,
                    // //mediaType: this.camera.MediaType.PICTURE,
                    // correctOrientation: true
                    quality: 100,
                     destinationType: this.camera.DestinationType.DATA_URL,
                     //destinationType: this.camera.DestinationType.FILE_URI,
                     encodingType: this.camera.EncodingType.JPEG,
                     mediaType: this.camera.MediaType.PICTURE
                  }

  this.camera.getPicture(options)
          .then(
            (imageData) => {
              //let base64Image = 'data:image/jpeg;base64,' + imageData;
              let base64Image = 'data:image/jpeg;base64,' + imageData;
              //this.imageUrl = normalizeURL(base64Image);// pass the imageUrl to your add-place.html Image property.
              this.imageUrl = base64Image;
              // this.base64Image = 'data:image/jpeg;base64,' + imageData;
              // alert(this.base64Image);

              // const currentName = imageData.replace(/^.*[\\\/]/, '');
              // const path = imageData.replace(/[^\/]*$/, '');
              const currentName = base64Image.replace(/^.*[\\\/]/, '');//identify beginning path..strips out all forward and back slashes
              const path = base64Image.replace(/[^\/]*$/, '');//get end of url path
              const newFileName = new Date().getUTCMilliseconds() + '.jpg';//create new img file w/ unique name/path/id
              //getUTCMilliseconds() gets only 3 digit number that can be easily repeat in your application.
              //safer to use getTime(), because returns the number of milliseconds since midnight Jan 1 1970
              this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
                .then(
                  (data: Entry) => {
                    //this.imageUrl = normalizeURL(data.nativeURL);
                      this.imageUrl = data.nativeURL;
                    this.camera.cleanup();
                     //this.file.removeFile(path, currentName);
                  }
                )
                .catch(
                  (err: FileError) => {
                    this.imageUrl = '';
                    const toast = this.toastCtrl.create({
                      message: 'Could not save the image. Please try again',
                      duration: 2500
                    });
                    toast.present();
                   this.camera.cleanup();
                  }
                );
              //this.imageUrl = imageData;
              this.imageUrl = base64Image;
            }
          )
          .catch(
            err => {
              const toast = this.toastCtrl.create({
                message: 'Could not take the image. Please try again',
                duration: 2500
              });
              toast.present();
            }
          );
  }


}//end class
