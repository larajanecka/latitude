/**
 * TEAM: frontend_infra
 * @flow
 */
import * as React from "react";
import {StyleSheet, css} from "aphrodite";
import {Manager} from "react-popper";
import colors from "../colors";
import {type Size} from "../sizes";
import TextInput from "../TextInput";
import DropdownList, {type Option as DropdownOption} from "./DropdownList";
import useDropdown from "../tools/useDropdown";
import {defaultFilter} from "../TextInputAutocomplete";
import DeprecatedPopperTarget from "../popup/DeprecatedPopperTarget";
import DeprecatedPopper from "../popup/DeprecatedPopper";
import {BACKSPACE} from "../constants/interactions/KeyCodes";

export type Option<K> = {|
  ...DropdownOption,
  +value: K,
|};

type DropdownListProps = $Diff<
  React.ElementConfig<typeof DropdownList>,
  {|
    +options: any,
    +highlightedOption: any,
    +onClick: any,
    +isOpen: any,
  |}
>;

export type SelectInputProps<T> = {|
  // See DropdownList for dropdown props
  ...DropdownListProps,
  /** the current selected value of the select input */
  +value: T | null,
  /** the options the select input will display (see `Option` type for option's parameters) */
  +options: $ReadOnlyArray<Option<T>>,
  /** placeholder text that will be displayed when the select input is empty */
  +placeholder?: string,
  /** whether the entire select input is disabled */
  +disabled?: boolean,
  /** the size of the input field */
  +size?: Size,
  /** whether the select input is in an invalid state */
  +isInvalid?: boolean,
  /** when true, this allows the user to select the empty element from the list. this calls onChange with `null`. */
  +isNullable?: boolean,
  /** whether the select input is in an prefilled state */
  +isPrefilled?: boolean,
  /** called when the value of the select input is changed */
  +onChange: (T | null) => void,
  /** called when the select input field is focused */
  +onFocus?: Event => void,
  /** called when the select input field is blurred */
  +onBlur?: Event => void,
|};

/**
 * @short Use SearchableSelectInput when constructing forms, if you need to select only one value from a list but the list is long.
 * @category Data Entry
 * @brandStatus V2
 * @status Stable
 */
function SearchableSelectInput<T>({
  sectionOrder,
  header,
  footer,
  value,
  options,
  placeholder = "",
  disabled = false,
  size = "m",
  isInvalid = false,
  isNullable = true,
  isPrefilled = false,
  onChange,
  onFocus,
  onBlur,
}: SelectInputProps<T>) {
  const labelValueMap = options.reduce((acc, curr) => {
    acc.set(curr.label, curr.value);
    return acc;
  }, new Map());

  const valueLabelMap = options.reduce((acc, curr) => {
    acc.set(curr.value, curr.label);
    return acc;
  }, new Map());

  const [inputText, setInputText] = React.useState("");

  const [tabbingTextPlaceholder, setTabbingTextPlaceholder] = React.useState(
    valueLabelMap.get(value) || null
  );

  React.useEffect(() => {
    setTabbingTextPlaceholder(valueLabelMap.get(value));
  }, [value]);

  const dropdownOptions = options
    .filter(option => defaultFilter(inputText, option.label))
    .map(option => {
      const {value, ...dropdownOption} = option;
      return dropdownOption;
    });

  const handleChange = (newText: string | null) => {
    setInputText("");
    setTabbingTextPlaceholder(newText);

    onChange(labelValueMap.get(newText) || null);
  };

  const {
    isOpen,
    highlightedIndex,
    handlers: {
      handleInputMouseDown,
      handleInputFocus,
      handleInputBlur,
      handleListItemClick,
      handleInputKeyDown,
    },
  } = useDropdown(
    dropdownOptions.map(option => option.label),
    handleChange,
    valueLabelMap.get(value) || null,
    {
      rememberHighlightPosition: true,
    }
  );

  const handleMouseDown = () => {
    handleInputMouseDown();
  };

  const handleFocus = (e: Event) => {
    handleInputFocus();

    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: Event) => {
    handleInputBlur();

    setInputText("");
    setTabbingTextPlaceholder(valueLabelMap.get(value) || null);

    if (onBlur) {
      onBlur(e);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    handleInputKeyDown(e);

    if (isNullable && e.keyCode === BACKSPACE && inputText === "") {
      handleChange(null);
      setTabbingTextPlaceholder("");
    }
  };

  const handleCancelFocus = (e: Event) => {
    e.stopPropagation();
    // $FlowFixMe(dirak) blur exists on e.currentTarget
    e.currentTarget.blur();
  };

  const handleCancelClick = (e: Event) => {
    e.stopPropagation();

    handleChange(null);
    setInputText("");
  };

  return (
    <Manager>
      <div
        className={css(
          styles.container,
          tabbingTextPlaceholder ? styles.darkPlaceholderText : null
        )}
      >
        <DeprecatedPopperTarget>
          <div className={css(styles.inputWrapper)}>
            <TextInput
              value={inputText}
              textOverflow="ellipsis"
              onChange={setInputText}
              onMouseDown={handleMouseDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              isInvalid={isInvalid}
              disabled={disabled}
              placeholder={tabbingTextPlaceholder || placeholder}
              size={size}
              isPrefilled={isPrefilled}
              suffix={
                (tabbingTextPlaceholder && tabbingTextPlaceholder.length > 0) ||
                (inputText && inputText.length > 0)
                  ? {
                      iconName: "cancel",
                      onClick: handleCancelClick,
                      onFocus: handleCancelFocus,
                      size,
                    }
                  : {iconName: "downOpen"}
              }
            />
          </div>
        </DeprecatedPopperTarget>
        {/* Dropdown should only have containing style when visible, otherwise there are overlapping zIndex issues */}
        <DeprecatedPopper
          className={css(
            isOpen ? styles.dropdownContainer : styles.inactiveDropdownContainer
          )}
        >
          <DropdownList
            options={dropdownOptions}
            highlightedOption={
              typeof highlightedIndex === "number"
                ? dropdownOptions[highlightedIndex].label
                : null
            }
            isOpen={isOpen}
            sectionOrder={sectionOrder}
            header={header}
            footer={footer}
            onClick={handleListItemClick}
          />
        </DeprecatedPopper>
      </div>
    </Manager>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  inputWrapper: {
    position: "relative",
  },
  darkPlaceholderText: {
    ":nth-child(1n) > div > div > div > input::placeholder": {
      color: colors.grey60,
    },
  },
  inactiveDropdownContainer: {
    display: "none",
  },
  dropdownContainer: {
    display: "block",
    position: "absolute",
    left: "0",
    top: "100%",
    padding: "8px 0",
    minWidth: "100%",
    zIndex: "10",
    transform: "none",
  },
});

export default SearchableSelectInput;
