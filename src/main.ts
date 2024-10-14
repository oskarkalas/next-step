import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

import {bootstrapConfig} from "./bootstrap.config";

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, bootstrapConfig).catch(err => console.error(err));
