import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignIn, SignUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) {}
  useSignUp(userData: SignUp) {
    this.http
      .post('http://localhost:3000/users', userData, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      });
  }
  userSignIn(userData: SignIn) {
    this.http
      .get<SignIn>(
        `http://localhost:3000/users?email=${userData.email}&password=${userData.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body?.length) {
          this.invalidUserAuth.emit(false)
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
        }else{
          this.invalidUserAuth.emit(true)
        }
      });
  }
  userAuhReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
