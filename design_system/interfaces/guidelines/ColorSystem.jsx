/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */
import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import ColorPalette, {
  ProductPalette,
  ColorClassificationLegend,
} from "../../components/helpers/ColorPalette";

import colors, {type Color} from "../../../colors";

import {
  deprecatedMarginSizeConstants,
  deprecatedPaddingSizeConstants,
} from "../../../styles/deprecatedWhitespace";

import Text from "../../../Text";
import TextLink from "../../../TextLink";
import Group from "../../../Group";

const ColorSystem = () => (
  <div className={css(styles.wrapper)}>
    <div className={css(styles.content)}>
      <section className={css(styles.section)}>
        <Text scale="headline" weight="bold">
          Color System
        </Text>
        <div className={css(styles.explaination)}>
          <Text scale="title">
            Our color system was designed to establish a flexible range of
            colors that support our brand, comms, and product teams. Flexport
            product relies on a simplified main palette which consists of white,
            blue, and a range of neutrals.
          </Text>
        </div>
        <div className={css(styles.content)}>
          <Group flexDirection="column" gap={20}>
            <Group justifyContent="space-between">
              <Text scale="title" weight="bold">
                Palette
              </Text>
              <ColorClassificationLegend />
            </Group>
            <ColorPalette />
          </Group>
          <Group flexDirection="column" gap={20}>
            <Text scale="title" weight="bold">
              Product Palette
            </Text>
            <ProductPalette />
          </Group>

          <div className={css(styles.usage)}>
            <Text scale="title" weight="bold">
              Usage
            </Text>
            <div className={css(styles.explaination)}>
              <Group flexDirection="column" gap={8}>
                <Text>
                  Our product blue, blue30, is the primary color used in our UI.
                  The primary color establishes a consistent look and feel
                  across our products, reinforces our brand, and ensures a
                  cohesive and unified user experience.
                </Text>
                <Text>
                  Other colors in the palette may be used to further define
                  hierarchy and help engage or lead users. When implemented
                  consistently across products, our color palette should offer
                  users reliable and meaningful associations to behaviors and
                  actions.
                </Text>
              </Group>
            </div>
            <Group gap={20} fillChildren={true}>
              <div className={css(styles.doDontSection, styles.do)}>
                <Group flexDirection="column" gap={12}>
                  <Text scale="title">Do</Text>
                  <Group flexDirection="column" gap={36}>
                    <Group flexDirection="column" gap={20}>
                      <Group flexDirection="column" gap={12}>
                        <Text weight="bold">
                          Use primary blue with grey and white
                        </Text>
                        <Group gap={36}>
                          <ColorExample
                            type="logo"
                            foreground="white"
                            background="blue30"
                          />
                          <ColorExample
                            type="logo"
                            foreground="blue30"
                            background="grey10"
                          />
                          <ColorExample
                            type="logo"
                            foreground="blue30"
                            background="white"
                          />
                        </Group>
                      </Group>
                    </Group>
                    <Group flexDirection="column" gap={20}>
                      <Group flexDirection="column" gap={12}>
                        <Text weight="bold">Use high contrast (4.5:1)</Text>
                        <Group gap={36}>
                          <ColorExample
                            type="logo"
                            foreground="white"
                            background="red40"
                          />
                        </Group>
                      </Group>
                    </Group>
                    <Group flexDirection="column" gap={20}>
                      <Group flexDirection="column" gap={12}>
                        <Text weight="bold">
                          Use any light color in conjunction with it’s darkest
                          color
                        </Text>
                        <Group gap={36}>
                          <ColorExample
                            type="logo"
                            foreground="green10"
                            background="green60"
                          />
                          <ColorExample
                            type="logo"
                            foreground="orange10"
                            background="orange60"
                          />
                        </Group>
                      </Group>
                    </Group>
                    <Group flexDirection="column" gap={20}>
                      <Group flexDirection="column" gap={12}>
                        <Text weight="bold">Combine greys</Text>
                        <Group gap={36}>
                          <ColorExample
                            type="logo"
                            foreground="grey40"
                            background="grey60"
                          />
                          <ColorExample
                            type="logo"
                            foreground="grey60"
                            background="grey20"
                          />
                          <ColorExample
                            type="logo"
                            foreground="grey50"
                            background="white"
                          />
                        </Group>
                      </Group>
                    </Group>
                  </Group>
                </Group>
              </div>
              <div className={css(styles.doDontSection, styles.dont)}>
                <Group flexDirection="column" gap={12}>
                  <Text scale="title">Don’t</Text>
                  <Group flexDirection="column" gap={36}>
                    <Group flexDirection="column" gap={20}>
                      <Group flexDirection="column" gap={12}>
                        <Text weight="bold">
                          Combine blue30 with greys above grey10
                        </Text>
                        <Group gap={36}>
                          <ColorExample
                            type="logo"
                            foreground="blue30"
                            background="grey30"
                          />
                        </Group>
                      </Group>
                    </Group>
                    <Group flexDirection="column" gap={20}>
                      <Group flexDirection="column" gap={12}>
                        <Text weight="bold">Use low contrast</Text>
                        <Group gap={36}>
                          <ColorExample
                            type="logo"
                            foreground="blue10"
                            background="blue20"
                          />
                          <ColorExample
                            type="logo"
                            foreground="grey10"
                            background="grey40"
                          />
                        </Group>
                      </Group>
                    </Group>
                    <Group flexDirection="column" gap={20}>
                      <Group flexDirection="column" gap={12}>
                        <Text weight="bold">
                          Combine colors from separate families
                        </Text>
                        <Group gap={36}>
                          <ColorExample
                            type="logo"
                            foreground="blue30"
                            background="purple10"
                          />
                        </Group>
                      </Group>
                    </Group>
                  </Group>
                </Group>
              </div>
            </Group>
          </div>

          <Group flexDirection="column" gap={20}>
            <Text scale="title" weight="bold">
              Accessibility
            </Text>
            <div className={css(styles.explaination)}>
              <Group flexDirection="column" gap={8}>
                <Text>
                  It’s important that color combinations in our products meet
                  the minimum contrast ratios that the WCAG 2.0 specifies. This
                  not only helps users who are colorblind or have low vision
                  interact with Flexport, but also helps improve the usability
                  for all users.
                </Text>
                <Group flexDirection="column" gap={4}>
                  <Text>
                    Here are a couple tools recommended for testing contrast
                    ratios:
                  </Text>
                  <TextLink href="https://www.getstark.co/" openInNewTab={true}>
                    Stark Sketch Accessibility Plugin
                  </TextLink>
                  <TextLink
                    href="https://chrome.google.com/webstore/detail/wcag-luminosity-contrast/lllpnmpooomecmbmijbmbikaacgfdagi?hl=en"
                    openInNewTab={true}
                  >
                    WCAG Luminosity Contrast Ratio Analyzer
                  </TextLink>
                </Group>
              </Group>
            </div>

            <Group gap={20} fillChildren={true}>
              <div
                className={css(styles.doDontSection, styles.do)}
                algolia-id="docsearch-exclude"
              >
                <Group flexDirection="column" gap={12}>
                  <Text scale="title">Pass</Text>
                  <Group gap={36}>
                    <ColorExample
                      title="16.84:1"
                      foreground="grey60"
                      background="grey20"
                      type="lines"
                    />
                    <ColorExample
                      title="4.5:1"
                      foreground="blue30"
                      background="grey20"
                      type="lines"
                    />
                    <ColorExample
                      title="4.51:1"
                      foreground="grey50"
                      background="white"
                      type="lines"
                    />
                    <ColorExample
                      title="8.95:1"
                      foreground="grey40"
                      background="grey60"
                      type="lines"
                    />
                    <ColorExample
                      title="4.72:1"
                      foreground="white"
                      background="blue30"
                      type="lines"
                    />
                  </Group>
                </Group>
              </div>

              <div
                className={css(styles.doDontSection, styles.dont)}
                algolia-id="docsearch-exclude"
              >
                <Group flexDirection="column" gap={12}>
                  <Text scale="title">Fail</Text>
                  <Group gap={36}>
                    <ColorExample
                      title="1.39:1"
                      foreground="grey30"
                      background="grey10"
                      type="lines"
                    />
                    <ColorExample
                      title="1.39:1"
                      foreground="grey20"
                      background="blue30"
                      type="lines"
                    />
                    <ColorExample
                      title="2.21:1"
                      foreground="white"
                      background="orange40"
                      type="lines"
                    />
                  </Group>
                </Group>
              </div>
            </Group>
          </Group>

          <Group flexDirection="column" gap={20}>
            <Text scale="title" weight="bold">
              Exceptions
            </Text>
            <div className={css(styles.explaination)}>
              <Group flexDirection="column" gap={8}>
                <Text>
                  Sometimes minimum contrast rules needs to be broken. Our
                  recommendation is to use elements with strong contrast ratios
                  beside the low contrast element. The low contrast element
                  should only be used to support the primary element.
                </Text>
              </Group>
            </div>

            <div
              className={css(exeptionExampleStyles.wrapper)}
              algolia-id="docsearch-exclude"
            >
              <div className={css(exeptionExampleStyles.exampleBg)}>
                <ForeGround fillColor="white" size={20} type="logo" />
              </div>
              <Group flexDirection="column" gap={0}>
                <Text scale="subtext" weight="bold">
                  LATITUDE ∙ DS34214
                </Text>
                <Text scale="subtext">Design System</Text>
              </Group>
            </div>
          </Group>
        </div>
      </section>
    </div>
  </div>
);

