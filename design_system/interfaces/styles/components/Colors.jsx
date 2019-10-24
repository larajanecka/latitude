/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import Highlight from "react-highlight/lib/optimized";

import Text from "../../../../Text";
import TextLink from "../../../../TextLink";
import Tooltip from "../../../../Tooltip";
import Group from "../../../../Group";
import ColorPalette, {
  ProductPalette,
  ColorClassificationLegend,
} from "../../../components/helpers/ColorPalette";

const backgroundRule = "backgroundColor: colors.grey10";
// eslint-disable-next-line no-template-curly-in-string
const borderRule = "border: `1px solid ${colors.grey30}`";

export default function Colors() {
  return (
    <div className={css(styles.wrapper)}>
      <div className={css(styles.content)}>
        <div className={css(styles.header)}>
          <Group flexDirection="column" gap={20}>
            <div className={css(styles.title)}>
              <Text scale="headline" weight="bold">
                Colors
              </Text>
            </div>
            <div className={css(styles.short)}>
              <Text scale="title">
                The color system lays the foundation for all color usage across
                Flexport
              </Text>
            </div>
            <Highlight languages={["javascript"]}>
              {`import colors from "latitude/colors";`}
            </Highlight>
            <Tooltip overlay="View our colors on GitHub!" placement="bottom">
              <span>
                <TextLink
                  href="https://github.com/flexport/flexport/blob/master/webpack/assets/javascrip../colors.js"
                  openInNewTab={true}
                  weight="bold"
                >
                  Open in Github
                </TextLink>
              </span>
            </Tooltip>
          </Group>
        </div>
        <section className={css(styles.section, styles.overview)}>
          <Group flexDirection="column" gap={36}>
            <Group justifyContent="space-between">
              <Text scale="title" weight="bold">
                Palette
              </Text>
              <ColorClassificationLegend />
            </Group>
            <ColorPalette />
          </Group>
        </section>
        <section className={css(styles.section, styles.overview)}>
          <Group flexDirection="column" gap={36}>
            <Text scale="title" weight="bold">
              Primary Product Colors
            </Text>
            <ProductPalette />
          </Group>
        </section>
        <section className={css(styles.section, styles.overview)}>
          <Group flexDirection="column" gap={36}>
            <Group flexDirection="column" gap={12}>
              <Text scale="title" weight="bold">
                Usage
              </Text>
              <Text>Using colors witin aphrodite stylesheets</Text>
            </Group>
            <Group flexDirection="column" gap={20}>
              <Group flexDirection="column" gap={8}>
                <Text weight="bold">Rules</Text>
                <Text>
                  The majority of styles that we use colors for are border
                  colors and backgrounds. We keep our UI quite sparse so there
                  should be little need for colors.
                </Text>
              </Group>
              <Group flexDirection="column" gap={12}>
                <Highlight languages={["xml"]}>{backgroundRule}</Highlight>
                <Highlight languages={["xml"]}>{borderRule}</Highlight>
              </Group>
            </Group>
          </Group>
        </section>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  header: {
    paddingTop: "12px",
  },
  title: {
    "@media only screen and (max-width: 1200px)": {
      paddingBottom: "20px",
    },
  },
  short: {
    maxWidth: "450px",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: "108px",
  },
  section: {
    paddingTop: "12px",
  },
  overview: {
    maxWidth: "1024px",
  },
});
