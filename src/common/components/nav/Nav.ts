// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'nav'.
    <nav className="navbar level is-primary">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
      <div className="level-item has-text-centered">
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'to'.
        <Link to="/" className="navbar-item">
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
          <div className="nav-title">
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'b'.
            <b>⎰ReCalc (Alpha)</b>
          </div>
        </Link>
      </div>
    </nav>
  );
}
