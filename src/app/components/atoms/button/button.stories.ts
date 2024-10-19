import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'Atoms/Button',
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    buttonProps: {
      label: 'button label',
    }
  }
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
