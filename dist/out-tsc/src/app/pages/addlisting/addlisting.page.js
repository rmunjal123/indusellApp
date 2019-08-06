import * as tslib_1 from "tslib";
import { Component, ChangeDetectorRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CreatelistingService } from 'src/app/services/createlisting.service';
import { BadInput } from 'src/app/services/common/bad-input';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
var STORAGE_KEY = "my_images";
var AddlistingPage = /** @class */ (function () {
    function AddlistingPage(formbuilder, createlistings, imagePicker, camera, file, webview, actionSheetController, toastController, storage, plt, loadingController, ref, http, transfer) {
        this.formbuilder = formbuilder;
        this.createlistings = createlistings;
        this.imagePicker = imagePicker;
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
        this.imageResponse = [];
        //imageString: string;
        this.fileUrl = null;
    }
    AddlistingPage.prototype.ngOnInit = function () {
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
    };
    AddlistingPage.prototype.onSubmit = function () {
        this.createListing(this.addlisting.value);
        console.log(this.addlisting.value);
    };
    AddlistingPage.prototype.createListing = function (input) {
        var _this = this;
        this.createlistings.create(input)
            .subscribe(function (response) {
            console.log(response);
            //addlisting['id'] = response.id;
            //this.addlisting.splice(0,0, addlisting);
        }, function (Error) {
            if (Error instanceof BadInput) {
                _this.addlisting.setErrors(Error.originalError);
            }
            else
                throw Error;
        });
    };
    AddlistingPage.prototype.uploadImages = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 10,
            width: 800,
            outputType: 0
        };
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                _this.imageResponse.push(results[i]);
                //this.imageResponse.push(this.imageString);
                console.log('File Path: ' + results[i]);
                var fileTransfer = _this.transfer.create();
                var uploadOpts = {
                    fileKey: 'file',
                    fileName: results[i].substr(results[i].lastIndexOf('/') + 1)
                };
                fileTransfer.upload(results[i], 'https://indusell.com/api/post/182;', uploadOpts)
                    .then(function (data) {
                    console.log(data);
                    _this.respData = JSON.parse(data.response);
                    console.log(_this.respData);
                    _this.fileUrl = _this.respData.fileUrl;
                }, function (err) {
                    console.log(err);
                });
            }
        }, function (err) { alert(err); });
    };
    AddlistingPage.prototype.onImageUpload = function () {
        this.uploadImages();
    };
    AddlistingPage.prototype.selectImage = function () {
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
    AddlistingPage.prototype.loadStoredImages = function () {
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
    AddlistingPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            var converted = this.webview.convertFileSrc(img);
            return converted;
        }
    };
    AddlistingPage.prototype.presentToast = function (text) {
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
    AddlistingPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imagePath) {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
        });
    };
    AddlistingPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(function (_) {
            _this.updateStoredImages(newFileName);
        }, function (error) {
            _this.presentToast('Error while storing file');
        });
    };
    AddlistingPage.prototype.createFileName = function () {
        var d = new Date();
        var n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    AddlistingPage.prototype.updateStoredImages = function (name) {
        var _this = this;
        this.storage.get(STORAGE_KEY).then(function (images) {
            var arr = JSON.parse(images);
            if (!arr) {
                var newImages = [name];
                _this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
            }
            else {
                arr.push(name);
                _this.storage.set(STORAGE_KEY, JSON.stringify(arr));
            }
            var filePath = _this.file.dataDirectory + name;
            var resPath = _this.pathForImage(filePath);
            var newEntry = {
                name: name,
                path: resPath,
                filePath: filePath
            };
            _this.images = [newEntry].concat(_this.images);
            _this.ref.detectChanges();
        });
    };
    // deleteImage(imgEntry, position) {
    //   this.images.splice(position, 1);
    //   this.storage.get(STORAGE_KEY).then(images => {
    //     let arr = JSON.parse(images);
    //     let filetered = arr.filter(name => name != imgEntry.name);
    //     this.storage.set(STORAGE_KEY, JSON.stringify(filetered));
    //     var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
    //     this.file.removeFile(correctPath, imgEntry.name).then(res => {
    //       this.presentToast('File Removed');
    //     });
    //   });
    // }
    AddlistingPage.prototype.startUpload = function (imgEntry) {
        var _this = this;
        this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
            .then(function (entry) {
            entry.file(function (file) { return _this.readFile(file); });
        });
    };
    AddlistingPage.prototype.readFile = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = function () {
            var formData = new FormData();
            var imgBlob = new Blob([reader.result], {
                type: file.type
            });
            formData.append('file', imgBlob, file.name);
            _this.uploadImageData(formData);
        };
        reader.readAsArrayBuffer(file);
    };
    AddlistingPage.prototype.uploadImageData = function (formData) {
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
                        this.http.post("https://indusell.com/api/post/182", formData)
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
    AddlistingPage = tslib_1.__decorate([
        Component({
            selector: 'app-addlisting',
            templateUrl: './addlisting.page.html',
            styleUrls: ['./addlisting.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, CreatelistingService, ImagePicker, Camera, File, WebView,
            ActionSheetController, ToastController, Storage, Platform, LoadingController,
            ChangeDetectorRef, HttpClient, FileTransfer])
    ], AddlistingPage);
    return AddlistingPage;
}());
export { AddlistingPage };
//# sourceMappingURL=addlisting.page.js.map