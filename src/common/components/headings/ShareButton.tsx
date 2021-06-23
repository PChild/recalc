import { buildUrlForCurrentPage } from "common/tooling/query-strings";
import propTypes from "prop-types";

export default function ShareButton(props: any) {
  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'button'.
    <button
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
      className="button is-primary has-text-white"
      // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'onClick'. Did you mean 'onclick'... Remove this comment to see the full error message
      onClick={() =>
        navigator.clipboard.writeText(buildUrlForCurrentPage(props.getQuery()))
      }
    >
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'span'.
      <span className="icon is-small">
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'i'.
        <i className="fas fa-link" />
      </span>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'span'.
      <span>Copy link</span>
    </button>
  );
}

ShareButton.propTypes = {
  getQuery: propTypes.func.isRequired,
};
