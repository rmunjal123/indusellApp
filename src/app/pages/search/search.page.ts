import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { AppError } from 'src/app/services/common/app-error';
import { BadInput } from 'src/app/services/common/bad-input';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchQuery: any;

  constructor(private searchservice: SearchService) { }

  ngOnInit() {
  }
onInput(){
  console.log(this.searchQuery);
  this.searchservice.getAll(this.searchQuery)
      .subscribe(
        response => {
          console.log(response);
          //addlisting['id'] = response.id;
          //this.addlisting.splice(0,0, addlisting);
        },
        (Error: AppError) => {
          if (Error instanceof BadInput) {
            console.log(Error)
          }
          else throw Error;
        });
  }
}
