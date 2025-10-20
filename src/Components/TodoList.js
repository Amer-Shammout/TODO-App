import * as React from "react";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomToggle from "./CustomToggle";
import Todo from "./Todo";
import { useTodos } from "../contexts/TodosContext";
import AddAndEditTaskDialog from "./AddTaskDialog";
import EmptyTask from "./EmptyTask";

// Components

export default function TodoList() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const { filteredTodos, filter } = useTodos();

  console.log(filteredTodos);
  return (
    <Stack style={{ width: "100%", padding: "64px" }} spacing={4}>
      <AddAndEditTaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h4" fontWeight={700}>
          مهامي
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            "& .MuiButton-startIcon": { ml: "1px" },
            padding: "8px 16px",
          }}
          onClick={() => setOpenDialog(true)}
        >
          إضافة مهمة
        </Button>
      </Stack>

      <CustomToggle />
      {filteredTodos.length !== 0 ? (
        <Stack spacing={2}>
          {filteredTodos.map((task) => (
            <Todo key={task.id} task={task} />
          ))}
        </Stack>
      ) : (
        <EmptyTask
          msg={
            filter === "active"
              ? "لا يوجد مهمات غير منجزة، عمل رائع!"
              : filter === "completed"
              ? "لا يوجد مهام مكتملة، واصل العمل!"
              : "لا يوجد مهمات بعد، اضف مهمتكم الاولى للبدء!"
          }
        />
      )}
    </Stack>
  );
}
