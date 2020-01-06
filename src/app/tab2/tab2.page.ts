import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatelistingService } from 'src/app/services/createlisting.service';
import { AppError } from 'src/app/services/common/app-error';
import { BadInput } from 'src/app/services/common/bad-input';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular'
import { finalize } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { GetcategoriesService } from 'src/app/services/getcategories.service';


const STORAGE_KEY = "my_images";
declare const window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  private addlist: FormGroup;

  images: any[];
  public imageResponse: any = [];
  photos: any = [];
  //imageString: string;
  fileUrl: any = null;
  respData: any;
  capturedSnapURL: string;
  options: any;
  photos_path:any = [];
  image_data:any = [];
  categories:any= [];

  sliderConfig_Category = {
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 2.4
  }

  constructor(private formbuilder: FormBuilder,
    private createlistings: CreatelistingService,
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private storage: Storage,
    private plt: Platform,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,
    private http: HttpClient,
    private transfer: FileTransfer,
    private filepath: FilePath,
    private authservice: AuthenticationService,
    private imagePicker: ImagePicker,
    private getcategories:GetcategoriesService
  ) {
  }

  ngOnInit() {
    this.addlist = new FormGroup({
      post_type: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      post_type_id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      country_code: new FormControl('', Validators.required),
      city_id: new FormControl('15000000', Validators.required),
      email: new FormControl(this.authservice.currentUserEmail),
      user_id: new FormControl(this.authservice.currentUserId),
      ad_status: new FormControl(''),
      tags: new FormControl(''),
      negotiable: new FormControl(''),
      contact_name: new FormControl(this.authservice.currentUserName),
      phone: new FormControl(this.authservice.currentUserPhone),
      address: new FormControl(''),
      verified_email: new FormControl(this.authservice.currentUserVerifiedEmail),
      verified_phone: new FormControl(this.authservice.currentUserVerifiedPhone),
      approval_status: new FormControl('pending'),
      video_link: new FormControl(''),
      brand_ID: new FormControl('4'),
      industry_ID: new FormControl('3'),
      industry_type: new FormControl(''),
    });
    this.plt.ready().then(() => {
      this.loadStoredImages();
    });
  }

  onSubmit() {
    this.createListing(this.addlist.value);
    console.log(this.addlist.value);
  }
  createListing(input: FormGroup) {
    this.createlistings.create(input)
      .subscribe(
        response => {
          console.log(response);
          //addlisting['id'] = response.id;
          //this.addlisting.splice(0,0, addlisting);
        },
        (Error: AppError) => {
          if (Error instanceof BadInput) {
            this.addlist.setErrors(Error.originalError)
          }
          else throw Error;
        });
  }
  // onImageUpload() {
  //   this.uploadImages();
  // }
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
      width: 800,
      quality: 100,
      outputType: 1,
    }
    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.photos.push('data:image/jpeg;base64,' + results[i]);
      }
      console.log(this.photos);
    }, (err) => {
      alert(err);
    });
  }


  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }


  takePicture(sourceType: PictureSourceType) {
    console.log(sourceType);
    // if (sourceType == 0) {
    //   console.log(sourceType);
    //   var options: CameraOptions = {
    //     quality: 100,
    //     sourceType: sourceType,
    //     // saveToPhotoAlbum: false,
    //     // correctOrientation: true,
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     mediaType: this.camera.MediaType.PICTURE,
    //   };
    //   this.camera.getPicture(options).then(imageData => {
    //     console.log(imageData)
    //     let base64Image = 'data:image/jpeg;base64,' + imageData;
    //     this.capturedSnapURL = base64Image
    //     console.log(this.capturedSnapURL)
    //     this.photos.push(this.capturedSnapURL)
    //     console.log(this.photos)

    //   }, (err) => {
    //     console.log('server error>>>>', err);
    //   });
    // }
    // if (sourceType == 1) {
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
        this.photos_path.push(path)
        this.image_data.push(imageData)
      });
      console.log(this.photos);
    }, (err) => {
      console.log('server error>>>>', err);
    });
  }
  UploadImages() {
    var interval = 0;
    var photos_path = this.photos_path
    var image_data = this.image_data
    const fileTransfer: FileTransferObject = this.transfer.create()
    console.log(photos_path)
    function Innerfunc() {
      let options: FileUploadOptions = {
        fileKey: "images",
        chunkedMode: false,
        mimeType: "image/jpeg",
        headers: {}
      }
      var serverurl = "https://indusell.com/api/post-picture/138";
      fileTransfer.upload(image_data[interval], serverurl, options).then(() => {
        interval++;
        if (interval < this.photos.length) {
          Innerfunc();
        }
        else {
          alert("Successfully Uploaded Images");
        }
      })
    }
    Innerfunc();
  }
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(_ => {
      //this.updateStoredImages(newFileName);
    }, error => {
      this.presentToast('Error while storing file');
    });
  }
  createFileName() {
    var d = new Date();
    var n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filetered = arr.filter(name => name != imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filetered));

      var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.presentToast('File Removed');
      });
    });
  }

  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
      //content: 'Uploading Image...',
    });
    await loading.present();

    this.http.post("", formData)
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(res => {
        if (res['success']) {
          this.presentToast('File Upload Complete')
        } else {
          this.presentToast('File Upload Failed')
        }
      });
  }

  onSelectCategoryDropDown(){
    this.getcategories.getCategories()
    .subscribe(response => {
      this.categories = response;
      console.log(response)
    })
  }

}