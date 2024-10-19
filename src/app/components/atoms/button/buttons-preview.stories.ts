import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { ButtonProps } from 'primeng/button';

export default {
  title: 'Atoms/Button',
  component: ButtonComponent,
  argTypes: {
    buttons: {
      control: 'object',
      description: 'Pole konfigurací tlačítek',
    },
  },
} as Meta<ButtonComponent>;

type StoryButtonProps = {
  buttonProps: ButtonProps,
  storyItem?: string,
};

interface ButtonsArgs {
  buttons?: Array<StoryButtonProps>;
  byType?: string;
}

const ButtonsTemplate = (args: ButtonsArgs) => ({
  props: args,
  template: `
    <h2>{{byType}}</h2>
    <div style="display: flex; flex-direction: column; gap: 10px;" class="dark-mode">
      <ng-container *ngFor="let button of buttons; let i = index; trackBy: trackByFn">
      <div>
        <div style="margin-bottom: 10px"><strong>{{button.storyItem ?? '&nbsp;'}}</strong></div>
        <app-button [buttonProps]="button.buttonProps"></app-button>
      </div>
      </ng-container>
    </div>
  `,
});

export const ButtonsBySeverity: StoryObj<ButtonsArgs> = {
  render: ButtonsTemplate,
  args: {
    byType: 'Buttons by severity',
    buttons: [
      {buttonProps: {label: 'Button', severity: 'primary'}, storyItem: 'primary'},
      {buttonProps: {label: 'Button', severity: 'secondary'}, storyItem: 'secondary'},
      {buttonProps: {label: 'Button', severity: 'success'}, storyItem: 'success'},
      {buttonProps: {label: 'Button', severity: 'info'}, storyItem: 'info'},
      {buttonProps: {label: 'Button', severity: 'help'}, storyItem: 'help'},
      {buttonProps: {label: 'Button', severity: 'contrast'}, storyItem: 'contrast'},
      {buttonProps: {label: 'Button', severity: 'warning'}, storyItem: 'warning'},
      {buttonProps: {label: 'Button', severity: 'danger'}, storyItem: 'danger'},
      {buttonProps: {label: 'Button', severity: 'danger'}, storyItem: 'danger'},
    ],
  },
};

export const ButtonsDisabled: StoryObj<ButtonsArgs> = {
  render: ButtonsTemplate,
  args: {
    byType: 'Disabled Buttons',
    buttons: [
      {buttonProps: {label: 'Button', severity: 'primary', disabled: true}, storyItem: 'primary'},
      {buttonProps: {label: 'Button', severity: 'secondary', disabled: true}, storyItem: 'secondary'},
      {buttonProps: {label: 'Button', severity: 'success', disabled: true}, storyItem: 'success'},
      {buttonProps: {label: 'Button', severity: 'info', disabled: true}, storyItem: 'info'},
      {buttonProps: {label: 'Button', severity: 'help', disabled: true}, storyItem: 'help'},
      {buttonProps: {label: 'Button', severity: 'contrast', disabled: true}, storyItem: 'contrast'},
      {buttonProps: {label: 'Button', severity: 'warning', disabled: true}, storyItem: 'warning'},
      {buttonProps: {label: 'Button', severity: 'danger', disabled: true}, storyItem: 'danger'},
    ],
  },
};


export const ButtonsSize: StoryObj<ButtonsArgs> = {
  render: ButtonsTemplate,
  args: {
    byType: 'Buttons Sizing',
    buttons: [
      {buttonProps: {label: 'Button', severity: 'secondary', size: 'small'}, storyItem: 'small'},
      {buttonProps: {label: 'Button', severity: 'secondary'}, storyItem: 'medium'},
      {buttonProps: {label: 'Button', severity: 'secondary', size: 'large'}, storyItem: 'large'},
    ],
  },
};


export const ButtonsIcon: StoryObj<ButtonsArgs> = {
  render: ButtonsTemplate,
  args: {
    byType: 'Buttons Sizing',
    buttons: [
      {buttonProps: {label: 'Button', severity: 'secondary', size: 'small', icon: 'pi pi-home' }, storyItem: 'size: \'small\''},
      {buttonProps: {label: 'Button', severity: 'secondary', icon: 'pi pi-home' }, storyItem: 'size: \'\''},
      {buttonProps: {label: 'Button', severity: 'secondary', size: 'large', icon: 'pi pi-home' }, storyItem: 'size: \'large\''},
      {buttonProps: {label: 'Button', severity: 'secondary', size: 'small', icon: 'pi pi-home', iconPos: 'bottom'  }, storyItem: 'iconPos: \'bottom\''},
      {buttonProps: {label: 'Button', severity: 'secondary', icon: 'pi pi-home', iconPos: 'top'  }, storyItem: 'iconPos: \'top\''},
      {buttonProps: {label: 'Button', severity: 'secondary', size: 'large', icon: 'pi pi-home', iconPos: 'right' }, storyItem: 'iconPos: \'right\''},
      {buttonProps: {label: 'Button', severity: 'secondary', size: 'large', icon: 'pi pi-home', iconPos: 'left' }, storyItem: 'iconPos: \'left\''},
    ],
  },
};

export const OutlinedButtons: StoryObj<ButtonsArgs> = {
  render: ButtonsTemplate,
  args: {
    byType: 'Buttons by severity',
    buttons: [
      {buttonProps: {label: 'Button', outlined: true}, storyItem: 'primary'},
      {buttonProps: {label: 'Button', severity: 'secondary', outlined: true}, storyItem: 'secondary'},
      {buttonProps: {label: 'Button', severity: 'success', outlined: true}, storyItem: 'success'},
      {buttonProps: {label: 'Button', severity: 'info', outlined: true}, storyItem: 'info'},
      {buttonProps: {label: 'Button', severity: 'help', outlined: true}, storyItem: 'help'},
      {buttonProps: {label: 'Button', severity: 'contrast', outlined: true}, storyItem: 'contrast'},
      {buttonProps: {label: 'Button', severity: 'warning', outlined: true}, storyItem: 'warning'},
      {buttonProps: {label: 'Button', severity: 'danger', outlined: true}, storyItem: 'danger'},
      {buttonProps: {label: 'Button', severity: 'danger', outlined: true}, storyItem: 'danger'},
    ],
  },
};
