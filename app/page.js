"use client";

import localFont from "next/font/local";
import { useState } from "react";
import LoginComponent from "./components/LoginComponent";
import { Button } from "@mui/material";
import * as Colyseus from "colyseus.js";
import ResourceHUDComponent from "./components/ResourceHUDComponent";

export const fontZY = localFont({
  src: "./fonts/ZhunYuan.ttf",
  subsets: ["latin"],
  variable: "--font-zy",
});

export const client = new Colyseus.Client("ws://localhost:2567");
export let authRoom;

export default function Home() {
  const [_loggedIn, setLoggedIn] = useState(false);
  const [_token, setToken] = useState();

  const handleLoggedIn = async (_authRoom, token) => {
    setLoggedIn(true);

    authRoom = _authRoom;

    if (token !== _token) setToken(token);
  };

  const handleLogout = () => {
    authRoom.leave();
    setLoggedIn(false);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${fontZY.className}`}
    >
      {!_loggedIn ? (
        <LoginComponent onLoggedIn={handleLoggedIn} />
      ) : (
        <div className="flex flex-col">
          <ResourceHUDComponent token={_token} />
          <Button
            variant="contained"
            className={`mt-5`}
            style={{ backgroundColor: "#2196F3" }}
            onClick={handleLogout}
          >
            登出
          </Button>
        </div>
      )}
    </main>
  );
}
