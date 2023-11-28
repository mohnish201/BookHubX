import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  public email: String = ""
  public password: String = ""
  public userData!: any
  public LoginMessage: String = ""
  public isAuth!: boolean

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {
     this.authService.getIsAuth().subscribe((data) => this.isAuth = data)
  }

  login() {

    const loginData = {
      email: this.email,
      password: this.password
    }

    this.authService.login(loginData).subscribe((data) => {
      console.log(data);

      this.authService.updateUserData(data)
      
      this.authService.getUserData().subscribe((data) => {
        this.userData = data
      })
      
      if (this.userData && this.userData.msg) {
        const message = this.userData.msg.toString();
        this.openSnackBar(message, 'Close');
      }
      
      if (this.userData.msg == "Login Successfull") {
        this.authService.changeIsAuth(true);
        this.router.navigate(['/'])
      }
      localStorage.setItem("isAuth", JSON.stringify(this.isAuth) )

    })
    // const loginData = {
    //   email: this.email,
    //   password: this.password
    // }
    // this.authService.login(loginData).subscribe((data) => {
    //   // console.log(data);
    //   // this.userData=data
    //   console.log(data)

    //   this.authService.setUserData(data)
    //   this.authService.getUserData().subscribe((data) => this.userData = data)
    //   console.log(this.userData.username)

    //   if (this.userData && this.userData.msg) {
    //     const message = this.userData.msg.toString();
    //     this.openSnackBar(message, 'Close');
    //   }

    //   if(this.userData.msg=="Login Successfull"){
    //     this.router.navigate(['/'])
    //   }

    //   console.log(this.isAuth)


    // })
  }


  openSnackBar(message: string, action: string) {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: 3000, // Adjust the duration as needed
    });

    snackBarRef.onAction().subscribe(() => {
      // Handle action here if needed
      snackBarRef.dismiss(); // Dismiss the snack bar on action (if desired)
    });
  }




}
