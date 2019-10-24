/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import Highlight from "react-highlight/lib/optimized";
import jsxToString from "../../../tools/jsxToString";

import {
  type Knob,
  type DemoType,
  type DemoProps as FullDemoProps,
  extractDefaults,
} from "../../types/demoTypes";
import Checkbox from "../../../Checkbox";
import TextInput from "../../../TextInput";
import Label from "../../../Label";

import Text from "../../../Text";
import SelectInput from "../../../select/SelectInput";
import SearchableSelectInput from "../../../select/SearchableSelectInput";
import CalendarDateInput from "../../../date/CalendarDateInput";
import type {CalendarDate} from "../../../date/CalendarDateType";
import TextLinkAction from "../../../TextLinkAction";
import Group from "../../../Group";
import Markdown from "../markdown/Markdown";

import colors from "../../../colors";

type DemoProps = {
  +demo: DemoType,
};

type DemoState = {
  displayCode?: React.Node,
  showCode: boolean,
};

export default class Demo extends React.PureComponent<DemoProps, DemoState> {
  constructor(props: DemoProps) {
    super(props);
    this.state = {
      displayCode: undefined,
      showCode: true,
    };
  }

  handleCodeExample = (node: React.Node | string) => {
    this.setState({
      displayCode: typeof node === "string" ? node : jsxToString(node),
    });
  };

  handleShowCodeClicked = () => {
    this.setState({showCode: !this.state.showCode});
  };

  static getDerivedStateFromProps = (
    nextProps: DemoProps,
    prevState: DemoState
  ) => {
    const {demo} = nextProps;
    const {type} = demo;
    if (type === "text") {
      return {showCode: true};
    } else if (type === "code") {
      return {
        showCode:
          demo.showCode !== undefined ? demo.showCode : prevState.showCode,
      };
    } else if (type === "full") {
      return {
        showCode:
          demo.showCode !== undefined ? demo.showCode : prevState.showCode,
      };
    }
    return {};
  };

  renderShowCodeLink = () => {
    const {showCode} = this.state;
    if (!showCode) {
      return (
        <div className={css(styles.codeToggle)}>
          <TextLinkAction
            onClick={this.handleShowCodeClicked}
          >{`Show code </>`}</TextLinkAction>
        </div>
      );
    }
    return (
      <div className={css(styles.codeToggle)}>
        <TextLinkAction
          onClick={this.handleShowCodeClicked}
        >{`Hide code </>`}</TextLinkAction>
      </div>
    );
  };

  render() {
    const {demo} = this.props;
    const {showCode, displayCode} = this.state;
    if (demo.type === "text") {
      return (
        <article
          className={css(styles.demo, demo.fullWidth && styles.demoFull)}
        >
          <Group flexDirection="column" gap={12}>
            <Text weight="bold">{demo.title}</Text>
            <Markdown text={demo.description} />
          </Group>
        </article>
      );
    } else if (demo.type === "code") {
      return (
        <article
          className={css(styles.demo, demo.fullWidth && styles.demoFull)}
        >
          <Group flexDirection="column" gap={12}>
            <Text weight="bold">{demo.title}</Text>
            <Markdown text={demo.description} />
            {demo.example(this.handleCodeExample)}
            {this.renderShowCodeLink()}
            {this.state.showCode ? (
              // eslint-disable-next-line flexport/no-oocss
              <Highlight languages={["xml"]} className="html">
                {this.state.displayCode}
              </Highlight>
            ) : null}
          </Group>
        </article>
      );
    } else if (demo.type === "full") {
      return (
        <article className={css(styles.demo, styles.demoFull)}>
          <Group flexDirection="column" gap={12}>
            <Text weight="bold">Dynamic Settings</Text>
            <Text>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Interact with the dynamic settings to see how the component's
              props modify the component.
            </Text>
          </Group>
          <KnobsStateContainer
            knobs={demo.knobs}
            example={demo.example}
            // eslint-disable-next-line react/jsx-handler-names
            elementToCodeFn={this.handleCodeExample}
            onShowCodeClicked={this.handleShowCodeClicked}
            demo={demo}
          />
          {this.renderShowCodeLink()}
          {showCode ? (
            // eslint-disable-next-line flexport/no-oocss
            <Highlight languages={["xml"]} className="html">
              {displayCode}
            </Highlight>
          ) : null}
        </article>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  demo: {
    border: `1px solid ${colors.grey20}`,
    padding: "20px",
  },
  demoFull: {
    gridColumn: "1 / 3",
    "@media only screen and (max-width: 1280px)": {
      gridColumn: "1 / 1",
    },
  },
  knobs: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(225px, 1fr))",
    gridColumnGap: "12px",
    gridRowGap: "20px",
  },
  knobsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: "20px",
    background: colors.grey10,
    padding: "20px",
    marginTop: "20px",
  },
  stateContainer: {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  codeToggle: {
    textAlign: "right",
    paddingTop: "12px",
  },
});

