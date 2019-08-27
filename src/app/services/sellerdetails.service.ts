import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellerdetailsService {

  id: any;
  seller: any;
  seller_name: string= ''
  seller_email: string= ''
  // let url = 'https://indusell.com/api/post-detail/' + id;
  
  constructor(private http:HttpClient) {}
    getAll(){
      console.log('https://indusell.com/api/sellerprofile/' + this.id);
      return this.http.get('https://indusell.com/api/sellerprofile/' + this.id).pipe
        (map(response =>  {this.seller = response['Seller'];
        console.log(this.seller);
        this.seller_name = this.seller["name"];
        this.seller_email= this.seller["email"];
    }));
    }
  }
  
