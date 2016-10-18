import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";
import { HomeComponent } from "./features/home/home.component";

@Component({
    selector: 'app',
    directives: [
        ROUTER_DIRECTIVES
    ],
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')],
    precompile: [
        HomeComponent,
    ]
})
export class AppComponent {

}