import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';

import { App } from '../../providers/app/app';

import {DataElementGroupsSetPage} from '../data-element-groups-set/data-element-groups-set';

/*
  Generated class for the SetupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/setup/setup.html',
  providers: [App]
})
export class SetupPage {

  private data : any = {};
  private loadingData: boolean;
  private loadingMessages : any = [];

  constructor(private navCtrl: NavController,private toastCtrl: ToastController,private app : App) {
    this.loadingData = false;
    this.data.setUpTitle = "Prayer App 1.0";
    //this.data.logoUrl = 'img/prayer.jpg';
    this.app.getCurrentUser().then(user=>{
      console.log(user);
      this.reAuthenticateUser(user);
    })
  }

  reAuthenticateUser(user){
    if(user.hasData){
      this.navCtrl.setRoot(DataElementGroupsSetPage);
    }else if(user.serverUrl){
      this.data.serverUrl = user.serverUrl;
      if(user.username){
        this.data.username = user.username;
      }
    }
  }

  loginToServer(){
    this.data.hasData = true;
    this.app.setCurrentUser(this.data).then(user=>{
      console.log(user);
    })
  }


  setLoadingMessages(message){
    this.loadingMessages.push(message);
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
