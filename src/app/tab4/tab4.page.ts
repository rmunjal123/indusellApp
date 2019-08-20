import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  UserId: Number;

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }
  myProfilePage(){
    this.UserId = this.authService.currentUserId;
    this.router.navigate(['/profile/'+ this.UserId]);
  }
  logout() {
     this.authService.logout();
     this.router.navigate(['/tabs/tab1']);

   }
}
