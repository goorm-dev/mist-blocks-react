import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@vapor-ui/core/styles.css'; 
import { createThemeConfig, ThemeProvider } from '@vapor-ui/core';


export const themeConfig = createThemeConfig({
    appearance: 'light',
    radius: 1,
    scaling: 1,
    storageKey: 'my-vapor-theme',
    primaryColor: '#ffc107', // hex code로 설정
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider config={themeConfig}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
