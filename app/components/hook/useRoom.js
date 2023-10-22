import { client } from "@/app/page";
import { useEffect, useState } from "react";

export default function useRoom(roomName, token, onStateChange, onJoinedRoom) {
  let unlisten;

  const [room, setRoom] = useState();

  useEffect(() => {
    room?.leave();

    joinRoom();

    return () => {
      console.log("leaving room: " + `${roomName}`);
      room?.leave?.();
      unlisten?.();
    };
  }, []);

  const joinRoom = async () => {
    try {
      console.log("joining room: " + `${roomName}`);

      const room = await client.joinOrCreate(`${roomName}_${token}`);

      console.log("joined room: " + `${roomName}`);
      onJoinedRoom?.(room);

      setRoom(room);

      unlisten = room.onMessage("error", ({ errCode, message }) => {
        alert(message);
      });

      room.onStateChange(state => {
        console.log("room received state: " + `${roomName}`);
        console.log(JSON.stringify(state));
        onStateChange(state);
      });
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
}
