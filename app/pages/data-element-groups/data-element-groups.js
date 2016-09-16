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
var data_element_list_1 = require('../data-element-list/data-element-list');
/*
  Generated class for the DataElementGroupsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var DataElementGroupsPage = (function () {
    function DataElementGroupsPage(params, navCtrl, sqlLite, httpClient, app, toastCtrl) {
        var _this = this;
        this.params = params;
        this.navCtrl = navCtrl;
        this.sqlLite = sqlLite;
        this.httpClient = httpClient;
        this.app = app;
        this.toastCtrl = toastCtrl;
        this.resource = "dataElementGroups";
        this.currentUser = {};
        this.groupSetName = this.params.get('groupSetName');
        this.dataElementGroupsId = this.params.get('dataElementGroupsId');
        this.app.getCurrentUser().then(function (currentUser) {
            _this.currentUser = currentUser;
            _this.loadingMetaData();
        });
    }
    DataElementGroupsPage.prototype.loadingMetaData = function () {
        var _this = this;
        var databaseName = this.currentUser.currentDataBase;
        this.sqlLite.getDataFromTableByAttributes(this.resource, 'id', this.dataElementGroupsId, databaseName).then(function (data) {
            _this.setMetadata(data);
        }, function (error) {
            _this.setToasterMessage('Fail to load data from local storage');
        });
    };
    DataElementGroupsPage.prototype.setMetadata = function (data) {
        this.metaData = data;
    };
    DataElementGroupsPage.prototype.goToSelectedGroup = function (group) {
        var dataElementsId = [];
        group.dataElements.forEach(function (dataElement) {
            dataElementsId.push(dataElement.id);
        });
        var parameters = {
            groupName: group.name,
            dataElementsId: dataElementsId
        };
        this.navCtrl.push(data_element_list_1.DataElementListPage, parameters);
    };
    DataElementGroupsPage.prototype.setToasterMessage = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 4000
        });
        toast.present();
    };
    DataElementGroupsPage.prototype.setStickToasterMessage = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            showCloseButton: true
        });
        toast.present();
    };
    DataElementGroupsPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/data-element-groups/data-element-groups.html',
            providers: [app_1.App, http_client_1.HttpClient, sql_lite_1.SqlLite]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavParams, ionic_angular_1.NavController, sql_lite_1.SqlLite, http_client_1.HttpClient, app_1.App, ionic_angular_1.ToastController])
    ], DataElementGroupsPage);
    return DataElementGroupsPage;
})();
exports.DataElementGroupsPage = DataElementGroupsPage;
