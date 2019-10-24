/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {StyleSheet, css} from "aphrodite";
import { LiveProvider, LiveError, LivePreview } from "react-live";
import colors from "../../../colors";
import SettingsPopover from "./SettingsPopover";
import ScopeList from "./ScopeList";
import Group from "../../../Group";
import LiveEditor from "../LiveEditor";
import Collection from "../../interfaces/guidelines/v2/components/Collection";
import SubHeader from "../../interfaces/guidelines/v2/components/SubHeader";
import Item from "../../interfaces/guidelines/v2/components/Item";

type Props = {|
  +initialCode?: string,
  +initialInline?: boolean,
  +initialSplit?: boolean,
  +scope?: {[key: string]: any},
|};

function LiveDemo({
  initialCode = "",
  initialInline = true,
  initialSplit = true,
  scope = null,
}: Props) {
  const [inline, setInline] = useState(initialInline);
  const [split, setSplit] = useState(initialSplit);
  const [code, setCode] = useState(initialCode.trim());
  const scopeWithStdlib = {
    ...scope,
    React,
    useState,
    useEffect,
    useReducer,
    useCallback,
    useMemo,
    useRef,
    useContext,
    StyleSheet,
    css,
  };

  return (
    <div className={css(styles.wrapper)}>
      <Group justifyContent="space-between">
        <SubHeader>Live Demo</SubHeader>
        <Group gap={2}>
          <ScopeList scope={scopeWithStdlib} />
          <SettingsPopover settings={{inline, setInline, split, setSplit}} />
        </Group>
      </Group>
      <LiveProvider code={code} scope={scopeWithStdlib} noInline={!inline}>
        <Collection columnsSpan={split ? 6 : 12} hasRowGap={true}>
          <Item>
            <SubHeader>Code</SubHeader>
            <LiveEditor
              initialCode={code}
              onCodeChange={newCode => setCode(newCode)}
            />
          </Item>
          <Item>
            <SubHeader>Preview</SubHeader>
            <LivePreview />
          </Item>
        </Collection>
        <LiveError />
      </LiveProvider>
    </div>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    border: `1px solid ${colors.grey20}`,
  },
});

export default LiveDemo;
