import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  logo!:String
  constructor(){
   this.logo = "/Frontend/src/assets/Bookorylogo.png"
  }

}
