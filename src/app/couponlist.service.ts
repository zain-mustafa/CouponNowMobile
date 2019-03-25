import { Injectable } from '@angular/core';
import { Observable } from 'tns-core-modules/ui/page/page';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
  })
  export class CouponlistService {
    private serverUrl = "http://13.59.105.105:3000";
    headers = this.createRequestHeader();

    constructor(private http: HttpClient, private customerInfo: LoginService) { }

    isSaved = false;
    isCouponAdded;

    sortedNearCouponList = [];
    // interestSortedCouponList = [];
    // couponsNoInterest = [];

    // List updates each time dashboard is opened
    couponToMap = {
        name: '',
        locNames: '',
        coordinates: '',
        campaignId: '',
        business: '',
        businessId: '',
        tags: [],
        startDate: '',
        endDate: ''
    }

    getCoupons(lon: number, lat: number, radius: number) {
        console.log("inside get coupon service");

        let params = new HttpParams().set( "longitude", lon.toString() ).set("latitude", lat.toString()).set("radius", radius.toString());

        return this.http.get(this.serverUrl + '/mobile/coupons/', { headers: this.headers, params:  params} ).pipe(
            map((response: any) => {
                console.log("inside get coupon http request");
                return response;
            })
        );
    }

    sortCouponList(couponList) {
        this.sortedNearCouponList = [];
        console.log("Calling Sort Function");
        console.log(this.customerInfo.sortedCustomerInterests);

        couponList.forEach(coupon => {
            this.isCouponAdded = false;
            coupon.tags.forEach(tag => {
                this.customerInfo.sortedCustomerInterests.forEach(interest => {
                    if (tag === interest.interest && this.isCouponAdded === false) {
                        this.sortedNearCouponList.push(coupon);
                        this.isCouponAdded = true;
                    }
                })
            })
        });
    }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
         });

        return headers;
    }

   }
