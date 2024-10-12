import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { PrimeInputType } from './prime-input-type';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { PrimeFieldWrapper } from '../wrappers/prime-field-wrapper';
import { PrimeCheckboxType } from './prime-checkbox-type';
import { EmailFormlyValidator } from '../validators/formly-validators';

const form: FormGroup = new FormGroup({})

const meta: Meta = {
  title: 'Formly/types/PrimeInputType',
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        FormlyBootstrapModule,
        FormlyModule.forRoot({
          types: [
            {name: 'input-text', extends: 'input', component: PrimeInputType},
            {name: 'prime-checkbox', extends: 'input', component: PrimeCheckboxType}
          ],
          wrappers: [
            {name: 'panel', component: PrimeFieldWrapper}
          ],
          validators: [
            {name: 'email', validation: EmailFormlyValidator },
          ],
          validationMessages: [
            { name: 'required', message: 'This field is required' },
            { name: 'email', message: 'This field is required email address' },
          ]
        })
      ],
    }),
    componentWrapperDecorator(() => `
      <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
      model: {{ model  | json}}

    `)
  ],
};

export default meta;
type Story = StoryObj;

export const InputText: Story = {
  args: {
    model: {email: 'osakr.lksdf@falk.com'},
    fields: [{
      key: 'email',
      type: 'input-text',
      validators: {
        validation: ['email'],
      },
      wrappers: ['panel'],
      required: true,
      props: {
        label: 'Email',
        required: true,
        type: 'email',
        width: '20%',
        placeholder: 'Enter email',
      }
    }]
  },
};

export const InputCheckbox: Story = {
  args: {
    model: [{chbx: true, chbx2: 1}],
    fields: [
      {
        wrappers: ['panel'],
        props: {
          label: 'Group checkbox',
        },
        fieldGroup: [
          {
            key: 'chbx',
            type: 'prime-checkbox',
            value: 'test',
            checked: true,
            props: {
              checked: true,
              label: 'checkbox 1',
              value: false,
            }
          },
          {
            key: 'chbx2',
            type: 'prime-checkbox',
            value: false,
            props: {
              label: 'value2',
              value: false,
            }
          },
        ]
      }]
  },
};
