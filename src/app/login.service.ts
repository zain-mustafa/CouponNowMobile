import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {

    private serverUrl = "http://13.59.105.105:3000";

    public customerInfo: any = {
        email: '',
        firstname: '',
        lastname: '',
        dateOfBirth: '',
        gender: '',
        occupation: '',
        couponRadius: ''
      };

     headers = this.createRequestHeader();

     constructor(private http: HttpClient) { }


    loginCustomer( email: String, password: String ): Observable<any> {
        console.log("Login Service Reached");
        console.log(email);
        console.log(password);

        return this.http.post(this.serverUrl + '/customer/login', { email: email, password: password }, { headers: this.headers })
          .pipe(map((response: Response) => {
              console.log("Inside Post Request");
                this.setCustomerInfo(response);
                return response;
          }));
      }

      onCreateAccount( type: String, firstname: String, lastname: String, email: String, password: String): Observable<any> {
        // API call when the customer signs up
        return this.http.post(this.serverUrl + '/customer/signup', { type: type, firstname: firstname, lastname: lastname, email: email, password: password })
          .pipe(
            map(response => {
                      // displays the response recieved on the browser console.
            console.log(response);
            return response;
            })
            );
      }

      onProfileSetup(email: String, birthMonth: Number, birthDay: Number, birthYear: Number, gender: String, occupation: String): Observable<any> {
        return this.http.post(this.serverUrl + '/customer/savecustomersetupinfo', { email: email, birthMonth: birthMonth, birthDay: birthDay, birthYear: birthYear, gender: gender, occupation: occupation })
        .pipe(map(response => {
          console.log(response);
          return response;
        }));
      }

      setCustomerInfo(response: Response) {
          console.log("Setting customer Info");
        this.customerInfo.email = response['email'];
        this.customerInfo.firstname = response['firstname'];
        this.customerInfo.lastname = response['lastname'];
        this.customerInfo.dateOfBirth = response['dateOfBirth'];
        this.customerInfo.gender = response['gender'];
        this.customerInfo.occupation = response['occupation'];
        this.customerInfo.couponRadius = response['couponRadius'];
        console.log(this.customerInfo);
        console.log("Done Setting customer Info");
      }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
         });

        return headers;
    }

}