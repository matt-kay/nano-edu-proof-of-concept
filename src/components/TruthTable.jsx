import React from "react";

const rows = [
  { A: 0, B: 0, OUT: 1 },
  { A: 0, B: 1, OUT: 1 },
  { A: 1, B: 0, OUT: 1 },
  { A: 1, B: 1, OUT: 0 },
];

export default function TruthTable() {
  return (
    <table className="truth">
      <thead>
        <tr>
          <th>A</th><th>B</th><th>NAND(A,B)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td className={r.A ? "hi" : "lo"}>{r.A}</td>
            <td className={r.B ? "hi" : "lo"}>{r.B}</td>
            <td className={r.OUT ? "hi" : "lo"}>{r.OUT}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
