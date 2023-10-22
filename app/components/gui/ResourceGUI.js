import { useState } from "react";
import useRoom from "../hook/useRoom";
import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

function ResourceBar({ label, min, max, color, height = 15 }) {
  const ProgressBar = styled(LinearProgress)(({ theme }) => ({
    height,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: color,
    },
  }));

  return (
    <div className="relative">
      <ProgressBar
        variant="determinate"
        value={(min / max) * 100}
        className="mb-1"
      />
      <span className="absolute" style={{ top: -4, left: 5 }}>
        {label}
      </span>
      <span className="absolute" style={{ top: -4, left: 50 }}>
        {min} / {max}
      </span>
    </div>
  );
}

export default function ResourceGUI({ token }) {
  const [resource, setResource] = useState();

  useRoom("resource_gui_room", token, (_state) =>
    setResource({ ..._state })
  );

  return (
    resource && (
      <div className="flex flex-col flex-1 mr-3">
        <ResourceBar
          label={"护盾"}
          min={resource.es.min}
          max={resource.es.max}
          color={"#E91E63"}
        />
        <ResourceBar
          label={"生命"}
          min={resource.life.min}
          max={resource.life.max}
          color={"#F44336"}
        />
        <ResourceBar
          label={"法力"}
          min={resource.mana?.min}
          max={resource.mana?.max}
          color={"#2196F3"}
        />
        <ResourceBar
          label={"经验"}
          min={resource.exp?.min}
          max={resource.exp?.max}
          color={"#FFEB3B"}
        />
      </div>
    )
  );
}
