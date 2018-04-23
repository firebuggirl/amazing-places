import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Location } from "../../models/location";
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  location: Location;
  marker: Location;//determines where map is set when user chooses a location

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private geolocation: Geolocation
  ) {
    this.location = this.navParams.get('location');//determines where map is set at beginning
      if (this.navParams.get('isSet')) {
        this.marker = this.location;
      }
  }

  onSetMarker(event: any) {
      console.log(event);
      this.marker = new Location(event.coords.lat, event.coords.lng);
    }

  onConfirm() {
    this.viewCtrl.dismiss({location: this.marker});
  }

  onAbort() {
    this.viewCtrl.dismiss();
  }

}
