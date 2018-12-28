import { IContactState } from "../actions/types";

const initialState: IContactState = {
  contacts: [
    {
      id: "1",
      name: "John Doe",
      email: "john@gmail.com",
      phone: "555-555-5555"
    },
    {
      id: "2",
      name: "Karen Williams",
      email: "karen@gmail.com",
      phone: "444-444-4444"
    },
    {
      id: "3",
      name: "Henry Johnson",
      email: "henry@gmail.com",
      phone: "333-333-333"
    }
  ]
};

export default function contactReducer(
  state: IContactState = initialState,
  action: any
): IContactState {
  switch (action.type) {
    // case GET_CONTACTS:
    //   return { ...state };
    default:
      return state;
  }
}
