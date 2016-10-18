import { Component, OnInit } from "@angular/core";
import { ValuesService } from "../../services/values.service";

@Component({
    template: require('./home.component.html'),
    styles: [require('./home.component.scss')],
})
export class HomeComponent implements OnInit {

    values: string[];
    constructor(private _valuesService: ValuesService) {}

    ngOnInit() {
        this._valuesService.getValues()
            .subscribe((values) => this.values = values);
    }
}