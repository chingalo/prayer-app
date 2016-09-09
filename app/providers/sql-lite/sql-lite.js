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
var ionic_native_1 = require('ionic-native');
var Rx_1 = require('rxjs/Rx');
/*
  Generated class for the SqlLite provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var SqlLite = (function () {
    function SqlLite() {
        this.dataBaseStructure = {
            person: {
                columns: [
                    { value: 'firstName', type: 'TEXT' },
                    { value: 'middleName', type: 'TEXT' },
                    { value: 'lastName', type: 'TEXT' }
                ],
                fields: "fields",
                filter: "filters"
            },
            constants: {
                columns: [
                    { value: 'id', type: 'TEXT' },
                    { value: 'value', type: 'TEXT' }
                ],
                fields: "fields",
                filter: "filters"
            },
            constants4: {
                columns: [
                    { value: 'id', type: 'TEXT' },
                    { value: 'value', type: 'TEXT' }
                ],
                fields: "fields",
                filter: "filters"
            },
        };
    }
    SqlLite.prototype.getDataBaseStructure = function () {
        return this.dataBaseStructure;
    };
    SqlLite.prototype.generateTables = function (databaseName) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var promises = [];
            var tableNames = Object.keys(self.dataBaseStructure);
            tableNames.forEach(function (tableName) {
                console.log('tableNames :: ' + tableName);
                promises.push(self.createTable(tableName, databaseName).then(function () {
                    console.log('success :: ' + tableName);
                }).catch(function (err) {
                    console.log('err :: ' + JSON.stringify(err) + ' :: ' + tableName);
                }));
            });
            Rx_1.Observable.forkJoin(promises).subscribe(function () {
                console.log('Success');
                resolve();
            }, function (err) {
                console.log('Fail ' + JSON.stringify(err));
                reject();
            });
        });
    };
    SqlLite.prototype.openDatabase = function (databaseName) {
        return new Promise(function (resolve, reject) {
            var db = new ionic_native_1.SQLite();
            db.openDatabase({
                name: 'data.db',
                location: 'default'
            }).then(function () {
                console.log('success');
                resolve('success');
            }, function (err) {
                reject('Unable to open database: ' + JSON.stringify(err));
                console.log('Unable to open database: ' + err);
            });
        });
    };
    SqlLite.prototype.createTable = function (tableName, databaseName) {
        var self = this;
        databaseName = databaseName + '.db';
        return new Promise(function (resolve, reject) {
            var query = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (';
            var columns = self.dataBaseStructure[tableName].columns;
            columns.forEach(function (column, index) {
                if (column.value == "id") {
                    query += column.value + " " + column.type + ' primary key';
                }
                else {
                    query += column.value + " " + column.type;
                }
                if ((index + 1) < columns.length) {
                    query += ',';
                }
            });
            query += ')';
            var db = new ionic_native_1.SQLite();
            db.openDatabase({ name: databaseName, location: 'default' }).then(function () {
                db.executeSql(query, []).then(function (success) {
                    resolve();
                }, function (err) {
                    reject();
                });
            }, function (err) {
                reject();
            });
        });
    };
    SqlLite = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SqlLite);
    return SqlLite;
})();
exports.SqlLite = SqlLite;
