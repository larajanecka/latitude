/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import Highlight from "react-highlight/lib/optimized";
import Tooltip from "../../../Tooltip";

import Text from "../../../Text";
import TextLink from "../../../TextLink";
import Group from "../../../Group";
import colors from "../../../colors";
import Markdown from "../markdown/Markdown";
import IconButton from "../../../button/IconButton";

import PropTable from "./PropTable";
import ComponentDemo from "./ComponentDemo";

import copyToClipboard from "../../../tools/CopyToClipboard";

import componentsMetaList from "../../constants/componentsMetaList.json";
import componentsStatList from "../../constants/componentsStatList.json";
import componentsDemoList from "../../constants/componentsDemoList";

type DocInterfaceProps = {
  +componentName: string,
};

// eslint-disable-next-line react/prefer-stateless-function
export default class DocInterface extends React.PureComponent<DocInterfaceProps> {
  render() {
    const {componentName} = this.props;
    const generatedDocs = componentsMetaList[componentName];
    const stats = componentsStatList[componentName];
    const demo = componentsDemoList[componentName];

    const importText = `import ${generatedDocs.name} from "${
      generatedDocs.componentPath
    }";`;

    return (
      <div className={css(styles.wrapper)}>
        <div className={css(styles.content)}>
          <div className={css(styles.titleGroup)}>
            <div className={css(styles.title)} algolia-id="docsearch-title">
              <Text scale="headline" weight="bold">
                {generatedDocs.name}
              </Text>
            </div>

            <div algolia-id="docsearch-exclude">
              <Group gap={36} justifyContent="flex-end">
                <Stat label="Status" value={generatedDocs.status} />
                <Stat label="Uses" value={stats.uses} />
                <Stat label="Imports" value={stats.imports} />
              </Group>
            </div>
          </div>
          <Group flexDirection="column" gap={20}>
            <div className={css(styles.short)} algolia-id="docsearch-subtitle">
              <Text scale="title">{generatedDocs.shortDescription}</Text>
            </div>

            <div className={css(styles.importWrapper)}>
              <Highlight
                languages={["typescript"]}
                // eslint-disable-next-line flexport/no-oocss
                className={`javascript ${css(styles.import)}`}
                algolia-id="docsearch-exclude"
              >
                {importText}
              </Highlight>
              <div className={css(styles.importAction)}>
                <IconButton
                  size="m"
                  kind="bare"
                  type="button"
                  iconName="clipboard"
                  onClick={() =>
                    copyToClipboard(importText, "Import text copied")
                  }
                />
              </div>
            </div>
            <Tooltip
              overlay="View this component on GitHub!"
              placement="bottom"
            >
              <TextLink
                href={`https://github.flexport.io/flexport/flexport/tree/master/${
                  generatedDocs.repoFilePath
                }`}
                openInNewTab={true}
                weight="bold"
              >
                Open in Github
              </TextLink>
            </Tooltip>
          </Group>
          {generatedDocs.description ? (
            <section className={css(styles.section, styles.overview)}>
              <Group flexDirection="column" gap={12}>
                <Text scale="title" weight="bold">
                  Component Overview
                </Text>
                <Markdown text={generatedDocs.description} />
              </Group>
            </section>
          ) : null}
          {demo ? (
            <section
              className={css(styles.section)}
              algolia-id="docsearch-exclude"
            >
              <ComponentDemo demo={demo.demo} />
            </section>
          ) : null}
          {generatedDocs.props ? (
            <section
              className={css(styles.section)}
              algolia-id="docsearch-exclude"
            >
              <PropTable componentProps={generatedDocs.props} />
            </section>
          ) : null}
        </div>
      </div>
    );
  }
}

const Stat = ({label, value}: {+label: string, +value: string | number}) => (
  <Group flexDirection="column" gap={8}>
    <Text scale="subtext">{label}</Text>
    <Text scale="headline" weight="bold">
      {value}
    </Text>
  </Group>
);

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  titleGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    "@media only screen and (max-width: 1200px)": {
      flexDirection: "column",
      marginBottom: "36px",
      "> h3": {
        paddingBottom: "20px",
      },
    },
  },
  title: {
    "@media only screen and (max-width: 1200px)": {
      paddingBottom: "20px",
    },
  },
  short: {
    maxWidth: "450px",
  },
  import: {
    background: colors.white,
    paddingLeft: 0,
  },
  importWrapper: {
    display: "flex",
    width: "100%",
  },
  importAction: {
    "@media only screen and (max-width: 768px)": {
      display: "none",
    },
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
