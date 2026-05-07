import ReactDOM from "react-dom/client";
import '@findjobs/shared-ui/src/index.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@findjobs/shared-ui';
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
