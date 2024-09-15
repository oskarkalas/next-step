import {Component, Input} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {User} from "../../../../generated/gql.types";

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [
    AvatarModule
  ],
  template: `
    <div class="userAvatar">
      @if (userData) {
        @if(userData.picture) {
          <p-avatar shape="circle" [image]="userData.picture"/>
        } @else {
          <p-avatar [label]="getInitialFromName(userData)"
                    shape="circle"
                    [icon]="'pi pi-user'">
          </p-avatar>
        }
      }
    </div>
  `
})
export class UserAvatarComponent {
 @Input() userData?: User | null;

  getInitialFromName(user: User | null | undefined): string {
    if(user?.lastName && user?.firstName) {
      return (user.firstName.slice(0,1) + user?.lastName.slice(0,1)).toUpperCase();
    } else {
      return 'U';
    }
  }
}
