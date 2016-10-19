import { Component } from "@angular/core";

@Component({
    template: require('./todos.component.html'),
    styles: [
        require('./todos.component.scss')
    ],
})
export class ToDosComponent {
    constructor () {}
}