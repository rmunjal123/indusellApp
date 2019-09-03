import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  firebuddychats = firebase.database().ref('/buddychats');
  buddy: any = "buddy";
  username: string = '';
  message: string = '';
  othersellername : string;
  arr: any = [];
  buddymessages: any =[];
  msg: any;


  constructor(public events: Events,public authservice: AuthenticationService,public sellerdetails: SellerdetailsService ) {           
    this.username = this.authservice.currentUserName;
    console.log(this.username);
    this.othersellername = this.sellerdetails.seller_name;
    
  }

  initializebuddy(){
    this.username = "Admin"
      this.buddy = "buddy";
      // return this.buddy;
      }
    
     sendMessage(message){
      console.log(this.buddy);
       if(this.buddy){
         var promise = new Promise((resolve,reject) =>{
          //  this.firebuddychats.child(this.username).child(this.othersellername).push({
           this.firebuddychats.child(this.username).child(this.buddy).push({
            username: this.username,
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
           }).then(()=> {
            // this.firebuddychats.child(this.othersellername).child(this.username).push({
            this.firebuddychats.child(this.buddy).child(this.username).push({  
              username: this.username,
              message: message,
              timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(()=> {
              resolve(true);
            }).catch((err) => {
               reject(err)
            })
           })
         })
        return promise;
       }
      }

  getbuddymessages() {
    let msg;
    const that = this;
    this.firebuddychats.child(this.username).child(this.buddy).on('child_added', function (snapshotChanges) {
    msg = snapshotChanges.val();
    console.log(snapshotChanges.val());
    that.buddymessages.push(msg);
    console.log(that.buddymessages);
    that.events.publish('newmessages',that.buddymessages);   
    })
             
    //this.events.publish('newmessages');
    // for (var tempkey in msg) {
    // buddymessages.push(msg[tempkey]);
    //console.log(that.buddymessages);
    //   }})
    // this.events.publish('newmessages');
    //console.log(this.buddymessages);
    //this.arr = buddymessages;
    //return this.buddymessages
    //this.events.publish('newmessages',this.buddymessages);

}}
