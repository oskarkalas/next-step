import type { Meta, StoryObj } from '@storybook/angular';
import { SplitButtonComponent } from './split-button.component';

const meta: Meta<SplitButtonComponent> = {
  component: SplitButtonComponent,
  title: 'Atoms/Split Button',
};
export default meta;
type Story = StoryObj<SplitButtonComponent>;

export const Primary: Story = {
  args: {
    severity:  'primary',
    dropdownIcon: 'pi pi-cog',
    buttonProps: {
      icon: 'pi pi-check',
      label: 'settings',
    },
    menuItems: [
      {
        label: 'Item 1',
        command: (event) => { console.log(event)}
      },
      {
        label: 'Item 2',
        command: (event) => { console.log(event)}
      },
      {
        label: 'Item 3',
        command: (event) => { console.log(event)}
      }
    ]
  }
};

