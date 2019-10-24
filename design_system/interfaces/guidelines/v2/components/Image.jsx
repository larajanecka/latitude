/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import colors from "../../../../../colors";

type Props = {|
  +src: string,
  +alt: string,
  +framed?: boolean,
|};

function Image({src, alt, framed = false}: Props) {
  return (
    <div className={css(styles.imageWrapper, framed && styles.framer)}>
      <div className={css(framed && styles.framed)}>
        <img className={css(styles.image)} src={src} alt={alt} />
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    marginBottom: 40,
  },
  framer: {
    padding: 36,
    backgroundColor: colors.grey10,
  },
  framed: {
    margin: "0 auto",
    maxWidth: 400,
  },
  image: {
    height: "auto",
    maxWidth: "100%",
    margin: "0 auto",
  },
});

export default Image;
