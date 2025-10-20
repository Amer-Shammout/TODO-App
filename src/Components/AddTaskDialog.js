import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { v4 as uuidv4 } from "uuid";
import { useTodos } from "../contexts/TodosContext";

import {
  alpha,
  FormControl,
  FormHelperText,
  IconButton,
  InputBase,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { toast } from "react-toastify";

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 12,
    position: "relative",
    backgroundColor: "#f3f3f5",
    border: "1px solid",
    borderColor: "#E0E3E7",
    fontSize: 14,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),

    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },

    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
      borderColor: "#2D3843",
    }),
  },

  // ✅ تعديل صحيح للخطأ
  "&.MuiInputBase-root.Mui-error .MuiInputBase-input": {
    borderColor: theme.palette.error.main,
  },
}));

export default function AddAndEditTaskDialog({
  open,
  onClose,
  defaultValues = {},
  isEdit = false,
}) {
  const [errors, setErrors] = React.useState({
    title: false,
    subtitle: false,
  });

  const { id = 0, title = "", subtitle = "" } = defaultValues;

  const { addTodo, editTodo } = useTodos();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.title;
    const subtitle = formJson.subtitle;
    let newErrors = {
      title: !title,
      subtitle: !subtitle,
    };
    setErrors(newErrors);

    if (!newErrors.title && !newErrors.subtitle) {
      const newTodo = { id: uuidv4(), title, subtitle, isFinished: false };
      isEdit ? editTodo(id, title, subtitle) : addTodo(newTodo);

      toast.success(
        isEdit ? "تم تعديل المهمة بنجاح!" : "تم اضافة المهمة بنجاح!"
      );

      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setErrors({ subtitle: false, title: false });
        onClose();
      }}
      dir="rtl"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle fontWeight="700" fontSize="24px">
        {!isEdit ? "إضافة مهمة جديدة" : "تعديل مهمة"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          setErrors({ subtitle: false, title: false });
          onClose();
        }}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <form
          onSubmit={handleSubmit}
          id="add-note-form"
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          onChange={(event) => {
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const title = formJson.title;
            const subtitle = formJson.subtitle;
            let newErrors = {
              title: !title,
              subtitle: !subtitle,
            };
            setErrors(newErrors);
          }}
        >
          <FormControl
            variant="standard"
            fullWidth
            error={errors.title}
            sx={{
              "& .MuiFormLabel-root.Mui-error": {
                color: "inherit",
              },
            }}
          >
            <InputLabel shrink htmlFor="task-title">
              العنوان
            </InputLabel>
            <BootstrapInput
              placeholder="عنوان مناسب للمهمة"
              id="task-title"
              autoFocus
              required
              name="title"
              error={errors.title}
              defaultValue={title}
            />
            {errors.title && (
              <FormHelperText>الرجاء إدخال العنوان</FormHelperText>
            )}
          </FormControl>
          <FormControl
            variant="standard"
            fullWidth
            error={errors.subtitle}
            sx={{
              "& .MuiFormLabel-root.Mui-error": {
                color: "inherit",
              },
            }}
          >
            <InputLabel shrink htmlFor="task-subtitle">
              الوصف
            </InputLabel>
            <BootstrapInput
              placeholder="وصف المهمة"
              id="task-subtitle"
              autoFocus
              required
              name="subtitle"
              error={errors.subtitle}
              defaultValue={subtitle}
            />
            {errors.subtitle && (
              <FormHelperText>الرجاء إدخال الوصف</FormHelperText>
            )}
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions sx={{ gap: "12px" }}>
        <Button
          variant="outlined"
          onClick={() => {
            setErrors({ subtitle: false, title: false });
            onClose();
          }}
          fullWidth
          sx={{ borderRadius: "8px" }}
        >
          إلغاء
        </Button>
        <Button
          variant="contained"
          type="submit"
          form="add-note-form"
          fullWidth
          sx={{ borderRadius: "8px" }}
        >
          {!isEdit ? "إضافة مهمة" : "تعديل المهمة"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
