/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import formGuidelineStyles from "../guidelines/styles";
import Text from "../../../Text";
import colors from "../../../colors";

type Props = {|
  +doContent: React.ChildrenArray<any>,
  +dontContent: React.ChildrenArray<any>,
|};

function DoDontSection({doContent, dontContent}: Props) {
  return (
    <section className={css(formGuidelineStyles.row)}>
      <div
        className={css(
          formGuidelineStyles.col,
          formGuidelineStyles.colAuto,
          styles.section,
          styles.do
        )}
      >
        <Text scale="title" weight="bold">
          Do
        </Text>
        <div className={css(styles.content)}>{doContent}</div>
      </div>
      <div
        className={css(
          formGuidelineStyles.col,
          formGuidelineStyles.colAuto,
          styles.section,
          styles.dont
        )}
      >
        <Text scale="title" weight="bold">
          Don&#39;t
        </Text>
        <div className={css(styles.content)}>{dontContent}</div>
      </div>
    </section>
  );
}

const styles = StyleSheet.create({
  section: {
    position: "relative",
    marginTop: "40px",
    paddingTop: "20px",
    ":before": {
      content: '""',
      position: "absolute",
      height: "4px",
      width: "100%",
      top: "0",
    },
  },
  do: {
    ":before": {
      background: colors.green40,
    },
  },
  dont: {
    ":before": {
      background: colors.red40,
    },
  },
  content: {
    paddingTop: "8px",
  },
});

export default DoDontSection;
