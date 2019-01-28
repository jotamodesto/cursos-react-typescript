import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer, createFirestoreInstance } from "redux-firestore";
// Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";
import Settings from "./types/settingsTypes";

const firebaseConfig = {
  apiKey: "AIzaSyBNAtnXX8Pe1z2YDtaQJntOjLW3eOkT0cE",
  authDomain: "reactfronttobackcourse.firebaseapp.com",
  databaseURL: "https://reactfronttobackcourse.firebaseio.com",
  projectId: "reactfronttobackcourse",
  storageBucket: "reactfronttobackcourse.appspot.com",
  messagingSenderId: "875090111219"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

// Check for settings in localStorage
if (localStorage.getItem("settings") === null) {
  // Default settings
  const defaultSettings: Settings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  // Set to localStorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// Create initial state
const initialState = {
  settings: JSON.parse(localStorage.getItem("settings") as string)
};

// Create store
const store = createStore(
  rootReducer,
  initialState,
  compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

export default store;
