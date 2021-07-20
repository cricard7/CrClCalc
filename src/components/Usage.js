import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  UsageStyle: {
    padding: theme.spacing(2),
    display: "block",
  },
}));

const Usage = () => {
  const classes = useStyles();
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <Typography variant="h5" color="primary">
            Usage Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.UsageStyle}>
          <Typography variant="body1" color="initial">
            Height, Weight, Age, Scr and Gender must best entered before calculating values
          </Typography>
          <Typography variant="body1" color="error">
            For patients where actual is 30% greater than ideal, consideration
            should be given to using Adjusted Body Weight. <br />
            Adjusted body weight (ABW), kg = IBW, kg + 0.4 × (actual body
            weight, kg – IBW, kg)
          </Typography>
          <br />
          <Typography variant="body1" color="initial">
            BMI - Body Mass Index in kg/m2 = Weight(kg) / (Height (m)^2)
          </Typography>
          <Typography variant="body1" color="initial">
            IBW Devine: Male: 50 kg + 2.3 kg for each inch over 5 feet Female:
            45.5 kg + 2.3 kg for each inch over 5 feet
          </Typography>
          <br />
          <Typography variant="body1" color="initial">
            CrCl* = Creatinine Clearance using Cockcroft-Gault Equation: [(140 -
            age) * weight * N] / Scr where N = 1.04 for females and 1.23 for
            males
          </Typography>
          <Typography variant="body1" color="initial">
            *For patients that are underweight (BMI less than 18.5), consider
            using actual weight <br />
            *For patients that are normal weight,(BMI 18.5-24.9), consider using
            ideal body weight <br/>
            *Consider using actual body weight when actual weight is less than ideal weight
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Usage;
