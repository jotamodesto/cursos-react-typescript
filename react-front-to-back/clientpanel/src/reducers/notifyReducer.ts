import Notify, { NotifyActions, NotifyActionTypes } from "../types/notifyTypes";

const initialState: Notify = {
  message: null,
  messageType: null
};

export default function(state = initialState, action: NotifyActionTypes) {
  switch (action.type) {
    case NotifyActions.NOTIFY_USER:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType
      };
    default:
      return state;
  }
}
