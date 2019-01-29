import React, { Component, RefObject } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Spinner from "../layout/Spinner";
import { Client } from "../../types/clientTypes";
import Settings from "../../types/settingsTypes";

interface EditClientProps {
  client: Client;
  firestore: any;
  settings: Settings;
}
type EditClientRouteProps = EditClientProps &
  RouteComponentProps<{ id: string }>;

class EditClient extends Component<EditClientRouteProps> {
  private firstNameInput = React.createRef<HTMLInputElement>();
  private lastNameInput = React.createRef<HTMLInputElement>();
  private emailInput = React.createRef<HTMLInputElement>();
  private phoneInput = React.createRef<HTMLInputElement>();
  private balanceInput = React.createRef<HTMLInputElement>();

  onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    // Updated Client
    const updClient = {
      firstName: this.firstNameInput.current!.value,
      lastName: this.lastNameInput.current!.value,
      email: this.emailInput.current!.value,
      phone: this.phoneInput.current!.value,
      balance:
        this.balanceInput.current!.value === ""
          ? 0
          : this.balanceInput.current!.value
    };

    // Update client in firestore
    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(history.push("/"));
  };

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Edit Client</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength={2}
                    required
                    ref={this.firstNameInput}
                    defaultValue={client.firstName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength={2}
                    required
                    ref={this.lastNameInput}
                    defaultValue={client.lastName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    ref={this.emailInput}
                    defaultValue={client.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    minLength={10}
                    required
                    ref={this.phoneInput}
                    defaultValue={client.phone}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="text"
                    className="form-control"
                    name="balance"
                    ref={this.balanceInput}
                    defaultValue={client.balance.toString()}
                    disabled={disableBalanceOnEdit}
                  />
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose<React.ComponentClass>(
  firestoreConnect((props: EditClientRouteProps) => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }: any, props) => ({
    client: ordered.client && ordered.client[0],
    settings: settings
  }))
)(EditClient);
