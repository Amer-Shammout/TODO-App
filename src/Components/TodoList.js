import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomToggle from "./CustomToggle";
import Todo from "./Todo";
import { useTodos } from "../contexts/TodosContext";
import AddAndEditTaskDialog from "./AddTaskDialog";
import EmptyTask from "./EmptyTask";
import CustomDeleteDialog from "./ConfirmDeleteDialog";
import { toast } from "react-toastify";

// Components

export default function TodoList() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [isAlertOpen, setAlertIsOpen] = React.useState(false);
  const [dialgoTodo, setDialogTodo] = React.useState({});

  const { filteredTodos, filter, isLoaded, deleteTodo } = useTodos();

  console.log(filteredTodos);
  return (
    <Stack
      sx={{
        width: "100%",
        px: { xs: 2, sm: 4, md: 8 },
        py: { xs: 2, sm: 4 },
      }}
      spacing={4}
    >
      <AddAndEditTaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
      <AddAndEditTaskDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        isEdit={true}
        defaultValues={dialgoTodo}
      />
      <CustomDeleteDialog
        open={isAlertOpen}
        onClose={() => {
          setAlertIsOpen(false);
        }}
        handleDelete={() => {
          deleteTodo(dialgoTodo.id);
          toast.success("تم حذف المهمة بنجاح!");
          setAlertIsOpen(false);
        }}
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
      {!isLoaded ? (
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : filteredTodos.length !== 0 ? (
        <Stack spacing={2}>
          {filteredTodos.map((task) => (
            <Todo
              key={task.id}
              task={task}
              openEdit={(todo) => {
                setDialogTodo(todo);
                setOpenEditDialog(true);
              }}
              openDelete={(todo) => {
                setDialogTodo(task);
                setAlertIsOpen(true);
              }}
            />
          ))}
        </Stack>
      ) : (
        <EmptyTask
          msg={
            filter === "active"
              ? "لا يوجد مهمات غير منجزة، عمل رائع!"
              : filter === "completed"
              ? "لا يوجد مهام مكتملة، واصل العمل!"
              : "لا يوجد مهمات بعد، اضف مهمتك الاولى للبدء!"
          }
          filter={filter}
        />
      )}
    </Stack>
  );
}
