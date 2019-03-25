import { Component, OnInit } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
import { Directions } from "nativescript-directions";
import { CouponlistService } from '../couponlist.service';
import { CouponsaveService } from '../couponsave.service';
import { LoginService } from '../login.service';
import * as Geolocation from "nativescript-geolocation";
import { GeolocationService } from '../geolocation.service';
import { Location, distance } from "nativescript-geolocation";
import { Page } from "tns-core-modules/ui/page";
import * as Toast from 'nativescript-toast';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";

@Component({
  selector: 'ns-map-to-coupon',
  templateUrl: './map-to-coupon.component.html',
  styleUrls: ['./map-to-coupon.component.css'],
  moduleId: module.id,
})
export class MapToCouponComponent implements OnInit {

    // instantiate the plugin
    directions = new Directions();
    endLongitude = 0;
    endLatitude = 0;

    isSaved = false;
    couponDeleted = false;

    public endLocation: Location = new Location();

  constructor( public geolocation: GeolocationService, public couponService: CouponlistService, public saveService: CouponsaveService, public customerInfo: LoginService, public page: Page) { }

  ngOnInit() {

    // this.endLatitude = this.couponService.couponToMap.latitude;
    // this.endLongitude = this.couponService.couponToMap.longitude;

  }

  showMap(longitude, latitude) {
    this.directions.navigate({
        to: {
            lat: latitude,
            lng: longitude
        },
        type: "driving",
        ios: {
          preferGoogleMaps: true, // If the Google Maps app is installed, use that one instead of Apple Maps, because it supports waypoints. Default true.
          allowGoogleMapsWeb: true // If waypoints are passed in and Google Maps is not installed, you can either open Apple Maps and the first waypoint is used as the to-address (the rest is ignored), or you can open Google Maps on web so all waypoints are shown (set this property to true). Default false.
        }
      }).then(() => {
          console.log("Maps app launched.");
      }, error => {
          console.log(error);
      });
  }

  onCouponSave(coupon) {
    this.isSaved = false;
    this.customerInfo.customerInfo.acceptedCoupons.forEach(element => {
        if (this.couponService.couponToMap.campaignId === element.campaignId) {
            Toast.makeText("You already have this coupon saved!!").show();
            this.isSaved = true;
        }
    });

    if (this.isSaved) {
        return;
    }

      this.saveService.saveCoupon(coupon, this.customerInfo.customerInfo.email).subscribe(response => {
        this.customerInfo.customerInfo.acceptedCoupons.push(coupon);
        Toast.makeText("Coupon Saved!!").show();
        coupon.tags.forEach(tag => {
            this.customerInfo.customerInfo.interests.forEach(interest => {
                if (interest.interest === tag) {
                    interest.rating = interest.rating + 1;
                }
            });
        });
        console.log(response);
      });
  }

  onCouponUnsave(coupon) {
    this.couponDeleted = false;

    this.customerInfo.customerInfo.acceptedCoupons.forEach(element => {
        if (this.couponService.couponToMap.campaignId === element.campaignId) {
            this.saveService.unsaveCoupon(coupon, this.customerInfo.customerInfo.email).subscribe(response => {
                this.customerInfo.customerInfo.acceptedCoupons = this.customerInfo.customerInfo.acceptedCoupons.filter(coupons => {
                    if ( coupon.campaignId !== coupons.campaignId) {
                        return coupon;
                    }
                });
                Toast.makeText("Coupon UnSaved!!").show();
                this.couponDeleted = true;
              });
        }
    });

    if (this.couponDeleted === false) {
        Toast.makeText("You dont have this coupon Saved!!").show();
    }

    coupon.tags.forEach(tag => {
        this.customerInfo.customerInfo.interests.forEach(interest => {
            if (interest.interest === tag) {
                interest.rating = interest.rating - 1;
            }

        });
    });
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}
}
