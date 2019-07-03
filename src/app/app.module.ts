import { NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({

  declarations: [AppComponent],
  entryComponents: [],

  imports: [BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
