import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CreatelistingService } from 'src/app/services/createlisting.service';
import { AppError } from 'src/app/services/common/app-error';
import { BadInput } from 'src/app/services/common/bad-input';

@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.page.html',
  styleUrls: ['./addlisting.page.scss'],
})
export class AddlistingPage implements OnInit {
  private addlisting : FormGroup;


  constructor(private formbuilder: FormBuilder, private createlistings:CreatelistingService) {
    
    this.addlisting = new FormGroup({
    post_type: new FormControl('',Validators.required),
    category_id: new FormControl('',Validators.required),
    post_type_id: new FormControl('',Validators.required),
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    country_code: new FormControl('',Validators.required),
    city_id: new FormControl('',Validators.required),
    email: new FormControl('Hritesh_2003@yahoo.com',Validators.required),
    user_id: new FormControl('50'), 
    ad_status:new FormControl(''),
    tags:new FormControl(''),
    negotiable:new FormControl('1'),
    contact_name:new FormControl('John'),
    phone:new FormControl('+6581884948'),
    address:new FormControl(''),
    verified_email:new FormControl('1'),
    verified_phone:new FormControl('1'),
    approval_status:new FormControl(''),
    video_link:new FormControl(''),
    brand_ID:new FormControl(''),
    industry_ID:new FormControl('3'),
    industry_type:new FormControl(''),
   });
   
  }
  ngOnInit() {
        this.addlisting = this.formbuilder.group({
        post_type: new FormControl('',Validators.required),
        category_id: new FormControl('',Validators.required),
        post_type_id: new FormControl('',Validators.required),
        title: new FormControl('',Validators.required),
        description: new FormControl('',Validators.required),
        price: new FormControl('',Validators.required),
        country_code: new FormControl('',Validators.required),
        city_id: new FormControl('',Validators.required),
        email: new FormControl('Hritesh_2003@yahoo.com',Validators.required),
        user_id: new FormControl('50'), 
        ad_status:new FormControl(''),
        tags:new FormControl(''),
        negotiable:new FormControl('1'),
        contact_name:new FormControl('John'),
        phone:new FormControl('+6581884948'),
        address:new FormControl(''),
        verified_email:new FormControl('1'),
        verified_phone:new FormControl('1'),
        approval_status:new FormControl(''),
        video_link:new FormControl(''),
        brand_ID:new FormControl(''),
        industry_ID:new FormControl('3'),
        industry_type:new FormControl(''),
       });
    }
   //JSONForm = JSON.stringify(this.addlisting.value);
  
   onSubmit(){
    let formData = new FormData();
    formData.append('addlisting',this.addlisting.value)
    this.createListing(formData);
    console.log(this.addlisting.value);
  }
  createListing(FormInput){
    this.createlistings.create(FormInput)
      .subscribe(
        response => {
          console.log(response);
          //addlisting['id'] = response.id;
        //this.addlisting.splice(0,0, addlisting);
       },
      (Error: AppError) => {
      if (Error instanceof BadInput) {
          this.addlisting.setErrors(Error.originalError)
          }
          else throw Error;
       });
       }
       
    }
  
  