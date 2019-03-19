import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class CouponlistService {

    // Test coupon Array for different businesses
    couponList: any = [
        {
            name: 'TwoForOne',
            latitude: 42.187962,
            longitude: -83.092637
        },
        {
            name: 'ThreeForOne',
            latitude: 42.243728,
            longitude: -83.100727
        },
        {
            name: 'Gamble All Day',
            latitude: 42.320224,
            longitude: -83.036655
        }
    ];

    // List updates each time dashboard is opened
    couponToMap = {
        name: '',
        longitude: 0,
        latitude: 0
    }


   }
