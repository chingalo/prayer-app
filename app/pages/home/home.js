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
var sql_lite_1 = require("../../providers/sql-lite/sql-lite");
var HomePage = (function () {
    function HomePage(navCtrl, sqllite) {
        this.navCtrl = navCtrl;
        this.sqllite = sqllite;
        this.data = {};
        this.openDatabase();
    }
    HomePage.prototype.openDatabase = function () {
        var _this = this;
        this.sqllite.getAllDataFromTable('person', 'demo').then(function (data) {
            _this.data['person'] = data;
        });
        this.sqllite.getDataFromTableByAttributes('constants', 'id', ['0'], 'demo').then(function (data) {
            _this.data['constants'] = data;
        });
        this.sqllite.getAllDataFromTable('constants4', 'demo').then(function (data) {
            _this.data['constants4'] = data;
        });
    };
    HomePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/home/home.html',
            providers: [sql_lite_1.SqlLite]
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController, sql_lite_1.SqlLite])
    ], HomePage);
    return HomePage;
})();
exports.HomePage = HomePage;
