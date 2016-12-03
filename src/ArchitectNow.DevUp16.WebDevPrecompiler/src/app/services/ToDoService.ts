import { Injectable } from "@angular/core";
import { TodoApiService } from "../api/Todo.Api.Service";
import { Observable } from "rxjs";
import { ToDo } from "../models/ToDo";

@Injectable()
export class ToDoService {
    constructor(private todoApiService: TodoApiService) {

    }

    getTodos(filter: string = ""): Observable<ToDo[]> {
        return this.todoApiService.getToDos(filter);
    }

    updateTodo(todo: ToDo): Observable<ToDo> {
        return this.todoApiService.updateToDo(todo);
    }
}