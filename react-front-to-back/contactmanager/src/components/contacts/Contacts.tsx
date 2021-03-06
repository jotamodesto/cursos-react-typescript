import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../../context";
import { IContact } from "../../Types";

interface IContactsState {
  contacts: Array<IContact>;
}

export class Contacts extends Component<{}, IContactsState> {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact</span> List
              </h1>
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
