import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class GetcategoriesService {

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

  constructor(private http:Http) {
  http.get('https://indusell.com/cate?slug=electrical')
  .subscribe(response =>{
    console.log(response.json())
  });
}


getListings(){
  return this.data;
}
getCategories(){
  return this.data;
}
}



