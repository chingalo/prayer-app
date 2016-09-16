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
var sql_lite_1 = require("../../providers/sql-lite/sql-lite");
var http_client_1 = require('../../providers/http-client/http-client');
var data_element_groups_set_1 = require('../data-element-groups-set/data-element-groups-set');
/*
 Generated class for the SetupPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var SetupPage = (function () {
    function SetupPage(httpClient, app, sqlLite, navCtrl, toastCtrl) {
        var _this = this;
        this.httpClient = httpClient;
        this.app = app;
        this.sqlLite = sqlLite;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.data = {};
        this.loadingMessages = [];
        this.loadingData = false;
        this.data.setUpTitle = "Prayer App 1.0";
        this.data.setUpShortDescription = "It's just simple setup page";
        //this.data.logoUrl = 'img/prayer.jpg';
        this.app.getCurrentUser().then(function (user) {
            console.log(user);
            _this.reAuthenticateUser(user);
        });
    }
    SetupPage.prototype.reAuthenticateUser = function (user) {
        if (user.hasData) {
            this.navCtrl.setRoot(data_element_groups_set_1.DataElementGroupsSetPage);
        }
        else if (user.serverUrl) {
            this.data.serverUrl = user.serverUrl;
            if (user.username) {
                this.data.username = user.username;
            }
        }
    };
    SetupPage.prototype.loginToServer = function () {
        var _this = this;
        this.data.hasData = false;
        if (this.data.serverUrl) {
            this.app.getFormattedBaseUrl(this.data.serverUrl)
                .then(function (formattedBaseUrl) {
                _this.data.serverUrl = formattedBaseUrl;
                if (!_this.data.username) {
                    _this.setToasterMessage('Please Enter username');
                }
                else if (!_this.data.password) {
                    _this.setToasterMessage('Please Enter password');
                }
                else {
                    _this.loadingData = true;
                    _this.loadingMessages = [];
                    _this.app.getDataBaseName(_this.data.serverUrl).then(function (databaseName) {
                        //generate tables
                        _this.setLoadingMessages('Opening database');
                        _this.sqlLite.generateTables(databaseName).then(function () {
                            _this.data.currentDataBase = databaseName;
                            _this.setLoadingMessages('Authenticating user');
                            var fields = "fields=[:all],userCredentials[userRoles[name,programs[id,name]]";
                            _this.httpClient.get('/api/me.json?' + fields, _this.data).subscribe(function (userData) {
                                _this.downLoadDataElementGroupSets();
                            }, function (error) {
                                _this.loadingData = false;
                                _this.setStickToasterMessage('Fail to login Fail to load System information, please checking your network connection');
                                console.log(error);
                            });
                        }, function (error) {
                            //error on create database
                            _this.loadingData = false;
                            _this.setStickToasterMessage('Fail to open database');
                            console.log(error);
                        });
                    });
                }
            });
        }
        else {
            this.setToasterMessage('Please Enter server url');
        }
    };
    SetupPage.prototype.downLoadDataElementGroupSets = function () {
        var _this = this;
        this.setLoadingMessages('Downloading data element group sets');
        var resource = 'dataElementGroupSets';
        var tableMetadata = this.sqlLite.getDataBaseStructure()[resource];
        var fields = tableMetadata.fields;
        this.httpClient.get('/api/' + resource + '.json?paging=false&fields=' + fields, this.data).subscribe(function (data) {
            var responseData = data.json();
            _this.setLoadingMessages('Starting saving ' + responseData[resource].length + ' data element group sets');
            _this.app.saveMetadata(resource, responseData[resource], _this.data.currentDataBase).then(function () {
                _this.downLoadDataElementGroups();
            }, function (error) {
                _this.loadingData = false;
                _this.setStickToasterMessage('Fail to save data element group sets :: ' + JSON.stringify(error));
            });
        }, function (error) {
            _this.loadingData = false;
            _this.setStickToasterMessage('Fail to login Fail to downloading data element group sets');
            console.log(error);
        });
    };
    SetupPage.prototype.downLoadDataElementGroups = function () {
        var _this = this;
        this.setLoadingMessages('Downloading data element groups');
        var resource = 'dataElementGroups';
        var tableMetadata = this.sqlLite.getDataBaseStructure()[resource];
        var fields = tableMetadata.fields;
        this.httpClient.get('/api/' + resource + '.json?paging=false&fields=' + fields, this.data).subscribe(function (data) {
            var responseData = data.json();
            _this.setLoadingMessages('Starting saving ' + responseData[resource].length + ' data element groups');
            _this.app.saveMetadata(resource, responseData[resource], _this.data.currentDataBase).then(function () {
                _this.downLoadDataElements();
            }, function (error) {
                _this.loadingData = false;
                _this.setStickToasterMessage('Fail to save data element groups :: ' + JSON.stringify(error));
            });
        }, function (error) {
            _this.loadingData = false;
            _this.setStickToasterMessage('Fail to login Fail to data element groups');
            console.log(error);
        });
    };
    SetupPage.prototype.downLoadDataElements = function () {
        var _this = this;
        this.setLoadingMessages('Downloading  data elements');
        var resource = 'dataElements';
        var tableMetadata = this.sqlLite.getDataBaseStructure()[resource];
        var fields = tableMetadata.fields;
        this.httpClient.get('/api/' + resource + '.json?paging=false&fields=' + fields, this.data).subscribe(function (data) {
            var responseData = data.json();
            _this.setLoadingMessages('Starting saving ' + responseData[resource].length + ' data elements');
            _this.app.saveMetadata(resource, responseData[resource], _this.data.currentDataBase).then(function () {
                _this.data.hasData = true;
                _this.app.setCurrentUser(_this.data).then(function (user) {
                    _this.navCtrl.setRoot(data_element_groups_set_1.DataElementGroupsSetPage);
                });
            }, function (error) {
                _this.loadingData = false;
                _this.setStickToasterMessage('Fail to save data elements :: ' + JSON.stringify(error));
            });
        }, function (error) {
            _this.loadingData = false;
            _this.setStickToasterMessage('Fail to login Fail to downloading data elements');
            console.log(error);
        });
    };
    SetupPage.prototype.setLoadingMessages = function (message) {
        this.loadingMessages.push(message);
    };
    SetupPage.prototype.setToasterMessage = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 4000
        });
        toast.present();
    };
    SetupPage.prototype.setStickToasterMessage = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            showCloseButton: true
        });
        toast.present();
    };
    SetupPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/setup/setup.html',
            providers: [app_1.App, sql_lite_1.SqlLite, http_client_1.HttpClient]
        }), 
        __metadata('design:paramtypes', [http_client_1.HttpClient, app_1.App, sql_lite_1.SqlLite, ionic_angular_1.NavController, ionic_angular_1.ToastController])
    ], SetupPage);
    return SetupPage;
})();
exports.SetupPage = SetupPage;
