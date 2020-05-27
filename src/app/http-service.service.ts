import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // private apiUrl = '/CONTMALERT/';
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://fraudaiml1.herokuapp.com/';

    alertname1: string;

  private sourceheader = new BehaviorSubject({});
  headervar = this.sourceheader.asObservable();


  private userApiUrl = '/services/userapi/currentUser';

   changeheader(alertInfo: any) {
    this.sourceheader.next(alertInfo);
  }
  getLoggedInUser(): Observable<any> {
      const observable = this.http.get<any>(this.userApiUrl)
      .pipe(map(data => data.name));
      return observable;
    }

  getPosts(user: string): Observable<[any]> {
    const header = new HttpHeaders();
    header.append('Content-type', 'application/json');
    const param = new HttpParams().set('recipient', encodeURIComponent(user));
    const observable = this.http
      .get<any>(this.apiUrl + 'alertapi/', { params: param })
      .pipe(
        map(data => {
          return  _.sortBy(data.map(d => d.fields) , 'priority', 'time').reverse();
        })
      );
    return observable;

  }


getEvent(alertname: string): Observable < any > {
  const observable = this.http.get<Array<any>>(this.apiUrl + 'eventcall' + '?alertname=' + alertname)
    .pipe(
      map((data) => {
        const oHistoryData = data.map(d => d.fields);
        console.log('history' + JSON.stringify(oHistoryData));
        return oHistoryData;
      })
    );
  return observable;
}

getRecipients(): Observable < any > {
  const observable = this.http.get<Array<any>>(this.apiUrl + 'alertrecipient/')
    .pipe(
      map((data) => {
        return data.map(d => d.fields);
      })
    );

  return observable;
}

}

