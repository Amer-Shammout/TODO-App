import TaskIcon from "@mui/icons-material/Task";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Typography } from "@mui/material";

export default function EmptyTask({ msg, filter }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        height: "100vh",
      }}
    >
      {filter === "all" ? (
        <AddTaskIcon sx={{ width: 64, height: 64, color: "rgba(0,0,0,0.7)" }} />
      ) : filter === "completed" ? (
        <TaskIcon sx={{ width: 64, height: 64, color: "rgba(0,0,0,0.7)" }} />
      ) : (
        <AssignmentIcon
          sx={{ width: 64, height: 64, color: "rgba(0,0,0,0.7)" }}
        />
      )}
      <Typography color="rgba(0,0,0,0.7)" textAlign={"center"}>
        {msg}
      </Typography>
    </div>
  );
}
