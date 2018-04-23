webpackJsonp([3],{

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPlacePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__set_location_set_location__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_places__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { File, Entry, FileError } from 'ionic-native';





var AddPlacePage = (function () {
    function AddPlacePage(navCtrl, navParams, modalCtrl, loadingCtrl, toastCtrl, placesService, geolocation, camera, file
        //  private entry: Entry,
        //  private fileError: FileError
    ) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.placesService = placesService;
        this.geolocation = geolocation;
        this.camera = camera;
        this.file = file;
        this.photos = [];
        //geolocation: Geolocation;
        this.location = {
            lat: 33.873415,
            lng: -115.900992
        };
        this.locationIsSet = false;
        this.imageUrl = '';
    }
    AddPlacePage.prototype.onSubmit = function (form) {
        this.placesService
            .addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
        form.reset();
        this.location = {
            lat: 33.873415,
            lng: -115.900992
        };
        this.imageUrl = '';
        this.locationIsSet = false;
    };
    AddPlacePage.prototype.onOpenMap = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__set_location_set_location__["a" /* SetLocationPage */], { location: this.location, isSet: this.locationIsSet });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.location = data.location;
                _this.locationIsSet = true;
            }
        });
    };
    AddPlacePage.prototype.onLocate = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Getting your Location...'
        });
        loader.present();
        this.geolocation.getCurrentPosition()
            .then(function (location) {
            loader.dismiss();
            _this.location.lat = location.coords.latitude;
            _this.location.lng = location.coords.longitude;
            _this.locationIsSet = true;
        })
            .catch(function (error) {
            loader.dismiss();
            var toast = _this.toastCtrl.create({
                message: 'Couldn not get location, please pick it manually!',
                duration: 2500
            });
            toast.present();
        });
        //Watch the current device’s position. Clear the watch by unsubscribing from Observable changes.
        var subscription = this.geolocation.watchPosition()
            .filter(function (p) { return p.coords !== undefined; }) //Filter Out Errors
            .subscribe(function (position) {
            console.log(position.coords.longitude + ' ' + position.coords.latitude);
        });
        // To stop notifications
        subscription.unsubscribe();
    };
    AddPlacePage.prototype.onTakePhoto = function () {
        var _this = this;
        var options = {
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
        };
        this.camera.getPicture(options)
            .then(function (imageData) {
            //let base64Image = 'data:image/jpeg;base64,' + imageData;
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            //this.imageUrl = normalizeURL(base64Image);// pass the imageUrl to your add-place.html Image property.
            _this.imageUrl = base64Image;
            // this.base64Image = 'data:image/jpeg;base64,' + imageData;
            // alert(this.base64Image);
            // const currentName = imageData.replace(/^.*[\\\/]/, '');
            // const path = imageData.replace(/[^\/]*$/, '');
            var currentName = base64Image.replace(/^.*[\\\/]/, ''); //identify beginning path..strips out all forward and back slashes
            var path = base64Image.replace(/[^\/]*$/, ''); //get end of url path
            var newFileName = new Date().getUTCMilliseconds() + '.jpg'; //create new img file w/ unique name/path/id
            //getUTCMilliseconds() gets only 3 digit number that can be easily repeat in your application.
            //safer to use getTime(), because returns the number of milliseconds since midnight Jan 1 1970
            _this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
                .then(function (data) {
                //this.imageUrl = normalizeURL(data.nativeURL);
                _this.imageUrl = data.nativeURL;
                _this.camera.cleanup();
                //this.file.removeFile(path, currentName);
            })
                .catch(function (err) {
                _this.imageUrl = '';
                var toast = _this.toastCtrl.create({
                    message: 'Could not save the image. Please try again',
                    duration: 2500
                });
                toast.present();
                _this.camera.cleanup();
            });
            //this.imageUrl = imageData;
            _this.imageUrl = base64Image;
        })
            .catch(function (err) {
            var toast = _this.toastCtrl.create({
                message: 'Could not take the image. Please try again',
                duration: 2500
            });
            toast.present();
        });
    };
    return AddPlacePage;
}()); //end class
AddPlacePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-add-place',template:/*ion-inline-start:"/Volumes/PROJECTS/amazing-places/src/pages/add-place/add-place.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Add a Place</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="content">\n  <form #f="ngForm" (ngSubmit)="onSubmit(f)">\n    <ion-list>\n      <ion-item class="title2">\n        <ion-label fixed color="light">Title</ion-label>\n        <ion-input\n          type="text"\n          placeholder="Great scenery..."\n          name="title"\n          ngModel\n          required\n          class="text-input"\n\n          ></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Short Description</ion-label>\n        <ion-textarea\n          name="description"\n          ngModel\n          required></ion-textarea>\n      </ion-item>\n    </ion-list>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button\n            ion-button\n            block\n            round outline\n            type="button"\n            icon-left\n            color="light"\n            (click)="onLocate()">\n            <ion-icon name="locate"></ion-icon>\n            Locate me\n          </button>\n        </ion-col>\n        <ion-col>\n          <button\n            ion-button\n            block\n            round outline\n            type="button"\n            icon-left\n            color="light"\n            (click)="onOpenMap()">\n            <ion-icon name="map"></ion-icon>\n            Select on Map\n          </button>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="locationIsSet">\n        <ion-col>\n          <agm-map\n            [latitude]="location.lat"\n            [longitude]="location.lng"\n            [zoom]="16">\n            <agm-marker\n              [latitude]="location.lat"\n              [longitude]="location.lng"></agm-marker>\n          </agm-map>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col text-center>\n          <h5>Take a Photo!</h5>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <button\n            ion-button\n            icon-left\n            block\n            round outline\n            color="light"\n            type="button"\n            (click)="onTakePhoto()">\n            <ion-icon name="camera"></ion-icon>\n            Open Camera\n          </button>\n        </ion-col>\n      </ion-row>\n      <ion-row *ngIf="imageUrl != \'\'">\n        <ion-col>\n          <img [src]="imageUrl">\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <button\n            ion-button\n            color="light"\n            round block\n            type="submit"\n            [disabled]="!f.valid || !locationIsSet">\n            <!-- [disabled]="!f.valid || !locationIsSet || imageUrl == base64Image"> -->\n            <!-- [disabled]="!f.valid || !locationIsSet || imageUrl == \'\'"> -->\n\n            Add this Place\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Volumes/PROJECTS/amazing-places/src/pages/add-place/add-place.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_6__services_places__["a" /* PlacesService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */]
        //  private entry: Entry,
        //  private fileError: FileError
    ])
], AddPlacePage);

