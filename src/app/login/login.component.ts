import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { RestService } from "../services/rest.service";
import { UtilsService } from "../services/utils.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  token: String = null;

  constructor(
    private formBuilder: FormBuilder,
    private restServices: RestService,
    private utils: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.router.navigate(["dashboard"]);
    }

    this.loginForm = this.formBuilder.group({
      email: [
        "",
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
    });
  }

  login() {
    //Enter credentials and check user is valid or not:
    let dto = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.restServices.loginUser(dto).subscribe(
      (res: any) => {
        //Save user data to session storage for state management
        this.utils.setLoggedStatus(true);
        localStorage.setItem("email", res.email);
        localStorage.setItem("name", res.fullName);
        localStorage.setItem("token", res.token);

        // Set data to shared service
        this.utils.setLoggedData(res);
        this.utils.setLoggedStatus(true);

        // Navigate to dashboard
        if (res.userType == "ADMIN") {
          this.router.navigate(["dashboard"]);
        } else {
          this.loginForm.patchValue({
            password: "",
          });

          Swal.fire({
            title: "Error!",
            text: "You are not admin of this application",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      },
      (err) => {
        this.loginForm.patchValue({
          password: "",
        });

        Swal.fire({
          title: "Error!",
          text: "Invalid Credentials",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    );
  }
}
