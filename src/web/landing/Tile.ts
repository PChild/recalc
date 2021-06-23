import propTypes from "prop-types";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Link } from "react-router-dom";

export default function Tile(props: any) {
  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'to'.
    <Link to={props.to}>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
      <div className={"recalc-box"}>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
        <div className="columns">
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className="column is-one-quarter">
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'figure'.
            <figure className="image is-4by3">
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'picture'.
              <picture>
                {props.image && (
                  <>
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'source'.
                    <source type="image/webp" srcSet={props.image + ".webp"} />
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'source'.
                    <source type="image/png" srcSet={props.image + ".png"} />
                  </>
                )}
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'img'.
                <img
                  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'src'.
                  src={
                    (props.image ||
                      "https://bulma.io/images/placeholders/1280x960") + ".png"
                  }
                  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'alt'.
                  alt={props.title}
                />
              </picture>
            </figure>
          </div>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'className'.
            className="column subtitle"
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'style'.
            style={{ display: "flex", alignItems: "center" }}
          // @ts-expect-error ts-migrate(2365) FIXME: Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
          >
            // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
            {props.title}
          </div>
        </div>
      </div>
    </Link>
  );
}

Tile.propTypes = {
  to: propTypes.string,
  image: propTypes.string,
  title: propTypes.string,
  subtitle: propTypes.string,
};
