import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CustomizedSteppers from "../../components/Traffic police/Steppers.jsx";
import { TextField, Button } from "@mui/material";
import "@fontsource/inter";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useTheme } from "@emotion/react";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormList from "../../components/Traffic police/IssueFine/FormList";
import {
  CalendarDaysIcon,
  ClockIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import {
  policeDivisions,
  policeStations,
  offences,
  provinces,
  demeritPoints,
} from "../../data/Constants";
import useFormContext from "../../hooks/useFormContext";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDetailsContext from "../../hooks/useDetailsContext";

function DateText() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <CalendarDaysIcon className="h-5 w-5 " />
      <Typography component="div" className="text-md">
        Date
      </Typography>
    </Stack>
  );
}

function TimeText() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <ClockIcon className="h-5 w-5 " />
      <Typography component="div" className="text-md">
        Time
      </Typography>
    </Stack>
  );
}

function LicenseText() {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <CreditCardIcon className="h-5 w-5 " />
      <Typography component="div" className="text-md">
        License No
      </Typography>
    </Stack>
  );
}

const LicenseKeys = [<DateText />, <TimeText />, <LicenseText />];

export default function IssueFine() {
  const { LicenseDetails } = useDetailsContext();
  const licenseNo = LicenseDetails.licenseNumber;
  const currentDate = new Date();
  const [selectedOffences, setSelectedOffences] = useState([]); // State to hold selected offences
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedDemerit, setSelectedDemerit] = useState([]); // State to hold selected offences
  const [selectedDivision, setSelectedDivision] = useState([]); // State to hold selected offences
  const [selectedDivisionCode, setSelectedDivisionCode] = useState(""); // State to hold selected offences

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const date = `${year}-${month}-${day}`;
  const time = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const navigate = useNavigate();

  const { register, errors, handleSubmit, getValues, setValue } =
    useFormContext();
  const handleOffencesChange = (event) => {
    const selectedValues = event.target.value;
    setSelectedOffences(selectedValues);

    const selectedPrices = selectedValues.map((offence) =>
      offences.get(offence)
    );
    setSelectedPrices(selectedPrices);

    const selectedDemerit = selectedValues.map((offence) =>
      demeritPoints.get(offence)
    );
    setSelectedDemerit(selectedDemerit);
  };

  const handleDivisionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDivision(selectedValue);

    const selectedDivisionCode = policeDivisions.get(selectedValue);
    setSelectedDivisionCode(selectedDivisionCode);
  };

  const LicenseData = [date, time, licenseNo];

  const theme = useTheme();

  const onSubmit = async (e) => {
    setValue("prices", selectedPrices);
    setValue("demeritPoint", selectedDemerit);
    setValue("policeDivisonID", selectedDivisionCode);
    setValue("date", date);
    setValue("time", time);
    setValue("licenseNumber", licenseNo);
    setValue("typeOfOffence", 0);
    const data = getValues();
    console.log(data);
    navigate("/traffic-police/fine-confirmation");
  };
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const formWidth = isXsScreen ? "70%" : "50%";
  return (
    <>
      <Box>
        <CustomizedSteppers step={2} />
      </Box>
      <Box sx={{ marginTop: "3%" }}>
        <Grid item lg={12} align="center">
          <Paper
            className="shadow-md"
            sx={{
              gap: 3,
              boxShadow: "none",
              display: "flex",
              width: "50%",
              flexDirection: "column",
              padding: 5,
              [theme.breakpoints.down("md")]: {
                width: "100%", // Width for small screens
              },
              [theme.breakpoints.between("md", "xl")]: {
                width: "80%", // Width for small screens
              },
            }}
          >
            <Typography
              component="div"
              className="text-2xl text-center text-slate-950 font-semibold subpixel-antialiased"
              sx={{ fontFamily: "inter" }}
            >
              Violation Details
            </Typography>
            <Stack
              direction="column"
              alignItems="center"
              spacing={5}
              justifyContent="space-evenly"
            >
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1, width: formWidth }}
              >
                <FormList detailsArr={LicenseKeys} dataArr={LicenseData} />
                <Stack direction="row" gap={3}>
                  <TextField
                    id="province"
                    label="Province"
                    margin="normal"
                    fullWidth
                    select
                    {...register("vehicleProvince", {
                      required: "field required",
                    })}
                  >
                    {provinces.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="vehicleNo"
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    label="Vehicle No."
                    {...register("vehicleNumber", {
                      required: "field required",
                      pattern: {
                        value: /^[A-Za-z]+-\d+$/i,
                        message:
                          "Invalid vehicle Number, it should be of the form KN-3846",
                      },
                    })}
                  />
                </Stack>
                <Stack direction="row" gap={3}>
                  <Box>
                    {errors.province?.message ? (
                      <Alert sx={{ mt: "10px" }} severity="error">
                        {errors.province?.message}
                      </Alert>
                    ) : (
                      ""
                    )}
                  </Box>
                  <Box>
                    {errors.vehicleNo?.message ? (
                      <Alert sx={{ mt: "10px" }} severity="error">
                        {errors.vehicleNo?.message}
                      </Alert>
                    ) : (
                      ""
                    )}
                  </Box>
                </Stack>

                <TextField
                  id="division"
                  margin="normal"
                  label="Division"
                  select
                  fullWidth
                  SelectProps={{
                    sx: {
                      height: "50px",
                    },
                    value: selectedDivision,
                    onChange: handleDivisionChange,
                  }}
                  {...register("divisionTitle", {
                    required: "field required",
                  })}
                >
                  {Array.from(policeDivisions.keys()).map((division) => (
                    <MenuItem key={division} value={division}>
                      {division}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.division?.message ? (
                  <Alert sx={{ mt: "10px" }} severity="error">
                    {errors.division?.message}
                  </Alert>
                ) : (
                  ""
                )}
                <TextField
                  id="station"
                  margin="normal"
                  label="Station"
                  select
                  fullWidth
                  SelectProps={{
                    sx: {
                      height: "50px",
                    },
                  }}
                  {...register("station", {
                    required: "field required",
                  })}
                >
                  {policeStations.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.station?.message ? (
                  <Alert sx={{ mt: "10px" }} severity="error">
                    {errors.station?.message}
                  </Alert>
                ) : (
                  ""
                )}
                <TextField
                  id="offences"
                  margin="normal"
                  label="Violation(s)"
                  fullWidth
                  select
                  SelectProps={{
                    multiple: true,
                    value: selectedOffences,
                    onChange: handleOffencesChange,
                  }}
                  {...register("description", {
                    required: "field required",
                  })}
                >
                  {Array.from(offences.keys()).map((offence) => (
                    <MenuItem key={offence} value={offence}>
                      {offence}
                    </MenuItem>
                  ))}
                </TextField>
                {/* Display selected offences and their corresponding prices */}
                {selectedOffences.length > 0 && (
                  <Stack alignItems="flex-start" margin>
                    <Typography
                      variant="body1"
                      color="initial"
                      className="font-bold"
                    >
                      Selected offences and fine amounts:{" "}
                    </Typography>
                    <ul>
                      {selectedOffences.map((offence, index) => (
                        <li key={offence} align="left" className="mt-5 text-sm">
                          {offence}: {selectedPrices[index]}
                        </li>
                      ))}
                    </ul>
                  </Stack>
                )}
                {errors.offences?.message ? (
                  <Alert sx={{ mt: "10px" }} severity="error">
                    {errors.offences?.message}
                  </Alert>
                ) : (
                  ""
                )}
                <Stack direction="row" gap={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Issue fine
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Box>
    </>
  );
}
