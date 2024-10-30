import { useEffect, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { Box, Typography } from "@mui/material";
import { less } from "@codemirror/lang-less";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import { createDelta, resolveDelta } from "@/lib/delta";

/* 
  Docs:
  https://www.npmjs.com/package/@uiw/react-codemirror
  https://www.npmjs.com/package/@codemirror/lang-less
*/
export default function EditorCSS({ value, setValue, socket }) {
  useEffect(() => {
    if (!socket) return;

    socket.on("receive-delta-css", (delta) => {
      // Use previous value to resolve race conditions
      setValue((prev) => resolveDelta(prev, delta));
    });

    return () => {
      socket.off("receive-delta-css");
    };
  }, [socket, value]);

  const onChange = useCallback(
    (val, viewUpdate) => {
      if (!socket || !viewUpdate) return;

      const delta = createDelta(val, viewUpdate.changedRanges);
      if (delta) socket.emit("send-delta-css", delta);
      setValue(val);
    },
    [setValue, socket]
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
