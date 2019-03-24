import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { InterestsService } from '../interests.service';
import { Page } from 'tns-core-modules/ui/page/page';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";

@Component({
  selector: 'ns-remove-interests',
  templateUrl: './remove-interests.component.html',
  styleUrls: ['./remove-interests.component.css'],
  moduleId: module.id,
})
export class RemoveInterestsComponent implements OnInit {

  constructor( public customerInfo: LoginService, public interestService: InterestsService, private page: Page ) { }

  ngOnInit() {

  }

  onRemoveInterest(removeInterest) {
      const email = this.customerInfo.customerInfo.email;
    this.interestService.onRemoveInterest(removeInterest.interest, email).subscribe(response => {
        this.customerInfo.customerInfo.interests = this.customerInfo.customerInfo.interests.filter(interest => {
            return interest.interest !== removeInterest.interest;
          });
        console.log(response);
    })
  }


  onBack() {
    this.page.frame.goBack();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

}
