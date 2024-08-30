import { Component } from '@angular/core';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [],
  template:
    `
    <div class="ns-tile">
        <ng-content></ng-content>
    </div>
  `,
  styleUrl: './tile.component.scss'
})
export class TileComponent {

}
