import { MODULE_KEYS } from "../enums/module-keys.enum";

export interface ModuleConstants {
  viewKey: string;
  actionsName?: string;
}

export interface ModuleSettings {
  [key: string]: ModuleConstants
}

export const MODULES: ModuleSettings = {
  AUTH: {
    viewKey: MODULE_KEYS.auth,
    actionsName: MODULE_KEYS.auth
  },
  SETTINGS: {
    viewKey: MODULE_KEYS.settings,
    actionsName: MODULE_KEYS.settings
  },
  MESSAGES: {
    viewKey: MODULE_KEYS.massages,
    actionsName: MODULE_KEYS.massages
  }
}
