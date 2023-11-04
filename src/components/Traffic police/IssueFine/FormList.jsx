import * as React from "react";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";



export default function FormList(props) {

  return (
    <Stack direction="row" spacing={{ xs: 5, sm: 20, md: 20 }} > 
      <Stack direction="column" spacing={3} align='left' flexGrow={3}>
        {props.detailsArr.map((value) => (
          <Typography
            sx={{ height: "40px"}}
            className="font-semibold text-md text-neutral-600"
          >
            {value}
          </Typography>
        ))}
      </Stack>
      <Stack direction="column" spacing={3} align='right' flexGrow={1}>
        {props.detailsArr.map((value) => (
          <Typography
            className="font-medium text-neutral-500 text-md"
            sx={{ height: "40px",  }}
          >
            {props.dataArr[props.detailsArr.indexOf(value)]}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}

