import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTodos } from "../contexts/TodosContext";

const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: "#ececf0",
  borderRadius: "30px",
  padding: "8px",
  width: "100%",
  gap: 4,
  "& .MuiToggleButton-root": {
    border: "none",
    borderRadius: "30px",
    textTransform: "none",
    color: "#555",
    fontWeight: 500,
    flex: 1,
    padding: "10px 0",
    "&.Mui-selected": {
      backgroundColor: "#fff",
      color: "#000",
      fontWeight: 600,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
}));

export default function CustomToggle() {
  const { filter, setFilter, completedCount, activeCount } = useTodos();

  const handleChange = (event, newFilter) => {
    if (newFilter !== null) setFilter(newFilter);
  };

  return (
    <CustomToggleButtonGroup value={filter} exclusive onChange={handleChange}>
      <ToggleButton value="all">الكل</ToggleButton>
      <ToggleButton value="completed">المنجز ({completedCount})</ToggleButton>
      <ToggleButton value="active">غير المنجز ({activeCount})</ToggleButton>
    </CustomToggleButtonGroup>
  );
}
