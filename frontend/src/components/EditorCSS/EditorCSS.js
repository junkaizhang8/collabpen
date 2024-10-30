import React, { useState, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { Box, Typography } from "@mui/material";
import { less } from "@codemirror/lang-less";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import { createDelta } from "@/lib/delta";

/* 
  Docs:
  https://www.npmjs.com/package/@uiw/react-codemirror
  https://www.npmjs.com/package/@codemirror/lang-less
*/
function EditorCSS({ value, setValue, setDelta }) {
  const onChange = useCallback(
    (val, viewUpdate) => {
      if (!viewUpdate) return;

      const { fromA, toA, fromB, toB } = viewUpdate.changedRanges[0];
      const delta = createDelta(val, fromA, toA, fromB, toB);
      setDelta(delta);
      setValue(val);
    },
    [setValue, setDelta]
  );

  return (
    <Box
      sx={{
        borderLeft: "1px solid",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1e1e1e",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "7px 15px",
          borderTop: "3px solid",
          borderColor: "#1572B6",
        }}
      >
        <Typography variant="label">CSS</Typography>
      </Box>

      <CodeMirror
        value={value}
        extensions={[less()]}
        theme={vscodeDark}
        onChange={onChange}
        height="35vh"
      />
    </Box>
  );
}

export default EditorCSS;
