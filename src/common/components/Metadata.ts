import PageConfig from "common/models/PageConfig";
import propTypes from "prop-types";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Helmet } from "react-helmet";

export default function Metadata(props: any) {
  return (
    // @ts-expect-error ts-migrate(2365) FIXME: Operator '<' cannot be applied to types 'number' a... Remove this comment to see the full error message
    <Helmet>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'title'.
      <title>ReCalc - {props.config.title}</title>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'meta'.
      <meta name="og:title" content={"ReCalc -" + props.config.title} />

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'link'.
      <link rel="canonical" href={window.location.origin + props.config.url} />
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'meta'.
      <meta
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'property'.
        property="og:url"
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'content'.
        content={window.location.origin + props.config.url}
      />

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'meta'.
      <meta
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'property'.
        property="og:image"
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'content'.
        content={window.location.origin + props.config.image + ".png"}
      />

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'meta'.
      <meta
        name="description"
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'content'.
        content={"ReCalc (for FRC) - " + props.config.description}
      />
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'meta'.
      <meta
        name="og:description"
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'content'.
        content={"ReCalc (for FRC) - " + props.config.description}
      />
    </Helmet>
  );
}

Metadata.propTypes = {
  config: propTypes.instanceOf(PageConfig),
};
