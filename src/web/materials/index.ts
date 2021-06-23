import PageConfig from "common/models/PageConfig.js";
import { lazy } from "react";

export default new PageConfig({
  url: "/materials",
  image: "/media/Filament",
  title: "Material Info",
  description: "Common material information",
  initialState: {},
  version: 0,
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'Promise<typeof import("/home/justin/code/rec... Remove this comment to see the full error message
  component: lazy(() => import("web/materials/Materials")),
});
