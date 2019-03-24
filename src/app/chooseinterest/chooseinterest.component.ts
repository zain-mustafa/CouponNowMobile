import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";
import { LoginService } from '../login.service';
import { InterestsService } from '../interests.service';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'ns-chooseinterest',
  templateUrl: './chooseinterest.component.html',
  styleUrls: ['./chooseinterest.component.css'],
  moduleId: module.id,
})
export class ChooseinterestComponent implements OnInit {

    interests = [
        { name: 'Music' },
        { name: 'Art' },
        { name: 'Restaurants' },
        { name: 'Clothes' },
        { name: 'Bars' },
        { name: 'Books' }
      ];

    selectedInterests:String[] = [];
    interestToDisplay = this.interests;

  constructor(public customerInfo: LoginService, public interestService: InterestsService, private page: Page) { }

  ngOnInit() {

    this.customerInfo.customerInfo.interests.forEach(savedInterest => {
        this.interestToDisplay = this.interestToDisplay.filter(interest => {
          return interest.name !== savedInterest.interest;
        });
      });

    console.log(this.interestToDisplay);

  }

  onAddInterest(interest) {
    let selectedInterest = { interest: interest, rating: 1};
    this.interestService.onAddInterestinterest(selectedInterest).subscribe(response => {
        this.interestToDisplay = this.interestToDisplay.filter(selectedInterest => {
            if ( selectedInterest.name !== interest ) {
                return selectedInterest;
            }
        });
        console.log(response);
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
