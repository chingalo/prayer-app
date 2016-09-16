import { Component } from '@angular/core';
import { NavController,ToastController,NavParams } from 'ionic-angular';

import { App } from '../../providers/app/app';
import {HttpClient} from '../../providers/http-client/http-client';
import {SqlLite} from "../../providers/sql-lite/sql-lite";

import {DataElementPage} from '../data-element/data-element'

/*
  Generated class for the DataElementListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/data-element-list/data-element-list.html',
  providers: [App,HttpClient,SqlLite]
})
export class DataElementListPage {

  private resource : string = "dataElements";
  private currentUser :any = {};
  private metaData : any [];
  private groupName : string;
  private dataElementsId : Array<any>;

  constructor(private params: NavParams,private navCtrl: NavController,private sqlLite : SqlLite,private httpClient: HttpClient,private app : App,private toastCtrl: ToastController) {
    this.groupName = this.params.get('groupName');
    this.dataElementsId = this.params.get('dataElementsId');
    this.app.getCurrentUser().then(currentUser=>{
      this.currentUser = currentUser;
      this.loadingMetaData();
    })
  }


  loadingMetaData(){
    let databaseName = this.currentUser.currentDataBase;
    this.sqlLite.getDataFromTableByAttributes(this.resource,'id',this.dataElementsId,databaseName).then(data=>{
      this.setMetadata(data);
    },error=>{
      this.setToasterMessage('Fail to load data from local storage' );
    })
  }

  setMetadata(data){
    this.metaData = data;
  }

  goToSelectedDataElement(dataElement){
    let parameters = {
      dataElement : dataElement
    };
    this.navCtrl.push(DataElementPage,parameters);
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
