import InputsCard from "./components/InputsCard.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { parse, format } from "mathjs";

function App() {
  const calcBSA = ({ PtHeight, PtWeight }) => {
    //ht in cm, wt in kg
    //calc BSA in m2
    const BSA = parse("sqrt( (Ht * Wt) / 3600 )");

    return BSA.evaluate({ Ht: PtHeight, Wt: PtWeight }).toFixed(2);
  };

  const calcBMI = ({ PtHeight, PtWeight }) => {
    //ht in cm, wt in kg
    //calc BMI in kg/m2

    const BMI = parse("wt/((ht/100)^2)");

    return BMI.evaluate({ wt: PtWeight, ht: PtHeight }).toFixed(2);
  };

  const calcIBWDevine = ({ PtHeight, Gender }) => {
    //ht in cm

    if((PtHeight/2.54) >= 60){
      const inchOver5Ft = ((PtHeight / 2.54) - 60)
      
      if (Gender === "female") {
        const IBW = parse("45.5 + (2.3 * inchOver5Ft)");
        return IBW.evaluate({inchOver5Ft: inchOver5Ft})
      }

      if (Gender === "male") {
        const IBW = parse("50 + (2.3 * inchOver5Ft)");
        return IBW.evaluate({inchOver5Ft: inchOver5Ft})
      } 
    }

  };

  const calcCrClIBW = ({PtAge, IBW, Gender, Scr}) => {
    var N
    if (Gender === "female") {N = 1.04}
    if (Gender === "male"){N = 1.23}
    
    const crClIBW = parse("((140 - age) * IBW * N) / Scr")
    return crClIBW.evaluate({age: PtAge, IBW: IBW, N:N, Scr: Scr}).toFixed(2)

  };

  const calcCrClABW = ({PtAge, ABW, Gender, Scr}) => {
    var N
    if (Gender === "female") {N = 1.04}
    if (Gender === "male"){N = 1.23}
    
    const crClIBW = parse("((140 - age) * ABW * N) / Scr")
    return crClIBW.evaluate({age: PtAge, ABW: ABW, N:N, Scr: Scr}).toFixed(2)

  };

  const calcAdjBW = ({IBW, ABW}) => {
    const AdjBW = parse('IBW + (0.4 * (ABW - IBW))')
    return AdjBW.evaluate({IBW: IBW, ABW: ABW})
  };


  const calcAdjCrCl = ({PtAge, AdjBW, Gender, Scr}) => {
    // calc CrCl ml/min using adjusted body weight
    var N
    if (Gender === "female") {N = 1.04}
    if (Gender === "male"){N = 1.23}
    
    const crClIBW = parse("((140 - age) * AdjBW * N) / Scr")
    return crClIBW.evaluate({age: PtAge, AdjBW: AdjBW, N:N, Scr: Scr}).toFixed(2)
  };

  const calculateHandler = (data) => {
    console.log(data);

    //Calculate BSA m2
    console.log(calcBSA({ PtHeight: data.PtHeight, PtWeight: data.PtWeight }));

    //Calculate BMI kg/m2
    console.log(calcBMI({ PtHeight: data.PtHeight, PtWeight: data.PtWeight }));
    
    //Calculate IBW (Devine) kg
    console.log(calcIBWDevine({PtHeight: data.PtHeight, Gender: data.Gender}))
    var IBW = calcIBWDevine({PtHeight: data.PtHeight, Gender: data.Gender})
    //Calculate CrCl IBW ml/min
    console.log(calcCrClIBW({PtAge: data.PtAge, IBW: IBW, Gender: data.Gender, Scr: data.Scr }))

    //Calculate CrCl Actual BW ml/min
    console.log(calcCrClABW({PtAge: data.PtAge, ABW: data.PtWeight, Gender: data.Gender, Scr: data.Scr }))
    
    //if ABW >= 30% IBW then calculate Adjusted Body Weight kg
    console.log(calcAdjBW({IBW:IBW, ABW: data.PtWeight}))
    var AdjBW = calcAdjBW({IBW:IBW, ABW: data.PtWeight})
    //if ABW >= 30% IBW then calculate Adjusted CrCl ml/min
    console.log(calcAdjCrCl({PtAge: data.PtAge, AdjBW: AdjBW, Gender: data.Gender, Scr: data.Scr}))
  };

  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Creatinine Clearance Calculator</Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={6}>
          <Paper elevation={10}>
            <InputsCard onCalculate={calculateHandler} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
