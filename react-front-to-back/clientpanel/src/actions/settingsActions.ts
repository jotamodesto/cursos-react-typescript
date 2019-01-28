import Settings, {
  SettingsActions,
  SettingsActionTypes
} from "../types/settingsTypes";

export const setDisableBalanceOnAdd = () => {
  //Get settings from localStorage
  const settings: Settings = JSON.parse(localStorage.getItem(
    "settings"
  ) as string);

  //Toggle
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

  // Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: SettingsActions.DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd
  };
};

export const setDisableBalanceOnEdit = () => {
  const settings: Settings = JSON.parse(localStorage.getItem(
    "settings"
  ) as string);

  //Toggle
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

  // Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: SettingsActions.DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit
  };
};

export const setAllowRegistration = () => {
  const settings: Settings = JSON.parse(localStorage.getItem(
    "settings"
  ) as string);

  //Toggle
  settings.allowRegistration = !settings.allowRegistration;

  // Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: SettingsActions.ALLOW_REGISTRATION,
    payload: settings.allowRegistration
  };
};
