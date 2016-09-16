import { Component } from '@angular/core';
import { NavController,ToastController,NavParams} from 'ionic-angular';

import { App } from '../../providers/app/app';
import {HttpClient} from '../../providers/http-client/http-client';
import {SqlLite} from "../../providers/sql-lite/sql-lite";

/*
  Generated class for the DataElementPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/data-element/data-element.html',
  providers: [App,HttpClient,SqlLite]
})
export class DataElementPage {

  private currentUser :any = {};
  private dataElement : any = {};

  constructor(private params: NavParams,private navCtrl: NavController,private sqlLite : SqlLite,private httpClient: HttpClient,private app : App,private toastCtrl: ToastController) {
    this.app.getCurrentUser().then(currentUser=>{
      this.currentUser = currentUser;
      this.dataElement = this.params.get('dataElement');
    })
  }



  setToasterMessage(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }

  setStickToasterMessage(message){
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton : true
    });
    toast.present();
  }

}
