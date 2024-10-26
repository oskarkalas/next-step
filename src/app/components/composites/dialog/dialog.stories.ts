import { Meta, type StoryObj } from '@storybook/angular';
import { DialogComponent } from './dialog.component';


export default {
  title: 'Composites/Dialog/Dynamic Dialog',
  component: DialogComponent,
} as Meta;

type Story = StoryObj<DialogComponent>;
export const Primary: Story = {
  args: {
    dialogProps: {
      header: 'Dynamic dialog',
      width: '50vw',
      dismissableMask: true,
      modal: true,
      closable: true,
    }
  }
};
