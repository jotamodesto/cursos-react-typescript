import * as React from "react";
import axios from "axios";
import { IContact } from "./Types";

export interface IAppContext {
  contacts: Array<IContact>;
  dispatch: AppContextDispatch;
}
export type AppContextDispatch = (
  action: { type: string; payload: any }
) => void;

const store: IAppContext = {
  contacts: [
    {
      id: "0",
      name: "",
      email: "",
      phone: ""
    }
  ],
  dispatch: (action: { type: string; payload: any }) => {}
};
const Context = React.createContext<IAppContext>(store);

const reducer = (
  state: IAppContext,
  action: { type: string; payload: any }
): IAppContext => {
  switch (action.type) {
    case "DELETE_CONTACT":
      const contactsResult = state.contacts.filter(
        contact => contact.id !== action.payload
      );
      const result = { ...state, contacts: contactsResult };
      return result;
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case "UPDATE_CONTACT":
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
};

export class Provider extends React.Component<{}, IAppContext> {
  constructor(props: {}) {
    super(props);

    store.contacts = [];
    store.dispatch = action => this.setState(state => reducer(state, action));

    this.state = store;
  }

  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");

    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
