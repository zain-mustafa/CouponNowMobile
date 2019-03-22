import { Injectable } from '@angular/core';
import { Observable } from 'tns-core-modules/ui/page/page';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class CouponlistService {
    private serverUrl = "http://c08b174c.ngrok.io";
    headers = this.createRequestHeader();

    constructor(private http: HttpClient) { }

    // List updates each time dashboard is opened
    couponToMap = {
        name: '',
        locNames: '',
        coordinates: ''
    }

    getCoupons(lon: number, lat: number, radius: number) {
        console.log("inside get coupon service");
        // console.log("Longitude: " + lon);
        // console.log("Latitude: " + lat);
        // console.log("Radius: " + radius);

        let params = new HttpParams().set( "longitude", lon.toString() ).set("latitude", lat.toString()).set("radius", radius.toString());

        return this.http.get(this.serverUrl + '/mobile/coupons/', { headers: this.headers, params:  params} ).pipe(
            map((response: any) => {
                console.log("inside get coupon http request");
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
