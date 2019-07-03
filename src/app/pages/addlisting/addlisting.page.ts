import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.page.html',
  styleUrls: ['./addlisting.page.scss'],
})
export class AddlistingPage implements OnInit {
  private addlisting : FormGroup;
  constructor() {

    this.addlisting = new FormGroup({
    PackageType: new FormControl(),
    Category: new FormControl(),
    Type: new FormControl(),
    Title: new FormControl(),
    Description: new FormControl(),
    Price: new FormControl(),
    Location: new FormControl(),
    City: new FormControl()
   });
   }
   onSubmit(){
    console.log(this.addlisting.value)
  }

  ngOnInit() {

    }
  }
