import { CardActions, Checkbox, IconButton, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTodos } from "../contexts/TodosContext";

export default function Todo({ task, openDelete, openEdit }) {
  const { toggleTodo } = useTodos();
  const { id, title, subtitle, isFinished } = task;

  return (
    <>
      <Card
        className="todo"
        variant="elevation"
        sx={{
          width: "100%",
          borderRadius: "16px",
          border: "solid rgba(1,0,0,0.3) 1px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: isFinished ? "#ddf8de" : "secondary.main",
        }}
      >
        <CardContent sx={{ flex: 2, minWidth: 0 }}>
          <Stack direction="row" alignItems="start" minWidth={0}>
            <Checkbox
              checked={isFinished}
              onChange={() => {
                toggleTodo(id);
                if (!isFinished) {
                  const audio = new Audio("/sounds/success.wav");
                  audio.play().catch(() => {});
                }
              }}
            />
            <Stack direction="column" spacing={1} flex={1} minWidth={0}>
              <Typography
                variant="h5"
                noWrap
                color={!isFinished ? "primary" : "rgba(0,0,0,0.5)"}
                sx={{ textDecoration: isFinished ? "line-through" : null }}
              >
                {title}
              </Typography>
              <Typography
                variant="subtitle1"
                color={!isFinished ? "primary" : "rgba(0,0,0,0.5)"}
                sx={{
                  opacity: 0.7,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textDecoration: isFinished ? "line-through" : null,
                }}
              >
                {subtitle}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>

        <CardActions sx={{ flex: 1, justifyContent: "end" }}>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => openDelete(task)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => openEdit(task)}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
