import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from './login-component/login-component.component';
import { LoginService } from "./login.service";
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { SetProfileComponent } from './set-profile/set-profile.component';
import { ChooseinterestComponent } from './chooseinterest/chooseinterest.component';
import { MapToCouponComponent } from './map-to-coupon/map-to-coupon.component';
import { AcceptedListComponent } from './accepted-list/accepted-list.component';
import { ChangeRadiusComponent } from './change-radius/change-radius.component';
import { RemoveInterestsComponent } from './remove-interests/remove-interests.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        SignupComponent,
        SetProfileComponent,
        ChooseinterestComponent,
        MapToCouponComponent,
        AcceptedListComponent,
        ChangeRadiusComponent,
        RemoveInterestsComponent
    ],
    providers: [
        LoginService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
