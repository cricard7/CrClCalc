import InputsCard from "./components/InputsCard.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Creatinine Clearance Calculator</Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Paper elevation={4}>
            <InputsCard />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
