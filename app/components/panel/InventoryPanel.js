import { client, fontZY } from "@/app/page";
import { getRarityColor } from "@/app/utils";
import { Box, Button, Fade, Menu, MenuItem, Popper } from "@mui/material";
import React, { useEffect, useState } from "react";
import useRoom from "../hook/useRoom";
import Panel from "./Panel";

export default function InventoryPanel({ token }) {
  const [items, setItems] = useState();
  const [room, setRoom] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [anchorElPopper, setAnchorElPopper] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);

  useRoom(
    "inventory_panel_room",
    token,
    (state) => setItems([...state.items]),
    (r) => setRoom(r)
  );

  const openPopper = Boolean(anchorElPopper);
  const openMenu = Boolean(anchorElMenu);
  const idPopper = openPopper ? "simple-popper" : undefined;

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

  return (
    items && (
      <Panel hotkey="b">
        <div className="flex flex-col relative">
          {items &&
            items.map((item) => (
              <Button
                style={{ color: getRarityColor(item.rarity?.value) }}
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
              selectedItem.actions?.map(
                (action) =>
                  action.enabled && (
                    <MenuItem
                      onClick={() => {
                        setAnchorElMenu(null);
                        room.send("action", {
                          action: action.id,
                          index: items.indexOf(selectedItem),
                        });
                      }}
                    >
                      {action.label}
                    </MenuItem>
                  )
              )}
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
                    <span
                      className="font-bold mb-1"
                      style={{
                        color: getRarityColor(selectedItem?.rarity.value),
                      }}
                    >
                      {selectedItem?.name}
                    </span>
                    <div
                      className="flex mb-1"
                      style={{
                        color: getRarityColor(selectedItem?.rarity.value),
                      }}
                    >
                      <span className="mr-2">{selectedItem?.rarity.name}</span>
                      <span>{selectedItem?.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="mr-12">
                        物品等级 {selectedItem?.itemLevel}
                      </span>
                      <span>需求等级 {selectedItem?.reqLevel}</span>
                    </div>
                    {selectedItem?.customDesc &&
                      selectedItem?.customDesc.length > 0 && (
                        <div className="mt-2">
                          {selectedItem?.customDesc.map((d) => (
                            <p className="mt-1">{d}</p>
                          ))}
                        </div>
                      )}
                    {selectedItem?.basicAffixes &&
                      selectedItem?.basicAffixes.length > 0 && (
                        <div className="mt-2">
                          {selectedItem?.basicAffixes.map((basicAffix) => (
                            <p className="mt-1">{basicAffix}</p>
                          ))}
                        </div>
                      )}
                    {selectedItem?.magicAffixes &&
                      selectedItem?.magicAffixes.length > 0 && (
                        <div className="mt-2">
                          {selectedItem?.magicAffixes.map((magicAffix) => (
                            <p className="mt-1">{magicAffix}</p>
                          ))}
                        </div>
                      )}
                    <span className="mt-3">{selectedItem?.desc}</span>
                  </div>
                </Box>
              </Fade>
            )}
          </Popper>
        </div>
      </Panel>
    )
  );
}
