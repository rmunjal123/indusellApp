import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { HttpModule, BaseRequestOptions} from '@angular/http'
import { ListingService } from './services/listing.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { AuthenticationService } from './services/authentication.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppErrorHandler } from './services/common/app-error-handler';
import { CreatelistingService } from 'src/app/services/createlisting.service';

import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
//import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FilePath } from '@ionic-native/file-path/ngx'


@NgModule({

  declarations: [AppComponent],
  entryComponents: [],

  imports: [BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule],

  providers: [
    ListingService,
    StatusBar,
    SplashScreen,
    AuthenticationService,
    CreatelistingService,
    SpeechRecognition,
    fakeBackendProvider,
    ReactiveFormsModule,
    MockBackend,
    BaseRequestOptions,
    Camera,
    File,
    FileTransfer,
    FilePath,
    WebView,
    SocialSharing,
    //ImagePicker,
    {provide: ErrorHandler, useClass: AppErrorHandler},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
