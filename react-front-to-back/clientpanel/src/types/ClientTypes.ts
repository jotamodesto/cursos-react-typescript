export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  balance: string | number;
}

export enum ClientActions {
  NOTIFY_USER
}
