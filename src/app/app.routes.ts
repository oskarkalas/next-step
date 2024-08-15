import {Route} from "@angular/router";
import {AuthContainer} from "./components/auth/auth.container";
import {ModulePathsEnum} from "./core/enums/module-paths.enum";
import {AuthGuard} from "./guards/auth.guard";

export const LOGIN_ROUTES: Route[] = [
  {path: '', component: AuthContainer}
];

export const appRoutes: Route[] = [
  { path: '',
    redirectTo: ModulePathsEnum.LOGIN,
    pathMatch: 'full'
  },
  { path: ModulePathsEnum.DASHBOARD,
    loadChildren: () => import('./components/dashboard/dashboard.routes').then(mod => mod.dashboardRoutes),
    canActivate: [AuthGuard]
  },
  { path: ModulePathsEnum.LOGIN,
    component: AuthContainer}
];
