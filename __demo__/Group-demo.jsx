/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import Group from "../Group";
import TextInput from "../TextInput";
import Label from "../Label";
import Text from "../Text";
import Button from "../button/Button";
import colors from "../colors";

import type {DemoFile} from "../design_system/types/demoTypes";

const demos: DemoFile = {
  demos: [
    {
      type: "code",
      title: "Basic Usage",
      example: elementToCodeFn => {
        const component = (
          <div className={css(styles.demoContainer)}>
            <Group>
              <Button kind="hollow" intent="basic">
                Save
              </Button>
              <Button kind="hollow" intent="none">
                Cancel
              </Button>
            </Group>
          </div>
        );
        elementToCodeFn(component);

        return component;
      },
    },
    {
      type: "code",
      title: "Common use-case",
      example: elementToCodeFn => {
        const component = (
          <div className={css(styles.demoContainer)}>
            <Group flexDirection="column">
              <Text scale="title" weight="bold">
                FLEX-1701
              </Text>
              <Text>This is a simple example.</Text>
            </Group>
          </div>
        );
        elementToCodeFn(component);

        return component;
      },
    },
    {
      type: "code",
      title: "Alignment",
      description:
        "Using flexbox alignment rules, `Group` is able to layout content in powerful ways.",
      example: elementToCodeFn => {
        const component = (
          <div className={css(styles.demoContainer)}>
            <Group gap={12} alignItems="flex-end">
              <Label value="Example">
                <TextInput value="" onChange={() => undefined} />
              </Label>
              <Button intent="basic" kind="hollow">
                Submit
              </Button>
            </Group>
          </div>
        );
        elementToCodeFn(component);

        return component;
      },
    },
    {
      type: "code",
      title: "Nesting",
      description:
        "`Group` components may be infinitely nested to allow for easy grouping. Combining `Group` components can enable complex layouts with little code.",
      example: elementToCodeFn => {
        const component = (
          <div className={css(styles.demoContainer)}>
            <Group gap={24} flexDirection="column">
              <Label value="Example">
                <TextInput value="" onChange={() => undefined} />
              </Label>
              <Group justifyContent="space-between">
                <Button kind="hollow" intent="danger">
                  Delete
                </Button>
                <Group gap={16} alignItems="flex-end">
                  <Button kind="hollow" intent="none">
                    Cancel
                  </Button>
                  <Button kind="hollow" intent="basic">
                    Save
                  </Button>
                </Group>
              </Group>
            </Group>
          </div>
        );
        elementToCodeFn(component);

        return component;
      },
    },
    {
      type: "code",
      title: "Fill children",
      description:
        "Sometimes it is desirable to have children fill equal portions of a container. Setting `fillChildren={true}` will apply `flex: 1` to every child. Custom `flexBasis` values are *not* possible with this component. If your layout requires anything more complex please write a custom Aphrodite stylesheet. *Warning*: if children have a `minWidth` applied and wrap to a new row the flexbox context is reset and will cause children on different rows to fill unevenly. ",
      example: elementToCodeFn => {
        const component = (
          <div className={css(styles.demoContainer)}>
            <Group gap={16} fillChildren={true}>
              <div className={css(styles.example)} />
              <div className={css(styles.example)} />
              <div className={css(styles.example)} />
            </Group>
          </div>
        );
        elementToCodeFn(component);

        return component;
      },
    },
  ],
};

const styles = StyleSheet.create({
  demoContainer: {
    display: "flex",
    border: `1px dotted ${colors.grey40}`,
    width: "100%",
    marginLeft: "3px",
  },
  example: {
    display: "flex",
    flex: 1,
    background: colors.grey30,
    borderRadius: "3px",
    padding: "8px",
    minWidth: "80px",
  },
});

export default demos;
