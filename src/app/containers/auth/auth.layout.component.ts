import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {MenuComponent} from "../../components/molecules/menu/menu.component";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent
  ],
  template: `
    <div class="pageLayoutWrapper">
      <div class="top"></div>
      <div class="main">
        <router-outlet></router-outlet>
      </div>
      <div class="bottom">footer</div>
    </div>
  `,
  styleUrl: "./auth.layout.component.scss"
})
export class AuthLayoutComponent {}
