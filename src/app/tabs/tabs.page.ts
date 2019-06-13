import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

constructor(private authService: AuthenticationService,
            private router: Router){}

checkstatus(){
    this.authService.authenticationState.subscribe(state => {
    console.log(state);
     if (state) {
     this.router.navigate(['/tabs/tab4']);
     } else {
    this.router.navigate(['login']);
     }
    });
    }
  }
