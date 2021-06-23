import { defaultAssignment } from "common/tooling/versions";

import belts from "./index";

export function beltVersionManager(query: any, queryParams: any) {
  if (query.version === undefined || Number(query.version) === belts.version) {
    return defaultAssignment(query, queryParams);
  }
}
