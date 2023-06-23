import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./routes";
import { createTheme, ThemeProvider } from "@mui/material";

const App = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Assistant", "sans-serif"].join(","),
    },
    span: {
      fontFamily: ["Assistant", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
