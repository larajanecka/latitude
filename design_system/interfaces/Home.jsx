/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import colors from "../../colors";

import Text from "../../Text";
import DesignSystemLink from "../components/DesignSystemLink";
import {
  playground,
  guidelines,
  styles as stylesUrl,
  resources,
  components as componentsUrl,
} from "../DesignSystemRoutes";

export default function Home() {
  return (
    <div className={css(homeStyles.page)}>
      <div className={css(homeStyles.container)}>
        <div className={css(homeStyles.header)}>
          <div className={css(homeStyles.lockup)}>
            {/* eslint-disable-next-line react/forbid-elements */}
            <h1 className={css(homeStyles.title)}>Latitude</h1>
            <Text scale="headline" color="white" weight="bold">
              Design guidelines, component documentation, styling instructions,
              and resources for building interfaces with Flexport’s design
              system
            </Text>
          </div>
        </div>
        <div className={css(homeStyles.content)}>
          <nav>
            <ul className={css(homeStyles.menu)}>
              <li className={css(homeStyles.menuItem)}>
                <DesignSystemLink
                  weight="bold"
                  scale="title"
                  linkStyle="inverse"
                  href={guidelines()}
                >
                  Design Guidelines
                </DesignSystemLink>
              </li>
              <span className={css(homeStyles.separator)}>
                <Text scale="title" weight="bold" color="white">
                  |
                </Text>
              </span>
              <li className={css(homeStyles.menuItem)}>
                <DesignSystemLink
                  weight="bold"
                  scale="title"
                  linkStyle="inverse"
                  href={componentsUrl()}
                >
                  Components
                </DesignSystemLink>
              </li>
              <span className={css(homeStyles.separator)}>
                <Text scale="title" weight="bold" color="white">
                  |
                </Text>
              </span>
              <li className={css(homeStyles.menuItem)}>
                <DesignSystemLink
                  weight="bold"
                  scale="title"
                  linkStyle="inverse"
                  href={stylesUrl()}
                >
                  Styles
                </DesignSystemLink>
              </li>
              <span className={css(homeStyles.separator)}>
                <Text scale="title" weight="bold" color="white">
                  |
                </Text>
              </span>
              <li className={css(homeStyles.menuItem)}>
                <DesignSystemLink
                  weight="bold"
                  scale="title"
                  linkStyle="inverse"
                  href={resources()}
                >
                  Resources
                </DesignSystemLink>
              </li>
              <span className={css(homeStyles.separator)}>
                <Text scale="title" weight="bold" color="white">
                  |
                </Text>
              </span>
              <li className={css(homeStyles.menuItem)}>
                <DesignSystemLink
                  weight="bold"
                  scale="title"
                  linkStyle="inverse"
                  href={playground()}
                >
                  Playground
                </DesignSystemLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

// ☠️
const BREAKPOINT = "666px";

const homeStyles = StyleSheet.create({
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: colors.grey60,
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  header: {
    display: "flex",
    gridColumn: "1 / 8",
    [`@media (min-width: ${BREAKPOINT})`]: {
      gridColumn: "3 / 7",
    },
  },
  title: {
    fontSize: "64px",
    fontWeight: 700,
    letterSpacing: "-3px",
    color: colors.white,
    [`@media (min-width: ${BREAKPOINT})`]: {
      fontSize: "96px",
    },
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(8, minmax(auto, 180px))",
    gridColumnGap: "12px",
    gridTemplateRows: "1fr",
  },
  lockup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  content: {
    paddingTop: "36px",
    gridColumn: "1 / 8",
    [`@media (min-width: ${BREAKPOINT})`]: {
      gridColumn: "3 / 7",
    },
  },
  menu: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    [`@media (min-width: ${BREAKPOINT})`]: {
      flexDirection: "row",
    },
  },
  menuItem: {
    color: colors.white,
    [`@media (min-width: ${BREAKPOINT})`]: {
      ":not(:last-of-type)": {
        paddingRight: "12px",
      },
      ":not(:first-of-type)": {
        paddingLeft: "12px",
      },
    },
  },
  separator: {
    display: "none",
    [`@media (min-width: ${BREAKPOINT})`]: {
      display: "block",
    },
  },
});