//# sourceMappingURL=add-place.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetLocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_location__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SetLocationPage = (function () {
    function SetLocationPage(navCtrl, navParams, viewCtrl, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.geolocation = geolocation;
        this.location = this.navParams.get('location'); //determines where map is set at beginning
        if (this.navParams.get('isSet')) {
            this.marker = this.location;
        }
    }
    SetLocationPage.prototype.onSetMarker = function (event) {
        console.log(event);
        this.marker = new __WEBPACK_IMPORTED_MODULE_2__models_location__["a" /* Location */](event.coords.lat, event.coords.lng);
    };
    SetLocationPage.prototype.onConfirm = function () {
        this.viewCtrl.dismiss({ location: this.marker });
    };
    SetLocationPage.prototype.onAbort = function () {
        this.viewCtrl.dismiss();
    };
    return SetLocationPage;
}());
SetLocationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-set-location',template:/*ion-inline-start:"/Volumes/PROJECTS/amazing-places/src/pages/set-location/set-location.html"*/'\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title >Choose Location</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <agm-map\n          [latitude]="location.lat"\n          [longitude]="location.lng"\n          [zoom]="16"\n          (mapClick)="onSetMarker($event)">\n          <agm-marker\n            [latitude]="marker.lat"\n            [longitude]="marker.lng"\n            *ngIf="marker"></agm-marker>\n        </agm-map>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <button\n          ion-button\n          block\n          color="secondary"\n          (click)="onConfirm()"\n          [disabled]="!marker">Confirm</button>\n      </ion-col>\n      <ion-col>\n        <button\n          ion-button\n          block\n          color="danger"\n          (click)="onAbort()">Abort</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Volumes/PROJECTS/amazing-places/src/pages/set-location/set-location.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */]])
], SetLocationPage);

//# sourceMappingURL=set-location.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_places__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PlacePage = (function () {
    function PlacePage(navCtrl, navParams, viewCtrl, placesService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.placesService = placesService;
        this.place = this.navParams.get('place');
        this.index = this.navParams.get('index');
    }
    PlacePage.prototype.onLeave = function () {
        this.viewCtrl.dismiss();
    };
    PlacePage.prototype.onDelete = function () {
        this.placesService.deletePlace(this.index);
        this.onLeave();
    };
    return PlacePage;
}());
PlacePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-place',template:/*ion-inline-start:"/Volumes/PROJECTS/amazing-places/src/pages/place/place.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ place.title }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col text-center>\n        <img [src]="place.imageUrl">\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <p>{{ place.description }}</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <agm-map\n          [latitude]="place.location.lat"\n          [longitude]="place.location.lng"\n          [zoom]="16">\n          <agm-marker\n            [latitude]="place.location.lat"\n            [longitude]="place.location.lng"></agm-marker>\n        </agm-map>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <button\n          ion-button\n          block\n          (click)="onLeave()">Leave</button>\n      </ion-col>\n      <ion-col>\n        <button\n          ion-button\n          block\n          color="danger"\n          (click)="onDelete()">Delete</button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Volumes/PROJECTS/amazing-places/src/pages/place/place.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__services_places__["a" /* PlacesService */]])
], PlacePage);

