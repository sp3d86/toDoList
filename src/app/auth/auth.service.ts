import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private authUser: any;
  private authStatusListener = new Subject<boolean>(); 'possible change to object with params'
  private changePassword = false;
  private authProblems = false;
  private confirmUser = false;

  constructor(private amplifyService: AmplifyService, private router: Router) {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.isAuthenticated = authState.state === 'signedIn';
        
        if (!authState.user) {
          this.authUser = 'Guest';
          this.router.navigate(['/login']);
          this.authStatusListener.next(false);
        } else {
            this.authUser = authState.user;
           
            if (this.isAuthenticated) {
              this.router.navigate(['']);
              this.authStatusListener.next(true);
            }
            
        }

        console.log('aws-auth - ' + this.isAuthenticated + ' user: ' +this.authUser.username);
      });
  }

  getUserName() {
    return (this.isAuthenticated) ? this.authUser.username : 'Guest';
  }

  getConfirmUser() {
    return this.confirmUser;
  }

  isChangePassword() {
    return this.changePassword;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuthProblems() {
    return this.authProblems;
  }

  createUser(username: string, password: string, email: string) {    
    Auth.signUp({
      username,
      password,
      attributes: {
        email
      },
      validationData: []
    })
        .then(
         
          data => {
            this.authUser = data.user.getUsername();
            this.confirmUser = true;
            this.authStatusListener.next(false);
            console.log(data);
          }
          )
        .catch(
          err => console.log(err)
          );
  }

  confirmSignUp(code) {
    Auth.confirmSignUp(this.authUser, code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true    
    })
      .then(data => {
        this.confirmUser = false;
        this.router.navigate(['/login']);
        this.authStatusListener.next(false);
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  resendSignUp() {
     Auth.resendSignUp(this.authUser).then(() => {
        console.log('code resent successfully');
    }).catch(e => {
        console.log(e);
    });
  }

  logIn(userName, password) {
 
    Auth.signIn(userName, password)
      .then(data => {
         if (data.challengeName === 'NEW_PASSWORD_REQUIRED') {
              this.changePassword = true;
              this.authStatusListener.next(false);
          }
      })
      .catch(err => {
        this.authProblems = true;
        this.authStatusListener.next(false);
        console.log(err.code);
      });
  }

  async changeFirsrtPassword(password) {
    this.changePassword = false;
    try {   
        const {requiredAttributes} =   this.authUser.challengeParam; 
        const newPassword = password;
        const user = this.authUser;

        const loggedUser = await Auth.completeNewPassword(
            user,             
            newPassword,       
            requiredAttributes
        );
        
        this.authProblems = false;
        this.router.navigate(['/login']);
        this.authStatusListener.next(false);
      
    } catch (err) {
      console.log(err.code);
    }
  }


  logOut() {
    this.isAuthenticated = false;
    this.authUser = null;

    Auth.signOut();
  }
}
