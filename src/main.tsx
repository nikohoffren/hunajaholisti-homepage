import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './output.css';

const rootElement = document.getElementById("root");

if (rootElement) {
    (ReactDOM as any).createRoot(rootElement).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
} else {
    console.error("Unable to find the root element for your application.");
}
