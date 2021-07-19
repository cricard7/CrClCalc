import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles((theme) => ({
  ReferenceStyle: {
    padding: theme.spacing(2),
    display: "block",
  },
}));

const References = () => {
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
            References
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.ReferenceStyle}>
          <ol>
            <li>
              https://www.pharmacytimes.com/view/medications-that-always-use-actual-body-weight-to-calculate-creatinine-clearance
            </li>
            <li>
              Winter MA, Guhr KN, Berg GM. Impact of various body weights and
              serum creatinine concentrations on the bias and accuracy of the
              Cockcroft-Gault equation. Pharmacotherapy. 2012;32(7):604-612.
            </li>
            <li>
              Hanley MJ, Abernethy DR, Greenblatt DJ. Effects of obesity on the
              pharmacokinetics of drugs in humans. Clin Pharmacokinet 2010;
              49:71.
            </li>
            <li>
              https://www.mdcalc.com/creatinine-clearance-cockcroft-gault-equation#evidence
            </li>
            <li>Devine BJ. Gentamicin therapy. DICP. 1974; 8:650–5.</li>
          </ol>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default References;
