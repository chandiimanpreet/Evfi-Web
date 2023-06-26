import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./routes";

const App = () => {

  return (
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
  );
};

export default App;
