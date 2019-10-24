/**
 * TEAM: frontend_infra
 * WATCHERS: uforic
 * @flow strict-local
 */
import * as React from "react";
import * as ReactDOM from "react-dom";

import {Manager} from "react-popper";
import {StyleSheet, css} from "aphrodite";
import invariant from "../tools/invariant";
import {today} from "./CalendarDateType";
import {
  type WallTime,
  isWallTime,
  displayTime,
  momentFromCalDateWallTime,
  momentToWallTime,
  parseInputText,
} from "./wallTime";
import popupWithClickAway, {
  type PopupWithClickAwayProps,
} from "../tools/popupWithClickAway";
import {type Size} from "../sizes";
import Portal from "../Portal";
import {
  ARROW_DOWN_KEY,
  ARROW_UP_KEY,
  ENTER_KEY,
  isKeyCodeCauseBlur,
} from "./inputUtils";
import DeprecatedPopperTarget from "../popup/DeprecatedPopperTarget";
import DeprecatedPopper from "../popup/DeprecatedPopper";
import TextInput from "../TextInput";
import {zIndices} from "../tools/zIndices";
import {border, include, margin, padding} from "../styles";
import colors from "../colors";

const VALID_KEY_CODES = [ARROW_DOWN_KEY, ARROW_UP_KEY];

type TimeInputProps = PopupWithClickAwayProps & {
  // display 24 hour time
  militaryTime: boolean,
  // preset time options to choose from. create them using `getTimeIntervals` exported in TimeInput.
  options: $ReadOnlyArray<WallTime>,
  disabled?: boolean,
  size?: Size,
  isInvalid?: boolean,
  isPrefilled?: boolean,
  placeholder?: string,
  inputRef?: (HTMLElement | null) => void,
  onBlur?: Event => void,
  onClick?: Event => void,
  onFocus?: Event => void,
  onKeyDown?: KeyboardEvent => void,
  value: WallTime | null,
  onChange: (WallTime | null) => void,
  textAlign: "left" | "right" | "center",
  extraIgnoreReactOnclickoutsideClass: string,
  // use for third party components that need the datepicker to be a child
  noPortal?: boolean,
};

type TimeInputState = {
  textValue: string,
};

/**
 * Consider removing unsafe lifecycle methods for future concurrent mode support!
 * See https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes
 */
/* eslint-disable react/no-unsafe */
/**
 * @short A simple time chooser that supports precreated times as well as arbitrary user input.
 * @category Data Entry
 * @group Date and Time
 * @brandStatus V2
 * @status Stable
 * @extends React.Component */
class TimeInputClass extends React.PureComponent<
  TimeInputProps,
  TimeInputState
