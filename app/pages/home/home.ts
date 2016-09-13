import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SqlLite} from "../../providers/sql-lite/sql-lite";

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [SqlLite]
})
export class HomePage {

  private data :any = {};
  constructor(private navCtrl: NavController,private sqllite:SqlLite) {
    this.openDatabase();
  }

  openDatabase(){
    this.sqllite.getAllDataFromTable('person','demo').then(data=>{
      this.data['person'] = data;
    });
    this.sqllite.getDataFromTableByAttributes('constants','id',['0'],'demo').then(data=>{
      this.data['constants'] = data;
    });
    this.sqllite.getAllDataFromTable('constants4','demo').then(data=>{
      this.data['constants4'] = data;
    });
  }
}
