import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = createRoot(document.getElementById('root')!);

// Debug Info for the user
console.log("%c INVESTMENT MANAGEMENT SYSTEM ", "background: #c9ff3d; color: #000; font-weight: bold; padding: 4px;");
const hasKey = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "undefined" && process.env.GEMINI_API_KEY !== "");
console.log(`AI Engine Status: ${hasKey ? "READY" : "WAITING FOR API KEY"}`);
if (!hasKey) {
  console.warn("DICA VERCEL: Se você já adicionou a GEMINI_API_KEY, certifique-se de fazer um NOVO DEPLOY (Redeploy) na aba 'Deployments' para que a chave seja aplicada.");
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