const LINES_SWATCH_PATH =
  "M0.55,9 L-0.45,9 L-0.45,7 L0.55,7 L22,7 L23,7 L23,9 L22,9 L0.55,9 Z M0.5,3 L-0.5,3 L-0.5,1 L0.5,1 L29.5,1 L30.5,1 L30.5,3 L29.5,3 L0.5,3 Z M0.535714286,16 L-0.464285714,16 L-0.464285714,14 L0.535714286,14 L15,14 L16,14 L16,16 L15,16 L0.535714286,16 Z M0.55,22 L-0.45,22 L-0.45,20 L0.55,20 L22,20 L23,20 L23,22 L22,22 L0.55,22 Z M0.535714286,28 L-0.464285714,28 L-0.464285714,26 L0.535714286,26 L15,26 L16,26 L16,28 L15,28 L0.535714286,28 Z";
const LOGO_SWATCH_PATH =
  "M29.649 0H15.145a.355.355 0 0 0-.249.102L.104 14.896a.352.352 0 0 0-.104.25v14.503c0 .193.158.351.352.351h14.502a.35.35 0 0 0 .25-.104l14.794-14.792a.355.355 0 0 0 .102-.25V.352A.351.351 0 0 0 29.649 0";

const ForeGround = ({
  fillColor,
  size = 24,
  type = "logo",
}: {
  +fillColor: Color,
  +size: number,
  +type: "logo" | "lines",
}) => (
  <svg
    viewBox="0 0 30 30"
    style={{
      width: `${size}px`,
      height: `${size}px`,
    }}
    role="img"
    aria-hidden="true"
    aria-labelledby="title desc"
  >
    <path
      style={{fill: colors[fillColor]}}
      d={type === "logo" ? LOGO_SWATCH_PATH : LINES_SWATCH_PATH}
    />
  </svg>
);

