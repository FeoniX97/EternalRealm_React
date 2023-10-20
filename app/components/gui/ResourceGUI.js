import { useState } from "react";
import useRoom from "../hook/useRoom";
import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

const ESBar = styled(LinearProgress)(({ theme }) => ({
 height: 10,
 borderRadius: 5,
 [`&.${linearProgressClasses.colorPrimary}`]: {
   backgroundColor:
     theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
 },
 [`& .${linearProgressClasses.bar}`]: {
   borderRadius: 5,
   backgroundColor: "#E91E63",
 },
}));

const LifeBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#F44336",
  },
}));

const ManaBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#2196F3",
  },
}));

export default function ResourceGUI({ token }) {
  const [state, setState] = useState();

  useRoom("resource_gui_panel_room", token, (_state) =>
    setState({ ..._state })
  );

  return (
    state && (
      <div className="flex flex-col flex-1 justify-end">
        <ESBar variant="determinate" value={50} />
        <LifeBar variant="determinate" value={50} />
        <ManaBar variant="determinate" value={50} />
      </div>
    )
  );
}
