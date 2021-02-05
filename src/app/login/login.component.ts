import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private db: AngularFireDatabase) { }

  ngOnInit(): void {
    // this.user = this.db.list('/users').valueChanges().subscribe(data => {
    //   this.user = data;
    //   for (let index in this.user) {
    //     this.raw.push(this.user[index].email);
    //   }
    //   console.log(this.raw);
    // })
  }
  onSave(credentials) {
    this.auth.login(credentials)
      .subscribe(data => {
        console.log(data);
      })
    // console.log(credentials);
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
}
