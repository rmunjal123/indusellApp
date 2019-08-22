import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute,RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

constructor(private authService: AuthenticationService,
            private router: Router, private route: ActivatedRoute){}

// checkstatus(credentials){
//     //this.authService.login.subscribe(state => {
//     //console.log(state);
//     console.log(this.authService.isAuthenticated());
//      if(this.authService.isAuthenticated()){
//        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
//         this.router.navigate([returnUrl || '/tabs/tab1']); 
//        }
      //  else
      //  {
      //   this.router.navigate(['/login']); 
    //}
//}
}
