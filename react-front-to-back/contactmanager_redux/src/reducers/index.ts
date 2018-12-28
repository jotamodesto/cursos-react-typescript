import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import { IContactState } from "../actions/types";

export interface IRootState {
  contact: IContactState;
}

export default combineReducers({
  contact: contactReducer
});
