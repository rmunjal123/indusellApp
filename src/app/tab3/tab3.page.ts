import { Component, OnInit,NgZone } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service'
import { Router } from '@angular/router';
import {  AngularFirestore  } from '@angular/fire/firestore';
import { AngularFireModule} from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SellerdetailsService } from 'src/app/services/sellerdetails.service';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  firebuddychats = firebase.database().ref('/buddychats');
  buddy: any;
  username: string = '';
  user_id: any;
  message: string = '';
  othersellername : string;
  buddies: any = [];
  buddymessages: any =[];
  msg: any;


  constructor(public db: AngularFireDatabase, public authservice: AuthenticationService,
              public sellerdetails: SellerdetailsService, public chat: ChatService, public events: Events,
              public auth: AuthenticationService){

  this.user_id = this.auth.currentUserId;
  this.buddy = this.chat.buddy
  this.firebuddychats.child(this.user_id).once('value').then((r)=>{console.log(r)}) 
    

// if ( this.firebuddychats.child(this.user_id).child(this.buddy))
// {
//   this.buddies.push(this.buddy)
// }
// console.log(this.buddies)
// }
  }
}