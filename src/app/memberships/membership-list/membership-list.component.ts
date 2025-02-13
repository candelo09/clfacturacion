import { Component, ViewChild } from '@angular/core';
import { MembershipFormComponent } from "../membership-form/membership-form.component";
import { MembershipService } from '../membership.service';
import { UtilsService } from 'src/app/utils.service';
import { Membership } from 'src/app/interfaces/Membership';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-membership-list',
  standalone: true,
  imports: [MembershipFormComponent, CommonModule],
  templateUrl: './membership-list.component.html',
  styleUrl: './membership-list.component.css'
})
export class MembershipListComponent {


  memberships: Membership[] = [];

  typeMembership = [{
    code: 1,
    type: 'Mensual'
  },
  {
    code: 2,
    type: 'Trimestral'
  },
  {
    code: 3,
    type: 'Anual'
  },
  {
    code: 4,
    type: 'Clase'
  },
  {
    code: 5,
    type: 'Clase Gratis'
  }];

  @ViewChild(MembershipFormComponent) addMembership !: MembershipFormComponent;

  constructor(private membershipService: MembershipService, private utilService: UtilsService) { }

  ngOnInit(): void {
    this.getAllMemberships();
  }

  //Get of the memberships
  public getAllMemberships() {
    this.membershipService.getMembership().subscribe(response => {
      this.memberships = response
    });
  }

  public getMembershipById(membership: Membership) {
    console.log(membership);

    this.addMembership.getMembershipById(membership);
  }

  public getTypeMembership() {

    this.typeMembership.push(

    )


  }

  public deleteMembership(id: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.membershipService.deleteByIdMembership(id).subscribe({
          next: resp => { this.utilService.messageAlert('El plan ha sido eliminado', 'En hora buena!', 'success') },

          error: e => {
            console.log(e.error);
            this.utilService.messageAlert(e.error, 'Lo sentimos! :(', 'warning')


          }
        });

      }


    })
  }

}
