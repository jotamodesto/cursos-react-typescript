import React, { Component } from "react";
import { connect, MapDispatchToProps } from "react-redux";

import Contact from "./Contact";
import { IRootState } from "../../reducers";
import { IContact } from "../../actions/types";

const mapStateToProps = ({ contact }: IRootState) => {
  const { contacts } = contact;
  return { contacts };
};

type ContactType = ReturnType<typeof mapStateToProps>;

export class Contacts extends Component<ContactType> {
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

// const mapDispatchToProps = (dispatch: Dispatch): IDispatchFromProps => ({
//   getContacts: () => dispatch()
// });

// export default connect<IRootState, IDispatchFromProps>(
//   mapStateToProps,
//   mapDispatchToProps
// )(Contacts);

export default Contacts;
