import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {User} from "../../../../generated/gql.types";

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [
    AvatarModule
  ],
  template: `
    <div class="userAvatar" #userImgAvatar>
      <p-avatar shape="circle"
                size="normal"
                [image]="userData?.picture"
                [label]="!userData?.picture ? getInitialFromName(userData) : ''" />
    </div>
  `
})
export class UserAvatarComponent implements AfterViewInit {
  @Input() userData?: Partial<User> | null;
  @ViewChild('userImgAvatar') userImgAvatar: ElementRef<HTMLElement> | undefined
  avatarComplete: boolean | undefined;


  ngAfterViewInit() {
    const imgElement: HTMLImageElement | undefined = this.userImgAvatar?.nativeElement?.getElementsByTagName('img')[0];
    // check if is complete loaded image from external source
    this.avatarComplete = !!imgElement?.complete;
  }

  getInitialFromName(user: Partial<User> | null | undefined): string {
    if(user?.lastName && user?.firstName) {
      return (user.firstName.slice(0,1) + user?.lastName.slice(0,1)).toUpperCase();
    } else {
      return 'U';
    }
  }
}
