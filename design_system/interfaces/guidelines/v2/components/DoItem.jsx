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

function DoItem({children}: Props) {
  return (
    <div className={css(styles.doItemWrapper)}>
      <div className={css(styles.doItemTitle)}>
        <Text weight="bold">Do</Text>
      </div>
      <div className={css(styles.doItemContent)}>{children}</div>
    </div>
  );
}

const styles = StyleSheet.create({
  doItemWrapper: {
    height: "100%",
    display: "flex",
    flexFlow: "column nowrap",
  },
  doItemTitle: {
    borderTop: `4px solid ${colors.green40}`,
    padding: "20px 0",
  },
  doItemContent: {
    flex: "1 0 auto",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
  },
});

export default DoItem;
