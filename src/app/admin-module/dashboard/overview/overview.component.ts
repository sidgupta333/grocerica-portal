import { Component, OnInit } from "@angular/core";
import { RestService } from "src/app/services/rest.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit {
  ordersList: any = [];
  searchRecord: any;
  selectedOrderForCancel: any;
  cancellationReason: any = "";
  p: any;
  dishesList: any = [];
  isSafe: any;
  quantitiesList: any = [];
  constructor(private rest: RestService, private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem("token")) {
      this.router.navigate([""]);
    }

    this.updateStatusTable();

    window.setInterval(() => {
      this.updateStatusTable();
    }, 100000);
  }

  updateStatusTable() {
    this.rest.getOpenOrders().subscribe((res: any) => {
      this.ordersList = res;
    });
  }

  selectOrder(item: any) {
    this.dishesList = item.products;
    this.isSafe = item.safeDelivery;
    this.quantitiesList = item.quantities;
  }

  addCancelReason(item) {
    this.selectedOrderForCancel = item.orderId;
    this.cancellationReason = "";
  }

  prepareOrder(item: any) {
    let dto = {
      status: "PREPARING",
      subOrderId: item.sub_order_id,
    };

    this.rest.updateSubOrder(dto).subscribe(
      (res: any) => {
        this.updateStatusTable();
      },
      (err) => {
        Swal.fire({
          title: "Error!",
          text: "Unable to update status",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    );
  }

  completeOrder(item: any) {
    this.rest.completeOrder(item).subscribe(
      (res: any) => {
        Swal.fire({
          title: "Success",
          text: "Order completed successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        this.updateStatusTable();
      },
      (err) => {
        Swal.fire({
          title: "Error!",
          text: "Unable to complete order",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    );
  }

  cancelOrder() {
    let dto = {
      cancellationReason: this.cancellationReason,
      orderId: this.selectedOrderForCancel,
    };

    this.selectedOrderForCancel = null;
    this.cancellationReason = "";

    this.rest.cancelOrder(dto).subscribe(
      (res) => {
        this.updateStatusTable();
      },
      (err) => {
        Swal.fire({
          title: "Error!",
          text: "Unable to Cancel Order",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    );
  }
}
