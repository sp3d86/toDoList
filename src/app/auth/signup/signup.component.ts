import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component(
  {
    selector: 'auth-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
  }
)
export class SignUpComponent {
  enteredValueLogin = '';
  enteredValuePassword = '';
  enteredValueEmail = '';
  
  isLoading = false;
  isConfirmPassword = false;
  isNotAuthorized = false;
  
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {} //public authService: AuthService

  ngOnInit() {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isNotAuthorized = this.authService.getAuthProblems();
        this.isConfirmPassword = this.authService.getConfirmUser();
        
        this.enteredValueLogin = '';
        this.enteredValuePassword = '';
        this.enteredValueEmail = '';
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (!this.isConfirmPassword) {
      this.authService.createUser(form.value.login, form.value.password, form.value.email);
      
    } else {
      this.authService.confirmSignUp(form.value.confirmPassword);
    }

    
    //form.reset();
  }
}