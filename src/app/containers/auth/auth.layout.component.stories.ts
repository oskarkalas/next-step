import type { Meta, StoryObj } from '@storybook/angular';
import { AuthLayoutComponent } from './auth.layout.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AuthLayoutComponent> = {
  component: AuthLayoutComponent,
  title: 'AuthLayoutComponent',
};
export default meta;
type Story = StoryObj<AuthLayoutComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/auth.layout works!/gi)).toBeTruthy();
  },
};
