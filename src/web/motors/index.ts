import PageConfig from "common/models/PageConfig.js";
import { lazy } from "react";

export default new PageConfig({
  url: "/motors",
  image: "/media/Motor",
  title: "Motor Info",
  description: "Legal motor information",
  initialState: {},
  version: 0,
  // @ts-expect-error ts-migrate(6142) FIXME: Module 'web/motors/Motors' was resolved to '/home/... Remove this comment to see the full error message
  component: lazy(() => import("web/motors/Motors")),
});
