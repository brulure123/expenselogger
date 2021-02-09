import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable, throwError} from "rxjs";
import firebase from "firebase";
import UserCredential = firebase.auth.UserCredential;
import {fromPromise} from "rxjs/internal-compatibility";
import {LodashService} from "../../../services/lodash/lodash.service";

@Injectable()
export class AuthService {

  constructor(
      private fireAuth: AngularFireAuth,
      private _: LodashService) { }

  // loginWithEmailAndPassword
  loginWithEmailAndPassword(email: string, password: string): Observable<UserCredential | void>{
    if(!this._.isNull(email) && !this._.isNull(password)){
      return fromPromise(this.fireAuth.signInWithEmailAndPassword(email,password));
    } else {
      return throwError('Email or Password is Null')
    }
  }

  // RegisterWithEmailAndPassword
  registerWithEmailAndPassowrd(email: string, password: string): Observable<UserCredential | void>{
    if(!this._.isNull(email) && !this._.isNull(password)){
      return fromPromise(this.fireAuth.createUserWithEmailAndPassword(email, password));
    }else {
      return throwError('Email or Password is Null');
    }
  }

  // Logout
  logout(): Observable<void>{
    return fromPromise(this.fireAuth.signOut());
  }

  // LoginWithGoogle
}
