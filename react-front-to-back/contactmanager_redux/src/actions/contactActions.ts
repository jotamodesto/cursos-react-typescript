import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

import { Contact, ContactActions } from "../types/contactTypes";
import { AppState } from "../reducers";

export const getContacts = (): ThunkAction<
  void,
  AppState,
  null,
  Action<string>
> => async dispatch => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");

  dispatch({
    type: ContactActions.GET_CONTACTS,
    payload: res.data
  });
};

export const getContact = (
  id: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  dispatch({
    type: ContactActions.GET_CONTACT,
    payload: res.data
  });
};

export const deleteContact = (id: string) => {
  return {
    type: ContactActions.DELETE_CONTACT,
    payload: id
  };
};

export const thunkDeleteContact = (
  id: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  dispatch(deleteContact(id));
};

export const addContact = (
  contact: Contact
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const res = await axios.post(
    `https://jsonplaceholder.typicode.com/users`,
    contact
  );

  dispatch({
    type: ContactActions.ADD_CONTACT,
    payload: res.data
  });
};

export const updateContact = (
  contact: Contact
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const res = await axios.put(
    `https://jsonplaceholder.typicode.com/users/${contact.id}`,
    contact
  );

  dispatch({
    type: ContactActions.UPDATE_CONTACT,
    payload: res.data
  });
};
