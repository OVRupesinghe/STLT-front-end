import * as React from "react";
import Typography from "@mui/material/Typography";
import ProfileData from "../../data/profileData.js";
import Profile from "./ProfilePic.jsx";
import { MuiBreadcrumbs } from "../Traffic police/Breadcrumbs";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import useAuth from '../../hooks/useAuth';
import useGeneralUserContext from '../../hooks/useGeneralUserContext';
import CustomizedBreadcrumbs from "./CustomizedBreadCrumbs";
import Notifications from "./Notifications";
import logo from "../../images/logo.png";
import Stack from "@mui/material/Stack";

export default function Header() {
  const { auth } = useAuth();
  const { setSearchKey } = useGeneralUserContext();
  const name = auth.fname;
  const styles = {
    textField: {
      borderRadius: '20px', // Change the border radius to your desired value
    },
    input: {
      borderRadius:'20px'
    },
  };
  const profileElements = ProfileData.map((profile) => {
    return (
      <Profile
        key={profile.id} // to remove a warning
        profile={profile}
        name={name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
      />
    );
  });

  const onChange = (e) => {
    setSearchKey(e.target.value);
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="flex items-center">
        <img src={logo} alt="logo" style={{ height: "35px", width: "auto" }}/>
      </div>
      <div
        className="flex items-center "
        // style={{ marginLeft: "auto" }}
      >
        <TextField
          id="input-with-icon-textfield"
          placeholder="Search across the page"
          variant="outlined"
          autoFocus={false}
          size="small"
          type = "search"
          onChange = {onChange}
          
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
            style: styles.input, // Apply text color style
          }}
          style={styles.textField} // Apply border radius and background color style
        />
      </div>
      <div className="">
        <Typography variant="h6" component="div">
          {profileElements}
        </Typography>
      </div>
    </div>
  );
}
