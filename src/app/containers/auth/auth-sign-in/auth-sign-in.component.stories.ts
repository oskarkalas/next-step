import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { AuthSignInComponent } from './auth-sign-in.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../../state/reducers/auth.reducer';

const meta: Meta<AuthSignInComponent> = {
  component: AuthSignInComponent,
  title: 'AuthSignInComponent',
  decorators: [
    moduleMetadata({
      providers: [
        provideMockStore({ initialState })
      ]
    })
  ]
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
