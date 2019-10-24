/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import Text from "../../../../../Text";
import colors from "../../../../../colors";

type Props = {|
  +children: React.Node,
|};

function DontItem({children}: Props) {
  return (
    <div className={css(styles.dontItemWrapper)}>
      <div className={css(styles.dontItemTitle)}>
        <Text weight="bold">Don&apos;t</Text>
      </div>
      <div className={css(styles.dontItemContent)}>{children}</div>
    </div>
  );
}

const styles = StyleSheet.create({
  dontItemWrapper: {
    height: "100%",
    display: "flex",
    flexFlow: "column nowrap",
  },
  dontItemTitle: {
    borderTop: `4px solid ${colors.red40}`,
    padding: "20px 0",
  },
  dontItemContent: {
    flex: "1 0 auto",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
  },
});

export default DontItem;
