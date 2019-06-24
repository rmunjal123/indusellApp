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

checkstatus(credentials){
    //this.authService.login.subscribe(state => {
    //console.log(state);
    console.log(this.authService.isAuthenticated());
     if(this.authService.isAuthenticated()){
        this.router.navigate(['/tabs/tab4']); 
       }
       else
       {
        this.router.navigate(['/login']); 
    }
}
}