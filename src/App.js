import { useState, useEffect } from "react";

import InputsCard from "./components/InputsCard.js";
import WtBSA from "./components/WtBSA.js";
import CrClCard from "./components/CrClCard.js";

import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { teal, orange } from "@material-ui/core/colors";

import {
  calcBSA,
  calcBMI,
  calcIBWDevine,
  calcCrClIBW,
  calcCrClABW,
  calcAdjBW,
  calcAdjCrCl,
} from "./calculations.js";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: theme.spacing(2),
    height: 300,
    display: "flex",
    overflow: "auto",
  },
  patientInfoStyle: {
    padding: theme.spacing(2),
    minHeight: 300,
    overflow: "auto",
  },
  crclcardStyle: {
    padding: theme.spacing(2),
    Height: 200,
    overflow: "auto",
  },
  referencesStyle: {
    padding: theme.spacing(2),

  },
  containerStyle: {
    marginTop: theme.spacing(2),
  },
}));

const theme = createTheme({
  palette: {
    primary: teal,
    secondary: orange,
  },
});

const App = () => {
  const classes = useStyles();

  const [BMI, setBMI] = useState(0);
  const [BSA, setBSA] = useState(0);
  const [CrClIBW, setCrClIBW] = useState(0);
  const [IBW, setIBW] = useState(0);
  const [crClABW, setcrClABW] = useState(0)
  const [adjBW, setadjBW] = useState(0)
  const [adjCrCl, setadjCrCl] = useState(0)
  const [ABW, setABW] = useState(0)

  const calculateHandler = (data) => {
    console.log(data);

    const tempBSA = calcBSA({ PtHeight: data.PtHeight, PtWeight: data.PtWeight })
    const tempBMI = calcBMI({ PtHeight: data.PtHeight, PtWeight: data.PtWeight })
    const tempIBW = calcIBWDevine({
      PtHeight: data.PtHeight,
      Gender: data.Gender,
      PtWeight: data.PtWeight,
    })
    const tempcrClIBW = calcCrClIBW({
      PtAge: data.PtAge,
      IBW: tempIBW,
      Gender: data.Gender,
      Scr: data.Scr,
    })
    const tempcrClABW =  calcCrClABW({
      PtAge: data.PtAge,
      ABW: data.PtWeight,
      Gender: data.Gender,
      Scr: data.Scr,
    })
    const tempAdjBW = calcAdjBW({ IBW: tempIBW, ABW: data.PtWeight })
    const tempAdjCrCl = calcAdjCrCl({
      PtAge: data.PtAge,
      AdjBW: tempAdjBW,
      Gender: data.Gender,
      Scr: data.Scr,
    })

    //set Actual Weight for display
    setABW(data.PtWeight)
    //Calculate BSA m2
    setBSA(tempBSA);
    //Calculate BMI kg/m2
    setBMI(tempBMI);
    //Calculate IBW (Devine) kg
    setIBW(tempIBW);
    //calculate CrCl IBW
    setCrClIBW(tempcrClIBW);
    //Calculate CrCl Actual BW ml/min
    setcrClABW(tempcrClABW)
    //if ABW >= 30% IBW then calculate Adjusted Body Weight kg
    setadjBW(tempAdjBW)
    //if ABW >= 30% IBW then calculate Adjusted CrCl ml/min
    setadjCrCl(tempAdjCrCl)
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6">
              Creatinine Clearance Calculator
            </Typography>
          </Toolbar>
        </AppBar>

        <Container fixed className={classes.containerStyle}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper elevation={5} className={classes.patientInfoStyle}>
                <InputsCard onCalculate={calculateHandler} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper elevation={5} className={classes.paperStyle}>
                <WtBSA BSA={BSA} BMI={BMI} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={5} className={classes.crclcardStyle}>
                <CrClCard 
                title="CrCl (IBW)" 
                CrCl={CrClIBW} 
                BW={IBW} 
                WtText={'Weight is IBW using Devine formula'} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={5} className={classes.crclcardStyle}>
              <CrClCard 
                title="CrCl (ABW)" 
                CrCl={crClABW} 
                BW={ABW} 
                WtText={'Weight Using Actual Patient Weight'} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={5} className={classes.crclcardStyle}>
              <CrClCard 
                title="CrCl (Adj BW)" 
                CrCl={adjCrCl} 
                BW={adjBW} 
                WtText={'Weight Using Adjusted Body Weight'} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
            <Paper elevation={5} className={classes.referencesStyle}>
                <Typography variant="h5" color="primary">Usage Information</Typography>
                <Typography variant="body1" color="error">
                For patients where actual is 30% greater than ideal, consideration should be given to using Adjusted Body Weight. <br/>
                Adjusted body weight (ABW), kg = IBW, kg + 0.4 × (actual body weight, kg – IBW, kg)
                </Typography>
                <br/>
                <Typography variant="body1" color="initial">
                BMI - Body Mass Index in kg/m2 = Weight(kg) / (Height (m)^2)
                </Typography>
                <Typography variant="body1" color="initial">
                IBW Devine: Male: 50 kg + 2.3 kg for each inch over 5 feet    Female: 45.5 kg + 2.3 kg for each inch over 5 feet
                </Typography>
                <br/>
                <Typography variant="body1" color="initial">
                CrCl* = Creatinine Clearance using Cockcroft-Gault Equation:  [(140 - age) * weight * N] / Scr   where N = 1.04 for females and 1.23 for males
                </Typography>
                <Typography variant="body1" color="initial">
                *For patients that are underweight (BMI less than 18.5), consider using actual weight <br/>
                *For patients that are normal weight,(BMI 18.5-24.9), consider using ideal body weight
                </Typography>
            </Paper>
            </Grid>
            <Grid item xs={12}>
            <Paper elevation={5} className={classes.referencesStyle}>
                <Typography variant="h5" color="primary">References</Typography>
                  <ol>
                    <li>https://www.pharmacytimes.com/view/medications-that-always-use-actual-body-weight-to-calculate-creatinine-clearance</li>
                    <li>Winter MA, Guhr KN, Berg GM. Impact of various body weights and serum creatinine concentrations on the bias and accuracy of the Cockcroft-Gault equation. Pharmacotherapy. 2012;32(7):604-612.</li>
                    <li>Hanley MJ, Abernethy DR, Greenblatt DJ. Effects of obesity on the pharmacokinetics of drugs in humans. Clin Pharmacokinet 2010; 49:71.</li>
                    <li>https://www.mdcalc.com/creatinine-clearance-cockcroft-gault-equation#evidence</li>
                    <li>Devine BJ. Gentamicin therapy. DICP. 1974; 8:650–5.</li>
                  </ol>
            </Paper>
            </Grid>

          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
