
/***********************************
*
* WARNING:  This file is generated. 
* PLEASE do not attempt to edit it
*
***********************************/
 
import { BaseModel } from "./_BaseModel";
import { User } from "./User"


export class LoginResult extends BaseModel {

	constructor(kwArgs?) {
		super(kwArgs);
	}

	
	
	public currentUser: User;
	
	
	public message: string;
	
	
	public isAuthenticated: boolean;
	

}


