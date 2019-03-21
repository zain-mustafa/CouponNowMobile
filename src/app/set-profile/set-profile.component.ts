import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { LoginService } from '../login.service';
import * as Toast from 'nativescript-toast';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-set-profile',
  templateUrl: './set-profile.component.html',
  styleUrls: ['./set-profile.component.css'],
  moduleId: module.id,
})
export class SetProfileComponent implements OnInit {

    profileForm: FormGroup;
    datePicker: DatePicker;

    genders = ['Man', 'Woman', 'Other'];
    pickedGender: String;

  constructor(public customerInfo: LoginService, private router: RouterExtensions) { }

  ngOnInit() {
      this.profileForm = new FormGroup({
        email: new FormControl(this.customerInfo.customerInfo.email, {updateOn: "change"}),
        birthMonth: new FormControl(2, {updateOn: "change"}),
        birthDay: new FormControl(9, {updateOn: "change"}),
        birthYear: new FormControl(1980, {updateOn: "change"}),
        gender: new FormControl('M', {updateOn: "change"}),
        occupation: new FormControl(' ', {updateOn: "change"})
      });
  }

  setProfileInfo(form: FormGroup) {
      console.log(this.profileForm.value);

      this.customerInfo.onProfileSetup(this.profileForm.value.email, this.profileForm.value.birthMonth,this.profileForm.value.birthDay, this.profileForm.value.birthYear, this.profileForm.value.gender, this.profileForm.value.occupation)
      .subscribe(response => {
        var toast = Toast.makeText('Profile Preferences Saved!!!');
        toast.show();
        this.router.navigate(['/dashboard'], {clearHistory: true} );
      }, error => {
          console.log("error saving profile");
          console.log(error);
      });
  }

  public selectedIndexChanged(args) {
    let picker = <ListPicker>args.object;
    this.pickedGender = this.genders[picker.selectedIndex];
    this.profileForm.value.gender = this.pickedGender;
    if (args.value === 0) {
        this.profileForm.controls['gender'].setValue('Male');
    }  else if ( args.value === 1 ) {
        this.profileForm.controls['gender'].setValue('Female');
    } else {
        this.profileForm.controls['gender'].setValue('Other');
    }
    console.log(this.pickedGender);
}

  onPickerLoaded(args) {
    this.datePicker = <DatePicker>args.object;

    this.datePicker.year = 1980;
    this.datePicker.month = 2;
    this.datePicker.day = 9;
    this.datePicker.minDate = new Date(1975, 0, 29);
    this.datePicker.maxDate = new Date(2045, 4, 12);
}

onDayChanged(args) {
    this.profileForm.controls['birthDay'].setValue(args.value);
    console.log(this.profileForm.value.birthDay);
}

onMonthChanged(args) {
    this.profileForm.controls['birthMonth'].setValue(args.value);
    console.log(this.profileForm.value.birthMonth);
}

onYearChanged(args) {
    this.profileForm.controls['birthYear'].setValue(args.value);
    console.log(this.profileForm.value.birthYear);
}

}
