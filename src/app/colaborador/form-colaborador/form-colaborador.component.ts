import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewColaborador, Users } from 'src/app/interfaces/Colaborador';
import Swal from 'sweetalert2';
import { ColaboradorService } from '../colaborador.service';

@Component({
  selector: 'app-form-colaborador',
  templateUrl: './form-colaborador.component.html',
  styleUrls: ['./form-colaborador.component.css']
})
export class FormColaboradorComponent implements OnInit {

  formColaborador: FormGroup;

  imagenUser: string = "../../../assets/img/iconoLoginDefault.png";
  rutaImagen = "";

  colaborador: Users = {} as Users;

  // @Input()
  // colaboradorUpdate: Colaborador = {} as Colaborador;

  document: Users[] = [];

  constructor(private fb: UntypedFormBuilder, private colaboradorService: ColaboradorService) {
    this.formColaborador = this.fb.group({});

  }



  ngOnInit(): void {
    this.formcreateColaborador();

  }

  formcreateColaborador() {
    this.formColaborador = this.fb.group({
      id: [''],
      id_document: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      image: ['',],
      state: [1],
      // cargo: ['', Validators.required],
      last_login: [''],
      create_at: [''],
      role: ['', Validators.required],
      id_membership: [''],
      telephone: [''],
      address: [''],
      email: [''],
      update_at: ['']
    })




  }

  // Función que limpia el formulario.
  public formReset() {
    this.formColaborador.reset({
      id: '',
      id_document: '',
      name: '',
      username: '',
      password: '',
      image: '',
      state: '',
      // cargo: ['', Validators.required],
      last_login: '',
      create_at: '',
      role: '',
      id_membership: '',
      telephone: '',
      address: '',
      email: '',
      update_at: ''
    });
  }



  // Función que crea el colaborador
  public createColaborador() {

    this.formColaborador.value.state = this.formColaborador.value.state ? 1 : 0;

    this.formColaborador.value.create_at = new Date();
    // console.log(this.formColaborador.value.state);

    if (this.formColaborador?.valid) {




      // Registra en bd el nuevo colaborador
      this.formColaborador.value.image = this.imagenUser;
      this.colaboradorService.addUser(this.formColaborador.value as Users).subscribe(response => {


        if (this.colaborador == null) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: '¡Ya existe un colaborador con el mismo documento!',
            showConfirmButton: false,
            timer: 3000,
          })

        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '¡Usuario registrado satisfactoriamente!',
            showConfirmButton: false,
            timer: 3000,
          })

          window.location.reload();
        }

      });

    } else {

      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El documento, nombre, apellido, usuario, contraseña, email y perfil son obligatorios',
        showConfirmButton: false,
        timer: 3000
      })
    }

  }

  //Carga la vista previa de la imagen del usuario
  public updateImagenUser(event: any) {

    const file_images = event.target.files[0];

    console.log("file_images ",file_images);


    this.colaboradorService.uploadImages(file_images).subscribe(resp_img => {
      this.imagenUser = resp_img.toString().replace("D:\\Proyecto facturacion clsystem\\frontend\\clfacturacion\\src\\", "");
    });


  }


  // Función que obtiene el colaborador de la tabla
  getColaboradorById(user: Users) {

    console.log(user.create_at);


    // var create_at_temp = user.create_at.toString().split('T');

    // console.log('create_at_temp ',create_at_temp[0]);

    this.imagenUser = user.image;



    this.formColaborador.patchValue({
      id: user.id,
      id_document: user.id_document,
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email,
      role: user.role,
      telephone: user.telephone,
      address: user.address,
      create_at: user.create_at,
      last_login: user.last_login
    });


  }

  // Función que actualiza el colaborador
  updateColaborador() {
    this.formColaborador.value.state = this.formColaborador.value.state ? 1 : 0;

    this.formColaborador.value.update_at = new Date();

    if (this.formColaborador?.valid) {


      // Modifica en bd el colaborador
      this.formColaborador.value.image = this.imagenUser;
      this.colaboradorService.updateColaborador(this.formColaborador.value as Users).subscribe(response => {

        // this.colaborador = response;

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Usuario modificado satisfactoriamente!',
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {

          window.location.reload();


        })



      });


    } else {

      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El documento, nombre, apellido, usuario, contraseña, email y perfil son obligatorios',
        showConfirmButton: false,
        timer: 3000
      })
    }
  }
}


