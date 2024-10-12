import type { Meta, StoryObj } from '@storybook/angular';
import { UserAvatarComponent } from './user-avatar.component';

const meta: Meta<UserAvatarComponent> = {
  component: UserAvatarComponent,
  title: 'UserAvatarComponent',
};
export default meta;
type Story = StoryObj<UserAvatarComponent>;

export const Primary: Story = {
  args: {
    userData: {
      firstName: 'Jaroslav',
      lastName: 'Hoffman',
      picture: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=900&t=st=1728333803~exp=1728334403~hmac=693cdd742f16d3da1f193451669c72604f7b18008c8ccc3106b177e7e1dfbe66',
    }
  },
};
