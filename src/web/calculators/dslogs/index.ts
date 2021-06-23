import PageConfig from "common/models/PageConfig.js";
import { lazy } from "react";

export default new PageConfig({
  url: "/dslogs",
  title: "DS Log Viewer",
  version: 1,
  initialState: {},
  // @ts-expect-error ts-migrate(6142) FIXME: Module 'web/calculators/dslogs/DSLogs' was resolve... Remove this comment to see the full error message
  component: lazy(() => import("web/calculators/dslogs/DSLogs")),
});
