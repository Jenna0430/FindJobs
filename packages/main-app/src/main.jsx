import { createRoot } from 'react-dom/client'
import '@findjobs/shared-ui/src/index.css';
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@findjobs/shared-ui';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
)
