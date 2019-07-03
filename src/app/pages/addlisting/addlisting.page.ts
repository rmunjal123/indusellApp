import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.page.html',
  styleUrls: ['./addlisting.page.scss'],
})
export class AddlistingPage implements OnInit {
  private todo : FormGroup;
  constructor(private formBuilder: FormBuilder) {

    this.todo = this.formBuilder.group({
     title: ['', Validators.required],
     description: [''],
   });
   }
   logForm(){
    console.log(this.todo.value)
  }

  ngOnInit() {

    }
  }
