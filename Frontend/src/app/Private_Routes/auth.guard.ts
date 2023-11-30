import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core"
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    isAuth!: boolean

    constructor(
        private router: Router, private authService: AuthService, private _snackBar: MatSnackBar
    ) {

        this.authService.getIsAuth().subscribe((data) => this.isAuth = data)
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.isAuth) {
            return true
        }
        else {
            this.openSnackBar("Login to your Account", "close")
            this.router.navigate(['/login'])
            return false
        }



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