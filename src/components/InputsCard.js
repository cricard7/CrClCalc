// InputsCard

// Used to display card for patient inputs
//Ht Cm
//Wt Kg
//Age yrs
//Scr (umol/L)

import React from "react";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Button from "@material-ui/core/Button";

import { parse } from "mathjs";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


export default function InputsCard() {
  const [PtHeight, setPtHeight] = useState(0);
  const [PtWeight, setPtWeight] = useState(0);
  const [PtAge, setPtAge] = useState(0);
  const [Scr, setScr] = useState(0);
  const [Gender, setGender] = useState()

  const PtHeightChangeHandler = (e) => {
    console.log("Height changed to " + e.target.value);
    setPtHeight(e.target.value);
  };

  const PtWeightChangeHandler = (e) => {
    console.log("Weight changed to " + e.target.value);
    setPtWeight(e.target.value);
  };

  const PtAgeChangeHandler = (e) => {
    console.log("PtAge changed to " + e.target.value);
    setPtAge(e.target.value);
  };

  const ScrChangeHandler = (e) => {
    console.log("Scr changed to " + e.target.value);
    setScr(e.target.value);
  };

  const GenderChangeHandler = (e) => {
  console.log('Gender changed to ' + e.target.value)
  setGender(e.target.value)
  }

  const CalculateClickHandler = () => {
    console.log("click");
    const f = parse("x * e^(-0.058*t)");
    console.log(f.toString());
    console.log(f.evaluate({ x: 8, t: 12 }));
  };

  return (
    <Card>
      <Typography variant="h6" gutterBottom>
        Patient Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="height"
            label="Height (cm)"
            onChange={PtHeightChangeHandler}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="weight"
            label="Weight (kg)"
            onChange={PtWeightChangeHandler}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="age" label="Age (Yrs)" onChange={PtAgeChangeHandler} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Scr"
            label="Serum Cr (umol/L)"
            onChange={ScrChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              onChange={GenderChangeHandler}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={CalculateClickHandler}
          >
            Calculate
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
