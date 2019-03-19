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
        }
    ];


   }
