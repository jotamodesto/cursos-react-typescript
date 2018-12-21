import * as React from "react";
import { ContactType } from "./Types";

export interface IAppContext {
  contacts: Array<ContactType>;
  dispatch: AppContextDispatch;
}
export type AppContextDispatch = (
  action: { type: string; payload: any }
) => void;

const store = {
  contacts: [
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
  ],
  dispatch: (action: { type: string; payload: any }) => {}
};

const Context = React.createContext<IAppContext>(store);

const reducer = (
  state: IAppContext,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    default:
      return state;
  }
};

export class Provider extends React.Component<{}, IAppContext> {
  render() {
    return (
      <Context.Provider value={store}>{this.props.children}</Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
