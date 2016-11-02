

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


import { ToDo } from "../models/ToDo"

@Injectable()
export class TodoApiService extends BaseApiService {

    constructor (protected http: Http , protected store: Store) {
        super(http, store);
		this.controllerName = 'Todo';
    }


        
    getToDos(filter: string) : Observable<ToDo[]>	{
		
        var parameters = [];
if(filter){
parameters.push({name: 'filter', value: filter});
}
var paramsToSend = parameters.map(p => p.name + '=' + p.value).join('&');
        return this.makeRequest(this.buildUrl('getToDos'), paramsToSend, 'get')
				.map(data => data.map(i => new ToDo(i))) as Observable<ToDo[]>;
		
		
		
		
    };
        
    updateToDo(toDo: ToDo) : Observable<ToDo>	{
		
		
        return this.makeRequest(this.buildUrl('updateToDo'), toDo,'post')
				.map(data => new ToDo(data)) as Observable<ToDo>;
		
		
		
    };
}