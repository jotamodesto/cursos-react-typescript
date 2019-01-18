import React, { Component } from "react";
import { connect } from "react-redux";

import { AppState } from "../../reducers";
import Contact from "./Contact";

import { Contact as ContactType } from "../../types/contactTypes";
import { getContacts } from "../../actions/contactActions";

interface ContactProps {
  contacts: ContactType[];
  getContacts: any;
}

class Contacts extends Component<ContactProps> {
  componentDidMount() {
    this.props.getContacts();
  }

  render() {
    const { contacts } = this.props;
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
  }
}

const mapStateToProps = (state: AppState) => ({
  contacts: state.contact.contacts
});

export default connect(
  mapStateToProps,
  { getContacts }
)(Contacts);
