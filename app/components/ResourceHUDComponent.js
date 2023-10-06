import { useEffect, useState } from "react";
import { client } from "../page";

export default function ResourceHUDComponent({ token }) {
  let room;

  const [lifeMin, setLifeMin] = useState(0);
  const [lifeMax, setLifeMax] = useState(0);

  useEffect(() => {
    if (!token) return;

    console.log("joining room with token: " + token);

    if (room) room.leave();

    joinRoom();

    return () => {
      room && room.leave();
    };
  }, [token]);

  const joinRoom = async () => {
    try {
      room = await client.joinOrCreate(`resourceHUD_room_${token}`, {
        token,
      });

      room.state.onChange(() => {
        console.log(room.state);
        setLifeMin(room.state.lifeMin);
        setLifeMax(room.state.lifeMax);
      });
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  return (
    <div>
      <span>Life: {lifeMin}/{lifeMax}</span>
      <span></span>
    </div>
  );
}
