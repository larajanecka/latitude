/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */
/* eslint-disable react/prefer-stateless-function */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import Highlight from "react-highlight/lib/optimized";

import type {
  PropDoc,
  FlowType,
  FlowFunctionSignatureType,
  FlowFunctionArgumentType,
} from "../../types/reactDocgenTypes";

import Text from "../../../Text";
import Group from "../../../Group";

import colors from "../../../colors";
import {sharedStyles} from "../../../button/styles";

import CustomPopover from "../../../popover/CustomPopover";
import PopupWithClickAway from "../../../popup/PopupWithClickAway";
import Link from "../../../Link";

import componentsList from "../../constants/componentsList.json";
import {
  components as componentsUrl,
  guidelines as guidelinesUrl,
} from "../../DesignSystemRoutes";

type PropTableProps = {
  +componentProps: $ReadOnlyArray<PropDoc>,
};

type State = {|
  height: number,
|};

// recursive function to parse docgen components.js output for each proptype and display accordingly.
// type is either FlowSimpleType, FlowLiteralType, FlowElementsType, FlowFunctionSignatureType, or FlowObjectSignatureType as defined in by react-docgen:
// https://github.com/reactjs/react-docgen/blob/master/src/types.js
// this function may need fixing if any of those types change!
function buildPropType(type: FlowType | "unknown", objectName?: string) {
  let propString;
  // ¯\_(ツ)_/¯Type
  if (type === "unknown") {
    propString = highlight("unknown");
  }
  // FlowLiteralType, just return the string
  else if (type.name === "literal" && type.value) {
    propString = highlight(addQuotes(type.value));
  }
  // FlowObjectSignatureType or FlowFunctionSignatureType
  else if (type.name === "signature" && type.raw) {
    // FlowObjectSignatureType
    if (type.type === "object") {
      propString = highlight(type.raw);
    }
    // FlowFunctionSignatureType
    else if (type.type === "function") {
      propString = parseFunctionSignature(
        ((type: any): FlowFunctionSignatureType)
      );
    }
  }
  // FlowElementsType, like '$ReadOnlyArray<UserOptionDropDown>', so pick out 'UserOptionDropDown' and then continue parsing deeper
  else if (type.elements && type.name !== "union" && !objectName) {
    const typeParamName = type.raw && parseTypeParam(type.raw);
    if (typeParamName && type.raw) {
      return [
        highlight(`${type.raw.slice(0, type.raw.indexOf("<"))}<`), // e.g. '$ReadOnlyArray<'
        buildPropType(type, typeParamName), // e.g. 'UserOptionDropDown'
        highlight(">"), // closing '>'
      ];
    }
  }
  // if the above parsed an objectName (for example, 'UserOptionDropDown'),
  // and object types are defined for this parameter, then create a popover
  else if (objectName && type.elements && containsObjectSignature(type)) {
    const popupContent = type.elements
      .map(item => buildPropType(item))
      .reduce((prev, curr) => [prev, " ", highlight("|"), " ", curr]);
    propString = createPopover(objectName, popupContent);
  }
  // FlowElementsType, parse each element and join them together
  else if (type.elements) {
    // https://stackoverflow.com/questions/34034038/how-to-render-react-components-by-using-map-and-join
    propString = type.elements
      .map(item => buildPropType(item))
      .reduce((prev, curr) => [prev, " ", highlight("|"), " ", curr]);
  }
  // FlowSimpleType or something else
  else if (type.name && type.raw) {
    propString = highlight(type.raw);
  } else if (type.name) {
    propString = addLinkToComponent(type.name);
  }
  return propString;
}

// parse strings like "Array<T>" => "T"
function parseTypeParam(rawTypeString: string) {
  const openBracket = rawTypeString.indexOf("<");
  const closeBracket = rawTypeString.lastIndexOf(">");
  if (openBracket > 0 && closeBracket - openBracket > 0) {
    return rawTypeString.slice(openBracket + 1, closeBracket);
  }
  return null;
}

// only show a popover if there's an object signature to display, to avoid popovers that just contain a single string.
// a recursive function because FlowElementsType can keep nesting
function containsObjectSignature(flowType: FlowType) {
  // found FlowObjectSignatureType, return true!
  if (flowType.name === "signature" && flowType.type === "object") {
    return true;
  }
  // has more elements, look deeper
  else if (flowType.elements) {
    return flowType.elements.some(containsObjectSignature);
  }
  // nope
  return false;
}

