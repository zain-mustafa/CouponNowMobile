import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Switch } from "tns-core-modules/ui/switch";
import * as app from "tns-core-modules/application";

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

  constructor() { }

  ngOnInit() {
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

interestSelected(args, interestName: String) {
    let thisSwitch = <Switch>args.object;
    if (thisSwitch.checked) {
        console.log(interestName);
        this.selectedInterests.push(interestName);
    } else {
        this.selectedInterests = this.selectedInterests.filter(function(value, index, arr) {
            if (value !== interestName) {
                return value;
            }
        });
    }
}

onSaveInterests() {
    console.log(this.selectedInterests);
}

}
