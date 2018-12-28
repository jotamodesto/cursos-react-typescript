export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IContactState {
  contacts: IContact[];
}

export enum Constants {
  GET_CONTACTS = "GET_CONTACTS"
}
