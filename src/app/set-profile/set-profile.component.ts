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
        email: new FormControl(),
        birthMonth: new FormControl({ type: Number }),
        birthDay: new FormControl({ type: Number }),
        birthYear: new FormControl({ type: Number }),
        gender: new FormControl(),
        occupation: new FormControl()
      });
  }

  setProfileInfo(form: FormGroup) {
    this.profileForm.value.email = this.customerInfo.customerInfo.email;

      console.log(form.value);

      this.customerInfo.onProfileSetup(form.value.email, form.value.birthMonth, form.value.birthDay, form.value.birthYear, form.value.gender, form.value.occupation)
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
    console.log(this.pickedGender);
}

  onPickerLoaded(args) {
    this.datePicker = <DatePicker>args.object;

    this.datePicker.year = 1980;
    this.datePicker.month = 2;
    this.datePicker.day = 9;
    this.datePicker.minDate = new Date(1975, 0, 29);
    this.datePicker.maxDate = new Date(2045, 4, 12);

    this.profileForm.value.birthDay = this.datePicker.day;
    this.profileForm.value.birthMonth = this.datePicker.month;
    this.profileForm.value.birthYear =this.datePicker.year;
}

onDayChanged(args) {
    this.profileForm.value.birthDay = args.value;
    console.log(this.profileForm.value.birthDay);
}

onMonthChanged(args) {
    this.profileForm.value.birthMonth = args.value;
    console.log(this.profileForm.value.birthMonth);
}

onYearChanged(args) {
    this.profileForm.value.birthYear = args.value;
    console.log(this.profileForm.value.birthYear);
}

}
