onTakePhoto() {

            const options: CameraOptions = {
              quality: 100,
              //destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              //mediaType: this.camera.MediaType.PICTURE,
              correctOrientation: true
            }

  this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
           // If it's base64:
           //let base64Image = 'data:image/jpeg;base64,' + imageData;
           const currentName = imageData.replace(/^.*[\\\/]/, '');
           const path = imageData.replace(/[^\/]*$/, '');
           const newFileName = new Date().getUTCMilliseconds() + '.jpg';
           File.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
             .then(
               (data: Entry) => {
                 this.imageUrl = data.nativeURL;
                 camera.cleanup();
                 // File.removeFile(path, currentName);
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
              camera.cleanup();
            }
          );
        this.imageUrl = imageData;
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





   });




}
