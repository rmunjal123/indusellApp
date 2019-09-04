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


  buddy: any;
  user_id: any;
  message: string = '';
  othersellername : string;
  arr: any = [];
  buddymessages: any =[];
  msg: any;

  firebuddychats = firebase.database().ref('/buddychats');

  constructor(public events: Events,public auth: AuthenticationService,public sellerdetails: SellerdetailsService ) {           
    this.user_id = this.auth.currentUserId;
    console.log(this.user_id);
    this.othersellername = this.sellerdetails.seller_name;
    console.log(this.buddy);
  }

  initializebuddy(){
      this.buddy;
      return this.buddy;
      }
    
     sendMessage(message){
      console.log(this.buddy);
       if(this.buddy){
         var promise = new Promise((resolve,reject) =>{
           this.firebuddychats.child(this.user_id).child(this.buddy).push({
           //this.firebuddychats.child(this.user_email).child(this.buddy).push({
            username: this.user_id,
            message: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
           }).then(()=> {
            this.firebuddychats.child(this.buddy).child(this.user_id).push({
            //this.firebuddychats.child(this.buddy).child(this.user_email).push({  
              username: this.user_id,
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
    this.buddymessages = []; 
    const that = this;
    this.firebuddychats.child(this.user_id).child(this.buddy).on('child_added', function (snapshotChanges) { 
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
