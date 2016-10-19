import { Component, ViewEncapsulation } from "@angular/core";
import { Store } from "./store/Store";

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(protected store: Store) {

    }
}