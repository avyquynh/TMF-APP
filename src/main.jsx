import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import "./index.css";
const container = document.getElementById("app");

if (container) {
  createRoot(container).render(<App />);
} else {
  console.error("Root element with ID 'app' not found in the DOM.");
}
