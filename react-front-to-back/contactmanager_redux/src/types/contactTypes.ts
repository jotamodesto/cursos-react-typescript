export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ContactState {
  contacts: Contact[];
  contact: Contact;
}

export enum ContactActions {
  GET_CONTACTS = "GET_CONTACTS",
  GET_CONTACT = "GET_CONTACT",
  DELETE_CONTACT = "DELETE_CONTACT",
  ADD_CONTACT = "ADD_CONTACT",
  UPDATE_CONTACT = "UPDATE_CONTACT"
}

interface GetContactsAction {
  type: typeof ContactActions.GET_CONTACTS;
  payload: Contact[];
}

interface GetContactAction {
  type: typeof ContactActions.GET_CONTACT;
  payload: Contact;
}

interface DeleteContactAction {
  type: typeof ContactActions.DELETE_CONTACT;
  payload: string;
}

interface AddContactAction {
  type: typeof ContactActions.ADD_CONTACT;
  payload: Contact;
}

interface UpdateContactAction {
  type: typeof ContactActions.UPDATE_CONTACT;
  payload: Contact;
}

export type ContactActionTypes =
  | GetContactsAction
  | GetContactAction
  | DeleteContactAction
  | AddContactAction
  | UpdateContactAction;
