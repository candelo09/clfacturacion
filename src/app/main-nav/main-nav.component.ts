import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  userLoginOn:boolean=false;
  constructor(private authService: LoginService, private router:Router) { }

  ngOnInit(): void {
    this.authService.userLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          // console.log('userLoginOn ', userLoginOn);

          this.userLoginOn=userLoginOn;
        }
      }
    )
    this.userLoginOn = false;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
