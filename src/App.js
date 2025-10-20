import { CacheProvider, ThemeProvider } from "@emotion/react";
import "./App.css";
import TodoList from "./Components/TodoList";
import { createTheme } from "@mui/material";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { TodosProvider } from "./contexts/TodosContext";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  typography: { fontFamily: "BC" },
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
    error: {
      main: "#e84868",
    },
  },
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <TodosProvider>
            <TodoList />
          </TodosProvider>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
