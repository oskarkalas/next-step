import { Route } from '@angular/router';
import { ContainerPathsEnum } from './core/enums/container-paths.enum';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';


export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: ContainerPathsEnum.AUTH,
    pathMatch: 'full'
  },
  {
    path: 'auth/callback',
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
    loadChildren: () =>
      import('./containers/auth/auth.routes').then(route => route.authRoutes),
    canActivate: [LoginGuard]
  }
];
