import React from "react";
import { Typography, Stack } from "@mui/material";

export default function Profile(props) {
  return (
    <Stack direction="row" alignItems="center" margin>
      <div className="px-5"> 
        <h1>muunchee cream cracker</h1>
        <Typography variant="subtitle1">Mr. {props.name}</Typography>
      </div>
      <div>
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={`../images/${props.profile.img}`}
          alt="D.D Rathnayake"
        />
      </div>
    </Stack>
  );
}
