import { Component } from '@angular/core';
import { NavController,ToastController,NavParams } from 'ionic-angular';

import { App } from '../../providers/app/app';
import {HttpClient} from '../../providers/http-client/http-client';
import {SqlLite} from "../../providers/sql-lite/sql-lite";


import {DataElementListPage} from '../data-element-list/data-element-list'

/*
  Generated class for the DataElementGroupsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/data-element-groups/data-element-groups.html',
  providers: [App,HttpClient,SqlLite]
})
export class DataElementGroupsPage {

  private resource : string = "dataElementGroups";
  private currentUser :any = {};
  private metaData : any [];
  private groupSetName :string;
  private dataElementGroupsId : Array<any>;

  constructor(private params: NavParams,private navCtrl: NavController,private sqlLite : SqlLite,private httpClient: HttpClient,private app : App,private toastCtrl: ToastController) {
    this.groupSetName = this.params.get('groupSetName');
    this.dataElementGroupsId = this.params.get('dataElementGroupsId');
    this.app.getCurrentUser().then(currentUser=>{
      this.currentUser = currentUser;
      this.loadingMetaData();
    })
  }

  loadingMetaData(){
    let databaseName = this.currentUser.currentDataBase;
    this.sqlLite.getDataFromTableByAttributes(this.resource,'id',this.dataElementGroupsId,databaseName).then(data=>{
      this.setMetadata(data);
    },error=>{
      this.setToasterMessage('Fail to load data from local storage' );
    })
  }

  setMetadata(data){
    this.metaData = data;
  }

  goToSelectedGroup(group){
    let dataElementsId = [];
    group.dataElements.forEach(dataElement=>{
      dataElementsId.push(dataElement.id);
    });
    let parameters = {
      groupName : group.name,
      dataElementsId : dataElementsId
    };
    this.navCtrl.push(DataElementListPage,parameters);
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
