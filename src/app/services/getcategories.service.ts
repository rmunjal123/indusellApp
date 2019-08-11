import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GetcategoriesService{
  cat: string;
  categories: any[];
  currentlisting: any;
  currentcategory: any;
  private data = [
    {
      category: 'Electrical',
      imageURL: 'assets/pictures',
      listings:[
        {id:0, name: 'TestProduct11', price: '8'},
        {id:1, name: 'TestProduct112', price: '18'},
        {id:2, name: 'TestProduct13', price: '28'},
      ]
    },
    {
      category: 'Mechanical',
      imageURL: 'assets/pictures',
      listings:[
        {id:3, name: 'TestProduct21', price: '8'},
        {id:4, name: 'TestProduct22', price: '18'},
        {id:5, name: 'TestProduct23', price: '28'},
      ]
    },
    {
      category: 'IT',
      imageURL: 'assets/pictures',
      listings:[
        {id:6, name: 'TestProduct131', price: '8'},
        {id:7, name: 'TestProduct132', price: '18'},
        {id:8, name: 'TestProduct33', price: '28'},
      ]
    }
  ]

  constructor(private http:HttpClient) {}
    getAll(){
      console.log('https://www.indusell.com/api/postcategory/' + this.currentcategory);
      return this.http.get('https://www.indusell.com/api/postcategory/' + this.currentcategory).pipe
        (map(response => response));
    }
getListings(){
  return this.data;
}
// getCategories(){
//   return this.data;
// }
}
