import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { SignInComposite } from './sign-in.composite';
import { FORMLY_AUTH_CONFIG } from '../../../containers/auth/auth.routes';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthFormService } from '../../../containers/auth/auth-sign-in/services/auth-form.service';

const meta: Meta<SignInComposite> = {
  component: SignInComposite,
  title: 'Composites/Auth/SignIn',
  decorators: [
    moduleMetadata({
      imports: [
        FORMLY_AUTH_CONFIG,
      ],
      providers: [AuthFormService],
    })
  ]
};
export default meta;

const template: StoryFn<SignInComposite> = (args) => {
  const authFormService = new AuthFormService();
  return {
    props: {
      ...args,
      fields: authFormService.getFormFields(),
      loginForm: new FormGroup({email: new FormControl(), password: new FormControl()}),
    }
  };
};

export const Primary = template.bind({});
Primary.args = {
  loginForm: new FormGroup({}),
  loginInProgress: true,
};

