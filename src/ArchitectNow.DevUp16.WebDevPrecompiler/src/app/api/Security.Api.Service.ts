

/***********************************
*
* WARNING:  This file is generated. 
* PLEASE do not attempt to edit it
*
***********************************/

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BaseApiService } from "./Base.Api.Service";
import { Observable } from "rxjs/Observable";
import { Store } from "../store/Store";


import { LoginParameters } from "../models/LoginParameters"
import { LoginResult } from "../models/LoginResult"

@Injectable()
export class SecurityApiService extends BaseApiService {

    constructor (protected http: Http , protected store: Store) {
        super(http, store);
		this.controllerName = 'Security';
    }


        
    login(userName: string, password: string) : Observable<LoginResult>	{
		
		
        return this.makeRequest(this.buildUrl('login'), { 'userName': userName,'password': password },'post')
				.map(data => new LoginResult(data)) as Observable<LoginResult>;
		
		
		
    };
}