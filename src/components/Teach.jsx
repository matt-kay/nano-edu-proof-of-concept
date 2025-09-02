import React from "react";
import TruthTable from "./TruthTable.jsx";

export default function Teach({ goToTest }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Teach: What is a NAND Gate?</h2>
      </div>

      <section className="card">
        <p>
          A NAND gate outputs <b>1</b> except when <b>both inputs are 1</b>.  
          Formally: <code>NAND(A, B) = ¬(A ∧ B)</code>.
        </p>
        <p>
          NAND is <i>functionally complete</i>: you can build any boolean function (NOT, AND, OR, XOR… even an entire CPU)
          using only NANDs. For example:
        </p>
        <ul>
          <li><b>NOT X</b> = NAND(X, X)</li>
          <li><b>AND(A,B)</b> = NOT(NAND(A,B)) = NAND(NAND(A,B), NAND(A,B))</li>
          <li><b>OR(A,B)</b> via De Morgan: OR = NOT(AND(NOT A, NOT B)) = NAND(NAND(A,A), NAND(B,B))</li>
        </ul>
      </section>

      <section className="card">
        <h3>Truth Table</h3>
        <TruthTable />
      </section>

      <section className="card">
        <h3>From gates to CPU</h3>
        <p>
          With NAND, we can build combinational blocks (half/full adders, multiplexers, ALU slices) and sequential blocks
          (latches, flip-flops, registers) — then compose into an 8-bit datapath with control logic. This app’s next sections
          test your understanding and add gamified practice.
        </p>
        <button onClick={goToTest}>Ready? Take a quick test →</button>
      </section>
    </div>
  );
}
