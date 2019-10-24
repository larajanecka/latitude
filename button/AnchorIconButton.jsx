/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow strict
 */

/* eslint-disable react/forbid-elements */
/* eslint-disable flexport/no-disabled-anchors */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import colors from "../colors";
import Icon from "../Icon";
import type {IconNames} from "../tools/icons";
import invariant from "../tools/invariant";
import stringOrFalse from "../tools/stringOrFalse";
import {sharedStyles, getButtonStyle} from "../button/styles";
import ThemeNameContext, {type Theme} from "../context/ThemeNameContext";
import Link from "../Link";

export type AnchorIconButtonKind = "solid" | "bare" | "hollow" | "blank";
export type AnchorIconButtonIntent = "basic" | "none" | "danger";
export type AnchorIconButtonSize = "s" | "m" | "l";

const getIconSize = (size: AnchorIconButtonSize) => {
  switch (size) {
    case "s":
      return "xxs";
    case "m":
      return "xs";
    default:
      // case "l"
      return "s";
  }
};

type Props = {|
  /** The name of the icon meant to be used as the primary button label or meant to be placed next to the label text. */
  +iconName: IconNames,
  /** The position of the icon relative to the text. */
  +iconAlignment: "left" | "right",
  /** The text that should appear next to the icon. */
  +label?: string,
  /** Three main intents are used in our UI; intents are styles that convey meaning and reinforce the action. */
  +intent: AnchorIconButtonIntent,
  /** Defines the height of the button. Button sizes correspond to the main form sizes. */
  +size: AnchorIconButtonSize,
  /** Hollow buttons have padding and border, bare has padding but no border, and blank has neither padding nor border */
  +kind: AnchorIconButtonKind,
  /** Buttons should generally use auto width ("responsive"). Fixed widths are good for multiple buttons in a row. Full width buttons work great for tables. */
  +width: "responsive" | "full",
  /** Give the button the disabled attribute, drop it's opacity, and remove pointer-events. */
  +disabled: boolean,
  /** Path to be linked. */
  +href?: string,
  +download?: boolean,
  /** Function invoked when mouse down is triggered */
  +onMouseDown?: (event: Event) => mixed,
  /** Function invoked when mouse up is triggered */
  +onMouseUp?: (event: Event) => mixed,
  /** Function invoked when button action is triggered */
  +onClick?: (event: Event) => mixed,
  /** Applies target="_blank" so the link opens in a new tab */
  +openInNewTab: boolean,
  /**
   * our single page app routing (called spaMixin) hijacks all clicks on
   * anchor tags. You might not want this, most often for switching between
   * applications (you want a full page reload). Set this to true to disable that
   * behavior.
   */
  +disableSpaHijack: boolean,
|};

const validateProps = (props: {
  +kind?: AnchorIconButtonKind,
  +intent?: AnchorIconButtonIntent,
}) => {
  invariant(
    !(props.kind === "solid" && props.intent === "none"),
    "Solid buttons must have an intent!"
  );
};

/**
 * Consider removing unsafe lifecycle methods for future concurrent mode support!
 * See https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes
 */
/* eslint-disable react/no-unsafe */
/**
 * @short An exact replica of IconButton but meant specifically for links.
 * @brandStatus V2
 * @status Stable
 * @category Interaction
 *
 * Our current icon list can be accessed from our [Icon Guidelines](/design/guidelines/iconography).
 * @extends React.Component */
export default class AnchorIconButton extends React.PureComponent<Props> {
  static defaultProps = {
    iconAlignment: "left",
    intent: "none",
    size: "m",
    kind: "hollow",
    width: "responsive",
    disabled: false,
    download: false,
    openInNewTab: false,
    disableSpaHijack: false,
  };

  static contextType = ThemeNameContext;
  context: Theme;
  constructor(props: Props) {
    super(props);
    validateProps(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    validateProps(nextProps);
  }

  render() {
    const {
      iconName,
      iconAlignment,
      label,
      intent,
      kind,
      size,
      href,
      download,
      onMouseDown,
      onMouseUp,
      onClick,
      openInNewTab,
      disabled,
      width,
      disableSpaHijack,
    } = this.props;

    const buttonStyles = getButtonStyle(
      this.context,
      kind,
      intent,
      size,
      width,
      disabled
    );

    const labelOrFalse = stringOrFalse(label);
    const LabelComponent = labelOrFalse ? (
      <span
        className={css(
          sharedStyles.label,
          iconAlignment === "right" && sharedStyles.labelLeft,
          ...buttonStyles.label
        )}
      >
        {labelOrFalse}
      </span>
    ) : null;

    const IconComponent = (
      <Icon
        iconName={iconName}
        size={getIconSize(size)}
        alignment="center"
        deprecatedAllowColorInheritance={false}
      />
    );

    const [FirstComponent, SecondComponent] =
      iconAlignment === "left"
        ? [IconComponent, LabelComponent]
        : [LabelComponent, IconComponent];

    return (
      <Link
        className={css(
          ...buttonStyles.button,
          intent === "none" ? styles.none : null
        )}
        openInNewTab={openInNewTab}
        href={href}
        download={download}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={onClick}
        disableSpaHijack={disableSpaHijack}
      >
        {FirstComponent}
        {SecondComponent}
      </Link>
    );
  }
}

const styles = StyleSheet.create({
  none: {
    fill: colors.grey50,
    ":hover span svg": {
      fill: colors.black,
    },
  },
});
