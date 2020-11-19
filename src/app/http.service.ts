import { TResponse } from './../types/TResponse';
import { TRequest } from './../types/TRequest';
import { TFormData } from '../types/TFormData';
import { TChangelog } from '../types/TChangelog';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpService {

    urlJSON = 'assets/app-changelog/app-changelog.json';
    urlServer = 'https://dev.planyway.com/api/b/feedback/link';

    appType: string = "Site";
    appVersion: string = "1.0.0.0";
    headers = new HttpHeaders().set('x-ms-blob-type', 'BlockBlob');

    constructor(private http: HttpClient) { }

    getChangelog(): Observable<TChangelog[]> {
        return this.http.get<TChangelog[]>(this.urlJSON);
    }

    sendMessage(data: TFormData) {

        return this.http.get<TResponse>(this.urlServer).pipe(map(response => {
            return response.data;
        })).subscribe(responseURL => {
            this.putUserDataToURL(responseURL, data).subscribe(
                response => { console.log(response.status) },
                err => console.log("Failed to put data " + err));
        });
    }

    // getData(): Observable<TResponse> {
    //     return this.http.get<TResponse>(this.urlServer);
    // }

    putUserDataToURL(url: string, data: TFormData) {
        let bodyRequest: TRequest = {
            memberName: data.userName,
            memberEmail: data.userEmail,
            appType: this.appType,
            appVersion: this.appVersion,
            message: data.userMessage
        }
        return this.http.put(url, bodyRequest, { headers: this.headers, observe: "response" });
    }

    getResponse(): Observable<string> {
        return this.http.get<TResponse>(this.urlServer).pipe(map(response => {
            return response.data;
        }),
            catchError(err => {
                console.log("Failed to get " + this.urlServer + ": " + err);
                return throwError(err);
            }))
    };
}