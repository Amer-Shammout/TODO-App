import { CardActions, Checkbox, IconButton, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

//Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTodos } from "../contexts/TodosContext";
import { useState } from "react";
import CustomDeleteDialog from "./ConfirmDeleteDialog";
import AddAndEditTaskDialog from "./AddTaskDialog";

export default function Todo({ task }) {
  const { toggleTodo, deleteTodo } = useTodos();
  const { id, title, subtitle, isFinished } = task;
  const [isAlertOpen, setAlertIsOpen] = useState(false);
  const [isEditOpen, setEditIsOpen] = useState(false);

  return (
    <>
      <CustomDeleteDialog
        open={isAlertOpen}
        onClose={() => {
          setAlertIsOpen(false);
        }}
        handleDelete={() => deleteTodo(id)}
      />
      <AddAndEditTaskDialog
        open={isEditOpen}
        onClose={() => setEditIsOpen(false)}
        defaultValues={{ id, title, subtitle }}
        isEdit={true}
      />
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
            <Checkbox checked={isFinished} onChange={() => toggleTodo(id)} />
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
            onClick={() => setAlertIsOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => setEditIsOpen(true)}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
