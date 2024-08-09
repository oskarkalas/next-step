import {Route} from "@angular/router";
import {AuthContainer} from "./components/auth/auth.container";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

export const LOGIN_ROUTES: Route[] = [
  {path: '', component: AuthContainer}
];

export const APP_ROUTES: Route[] = [
  {path: '', component: DashboardComponent}
];
