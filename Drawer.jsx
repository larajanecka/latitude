/**
 * TEAM: frontend_infra
 * WATCHERS: notandrewkaye
 * @flow
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";

import { CSSTransition } from "react-transition-group";
import IconButton from "./button/IconButton";
import Text from "./Text";
import Group from "./Group";
import Portal from "./Portal";
import {zIndices} from "./tools/zIndices";
import colors from "./colors";

const DRAWER_WIDTH = 400;
const TRANSITION_DELAY = 320;
const WORKSPACE_DEFAULT_NAV_HEIGHT = 56;

type Props = {|
  +children?: React.Node,
  +title: string,
  +navOffset?: number,
  +isOpen: boolean,
  +onClose: () => void,
|};

/**
 * @category Layout
 * @short Drawers slide in from the side of the viewport and allow for any custom content
 * @brandStatus V3
 * @status Beta
 */
function Drawer({
  children,
  title,
  navOffset = WORKSPACE_DEFAULT_NAV_HEIGHT,
  isOpen,
  onClose,
}: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={css(styles.drawerWrapper)}>
        <div className={css(styles.transitionGroup)}>
          <CSSTransition
            in={isOpen}
            classNames={{
              enter: css(styles.drawerEnter),
              enterActive: css(styles.drawerEnterActive),
              exit: css(styles.drawerExit),
              exitActive: css(styles.drawerExitActive),
            }}
            timeout={{
              enter: TRANSITION_DELAY,
              exit: TRANSITION_DELAY,
            }}
            mountOnEnter={true}
            unmountOnExit={true}
          >
            <div
              className={css(styles.container)}
              style={{
                top: navOffset,
                height: `calc(100vh - ${navOffset}px)`,
              }}
            >
              <div className={css(styles.header)}>
                <Group flexDirection="row" gap={12} alignItems="center">
                  <IconButton
                    iconName="cancel"
                    size="l"
                    onClick={onClose}
                    intent="none"
                    kind="blank"
                    type="button"
                  />
                  {title ? <Text weight="bold">{title}</Text> : null}
                </Group>
              </div>
              <div className={css(styles.body)}>{children}</div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </Portal>
  );
}

const styles = StyleSheet.create({
  drawerWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
  },
  container: {
    width: `${DRAWER_WIDTH}px`,
    position: "fixed",
    backgroundColor: colors.white,
    boxShadow: "-8px 0px 16px rgba(0, 0, 0, 0.2)",
    pointerEvents: "all",
    zIndex: zIndices.zIndexPageOverlay.value,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "12px",
    borderBottom: `1px solid ${colors.grey30}`,
  },
  body: {
    flex: 1,
    overflowY: "scroll",
  },
  transitionGroup: {
    display: "flex",
    justifyContent: "flex-end",
  },
  drawerEnter: {
    right: `-${DRAWER_WIDTH}px`,
  },
  drawerEnterActive: {
    right: "0px",
    transition: `right ${TRANSITION_DELAY}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
  },
  drawerExit: {
    right: "0px",
  },
  drawerExitActive: {
    right: `-${DRAWER_WIDTH}px`,
    transition: `right ${TRANSITION_DELAY}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
  },
});

export default Drawer;
