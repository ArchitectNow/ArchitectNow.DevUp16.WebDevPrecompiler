import { RequestOptions, Http, Headers, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { Store } from "../store/Store";

export class BaseApiService {

    defaultOptions: RequestOptions = null;
    rootUrl: string = '/api/v1';
    controllerName: string;

    constructor(protected http: Http, protected store: Store) {

    }

    //comment ww1
    protected buildUrl(action: string, params?: URLSearchParams): string {
        if (!this.controllerName) {
            throw new Error("ControllerName not specified");
        }
        let url = `${this.rootUrl}/${this.controllerName}/${action}`;
        if (params) {
            url += '?' + params.toString();
        }
        return url;
    }

    protected makeBody<K>(content: K = null): any {
        return {
            content: content
        };
    }

    private BuildHeaders(contentType: string): Headers {

        if (this.store && this.store.currentUser) {
            var _token = this.store.currentUser.id;  //Note we are just using the user ID as a token

            if (_token && _token.length > 0) {
                let headers = new Headers({ 'Content-Type': contentType, 'securityToken': _token });
                return headers;
            }
        }

        let headers = new Headers({ 'Content-Type': contentType });

        return headers;
    }

    private dateReviver(key, value) {
        var a;
        if (typeof value === 'string') {
            a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
            if (a) {
                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                    +a[5], +a[6]));
            }
        }
        return value;
    }


    protected makeRequest(url: string, body: any, httpAction: string = "post", postOptions = null): any {

        if (httpAction === "post") {

            if (postOptions == null) {
                let headers = this.BuildHeaders('application/json');
                postOptions = new RequestOptions({ headers: headers });
            }

            //if (typeof body !== 'string') {
            //    body = JSON.stringify(body);
            //}

            return Observable.create((obs) => {

                this.http.post(url, body, postOptions).subscribe((res) => {
                    obs.next(JSON.parse(res.text(), this.dateReviver));
                    obs.complete();
                }, (err) => {
                    if (err.statusText == 'Unauthorized' || err.statusText == "Forbidden") {
                        //possibly redirect to a login
                    }

                    if (err._body) {
                        var _errObj = JSON.parse(err._body);

                        if (_errObj.message) {


                            obs.error(_errObj.message);
                            return;
                        }
                    }

                    obs.error(err.statusText);
                });
            });
        }
        else if (httpAction === "put") {

            if (postOptions == null) {
                let headers = this.BuildHeaders('application/json');
                postOptions = new RequestOptions({ headers: headers });
            }

            if (typeof body !== 'string') {
                body = JSON.stringify(body);
            }

            return Observable.create((obs) => {

                this.http.put(url, body, postOptions).subscribe((res) => {
                    obs.next(JSON.parse(res.text(), this.dateReviver));
                    obs.complete();
                }, (err) => {
                    if (err.statusText == 'Unauthorized' || err.statusText == "Forbidden") {
                        //possibly redirect to a login
                    }

                    if (err._body) {
                        var _errObj = JSON.parse(err._body);

                        if (_errObj.message) {
                            obs.error(_errObj.message);
                            return;
                        }
                    }

                    obs.error(err.statusText);
                });
            });
        }
        else if (httpAction === "delete") {

            if (postOptions == null) {
                let headers = this.BuildHeaders('application/json');
                postOptions = new RequestOptions({ headers: headers });
            }

            if (typeof body !== 'string') {
                body = JSON.stringify(body);
            }

            if (body.length > 0) {
                url = url + '?' + body.toString();
            }

            return Observable.create((obs) => {

                this.http.delete(url, postOptions).subscribe((res) => {
                    obs.next(JSON.parse(res.text(), this.dateReviver));
                    obs.complete();
                }, (err) => {
                    if (err.statusText == 'Unauthorized' || err.statusText == "Forbidden") {
                        //possibly redirect to a login
                    }

                    if (err._body) {
                        var _errObj = JSON.parse(err._body);

                        if (_errObj.message) {
                            obs.error(_errObj.message);
                            return;
                        }
                    }

                    obs.error(err.statusText);
                });
            });
        }
        else if (httpAction === "get") {

            if (postOptions == null) {
                let headers = this.BuildHeaders('application/x-www-form-urlencoded');
                postOptions = new RequestOptions({ headers: headers });
            }

            if (typeof body !== 'string') {
                body = JSON.stringify(body);
            }

            if (body) {
                url = url + '?' + body.toString();
            }

            return Observable.create((obs) => {
                postOptions.body = postOptions.body || "";
                this.http.get(url, postOptions).subscribe((res) => {
                    obs.next(JSON.parse(res.text(), this.dateReviver));
                    obs.complete();
                }, (err) => {
                    if (err.statusText == 'Unauthorized' || err.statusText == "Forbidden") {
                        //possibly redirect to a login
                    }

                    if (err._body) {
                        var _errObj = JSON.parse(err._body);

                        if (_errObj.message) {
                            obs.error(_errObj.message);
                            return;
                        }
                    }

                    obs.error(err.statusText);
                });
            });
        }
    }
}