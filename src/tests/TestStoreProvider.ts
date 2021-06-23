// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'redux-zero' or its correspondi... Remove this comment to see the full error message
import createStore from "redux-zero";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'redux-zero/react' or its corre... Remove this comment to see the full error message
import { Provider } from "redux-zero/react";

const initialState = { isSignedIn: false, id: null };
const store = createStore(initialState);

export function TestingProvider(props: any) {
  // @ts-expect-error ts-migrate(2365) FIXME: Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
  return <Provider store={store}>{props.children}</Provider>;
}
