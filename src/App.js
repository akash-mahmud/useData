import React from "react";
import axios from "axios";
import "./App.css";
import UserData from "./components/UserData";
import { useEffect } from "react";

function App() {
  const allData = async () => {
    const firstPageData = await axios.get("https://reqres.in/api/users?page=1");
    const secondPageData = await axios.get(
      "https://reqres.in/api/users?page=2"
    );
    const allData = [...firstPageData.data.data, ...secondPageData.data.data];
    localStorage.setItem("usesList", JSON.stringify(allData));
  };
  useEffect(() => {
    allData();
  }, []);
  return (
    <>
      <div className="section">
        <UserData />
      </div>
    </>
  );
}

export default App;
