import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  public passError: string = '';
  public isPassError: boolean = false;
  public isPassMatch: boolean = false;
  public passMatch: string = '';
  password:string=""
  confirm_password:string=""
  // role:string="Reader"
  email:string=""
  username:string=""

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) {
    
 }

  validatePassword() {
    const hasUppercase = /[A-Z]/.test(this.password);
    const hasDigit = /\d/.test(this.password);
    const hasSpecialChar = /[!@#%^&*()_+{}:"?/<>,.]/.test(
      this.password
    );

    if (this.password !== '') {
      if (this.password == '') {
        this.passError = 'Password is required.';
        this.isPassError = true;
      } else if (!hasUppercase) {
        this.passError = 'Should Contain one UpperCase';
        this.isPassError = true;
      } else if (!hasDigit) {
        this.passError = 'Should Contain one Digit';
        this.isPassError = true;
      } else if (!hasSpecialChar) {
        this.passError = 'Should Conatin one Special Character';
        this.isPassError = true;
      } else if (this.password.length < 6) {
        this.passError = 'Password must be at least 6 characters long.';
        this.isPassError = true;
      } else {
        this.passError = '';
        this.isPassError = false;
      }
    } else {
      this.isPassError = false;
    }
  }

  confirmPasswordChecker() {
    if (this.confirm_password !== '') {
      if (this.password !== this.confirm_password) {
        this.passMatch = 'Password must match';
        this.isPassMatch = true;
      } else {
        this.isPassMatch = false;
        this.passMatch = '';
      }
    } else {
      this.isPassMatch = false;
      this.passMatch = '';
    }
  }

  onSubmit(form:NgForm) {
    let registerData={
       username:this.username,
       email:this.email,
       password:this.password,
       role:"Reader"
    }
    this.validatePassword();
    this.authService.register(registerData).subscribe((data)=>{
      console.log(data)
      let message = data.msg.toString()
      this.openSnackBar(message, "close")
      this.router.navigate(["/login"])

    })
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
