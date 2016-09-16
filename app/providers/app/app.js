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
var http_1 = require('@angular/http');
var ionic_angular_1 = require('ionic-angular');
require('rxjs/add/operator/map');
var Rx_1 = require('rxjs/Rx');
var sql_lite_1 = require("../sql-lite/sql-lite");
/*
 Generated class for the App provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var App = (function () {
    function App(http, sqlLite) {
        this.http = http;
        this.sqlLite = sqlLite;
        this.localStorage = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
    }
    App.prototype.setCurrentUser = function (user) {
        this.localStorage.set('user', JSON.stringify(user));
        return Promise.resolve(user);
    };
    App.prototype.setUserData = function (userDataResponse) {
        var userData = {
            "Name": userDataResponse.name,
            "Employer": userDataResponse.employer,
            "Job Title": userDataResponse.jobTitle,
            "Education": userDataResponse.education,
            "Gender": userDataResponse.gender,
            "Birthday": userDataResponse.birthday,
            "Nationality": userDataResponse.nationality,
            "Interests": userDataResponse.interests,
            "userRoles": userDataResponse.userCredentials.userRoles,
            "organisationUnits": userDataResponse.organisationUnits
        };
        this.localStorage.set('userData', JSON.stringify(userData));
        return Promise.resolve(userData);
    };
    App.prototype.getUserData = function () {
        return this.localStorage.get('userData');
    };
    App.prototype.getCurrentUser = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.localStorage.get('user').then(function (user) {
                user = JSON.parse(user);
                resolve(user);
            }, function (err) {
                reject();
            }).catch(function (err) {
                reject();
            });
        });
    };
    App.prototype.getFormattedBaseUrl = function (url) {
        this.formattedBaseUrl = "";
        var urlToBeFormatted = "", urlArray = [], baseUrlString;
        if (!(url.split('/')[0] == "https:" || url.split('/')[0] == "http:")) {
            urlToBeFormatted = "http://" + url;
        }
        else {
            urlToBeFormatted = url;
        }
        baseUrlString = urlToBeFormatted.split('/');
        for (var index in baseUrlString) {
            if (baseUrlString[index]) {
                urlArray.push(baseUrlString[index]);
            }
        }
        this.formattedBaseUrl = urlArray[0] + '/';
        for (var i = 0; i < urlArray.length; i++) {
            if (i != 0) {
                this.formattedBaseUrl = this.formattedBaseUrl + '/' + urlArray[i];
            }
        }
        return Promise.resolve(this.formattedBaseUrl);
    };
    App.prototype.getDataBaseName = function (url) {
        var databaseName = url.replace('://', '_').replace('/', '_').replace('.', '_').replace(':', '_');
        return Promise.resolve(databaseName);
    };
    App.prototype.saveMetadata = function (resource, resourceValues, databaseName) {
        var promises = [];
        var self = this;
        return new Promise(function (resolve, reject) {
            var counter = 1;
            resourceValues.forEach(function (resourceValue) {
                promises.push(self.sqlLite.insertDataOnTable(resource, resourceValue, databaseName).then(function () {
                    //saving success
                }, function (error) {
                }));
            });
            Rx_1.Observable.forkJoin(promises).subscribe(function () {
                resolve();
            }, function (error) {
                reject(error.failure);
            });
        });
    };
    App = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, sql_lite_1.SqlLite])
    ], App);
    return App;
})();
exports.App = App;
