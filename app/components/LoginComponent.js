"use client";

import { useState } from "react";
import { MyTextField } from "./MyTextField";
import { Button } from "@mui/material";
import { client, fontZY } from "../page";

export default function LoginComponent({ onLoggedIn }) {
  const [_username, setUsername] = useState("admin");
  const [_password, setPassword] = useState("admin");

  const joinAuthRoom = async () => {
    try {
      const authRoom = await client.joinOrCreate("auth_room", {
        username: _username,
        password: _password,
      });

      authRoom.onMessage("token", (token) => {
        console.log("token received from server: " + token);
        onLoggedIn(authRoom, token);
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex flex-col">
      <MyTextField
        label="用户名"
        className={`mb-5`}
        defaultValue="admin"
        onChange={(evt) => setUsername(evt.target.value)}
      />
      <MyTextField
        label="密码"
        defaultValue="admin"
        onChange={(evt) => setPassword(evt.target.value)}
      />
      <Button
        variant="contained"
        className={`mt-5 ${fontZY.className}`}
        style={{ backgroundColor: "#2196F3" }}
        onClick={joinAuthRoom}
      >
        登录
      </Button>
    </div>
  );
}
