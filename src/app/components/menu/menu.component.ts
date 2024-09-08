import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [MenubarModule, CommonModule],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Router',
        icon: 'pi pi-palette',
        items: [
          {
            label: 'Installation',
            route: '/installation'
          },
          {
            label: 'Configuration',
            route: '/configuration'
          }
        ]
      },
      {
        label: 'Programmatic',
        icon: 'pi pi-link',
        command: () => {
          this.router.navigate(['/installation']);
        }
      },
      {
        label: 'External',
        icon: 'pi pi-home',
        items: [
          {
            label: 'Angular',
            url: 'https://angular.io/'
          },
          {
            label: 'Vite.js',
            url: 'https://vitejs.dev/'
          }
        ]
      }
    ];
  }
}
