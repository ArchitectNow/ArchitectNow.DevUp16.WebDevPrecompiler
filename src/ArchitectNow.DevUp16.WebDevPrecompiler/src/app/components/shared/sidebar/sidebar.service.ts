import { Observable, AsyncSubject } from "rxjs";
import { ISidebar } from "./sidebar.interface";

declare type State = 'open' | 'close';

export class SidebarService {
    sidebar: ISidebar;
    private pendingState: State;
    private state$ = new AsyncSubject<boolean>();

    setSidebar (sidebar: ISidebar) {
        this.sidebar = sidebar;
        switch (this.pendingState) {
            case 'open':
                this.sidebar.open().subscribe(this.state$);
                break;
            case 'close':
                this.sidebar.close().subscribe(this.state$);
                break;
        }
        this.pendingState = null;
    }

    open (): Observable<boolean> {
        if (this.sidebar) {
            return this.sidebar.open();
        }
        this.pendingState = 'open';
        return this.state$;
    }

    close (): Observable<boolean> {
        if (this.sidebar) {
            return this.sidebar.close();
        }
        this.pendingState = 'close';
        return this.state$;
    }

    toggle (): Observable<boolean> {
        return this.isOpened ? this.sidebar.close() : this.sidebar.open();
    }

    get isOpened () { return this.sidebar && this.sidebar.isOpened; }
}