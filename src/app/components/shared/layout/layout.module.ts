import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from "./dashboard-layout.component";
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";
import {MegaMenuModule} from "primeng/megamenu";
import {LayoutComponent} from "./layout.component";
import {TranslateModule} from "@ngx-translate/core";
import {AvatarModule} from "primeng/avatar";



@NgModule({
  declarations: [
    DashboardLayoutComponent
  ],
    imports: [
        CommonModule,
        SidebarModule,
        MenuModule,
        MegaMenuModule,
        LayoutComponent,
        TranslateModule,
        AvatarModule
    ],
  exports: [
    DashboardLayoutComponent
  ]
})
export class LayoutModule { }
