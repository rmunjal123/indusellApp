import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddlistingPage } from './addlisting.page';
var routes = [
    {
        path: '',
        component: AddlistingPage
    }
];
var AddlistingPageModule = /** @class */ (function () {
    function AddlistingPageModule() {
    }
    AddlistingPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddlistingPage]
        })
    ], AddlistingPageModule);
    return AddlistingPageModule;
}());
export { AddlistingPageModule };
//# sourceMappingURL=addlisting.module.js.map