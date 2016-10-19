import { Observable } from "rxjs";

export interface ISidebar {
    isOpened: boolean;
    open(): Observable<boolean>;
    close(): Observable<boolean>;
}