import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { Router } from '@angular/router';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { HttpClient } from '@angular/common/http';
import { CreatelistingService } from 'src/app/services/createlisting.service';
@Component({
  selector: 'app-addimages',
  templateUrl: './addimages.page.html',
  styleUrls: ['./addimages.page.scss'],
})
export class AddimagesPage implements OnInit {
  options: any;
  photos: any = [];
  photos_path:any = [];
  image_data:any = [];
  new_id: any;

  sliderConfig_Category = {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 2.4
  }

  constructor(private imagePicker: ImagePicker,
  private actionSheetController: ActionSheetController,
  private toastController: ToastController,
  private camera: Camera,
  private base64: Base64,
  private router:Router,
  private http: HttpClient,
  private transfer: FileTransfer,
  private filepath: FilePath,
  private file: File,
  private listing: CreatelistingService,
  private webview: WebView) { }

  ngOnInit() {
    this.new_id = this.listing.service_new_id
    console.log('https://indusell.com/api/picture/'+this.new_id)
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image Source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          // this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          this.selectImages();
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  // selecting multiple image from phone gallary

  selectImages() {
    this.options = {
      maximumImagesCount: 10,
      width: 1200,
      quality: 100,
      outputType: 0,
    }
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log(results[i])
        let filePath: string = results[i]
        this.base64.encodeFile(results[i]).then((base64File: string) => {
        this.photos.push(base64File);
        this.photos_path.push(filePath);
        // this.storage.set('photos',this.photos);
        console.log(this.photos);
        console.log(this.photos_path);
        })
      }
    }, (err) => {
      alert(err);
    });
  }
  takePicture(sourceType: PictureSourceType) {
    console.log(sourceType);
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      // saveToPhotoAlbum: false,
      // correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(imageData => {
      console.log(imageData)
      let filename = imageData.substring(imageData.lastIndexOf('/') + 1);
      let path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
      this.file.readAsDataURL(path, filename).then((base64data) => {
        console.log(base64data)
        this.photos.push(base64data);
        this.photos_path.push(imageData)
        this.image_data.push(imageData)
      });
      console.log(this.photos_path);
    }, (err) => {
      console.log('server error>>>>', err);
    });
  }
  UploadImages() {
    var interval = 0;
    var photos_path = this.photos_path
    var image_data = this.image_data
    var new_id = this.new_id
    const fileTransfer: FileTransferObject = this.transfer.create()
    console.log(photos_path.length)
    function Innerfunc() {
      let options: FileUploadOptions = {
        fileKey: "picture[]",
        chunkedMode: false,
        mimeType: "image/jpeg",
        headers: {}
      }
      console.log('https://indusell.com/api/picture/'+ new_id)
      var serverurl = 'https://indusell.com/api/picture/'+ new_id;
      fileTransfer.upload(photos_path[interval], serverurl, options).then(() => {
        interval++;
        if (interval < photos_path.length) {
          Innerfunc();
        }
        else {
          alert("Successfully Uploaded Images");
          this.router.navigate(['/tabs/tab1']);
        }
      })
    }
    Innerfunc();
  }


}
