import type { Meta, StoryObj } from '@storybook/angular';
import { AuthSignUpComponent } from './auth-sign-up.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AuthSignUpComponent> = {
  component: AuthSignUpComponent,
  title: 'AuthSignUpComponent',
};
export default meta;
type Story = StoryObj<AuthSignUpComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/auth-sign-up works!/gi)).toBeTruthy();
  },
};
