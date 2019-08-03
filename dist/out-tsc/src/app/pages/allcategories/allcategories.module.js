import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AllcategoriesPage } from './allcategories.page';
var routes = [
    {
        path: '',
        component: AllcategoriesPage
    }
];
var AllcategoriesPageModule = /** @class */ (function () {
    function AllcategoriesPageModule() {
    }
    AllcategoriesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AllcategoriesPage]
        })
    ], AllcategoriesPageModule);
    return AllcategoriesPageModule;
}());
export { AllcategoriesPageModule };
//# sourceMappingURL=allcategories.module.js.map