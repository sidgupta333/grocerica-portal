import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RestService {
  private SERVER: string = "http://ec2-13-232-200-169.ap-south-1.compute.amazonaws.com:8080";
  // private SERVER: string = "http://localhost:8080";

  LOGIN: string = "/users/login";
  LOGOUT: string = "/users/logout";
  ALL_USERS: string = "/users/allUsers";
  CREATE_USER: string = "/users/create";
  DELETE_USER: string = "/users/delete/";
  AL_CATEGORIES: string = "/category/getAll";
  ALL_PRODUCTS_CATEGORIES: string = "/product/getAll";
  UPDATE_DISH_STATUS: string = "/dishes/updateDish/status";
  UPLOAD_IMAGE: string = "/images/upload";
  SAVE_NEW_PRODUCT: string = "/product/create";
  DELETE_PRODUCT: string = "/product/remove/";
  CREATE_CATEGORY: string = "/category/create";
  DELETE_CATEGORY: string = "/category/remove/";
  GET_ALL_TABLES: string = "/tables/getAll";
  CREATE_TABLE: string = "/tables/create";
  DELETE_TABLE: string = "/tables/delete/";
  GET_ALL_BANNERS: string = "/banners/getAll";
  SAVE_BANNER: string = "/banners/create";
  DELETE_BANNER: string = "/banners/remove/";
  GET_ALL_COUPONS = "/apply/getAll";
  CREATE_COUPON = "/apply/create";
  DELETE_COUPON = "/coupons/delete/";
  GET_DRILLDOWN = "/subOrders/drillDown";
  UPDATE_SUB_ORDER = "/subOrders/updateStatus";
  UPDATE_ORDER = "/orders/updateStatus";
  CANCEL_ORDER = "/order/cancel";
  COMPLETE_ORDER = "/order/complete/";
  CHARTS = "/orders/chart";
  OPEN_ORDERS = "/order/open";
  FILTER_ORDERS = "/orders/ordersByDate";
  GENERATE_BILL = "/orders/bill/";

  constructor(private http: HttpClient) {}

  // ---------------------------ALL API Endpoints here--------------------------------

  public loginUser(dto: any) {
    let url = this.SERVER.concat(this.LOGIN);
    return this.http.post(url, dto);
  }

  public logoutUser() {
    let url = this.SERVER.concat(this.LOGOUT);
    return this.http.get(url);
  }

  public getAllUsers() {
    let url = this.SERVER.concat(this.ALL_USERS);
    return this.http.get(url);
  }

  public createUser(dto: any) {
    let url = this.SERVER.concat(this.CREATE_USER);
    return this.http.post(url, dto);
  }

  public deleteUser(userId) {
    let url = this.SERVER.concat(this.DELETE_USER, userId);
    return this.http.delete(url);
  }

  public getAllCategories() {
    let url = this.SERVER.concat(this.AL_CATEGORIES);
    return this.http.get(url);
  }

  public getAllProductsWithCategories() {
    let url = this.SERVER.concat(this.ALL_PRODUCTS_CATEGORIES);
    return this.http.get(url);
  }

  public updateDishStatus(dto: any) {
    let url = this.SERVER.concat(this.UPDATE_DISH_STATUS);
    return this.http.post(url, dto);
  }

  public uploadImage(formGroup: FormData) {
    let url = this.SERVER.concat(this.UPLOAD_IMAGE);
    return this.http.post(url, formGroup);
  }

  public saveProduct(dto: any) {
    let url = this.SERVER.concat(this.SAVE_NEW_PRODUCT);
    return this.http.post(url, dto);
  }

  public deleteProduct(dishId: any) {
    let url = this.SERVER.concat(this.DELETE_PRODUCT, dishId);
    return this.http.delete(url);
  }

  public createCategory(dto: any) {
    let url = this.SERVER.concat(this.CREATE_CATEGORY);
    return this.http.post(url, dto);
  }

  public deleteCategory(categoryId) {
    let url = this.SERVER.concat(this.DELETE_CATEGORY, categoryId);
    return this.http.delete(url);
  }

  public getAllTables() {
    let url = this.SERVER.concat(this.GET_ALL_TABLES);
    return this.http.get(url);
  }

  public createNewTable(dto: any) {
    let url = this.SERVER.concat(this.CREATE_TABLE);
    return this.http.post(url, dto);
  }

  public deleteTable(tableId) {
    let url = this.SERVER.concat(this.DELETE_TABLE, tableId);
    return this.http.delete(url);
  }

  public addBanner(dto: any) {
    let url = this.SERVER.concat(this.SAVE_BANNER);
    return this.http.post(url, dto);
  }

  public getBanners() {
    let url = this.SERVER.concat(this.GET_ALL_BANNERS);
    return this.http.get(url);
  }

  public updateSubOrder(dto) {
    let url = '';
    return this.http.post(url, dto);
  }

  public deleteBanner(id: any) {
    let url = this.SERVER.concat(this.DELETE_BANNER, id);
    return this.http.delete(url);
  }

  public createCoupon(dto: any) {
    let url = this.SERVER.concat(this.CREATE_COUPON);
    return this.http.post(url, dto);
  }

  public getAllCoupons() {
    let url = this.SERVER.concat(this.GET_ALL_COUPONS);
    return this.http.get(url);
  }

  public deleteCoupon(id: any) {
    let url = this.SERVER.concat(this.DELETE_COUPON, id);
    return this.http.delete(url);
  }

  public getDrilldown() {
    let url = this.SERVER.concat(this.GET_DRILLDOWN);
    return this.http.get(url);
  }

  public cancelOrder(dto) {
    let url = this.SERVER.concat(this.CANCEL_ORDER);
    return this.http.post(url, dto);
  }

  public completeOrder(orderId: any) {
    let url = this.SERVER.concat(this.COMPLETE_ORDER, orderId);
    return this.http.get(url);
  }

  public updateOrder(dto: any) {
    let url = this.SERVER.concat(this.UPDATE_ORDER);
    return this.http.post(url, dto);
  }

  public getChartsData() {
    let url = this.SERVER.concat(this.CHARTS);
    return this.http.get(url);
  }

  public getOpenOrders() {
    let url = this.SERVER.concat(this.OPEN_ORDERS);
    return this.http.get(url);
  }

  public getLatestData() {
    let url = this.SERVER.concat(this.OPEN_ORDERS);
    return this.http.get(url);
  }

  public filterOrders(dto: any) {
    let url = this.SERVER.concat(this.FILTER_ORDERS);
    return this.http.post(url, dto);
  }

  public generateBill(order_id: any) {
    let url = this.SERVER.concat(this.GENERATE_BILL, order_id);
    return this.http.get(url);
  }
}
