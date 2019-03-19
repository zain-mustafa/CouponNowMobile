import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition, RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { LoginService } from "./login.service";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions, private loginInfo: LoginService) {
        // Use the component constructor to inject services.
    }

    userFullname = '';
    userEmail = '';

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        // this.router.events
        // .pipe(filter((event: any) => event instanceof NavigationEnd))
        // .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    onDrawerOpened() {
        this.userFullname = this.loginInfo.customerInfo.firstname + ' ' + this.loginInfo.customerInfo.lastname;
        this.userEmail = this.loginInfo.customerInfo.email;
        console.log(this.userFullname);
    }

    checkEnabled() {
        if (this.router.url === '/' || this.router.url === '/signup' || this.router.url === '/setprofile') {
            return false;
        } else {
            return true;
        }
    }
}
