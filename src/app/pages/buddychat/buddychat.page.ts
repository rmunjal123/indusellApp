import { Component, OnInit } from '@angular/core';
import { GetcategoriesService } from 'src/app/services/getcategories.service'
import { Router } from '@angular/router';
import {  AngularFirestore  } from '@angular/fire/firestore';
import { AngularFireModule} from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SellerdetailsService } from 'src/app/services/sellerdetails.service';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular'
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-buddychat',
  templateUrl: './buddychat.page.html',
  styleUrls: ['./buddychat.page.scss'],
})
export class BuddychatPage  {

  username: string = '';
  othersellername: string = '';
  message: string = '';
  subscription: any;
  chatroom: string = '';
  buddymessages:any = [];
  allmessages = [];
  newmessage: '';
  buddy_id: any;
  user_id: any;

  firebuddychats = firebase.database().ref('/buddychats');
  buddy: any;


  constructor(public db: AngularFireDatabase, public auth: AuthenticationService,
    public sellerdetails: SellerdetailsService, public chat: ChatService, public events: Events) { 
      this.buddy_id = this.chat.buddy;
      this.user_id = this.auth.currentUserId;
      this.chat.events.subscribe('newmessages', ()=>{
      this.allmessages = this.chat.buddymessages;
      })
    }
    ionViewDidEnter() {
      this.chat.getbuddymessages();
    }
    
    addmessage(){
      this.chat.sendMessage(this.newmessage);
    }
    }
