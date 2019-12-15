import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router'
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

//import { PasswordValidator } from '../../validators/password.validator';

//import emailMask from 'text-mask-addons/dist/emailMask';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  //validations_form: FormGroup;
  //matching_passwords_group: FormGroup;

  loginform = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ]),
    password: new FormControl('', [
      Validators.minLength(5),
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9!@#$%^&*()]+$')
    ])
    //matching_passwords: this.matching_passwords_group,
    //terms: new FormControl(true, Validators.pattern('true'))
  });


  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute) { }
  ionViewWillLoad() {
    /*this.matching_passwords_group = new FormGroup({
      password: new FormControl('',[
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        Validators.email
      ]),
      //matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))
    });*/
  }

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' },
      { type: 'shouldBeUnique', message: 'Email already exists.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  onSubmit(input: FormGroup) {
    //this.navCtrl.navigateForward('src/app/tab3/tab3.page');
    //console.log(values);
    this.authService.login(input)
      .subscribe(result => {
        console.log(result);
        if (this.authService.isAuthenticated()) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
          this.router.navigate([returnUrl || '/tabs/tab1']);
        }
        else
          this.router.navigate(['/login']);
      });

  }
}
