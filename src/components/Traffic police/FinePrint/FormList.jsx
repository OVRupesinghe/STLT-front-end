import * as React from "react";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import PositionedSnackbar from "./SnackBar";

export default function FormList(props) {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/home");
  };

  return (
    <Stack direction="row" spacing={{ xs: 5, sm: 15, md: 15 }}>
      <Stack direction="column" spacing={2} align='left'>
        {props.detailsArr.map((value) => (
          <Typography
            sx={{ height: "40px"}}
            className="font-semibold text-sm text-neutral-600"
          >
            {`${value}:`}
          </Typography>
        ))}
      </Stack>
      <Stack direction="column" spacing={2} align='right'>
        {props.detailsArr.map((value) => (
          <Typography
            className="font-medium text-neutral-500 text-md"
            sx={{ height: "40px",  }}
          >
            {props.dataArr[props.detailsArr.indexOf(value)]}
          </Typography>
        ))}
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            className="text-white"
            onClick={handleButtonClick}
          >
            Back
          </Button>
          <Button
            variant="contained"
            className="text-white"
            onClick={handleButtonClick}
          >
            Print
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
