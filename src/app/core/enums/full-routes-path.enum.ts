import {ModulePathsEnum} from "./module-paths.enum";
import {RoutesNamesEnum} from "./routes-names.enum";

export enum FullRoutesPathEnum {
  SIGN_IN = '/' + ModulePathsEnum.LOGIN,
  SIGN_UP  =  '/' + RoutesNamesEnum.SIGN_UP,
  FORGOT_PASSWORD  =  '/' + RoutesNamesEnum.FORGOT_PASSWORD,
  RESET_PASSWORD  =  '/' + ModulePathsEnum.LOGIN,
  SETTINGS = '/' + ModulePathsEnum.SETTINGS,
  DASHBOARD = '/' + ModulePathsEnum.DASHBOARD
}
