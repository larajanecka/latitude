/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import Highlight from "react-highlight/lib/optimized";
import TextLink from "../../../../TextLink";
import Group from "../../../../Group";

import colors from "../../../../colors";
import {deprecatedPaddingSizeConstants} from "../../../../styles/deprecatedWhitespace";
import Text from "../../../../Text";
import Markdown from "../../../components/markdown/Markdown";
import Demo from "../../../components/documentation_layout/Demo";
import HorizontalGroupDemo from "../../../../__demo__/HorizontalGroup-demo";
import VerticalGroupDemo from "../../../../__demo__/VerticalGroup-demo";

export default function Whitespace() {
  return (
    <div className={css(styles.wrapper)}>
      <div className={css(styles.content)}>
        <div className={css(styles.header)}>
          <Group flexDirection="column" gap={20}>
            <div className={css(styles.title)}>
              <Text scale="headline" weight="bold">
                Whitespace
              </Text>
            </div>
            <div className={css(styles.short)}>
              <Text scale="title">
                Flexport UI is laid out based on a standard spacing scale that
                allows for predictable and simple hierarchy.
              </Text>
            </div>
            <Highlight languages={["javascript"]}>
              {`import {   padding} from "styles";`}
            </Highlight>
            <TextLink
              href="https://github.com/flexport/flexport/blob/master/webpack/assets/javascripts/styles/whitespace.js"
              openInNewTab={true}
              weight="bold"
            >
              Open in Github
            </TextLink>
          </Group>
        </div>
        <section className={css(styles.section, styles.overview)}>
          <Group flexDirection="column" gap={20}>
            <Text scale="title" weight="bold">
              Sizes
            </Text>
            <Markdown
              text="Paddings and margins share the same size enum which can be
                applied in horizontal and vertical directions. While this may
                seem like a limitation, there actually should be few drawbacks
                to a small availability of options. Different paddings and
                margins may be combined in various configurations to achieve
                spacing not available (ie. 9px can be achieved with small
                padding combined with an extra-small margin)."
            />
            <div className={css(styles.sizesBreakdown)}>
              {Object.keys(deprecatedPaddingSizeConstants).map(size => (
                <React.Fragment key={`${size}-padding-example`}>
                  <Text>{size}</Text>
                  <Text>{deprecatedPaddingSizeConstants[size]}</Text>
                  <div
                    className={css(styles.whitespaceExample)}
                    style={{
                      borderTopWidth: deprecatedPaddingSizeConstants[size],
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
          </Group>
        </section>
        <section className={css(styles.section, styles.overview)}>
          <Group flexDirection="column" gap={20}>
            <Text scale="title" weight="bold">
              Groups
            </Text>
            <Markdown
              text="[HorizontalGroup](/design/components/HorizontalGroup) and
                [VerticalGroup](/design/components/VerticalGroup) help achieve
                spacing between a few elements via a simple API. The `spacing`
                prop maps to `sizes` (☝️) and handles the logic to apply spacing
                between elements."
            />
            <div className={css(styles.demoGrid)}>
              <Demo
                // $FlowFixMe(Kaye): Flow doesn't know what to do here since DemoType can't figure out which type to use
                demo={{
                  ...HorizontalGroupDemo.demos[1],
                  type: "code",
                  showCode: false,
                  description:
                    "Use `spacing='m'` to add 12px of padding between children.",
                  title: "Easily layout buttons horizontally",
                }}
              />
              <Demo
                // $FlowFixMe(Kaye): Flow doesn't know what to do here since DemoType can't figure out which type to use
                demo={{
                  ...VerticalGroupDemo.demos[0],
                  type: "code",
                  showCode: false,
                  description:
                    "VerticalGroup defaults to `spacing='s'` which adds 6px of padding between children.",
                  title: "Easily layout text blocks vertically",
                }}
              />
            </div>
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
  sizesBreakdown: {
    display: "grid",
    gridTemplateColumns: "80px 80px 1fr",
    gridColumnGap: "12px",
    gridRowGap: "21px",
  },
  whitespaceExample: {
    borderTopStyle: "solid",
    borderTopColor: colors.grey20,
  },
  demoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px,1fr))",
    gridColumnGap: "36px",
    gridRowGap: "72px",
  },
});