function parseFunctionSignature(type: FlowFunctionSignatureType) {
  const argNamesArr = extractArgNames(type.raw);
  // FlowFunctionArgumentType, handle in a separate function
  const args = type.signature.arguments.map((a, i) =>
    buildFnArgs(a, i, argNamesArr)
  );
  return [
    highlight("("),
    args.length > 0
      ? args.reduce((prev, curr) => [prev, highlight(", "), curr])
      : args,
    highlight(") => "),
    highlight(
      type.signature.return.raw
        ? type.signature.return.raw
        : type.signature.return.name
    ),
  ];
}

// so sometimes a function arg name is given as an empty string in components.js
// this function tries to pull the arg names from the raw string, like so:
// "CalendarDateRangeValue => void" -> ["CalendarDateRangeValue"]
// "(?Sort) => void" -> ["Sort"]
// "() => void" -> [""]
// "(\n  query: string,\n  options: AlgoliaSearchOptions,\n  shouldNotConvertIdFields: boolean\n) => void"-> ["query", "options", "shouldNotConvertIdFields"]
function extractArgNames(rawFnStr: string) {
  let argsStr = rawFnStr.split(" => ")[0];
  // strip parens
  if (argsStr[0] === "(" && argsStr[argsStr.length - 1] === ")") {
    argsStr = argsStr.slice(1, argsStr.length - 1);
  }
  const argsArr = argsStr
    .split(",")
    // strip arg type if there's a colon
    .map(argStr => argStr.split(":")[0])
    // strip whitespace chars
    .map(argStr => argStr.replace(/\s/g, ""))
    // strip question mark if arg is nullable
    .map(argStr => argStr.replace("?", ""));
  return argsArr;
}

// FlowFunctionArgumentType
// kinda doing arm's-length recursion here, but fn args need to be treated slightly differently
function buildFnArgs(
  type: FlowFunctionArgumentType,
  argInd: number,
  argNamesArr: Array<string>
) {
  let argString;
  if (typeof type.type !== "object") {
    return false;
  }
  if (type.type.elements) {
    argString = buildPropType(type.type);
    if (type.name) {
      argString = [highlight(`${type.name}: `)].concat(argString);
    }
  } else if (type.name === "") {
    // FlowObjectSignatureType
    argString = [highlight(`${type.type.nullable ? "?" : ""}`)] // prepend with '?' if arg is nullable
      .concat(
        // should create a popover
        buildPropType(
          {name: argNamesArr[argInd], elements: [((type.type: any): FlowType)]},
          argNamesArr[argInd]
        )
      );
  }
  // e.g. {name: "query", type: {name: "string"}} -> query: string
  else {
    argString = highlight(`${type.name}: ${type.type.name}`);
  }
  return argString;
}

function createPopover(linkText: string, content: any) {
  return (
    <PopupWithClickAway>
      {(Target, Popup, {openPopup, closePopup, isOpen}) => (
        <>
          <Target>
            <PropLinkAction onClick={!isOpen ? openPopup : closePopup}>
              {linkText}
            </PropLinkAction>
          </Target>
          <Popup placement="bottom-start">
            <CustomPopover>
              <div className={css(styles.propTypePopup)}>{content}</div>
            </CustomPopover>
          </Popup>
        </>
      )}
    </PopupWithClickAway>
  );
}

// highlighted elements' onClick doesn't work, so we need to highlight stuff separately
function highlight(node: string) {
  return (
    <Highlight
      languages={["typescript"]}
      // eslint-disable-next-line flexport/no-oocss
      className={`typescript ${css(
        styles.code,
        node.includes("-") ? styles.nobr : null
      )}`}
    >
      {node}
    </Highlight>
  );
}

// some literals have quotes already, but some don't
function addQuotes(str: string) {
  return str[0] !== '"' && str[str.length - 1] !== '"' ? `"${str}"` : str;
}

// if a component is in Latitude, link to the page
// or link to the icon/color guidelines
const ICON_PROP_NAME = "IconNames";
const COLOR_PROP_NAME = "Color";
function addLinkToComponent(componentName: string) {
  let href;
  if (componentsList.includes(componentName)) {
    href = componentsUrl(componentName);
  } else if (componentName === ICON_PROP_NAME) {
    href = guidelinesUrl("iconography");
  } else if (componentName === COLOR_PROP_NAME) {
    href = guidelinesUrl("color-system");
  }
  if (href) {
    return (
      <Link href={href} openInNewTab={true} className={css(styles.propLink)}>
        {componentName}
      </Link>
    );
  }
  // if it's not actually any special name then just return the string
  return highlight(componentName);
}

