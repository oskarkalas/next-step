import { componentWrapperDecorator, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { PrimeInputType } from './prime-input-type';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { PrimeFieldWrapper } from '../wrappers/prime-field-wrapper';
import { PrimeCheckboxType } from './prime-checkbox-type';
import { EmailFormlyValidator } from '../validators/formly-validators';
import { PrimeFieldCheckboxWrapper } from '../wrappers/prime-field-checkbox-wrapper';
import { PrimeAutocompleteFormlyType } from './prime-autocomplete.formly.type';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { signal, Signal } from '@angular/core';

const meta: Meta = {
  title: 'Forms/formly/types',
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        FormlyBootstrapModule,
        FormlyModule.forRoot({
          types: [
            {name: 'input-text', extends: 'input', component: PrimeInputType},
            {name: 'prime-checkbox', extends: 'input', component: PrimeCheckboxType},
            {name: 'prime-autocomplete', extends: 'input', component: PrimeAutocompleteFormlyType},
          ],
          wrappers: [
            {name: 'panel', component: PrimeFieldWrapper},
            {name: 'checkbox-wrapper', component: PrimeFieldCheckboxWrapper}
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
      <formly-form [fields]="fields" [model]="model"></formly-form>
      <div style="opacity: .5">
       <hr />
      model: {{ model  | json}}
      </div>
    `)
  ],
};

export default meta;

type Story = StoryObj;
// Create a signal for suggestions
const suggestionsSignal = signal<Array<string>>([]);

export const AutoComplete: Story = {
  args: {
    model: {autocomplete: ""},
    fields: [{
      key: 'autocomplete',
      type: 'prime-autocomplete',
      wrappers: ['panel'],
      props: {
        label: 'AutoComplete',
        minLength: 3,
        placeholder: 'start typing',
        complete: (event: AutoCompleteCompleteEvent) => {
          const newSuggestions = [...Array(10).keys()].map(item => `${event.query}-${item}`);
          suggestionsSignal.set(newSuggestions);
          console.log('AutoComplete complete suggestions', suggestionsSignal());
        },
        suggestions: suggestionsSignal(),
      }
    }]
  },
};

export const InputText: Story = {
  args: {
    model: {email: 'test@test.com'},
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

export const Checkbox: Story = {
  args: {
    model: {checkbox: {
      chbx: true, chbx2: false, chbx3: true
      }},
    fields: [{
      key: 'checkbox',
      wrappers: ['panel'],
      props: { label: 'Group horizontal checkboxes' },
      fieldGroupClassName: 'itemsGroup itemsGroup-horizontal',
      fieldGroup: [
        {
          wrappers: ['checkbox-wrapper'],
          key: 'chbx',
          type: 'prime-checkbox',
          value: 'test',
          props: {
            label: 'active',
          }
        },
        {
          wrappers: ['checkbox-wrapper'],
          key: 'chbx2',
          type: 'prime-checkbox',
          props: {
            label: 'false',
          }
        },
        {
          wrappers: ['checkbox-wrapper'],
          key: 'chbx3',
          type: 'prime-checkbox',
          props: {
            disabled: true,
            label: 'disabled',
          }
        },
      ]
    },
      {
        key: 'checkbox',
        wrappers: ['panel'],
        props: { label: 'Group vertical checkboxes' },
        fieldGroupClassName: 'itemsGroup itemsGroup-vertical',
        fieldGroup: [
          {
            wrappers: ['checkbox-wrapper'],
            key: 'chbx',
            type: 'prime-checkbox',
            value: 'test',
            props: {
              label: 'active',
            }
          },
          {
            wrappers: ['checkbox-wrapper'],
            key: 'chbx2',
            type: 'prime-checkbox',
            props: {
              label: 'false',
            }
          },
          {
            wrappers: ['checkbox-wrapper'],
            key: 'chbx3',
            type: 'prime-checkbox',
            props: {
              disabled: true,
              label: 'disabled',
            }
          },
        ]
      }
    ]
  },
};
