import type { Meta, StoryObj } from '@storybook/angular';
import { DrawerSecondaryComponent } from './drawer-secondary.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DrawerSecondaryComponent> = {
  component: DrawerSecondaryComponent,
  title: 'DrawerSecondaryComponent',
};
export default meta;
type Story = StoryObj<DrawerSecondaryComponent>;

export const Primary: Story = {
  args: {
    position: 'right',
  },
};

export const Heading: Story = {
  args: {
    position: 'right',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/drawer-secondary works!/gi)).toBeTruthy();
  },
};
