import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CreatelistingService } from 'src/app/services/createlisting.service';
import { BadInput } from 'src/app/services/common/bad-input';
//import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
var STORAGE_KEY = "my_images";
var Tab2Page = /** @class */ (function () {
    function Tab2Page(formbuilder, createlistings, camera, file, webview, actionSheetController, toastController, storage, plt, loadingController, ref, http, transfer, filepath, authservice) {
        this.formbuilder = formbuilder;
        this.createlistings = createlistings;
        this.camera = camera;
        this.file = file;
        this.webview = webview;
        this.actionSheetController = actionSheetController;
        this.toastController = toastController;
        this.storage = storage;
        this.plt = plt;
        this.loadingController = loadingController;
        this.ref = ref;
        this.http = http;
        this.transfer = transfer;
        this.filepath = filepath;
        this.authservice = authservice;
        this.imageResponse = [];
        this.photos = [];
        //imageString: string;
        this.fileUrl = null;
    }
    Tab2Page.prototype.ngOnInit = function () {
        var _this = this;
        this.addlist = new FormGroup({
            post_type: new FormControl('', Validators.required),
            category_id: new FormControl('', Validators.required),
            post_type_id: new FormControl('', Validators.required),
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            country_code: new FormControl('', Validators.required),
            city_id: new FormControl('', Validators.required),
            email: new FormControl(this.authservice.currentUserEmail),
            user_id: new FormControl(this.authservice.currentUserId),
            ad_status: new FormControl(''),
            tags: new FormControl(''),
            negotiable: new FormControl('1'),
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
        this.plt.ready().then(function () {
            _this.loadStoredImages();
        });
    };
    Tab2Page.prototype.onSubmit = function () {
        this.createListing(this.addlist.value);
        console.log(this.addlist.value);
    };
    Tab2Page.prototype.createListing = function (input) {
        var _this = this;
        this.createlistings.create(input)
            .subscribe(function (response) {
            console.log(response);
            //addlisting['id'] = response.id;
            //this.addlisting.splice(0,0, addlisting);
        }, function (Error) {
            if (Error instanceof BadInput) {
                _this.addlist.setErrors(Error.originalError);
            }
            else
                throw Error;
        });
    };
    // onImageUpload() {
    //   this.uploadImages();
    // }
    Tab2Page.prototype.selectImage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: "Select Image Source",
                            buttons: [{
                                    text: 'Load from Library',
                                    handler: function () {
                                        //this.uploadImages();
                                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                                    }
                                },
                                {
                                    text: 'Use Camera',
                                    handler: function () {
                                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab2Page.prototype.loadStoredImages = function () {
        var _this = this;
        this.storage.get(STORAGE_KEY).then(function (images) {
            if (images) {
                var arr = JSON.parse(images);
                _this.images = [];
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var img = arr_1[_i];
                    var filePath = _this.file.dataDirectory + img;
                    var resPath = _this.pathForImage(filePath);
                    _this.images.push({ name: img, path: resPath, filePath: filePath });
                }
            }
        });
    };
    Tab2Page.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            var converted = this.webview.convertFileSrc(img);
            return converted;
        }
    };
    Tab2Page.prototype.presentToast = function (text) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: text,
                            position: 'bottom',
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
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
    Tab2Page.prototype.takePicture = function (sourceType) {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
        };
        this.camera.getPicture(options).then(function (imagePath) {
            _this.filepath.resolveNativePath(imagePath).then(function (nativepath) {
                _this.photos.push(nativepath);
            });
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
    };
    Tab2Page.prototype.UploadImages = function () {
        var interval = 0;
        function Innerfunc() {
            var _this = this;
            var fileTransfer = this.transfer.create();
            var options = {
                fileKey: "images",
                chunkedMode: false,
                mimeType: "image/jpeg",
                headers: {}
            };
            var serverurl = "https://indusell.com/api/post/182";
            fileTransfer.upload(this.photos[interval], serverurl, options).then(function () {
                interval++;
                if (interval < _this.photos.length) {
                    Innerfunc();
                }
                else {
                    alert("Successfully Uploaded Images");
                }
            });
        }
        Innerfunc();
    };
    Tab2Page.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(function (_) {
            //this.updateStoredImages(newFileName);
        }, function (error) {
            _this.presentToast('Error while storing file');
        });
    };
    Tab2Page.prototype.createFileName = function () {
        var d = new Date();
        var n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
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
    Tab2Page.prototype.deleteImage = function (imgEntry, position) {
        var _this = this;
        this.images.splice(position, 1);
        this.storage.get(STORAGE_KEY).then(function (images) {
            var arr = JSON.parse(images);
            var filetered = arr.filter(function (name) { return name != imgEntry.name; });
            _this.storage.set(STORAGE_KEY, JSON.stringify(filetered));
            var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
            _this.file.removeFile(correctPath, imgEntry.name).then(function (res) {
                _this.presentToast('File Removed');
            });
        });
    };
    Tab2Page.prototype.uploadImageData = function (formData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                        //content: 'Uploading Image...',
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.http.post("", formData)
                            .pipe(finalize(function () {
                            loading.dismiss();
                        }))
                            .subscribe(function (res) {
                            if (res['success']) {
                                _this.presentToast('File Upload Complete');
                            }
                            else {
                                _this.presentToast('File Upload Failed');
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, CreatelistingService, Camera, File, WebView,
            ActionSheetController, ToastController, Storage, Platform, LoadingController,
            ChangeDetectorRef, HttpClient, FileTransfer, FilePath, AuthenticationService])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map