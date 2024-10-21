import type { Meta, StoryObj } from '@storybook/angular';
import { UserAvatarComponent } from './user-avatar.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const avatarImage: string = 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=900&t=st=1728333803~exp=1728334403~hmac=693cdd742f16d3da1f193451669c72604f7b18008c8ccc3106b177e7e1dfbe66';

const meta: Meta<UserAvatarComponent> = {
  component: UserAvatarComponent,
  title: 'Atoms / User Avatar',
  argTypes: {
    size: {
      options: ['xlarge', 'large', 'normal'],
      control: { type: 'select' },
    },
    shape: {
      options: ['circle', 'square'],
      control: { type: 'select' },
    },
  }
};

export default meta;
type Story = StoryObj<UserAvatarComponent>;

export const AvatarWithImageXL: Story = {
  args: {
    size: 'xlarge',
    shape: 'circle',
    userData: {
      firstName: 'Jaroslav',
      lastName: 'Hoffman',
      picture: avatarImage,
    }
  },
};

export const AvatarWithImageL: Story = {
  args: {
    size: 'large',
    shape: 'circle',
    userData: {
      firstName: 'Jaroslav',
      lastName: 'Hoffman',
      picture: avatarImage,
    },
  },
};

export const AvatarWithImageNormal: Story = {
  args: {
    size: 'normal',
    shape: 'circle',
    userData: {
      firstName: 'Jaroslav',
      lastName: 'Hoffman',
      picture: avatarImage,
    }
  },
};

export const AvatarWithoutImage: Story = {
  args: {
    size: 'normal',
    shape: 'circle',
    userData: {
      firstName: 'Jaroslav',
      lastName: 'Hoffman',
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/JH/gi)).toBeTruthy();
  },
};

export const AvatarWithoutUserName: Story = {
  args: {
    size: 'normal',
    shape: 'circle',
  },
};
