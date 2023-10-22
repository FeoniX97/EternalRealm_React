import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";

export default function Panel({ hotkey, children }) {
  const [mousePos, setMousePos] = useState({});
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === hotkey) {
      setVisible((prev) => !prev);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isMouseDown) setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMouseDown]);

  return (
    <Paper
      elevation={5}
      className="absolute"
      style={{
        left: mousePos.x,
        top: mousePos.y,
        display: visible ? null : "none",
      }}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      <Box padding={5}>{children}</Box>
    </Paper>
  );
}
