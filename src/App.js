import { useState} from "react";

import InputsCard from "./components/InputsCard.js";
import WtBSA from "./components/WtBSA.js";
import CrClCard from "./components/CrClCard.js";
import Usage from "./components/Usage.js";
import References from "./components/References.js";

import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { teal, orange } from "@material-ui/core/colors";

//import clsx from 'clsx'; //https://surajsharma.net/blog/react-material-ui-add-classes
import classNames from 'classnames' //https://www.npmjs.com/package/classnames

import {
  calcBSA,
  calcBMI,
  calcIBWDevine,
  calcCrClIBW,
  calcCrClABW,
  calcAdjBW,
  calcAdjCrCl,
  calcmNBWCrCl
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
  selectedCrCl: {
    backgroundColor: teal[400]
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
  const [mNBWCrCl, setmNBWCrCl] = useState(0)

  //flags for toggling background color on CrCl Cards
  const [useIBW, setuseIBW] = useState(false)
  const [useABW, setUseABW] = useState(false)
  const [useAdjBW, setUseAdjBW] = useState(false)  

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

    //setBackground Color of CrCl Cards
    if(parseFloat(data.PtWeight) > parseFloat(tempIBW) && !((parseFloat(data.PtWeight) / parseFloat(tempIBW)) >= 1.3)){setuseIBW(true)}else{setuseIBW(false)}
    if((parseFloat(tempBMI) < 18.5) || (parseFloat(data.PtWeight) < parseFloat(tempIBW))){setUseABW(true)}else{setUseABW(false)}
    if((parseFloat(data.PtWeight) / parseFloat(tempIBW)) >= 1.3){setUseAdjBW(true)}else{setUseAdjBW(false)}
    

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

    //calculate mNBWCrCl
    setmNBWCrCl(calcmNBWCrCl({Scr: data.Scr, PtAge: data.PtAge, Gender: data.Gender}))

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
              <Paper elevation={5} className={classNames(classes.crclcardStyle, {[classes.selectedCrCl]: useIBW})}>
                <CrClCard 
                title="CrCl (IBW)" 
                CrCl={CrClIBW} 
                BW={IBW} 
                WtText={'Weight is IBW using Devine formula'} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={5} className={classNames(classes.crclcardStyle, {[classes.selectedCrCl]: useABW})}>
              <CrClCard 
                title="CrCl (ABW)" 
                CrCl={crClABW} 
                BW={ABW} 
                WtText={'Weight Using Actual Patient Weight'} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={5} className={classNames(classes.crclcardStyle, {[classes.selectedCrCl]: useAdjBW})}>
              <CrClCard 
                title="CrCl (Adj BW)" 
                CrCl={adjCrCl} 
                BW={adjBW} 
                WtText={'Weight Using Adjusted Body Weight'} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={5} className={classNames(classes.crclcardStyle)}>
              <CrClCard 
                title="CrCl (mNBW)" 
                CrCl={mNBWCrCl} 
                BW={"72"} 
                WtText={'Weight modified Normalized Body weight (mNBW). CrCl mL/min/72kg'} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
                <Usage/>
            </Grid>
            <Grid item xs={12}>
                <References/>
            </Grid>

          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
