import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: 'UI/Atoms/Input',
  argTypes: {
    variant: {
      options: ['filled', 'outlined'],
      control: { type: 'select' },
    }
  }
};
export default meta;
type Story = StoryObj<InputComponent>;

export const inputText: Story = {
  args: {
    placeholder: 'placeholder text',
    variant: 'outlined',
    value: '',
    disabled: false,
  },
};

export const inputTextDisabled: Story = {
  args: {
    placeholder: 'placeholder text',
    value: '',
    variant: 'outlined',
    disabled: true,
  },
};
