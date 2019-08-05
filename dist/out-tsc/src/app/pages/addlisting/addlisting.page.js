import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CreatelistingService } from 'src/app/services/createlisting.service';
import { BadInput } from 'src/app/services/common/bad-input';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
var AddlistingPage = /** @class */ (function () {
    function AddlistingPage(formbuilder, createlistings, imagePicker) {
        this.formbuilder = formbuilder;
        this.createlistings = createlistings;
        this.imagePicker = imagePicker;
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
    AddlistingPage.prototype.onImageUpload = function () {
        this.uploadImages();
    };
    AddlistingPage.prototype.uploadImages = function () {
        this.imagePicker.getPictures(this.options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, function (err) { });
    };
    AddlistingPage = tslib_1.__decorate([
        Component({
            selector: 'app-addlisting',
            templateUrl: './addlisting.page.html',
            styleUrls: ['./addlisting.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, CreatelistingService, ImagePicker])
    ], AddlistingPage);
    return AddlistingPage;
}());
export { AddlistingPage };
//# sourceMappingURL=addlisting.page.js.map