import Settings, {
  SettingsActions,
  SettingsActionTypes
} from "../types/settingsTypes";

const initialState: Settings = {
  disableBalanceOnAdd: true,
  disableBalanceOnEdit: false,
  allowRegistration: false
};

export default function(state = initialState, action: SettingsActionTypes) {
  switch (action.type) {
    case SettingsActions.DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        disableBalanceOnAdd: action.payload
      };

    case SettingsActions.DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: action.payload
      };

    case SettingsActions.ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload
      };

    default:
      return state;
  }
}
