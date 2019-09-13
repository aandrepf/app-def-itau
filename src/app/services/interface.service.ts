import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
headers: new HttpHeaders({
    'Content-Type': 'application/json'
})};

@Injectable()
export class InterfaceService {
    constructor(private http: HttpClient) {}

    public getUserInfo(cpf): Promise<any> {
      const url = "http://localhost:3000/schema";
      return this.http.get(url).toPromise()
      .then((res: any[]) => {
          return res.filter(doc => doc.documento === cpf);
      })
      .catch((error) => {
          console.log('Erro', error);
      });
    }
}
