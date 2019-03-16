import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from 'tns-core-modules/ui/page/page';
import { LoginService } from '../login.service';
import * as Toast from 'nativescript-toast';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  moduleId: module.id,
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    firstnameControlIsValid = true;
    lastnameControlIsValid = true;
    emailControlIsValid = true;
    passwordControlIsValid = true;

  constructor(private page: Page, public signupService: LoginService, private router: RouterExtensions) { }

  ngOnInit() {
      this.signupForm = new FormGroup({
        firstname: new FormControl(null, {updateOn: "change", validators: [Validators.required, Validators.minLength(1), Validators.pattern('[a-zA-Z ]*')]}),
        lastname: new FormControl(null, {updateOn: "change", validators: [Validators.required, Validators.minLength(1), Validators.pattern('[a-zA-Z ]*')]}),
        email: new FormControl('', {updateOn: 'change', validators: [Validators.required, Validators.email]}),
        password: new FormControl('', {updateOn: 'change', validators: [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]})
      });
  }

  onBack() {
    this.page.frame.goBack();
  }

  onSignup(form: FormGroup) {

    if (this.signupForm.invalid) {
        return;
    }

      this.signupService.onCreateAccount( 'customer',form.value.firstname, form.value.lastname, form.value.email, form.value.password )
      .subscribe(response => {
        console.log('Your Account has been created!!');
        var toast = Toast.makeText('Welcome to CouponNow!');
        toast.show();
      }, error => {
          console.log("Username already taken!!");
          var toast = Toast.makeText('This username is already taken!');
            toast.show();
      }, () => {
        console.log("Customer is Loggin in.")

        this.signupService.loginCustomer( form.value.email, form.value.password )
        .subscribe(response => {
            console.log("Customer has logged in.")
            this.router.navigate(['/setprofile'], {clearHistory: true});
        });
      });
  }

    isEmailBlured() {
        this.emailControlIsValid = this.signupForm.get('email').valid;
    }

    isPasswordBlured() {
        this.passwordControlIsValid = this.signupForm.get('password').valid;
    }

    isFirstnameBlured() {
        this.firstnameControlIsValid = this.signupForm.get('firstname').valid;
    }

    isLastnameBlured() {
        this.lastnameControlIsValid = this.signupForm.get('lastname').valid;
    }



}
