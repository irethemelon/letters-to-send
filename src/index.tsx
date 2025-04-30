import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Title } from "./screens/Title/Title";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Title />
  </StrictMode>,
);
