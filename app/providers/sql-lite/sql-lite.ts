import { Injectable } from '@angular/core';
import { SQLite} from 'ionic-native';
import {Observable} from 'rxjs/Rx';

/*
  Generated class for the SqlLite provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SqlLite {

  private db: any;

  private dataBaseStructure: any= {
    person : {
      columns : [
        {value: 'firstName', type: 'TEXT'},
        {value: 'middleName', type: 'TEXT'},
        {value: 'lastName', type: 'TEXT'}
      ],
      fields : "fields",
      filter:"filters"
    },
    constants: {
      columns: [
        {value: 'id', type: 'TEXT'},
        {value: 'value', type: 'TEXT'}
      ],
      fields : "fields",
      filter:"filters"
    },
    constants4: {
      columns: [
        {value: 'id', type: 'TEXT'},
        {value: 'value', type: 'TEXT'}
      ],
      fields : "fields",
      filter:"filters"
    },
  };

  constructor() {
  }

  getDataBaseStructure(){
    return this.dataBaseStructure;
  }

  generateTables(databaseName){
    let self = this;
    return new Promise(function(resolve, reject) {
      let promises = [];
      let tableNames = Object.keys(self.dataBaseStructure);
      tableNames.forEach((tableName: any) => {
        console.log('tableNames :: ' + tableName);
        promises.push(self.createTable(tableName,databaseName).then(()=>{
            console.log('success :: ' + tableName);
          }).catch(err=>{
            console.log('err :: ' + JSON.stringify(err) + ' :: '  + tableName);
          })
        );
      });
      Observable.forkJoin(promises).subscribe(
        () => {
          console.log('Success');
          resolve()
        },
        err => {
          console.log('Fail ' +JSON.stringify(err));
          reject();
        }
      );
    });
  }

  openDatabase(databaseName){
    return new Promise(function(resolve, reject) {
      let db = new SQLite();
      db.openDatabase({
        name: 'data.db',
        location: 'default'
      }).then(() => {
        console.log('success');
        resolve('success');
      }, (err) => {
        reject('Unable to open database: ' + JSON.stringify(err));
        console.log('Unable to open database: ' + err);
      });
    });

  }

  createTable(tableName,databaseName){
    let self = this;
    databaseName = databaseName + '.db';
    return new Promise(function(resolve, reject) {
      let query = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (';
      let columns = self.dataBaseStructure[tableName].columns;
      columns.forEach((column: any,index:any) => {
        if (column.value == "id") {
          query += column.value + " " + column.type + ' primary key';
        } else {
          query += column.value + " " + column.type;
        }
        if ((index + 1) < columns.length) {
          query += ','
        }
      });
      query += ')';
      let db = new SQLite();
      db.openDatabase({name: databaseName,location: 'default'}).then(() => {
        db.executeSql(query, []).then((success) => {
          resolve();
        }, (err) => {
          reject();
        });
      }, (err) => {
        reject();
      });
    });
  }


}

