export default interface Settings {
  disableBalanceOnAdd: boolean;
  disableBalanceOnEdit: boolean;
  allowRegistration: boolean;
}

export enum SettingsActions {
  DISABLE_BALANCE_ON_ADD = "DISABLE_BALANCE_ON_ADD",
  DISABLE_BALANCE_ON_EDIT = "DISABLE_BALANCE_ON_EDIT",
  ALLOW_REGISTRATION = "ALLOW_REGISTRATION"
}

interface DisableBalanceOnAddAction {
  type: SettingsActions.DISABLE_BALANCE_ON_ADD;
  payload: boolean;
}

interface DisableBalanceOnEditAction {
  type: SettingsActions.DISABLE_BALANCE_ON_EDIT;
  payload: boolean;
}

interface AllowRegistrationAction {
  type: SettingsActions.ALLOW_REGISTRATION;
  payload: boolean;
}

export type SettingsActionTypes =
  | DisableBalanceOnAddAction
  | DisableBalanceOnEditAction
  | AllowRegistrationAction;
