import {ModulePathsEnum} from "./module-paths.enum";
import {RoutesNamesEnum} from "./routes-names.enum";

export enum FullRoutesPathEnum {
  SIGN_IN = '/' + ModulePathsEnum.LOGIN + '/' + RoutesNamesEnum.SIGN_IN,
  SIGN_UP  =  '/' + ModulePathsEnum.LOGIN + '/' + RoutesNamesEnum.SIGN_UP,
  FORGOT_PASSWORD  =  '/' + ModulePathsEnum.LOGIN + '/' + RoutesNamesEnum.FORGOT_PASSWORD,
  RESET_PASSWORD  =  ModulePathsEnum.LOGIN + '/' + RoutesNamesEnum.RESET_PASSWORD,
  SETTINGS = '/' + ModulePathsEnum.SETTINGS,
  DASHBOARD = '/' + ModulePathsEnum.HOME
}
