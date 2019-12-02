import { Component } from '@angular/core';

import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component(
  {
    selector: 'auth-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
  }
)
export class SignInComponent {
  enteredValueLogin = '';
  enteredValuePassword = '';
  isLoading = false;
  changePassword = false;
  isNotAuthorized = false;
  
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {} //public authService: AuthService

  ngOnInit() {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.changePassword = this.authService.isChangePassword();
        this.isNotAuthorized = this.authService.getAuthProblems();
        this.enteredValueLogin = '';
        this.enteredValuePassword = '';
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (!this.changePassword) {
      this.authService.logIn(form.value.login, form.value.password);
      
    } else {
      this.authService.changeFirsrtPassword(form.value.password);
    }

    //form.reset();
  }
}