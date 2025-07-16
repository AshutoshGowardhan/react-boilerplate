import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [backendMessage, setBackendMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkBackendConnection = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://13.233.118.239:8000/");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setBackendMessage(data.message || JSON.stringify(data));
      console.log("Backend connection successful:", data);
    } catch (err) {
      setError("Failed to connect to backend");
      setBackendMessage("");
      console.error("Backend connection failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button
          onClick={checkBackendConnection}
          disabled={loading}
          style={{ margin: "1rem" }}
        >
          {loading ? "Checking..." : "Check Backend Connection"}
        </button>
        {backendMessage && (
          <div style={{ color: "green", marginTop: "1rem" }}>
            Backend says: {backendMessage}
          </div>
        )}
        {error && (
          <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
