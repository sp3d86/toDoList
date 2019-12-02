import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/login/signin.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './auth/signup/signup.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: SignInComponent},
    {path: 'signup', component: SignUpComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}