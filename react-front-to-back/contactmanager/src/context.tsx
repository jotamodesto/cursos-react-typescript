import * as React from "react";
import { ContactType } from "./Types";

export interface IAppContext {
  contacts: Array<ContactType>;
  dispatch: AppContextDispatch;
}
export type AppContextDispatch = (
  action: { type: string; payload: number }
) => void;

const store: IAppContext = {
  contacts: [
    {
      id: 0,
      name: "",
      email: "",
      phone: ""
    }
  ],
  dispatch: (action: { type: string; payload: number }) => {}
};
const Context = React.createContext<IAppContext>(store);

const reducer = (
  state: IAppContext,
  action: { type: string; payload: number }
): IAppContext => {
  switch (action.type) {
    case "DELETE_CONTACT":
      const contactsResult = state.contacts.filter(
        contact => contact.id !== action.payload
      );
      const result = { ...state, contacts: contactsResult };
      return result;
    default:
      return state;
  }
};

export class Provider extends React.Component<{}, IAppContext> {
  render() {
    store.contacts = [
      {
        id: 1,
        name: "John Doe",
        email: "jdoe@gmail.com",
        phone: "555-555-5555"
      },
      {
        id: 2,
        name: "Karen Williams",
        email: "karen@gmail.com",
        phone: "222-222-2222"
      },
      {
        id: 3,
        name: "Henry Johnson",
        email: "henry@gmail.com",
        phone: "111-111-111"
      }
    ];
    store.dispatch = action => this.setState(state => reducer(state, action));
    this.state = store;

    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
