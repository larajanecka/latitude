/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import key from "keymaster";
import TextInput from "../../../TextInput";
import Icon from "../../../Icon";
import Label from "../../../Label";
import IconButton from "../../../button/IconButton";
import SelectInput from "../../../select/SelectInput";
import Group from "../../../Group";
import componentsMetaList from "../../constants/componentsMetaList.json";

import Text from "../../../Text";
import colors from "../../../colors";
import betterGroupBy from "../../../tools/betterGroupBy";
import {fontWeights} from "../../../styles";
import {
  guidelines,
  styles as stylesUrl,
  type DesignSystemRoute,
  gettingStarted,
  contributing,
  resources,
  design,
  components as componentsUrl,
  playground,
} from "../../DesignSystemRoutes";
import DesignSystemLink from "../../components/DesignSystemLink";
import RouterContext from "../../../context/RouterContext";
import {
  type Theme,
  TRANSMISSION,
  BASE,
} from "../../../context/ThemeNameContext";

const themes = [BASE, TRANSMISSION];
const THEME_OPTIONS = themes.map(theme => ({
  value: theme,
  label: `${theme} theme`,
}));
// categoryComparator swaps Application category towards end of the list if it's the current element or next element, else, we do the alphabetical sort.
// This is because Application is less prioritized and we want to show the important categories at the top.
const categoryComparator = (currentElement, nextElement) => {
  if (nextElement === "Application" || currentElement === "Application") {
    return nextElement === "Application" ? -1 : 1;
  }
  if (currentElement < nextElement) {
    return -1;
  }
  if (currentElement === nextElement) {
    return 0;
  }
  return 1;
};

type Props = {
  +topLevel: string,
  +theme: Theme,
  +onThemeSelected: (theme: ?Theme) => void,
  +currentPath: string,
};

type State = {|
  isOpen: boolean,
|};

const pageLinkActive = {
  color: colors.grey60,
  fontWeight: fontWeights.bold,
  ":hover": {
    color: colors.grey60,
  },
};

const categoryLinkActive = {
  color: colors.grey60,
  fontWeight: fontWeights.bold,
  ":hover": {
    color: colors.grey60,
  },
};

export default class MainNav extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  static contextType = RouterContext;

  componentDidUpdate(prevProps: Props) {
    if (this.props.currentPath !== prevProps.currentPath && this.state.isOpen) {
      this.handleMobileToggle();
    }
  }

  handleMobileToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    const {topLevel} = this.props;
    const componentsByCategory = betterGroupBy(
      Object.keys(componentsMetaList).map(key => componentsMetaList[key]),
      component => component.category
    );

    const sortedKeys = Array.from(componentsByCategory.keys()).sort(
      categoryComparator
    );

    const sortedEntries = sortedKeys.map(key => [
      key,
      componentsByCategory.get(key),
    ]);

    return (
      <div className={css(styles.wrapper)} algolia-id="docsearch-exclude">
        <div className={css(styles.title)}>
          <DesignSystemLink scale="title" href={design()}>
            <Text scale="title">
              Latitude{" "}
              <Text scale="title" weight="bold">
                Design System
              </Text>
            </Text>
          </DesignSystemLink>
          <div className={css(styles.mobileToggle)}>
            <IconButton
              kind="blank"
              iconName={this.state.isOpen ? "cancel" : "menu"}
              size="l"
              type="menu"
              onMouseDown={this.handleMobileToggle}
            />
          </div>
        </div>
        <DocSearchInput />
        <div
          className={css(
            styles.links,
            this.state.isOpen ? styles.mobileNavOpen : styles.mobileNavClosed
          )}
        >
          <Category
            name="Design Guidelines"
            route={guidelines()}
            topLevel={true}
          />
          {topLevel === "guidelines"
            ? [
                <PageLink
                  text="Color System"
                  route={guidelines("color-system")}
                  key="color-system"
                />,
                <PageLink
                  text="Iconography"
                  route={guidelines("iconography")}
                  key="iconography"
                />,
                <PageLink
                  text="Typography"
                  route={guidelines("typography")}
                  key="typography"
                />,
                <PageLink
                  text="Filtering"
                  route={guidelines("filtering")}
                  key="filtering"
                />,
                <PageLink
                  text="Forms"
                  route={guidelines("forms")}
                  key="forms"
                />,
                <PageLink
                  text="Shipment display"
                  route={guidelines("shipments")}
                  key="shipments"
                />,
              ]
            : null}
          <Category name="Components" topLevel={true} route={componentsUrl()} />
          {topLevel === "components"
            ? [
                <PageLink
                  key="getting-started"
                  text="Getting Started"
                  route={gettingStarted()}
                />,
                <PageLink
                  key="contributing"
                  text="Contributing"
                  route={contributing()}
                />,
              ].concat(
                sortedEntries
                  .map(([category, components]) => {
                    if (!components) {
                      return undefined;
                    }
                    const comps = components.map(component => {
                      if (component.status !== "Deprecated") {
                        return (
                          <PageLink
                            route={componentsUrl(component.name)}
                            text={component.name}
                            key={`component${category}${component.name}`}
                          />
                        );
                      }
                      return null;
                    });
                    return [
                      <Category
                        name={category}
                        key={category}
                        active={false}
                        topLevel={false}
                      />,
                      ...comps,
                    ];
                  })
                  .filter(Boolean)
              )
            : null}
          <Category name="Styles" topLevel={true} route={stylesUrl()} />
          <Category name="Resources" topLevel={true} route={resources()} />
          <Category name="Playground" topLevel={true} route={playground()} />
          <div className={css(styles.themeSelection)}>
            <Group gap={8}>
              <Label
                value="Theme"
                helpTooltip="Themes are provided via ThemeNameContext, and are set by wrapping the root of your application in a theme provider context."
              >
                <SelectInput
                  options={THEME_OPTIONS}
                  value={this.props.theme}
                  onChange={this.props.onThemeSelected}
                  placeholder="Choose a theme"
                />
              </Label>
            </Group>
          </div>
        </div>
      </div>
    );
  }
}

