import { client, fontZY } from "@/app/page";
import { Box, Button, Fade, Menu, MenuItem, Popper } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function InventoryPanel({ token }) {
  let unlisten;

  const [_token, setToken] = useState(token);
  const [room, setRoom] = useState();
  const [items, setItems] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [anchorElPopper, setAnchorElPopper] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);

  const openPopper = Boolean(anchorElPopper);
  const openMenu = Boolean(anchorElMenu);
  const idPopper = openPopper ? "simple-popper" : undefined;

  useEffect(() => {
    if (!token) return;

    room?.leave();

    joinRoom();

    return () => {
      room?.leave?.();
      unlisten?.();
    };
  }, [_token]);

  const handleMouseClick = (event, item) => {
    setSelectedItem(item);
    setAnchorElMenu(anchorElMenu ? null : event.currentTarget);
  };

  const handleMouseEnter = (event, item) => {
    setSelectedItem(item);
    setAnchorElPopper(anchorElPopper ? null : event.currentTarget);
  };

  const handleMouseLeave = (event) => {
    setAnchorElPopper(null);
  };

  const joinRoom = async () => {
    try {
      let room = await client.joinOrCreate(`inventory_panel_room_${token}`, {
        token,
      });

      setRoom(room);

      unlisten = room.onMessage("error", ({ errCode, message }) => {
        alert(message);
      });

      room.state.onChange(() => {
        console.log(JSON.stringify(room.state));
        setItems([...room.state?.items]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col relative">
      {items &&
        items.map((item) => (
          <Button
            style={{ color: "white" }}
            onClick={(event) => handleMouseClick(event, item)}
            onMouseEnter={(event) => handleMouseEnter(event, item)}
            onMouseLeave={handleMouseLeave}
          >
            {item.name}
          </Button>
        ))}
      <Menu
        anchorEl={anchorElMenu}
        open={openMenu}
        onClose={() => setAnchorElMenu(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {selectedItem &&
          selectedItem.actions?.map((action) => (
            <MenuItem
              onClick={() => {
                setAnchorElMenu(null);
                room.send("action", { action: action.id, index: 0 });
              }}
            >
              {action.label}
            </MenuItem>
          ))}
      </Menu>
      <Popper
        id={idPopper}
        open={openPopper}
        anchorEl={anchorElPopper}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                border: 1,
                p: 1,
                bgcolor: "#212121",
                maxWidth: 250,
                borderRadius: 3,
              }}
            >
              <div className={`flex flex-col ${fontZY.className}`}>
                <span className="font-bold mb-1">{selectedItem?.name}</span>
                <div className="flex mb-1">
                  <span className="mr-2">{selectedItem?.rarity.name}</span>
                  <span>{selectedItem?.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="mr-12">
                    物品等级 {selectedItem?.itemLevel}
                  </span>
                  <span>需求等级 {selectedItem?.reqLevel}</span>
                </div>
                {selectedItem?.customDesc && (
                  <span className="mt-1">{selectedItem.customDesc}</span>
                )}
                <span className="mt-3">{selectedItem?.desc}</span>
              </div>
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
