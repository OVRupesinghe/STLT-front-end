import * as React from "react";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CancelDialog from "./CancelDialog.jsx";

export default function FormList(props) {
  return (
    <Stack direction="row" spacing={{ xs: 5, sm: 15, md: 15 }}>
      <Stack direction="column" spacing={2} align='left'>
        {props.detailsArr.map((value) => (
          <Typography
            sx={{ height: "40px"}}
            variant="subtitle1"
          >
           {value}
          </Typography>
        ))}
      </Stack>
      <Stack direction="column" spacing={2} align='right'>
        {props.detailsArr.map((value) => (
          <Typography
            variant="subtitle1"
            sx={{ height: "40px",  }}
          >
            {props.dataArr[props.detailsArr.indexOf(value)]}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}
