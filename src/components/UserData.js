import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import Pagination from "./pagination/Pagination";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Modal from "@mui/material/Modal";

import FormControl from "@mui/material/FormControl";

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 6px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : grey[100]};
  }
  `
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [userData, setuserData] = useState([]);

  const [email, setEmail] = useState("");
  const [id, setId] = useState();
  const [imageLink, setImageLink] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const getAllData = () => {
    const localData = JSON.parse(localStorage.getItem("usesList"));
    setuserData(localData);
  };

  useEffect(() => {
    getAllData();
  }, []);
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    userData && userData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const edit = (id) => {
    setId(id);
    const filteredData =
      userData &&
      userData.filter((elem) => {
        return elem.id === id;
      });

    setEmail(filteredData[0].email);
    setImageLink(filteredData[0].avatar);
    setFirstName(filteredData[0].first_name);
    setLastName(filteredData[0].last_name);

    setOpen(true);
  };

  const upDateData = () => {
    userData &&
      userData
        .filter((item) => item.id === id)
        .forEach((item) => {
          item.email = email;
          item.avatar = imageLink;
          item.first_name = firstName;
          item.last_name = lastName;
        });

    localStorage.setItem("usesList", JSON.stringify(userData));

    const localData = JSON.parse(localStorage.getItem("usesList"));
    setuserData(localData);
    setOpen(false);
  };

  const deleteData = (e) => {
    const afterDeleteData =
      userData &&
      userData.filter((data) => {
        return data.id !== e;
      });

    setuserData(afterDeleteData);
    localStorage.setItem("usesList", JSON.stringify(afterDeleteData));
    const localData = JSON.parse(localStorage.getItem("usesList"));
    setuserData(localData);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl sx={{ width: "25ch" }}>
            <label style={{ marginBottom: "10px" }}>Email</label>
            <TextField
              fullWidth
              id="fullWidth"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label style={{ marginBottom: "10px", marginTop: "10px" }}>
              First Name
            </label>

            <TextField
              fullWidth
              id="fullWidth"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />

            <label
              style={{ marginBottom: "10px", marginTop: "10px" }}
              onChange={(e) => setLastName(e.target.value)}
            >
              Last Name
            </label>

            <TextField fullWidth id="fullWidth" value={lastName} />

            <label
              style={{ marginBottom: "10px", marginTop: "10px" }}
              onChange={(e) => setImageLink(e.target.value)}
            >
              {" "}
              Avatar link
            </label>

            <TextField fullWidth id="fullWidth" value={imageLink} />
            <Button
              style={{ padding: "6px 27px", marginTop: "30px" }}
              onClick={upDateData}
              variant="contained"
            >
              Submit
            </Button>
          </FormControl>
        </Box>
      </Modal>
      <Root sx={{ width: 500, maxWidth: "100%" }}>
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Avater</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts &&
              currentPosts.map((userData) => (
                <tr key={userData.id}>
                  <td>{userData.id}</td>
                  <td>{userData.email}</td>
                  <td>{userData.first_name}</td>
                  <td>{userData.last_name}</td>
                  <td>
                    <img src={userData.avatar} alt={userData.first_name} />
                  </td>
                  <td>
                    <Button
                      style={{ padding: "6px 27px" }}
                      onClick={() => edit(userData.id)}
                      variant="contained"
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ marginTop: "10px" }}
                      color="error"
                      onClick={() => deleteData(userData.id)}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </td>
              
                </tr>
              ))}
          </tbody>
          <tfoot></tfoot>
        </table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={userData && userData.length}
          paginate={paginate}
        />
      </Root>
    </>
  );
}
