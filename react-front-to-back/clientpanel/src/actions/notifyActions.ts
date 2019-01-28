import { NotifyActions } from "../types/notifyTypes";

export const notifyUser = (message: string, messageType: string) => ({
  type: NotifyActions.NOTIFY_USER,
  message,
  messageType
});
