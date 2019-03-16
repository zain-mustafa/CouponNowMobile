import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { LoginComponent } from "./login-component/login-component.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SignupComponent } from "./signup/signup.component";
import { SetProfileComponent } from "./set-profile/set-profile.component";
import { ChooseinterestComponent } from "./chooseinterest/chooseinterest.component";


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'setprofile', component: SetProfileComponent },
    { path: 'chooseinterest', component: ChooseinterestComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})

export class AppRoutingModule { }
