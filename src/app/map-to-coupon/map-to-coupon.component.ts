import { Component, OnInit } from '@angular/core';
import { registerElement } from "nativescript-angular/element-registry";
import { Directions } from "nativescript-directions";
import { CouponlistService } from '../couponlist.service';

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

  constructor( public couponService: CouponlistService) { }

  ngOnInit() {

    this.endLatitude = this.couponService.couponToMap.latitude;
    this.endLongitude = this.couponService.couponToMap.longitude;

  }

  showMap() {
    this.directions.navigate({
        to: {
            lat: this.endLatitude,
            lng: this.endLongitude
        },
        type: "walking",
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

}
