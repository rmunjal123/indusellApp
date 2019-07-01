import { Component,OnInit, ViewChild } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service'
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    constructor(private getcategoriesService:GetcategoriesService , private router:Router,
      private speechRecognition: SpeechRecognition){}

    ngOnInit(){}

    // Check feature available
    isavailable(){
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(available))
    }

    // Start the recognition process
    startrecognition(options){
    this.speechRecognition.startListening(options)
      .subscribe(
        (matches: string[]) => console.log(matches),
        (onerror) => console.log('error:', onerror)
      )
    }

    // Stop the recognition process (iOS only)
    stoprecognition(){
    this.speechRecognition.stopListening()
  }

    // Get the list of supported languages
    languagesupported(){
    this.speechRecognition.getSupportedLanguages()
      .then(
        (languages: string[]) => console.log(languages),
        (error) => console.log(error)
      )
    }

    // Check permission
    checkpermissions(){
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => console.log(hasPermission))
    }

    // Request permissions
    requestpermissions(){
    this.speechRecognition.requestPermission()
      .then(
        () => console.log('Granted'),
        () => console.log('Denied')
      )
    }
}
