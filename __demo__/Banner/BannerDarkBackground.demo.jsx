/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {type Node} from "react";
import {css, StyleSheet} from "aphrodite";

import {padding} from "../../styles";
import colors from "../../styles/colors";
import Banner from "../../Banner";

type Props = {|+children: Node|};

const styles = StyleSheet.create({bg: {backgroundColor: colors.grey10}});

const ComponentWithDarkBackground = ({children}: Props) => (
  <div className={css(padding.a.xl, styles.bg)}>{children}</div>
);

/**
 * @title Banner without close button
 * @description Ommitting the closeButton callback will cause the close button to be omitted.
 */
export default function BannerWithoutCloseButton() {
  return (
    <ComponentWithDarkBackground>
      <Banner
        iconName="flag"
        intent="default-light"
        message="You can distinguish this banner from its background!"
      />
    </ComponentWithDarkBackground>
  );
}
