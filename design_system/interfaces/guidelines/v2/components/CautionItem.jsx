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

function CautionItem({children}: Props) {
  return (
    <div className={css(styles.cautionItemWrapper)}>
      <div className={css(styles.cautionItemTitle)}>
        <Text weight="bold">Caution</Text>
      </div>
      <div className={css(styles.cautionItemContent)}>{children}</div>
    </div>
  );
}

const styles = StyleSheet.create({
  cautionItemWrapper: {
    height: "100%",
    display: "flex",
    flexFlow: "column nowrap",
  },
  cautionItemTitle: {
    borderTop: `4px solid ${colors.orange50}`,
    padding: "20px 0",
  },
  cautionItemContent: {
    flex: "1 0 auto",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
  },
});

export default CautionItem;
