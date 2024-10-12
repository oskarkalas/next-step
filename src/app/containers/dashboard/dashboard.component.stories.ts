import type { Meta, StoryObj } from '@storybook/angular';
import { DashboardComponent } from './dashboard.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DashboardComponent> = {
  component: DashboardComponent,
  title: 'DashboardComponent',
};
export default meta;
type Story = StoryObj<DashboardComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dashboard works!/gi)).toBeTruthy();
  },
};
