import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import { GeolocationService } from '../geolocation.service';
import { CouponlistService } from '../couponlist.service';
import { Location, distance } from "nativescript-geolocation";
import * as Geolocation from "nativescript-geolocation";

@Component({
  selector: 'ns-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  moduleId: module.id,
})
export class DashboardComponent implements OnInit, AfterViewInit {

    longitude: number = 0;
    latitude: number = 0;

    nearCouponList = [];

  constructor( public geolocation: GeolocationService, public couponService: CouponlistService) { }

  ngOnInit() {

    Geolocation.enableLocationRequest().then(() => {
        Geolocation.getCurrentLocation({timeout: 10000}).then(location => {
            this.latitude = location.latitude;
            this.longitude = location.longitude;
            // Coupon Distance Checks

            this.couponService.couponList.forEach(coupon => {
                const distance = this.geolocation.distanceInKm(this.latitude, this.longitude, coupon.latitude, coupon.longitude);
                console.log(coupon.name + ": " + distance);
                if ( this.geolocation.distanceInKm(this.latitude, this.longitude, coupon.latitude, coupon.longitude) <= 5 ) {
                    this.nearCouponList.push({coupon: coupon, distance: distance});
                }
                console.log(this.nearCouponList);
              });

              // //////////////////////////////////
        }).catch(error => {
            console.log(error);
        });
    });
  }

  ngAfterViewInit() {
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

}
