import React from "react";
import axios from "axios";
import "./App.css";
import UserData from "./components/UserData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "./actions/userDataActins";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser());
  }, [dispatch]);
  const useDataList = useSelector((state) => state.userDetails);
  const { loading, error, users } = useDataList;

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
