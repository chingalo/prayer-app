import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';

import { App } from '../../providers/app/app';
import {HttpClient} from '../../providers/http-client/http-client';
import {SqlLite} from "../../providers/sql-lite/sql-lite";

import {DataElementGroupsPage} from '../data-element-groups/data-element-groups';

/*
  Generated class for the DataElementGroupsSetPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/data-element-groups-set/data-element-groups-set.html',
  providers: [App,HttpClient,SqlLite]
})
export class DataElementGroupsSetPage {

  private resource : string = "dataElementGroupSets";
  private currentUser :any = {};
  private metaData : any [];

  constructor(private navCtrl: NavController,private sqlLite : SqlLite,private httpClient: HttpClient,private app : App,private toastCtrl: ToastController) {
    this.app.getCurrentUser().then(currentUser=>{
      this.currentUser = currentUser;
      this.loadingMetaData()
    })
  }

  loadingMetaData(){
    let databaseName = this.currentUser.currentDataBase;
    this.sqlLite.getAllDataFromTable(this.resource,databaseName).then(data=>{
      this.setMetadata(data);
    },error=>{
      this.setToasterMessage('Fail to load data from local storage' );
    })
  }

  setMetadata(data){
    this.metaData = data;
  }

  goToSelectedGroupSet(groupSet){
    let dataElementGroupsId = [];
    groupSet.dataElementGroups.forEach(dataElementGroup=>{
      dataElementGroupsId.push(dataElementGroup.id);
    });
    let parameters = {
      groupSetName : groupSet.name,
      dataElementGroupsId : dataElementGroupsId
    };
    this.navCtrl.push(DataElementGroupsPage,parameters);
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
