import { useState } from "react";

import InputsCard from "./components/InputsCard.js";
import WtBSA from "./components/WtBSA.js";

import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core";

import { calcBSA, calcBMI, calcIBWDevine, calcCrClIBW, calcCrClABW, calcAdjBW, calcAdjCrCl } from "./calculations.js"

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: theme.spacing(2),
    height: 300,
    display: 'flex',
    overflow: 'auto'

  },
  containerStyle: {
    marginTop: theme.spacing(2)
  }
}));

function App() {
  const classes = useStyles();

  const [BMI, setBMI] = useState(0)
  const [BSA, setBSA] = useState(0)

  const calculateHandler = (data) => {
    console.log(data);

    //Calculate BSA m2
    setBSA(calcBSA({ PtHeight: data.PtHeight, PtWeight: data.PtWeight }))
    
    //Calculate BMI kg/m2
    setBMI(calcBMI({ PtHeight: data.PtHeight, PtWeight: data.PtWeight }))

    //Calculate IBW (Devine) kg
    console.log(
      calcIBWDevine({
        PtHeight: data.PtHeight,
        Gender: data.Gender,
        PtWeight: data.PtWeight,
      })
    );
    var IBW = calcIBWDevine({
      PtHeight: data.PtHeight,
      Gender: data.Gender,
      PtWeight: data.PtWeight,
    });
    //Calculate CrCl IBW ml/min
    console.log(
      calcCrClIBW({
        PtAge: data.PtAge,
        IBW: IBW,
        Gender: data.Gender,
        Scr: data.Scr,
      })
    );

    //Calculate CrCl Actual BW ml/min
    console.log(
      calcCrClABW({
        PtAge: data.PtAge,
        ABW: data.PtWeight,
        Gender: data.Gender,
        Scr: data.Scr,
      })
    );

    //if ABW >= 30% IBW then calculate Adjusted Body Weight kg
    console.log(calcAdjBW({ IBW: IBW, ABW: data.PtWeight }));
    var AdjBW = calcAdjBW({ IBW: IBW, ABW: data.PtWeight });
    //if ABW >= 30% IBW then calculate Adjusted CrCl ml/min
    console.log(
      calcAdjCrCl({
        PtAge: data.PtAge,
        AdjBW: AdjBW,
        Gender: data.Gender,
        Scr: data.Scr,
      })
    );
  };

  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Creatinine Clearance Calculator</Typography>
        </Toolbar>
      </AppBar>

      <Container fixed className={classes.containerStyle}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper elevation={5} className={classes.paperStyle}>
              <InputsCard onCalculate={calculateHandler} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper elevation={5} className={classes.paperStyle}>
              <WtBSA BSA={BSA} BMI={BMI} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
