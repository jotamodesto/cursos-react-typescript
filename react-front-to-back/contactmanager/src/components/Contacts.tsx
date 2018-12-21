import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../context";
import { ContactType } from "../Types";

interface IContactsState {
  contacts: Array<ContactType>;
}

export class Contacts extends Component<{}, IContactsState> {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
