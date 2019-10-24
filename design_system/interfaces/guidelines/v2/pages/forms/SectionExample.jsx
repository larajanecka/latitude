/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */
import * as React from "react";

import {css, StyleSheet} from "aphrodite";
import colors from "../../../../../../colors";

type Props = {|
  +children: React.Node,
|};

export default function SectionExample({children}: Props) {
  return (
    <div className={css(sectionStyles.section)}>
      <div className={css(sectionStyles.form)}>{children}</div>
    </div>
  );
}

const sectionStyles = StyleSheet.create({
  section: {
    background: colors.grey10,
    padding: "36px 36px 0 36px",
    marginBottom: 36,
  },
  form: {
    background: colors.white,
    padding: "36px 20px 36px 20px",
  },
});
