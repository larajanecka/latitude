/**
 * TEAM: frontend_infra
 * @flow
 */

import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import {
  type DemoFile,
  demoCommonStyles,
  bool,
} from "../../design_system/types/demoTypes";
import Button from "../../button/Button";
import TextInput from "../../TextInput";
import Label from "../../Label";
import CustomModal, {defaultModalStyles} from "../CustomModal";
import {include, padding} from "../../styles";
import colors from "../../colors";

const demos: DemoFile = {
  demos: [
    {
      type: "full",
      example: (elementToCodeFn, demoProps) => (
        <CustomModalShim
          elementToCodeFn={elementToCodeFn}
          demoProps={demoProps}
        />
      ),
      knobs: {
        shouldCloseOnEsc: bool(false),
        shouldCloseOnOverlayClick: bool(false),
      },
    },
  ],
};

type DemoProps = {
  shouldCloseOnEsc: boolean,
  shouldCloseOnOverlayClick: boolean,
};

export class CustomModalShim extends React.PureComponent<
  {+elementToCodeFn?: React.Node => void, +demoProps: DemoProps},
  {isOpen: boolean}
> {
  static defaultProps = {disabled: false, isInvalid: false};
  state = {
    isOpen: false,
  };

  handleClose = () => {
    this.setState({isOpen: false});
  };

  handleOpen = () => {
    this.setState({isOpen: true});
  };

  render() {
    const element = (
      <CustomModal
        isOpen={this.state.isOpen}
        closeOptions={{
          onRequestClose: this.handleClose,
          shouldCloseOnEsc: this.props.demoProps.shouldCloseOnEsc,
          shouldCloseOnOverlayClick: this.props.demoProps
            .shouldCloseOnOverlayClick,
        }}
        className={css(
          defaultModalStyles.content,
          defaultModalStyles.widthMedium,
          styles.modal
        )}
      >
        <div className={css(styles.leftPanel)}>
          <Label value="Example input">
            <TextInput value="" onChange={() => {}} />
          </Label>
        </div>
        <div className={css(styles.rightPanel)}>
          <div>Right Panel</div>
          <Button onClick={this.handleClose}>OK</Button>
        </div>
      </CustomModal>
    );
    // eslint-disable-next-line prefer-destructuring
    const elementToCodeFn = this.props.elementToCodeFn;
    // eslint-disable-next-line no-unused-expressions
    elementToCodeFn &&
      elementToCodeFn(
        <div>
          <div>
            Cannot display code because of a bug in the react component code
            library that manifests with react portals. View the react element in
            Chrome, or search the code base for a code example. This is
            non-dynamic code that has been pasted in from the example (may be
            out of date).
          </div>
          <div>
            {`
            ...
            const styles = StyleSheet.create({
              modal: {
                maxWidth: "450px",
                backgroundColor: "white",
                ...include(padding.a.m),
                backgroundColor: colors.white,
              },
            });
            ...

            <CustomModal
        isOpen={true}
        closeOptions={{onRequestClose: this.handleClose}}
        width="s"
        className={css(defaultModalStyles.content, styles.modal)}
      >
        <div>
          <Label value="Example input">
            <TextInput value="" onChange={() => {}} />
          </Label>
          <Button onClick={this.handleClose}>OK</Button>
        </div>
      </CustomModal>`}
          </div>
        </div>
      );
    return (
      <div className={css(demoCommonStyles.smallWrapper)}>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        {element}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    ...include(padding.a.m),
    display: "flex",
    padding: 0,
  },
  rightPanel: {flexGrow: 1, height: 400},
  leftPanel: {
    backgroundColor: colors.grey30,
  },
});

export default demos;
