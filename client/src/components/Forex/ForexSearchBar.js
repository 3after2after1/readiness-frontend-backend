import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

export default function ComboBox() {
  const data = require("./symbolMapper.json");
  const options = Object.keys(data);
  let navigate = useNavigate();
  // console.log(data);
  return (
    <Autocomplete
      disablePortal
      onChange={(event, value) => {
        navigate(`/forex/${value}`);
      }}
      id="combo-box-demo"
      options={options}
      style={{ fontFamily: "Bree Serif", color: "green" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="filled"
          color="success"
          focused
        />
      )}
    />
  );
}
