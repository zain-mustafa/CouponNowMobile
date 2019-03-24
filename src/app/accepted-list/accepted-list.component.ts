import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { CouponlistService } from '../couponlist.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-accepted-list',
  templateUrl: './accepted-list.component.html',
  styleUrls: ['./accepted-list.component.css'],
  moduleId: module.id,
})
export class AcceptedListComponent implements OnInit {

  constructor(public customerInfo: LoginService, public couponService: CouponlistService, public router: RouterExtensions) { }

  ngOnInit() {
  }

  onCouponClick(coupon) {
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

}
