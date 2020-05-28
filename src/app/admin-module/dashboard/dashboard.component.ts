import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { Router } from "@angular/router";
import { RestService } from "src/app/services/rest.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  activeClasses: any = [];
  tenant: string;
  loggedInTime: any = new Date().toLocaleTimeString();
  constructor(
    private utils: UtilsService,
    private router: Router,
    private rest: RestService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem("token")) {
      this.router.navigate([""]);
    }

    //Default selected settings
    for (let i = 1; i < 8; i++) {
      this.activeClasses.push(false);
    }

    if (sessionStorage.getItem("submenu")) {
      this.navigateSubMenu(sessionStorage.getItem("submenu"));
    } else {
      this.navigateSubMenu("overview");
    }

  }


  //Sub menu navigation
  navigateSubMenu(subMenu: string) {
    if (subMenu == "overview") {
      sessionStorage.setItem("submenu", "overview");
      this.defaultClasses();
      this.activeClasses[0] = true;
      this.router.navigate(["dashboard", "overview"]);
    } else if (subMenu == "users") {
      sessionStorage.setItem("submenu", "users");
      this.defaultClasses();
      this.activeClasses[1] = true;
      this.router.navigate(["dashboard", "users"]);
    } else if (subMenu == "dishes") {
      sessionStorage.setItem("submenu", "dishes");
      this.defaultClasses();
      this.activeClasses[2] = true;
      this.router.navigate(["dashboard", "dishes"]);
    } else if (subMenu == "banners") {
      sessionStorage.setItem("submenu", "banners");
      this.defaultClasses();
      this.activeClasses[4] = true;
      this.router.navigate(["dashboard", "banners"]);
    } else if (subMenu == "coupons") {
      sessionStorage.setItem("submenu", "coupons");
      this.defaultClasses();
      this.activeClasses[5] = true;
      this.router.navigate(["dashboard", "coupons"]);
    } else if (subMenu == "sales") {
      sessionStorage.setItem("submenu", "sales");
      this.defaultClasses();
      this.activeClasses[6] = true;
      this.router.navigate(["dashboard", "sales"]);
    }
  }

  // Remove all active options
  defaultClasses() {
    for (let i = 0; i < 8; i++) {
      this.activeClasses[i] = false;
    }
  }

  // Logout user:
  logout() {
    this.rest.logoutUser().subscribe((res) => {
      this.utils.setLoggedStatus(false);
      sessionStorage.removeItem("submenu");
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      this.router.navigate([""]);
    });
  }
}
