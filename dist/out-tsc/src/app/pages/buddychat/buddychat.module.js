import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BuddychatPage } from './buddychat.page';
var routes = [
    {
        path: '',
        component: BuddychatPage
    }
];
var BuddychatPageModule = /** @class */ (function () {
    function BuddychatPageModule() {
    }
    BuddychatPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [BuddychatPage]
        })
    ], BuddychatPageModule);
    return BuddychatPageModule;
}());
export { BuddychatPageModule };
//# sourceMappingURL=buddychat.module.js.map