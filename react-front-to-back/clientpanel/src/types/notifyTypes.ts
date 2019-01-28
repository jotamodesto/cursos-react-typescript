export default interface Notify {
  message: string | null;
  messageType: string | null;
}

export interface NotifyState {
  notify: Notify;
}

export enum NotifyActions {
  NOTIFY_USER = "NOTIFY_USER"
}

interface NotifyUserAction {
  type: NotifyActions.NOTIFY_USER;
  message: string | null;
  messageType: string | null;
}

export type NotifyActionTypes = NotifyUserAction;
