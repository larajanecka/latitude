/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState} from "react";
import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs";
import {StyleSheet, css} from "aphrodite";
import colors from "../../colors";
import IconButton from "../../button/IconButton";
import copyToClipboard from "../../tools/CopyToClipboard";

type Props = {|
  +initialCode?: string,
  +onCodeChange?: string => void,
  +disabled?: boolean,
|};

function LiveEditor({onCodeChange, initialCode = "", disabled = false}: Props) {
  const [code, setCode] = useState(initialCode);

  return (
    <div className={css(styles.wrapper)}>
      <Editor
        disabled={disabled}
        padding={20}
        value={code}
        highlight={code => highlight(code, languages.jsx)}
        onValueChange={newVal => {
          setCode(newVal);
          if (onCodeChange) {
            onCodeChange(newVal);
          }
        }}
        className={css(styles.editor)}
      />
      <div className={css(styles.importAction)}>
        <IconButton
          size="m"
          kind="bare"
          type="button"
          iconName="clipboard"
          onClick={() => copyToClipboard(code, "Code copied")}
        />
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  importAction: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  editor: {
    fontFamily: "monospace",
    backgroundColor: colors.grey10,
  },
});

export default LiveEditor;
