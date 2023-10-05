"use client";

import localFont from "next/font/local";
import { useState } from "react";
import LoginComponent from "./components/LoginComponent";
import { Button } from "@mui/material";

export const fontZY = localFont({
  src: "./fonts/ZhunYuan.ttf",
  subsets: ["latin"],
  variable: "--font-zy",
});

export default function Home() {
  const [_loggedIn, setLoggedIn] = useState(false);
  const [_authRoom, setAuthRoom] = useState();

  const handleLoggedIn = (authRoom) => {
    setAuthRoom(authRoom);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    _authRoom.leave();
    setLoggedIn(false);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${fontZY.className}`}
    >
      {!_loggedIn ? (
        <LoginComponent onLoggedIn={handleLoggedIn} />
      ) : (
        <Button
          variant="contained"
          className={`mt-5 ${fontZY.className}`}
          style={{ backgroundColor: "#2196F3" }}
          onClick={handleLogout}
        >
          Leave
        </Button>
      )}
    </main>
  );
}
