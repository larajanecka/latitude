/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */

import * as React from "react";
import type {DemoFile} from "../design_system/types/demoTypes";
import Icon from "../Icon";
import Text from "../Text";
import DeprecatedHorizontalGroup from "../DeprecatedHorizontalGroup";

const demos: DemoFile = {
  demos: [
    {
      type: "code",
      title: "Basic Usage",
      example: fn => {
        const component = <Icon iconName="ship" />;
        fn(component);
        return component;
      },
    },
    {
      type: "code",
      title: "Adjustments",
      example: fn => {
        const component = <Icon iconName="plane" size="xl" />;
        fn(component);
        return component;
      },
    },
    {
      type: "code",
      title: "Custom Color",
      example: fn => {
        const component = <Icon iconName="attention" color="red40" />;
        fn(component);
        return component;
      },
    },
    {
      type: "code",
      title: "Alignment",
      example: fn => {
        const component = (
          <DeprecatedHorizontalGroup>
            <Text scale="subtext">Up and to the right</Text>
            <Icon iconName="chartLine" alignment="center" />
          </DeprecatedHorizontalGroup>
        );
        fn(component);
        return component;
      },
    },
    {
      type: "code",
      title: "Custom Size",
      example: fn => {
        const component = <Icon iconName="staticShip" customSize={96} />;
        fn(component);
        return component;
      },
    },
  ],
};

export default demos;
