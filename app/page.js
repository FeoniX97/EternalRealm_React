"use client";

import localFont from "next/font/local";
import { useEffect, useState } from "react";
import * as Colyseus from "colyseus.js";
import ResourceGUI from "./components/gui/ResourceGUI";
import MenuGUI from "./components/gui/MenuGUI";
import CharacterPanel from "./components/panel/CharacterPanel";
import InventoryPanel from "./components/panel/InventoryPanel";
import LoginComponent from "./components/LoginComponent";

export const fontZY = localFont({
  src: "./fonts/ZhunYuan.ttf",
  subsets: ["latin"],
  variable: "--font-zy",
});

export const client = new Colyseus.Client("ws://localhost:2567");
let authRoom;

export default function Home() {
  const [_token, setToken] = useState();

  const handleLoggedIn = async (token) => {
    setToken(token);
  };

  // const handleLogout = async () => {
  //   authRoom?.leave();
  //   setToken(null);
  // };

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center ${fontZY.className}`}
    >
      {!_token ? (
        <LoginComponent onLoggedIn={handleLoggedIn} />
      ) : (
        <>
          <div className="flex flex-col flex-1 w-1/2">
            <div class="flex flex-col flex-1 justify-end">
              <div className="flex">
                <ResourceGUI token={_token} />
                <MenuGUI />
              </div>
            </div>
          </div>
          {/* <CharacterPanel token={_token} />
          <InventoryPanel token={_token} /> */}
        </>
      )}
    </main>
  );
}