//# sourceMappingURL=place.js.map

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 127;

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/add-place/add-place.module": [
		310,
		2
	],
	"../pages/place/place.module": [
		311,
		1
	],
	"../pages/set-location/set-location.module": [
		312,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 168;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_place_add_place__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_places__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__place_place__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, modalCtrl, placesService) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.placesService = placesService;
        this.addPlacePage = __WEBPACK_IMPORTED_MODULE_2__add_place_add_place__["a" /* AddPlacePage */];
        this.places = [];
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.placesService.fetchPlaces()
            .then(function (places) { return _this.places = places; });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.places = this.placesService.loadPlaces();
    };
    HomePage.prototype.onOpenPlace = function (place, index) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__place_place__["a" /* PlacePage */], { place: place, index: index });
        modal.present();
        modal.onDidDismiss(function () {
            _this.places = _this.placesService.loadPlaces();
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Volumes/PROJECTS/amazing-places/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-buttons end>\n      <button ion-button icon-only [navPush]="addPlacePage">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Awesome Places\n      <i primary class="fa fa-heart fa-lg"></i>\n    </ion-title>\n\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding  >\n  <ion-card *ngFor="let place of places; let i = index" (click)="onOpenPlace(place, i)">\n    <img [src]="place.imageUrl">\n    <ion-card-content text-center color="light">\n      <ion-card-title>\n        {{ place.title }}\n      </ion-card-title>\n      <p>{{ place.description }}</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Volumes/PROJECTS/amazing-places/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_3__services_places__["a" /* PlacesService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(245);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_place_place__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_set_location_set_location__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_add_place_add_place__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__agm_core__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_places__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_geolocation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_file__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//import { Storage } from "@ionic/storage";






 //Google maps




//import { File } from "ionic-native";
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_place_place__["a" /* PlacePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_add_place_add_place__["a" /* AddPlacePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_set_location_set_location__["a" /* SetLocationPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_11__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyA1zC7PE61CxYGG0_YSNYoHdimzXUHNzv8'
            }),
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/add-place/add-place.module#AddPlacePageModule', name: 'AddPlacePage', segment: 'add-place', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/place/place.module#PlacePageModule', name: 'PlacePage', segment: 'place', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/set-location/set-location.module#SetLocationPageModule', name: 'SetLocationPage', segment: 'set-location', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_place_place__["a" /* PlacePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_add_place_add_place__["a" /* AddPlacePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_set_location_set_location__["a" /* SetLocationPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_12__services_places__["a" /* PlacesService */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__["a" /* Camera */],
            Storage,
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_geolocation__["a" /* Geolocation */],
            // Storage,//no longer applicable to Ionic 3 + Angular 5
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Location; });
var Location = (function () {
    function Location(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }
    return Location;
}());

//# sourceMappingURL=location.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Place; });
var Place = (function () {
    function Place(title, description, location, imageUrl) {
        this.title = title;
        this.description = description;
        this.location = location;
        this.imageUrl = imageUrl;
    }
    return Place;
}());

//# sourceMappingURL=place.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Volumes/PROJECTS/amazing-places/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Volumes/PROJECTS/amazing-places/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_place__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

 //native way to persist data on device(s)
//import { File } from "ionic-native";



var PlacesService = (function () {
    //public removeFile: removeFile;//should this be public?
    function PlacesService(storage, geolocation, file) {
        this.storage = storage;
        this.geolocation = geolocation;
        this.file = file;
        this.places = [];
    }
    // set a key/value
    // storage.set('name', 'Max');
    //
    // // Or to get a key/value pair
    // storage.get('age').then((val) => {
    //   console.log('Your age is', val);
    // });
    PlacesService.prototype.addPlace = function (title, description, location, imageUrl) {
        var _this = this;
        var place = new __WEBPACK_IMPORTED_MODULE_3__models_place__["a" /* Place */](title, description, location, imageUrl);
        this.places.push(place);
        this.storage.set('places', this.places)
            .then()
            .catch(function (err) {
            _this.places.splice(_this.places.indexOf(place), 1);
        });
    };
    PlacesService.prototype.loadPlaces = function () {
        return this.places.slice();
    };
    PlacesService.prototype.fetchPlaces = function () {
        var _this = this;
        return this.storage.get('places')
            .then(function (places) {
            _this.places = places != null ? places : [];
            return _this.places;
        })
            .catch(function (err) { return console.log(err); });
    };
    PlacesService.prototype.deletePlace = function (index) {
        var _this = this;
        var place = this.places[index];
        this.places.splice(index, 1); //remove element from places array
        this.storage.set('places', this.places) //overwrite data in storage
            .then(function () {
            _this.removeFile(place); //call private function below
        })
            .catch(function (err) { return console.log(err); });
    };
    //This function was causing errors/app breaks!!
    PlacesService.prototype.removeFile = function (place) {
        var _this = this;
        var currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
        this.file.removeFile(cordova.file.dataDirectory, currentName)
            .then(function () { return console.log('Removed File'); })
            .catch(function () {
            console.log('Error while removing File');
            _this.addPlace(place.title, place.description, place.location, place.imageUrl);
        });
    };
    return PlacesService;
}());
PlacesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */]])
], PlacesService);

//# sourceMappingURL=places.js.map

/***/ })

},[222]);
//# sourceMappingURL=main.js.map