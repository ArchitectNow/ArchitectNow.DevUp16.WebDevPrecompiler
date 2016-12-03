import { Component, OnInit } from "@angular/core";
import { SecurityApiService } from "../../api/Security.Api.Service";
import { Store } from "../../store/Store";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
    selector: 'login',
    template: require('./login.component.html'),
    styles: [require('./login.component.scss')]
})
export class LoginComponent implements OnInit {

    userName: string = "";
    password: string = "";
    isLoggingIn: boolean;
    errMessage: string;

    constructor(private securityApiService: SecurityApiService, private router: Router, private store: Store) {

    }

    ngOnInit() {
        this.store.currentUser = null;  //Logout...essentially :)
    }

    login() {
        this.securityApiService.login(this.userName, this.password)
            .subscribe((result) => {
                if (result.isAuthenticated) {
                    this.store.currentUser = result.currentUser;
                    this.router.navigate(['/app/home']);
                }
                else {
                    this.errMessage = result.message;
                }
        },
        (err) => {
            this.errMessage = err.message;
        },
        () => {

        });
    }
}