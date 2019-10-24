/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import Text from "../../../../../../Text";
import Label from "../../../../../../Label";
import TextInput from "../../../../../../TextInput";
import Button from "../../../../../../button/Button";
import colors from "../../../../../../colors";
import Collection from "../../components/Collection";
import Item from "../../components/Item";
import Half from "../../components/Half";

const MarginDecorator = ({children}: {|+children: React.Node|}) => {
  const wrappedChildren = React.Children.map(children, node => (
    <div className={css(styles.margin)}>{node}</div>
  ));
  return (
    <div className={css(styles.wrapper)}>
      <div className={css(styles.children)}>{wrappedChildren}</div>
    </div>
  );
};

const Highlight = ({children}: {|+children: React.Node|}) => (
  <div className={css(styles.highlight)}>{children}</div>
);

const WithLegend = ({id, children}: {|+id: number, +children: React.Node|}) => (
  <div className={css(styles.legendWrapper)}>
    <div className={css(styles.legendBubble)}>
      <Text weight="bold" color="white">
        {id}
      </Text>
    </div>
    {children}
  </div>
);

function FormDiagram() {
  return (
    <MarginDecorator>
      <WithLegend id={1}>
        <Half collapse={false}>
          <Highlight>
            <Text weight="bold" scale="title">
              Section
            </Text>
          </Highlight>
        </Half>
      </WithLegend>
      <WithLegend id={2}>
        <Highlight>
          <Text>
            Verified Gross Mass (VGM) rail transpacific east bound shipment less
            than container load freight charges.
          </Text>
        </Highlight>
      </WithLegend>
      <WithLegend id={3}>
        <Half collapse={false}>
          <Highlight>
            <Text weight="bold">Sub Section</Text>
          </Highlight>
        </Half>
      </WithLegend>
      <WithLegend id={4}>
        <Highlight>
          <Label value="Label" indicateRequired={true}>
            {/** $FlowFixMe(Shawn) Just a demo */}
            <TextInput placeholder="Placeholder" onChange={() => undefined} value=""/>
          </Label>
        </Highlight>
      </WithLegend>
      <Collection>
        <Item>
          <Highlight>
            <Label value="Label" indicateRequired={true}>
              {/** $FlowFixMe(Shawn) Just a demo */}
              <TextInput placeholder="Placeholder" onChange={() => undefined} value=""/>
            </Label>
          </Highlight>
        </Item>
        <Item>
          <Highlight>
            <Label value="Label" indicateRequired={true}>
              {/** $FlowFixMe(Shawn) Just a demo */}
              <TextInput placeholder="Placeholder" onChange={() => undefined} value=""/>
            </Label>
          </Highlight>
        </Item>
      </Collection>

      <Half collapse={false}>
        <Highlight>
          <Text weight="bold">Sub Section</Text>
        </Highlight>
      </Half>
      <Highlight>
        <Label value="Label" indicateRequired={true}>
          {/** $FlowFixMe(Shawn) Just a demo */}
          <TextInput placeholder="Placeholder" onChange={() => undefined} value=""/>
        </Label>
      </Highlight>
      <Collection>
        <Item>
          <Highlight>
            <Label value="Label" indicateRequired={true}>
              {/** $FlowFixMe(Shawn) Just a demo */}
              <TextInput placeholder="Placeholder" onChange={() => undefined} value=""/>
            </Label>
          </Highlight>
        </Item>
        <Item>
          <Highlight>
            <Label value="Label" indicateRequired={true}>
              {/** $FlowFixMe(Shawn) Just a demo */}
              <TextInput placeholder="Placeholder" onChange={() => undefined} value=""/>
            </Label>
          </Highlight>
        </Item>
      </Collection>
      <WithLegend id={5}>
        <div className={css(styles.buttonsWrapper)}>
          <Button kind="hollow" type="button">
            Cancel
          </Button>
          <Button kind="solid" intent="basic" type="button">
            Submit
          </Button>
        </div>
      </WithLegend>
    </MarginDecorator>
  );
}

const styles = StyleSheet.create({
  buttonsWrapper: {
    display: "flex",
    width: 160,
    justifyContent: "space-between",
  },
  wrapper: {
    position: "relative",
    padding: "46px 48px 46px 0",
    marginBottom: 40,
    ":before": {
      content: '""',
      display: "block",
      position: "absolute",
      background: colors.purple10,
      width: "calc(50% - 34px)",
      top: 0,
      left: 0,
      bottom: 0,
    },
    ":after": {
      content: '""',
      display: "block",
      position: "absolute",
      background: colors.purple10,
      width: "calc(50% - 34px)",
      top: 0,
      right: 48,
      bottom: 0,
    },
  },
  children: {
    position: "relative",
    zIndex: "1",
  },
  margin: {
    marginBottom: 16,
  },
  highlight: {
    position: "relative",
    ":before": {
      content: '""',
      display: "block",
      position: "absolute",
      background: colors.orange50,
      opacity: 0.25,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  legendWrapper: {
    position: "relative",
  },
  legendBubble: {
    position: "absolute",
    right: -34,
    backgroundColor: colors.black,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 24,
    borderRadius: 100,
  },
});

export default FormDiagram;
