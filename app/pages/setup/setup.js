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
/*
  Generated class for the SetupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SetupPage = (function () {
    function SetupPage(navCtrl, toastCtrl, app) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.app = app;
        this.data = {};
        this.loadingMessages = [];
        this.loadingData = false;
        this.data.setUpTitle = "Prayer App 1.0";
        //this.data.logoUrl = 'img/prayer.jpg';
        this.reAuthenticateUser();
    }
    SetupPage.prototype.reAuthenticateUser = function () {
        this.setToasterMessage('reAuthenticateUser');
        this.app.getCurrentUser().then(function (user) {
            console.log(user);
        });
    };
    SetupPage.prototype.loginToServer = function () {
        this.app.setCurrentUser(this.data).then(function (user) {
            console.log(user);
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
            providers: [app_1.App]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, ionic_angular_1.ToastController, app_1.App])
    ], SetupPage);
    return SetupPage;
})();
exports.SetupPage = SetupPage;
