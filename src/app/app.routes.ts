import {Route} from "@angular/router";
import {ModulePathsEnum} from "./core/enums/module-paths.enum";
import {AuthGuard} from "./guards/auth.guard";


export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: ModulePathsEnum.AUTH,
    pathMatch: 'full'
  },
  {
    path: ModulePathsEnum.DASHBOARD,
    loadChildren: () => import('./containers/dashboard/dashboard.routes').then(mod => mod.dashboardRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: ModulePathsEnum.AUTH,
    loadChildren: () => import('./containers/auth/auth.routes').then(mod => mod.authRoutes),
  }
];
