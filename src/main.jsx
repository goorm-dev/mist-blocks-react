import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './App.css'
import '@vapor-ui/core/styles.css'; 
import { createThemeConfig, ThemeProvider } from '@vapor-ui/core';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx'


export const themeConfig = createThemeConfig({
    appearance: 'dark',
    radius: 'none',
    scaling: 1,
    storageKey: 'my-vapor-theme'
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider config={themeConfig}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)