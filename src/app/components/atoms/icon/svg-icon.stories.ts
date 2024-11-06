import type { Meta, StoryObj } from '@storybook/angular';
import { SvgIconComponent } from './svg-icon.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import appIcons from './../../../../assets/files-icons.json';

export interface IconsArgs {
  icons: Array<string>;
}

const iconNames = [
  ...appIcons.files.map( (value: string) => value.replace('.svg', '')),
];

const meta: Meta<SvgIconComponent> = {
  component: SvgIconComponent,
  title: 'UI/Atoms/Icons/SvgIcon',
  argTypes: {
    iconName: {
      options: [...iconNames],
      control: { type: 'select' },
    },
    color: {
      control: { type: 'color' },
    },
  }
};

export default meta;

type Story = StoryObj<SvgIconComponent>;

export const Primary: Story = {
  args: {
    iconName: 'home-widget-heart',
    iconClass: '',
    iconSize: 50,
    color: 'red'
  }
};

const IconsTemplate = (args: IconsArgs) => ({
  props: args,
  template: `
    <div style="display: flex; gap: 10px; flex-wrap: wrap">
      <ng-container *ngFor="let icon of icons">
      <div style="border: 1px solid gray;
      display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px">
        <div>
        <spa-icon [iconName]="icon"></spa-icon>
        </div>

        <span>{{icon}}</span>
      </div>

      </ng-container>
    </div>
  `,
});

export const IconsList: StoryObj<IconsArgs> = {
  render: IconsTemplate,
  args: {
    icons: [
      ...iconNames
    ],
  },
};




