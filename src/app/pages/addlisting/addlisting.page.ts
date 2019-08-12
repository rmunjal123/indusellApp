import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CreatelistingService } from 'src/app/services/createlisting.service';
import { AppError } from 'src/app/services/common/app-error';
import { BadInput } from 'src/app/services/common/bad-input';
//import { ImagePicker } from '@ionic-native/image-picker';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular'
import { finalize } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';


const STORAGE_KEY = "my_images";

@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.page.html',
  styleUrls: ['./addlisting.page.scss'],
})
export class AddlistingPage implements OnInit {
  private addlisting: FormGroup;

  images: any[];
  public imageResponse: any = [];
  photos:any=[];
  //imageString: string;
  fileUrl: any = null;
  respData: any;

  constructor(private formbuilder: FormBuilder, private createlistings: CreatelistingService, private camera: Camera, private file: File, private webview: WebView,
    private actionSheetController: ActionSheetController, private toastController: ToastController, private storage: Storage, private plt: Platform, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private http: HttpClient, private transfer: FileTransfer, private filepath:FilePath) { }
  ngOnInit() {
    this.addlisting = new FormGroup({
      post_type: new FormControl('', Validators.required),
      category_id: new FormControl('', Validators.required),
      post_type_id: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      country_code: new FormControl('', Validators.required),
      city_id: new FormControl('', Validators.required),
      email: new FormControl('Hritesh_2003@yahoo.com', Validators.required),
      user_id: new FormControl('22'),
      ad_status: new FormControl(''),
      tags: new FormControl(''),
      negotiable: new FormControl('1'),
      contact_name: new FormControl('John'),
      phone: new FormControl('+6581884948'),
      address: new FormControl(''),
      verified_email: new FormControl('1'),
      verified_phone: new FormControl('1'),
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
    this.createListing(this.addlisting.value);
    console.log(this.addlisting.value);
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
            this.addlisting.setErrors(Error.originalError)
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
          //this.uploadImages();
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
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

  // uploadImages(){
  //   let options = {
  //         maximumImagesCount: 10,
  //         width: 800,
  //         outputType: 0
  //       }
  //        this.imagePicker.getPictures(options).then((results) => {
  //       for (var i = 0; i < results.length; i++) {
  //         let filename = results[i].substring(results[i].lastIndexOf('/')+1);
  //         let path = results[i].substring(0,results[i].lastIndexOf('/')+1);
  //         this.file.readAsDataURL(path,filename).then((base64String)=>{
  //         this.images.push(base64String);
  //         }) 
  //     }
  //   });
  // }
  // uploadImages() {
  //   let options = {
  //     maximumImagesCount: 10,
  //     width: 800,
  //     outputType: 0
  //   }
    // this.imagePicker.getPictures(options).then((results) => {
    //     let arr = JSON.parse(results[i]);
    //     for (var i = 0; i < results.length; i++) {
    //       this.images.push(results[i]);}
    //     for (let img of arr) {
    //       let filePath = this.file.dataDirectory + img;
    //       let resPath = this.pathForImage(filePath);
    //       this.images.push({ name: img, path: resPath, filePath: filePath });
    //       }
    //   });
    // }
  
    // pathForImage(img) {
    //   if (img === null) {
    //     return '';
    //   } else {
    //     let converted = this.webview.convertFileSrc(img);
    //     return converted;
    //   }
    // }

          //var currentName = results[i].substr(results[i].lastIndexOf('/') + 1);
          //var correctPath = results[i].substr(0, results[i].lastIndexOf('/') + 1);
          //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

        // //this.imageResponse.push(this.imageString);
        // console.log('File Path: ' + results[i]);
        // const fileTransfer: FileTransferObject = this.transfer.create();
        // const uploadOpts: FileUploadOptions = {
        //   fileKey: 'file',
        //   fileName: results[i].substr(results[i].lastIndexOf('/') + 1)
        // };
        // fileTransfer.upload(results[i], 'https://indusell.com/api/post/182', uploadOpts)
        //   .then((data) => {
        //     console.log(data);
        //     this.respData = JSON.parse(data.response);
        //     console.log(this.respData);
        //     this.fileUrl = this.respData.fileUrl;
        //   }, (err) => {
        //     console.log(err);
        //   });
  //     }
  //     }}, (err) => { alert(err) });
  // }
  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(imagePath => {
      this.filepath.resolveNativePath(imagePath).then((nativepath)=> {
        this.photos.push(nativepath);
      })

    //          let arr = JSON.parse(imagePath);
    //          for (var i = 0; i < imagePath.length; i++) {
    //           this.images.push(imagePath[i]);}
    //          for (let img of arr) {
    //          let filePath = this.file.dataDirectory + img;
    //          let resPath = this.pathForImage(filePath);
    //          this.images.push({ name: img, path: resPath, filePath: filePath });    
    //   var currentName = imagePath[i].substr(imagePath.lastIndexOf('/') + 1);
    //   var correctPath = imagePath[i].substr(0, imagePath.lastIndexOf('/') + 1);
    //   this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    // }});
    });
  }
  UploadImages(){
    var interval = 0;
    function Innerfunc(){
  const fileTransfer = this.transfer.create();
  let options: FileUploadOptions= {
    fileKey:"images",
    chunkedMode: false,
    mimeType: "image/jpeg",
    headers:{}
  }
  var serverurl = "https://indusell.com/api/post/182";
  fileTransfer.upload(this.photos[interval],serverurl,options).then(()=>{
    interval++;
    if(interval < this.photos.length){
      Innerfunc();
    }
    else{
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
  // updateStoredImages(name) {
  //   this.storage.get(STORAGE_KEY).then(images => {
  //     let arr = JSON.parse(images);
  //     if (!arr) {
  //       let newImages = [name];
  //       this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
  //     } else {
  //       arr.push(name);
  //       this.storage.set(STORAGE_KEY, JSON.stringify(arr));
  //     }
  //     let filePath = this.file.dataDirectory + name;
  //     let resPath = this.pathForImage(filePath);

  //     let newEntry = {
  //       name: name,
  //       path: resPath,
  //       filePath: filePath
  //     };
  //     this.images = [newEntry, ...this.images];
  //     this.ref.detectChanges();
  //   });
  // }
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
  }}