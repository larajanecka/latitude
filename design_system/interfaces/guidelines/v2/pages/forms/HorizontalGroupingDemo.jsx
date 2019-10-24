/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState, useCallback} from "react";
import {StyleSheet, css} from "aphrodite";
import Collection from "../../components/Collection";
import colors from "../../../../../../colors";
import Text from "../../../../../../Text";
import Label from "../../../../../../Label";
import TextInput from "../../../../../../TextInput";
import SelectInput from "../../../../../../select/SelectInput";
import FormSection from "../../../../../../form/FormSection";
import FormRow from "../../../../../../form/FormRow";

const columnsOptions = [
  {
    label: "1 column",
    value: "1",
  },
  {
    label: "2 columns",
    value: "2",
  },
  {
    label: "3 columns",
    value: "3",
  },
  {
    label: "4 columns",
    value: "4",
  },
];

const formWidthOptions = [
  {
    label: "320px",
    value: "320",
  },
  {
    label: "400px",
    value: "400",
  },
  {
    label: "600px",
    value: "600",
  },
  {
    label: "740px",
    value: "740",
  },
];

const minColWidthOptions = [
  {
    label: "120px",
    value: "120",
  },
  {
    label: "160px",
    value: "160",
  },
  {
    label: "200px",
    value: "200",
  },
  {
    label: "240px",
    value: "240",
  },
  {
    label: "320px",
    value: "320",
  },
];

const FormWithColumns = ({
  columns,
  formWidth,
  minColWidth,
}: {|
  +columns: string,
  +formWidth: string,
  +minColWidth: string,
|}) => {
  const numColumns = parseInt(columns, 10);
  const elements = Array(numColumns)
    .fill(0)
    .map((_item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Label value="label" indicateRequired={true} key={index}>

        <TextInput placeholder="Placeholder" onChange={() => undefined} value=""/>
      </Label>
    ));
  const colSpans = Array(numColumns).fill(1);

  return (
    <div className={css(styles.panel)}>
      <div
        className={css(styles.form)}
        style={{width: `${parseInt(formWidth, 10) + 20}px`}}
      >
        <div className={css(styles.divider)}>
          <Text color="grey40">{`${formWidth}px`}</Text>
        </div>
        <FormSection
          columns={numColumns}
          columnGap={20}
          minColumnWidth={parseInt(minColWidth, 10)}
          description="Verified Gross Mass (VGM) rail transpacific east bound shipment less than container load freight charges."
        >
          <FormRow columnSpans={colSpans}>{elements}</FormRow>
          <FormRow columnSpans={colSpans}>{elements}</FormRow>
        </FormSection>
      </div>
    </div>
  );
};

function HorizontalGroupingDemo() {
  const [formWidth, setFormWidth] = useState("600");
  const [columns, setColumns] = useState("2");
  const [minColWidth, setMinColWidth] = useState("320");

  const handleFormWidthChange = useCallback(
    newVal => {
      if (newVal) {
        setFormWidth(newVal);
      }
    },
    [setFormWidth]
  );
  const handleColumnsChange = useCallback(
    newVal => {
      if (newVal) {
        setColumns(newVal);
      }
    },
    [setColumns]
  );
  const handleMinColWidthChange = useCallback(
    newVal => {
      if (newVal) {
        setMinColWidth(newVal);
      }
    },
    [setMinColWidth]
  );

  return (
    <div className={css(styles.wrapper)}>
      <div className={css(styles.controls)}>
        <Collection columnsSpan={3} collapse={false}>
          <Label value="Form Width">
            <SelectInput
              value={formWidth}
              options={formWidthOptions}
              onChange={handleFormWidthChange}
            />
          </Label>
          <Label value="Columns">
            <SelectInput
              value={columns}
              options={columnsOptions}
              onChange={handleColumnsChange}
            />
          </Label>
          <Label value="Min Column Width">
            <SelectInput
              value={minColWidth}
              options={minColWidthOptions}
              onChange={handleMinColWidthChange}
            />
          </Label>
        </Collection>
      </div>
      <FormWithColumns
        formWidth={formWidth}
        columns={columns}
        minColWidth={minColWidth}
      />
    </div>
  );
}

const styles = StyleSheet.create({
  controls: {
    marginBottom: 20,
  },
  wrapper: {
    marginBottom: 40,
  },
  divider: {
    borderBottom: `1px dashed ${colors.purple20}`,
    marginBottom: 36,
  },
  panel: {
    overflow: "auto",
    border: `1px solid ${colors.grey20}`,
  },
  form: {
    margin: "0 auto",
    padding: "40px 10px 56px",
  },
});

export default HorizontalGroupingDemo;
