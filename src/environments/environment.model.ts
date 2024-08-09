export interface EnvironmentModel {
  production: boolean;
  graphqlApiUrl: string;
  translateFolderPath: string;
  validateTokenUrl: string;
  socials: SocialLoginModel;
}

export type SocialLoginModel = {
  [key in SocialLoginEnum]: {redirectUrl: string};
};

export enum SocialLoginEnum {
  GOOGLE= 'GOOGLE'
}