// like TextLinkAction, but monospace
function PropLinkAction(props: {
  +onClick: (event: Event) => mixed,
  +children: string,
}) {
  return (
    // eslint-disable-next-line react/forbid-elements
    <button
      type="button"
      className={css(
        sharedStyles.resetButton,
        styles.link,
        styles.standardOverride,
        styles.propLink
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default class PropTable extends React.PureComponent<
  PropTableProps,
  State
> {
  constructor(props: PropTableProps) {
    super(props);
    this.state = {height: 400};
  }

  tableRef = React.createRef<HTMLTableElement>();

  componentDidMount() {
    setTimeout(() => {
      const tableHeight = this.tableRef.current
        ? this.tableRef.current.clientHeight
        : 0;
      this.setState({
        height: tableHeight,
      });
    }, 0);
  }

  render() {
    const {componentProps} = this.props;
    return (
      <Group flexDirection="column" gap={20}>
        <Text scale="title" weight="bold">
          API
        </Text>
        <div
          className={css(styles.tableOuter)}
          style={{height: this.state.height}}
        >
          <div className={css(styles.tableWrapper)}>
            <table className={css(styles.table)} ref={this.tableRef}>
              <thead>
                <tr>
                  <TableHeader title="Name" />
                  <TableHeader title="Type" />
                  <TableHeader title="Description" />
                  <TableHeader title="Required" />
                  <TableHeader title="Default" />
                </tr>
              </thead>
              <tbody>
                {componentProps
                  .filter(
                    props =>
                      !props.description || !props.description.includes("$Hide")
                  )
                  .map(prop => (
                    <tr key={prop.name}>
                      <td className={css(styles.td)}>{prop.name}</td>
                      <td className={css(styles.td)}>
                        {buildPropType(prop.type)}
                      </td>
                      <td className={css(styles.td)}>
                        {prop.description || "-"}
                      </td>
                      <td className={css(styles.td)}>
                        {prop.required ? "Yes" : "No"}
                      </td>
                      <td className={css(styles.td)}>
                        {highlight(prop.defaultValue || "-")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Group>
    );
  }
}

const TableHeader = ({title}: {+title: string}) => (
  <th className={css(styles.th)}>
    <Text weight="bold">{title}</Text>
  </th>
);

const styles = StyleSheet.create({
  tableOuter: {
    position: "relative",
  },
  tableWrapper: {
    position: "absolute",
    maxWidth: "100%",
    overflowX: "auto",
    marginBottom: "96px",
  },
  table: {
    display: "table",
    tableLayout: "fixed",
    verticalAlign: "top",
    width: "100%",
    maxWidth: "100%",
    minWidth: "750px",
    borderCollapse: "collapse",
    borderSpacing: 0,
    overflowX: "auto",
  },
  th: {
    background: colors.grey10,
    padding: "12px",
    ":nth-of-type(1)": {
      width: "20%",
      minWidth: "100px",
    },
    ":nth-of-type(2)": {
      width: "20%",
      minWidth: "100px",
    },
    ":nth-of-type(3)": {
      width: "40%",
      minWidth: "200px",
    },
    ":nth-of-type(4)": {
      width: "10%",
      minWidth: "80px",
    },
    ":nth-of-type(5)": {
      width: "10%",
      minWidth: "80px",
    },
  },
  td: {
    wordWrap: "break-word",
    padding: "12px",
  },
  code: {
    padding: 0,
    background: "transparent",
    display: "inline",
  },
  nobr: {
    whiteSpace: "nowrap",
  },
  propTypePopup: {
    padding: "8px",
  },
  propLink: {
    textDecoration: "underline",
    cursor: "pointer",
    fontFamily: "monospace",
    fontSize: "13px",
    color: colors.blue30,
    ":hover": {
      color: "#2b4ba1", // the hover color that TextLink uses
    },
  },
  // from TextLinkAction, for PropLinkAction
  link: {
    background: "none",
    color: "inherit",
    border: "none",
    padding: "0",
    font: "inherit",
    cursor: "pointer",
    outline: "0",
  },
  standardOverride: {
    // override for our questionable OOCSS bottom margins on all semantic type tags
    marginBottom: 0,
    marginTop: 0,
    cursor: "pointer",
  },
});
