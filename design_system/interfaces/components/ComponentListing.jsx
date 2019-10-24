/**
 * TEAM: frontend_infra
 * @flow
 */

import React from "react";
import {Link} from "found";
import {StyleSheet, css} from "aphrodite";
import {border} from "../../../styles/index";
import colors from "../../../colors";
import Text from "../../../Text";
import Group from "../../../Group";
import {components as componentsUrl} from "../../DesignSystemRoutes";
import betterGroupBy from "../../../tools/betterGroupBy";
import componentsMetaList from "../../constants/componentsMetaList.json";

function ComponentListing() {
  const componentsByCategory = betterGroupBy(
    Object.keys(componentsMetaList).map(key => componentsMetaList[key]),
    component => component.category
  );
  const sortedKeys = Array.from(componentsByCategory.keys()).sort();
  const sortedEntries = sortedKeys.map(key => [
    key,
    componentsByCategory.get(key),
  ]);
  return (
    <div className={css(styles.wrapper)} algolia-id="docsearch-exclude">
      <Group flexDirection="column" gap={12}>
        {sortedEntries
          .map(([category, components]) => {
            if (!components) {
              return undefined;
            }
            const comps = (
              <div className={css(styles.listGrid)}>
                {components.map(component => {
                  if (component.status !== "Deprecated") {
                    return (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <Link
                        key={component.name}
                        className={css(styles.listElement)}
                        exact={true}
                        to={componentsUrl(component.name)}
                      >
                        <Group flexDirection="column" gap={8}>
                          <Text display="block" weight="bold">
                            {component.name}
                          </Text>
                          <Text display="block" scale="subtext">
                            {component.shortDescription}
                          </Text>
                        </Group>
                      </Link>
                    );
                  }
                  return null;
                })}
              </div>
            );
            return [
              <Text key={`${category}-title`} scale="title" weight="bold">
                {category}
              </Text>,
              comps,
            ];
          })
          .filter(Boolean)}
      </Group>
    </div>
  );
}

const styles = StyleSheet.create({
  listGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    paddingBottom: "20px",
    gridGap: "12px",
  },
  listElement: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "12px",
    paddingTop: "8px",
    paddingRight: "12px",
    ...border.t.s,
    borderColor: "transparent",
    transition: "border-color 0.25s ease",
    ":hover": {
      borderColor: colors.grey60,
    },
  },
  wrapper: {
    position: "relative",
  },
});

export default ComponentListing;
