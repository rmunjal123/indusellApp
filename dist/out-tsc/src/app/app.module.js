import * as tslib_1 from "tslib";
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { ListingService } from './services/listing.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { AuthenticationService } from './services/authentication.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppErrorHandler } from './services/common/app-error-handler';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [BrowserModule,
                IonicModule.forRoot(),
                IonicStorageModule.forRoot(),
                AppRoutingModule,
                HttpClientModule,
                HttpModule],
            providers: [
                ListingService,
                StatusBar,
                SplashScreen,
                AuthenticationService,
                SpeechRecognition,
                fakeBackendProvider,
                ReactiveFormsModule,
                MockBackend,
                BaseRequestOptions,
                Camera,
                File,
                WebView,
                { provide: ErrorHandler, useClass: AppErrorHandler },
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map