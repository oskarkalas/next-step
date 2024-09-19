import {Route} from "@angular/router";
import {ContainerPathsEnum} from "./core/enums/container-paths.enum";
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from "./guards/login.guard";


export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: ContainerPathsEnum.AUTH,
    pathMatch: 'full'
  },
  {
    path: ContainerPathsEnum.DASHBOARD,
    loadChildren: () => import('./containers/dashboard/dashboard.routes').then(route => route.dashboardRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: ContainerPathsEnum.AUTH,
    loadChildren: () => import('./containers/auth/auth.routes').then(route => route.authRoutes),
    canActivate: [LoginGuard]
  }
];
