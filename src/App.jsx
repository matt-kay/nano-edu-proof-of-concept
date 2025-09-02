import React, { useMemo, useState, useEffect, createContext, useContext } from "react";
import NandScene from "./components/NandScene.jsx";
import Teach from "./components/Teach.jsx";
import Test from "./components/Test.jsx";
import Gamify from "./components/Gamify.jsx";
import useGameStore from "./store.js";

const tabs = [
  { key: "interact", label: "NAND Gate (Interact)" },
  { key: "teach", label: "Teach" },
  { key: "test", label: "Test" },
  { key: "gamify", label: "Gamify" },
];

export default function App() {
  const [tab, setTab] = useState("interact");
  const score = useGameStore((s) => s.score);
  const badges = useGameStore((s) => s.badges);

  return (
    <div className="app">
      <header className="topbar">
        <h1>Design of an 8-bit CPU — NAND as the Primitive</h1>
        <div className="meter">
          <span>Score: <b>{score}</b></span>
          <span>Badges: {badges.length ? badges.join(" • ") : "—"}</span>
        </div>
      </header>

      <nav className="tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`tab ${tab === t.key ? "active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {tab === "interact" && <NandScene />}
        {tab === "teach" && <Teach goToTest={() => setTab("test")} />}
        {tab === "test" && <Test onFinish={() => setTab("gamify")} />}
        {tab === "gamify" && <Gamify />}
      </main>

      <footer className="footer">
        <small>
          Tip: press <kbd>A</kbd>/<kbd>B</kbd> to toggle inputs in 3D.  
          Colors — <span className="badge hi">HIGH=1</span>, <span className="badge lo">LOW=0</span>
        </small>
      </footer>
    </div>
  );
}
