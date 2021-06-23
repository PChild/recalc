import { setTitle } from "common/tooling/routing";
import version from "version";

export default function About() {
  setTitle("About");

  return (
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
    <div className="content">
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'h2'.
      <h2 className="title is-2">⎰ReCalc</h2>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'h3'.
      <h3 className="title is-3">About</h3>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'p'.
      <p>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'ReCalc'.
        ⎰ReCalc is a mechanical design calculator, focused on ease of //
        @ts-expect-error ts-migrate(2304) FIXME: Cannot find name
        'collaboration'. collaboration and a quality user interface.
      </p>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'h3'.
      <h3 className="title is-3">Thanks & Credits</h3>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'p'.
      <p>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'My'. My
        thanks to go many people throughout the FRC community, specifically //
        @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'CD'. CD
        users:
      </p>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'ul'.
      <ul>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'li'.
        <li>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'AriMB'.
          AriMB, for // @ts-expect-error ts-migrate(2304) FIXME: Cannot find
          name 'a'.
          <a href="https://arimb.github.io/AMB_Design_Spreadsheet/">
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'an'.
            an incredible design calculator
          </a>
        </li>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'li'.
        <li>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'pchild'.
          pchild, also for // @ts-expect-error ts-migrate(2304) FIXME: Cannot
          find name 'a'.
          <a href="http://calc.team401.org/">an incredible design calculator</a>
        </li>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'li'.
        <li>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'dydx'.
          dydx, for // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name
          'a'.
          <a href="https://www.chiefdelphi.com/t/flywheel-calculator/372836">
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'a'. a
            great flywheel calculator
          </a>{" "}
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'and'.
          and explaining how it works to me
        </li>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'li'.
        <li>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'JVN'.
          JVN, for // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name
          'a'.
          <a href="https://johnvneun.com/calc">
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'one'.
            one of the most impactful design calculators in FRC
          </a>
        </li>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'li'.
        <li>JackTervay, for the renders on the landing</li>
      </ul>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'p'.
      <p>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'And'. And
        of course all the people who found bugs and offered feedback & //
        @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'suggestions'.
        suggestions.
      </p>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'h3'.
      <h3 className="title is-3">How accurate are the calculators?</h3>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'p'.
      <p>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'The'. The
        math behind them is sound &ldquo;in theory,&rdquo; but of course, //
        @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'everything'.
        everything works in theory. There are lots of variables that go into a
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'robot'.
        robot, and the results of the calculator may not be perfect. If you //
        @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'believe'.
        believe there to be any error in the calculators (major or minor), //
        @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'please'.
        please feel free to // @ts-expect-error ts-migrate(2304) FIXME: Cannot
        find name 'a'.
        <a href="https://www.chiefdelphi.com/u/jtrv/">shoot me a PM on CD</a> or
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'a'.
        <a href="https://github.com/tervay/recalc/issues">
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'an'.
          open an issue on GitHub.
        </a>
      </p>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'h3'.
      <h3 className="title is-3">Source code</h3>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'p'.
      <p>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'The'. The
        source code for ⎰ReCalc can be found // @ts-expect-error
        ts-migrate(2304) FIXME: Cannot find name 'a'.
        <a href="https://github.com/tervay/recalc">on GitHub.</a>
      </p>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'p'.
      <p>Pull requests / issues / suggestions are welcome!</p>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'a'.
      <a href={"https://github.com/tervay/recalc/tree/v" + version}>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'div'.
        <div className="tags has-addons">
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'span'.
          <span className="tag">Version</span>
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'span'.
          <span className="tag is-primary">{version}</span>
        </div>
      </a>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'h3'.
      <h3 className="title is-3">Disclaimer</h3>
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'p'.
      <p>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'This'.
        This site is not in any way affiliated or endorsed by FIRST nor Google.
      </p>
    </div>
  );
}
