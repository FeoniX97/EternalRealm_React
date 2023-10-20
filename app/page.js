"use client";

import localFont from "next/font/local";
import { useEffect, useState } from "react";
import LoginComponent from "./components/LoginComponent";
import { Button } from "@mui/material";
import * as Colyseus from "colyseus.js";
import CharacterPanel from "./components/panel/CharacterPanel";
import InventoryPanel from "./components/panel/InventoryPanel";
import ResourceGUI from "./components/gui/ResourceGUI";

export const fontZY = localFont({
  src: "./fonts/ZhunYuan.ttf",
  subsets: ["latin"],
  variable: "--font-zy",
});

export const client = new Colyseus.Client("ws://localhost:2567");
export let authRoom;

export default function Home() {
  const [_token, setToken] = useState();

  const handleLoggedIn = async (_authRoom, token) => {
    console.log("_authRoom: " + _authRoom);

    authRoom = _authRoom;

    if (token !== _token) setToken(token);
  };

  const handleLogout = async () => {
    console.log("leaving auth room");
    authRoom.leave();
    setToken(null);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center ${fontZY.className}`}
    >
      {!_token ? (
        <LoginComponent onLoggedIn={handleLoggedIn} />
      ) : (
        <div className="flex flex-col flex-1 w-1/2">
          {/* <div className="flex">
            {_token && (
              <div className="mr-24">
                <CharacterPanel token={_token} />
              </div>
            )}
            {_token && <InventoryPanel token={_token} />}
          </div> */}
          <ResourceGUI token={_token} />
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
