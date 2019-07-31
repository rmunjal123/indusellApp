import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.page.html',
  styleUrls: ['./addlisting.page.scss'],
})
export class AddlistingPage implements OnInit {
  private addlisting : FormGroup;
  private addlisting2: {}
  constructor() {

    this.addlisting = new FormGroup({
    post_type: new FormControl('',Validators.required),
    category_id: new FormControl('',Validators.required),
    post_type_id: new FormControl('',Validators.required),
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    country_code: new FormControl('',Validators.required),
    city_id: new FormControl('',Validators.required),
    email: new FormControl('Hritesh_2003@yahoo.com',Validators.required)
   });
  }
  onSubmit(){
    console.log(this.addlisting);
  }

  ngOnInit() {

    }
  

  createListing(addlisting){
    //   this.newlistings.create(listing)
    //   .subscribe(
    //     response => {
    //       listing['id'] = response.id;
    //       this.listings.splice(0,0, listing);
    //     },
    //     (Error: AppError) => {
    //       if (Error instanceof BadInput) {
    //         //this.form.setErrors(error.originalError)
    //       }
    //       else throw Error;
    //     });
    //     }
  }
}