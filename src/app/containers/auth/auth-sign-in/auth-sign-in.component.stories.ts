import type { Meta, StoryObj } from '@storybook/angular';
import { AuthSignInComponent } from './auth-sign-in.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AuthSignInComponent> = {
  component: AuthSignInComponent,
  title: 'AuthSignInComponent',
};
export default meta;
type Story = StoryObj<AuthSignInComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/auth-sign-in works!/gi)).toBeTruthy();
  },
};
