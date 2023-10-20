import { client } from "@/app/page";
import { useEffect, useState } from "react";

export default function useRoom(roomName, token, onStateChange) {
  let unlisten;

  const [_token, setToken] = useState(token);
  const [room, setRoom] = useState();

  useEffect(() => {
    if (!token) return;

    room?.leave();

    joinRoom();

    return () => {
      console.log("leaving room: " + `${roomName}_${token}`);
      room?.leave?.();
      unlisten?.();
    };
  }, [_token]);

  const joinRoom = async () => {
    try {
      console.log("joining room: " + `${roomName}_${token}`);

      let room = await client.joinOrCreate(`${roomName}_${token}`, {
        token,
      });

      console.log("joined room: " + `${roomName}_${token}`);

      setRoom(room);

      unlisten = room.onMessage("error", ({ errCode, message }) => {
        alert(message);
      });

      room.state.onChange(() => {
        console.log("room received state: " + `${roomName}_${token}`);
        console.log(JSON.stringify(room.state));
        onStateChange(room.state);
      });
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
}
