import React, { useEffect, useMemo, useState } from "react";
import useGameStore from "../store.js";
import NandMini from "./NandMini.jsx";

const randBit = () => Math.random() < 0.5 ? 0 : 1;

export default function Gamify() {
  const [targetA, setTargetA] = useState(randBit());
  const [targetB, setTargetB] = useState(randBit());
  const [time, setTime] = useState(30);
  const [streak, setStreak] = useState(0);
  const addScore = useGameStore((s) => s.addScore);
  const addBadge = useGameStore((s) => s.addBadge);

  const targetOut = useMemo(() => Number(!(targetA && targetB)), [targetA, targetB]);

  useEffect(() => {
    const t = setInterval(() => setTime((x) => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const onMatch = (secondsLeft) => {
    setStreak((s) => s + 1);
    const pts = 5 + secondsLeft; // time bonus
    addScore(pts);
    if (streak + 1 === 3) addBadge("3-Hit Streak");
    if (streak + 1 === 10) addBadge("NAND Ninja");
    // next target
    setTargetA(randBit());
    setTargetB(randBit());
  };

  const reset = () => { setTime(30); setStreak(0); };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Gamify: Speed Matching Challenge</h2>
        <div className="row">
          <div className="pill">⏱️ Time: <b>{time}s</b></div>
          <div className="pill">🔥 Streak: <b>{streak}</b></div>
          <button onClick={reset}>Reset Timer</button>
        </div>
      </div>

      <div className="card">
        <p>
          Goal: Set the inputs on the mini-gate to match the <b>target input pair</b>.  
          You score points for each correct match (bonus for speed).
        </p>
        <div className="targets">
          <div className="t">Target A: <b className={targetA ? "hi" : "lo"}>{targetA}</b></div>
          <div className="t">Target B: <b className={targetB ? "hi" : "lo"}>{targetB}</b></div>
          <div className="t">Target OUT: <b className={targetOut ? "hi" : "lo"}>{targetOut}</b></div>
        </div>
      </div>

      <NandMini onMatch={() => onMatch(time)} target={{ A: targetA, B: targetB }} disabled={time === 0} />
      <p className="muted">Tip: match as many as you can before the timer hits zero.</p>
    </div>
  );
}
