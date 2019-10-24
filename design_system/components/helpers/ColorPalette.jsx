/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import * as React from "react";

import {css, StyleSheet} from "aphrodite";
import colors, {type Color} from "../../../colors";
import {colorFamilies, colorMeta} from "./colorMeta";
import Text from "../../../Text";
import Group from "../../../Group";

import {deprecatedPaddingSizeConstants} from "../../../styles/deprecatedWhitespace";

const classificationMap = {
  brand: "◉",
  product: "❖",
  utility: "⎊",
};

const ColorPalette = () => (
  <div className={css(styles.gridWwrapper)}>
    <div className={css(styles.listGrid)}>
      {Object.keys(colorFamilies).map(family => (
        <div className={css(styles.stack)} key={family}>
          {colorFamilies[family].map(color => (
            <ColorSwatch color={color} isStacked={true} key={color} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const ProductPalette = () => (
  <div className={css(styles.gridWwrapper)}>
    <div className={css(styles.listGridPrimary)}>
      <ColorSwatch color="blue30" isStacked={false} />
      <ColorSwatch color="white" isStacked={false} />
      <ColorSwatch color="grey10" isStacked={false} />
      <ColorSwatch color="grey60" isStacked={false} />
    </div>
  </div>
);

export const ColorClassificationLegend = () => (
  <Group justifyContent="flex-end" gap={20}>
    {Object.keys(classificationMap).map(classification => (
      <Group gap={8} key={classification}>
        <Text scale="title">{classificationMap[classification]}</Text>
        <Text>
          {classification === "utility"
            ? classification
            : `commonly used with ${classification}`}
        </Text>
      </Group>
    ))}
  </Group>
);

const getColorClassification = (color: Color) => {
  if (
    Object.prototype.hasOwnProperty.call(colorMeta[color], "classification")
  ) {
    return colorMeta[color].classification;
  }
  return null;
};

const ColorSwatch = ({
  color,
  isStacked,
}: {
  +color: Color,
  +isStacked: boolean,
}) => {
  const classification = getColorClassification(color);
  const classificationSymbol = classification
    ? classificationMap[classification]
    : null;
  const isProductSwatch = classification && classification === "product";
  return (
    <div
      className={css(
        styles.colorChip,
        isStacked && styles.stack,
        isProductSwatch && styles.productSwatch
      )}
      style={{
        gridArea: color,
      }}
    >
      <div
        className={css(styles.colorSwatch)}
        style={{
          backgroundColor: colors[color],
        }}
      >
        <div className={css(styles.colorInfo)}>
          <Group gap={12}>
            <Text weight="bold" color={colorMeta[color].contrastColor}>
              {color}
            </Text>
            <Text scale="title" color={colorMeta[color].contrastColor}>
              {classificationSymbol}
            </Text>
          </Group>
          <Text color={colorMeta[color].contrastColor}>{colors[color]}</Text>
        </div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  gridWwrapper: {
    position: "relative",
  },
  listGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridColumnGap: deprecatedPaddingSizeConstants.l,
    gridRowGap: deprecatedPaddingSizeConstants.l,
  },
  stack: {
    gridColumn: "span 4",
    display: "flex",
    flexDirection: "column",
    height: "350px",
  },
  listGridPrimary: {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "250px",
    gridRowGap: deprecatedPaddingSizeConstants.l,
    gridTemplateAreas:
      "'blue30 blue30 white white grey10 grey10 grey60 grey60'",
  },
  colorInfo: {
    padding: deprecatedPaddingSizeConstants.m,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  colorChip: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  colorSwatch: {
    display: "flex",
    alignItems: "start",
    flex: 1,
  },
  productSwatch: {
    flex: 2,
  },
});

export default ColorPalette;
