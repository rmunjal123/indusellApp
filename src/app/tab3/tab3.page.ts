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

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  username: string = '';
  othersellername: string = '';
  message: string = '';
  subscription: any;
  chatroom: string = '';
  buddymessages:any = [];

  firebuddychats = firebase.database().ref('/buddychats');
  buddy: string = 'buddy';
  allmessages:any = [];
 constructor(public db: AngularFireDatabase,public authservice: AuthenticationService,
             public sellerdetails: SellerdetailsService, public event: Events, public zone: NgZone) {
   this.username = this.authservice.currentUserName;
   console.log(this.username);
   this.othersellername = this.sellerdetails.seller_name;
   this.event.subscribe('newmessage',()=>{
     this.allmessages = [];
    //  this.zone.run(() => {
     this.allmessages = this.buddymessages;
     console.log(this.allmessages);
   }) 
  // })
}

  // initializebuddy(buddy){
  //   this.buddy = buddy;

  initializebuddy(){
  this.buddy = "buddy";
  // return this.buddy;
  }

 sendMessage(msg){
  console.log(this.buddy);
   if(this.buddy){
     var promise = new Promise((resolve,reject) =>{
      //  this.firebuddychats.child(this.username).child(this.othersellername).push({
       this.firebuddychats.child(this.username).child(this.buddy).push({
        username: this.username,
        message: this.message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
       }).then(()=> {
        // this.firebuddychats.child(this.othersellername).child(this.username).push({
        this.firebuddychats.child(this.buddy).child(this.username).push({  
          username: this.username,
          message: this.message,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(()=> {
          resolve(true);
        }).catch((err) => {
           reject(err)
        })
       })
     })
    //  return promise;
   }
  // this.db.list('/'+this.username +'-'+ this.othersellername).push({
  //   username: this.username,
  //   message: this.message,
  //   timestamp: firebase.database.ServerValue.TIMESTAMP
  // })
 }
 getbuddymessages(){
   this.buddymessages = [];
   let temp;
   this.firebuddychats.child(this.username).child(this.buddy).on('value',(snapshotChanges) => {
     temp = snapshotChanges.val();
     for (var tempkey in temp){
       this.buddymessages.push([temp]);
     }
     this.event.publish('newmessage',this.buddymessages) ;
     console.log(this.buddymessages);

   })
 }
}

