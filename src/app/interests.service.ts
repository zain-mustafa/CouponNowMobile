import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Observable } from 'tns-core-modules/ui/page/page';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

    private serverUrl = "http://19b87932.ngrok.io";

    headers = this.createRequestHeader();

  constructor( private http: HttpClient, public customerInfo: LoginService ) { }

  onAddInterestinterest(interest) {
    console.log(interest);
    return this.http.post(this.serverUrl + '/mobile/interests/add', { email: this.customerInfo.customerInfo.email, interests: interest}, { headers: this.headers} )
    .pipe(map(response => {
        this.customerInfo.customerInfo.interests.push(interest);
        return response;
    }))
  }

  onRemoveInterest(interest: String, email: String) {
      console.log(interest);
      return this.http.delete(this.serverUrl + '/mobile/interests/delete/' + email + '/' + interest, { headers: this.headers})
      .pipe(map((response) => {
        return response;
      }));

  }


  private createRequestHeader() {
    // set headers here e.g.
    let headers = new HttpHeaders({
        "Content-Type": "application/json",
     });

    return headers;
}
}
