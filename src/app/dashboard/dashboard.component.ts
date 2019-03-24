import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import { GeolocationService } from '../geolocation.service';
import { CouponlistService } from '../couponlist.service';
import { Location, distance } from "nativescript-geolocation";
import * as Geolocation from "nativescript-geolocation";
import { RouterExtensions } from 'nativescript-angular/router';
import { LoginService } from '../login.service';
import * as Toast from 'nativescript-toast';

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
    byDistance = true;

  constructor( public geolocation: GeolocationService, public couponService: CouponlistService, public router: RouterExtensions, public customerInfo: LoginService) { }

  ngOnInit() {

    Geolocation.enableLocationRequest().then(() => {
        Geolocation.getCurrentLocation({timeout: 10000}).then(location => {
            this.latitude = location.latitude;
            this.longitude = location.longitude;
            this.geolocation.startLocation.longitude = location.longitude;
            this.geolocation.startLocation.latitude = location.latitude;
            // Coupon Distance Checks
            this.couponService.getCoupons(this.longitude, this.latitude, this.customerInfo.customerInfo.couponRadius)
            .subscribe(response => {
                this.nearCouponList = response['couponList'];
                // console.log(this.nearCouponList);
                this.couponService.sortCouponList(this.nearCouponList);
                this.isListLoaded = true;
            }, error => {
                Toast.makeText("There are no offers available with your radius! :( ").show();
                console.log('There was an error getting coupons');
            });
            // //////////////////////////////////
        }).catch(error => {
            console.log(error);
        });
    });
  }

  onCouponClick(coupon) {
    this.couponService.isSaved = false;
    this.couponService.couponToMap['name'] = coupon.name;
    this.couponService.couponToMap['locNames'] = coupon.locNames;
    this.couponService.couponToMap['coordinates'] = coupon.coordinates;
    this.couponService.couponToMap['campaignId'] = coupon.campaignId;
    this.couponService.couponToMap['business'] = coupon.business;
    this.couponService.couponToMap['businessId'] = coupon.businessId;
    this.couponService.couponToMap['tags'] = coupon.tags;
    this.couponService.couponToMap['startDate'] = coupon.startDate;
    this.couponService.couponToMap['endDate'] = coupon.endDate;

    console.log(this.couponService.couponToMap);
    this.router.navigate(['/map']);
  }

  updateLocation() {
    Geolocation.enableLocationRequest().then(() => {
        Geolocation.getCurrentLocation({timeout: 10000}).then(location => {
            this.latitude = location.latitude;
            this.longitude = location.longitude;
            this.geolocation.startLocation.longitude = location.longitude;
            this.geolocation.startLocation.latitude = location.latitude;
            // Coupon Distance Checks
            this.couponService.getCoupons(this.longitude, this.latitude, this.customerInfo.customerInfo.couponRadius)
            .subscribe(response => {
                this.nearCouponList = response['couponList'];
                // console.log(this.nearCouponList);
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

  toggleByDistance() {
      if (this.byDistance) {
          this.byDistance = false;
      } else {
          this.byDistance = true;
      }
  }

  ngAfterViewInit() {
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

}
