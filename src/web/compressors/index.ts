import PageConfig from "common/models/PageConfig.js";
import { lazy } from "react";

export default new PageConfig({
  url: "/compressors",
  image: "/media/Compressor",
  description: "Legal compressor information",
  initialState: {},
  version: 0,
  title: "Compressor Info",
  // @ts-expect-error ts-migrate(6142) FIXME: Module 'web/compressors/Compressors' was resolved ... Remove this comment to see the full error message
  component: lazy(() => import("web/compressors/Compressors")),
});
