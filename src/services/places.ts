import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";//native way to persist data on device(s)
//import { File } from "ionic-native";
import {File} from '@ionic-native/file';
import { Place } from "../models/place";
import { Location } from "../models/location";
import { Geolocation } from '@ionic-native/geolocation';

declare let cordova: any;


@Injectable()
export class PlacesService {
  private places: Place[] = [];

  //public removeFile: removeFile;//should this be public?
  constructor(private storage: Storage,
              private geolocation: Geolocation,
              public file: File) {}

              // set a key/value
    // storage.set('name', 'Max');
    //
    // // Or to get a key/value pair
    // storage.get('age').then((val) => {
    //   console.log('Your age is', val);
    // });

  addPlace(title: string,
           description: string,
           location: Location,
           imageUrl: string) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then()
      .catch(
        err => {
          this.places.splice(this.places.indexOf(place), 1);
        }
      );
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces() {
    return this.storage.get('places')
    //return this.geolocation.getCurrentPosition('places')

      .then(
        (places: Place[]) => {
          this.places = places != null ? places : [];
          return this.places;
        }

      )
      .catch(
        err => console.log(err)
      );
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);//remove element from places array
    this.storage.set('places', this.places)//overwrite data in storage
      .then(
        () => {
         this.removeFile(place);//call private function below

        }
      )
      .catch(
        err => console.log(err)
      );
  }

//This function was causing errors/app breaks!!
  private removeFile(place: Place) {
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, currentName)
      .then(
        () => console.log('Removed File')
      )
      .catch(
        () => {
          console.log('Error while removing File');
          this.addPlace(place.title, place.description, place.location, place.imageUrl);
        }
      );
  }
 }
