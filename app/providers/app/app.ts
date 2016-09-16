import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import { Storage, LocalStorage } from 'ionic-angular';

/*
  Generated class for the App provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class App {

  private localStorage : Storage;

  constructor(private http: Http) {

    this.localStorage = new Storage(LocalStorage);
  }

  setCurrentUser(user){
    this.localStorage.set('user',JSON.stringify(user));
    return Promise.resolve(user);
  }

  getCurrentUser(){
    let self = this;
    return  new Promise(function(resolve,reject){
      self.localStorage.get('user').then(user=>{
        user = JSON.parse(user);
        resolve(user);
      },err=>{
        reject();
      }).catch(err=>{
        reject();
      })

    })
  }

}

