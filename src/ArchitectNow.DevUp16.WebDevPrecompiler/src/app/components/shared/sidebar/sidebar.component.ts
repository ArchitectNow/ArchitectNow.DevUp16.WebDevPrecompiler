import { Component, HostBinding } from "@angular/core";
import { SidebarService } from "./sidebar.service";
import { ISidebar } from "./sidebar.interface";
import { Observable } from "rxjs";

@Component({
    selector: 'sidebar',
    template: require('./sidebar.component.html'),
    styles: [require('./sidebar.component.scss')],
})
export class SidebarComponent implements ISidebar {

    @HostBinding('class.opened')
    isOpened: boolean = true;

    constructor (sidebarService: SidebarService) {
        sidebarService.setSidebar(this);
    }

    open (): Observable<boolean> {
        return Observable.from([this.isOpened = true]);
    }

    close (): Observable<boolean> {
        return Observable.from([this.isOpened = false]);
    }

}