import {ContainerPathsEnum} from "./container-paths.enum";
import {RoutesNamesEnum} from "./routes-names.enum";

export enum RoutesPathsEnum {
  SIGN_IN = '/' + RoutesNamesEnum.SIGN_IN,
  SIGN_UP  =  '/' + ContainerPathsEnum.AUTH + '/' + RoutesNamesEnum.SIGN_UP,
  FORGOT_PASSWORD  =  '/' + RoutesNamesEnum.FORGOT_PASSWORD,
  RESET_PASSWORD  =  '/' + ContainerPathsEnum.LOGIN,
  SETTINGS = '/' + ContainerPathsEnum.SETTINGS,
  DASHBOARD = ContainerPathsEnum.DASHBOARD
}
