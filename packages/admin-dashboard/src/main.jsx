import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@findjobs/shared-ui';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
)
