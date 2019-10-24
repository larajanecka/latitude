/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 *
 * @flow strict
 */

import colors, {type Color, type ColorPalette} from "../../../colors";

export const colorMeta: $ObjMap<
  ColorPalette,
  <T>() => {|
    +contrastColor: Color,
    +description?: string,
    +classification?: "utility" | "brand" | "product",
    +colorFamily:
      | "base"
      | "grey"
      | "blue"
      | "red"
      | "orange"
      | "green"
      | "indigo"
      | "purple",
    +additionalInformation?: string,
  |}
> = {
  black: {
    contrastColor: "white",
    classification: "brand",
    colorFamily: "base",
  },
  white: {
    contrastColor: "grey60",
    classification: "utility",
    colorFamily: "base",
  },
  grey10: {
    contrastColor: "grey60",
    classification: "utility",
    colorFamily: "grey",
  },
  grey20: {
    contrastColor: "grey60",
    classification: "utility",
    colorFamily: "grey",
  },
  grey30: {
    contrastColor: "grey60",
    classification: "utility",
    colorFamily: "grey",
  },
  grey40: {
    contrastColor: "grey60",
    classification: "utility",
    colorFamily: "grey",
  },
  grey50: {
    contrastColor: "white",
    classification: "utility",
    colorFamily: "grey",
  },
  grey60: {
    contrastColor: "white",
    classification: "utility",
    colorFamily: "grey",
  },
  blue10: {
    contrastColor: "grey60",
    colorFamily: "blue",
  },
  blue20: {
    contrastColor: "grey60",
    colorFamily: "blue",
  },
  blue30: {
    contrastColor: "white",
    description: "The primary product color.",
    classification: "product",
    colorFamily: "blue",
  },
  blue40: {
    contrastColor: "white",
    classification: "brand",
    colorFamily: "blue",
  },
  blue50: {
    contrastColor: "white",
    colorFamily: "blue",
  },
  blue60: {
    contrastColor: "white",
    colorFamily: "blue",
  },
  indigo10: {
    contrastColor: "grey60",
    colorFamily: "indigo",
  },
  indigo20: {
    contrastColor: "grey60",
    colorFamily: "indigo",
  },
  indigo30: {
    contrastColor: "grey60",
    classification: "product",
    colorFamily: "indigo",
  },
  indigo40: {
    contrastColor: "grey60",
    classification: "brand",
    colorFamily: "indigo",
  },
  indigo50: {
    contrastColor: "white",
    colorFamily: "indigo",
  },
  indigo60: {
    contrastColor: "white",
    colorFamily: "indigo",
  },
  green10: {
    contrastColor: "grey60",
    colorFamily: "green",
  },
  green20: {
    contrastColor: "grey60",
    colorFamily: "green",
  },
  green30: {
    contrastColor: "grey60",
    classification: "product",
    colorFamily: "green",
  },
  green40: {
    contrastColor: "white",
    classification: "brand",
    colorFamily: "green",
  },
  green50: {
    contrastColor: "white",
    colorFamily: "green",
  },
  green60: {
    contrastColor: "white",
    colorFamily: "green",
  },
  red10: {
    contrastColor: "grey60",
    colorFamily: "red",
  },
  red20: {
    contrastColor: "grey60",
    colorFamily: "red",
  },
  red30: {
    contrastColor: "white",
    colorFamily: "red",
  },
  red40: {
    contrastColor: "white",
    classification: "brand",
    colorFamily: "red",
  },
  red50: {
    contrastColor: "white",
    colorFamily: "red",
  },
  red60: {
    contrastColor: "white",
    colorFamily: "red",
  },
  purple10: {
    contrastColor: "grey60",
    colorFamily: "purple",
  },
  purple20: {
    contrastColor: "grey60",
    colorFamily: "purple",
  },
  purple30: {
    contrastColor: "white",
    classification: "product",
    colorFamily: "purple",
  },
  purple40: {
    contrastColor: "white",
    classification: "brand",
    colorFamily: "purple",
  },
  purple50: {
    contrastColor: "white",
    colorFamily: "purple",
  },
  purple60: {
    contrastColor: "white",
    colorFamily: "purple",
  },
  orange10: {
    contrastColor: "grey60",
    colorFamily: "orange",
  },
  orange20: {
    contrastColor: "grey60",
    colorFamily: "orange",
  },
  orange30: {
    contrastColor: "grey60",
    classification: "product",
    colorFamily: "orange",
  },
  orange40: {
    contrastColor: "grey60",
    classification: "brand",
    colorFamily: "orange",
  },
  orange50: {
    contrastColor: "white",
    classification: "product",
    colorFamily: "orange",
  },
  orange60: {
    contrastColor: "white",
    colorFamily: "orange",
  },
};

const buildColorFamilies = () => {
  const colorFamilies = {};
  Object.keys(colors).forEach(color => {
    const fam = colorMeta[color].colorFamily;
    if (!colorFamilies[fam]) {
      colorFamilies[colorMeta[color].colorFamily] = [];
    }
    colorFamilies[colorMeta[color].colorFamily].push(color);
  });
  return colorFamilies;
};

export const colorFamilies = buildColorFamilies();
