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
/*
  Generated class for the DataElementPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var DataElementPage = (function () {
    function DataElementPage(params, navCtrl, sqlLite, httpClient, app, toastCtrl) {
        var _this = this;
        this.params = params;
        this.navCtrl = navCtrl;
        this.sqlLite = sqlLite;
        this.httpClient = httpClient;
        this.app = app;
        this.toastCtrl = toastCtrl;
        this.currentUser = {};
        this.dataElement = {};
        this.app.getCurrentUser().then(function (currentUser) {
            _this.currentUser = currentUser;
            _this.dataElement = _this.params.get('dataElement');
        });
    }
    DataElementPage.prototype.setToasterMessage = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 4000
        });
        toast.present();
    };
    DataElementPage.prototype.setStickToasterMessage = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            showCloseButton: true
        });
        toast.present();
    };
    DataElementPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/data-element/data-element.html',
            providers: [app_1.App, http_client_1.HttpClient, sql_lite_1.SqlLite]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavParams, ionic_angular_1.NavController, sql_lite_1.SqlLite, http_client_1.HttpClient, app_1.App, ionic_angular_1.ToastController])
    ], DataElementPage);
    return DataElementPage;
})();
exports.DataElementPage = DataElementPage;
