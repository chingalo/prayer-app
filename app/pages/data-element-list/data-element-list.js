var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var app_1 = require('../../providers/app/app');
var http_client_1 = require('../../providers/http-client/http-client');
var sql_lite_1 = require("../../providers/sql-lite/sql-lite");
var data_element_1 = require('../data-element/data-element');
var PopoverPage = (function () {
    function PopoverPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    PopoverPage.prototype.updateData = function () {
        alert('Read to update data');
        this.viewCtrl.dismiss();
    };
    PopoverPage.prototype.logOut = function () {
        alert('Ready to log out');
        this.viewCtrl.dismiss();
    };
    PopoverPage = __decorate([
        core_1.Component({
            template: "\n    <ion-list>\n      <button ion-item (click)=\"updateData()\">Update</button>\n      <button ion-item (click)=\"logOut()\">Log out</button>\n    </ion-list>\n  "
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.ViewController])
    ], PopoverPage);
    return PopoverPage;
})();
/*
  Generated class for the DataElementListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var DataElementListPage = (function () {
    function DataElementListPage(popoverCtrl, params, navCtrl, sqlLite, httpClient, app, toastCtrl) {
        var _this = this;
        this.popoverCtrl = popoverCtrl;
        this.params = params;
        this.navCtrl = navCtrl;
        this.sqlLite = sqlLite;
        this.httpClient = httpClient;
        this.app = app;
        this.toastCtrl = toastCtrl;
        this.resource = "dataElements";
        this.currentUser = {};
        this.groupName = this.params.get('groupName');
        this.dataElementsId = this.params.get('dataElementsId');
        this.app.getCurrentUser().then(function (currentUser) {
            _this.currentUser = currentUser;
            _this.loadingMetaData();
        });
    }
    DataElementListPage.prototype.presentPopover = function (event) {
        var popover = this.popoverCtrl.create(PopoverPage);
        popover.present({ ev: event });
    };
    DataElementListPage.prototype.loadingMetaData = function () {
        var _this = this;
        var databaseName = this.currentUser.currentDataBase;
        this.sqlLite.getDataFromTableByAttributes(this.resource, 'id', this.dataElementsId, databaseName).then(function (data) {
            _this.setMetadata(data);
        }, function (error) {
            _this.setToasterMessage('Fail to load data from local storage');
        });
    };
    DataElementListPage.prototype.setMetadata = function (data) {
        this.metaData = data;
    };
    DataElementListPage.prototype.goToSelectedDataElement = function (dataElement) {
        var parameters = {
            dataElement: dataElement
        };
        this.navCtrl.push(data_element_1.DataElementPage, parameters);
    };
    DataElementListPage.prototype.setToasterMessage = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 4000
        });
        toast.present();
    };
    DataElementListPage.prototype.setStickToasterMessage = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            showCloseButton: true
        });
        toast.present();
    };
    DataElementListPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/data-element-list/data-element-list.html',
            providers: [app_1.App, http_client_1.HttpClient, sql_lite_1.SqlLite]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.PopoverController, ionic_angular_1.NavParams, ionic_angular_1.NavController, sql_lite_1.SqlLite, http_client_1.HttpClient, app_1.App, ionic_angular_1.ToastController])
    ], DataElementListPage);
    return DataElementListPage;
})();
exports.DataElementListPage = DataElementListPage;