> {
  static defaultProps = {
    isPrefilled: false,
    militaryTime: false,
    textAlign: "left",
    extraIgnoreReactOnclickoutsideClass: "",
    placeholder: "-- : --  --",
    noPortal: false,
  };

  listRef: HTMLElement | null;
  inputRef: HTMLElement | null;
  constructor(props: TimeInputProps) {
    super(props);
    this.validateInput(props.value);
    this.state = {
      textValue: props.value
        ? displayTime(props.value, {military: props.militaryTime})
        : "",
    };
    this.listRef = null;
  }

  setListRef = (listRef: HTMLElement | null) => {
    this.listRef = listRef;
    this.scrollSelectedIntoView();
  };

  // eslint-disable-next-line class-methods-use-this
  validateInput(wallTime: WallTime | null) {
    if (!wallTime) {
      return;
    }
    invariant(
      isWallTime(wallTime),
      // flowlint-next-line unclear-type:off
      `Invalid wall clock time passed in ${((wallTime: any): string)}`
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps: TimeInputProps) {
    this.validateInput(nextProps.value);
    if (
      this.props.militaryTime !== nextProps.militaryTime ||
      this.props.value !== nextProps.value
    ) {
      this.resetTextValue(nextProps.value, nextProps.militaryTime);
    }
  }

  handleBlur = () => {
    this.handleBlurEvent(this.state.textValue);
  };

  handleFocus = () => {
    this.showPopup();
  };

  handleKeyDown = (event: KeyboardEvent) => {
    const {militaryTime} = this.props;
    if (isKeyCodeCauseBlur(event.keyCode)) {
      this.hidePopup();
      return;
    }
    if (event.keyCode === ENTER_KEY) {
      this.hidePopup();
      this.handleBlurEvent(this.state.textValue);
      return;
    }
    if (!VALID_KEY_CODES.includes(event.keyCode)) {
      return;
    }
    if (event.keyCode === ARROW_UP_KEY || event.keyCode === ARROW_DOWN_KEY) {
      const currentOptionIndex = this.props.options.indexOf(
        parseInputText(this.state.textValue)
      );
      if (currentOptionIndex === -1) {
        this.resetTextValue(this.props.options[0], militaryTime);
      } else if (event.keyCode === ARROW_UP_KEY && currentOptionIndex !== 0) {
        this.resetTextValue(
          this.props.options[currentOptionIndex - 1],
          militaryTime
        );
      } else if (
        event.keyCode === ARROW_DOWN_KEY &&
        currentOptionIndex !== this.props.options.length - 1
      ) {
        this.resetTextValue(
          this.props.options[currentOptionIndex + 1],
          militaryTime
        );
      }
      this.showPopup();
      this.scrollSelectedIntoView();
    }
  };

  handleOptionClick = (wallTime: WallTime) => {
    this.props.onChange(wallTime);
    // eslint-disable-next-line no-unused-expressions
    this.inputRef && this.inputRef.focus();
    this.hidePopup();
  };

  handleTextChange = (value: string) => {
    this.setState({
      textValue: value,
    });
  };

  handleBlurEvent = (value: string) => {
    const wallTime = parseInputText(value);
    if (wallTime) {
      this.props.onChange(wallTime);
      this.resetTextValue(wallTime, this.props.militaryTime);
    } else if (value.trim() === "") {
      this.props.onChange(null);
      this.resetTextValue(null, this.props.militaryTime);
    } else {
      this.resetTextValue(this.props.value, this.props.militaryTime);
    }
  };

  scrollSelectedIntoView = () => {
    if (this.listRef) {
      /* eslint-disable react/no-find-dom-node */
      // $FlowFixMe(uforic) we know this isn't text
      const domRef: Element | null = ReactDOM.findDOMNode(this.listRef);
      /* eslint-enable react/no-find-don-node */
      if (!domRef) {
        return;
      }
      // $FlowFixMe(uforic) - we know this field is here, just not aphrodite typechecked
      const selectedClassName = timeInputStyleSheet.listItemSelected._name;
      /* eslint-enable flexport/no-use-before-define-except-styles */
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < domRef.children.length; i++) {
        if (domRef.children[i].className.includes(selectedClassName)) {
          domRef.children[i].scrollIntoView();
        }
      }
    }
  };

  showPopup = () => {
    this.props.setPopupVisible(true);
  };

  hidePopup = () => {
    this.props.setPopupVisible(false);
  };

  resetTextValue(wallTime: WallTime | null, militaryTime: boolean) {
    this.setState({
      textValue: wallTime
        ? displayTime(wallTime, {military: militaryTime})
        : "",
    });
  }

  render() {
    const {militaryTime, options} = this.props;
    // popup props
    const {isPopupVisible} = this.props;
    // InputProps
    const {
      size,
      disabled,
      isInvalid,
      placeholder,
      textAlign,
      isPrefilled,
    } = this.props;

    const inputContent = (
      <TextInput
        size={size}
        isInvalid={isInvalid}
        isPrefilled={isPrefilled}
        disabled={disabled}
        placeholder={placeholder}
        value={this.state.textValue}
        onChange={this.handleTextChange}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        // eslint-disable-next-line react/jsx-handler-names
        onClick={this.showPopup}
        inputRef={ref => {
          this.inputRef = ref;
        }}
        textAlign={textAlign}
        suffix={{iconName: "clock"}}
      />
    );
    const PopupContainer =
      this.props.noPortal === true ? React.Fragment : Portal;
    return (
      <div style={{minWidth: "115px"}}>
        <Manager>
          <DeprecatedPopperTarget>{inputContent}</DeprecatedPopperTarget>
          {isPopupVisible ? (
            <PopupContainer>
              <DeprecatedPopper
                // eslint-disable-next-line flexport/no-oocss
                className={`ignore-react-onclickoutside ${
                  this.props.extraIgnoreReactOnclickoutsideClass
                } ${css(timeInputStyleSheet.zIndexAbsoluteStyle)}`}
                placement="bottom-start"
              >
                <div
                  id="testId"
                  className={css(timeInputStyleSheet.listContainer)}
                  ref={this.setListRef}
                >
                  {options.map(option => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                    <div
                      className={css(
                        timeInputStyleSheet.listItemHover,
                        parseInputText(this.state.textValue) === option
                          ? timeInputStyleSheet.listItemSelected
                          : null
                      )}
                      key={displayTime(option, {military: militaryTime})}
                      onClick={() => this.handleOptionClick(option)}
                    >
                      {displayTime(option, {military: militaryTime})}
                    </div>
                  ))}
                </div>
              </DeprecatedPopper>
            </PopupContainer>
          ) : null}
        </Manager>
      </div>
    );
  }
}

const TimeInput = popupWithClickAway(TimeInputClass);

export default TimeInput;

/**
 * TODO(@uforic): Borrowed heavily from DropdownButton - should find a way to resuse
 */
export const timeInputStyleSheet = StyleSheet.create({
  zIndexAbsoluteStyle: {
    zIndex: zIndices.zIndex1500AboveModal.value,
  },
  listContainer: {
    backgroundColor: colors.white,
    ...include(padding.v.s),
    maxHeight: 300,
    minWidth: 160,
    overflowY: "auto",
    ...border.a.s,
    ...include(margin.t.xs),
    borderRadius: 3,
  },
  listItemHover: {
    ":hover": {backgroundColor: colors.grey20},
    ...include(padding.h.m),
    ...include(padding.v.s),
    cursor: "pointer",
  },
  listItemSelected: {
    backgroundColor: colors.grey20,
  },
});

export function getTimeIntervals(
  startTime: WallTime,
  endTime: WallTime,
  interval: 15 | 30 | 60
) {
  const intervals: Array<WallTime> = [];
  const arbitraryDay = today("UTC");
  const startMmt = momentFromCalDateWallTime(arbitraryDay, startTime, "UTC");
  const endMmt = momentFromCalDateWallTime(arbitraryDay, endTime, "UTC");
  let currentMmt = startMmt.clone();

  /** this is (60 / 15) * 24, the max number of times that could be displayed */
  for (let i = 0; i < 24 * 4; i += 1) {
    if (!currentMmt.isBefore(endMmt)) {
      break;
    }
    intervals.push(momentToWallTime(currentMmt, "UTC"));
    currentMmt = currentMmt.add(interval, "minutes");
  }
  return intervals;
}
