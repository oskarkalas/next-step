import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'UI/Atoms/Card',
};
export default meta;
type Story = StoryObj<CardComponent>;

export const Primary: Story = {
  args: {
    header: 'card',
    subheader: 'subheader',
    content: `Lorem ipsum dolor <strong>bold text</strong> `,
    cardConfig: {
      header: 'card',
      subheader: 'subheader',
      content: 'htmlContent',
    },
  },
};

export const Primary2: Story = {
  args: {
    header: 'card',
    subheader: 'subheader',
    content: 'htmlContent',
  },
};
