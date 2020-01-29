import { Component, OnInit } from '@angular/core';
import { IonicRatingModule } from 'ionic4-rating'
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CreatereviewService } from 'src/app/services/createreview.service';
import { AppError } from 'src/app/services/common/app-error';
import { BadInput } from 'src/app/services/common/bad-input';
import { AuthenticationService} from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-createreview',
  templateUrl: './createreview.page.html',
  styleUrls: ['./createreview.page.scss'],
})
export class CreatereviewPage implements OnInit {
  private addreview: FormGroup
  userID: any;

  constructor(private formbuilder: FormBuilder, private createreview: CreatereviewService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.addreview = new FormGroup({
      over: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl('', Validators.required),
      userID: new FormControl(this.auth.currentUserId)
    });
  }
  onModelChange(event){
    console.log('Your rate:', event);
  }

  onSubmit() {
    this.createReview(this.addreview.value);
    console.log(this.addreview.value);
  }
  createReview(input: FormGroup) {
    this.createreview.create(input)
      .subscribe(
        response => {
          console.log(response);
          //addlisting['id'] = response.id;
          //this.addlisting.splice(0,0, addlisting);
        },
        (Error: AppError) => {
          if (Error instanceof BadInput) {
            this.addreview.setErrors(Error.originalError)
          }
          else throw Error;
        });
  }

}
