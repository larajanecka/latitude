/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */
import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import ConnectedToaster from "../../../toast/ConnectedToaster";
import invariant from "../../../tools/invariant";
import colors from "../../../colors";
import {
  ThemeProvider,
  type Theme,
  BASE,
} from "../../../context/ThemeNameContext";
import MainNav from "./MainNav";
import RouterContext from "../../../context/RouterContext";
import {zIndices} from "../../../tools/zIndices";
import "./styles/main.css";

type ComponentName = {
  +router: any,
  +children?: React.Node,
  +route: {path: string},
};

type ComponentState = {|
  theme: Theme,
|};

class DesignAppInterface extends React.PureComponent<
  ComponentName,
  ComponentState
> {
  constructor(props: ComponentName) {
    super(props);
    this.state = {
      theme: BASE,
    };
  }
  static contextType = RouterContext;
  handleThemeSelected = (theme: ?Theme) => {
    invariant(theme);
    this.setState({
      theme,
    });
  };
  componentDidMount() {
    // const algoliaToken = ApiKeyStore.get("algolia");
    // /**
    //  * Algolia DocSearch
    //  *
    //  * To run the scraper, follow the instructions at:
    //  * https://community.algolia.com/docsearch/run-your-own.html
    //  *
    //  * Also see the readme in `design_system/docsearch`.
    //  *
    //  * The scraper should be run with Flexport's app ID, and
    //  * an API key that allows addObject, editSettings, and deleteIndex.
    //  *
    //  * The scraper config file is:
    //  * `design_system/docsearch/algolia_docsearch_scraper_config.json`
    //  */
    // docsearch({
    //   appId: algoliaToken.appId,
    //   apiKey: algoliaToken.value,
    //   indexName: "ComponentDocumentation_prod",
    //   inputSelector: "#docsearch-wrapper input",
    //   debug: false,
    //   transformData: suggestions =>
    //     suggestions.map(suggestion => ({
    //       ...suggestion,
    //       url: new URL(suggestion.url).pathname,
    //     })),
    //   autocompleteOptions: {
    //     autoselect: true,
    //   },
    // });
  }
  render() {
    const pathName = this.props.route.path;
    const topLevel = pathName.includes("/")
      ? pathName.slice(0, pathName.indexOf("/"))
      : pathName;

    return (
      <ThemeProvider theme={this.state.theme}>
        <div className={css(styles.wrapper)}>
          <div className={css(styles.sideNav)}>
            <MainNav
              topLevel={topLevel}
              theme={this.state.theme}
              onThemeSelected={this.handleThemeSelected}
              router={this.props.router}
              currentPath={this.context.location.pathname}
            />
          </div>
          <div className={css(styles.mainContent)}>
            <div className={css(styles.page)}>{this.props.children}</div>
          </div>
          <ConnectedToaster />
        </div>
      </ThemeProvider>
    );
  }
}

export default DesignAppInterface;

const styles = StyleSheet.create({
  wrapper: {
    background: colors.white,
  },
  sideNav: {
    position: "fixed",
    height: "100%",
    left: 0,
    top: 0,
    transition: "width 0.15s ease-in-out",
    zIndex: zIndices.zIndex80Navigation.value,
    "@media only screen and (max-width: 768px)": {
      zIndex: 10,
      width: "100%",
      height: "auto",
    },
  },
  mainContent: {
    maxWidth: "1280px",
    margin: "0px auto",
    paddingLeft: "311px",
    transition: "paddingRight 0.25s ease-in-out",
    paddingRight: "36px",
    "@media only screen and (max-width: 768px)": {
      paddingLeft: "36px",
      paddingRight: "36px",
    },
    "@media only screen and (max-width: 411px)": {
      paddingLeft: "20px",
      paddingRight: "20px",
    },
    "@media only screen and (max-width: 375px)": {
      paddingLeft: "12px",
      paddingRight: "12px",
    },
  },
  page: {
    padding: "96px 0 120px 0",
    minHeight: "100vh",
    "@media only screen and (max-width: 768px)": {
      paddingTop: "162px", // 96 (header height) + 30 (search field height) + 36 (spacing)
    },
  },
});
