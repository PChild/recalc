import { defaultAssignment } from "common/tooling/versions";

import flywheel from "./index";

export function flywheelVersionManager(query: any, queryParams: any) {
  if (
    query.version === undefined ||
    Number(query.version) === flywheel.version
  ) {
    return defaultAssignment(query, queryParams);
  }
}
