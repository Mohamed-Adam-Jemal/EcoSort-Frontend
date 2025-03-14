import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AppWrapper } from "./components/common/PageMeta";


const container = document.getElementById("root");

// Ensure the container exists before rendering
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <AppWrapper>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AppWrapper>
    </React.StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found.");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
