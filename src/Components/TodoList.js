import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomToggle from "./CustomToggle";
import Todo from "./Todo";
import { useTodos } from "../contexts/TodosContext";
import AddAndEditTaskDialog from "./AddTaskDialog";
import EmptyTask from "./EmptyTask";

// Components

export default function TodoList() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const { filteredTodos, filter, isLoaded } = useTodos();

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
