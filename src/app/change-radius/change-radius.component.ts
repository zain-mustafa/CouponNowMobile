import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Page } from 'tns-core-modules/ui/page/page';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as Toast from 'nativescript-toast';
import { RouterExtensions } from 'nativescript-angular/router';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from "tns-core-modules/application";

@Component({
  selector: 'ns-change-radius',
  templateUrl: './change-radius.component.html',
  styleUrls: ['./change-radius.component.css'],
  moduleId: module.id,
})
export class ChangeRadiusComponent implements OnInit {

  constructor(public customerInfo: LoginService, private page: Page, public router: RouterExtensions) { }

  changeRadForm: FormGroup

  radiusControlIsValid = true;

  ngOnInit() {
      this.changeRadForm = new FormGroup({
          radius: new FormControl(null, {updateOn: "change", validators: [Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]})
      });
  }

  onBack() {
    this.page.frame.goBack();
  }

  isRadiusBlured() {
      this.radiusControlIsValid = this.changeRadForm.get('radius').valid;
  }

  onRadiusChange(form: FormGroup) {
      if (this.changeRadForm.get('radius').valid === false) {
        Toast.makeText("Please enter a valid radius value!!").show();
        return;
      } else {
        this.customerInfo.onRadiusUpdate(this.customerInfo.customerInfo.email, form.value.radius).subscribe(response => {
            console.log(response);
            Toast.makeText("Radius Updated!!").show();
            this.router.navigate(['/dashboard']);
        });
      }
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}
}
