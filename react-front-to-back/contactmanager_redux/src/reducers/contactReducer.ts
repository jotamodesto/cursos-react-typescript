import {
  ContactState,
  ContactActionTypes,
  ContactActions
} from "../types/contactTypes";

const initialState: ContactState = {
  contacts: [],
  contact: { id: "", name: "", email: "", phone: "" }
};

export default function(
  state = initialState,
  action: ContactActionTypes
): ContactState {
  switch (action.type) {
    case ContactActions.GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      };
    case ContactActions.GET_CONTACT:
      return {
        ...state,
        contact: action.payload
      };
    case ContactActions.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case ContactActions.ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case ContactActions.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
}
