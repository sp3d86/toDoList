import { Component,  OnInit, OnDestroy} from "@angular/core";

import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolBarComponent {
  userIsAuthenticated = false;
  user = 'Guest';
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.user = this.authService.getUserName();
      });
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
