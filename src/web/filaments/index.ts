import PageConfig from "common/models/PageConfig.js";
import { lazy } from "react";

export default new PageConfig({
  url: "/filaments",
  image: "/media/Filament",
  title: "Filament Info",
  description: "Common filament information",
  initialState: {},
  version: 0,
  // @ts-expect-error ts-migrate(6142) FIXME: Module 'web/filaments/Filaments' was resolved to '... Remove this comment to see the full error message
  component: lazy(() => import("web/filaments/Filaments")),
});