const Category = ({
  route,
  name,
  // eslint-disable-next-line autofix/no-unused-vars
  onClick,
  topLevel = true,
}: {
  +route?: DesignSystemRoute,
  +name: string,
  +onClick?: () => void,
  +topLevel: boolean,
}) => (
  <div
    title={name}
    className={css(styles.category, !topLevel && styles.subcategory)}
  >
    {route ? (
      <DesignSystemLink
        href={route}
        linkStyle="subtle"
        activeStyles={categoryLinkActive}
      >
        {name}
      </DesignSystemLink>
    ) : (
      <>
        <Text
          weight={!topLevel ? "bold" : "regular"}
          color={topLevel ? "grey60" : "grey50"}
        >
          {name}
        </Text>
        {topLevel ? <Icon iconName="downOpen" size="xs" /> : null}
      </>
    )}
  </div>
);

const PageLink = ({
  route,
  text,
}: {
  +route: DesignSystemRoute,
  +text: string,
}) => (
  <div className={css(styles.pageLinkWrapper)}>
    <div className={css(styles.pageLink)}>
      <DesignSystemLink
        href={route}
        linkStyle="subtle"
        activeStyles={pageLinkActive}
      >
        {text}
      </DesignSystemLink>
    </div>
  </div>
);

function DocSearchInput() {
  const [inputValue, setInputValue] = React.useState("");

  const searchShortcuts = "control+k, command+k";
  key(searchShortcuts, () => {
    if (inputRef) {
      inputRef.focus();
    }
  });

  let inputRef = null;
  const setRef = ref => {
    inputRef = ref;
  };

  return (
    <div className={css(styles.searchWrapper)} id="docsearch-wrapper">
      <TextInput
        value={inputValue}
        onChange={setInputValue}
        placeholder="Search (cmd/ctrl+k)..."
        prefix={{
          iconName: "search",
        }}
        inputRef={setRef}
      />
    </div>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    height: "100%",
    width: "275px",
    borderRight: `1px solid ${colors.grey30}`,
    "@media only screen and (max-width: 768px)": {
      width: "100%",
      borderRightWidth: 0,
    },
  },
  title: {
    position: "absolute",
    background: colors.white,
    padding: "36px",
    top: 0,
    left: 0,
    right: 0,
    pointerEvents: "all",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mobileToggle: {
    display: "none",
    "@media only screen and (max-width: 768px)": {
      display: "block",
    },
  },
  searchWrapper: {
    position: "relative",
    padding: "0 36px",
    margin: "96px 0 0 0",
    background: colors.white,
  },
  links: {
    height: "100%",
    overflowY: "scroll",
    background: colors.white,
    padding: "36px",
    transition: "opacity 0.15s ease-in-out",
    "@media only screen and (max-width: 768px)": {
      marginTop: "126px", // 96 (header height) + 30 (search field height)
      paddingTop: "3px", // + 3 (search field focus outline)
    },
  },
  mobileNavClosed: {
    "@media only screen and (max-width: 768px)": {
      display: "none",
      width: "275px",
    },
  },
  mobileNavOpen: {
    "@media only screen and (max-width: 768px)": {
      display: "block",
      pointerEvents: "all",
      position: "fixed",
      width: "100%",
      paddingTop: "36px",
    },
  },
  category: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    ":not(:first-of-type)": {
      marginTop: "20px",
    },
    ":after": {
      content: "attr(title)",
      display: "block",
      position: "absolute",
      fontWeight: "bold",
      height: 0,
      overflow: "hidden",
      visibility: "hidden",
    },
  },
  subcategory: {
    cursor: "auto",
    paddingLeft: "20px",
    paddingTop: "12px",
    marginBottom: "8px",
  },
  pageLinkWrapper: {
    marginTop: "20px",
    ":not(:first-of-type)": {
      marginTop: "12px",
    },
  },
  pageLink: {
    paddingLeft: "20px",
  },
  themeSelection: {
    marginTop: "36px",
    marginBottom: "36px",
  },
});
