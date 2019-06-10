import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  category;
  constructor(private getcategoriesService:GetcategoriesService) { }

  ngOnInit() {
    this.Id = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
