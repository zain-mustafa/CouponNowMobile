import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponsaveService {
    private serverUrl = "http://13.59.105.105:3000";
    headers = this.createRequestHeader();

  constructor(private http: HttpClient) { }

  saveCoupon(coupon: any[], email: String) {
      console.log(coupon, email);
      return this.http.post(this.serverUrl + '/mobile/coupons/save', { coupon: coupon, email: email } ).pipe(
        map((response: any) => {
            console.log("inside get coupon save request");
            return response;
        })
    );
  }

  unsaveCoupon(coupon: any[], email: String) {
    console.log(coupon, email);
    return this.http.post(this.serverUrl + '/mobile/coupons/unsave', { coupon: coupon, email: email } ).pipe(
      map((response: any) => {
          console.log("inside get coupon save request");
          return response;
      })
  );
}


  private createRequestHeader() {
    // set headers here e.g.
    let headers = new HttpHeaders({
        "Content-Type": "application/json",
     });

    return headers;
}
}
