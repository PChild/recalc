import { parse, stringify } from "query-string";
import { encodeQueryParams } from "use-query-params";

export class QueryableParamHolder {
  name: any;
  paramType: any;
  value: any;
  constructor(state: any, paramType: any) {
    this.paramType = paramType;
    this.name = Object.keys(state)[0];
    this.value = state[this.name];
  }
}

/**
 *
 * @param {QueryableParamHolder[]} queryableParamHolders
 * @return {string}
 */
export function stateToQueryString(queryableParamHolders: any) {
  const queryParams = Object.assign(
    // @ts-expect-error ts-migrate(2557) FIXME: Expected at least 1 arguments, but got 0 or more.
    ...queryableParamHolders.map((qph: any) => ({
      [qph.name]: qph.paramType
    }))
  );
  const queryValues = Object.assign(
    // @ts-expect-error ts-migrate(2557) FIXME: Expected at least 1 arguments, but got 0 or more.
    ...queryableParamHolders.map((qph: any) => ({
      [qph.name]: qph.value
    }))
  );
  return stringify(encodeQueryParams(queryParams, queryValues));
}

/**
 *
 * @param {string} queryString
 * @returns {string}
 */
export function buildUrlForCurrentPage(queryString: any) {
  const base = window.location.origin + window.location.pathname;
  return `${base}?${queryString}`;
}

export function queryStringToDefaults(
  query: any,
  queryParams: any,
  defaults: any,
  conversionFn: any
) {
  const strings = parse(query);

  if (conversionFn === undefined) {
    Object.keys(strings).forEach((k) => {
      if (k !== "version" && k in queryParams) {
        Object.assign(defaults, { [k]: queryParams[k].decode(strings[k]) });
      }
    });
  } else {
    Object.assign(defaults, conversionFn(strings, queryParams));
  }

  return defaults;
}
