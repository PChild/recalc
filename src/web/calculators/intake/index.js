import Measurement from "common/models/Measurement";
import Motor from "common/models/Motor";
import PageConfig from "common/models/PageConfig.js";
import Ratio from "common/models/Ratio";
import { lazy } from "react";

export default new PageConfig({
  url: "/intake",
  title: "Intake Calculator",
  description: "Intake speed and load calculator",
  image: "/media/Intake",
  version: 1,
  initialState: {
    motor: Motor.Falcon500s(1),
    travelDistance: new Measurement(20, "in"),
    rollerDiameter: new Measurement(2, "in"),
    dragLoad: new Measurement(10, "lb"),
    ratio: new Ratio(2, Ratio.REDUCTION),
    intakeSides: 1,
    efficiency: 100,
  },
  component: lazy(() => import("web/calculators/intake/Intake")),
});
