import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user$: Observable<firebase.User>;
  user;
  aa: number;
  users: string[] = [];
  myObs: Observable<string>;


  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private http: HttpClient) {
  }

  login(credentials) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[AIzaSyBP4uPVE8bOf0sZE1efL3O-DGfbRaJ5rZk]', JSON.stringify(credentials));
  }

  registerUser(data) {
    this.db.list('/users').push({
      name: data.fullName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber
    })
  }

  // getAllEmails() {
  //   return this.db.list('/users');
  // }

  loginWithGoogle() {
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  // logout() {
  //   this.afAuth.signOut();
  // }
}
