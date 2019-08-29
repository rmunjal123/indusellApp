import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BrandsPage } from './brands.page';
var routes = [
    {
        path: '',
        component: BrandsPage
    }
];
var BrandsPageModule = /** @class */ (function () {
    function BrandsPageModule() {
    }
    BrandsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [BrandsPage]
        })
    ], BrandsPageModule);
    return BrandsPageModule;
}());
export { BrandsPageModule };
//# sourceMappingURL=brands.module.js.map