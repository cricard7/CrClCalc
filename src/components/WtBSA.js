import React from "react";
import { Typography, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const WtBSA = (props) => {
  const classes = useStyles();
  return (
    <>
      <Grid container direction="column" justifyContent="space-between" spacing={1}>
        <Grid item>
          <Typography variant="h6" color="secondary" gutterBottom>
            Calc BSA (m2) BMI (kg/m2)
          </Typography>

          <Typography variant="h5" color="initial">
            BSA: {props.BSA} m<sup>2</sup>
          </Typography>

          <Typography variant="h5" color="initial">
            BMI: {props.BMI} kg/m<sup>2</sup>
          </Typography>
        </Grid>
        <Grid item>
          <div>
            <Typography variant="caption" color="primary">
              BSA calculated using Mosteller formula
            </Typography>
          </div>
          <div>
            <Typography variant="caption" color="primary">
              BMI calculated using Quetelet's equation
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default WtBSA;
