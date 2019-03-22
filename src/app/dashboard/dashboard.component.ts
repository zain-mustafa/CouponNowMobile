import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import { GeolocationService } from '../geolocation.service';
import { CouponlistService } from '../couponlist.service';
import { Location, distance } from "nativescript-geolocation";
import * as Geolocation from "nativescript-geolocation";
import { RouterExtensions } from 'nativescript-angular/router';
import { LoginService } from '../login.service';

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
    isListLoaded = false;

  constructor( public geolocation: GeolocationService, public couponService: CouponlistService, public router: RouterExtensions, public customerInfo: LoginService) { }

  ngOnInit() {

    Geolocation.enableLocationRequest().then(() => {
        Geolocation.getCurrentLocation({timeout: 10000}).then(location => {
            this.latitude = location.latitude;
            this.longitude = location.longitude;
            // Coupon Distance Checks
            this.couponService.getCoupons(this.longitude, this.latitude, this.customerInfo.customerInfo.couponRadius)
            .subscribe(response => {
                this.nearCouponList = response['couponList'];
                console.log(this.nearCouponList);
                this.isListLoaded = true;
            }, error => {
                console.log('There was an error getting coupons');
            });
            // //////////////////////////////////
        }).catch(error => {
            console.log(error);
        });
    });
  }

  onCouponClick(coupon) {
    this.couponService.couponToMap['name'] = coupon.name;
    this.couponService.couponToMap['locNames'] = coupon.locNames;
    this.couponService.couponToMap['coordinates'] = coupon.coordinates;

    console.log(this.couponService.couponToMap);
    this.router.navigate(['/map']);
  }

  ngAfterViewInit() {
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

}
