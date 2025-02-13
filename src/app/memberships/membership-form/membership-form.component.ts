import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembershipService } from '../membership.service';
import { CommonModule, UpperCasePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Membership } from 'src/app/interfaces/Membership';

@Component({
  selector: 'app-membership-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './membership-form.component.html',
  styleUrl: './membership-form.component.css'
})
export class MembershipFormComponent {

    formMembership: FormGroup;

    constructor(private fb: FormBuilder, private membership_service: MembershipService) {
      this.formMembership = this.fb.group({});
     }

    ngOnInit(): void {
      this.fromMembershipCreate();
    }

    public fromMembershipCreate(){
      this.formMembership = this.fb.group({
        id   : [''],
        type_membership : ['', Validators.required],
        price : ['', Validators.required],
        state: [true, Validators.required],
        code_plan:['', Validators.required]
      })
    }

    public createMembership(){

      this.formMembership.value.state == true ? this.formMembership.value.state = 1 : this.formMembership.value.state = 0

      if(this.formMembership.valid){



        this.membership_service.createMembership(this.formMembership.value as Membership).subscribe(() => {

          Swal.fire({
            text  : 'Plan registrado satisfactoriamente',
            icon  : 'success',
            showConfirmButton: false,
            timer : 2000

          }).then((result) =>{
            window.location.reload();
          });

        });
      }else{
        Swal.fire({
          text  : 'Los campos son obligatorios',
          icon  : 'warning',
          showConfirmButton: false,
          timer : 2000

        })
      }

    }

    public getMembershipById(membership:Membership){
      // console.log(categoria.category)

      console.log(membership);


        this.formMembership.patchValue({
          id   : membership.id,
          type_membership : membership.type_membership,
          price: membership.price,
          state: membership.state,
          code_plan: membership.code_plan
        });

    }

    public updateMembership(){

      // console.log('this.formMembership ',this.formMembership.value);
      this.formMembership.value.state == true ? this.formMembership.value.state = 1 : this.formMembership.value.state = 0

      if(this.formMembership.valid){

        this.membership_service.updateMembership(this.formMembership.value).subscribe((response) => {

          response = JSON.parse(JSON.stringify(response));

          Swal.fire({
            text  : 'Plan modificado satisfactoriamente',
            icon  : 'success',
            showConfirmButton: false,
            timer : 2000

          }).then((result) =>{
            window.location.reload();
          });
        })
      }

    }

}
