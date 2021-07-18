// InputsCard

// Used to display card for patient inputs
//Ht Cm
//Wt Kg
//Age yrs
//Scr (umol/L)

import React from "react";
import { useState } from "react";


import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  
}
));

export default function InputsCard(props) {

  const classes = useStyles();

  const [PtHeight, setPtHeight] = useState(0);
  const [PtWeight, setPtWeight] = useState(0);
  const [PtAge, setPtAge] = useState(0);
  const [Scr, setScr] = useState(0);
  const [Gender, setGender] = useState(null)

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

    if(PtHeight !== 0 && PtWeight !==0 && PtAge !==0 && Scr !== 0 && Gender !== null){
      props.onCalculate({
        PtHeight: PtHeight,
        PtWeight: PtWeight,
        PtAge: PtAge,
        Scr: Scr,
        Gender: Gender
      })
    }
   

  };

  return (
   <>
     
      <Typography variant="h6" color="secondary" gutterBottom>
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
          <TextField id="age" label="Age (Yrs)" type="number" onChange={PtAgeChangeHandler} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Scr"
            label="Serum Cr (umol/L)"
            type="number"
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
              row
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
    </>
  );
}
