import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userConstants";
export const userDetailsReducer = (state = { loading: true , users: [] }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
