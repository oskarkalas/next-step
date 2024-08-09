import {Component} from "@angular/core";
import {AuthSignInComponent} from "./auth-sign-in.component";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [
    AuthSignInComponent
  ],
  template: `
    <app-auth-sign-in></app-auth-sign-in>
  `
})
export class AuthContainer {

}