type KnobsContainer<O: {[string]: any}> = {
  +knobs: O,
  +elementToCodeFn: React.Node => void,
  +example: (
    elementToCodeFn: (React.Node) => void,
    knobsData: any
  ) => React.Node,
  +demo: any,
};

class KnobsStateContainer<O: {[string]: any}> extends React.PureComponent<
  KnobsContainer<O>,
  {|knobState: FullDemoProps<O>|}
> {
  constructor(props: KnobsContainer<O>) {
    super(props);
    this.state = {knobState: extractDefaults(this.props.demo.knobs)};
  }
  handleChange(change: FullDemoProps<O>) {
    this.setState({knobState: change});
  }

  render() {
    return (
      <div className={css(styles.stateContainer)}>
        {this.props.example(this.props.elementToCodeFn, this.state.knobState)}
        {Object.keys(this.props.knobs).length > 0 ? (
          <div className={css(styles.knobsContainer)}>
            <Text scale="subtext">Live-updating prop adjustments</Text>
            <div className={css(styles.knobs)}>
              <Knobs
                knobs={this.props.knobs}
                knobState={this.state.knobState}
                onChange={this.handleChange.bind(this)}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

class Knobs<O: {[string]: any}> extends React.PureComponent<{
  +knobs: O,
  +knobState: FullDemoProps<O>,
  +onChange: (FullDemoProps<O>) => void,
}> {
  handleBooleanKnob = (name: string, value: boolean) => {
    const newState = {...this.props.knobState};
    newState[name] = value;
    this.props.onChange(newState);
  };

  handleStringKnob = (name: string, value: string) => {
    const newState = {...this.props.knobState};
    newState[name] = value;
    this.props.onChange(newState);
  };

  handleListKnob = (name: string, value: any) => {
    const newState = {...this.props.knobState};
    newState[name] = value;
    this.props.onChange(newState);
  };

  handleCalendarDateKnob = (name: string, value: ?CalendarDate) => {
    const newState = {...this.props.knobState};
    newState[name] = value;
    this.props.onChange(newState);
  };
  render() {
    const castedKnobs: {[string]: Knob} = this.props.knobs;
    const {knobState} = this.props;
    return Object.keys(castedKnobs)
      .map(name => {
        let component = null;
        if (castedKnobs[name].type === "bool") {
          component = (
            <Checkbox
              onChange={this.handleBooleanKnob.bind(this, name)}
              checked={knobState[name]}
            />
          );
        } else if (castedKnobs[name].type === "text") {
          component = (
            <TextInput
              value={knobState[name]}
              onChange={this.handleStringKnob.bind(this, name)}
            />
          );
        } else if (castedKnobs[name].type === "list") {
          const listKnob = castedKnobs[name];
          const {isSearchable} = listKnob;
          component = isSearchable ? (
            <SearchableSelectInput
              value={knobState[name]}
              onChange={this.handleListKnob.bind(this, name)}
              // $FlowFixMe(dirak): options of selectinput is different
              options={listKnob.options}
              isNullable={listKnob.isNullable}
            />
          ) : (
            <SelectInput
              value={knobState[name]}
              onChange={this.handleListKnob.bind(this, name)}
              options={listKnob.options}
              toKeyFn={listKnob.toKeyFn}
              isNullable={listKnob.isNullable}
            />
          );
        } else if (castedKnobs[name].type === "calendarDate") {
          component = (
            <CalendarDateInput
              value={knobState[name]}
              onChange={this.handleCalendarDateKnob.bind(this, name)}
            />
          );
        }
        return (
          <Label key={name} value={name}>
            {component}
          </Label>
        );
      })
      .filter(Boolean);
  }
}
