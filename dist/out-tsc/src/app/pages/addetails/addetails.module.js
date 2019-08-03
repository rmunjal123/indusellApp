import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddetailsPage } from './addetails.page';
var routes = [
    {
        path: '',
        component: AddetailsPage
    }
];
var AddetailsPageModule = /** @class */ (function () {
    function AddetailsPageModule() {
    }
    AddetailsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddetailsPage]
        })
    ], AddetailsPageModule);
    return AddetailsPageModule;
}());
export { AddetailsPageModule };
//# sourceMappingURL=addetails.module.js.map