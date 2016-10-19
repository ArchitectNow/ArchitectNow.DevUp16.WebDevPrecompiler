import { Injectable } from "@angular/core";
import { User } from "../models/User";


@Injectable()
export class Store {
    constructor() {

    }

    currentUser: User;
}