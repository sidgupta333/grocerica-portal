import { Component, OnInit } from "@angular/core";
import { RestService } from "src/app/services/rest.service";
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  searchRecord: any;
  p: any;
  usersList: any = [];
  modalTitle: string = "";
  addForm: FormGroup;
  userId: any = null;

  constructor(private rest: RestService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem("token")) {
      this.router.navigate([""]);
    }
    this.getAllUsers();

    this.addForm = this.formBuilder.group({
      fullName: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
        ]),
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      mobile: ["", Validators.compose([Validators.required])],
      gender: ["", Validators.compose([Validators.required])],
      address: ["", Validators.compose([Validators.required])],
      city: ["", Validators.compose([Validators.required])],
      country: ["", Validators.compose([Validators.required])],
      pincode: ["", Validators.compose([Validators.required])],
      state: ["", Validators.compose([Validators.required])],
    });
  }

  getAllUsers() {
    this.usersList = [];

    //Get list of users
    this.rest.getAllUsers().subscribe(
      (res) => {
        this.usersList = res;
      },
      (err) => {
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch users details",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    );
  }

  // Create new user:
  addUser() {
    this.addForm.patchValue({
      fullName: "",
      username: "",
      password: "",
      isAdmin: "",
    });
    this.modalTitle = "Add New User";
    this.userId = null;
  }

  saveUser() {
    // Save User
    let dto = {
      address1: this.addForm.value.address,
      addressTitle: "ADMIN",
      city: this.addForm.value.city,
      country: this.addForm.value.country,
      dob: "01-01-1991",
      email: this.addForm.value.email,
      fullName: this.addForm.value.fullName,
      gender: this.addForm.value.gender,
      mobile: this.addForm.value.mobile,
      password: this.addForm.value.password,
      pincode: this.addForm.value.pincode,
      state: this.addForm.value.state,
      userType: "admin",
    };

    this.rest.createUser(dto).subscribe(
      (res) => {
        Swal.fire({
          title: "Success!",
          text: "User created Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        this.getAllUsers();
      },
      (err) => {
        Swal.fire({
          title: "Error!",
          text: "User Creation Failed",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    );
  }

  deleteUser(userId) {
    // Can't delete the last admin user:
    let adminCount = 0;
    this.usersList.forEach((element) => {
      if (element.userType == "ADMIN") {
        adminCount++;
      }
    });

    if (adminCount == 1) {
      Swal.fire({
        title: "Error!",
        text: "You cannot delete the last ADMIN user!",
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }

    Swal.fire({
      title: "Please Confirm!",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "YES",
      cancelButtonText: "NO",
    }).then((isConfirm) => {
      if (isConfirm.value) {
        this.rest.deleteUser(userId).subscribe(
          (res) => {
            this.getAllUsers();
            Swal.fire({
              title: "Success!",
              text: "User deleted Successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          },
          (err) => {
            Swal.fire({
              title: "Error!",
              text: "User Deletion failed",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        );
      } else {
        return;
      }
    });
  }
}
