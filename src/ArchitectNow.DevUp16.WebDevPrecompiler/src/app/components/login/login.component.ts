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

    constructor(private _securityApiService: SecurityApiService, private router: Router) {

    }

    ngOnInit() {

    }

    login() {
        this._securityApiService.login(this.userName, this.password)
            .subscribe((result) => {
           
        },
        (err) => {

        },
        () => {

        });
    }
}