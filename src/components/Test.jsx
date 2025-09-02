import React, { useMemo, useState } from "react";
import useGameStore from "../store.js";

const bank = [
  {
    type: "mc",
    q: "NAND(1, 1) equals:",
    options: ["0", "1"],
    answer: 0,
    explain: "Only when both inputs are 1 does NAND output 0."
  },
  {
    type: "mc",
    q: "Which identity is correct?",
    options: ["NOT X = NAND(X, X)", "AND(A,B) = NAND(A,B)"],
    answer: 0,
    explain: "NOT is just NAND with tied inputs."
  },
  {
    type: "mc",
    q: "NAND is functionally complete. This means:",
    options: [
      "You can build any boolean function using only NANDs",
      "You need OR and NOT as well"
    ],
    answer: 0,
    explain: "NAND alone can express a complete basis."
  },
  {
    type: "mc",
    q: "NAND(0, 1) equals:",
    options: ["0", "1"],
    answer: 1,
    explain: "If any input is 0, AND is 0, so NAND = 1."
  },
  {
    type: "mc",
    q: "Fill in the blank: AND(A,B) = ______(NAND(A,B), NAND(A,B))",
    options: ["NAND", "OR", "XOR", "NOT"],
    answer: 0,
    explain: "NAND of the NAND gives NOT(NAND) which is AND."
  }
];

export default function Test({ onFinish }) {
  const [answers, setAnswers] = useState(Array(bank.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const addScore = useGameStore((s) => s.addScore);
  const addBadge = useGameStore((s) => s.addBadge);

  const score = useMemo(() => {
    return answers.reduce((acc, a, i) => acc + (a === bank[i].answer ? 1 : 0), 0);
  }, [answers]);

  const submit = () => {
    setSubmitted(true);
    addScore(score * 10);
    if (score === bank.length) addBadge("NAND Novice ✔");
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Test: Quick Knowledge Check</h2>
      </div>

      <ol className="quiz">
        {bank.map((q, i) => (
          <li key={i} className={`q ${submitted ? (answers[i] === q.answer ? "correct" : "wrong") : ""}`}>
            <p className="prompt">{q.q}</p>
            <div className="options">
              {q.options.map((opt, idx) => (
                <label key={idx} className={`opt ${answers[i] === idx ? "sel" : ""}`}>
                  <input
                    type="radio"
                    name={`q${i}`}
                    checked={answers[i] === idx}
                    onChange={() => setAnswers((arr) => {
                      const copy = [...arr]; copy[i] = idx; return copy;
                    })}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            {submitted && (
              <p className="explain">
                {answers[i] === q.answer ? "✅ Correct." : "❌ Not quite."} {q.explain}
              </p>
            )}
          </li>
        ))}
      </ol>

      {!submitted ? (
        <button onClick={submit} className="primary">Submit ({score}/{bank.length})</button>
      ) : (
        <div className="row">
          <div className="scorebox">Your score: <b>{score}</b> / {bank.length}</div>
          <button onClick={onFinish}>Continue to Gamify →</button>
        </div>
      )}
    </div>
  );
}