const ColorExample = ({
  foreground,
  background,
  title,
  type = "logo",
}: {
  +foreground: Color,
  +background: Color,
  +title?: string,
  +type: "logo" | "lines",
}) => (
  <Group flexDirection="column" gap={8}>
    {title ? (
      <Text scale="subtext" weight="bold">
        {title}
      </Text>
    ) : null}
    <div
      className={css(colorExampleStyles.background)}
      style={{backgroundColor: colors[background]}}
    >
      <ForeGround fillColor={foreground} size={60} type={type} />
    </div>
    <Text scale="subtext">{`${foreground} on ${background}`}</Text>
  </Group>
);

export default ColorSystem;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: "256px",
  },
  section: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: "36px",
    paddingTop: "12px",
  },
  explaination: {
    maxWidth: "450px",
  },
  content: {
    maxWidth: "1024px",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: "128px",
  },
  usage: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: "20px",
  },
  doDontSection: {
    paddingTop: deprecatedPaddingSizeConstants.m,
  },
  do: {
    borderTop: `4px solid ${colors.green50}`,
  },
  dont: {
    borderTop: `4px solid ${colors.red50}`,
  },
});

const colorExampleStyles = StyleSheet.create({
  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "120px",
    height: "120px",
  },
});

const exeptionExampleStyles = StyleSheet.create({
  wrapper: {
    border: `1px solid ${colors.grey30}`,
    padding: deprecatedPaddingSizeConstants.m,
    borderRadius: "3px",
    maxWidth: "360px",
    display: "flex",
    flexDirection: "row",
  },
  exampleBg: {
    width: "42px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.orange50,
    borderRadius: "4px",
    marginRight: deprecatedMarginSizeConstants.m,
  },
});
