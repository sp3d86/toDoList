import { Component} from '@angular/core';
import { TodoDataService } from './todo-data.service';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {
    // signedIn: boolean;
    // user: any;

    // constructor( private amplifyService: AmplifyService ) {
    //     this.amplifyService.authStateChange$
    //         .subscribe(authState => {
    //             this.signedIn = authState.state === 'signedIn';
    //             if (!authState.user) {
    //                 this.user = 'Guest';
    //             } else {
    //                 this.user = authState.user;
    //             }
    //             console.log('aws-auth - ' + this.user.username);
    //     });
    // }
}
