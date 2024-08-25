import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: `
    <div class="pageLayoutWrapper">
      <div class="top">top menu</div>
      <div class="main">
        <router-outlet></router-outlet>
      </div>
      <div class="bottom">footer</div>
    </div>
  `
})
export class AuthLayoutComponent {}
