

import { RequestOptions, Http, Headers, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
export class BaseDataService {

    defaultOptions: RequestOptions = null;
    rootUrl: string = '/api';
    controllerName: string;

    constructor (protected http: Http) {
        let headers = new Headers({'Content-Type': 'application/json'});
        this.defaultOptions = new RequestOptions({headers: headers});
    }

    //comment ww1
    protected buildUrl (action: string, params?: URLSearchParams): string {
        if (!this.controllerName) {
            throw new Error("ControllerName not specified");
        }
        let url = `${this.rootUrl}/${this.controllerName}/${action}`;
        if (params) {
            url += '?' + params.toString();
        }
        return url;
    }

    protected makeBody<K> (content: K = null): any {
        return {
            content: content
        };
    }

    protected makeRequest (url: string, body: any, postOptions = this.defaultOptions): any {
        if (typeof body !== 'string') {
            body = JSON.stringify(body);
        }

        return Observable.create((obs) => {
            this.http.post(url, body, postOptions).subscribe((res) => {
                if (res.status == 204) {
                    (res as any).success = true;
                    obs.next(res);
                } else {
                    let body = res.json() as any;
                    body.success ? obs.next(body) : obs.error(body);
                }
                obs.complete();
            });
        });
    }
}