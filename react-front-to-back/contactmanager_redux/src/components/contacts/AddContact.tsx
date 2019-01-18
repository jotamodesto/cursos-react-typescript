import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import { addContact } from "../../actions/contactActions";
import TextInputGroup from "../layout/TextInputGroup";

interface AddContactProps extends RouteComponentProps {
  addContact: any;
}

class AddContact extends Component<AddContactProps> {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: { name: "", email: "", phone: "" }
  };

  onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    this.setState({ [target.name]: target.value });
  };

  onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // Check For Errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "E-mail is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    const newContact = { name, email, phone };

    this.props.addContact(newContact);

    // Clear State
    this.setState({ name: "", email: "", phone: "", errors: {} });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="E-mail"
              name="email"
              type="email"
              placeholder="Enter E-mail"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextInputGroup
              label="Phone"
              name="phone"
              placeholder="Enter Phone"
              value={phone}
              onChange={this.onChange}
              error={errors.phone}
            />
            <input
              type="submit"
              value="Add Contact"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addContact }
)(AddContact);
