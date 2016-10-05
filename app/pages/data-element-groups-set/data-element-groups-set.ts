import { Component } from '@angular/core';
import { NavController,ToastController,ViewController,PopoverController } from 'ionic-angular';

import { App } from '../../providers/app/app';
import {HttpClient} from '../../providers/http-client/http-client';
import {SqlLite} from "../../providers/sql-lite/sql-lite";

import {DataElementGroupsPage} from '../data-element-groups/data-element-groups';
import {DataElementListPage} from "../data-element-list/data-element-list";

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="updateData()">Update</button>
      <button ion-item (click)="logOut()">Log out</button>
    </ion-list>
  `
})

class PopoverPage {

  constructor(public viewCtrl: ViewController) { }

  updateData() {
    alert('Read to update data');
    this.viewCtrl.dismiss();
  }
  logOut(){
    alert('Ready to log out');
    this.viewCtrl.dismiss();
  }
}

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
  private currentGroupSet : string;

  constructor(private popoverCtrl: PopoverController,private navCtrl: NavController,private sqlLite : SqlLite,private httpClient: HttpClient,private app : App,private toastCtrl: ToastController) {
    this.app.getCurrentUser().then(currentUser=>{
      this.currentUser = currentUser;
      this.loadingMetaData()
    })
  }


  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
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
    if(data.length > 0){
      this.currentGroupSet = data[0].id;
    }
    this.metaData = data;
  }

  showSegment(currentGroupId){
    this.currentGroupSet = currentGroupId;
  }

  goToSelectedGroup(group){
    this.loadingSelectedGroupMetadata(group);
  }

  loadingSelectedGroupMetadata(group){
    let databaseName = this.currentUser.currentDataBase;
    let attributeValue = [];
    attributeValue.push(group.id);
    this.sqlLite.getDataFromTableByAttributes('dataElementGroups','id',attributeValue,databaseName).then(metaData=>{
      this.setSelectedGroupMetadata(metaData);
    },error=>{
      this.setToasterMessage('Fail to load data from local storage' );
    })
  }

  setSelectedGroupMetadata(metaData){
    let group = metaData[0];
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
