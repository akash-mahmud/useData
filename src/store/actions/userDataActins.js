import Axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userConstants";
export const detailsUser = () => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
  });
  try {
    const fistData = await Axios.get(`https://reqres.in/api/users?page=1`);

    const secondData = await Axios.get(`https://reqres.in/api/users?page=2`);

    const allData = [...fistData.data.data, ...secondData.data.data];
    localStorage.setItem("usesList", JSON.stringify(allData));
    dispatch({ type: USER_DETAILS_SUCCESS, payload: allData });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
  }
};
