import { Component, OnInit } from "@angular/core";
import { ToDoService } from "../../services/ToDoService";
import { Store } from "../../store/Store";
import { ToDo } from "../../models/ToDo";


@Component({
    template: require('./todos.component.html'),
    styles: [
        require('./todos.component.scss')
    ],
})
export class ToDosComponent {

    data: ToDo[];
    filter: string = "";

    constructor(private todoService: ToDoService, private store: Store) {
    }

    ngOnInit() {
        this.todoService.getTodos(this.filter).subscribe(
            (data) => {
                this.data = data;
            },
            (err) => {
                
            },
            () => {

            });
    }
}