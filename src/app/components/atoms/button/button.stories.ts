import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { Simulate } from 'react-dom/test-utils';
import play = Simulate.play;
import { within } from '@storybook/testing-library';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'UI/Atoms/Buttons/Button',
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    buttonProps: {
      label: 'button label',
    }
  },
};

export const Warning: Story = {
  args: {
    severity: 'warn',
    buttonProps: {
      label: 'button label',
    }
  }
};

export const Danger: Story = {
  args: {
    severity: 'danger',
    buttonProps: {
      label: 'button label',
    }
  }
};

export const Rounded: Story = {
  args: {
    severity: 'primary',
    buttonProps: {
      rounded: true,
      label: 'button label',
    }
  }
};

export const Rounded2: Story = {
  args: {
    severity: 'primary',
    buttonProps: {
      rounded: true,
      label: 'button label',
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByText('button label');
  }
};
