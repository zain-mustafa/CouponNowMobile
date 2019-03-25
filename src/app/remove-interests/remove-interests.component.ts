import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { InterestsService } from '../interests.service';
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import { CouponlistService } from '../couponlist.service';

@Component({
  selector: 'ns-remove-interests',
  templateUrl: './remove-interests.component.html',
  styleUrls: ['./remove-interests.component.css'],
  moduleId: module.id,
})
export class RemoveInterestsComponent implements OnInit {

  constructor( public customerInfo: LoginService, public interestService: InterestsService, private page: Page, public couponService: CouponlistService ) { }

  ngOnInit() {

  }

  onRemoveInterest(removeInterest) {
        console.log(removeInterest.interest);
        const email = this.customerInfo.customerInfo.email;
        this.interestService.onRemoveInterest(removeInterest.interest, email).subscribe(response => {
        this.customerInfo.customerInfo.interests = this.customerInfo.customerInfo.interests.filter(interest => {
            if (interest.interest !== removeInterest.interest) {
                return interest;
            }
          });
          this.customerInfo.sortedCustomerInterests = this.customerInfo.sortedCustomerInterests.filter(interest => {
            if (interest.interest !== removeInterest.interest) {
                return interest;
            }
          });
    });
  }


  onBack() {
    this.page.frame.goBack();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

}
