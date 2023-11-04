import * as React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import useFormContext from "../../hooks/useFormContext";
import docImg from "../../images/verified.png";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";


export default function VerificationDocs() {
  const {register, errors,watch } =
    useFormContext();
  return (
      <Grid container spacing={2}>
        <Stack sx={{ width: "100%" }} alignItems="center">
          <img src={docImg} alt="document" className="w-32" />
        </Stack>
        <Grid item xs={12}>
        <FormLabel id="demo-row-radio-buttons-group-label" sx = {{fontSize:'large'}}>Verification method : </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name = "verifyMode"
          defaultValue={watch("verifyMode")}
        >
          <FormControlLabel value="0" control={<Radio />} label="Provide physically"  {...register("verifyMode")}/>
          <FormControlLabel value="1" control={<Radio />} label="Upload now"  {...register("verifyMode")}/>
          
        
        </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="nic"
            label="NIC"
            {...register("nic", {
              required: "field required",
            })}
          />
          {errors.nic?.message ? (
            <Alert sx={{ mt: "10px" }} severity="error">
              {errors.nic?.message}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          <div className="border-2 p-3 rounded-lg border-zinc-300">
            <label for="nicFile" class="mb-2 inline-block text-neutral-500 ">
              Upload Front image of NIC*
            </label>
            <input
              id="nicFile"
              className="bg-gray-200 rounded-lg p-3"
              type="file"
              accept="image/*" // This line specifies that only image files are accepted
              {...register("nicFrontFile")}
              disabled={watch("verifyMode") === "0"}
            />
          </div>
          {errors.nicFrontFile?.message ? (
            <Alert sx={{ mt: "10px" }} severity="error">
              {errors.nicFrontFile?.message}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
        
        <Grid item xs={12}>
          <div className="border-2 p-3 rounded-lg border-zinc-300">
            <label
              htmlFor="nicFile"
              className="mb-2 inline-block text-neutral-500"
            >
              Upload Rear image of NIC*
            </label>
            <input
              id="nicFile"
              className="bg-gray-200 rounded-lg p-3"
              type="file"
              accept="image/*" // This line specifies that only image files are accepted
              {...register("nicRearFile")}
              disabled={watch("verifyMode") === "0"}
            />
          </div>
          {errors.nicRearFile?.message ? (
            <Alert sx={{ mt: "10px" }} severity="error">
              {errors.nicRearFile?.message}
            </Alert>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
  );
}
