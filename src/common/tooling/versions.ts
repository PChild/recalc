export function defaultAssignment(query: any, queryParams: any) {
  const r = {};
  Object.keys(query).forEach((k) => {
    if (k !== "version") {
      Object.assign(r, {
        [k]: queryParams[k].decode(query[k]),
      });
    }
  });
  return r;
}
