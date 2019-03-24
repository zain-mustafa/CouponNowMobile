import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { RouterExtensions } from 'nativescript-angular/router';
import * as Toast from 'nativescript-toast';
import { Page } from "tns-core-modules/ui/page";

@Component({
  selector: 'ns-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  moduleId: module.id,
})

export class LoginComponent implements OnInit {

    user: String = 'none';
    pass: String = 'none';

    loginForm: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;

  constructor(public loginService: LoginService, private router: RouterExtensions, private page: Page) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
        username: new FormControl('', {updateOn: 'change', validators: [Validators.required, Validators.email]}),
        password: new FormControl('', {updateOn: 'change', validators: [Validators.required, Validators.minLength(6)]})
    });

    this.page.actionBarHidden = true;
  }

  onLogIn(form: FormGroup) {
      console.log(form.value.username);
      console.log(form.value.password);

      if (this.loginForm.invalid) {
          return
      }

    this.loginService.loginCustomer(form.value.username, form.value.password)
    .subscribe(response => {
        // console.log(response['type']);
        // console.log(this.loginService.customerInfo);

        if (response && response['type'] === 'customer')
            { this.router.navigate(['/dashboard'], {clearHistory: true}); }
            else {
                var toast = Toast.makeText('You do not have a customer account!!');
                toast.show();
            }

    }, error => {
        // console.log("Inside Error Message!!");
        var toast = Toast.makeText('Incorrect E-mail or Password!');
        toast.show();
    });
  }

  onCreateAccount( form: FormGroup ) {
      this.router.navigate(['/signup']);
  }

  isEmailBlured() {
      this.emailControlIsValid = this.loginForm.get('username').valid;
  }

  isPasswordBlured() {
    this.passwordControlIsValid = this.loginForm.get('password').valid;
}

}
