import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppDataContextProvider } from "./contexts/app-data-context.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppDataContextProvider>
            <App />
        </AppDataContextProvider>
    </StrictMode>
);
