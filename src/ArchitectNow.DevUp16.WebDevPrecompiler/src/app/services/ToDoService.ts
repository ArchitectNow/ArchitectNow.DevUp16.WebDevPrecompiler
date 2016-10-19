﻿import { Injectable } from "@angular/core";
import { TodoApiService } from "../api/Todo.Api.Service";
import { Observable } from "rxjs";
import { ToDo } from "../models/ToDo";

@Injectable()
export class ToDoService {
    constructor(private _todoApiService: TodoApiService) {

    }

    getTodos(filter: string = ""): Observable<ToDo[]> {
        return this._todoApiService.getToDos(filter);
    }
}