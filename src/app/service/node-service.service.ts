import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsyncSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  port: String = '';
  ip: String = ''

  constructor(private http: HttpClient) {
    this.initPort();
  }

  initPort(){
    this.port = '3001';
    this.ip = 'http://localhost';
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'body',
      responseType: 'json',
    };
  }

  httpGet(path: String){
    let result = new AsyncSubject();
    this.http.get(this.ip + ':' + this.port + path, { 'headers': this.getHeaders().headers }).subscribe((response: any) => {
      if (response.status == 'nok') {
        alert("RICHIESTA NON ANDATA A BUON FINE");
      }
      result.next(response);
      result.complete();
    })
    return result;
  }

  httpPost(){

  }
}
