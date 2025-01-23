import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public messageAlert(message: any, title:any, icon:SweetAlertIcon) {
    Swal.fire({
      title: `${title}`,
      text: `${message}`,
      icon: `${icon}`
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }

    })
  }
}
