import { Component,  OnInit, ViewChild} from '@angular/core';
import { Users } from 'src/app/interfaces/Colaborador';
import Swal from 'sweetalert2';
import { ColaboradorService } from '../colaborador.service';
import { FormColaboradorComponent } from '../form-colaborador/form-colaborador.component';

@Component({
  selector: 'app-colaborador-list',
  templateUrl: './colaborador-list.component.html',
  styleUrls: ['./colaborador-list.component.css']
})
export class ColaboradorListComponent implements OnInit{

  users:Users[] = [];
  textFilterData:string = "";

  // colaboradorUpdate:Colaborador = {} as Colaborador ;

  @ViewChild(FormColaboradorComponent) addColaborador !: FormColaboradorComponent;

  // idColaborador: number = 0;

  constructor(private userService: ColaboradorService) { }


  ngOnInit(): void {
    this.getAllUsers();

;  }


  // Get all Colaboradores
  public getAllUsers(){
    this.userService.getAllUsers().subscribe(response => {
      // console.log(response);

      this.users = response;
    });
  }

  public formReset(reset:any){

    this.formReset(reset);
  }

  //Traer colaborador
  public getColaboradorById(user: Users){

    this.addColaborador.getColaboradorById(user);

  }

  public deleteByIdColaborador(id:number){

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
        this.userService.deleteById(id).subscribe(response => response);

        Swal.fire({
          title: 'Eliminado!',
          text:'El colaborador ha sido eliminado',
          icon:'success'
        }).then((result) =>{
          if (result.isConfirmed) {
            window.location.reload();
          }

        })
      }


    })

  }

  filterTable($event:any){

    const value = $event.target.value;

    let dataFilterByUser:any = this.users.filter(resp => resp.id_document.includes(value) || resp.name.includes(value)
    );

    console.log('dataFilterByUser ',dataFilterByUser);

    if (value == "") {
      dataFilterByUser = this.getAllUsers();
    }

    if (dataFilterByUser.length > 0 || value != "") {
      this.users = dataFilterByUser;
    } else{
      this.getAllUsers();
    }

    // console.log(dataFilterByUser);


  }

  filterTableBtnSearch(){


    let dataFilterByUser:any = this.users.filter(resp => resp.id_document.includes(this.textFilterData) || resp.name.includes(this.textFilterData)
    );

    console.log('dataFilterByUser ',dataFilterByUser);

    if (this.textFilterData == "") {
      dataFilterByUser = this.getAllUsers();
    }

    if (dataFilterByUser.length > 0 || this.textFilterData != "") {
      this.users = dataFilterByUser;
    } else{
      this.getAllUsers();
    }

    // console.log(dataFilterByUser);


  }



}
