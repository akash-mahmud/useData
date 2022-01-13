import React from "react";
import "./App.css";
import UserData from "./components/UserData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "./store/actions/userDataActins";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser());
  }, [dispatch]);
  const useDataList = useSelector((state) => state.userDetails);
  const {  users } = useDataList;

  console.log(users);

  return (
    <>
      <div className="section">
        <UserData />
      </div>
    </>
  );
}

export default App;
