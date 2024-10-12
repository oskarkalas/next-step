import type { Meta, StoryObj } from '@storybook/angular';
import { LeftSideComponent } from './left-side.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<LeftSideComponent> = {
  component: LeftSideComponent,
  title: 'LeftSideComponent',
};
export default meta;
type Story = StoryObj<LeftSideComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/left-side works!/gi)).toBeTruthy();
  },
};
