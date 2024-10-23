import { FormlyFieldConfig } from '@ngx-formly/core';

export function formlyAuthSignInConfig(): Array<FormlyFieldConfig> {
  return [
    {
      fieldGroup: [
        {
          key: 'email',
          type: 'input-text',
          className: 'w-full mb-3',
          wrappers: ['panel'],
          props: {
            label: 'Email',
            value: '',
            placeholder: 'Enter email',
            required: true,
          }
        },
        {
          key: 'password',
          type: 'input-text',
          wrappers: ['panel'],
          props: {
            type: 'password',
            value: '',
            label: 'Password',
            minLength: 6,
            placeholder: 'Enter password',
            required: true,
          }
        },
      ],
    }
  ];
}
