import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ToDoService } from "../../services/ToDoService";
import { Store } from "../../store/Store";
import { ToDo } from "../../models/ToDo";


@Component({
    selector: 'todo-item',
    template: require('./todoitem.component.html'),
    styles: [
        require('./todoitem.component.scss')
    ],
})
export class ToDoItemComponent {
    @Input()
    item: ToDo;

    @Output()
    toggle = new EventEmitter();

    constructor() {
    }

    toggleTodo() {
        this.toggle.emit(!this.item.isClosed);
    }
}