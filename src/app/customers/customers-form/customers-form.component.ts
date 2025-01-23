import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {

  formGroupCustomer:FormGroup;

  constructor(private fb:FormBuilder, private customerService:CustomersService) {
    this.formGroupCustomer = this.fb.group({});
   }

  ngOnInit(): void {
  }

  formCustomer(){

  }

}
