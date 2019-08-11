import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetbrandsService } from 'src/app/services/getbrands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
})
export class BrandsPage implements OnInit {
  category: any;

  constructor(private getbrands:GetbrandsService,private router:Router) { }

  ngOnInit() {
    this.category = this.getbrands.getAll()
    .subscribe(response => { 
      this.category = response;
      console.log(this.category);
  });
  }
}
