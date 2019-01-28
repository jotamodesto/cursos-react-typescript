import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SettingsType from "../../types/settingsTypes";
import {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration
} from "../../actions/settingsActions";

interface SettingsProps {
  auth: any;
  settings: SettingsType;
  setAllowRegistration: typeof setAllowRegistration;
  setDisableBalanceOnAdd: typeof setDisableBalanceOnAdd;
  setDisableBalanceOnEdit: typeof setDisableBalanceOnEdit;
}

interface SettingsState {
  firebase: any;
  settings: SettingsType;
}

class Settings extends Component<SettingsProps, SettingsState> {
  disableBalanceOnAddChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };

  disableBalanceOnEditChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  allowRegistrationChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;
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
          <div className="card-header">Edit Setting</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Allow Registration</label>{" "}
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.allowRegistrationChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance On Add</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.disableBalanceOnAddChange}
                />
              </div>
              <div className="form-group">
                <label>Disable Balance On Edit</label>{" "}
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.disableBalanceOnEditChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: SettingsState, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
