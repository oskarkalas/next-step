import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  secondaryDrawer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get secondaryDrawerStatus(): boolean {
    return this.secondaryDrawer.value;
  }

  secondaryDrawerToggle(): void {
    this.secondaryDrawer.next(!this.secondaryDrawer.value);
  }
}
