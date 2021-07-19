import React from "react";
import { Typography, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const CrClCard = (props) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6" color="secondary" gutterBottom>
            {props.title}
          </Typography>

          <Typography variant="h5" color="initial">
            CrCl: {props.CrCl} ml/min
          </Typography>

          <Typography variant="h5" color="initial">
            Weight: {props.BW} kg
          </Typography>
        </Grid>
        <Grid item>
          <div>
            <Typography variant="caption" color="primary">
              {props.WtText}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CrClCard;
