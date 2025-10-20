import TaskIcon from "@mui/icons-material/Task";
import { Typography } from "@mui/material";

export default function EmptyTask({ msg }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        height:"100vh"
      }}
    >
      <TaskIcon sx={{ width: 64, height: 64, color: "rgba(0,0,0,0.7)" }} />
      <Typography color="rgba(0,0,0,0.7)">{msg}</Typography>
    </div>
  );
}
