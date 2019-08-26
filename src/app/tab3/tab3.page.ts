import { Component, OnInit } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service'
import { Router } from '@angular/router';
import {  AngularFirestore  } from '@angular/fire/firestore';
import { AngularFireModule} from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  username: string = '';
  message: string = '';
  subscription: any;

 constructor(public db: AngularFirestore,public authservice: AuthenticationService) {
   this.username = this.authservice.currentUserName;
   this.subscription = this.db.collection('/chat').snapshotChanges()
   .subscribe(data => console.log(data))
  }

 sendMessage(){
  this.db.collection('/chat').add({
    username: this.username,
    message: this.message
  });
 }
}

