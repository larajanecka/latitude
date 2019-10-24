/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import type {DemoFile} from "../design_system/types/demoTypes";
import Group from "../Group";
import Banner from "../Banner";
import Button from "../button/Button";
import colors from "../colors";
import {padding} from "../styles";

const demos: DemoFile = {
  demos: [
    {
      type: "code",
      fullWidth: true,
      title: "Basic usage",
      description: "Banners can use different intents for different use cases.",
      example: elementToCodeFn => {
        const component = (
          <Group flexDirection="column" gap={40}>
            <Group flexDirection="column">
              {'Intent "Default":'}
              <Banner
                iconName="attention"
                message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
                onClose={() => {}}
              />
            </Group>
            <Group flexDirection="column">
              {'Intent "Warning":'}
              <Banner
                iconName="attention"
                message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
                intent="warning"
                onClose={() => {}}
              />
            </Group>
            <Group flexDirection="column">
              {'Intent "Danger":'}
              <Banner
                iconName="attention"
                message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
                intent="danger"
                onClose={() => {}}
              />
            </Group>
          </Group>
        );

        elementToCodeFn(component);

        return component;
      },
    },
    {
      type: "code",
      fullWidth: true,
      title: "Banner With Actionable Button",
      description:
        "Banners can become actionable with the addition of a button.",
      example: elementToCodeFn => {
        const component = (
          <Group flexDirection="column" gap={40}>
            <Banner
              iconName="attention"
              message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
              onClose={() => {}}
              ctaButton={
                <Button label="Create a new log" kind="blank" intent="basic" />
              }
            />
          </Group>
        );

        elementToCodeFn(component);

        return component;
      },
    },
    {
      type: "code",
      fullWidth: true,
      title: "Banner Without close button",
      description:
        "Ommitting the closeButton callback will cause the close button to be omitted.",
      example: elementToCodeFn => {
        const component = (
          <Group flexDirection="column" gap={40}>
            <Banner
              iconName="attention"
              intent="warning"
              message="You cannot edit an automatic On Duty Log. You’ll need to create a new log."
              ctaButton={
                <Button label="Create a new log" kind="blank" intent="basic" />
              }
            />
          </Group>
        );

        elementToCodeFn(component);

        return component;
      },
    },
    {
      type: "code",
      fullWidth: true,
      title: "Banner on Dark Background",
      description: `Default intent banners on darker backgrounds should use intent "default-light" to stand out.`,
      example: elementToCodeFn => {
        const component = (
          <ComponentWithDarkBackground>
            <Banner
              iconName="flag"
              intent="default-light"
              message="You can distinguish this banner from its background!"
            />
          </ComponentWithDarkBackground>
        );

        elementToCodeFn(component);

        return component;
      },
    },
  ],
};

export default demos;

const ComponentWithDarkBackground = ({children}: {+children: React.Node}) => (
  <div className={css(padding.a.xl, styles.bg)}>{children}</div>
);

const styles = StyleSheet.create({bg: {backgroundColor: colors.grey10}});
