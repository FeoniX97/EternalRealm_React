import { Button } from "@mui/material";

export default function MenuGUI() {
  return (
    <div className="flex items-center">
      <div>
        <Button variant="contained" className="mr-3" style={{ backgroundColor: "#2196F3" }}>
          角色 (C)
        </Button>
      </div>
      <div>
        <Button variant="contained" style={{ backgroundColor: "#2196F3" }}>
          背包 (B)
        </Button>
      </div>
    </div>
  );
}
