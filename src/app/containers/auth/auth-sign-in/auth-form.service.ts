import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({ providedIn: 'root' })
export class AuthFormService {
  createForm(): FormGroup {
    return new FormGroup({});
  }

  getFormFields(): Array<FormlyFieldConfig> {
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
              label: 'Password',
              placeholder: 'Enter password',
              required: true,
            }
          },
          {
            key: 'remember',
            type: 'input-checkbox',
            wrappers: ['panel'],
            props: {
              label: 'Remember me',
            }
          }
        ],
      }
    ];
  }
}
