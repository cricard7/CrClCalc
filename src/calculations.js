import { parse } from "mathjs";

const calcBSA = ({ PtHeight, PtWeight }) => {
  //ht in cm, wt in kg
  //calc BSA in m2
  //Mosteller formula
  
  const BSA = parse("sqrt( (Ht * Wt) / 3600 )");

  return BSA.evaluate({ Ht: PtHeight, Wt: PtWeight }).toFixed(2);
};

const calcBMI = ({ PtHeight, PtWeight }) => {
  //ht in cm, wt in kg
  //calc BMI in kg/m2

  const BMI = parse("wt/((ht/100)^2)");

  return BMI.evaluate({ wt: PtWeight, ht: PtHeight }).toFixed(2);
};

const calcIBWDevine = ({ PtHeight, Gender, PtWeight }) => {
  //ht in cm

  if (PtHeight / 2.54 >= 60) {
    const inchOver5Ft = PtHeight / 2.54 - 60;

    if (Gender === "female") {
      const IBW = parse("45.5 + (2.3 * inchOver5Ft)");
      return IBW.evaluate({ inchOver5Ft: inchOver5Ft });
    }

    if (Gender === "male") {
      const IBW = parse("50 + (2.3 * inchOver5Ft)");
      return IBW.evaluate({ inchOver5Ft: inchOver5Ft });
    }
  } else {
    return PtWeight;
  }
};

const calcCrClIBW = ({ PtAge, IBW, Gender, Scr }) => {
  var N;
  if (Gender === "female") {
    N = 1.04;
  }
  if (Gender === "male") {
    N = 1.23;
  }

  const crClIBW = parse("((140 - age) * IBW * N) / Scr");
  return crClIBW.evaluate({ age: PtAge, IBW: IBW, N: N, Scr: Scr }).toFixed(2);
};

const calcCrClABW = ({ PtAge, ABW, Gender, Scr }) => {
  var N;
  if (Gender === "female") {
    N = 1.04;
  }
  if (Gender === "male") {
    N = 1.23;
  }

  const crClIBW = parse("((140 - age) * ABW * N) / Scr");
  return crClIBW.evaluate({ age: PtAge, ABW: ABW, N: N, Scr: Scr }).toFixed(2);
};

const calcAdjBW = ({ IBW, ABW }) => {
  const AdjBW = parse("IBW + (0.4 * (ABW - IBW))");
  return AdjBW.evaluate({ IBW: IBW, ABW: ABW });
};

const calcAdjCrCl = ({ PtAge, AdjBW, Gender, Scr }) => {
  // calc CrCl ml/min using adjusted body weight
  var N;
  if (Gender === "female") {
    N = 1.04;
  }
  if (Gender === "male") {
    N = 1.23;
  }

  const crClIBW = parse("((140 - age) * AdjBW * N) / Scr");
  return crClIBW
    .evaluate({ age: PtAge, AdjBW: AdjBW, N: N, Scr: Scr })
    .toFixed(2);
};

export {
  calcBSA,
  calcBMI,
  calcIBWDevine,
  calcCrClIBW,
  calcCrClABW,
  calcAdjBW,
  calcAdjCrCl
};
