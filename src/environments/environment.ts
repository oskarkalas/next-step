import {EnvironmentModel, SocialLoginEnum} from "./environment.model";

export const environment: EnvironmentModel = {
  production: false,
  graphqlApiUrl: 'http://localhost:3000/graphql/',
  translateFolderPath: './assets/i18n/',
  validateTokenUrl: 'http://localhost:3000/auth/validate-user-token',
  socials: {
    [SocialLoginEnum.GOOGLE]: {redirectUrl: 'http://localhost:3000/auth/google'},
  }
}
