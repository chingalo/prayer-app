import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SqlLite} from "../../providers/sql-lite/sql-lite";

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [SqlLite]
})
export class HomePage {
  constructor(private navCtrl: NavController,private sqllite:SqlLite) {
    this.openDatabase();
  }

  openDatabase(){
    this.sqllite.generateTables('demo').then(()=>{});
  }
}
