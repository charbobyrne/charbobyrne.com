import { Link } from "react-router-dom";

const phases = [
  {
    number: "Phase 1",
    title: "Build the Datapath",
    description:
      "The first phase established the processor's computational core and verified that individual instructions moved through it correctly.",
    tasks: [
      "Connected a 16-register, 32-bit register file to the arithmetic logic unit and writeback path.",
      "Implemented arithmetic, Boolean, shift, rotate, and carry-aware operations in the ALU.",
      "Stored carry, overflow, negative, and zero condition codes in a dedicated status register.",
      "Created the initial finite-state controller for execute, memory, and writeback timing.",
      "Used a Verilog testbench and signal monitoring to validate register results and status flags."
    ]
  },
  {
    number: "Phase 2",
    title: "Add Instruction Fetch and Control Flow",
    description:
      "The second phase turned the datapath into a self-running processor capable of fetching a program and making conditional control-flow decisions.",
    tasks: [
      "Added a 16-bit program counter, 32-bit instruction memory, and instruction register.",
      "Expanded the controller into a fetch, decode, execute, memory, and writeback sequence.",
      "Built a branch-address unit supporting absolute and PC-relative targets.",
      "Implemented conditional branches using masks against the processor's status flags.",
      "Verified nested loops and taken/not-taken branch behavior against checkpoint testbenches and golden traces."
    ]
  },
  {
    number: "Phase 3",
    title: "Integrate Memory and Run Custom Algorithms",
    description:
      "The final phase completed the load/store path and used the finished processor to execute original programs encoded directly as 32-bit machine instructions.",
    tasks: [
      "Added 32-bit data memory and write-enable control for load and store instructions.",
      "Implemented absolute and base-plus-offset indexed addressing with new address and register-selection multiplexers.",
      "Extended the controller so memory reads and writes occur in the correct stage and loaded data returns through the writeback mux.",
      "Hand-encoded a bubble-sort program that compares adjacent signed values, swaps them in memory, and repeats until the list is ordered.",
      "Hand-encoded an unsigned 32-bit multiplication program using shift-and-add, carry propagation, and two memory words for the 64-bit result."
    ]
  }
];

export default function SiscProcessor() {
  return (
    <section style={{ paddingTop: 14 }}>
      <div className="kicker">Computer Architecture · Verilog HDL</div>
      <h1 style={{ fontSize: 42, margin: "12px 0 10px" }}>
        Custom 32-bit Processor
      </h1>
      <p className="sub">
        An educational multi-cycle CPU with a custom instruction set, designed
        and integrated in Verilog across three
        phases. The project grew from an arithmetic datapath into a complete
        stored-program computer with instruction fetch, conditional branching,
        data memory, and hand-encoded programs for sorting and multiplication.
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        <a className="btn" href="#phases">Explore the Phases</a>
        <a className="btn" href="#machine-code">View the Algorithms</a>
      </div>

      <div className="grid cols-2" style={{ marginTop: 22 }}>
        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Architecture</div>
          <h2 style={{ margin: "10px 0 0" }}>A Complete Multi-Cycle Datapath</h2>
          <ul className="caseStudyList">
            <li>32-bit instructions and data with a 16-bit, word-addressed memory space.</li>
            <li>Sixteen general-purpose registers connected through two read ports and one write port.</li>
            <li>A seven-state controller sequences reset, fetch, decode, execute, memory, and writeback activity.</li>
            <li>Condition flags support arithmetic decisions, loops, and absolute or relative branches.</li>
          </ul>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div className="kicker">Tools &amp; Methods</div>
          <h2 style={{ margin: "10px 0 0" }}>Designed for Verification</h2>
          <ul className="caseStudyList">
            <li>Verilog HDL and modular register-transfer-level design.</li>
            <li>ModelSim simulation with clocked testbenches and internal signal monitoring.</li>
            <li>Checkpoint tests for individual phases and full-program autograder tests.</li>
            <li>Golden execution traces used to compare registers, memory, flags, and control signals.</li>
          </ul>
        </div>
      </div>

      <div id="phases" style={{ marginTop: 24 }}>
        <div className="kicker">Development Process</div>
        <h2 style={{ margin: "10px 0 14px" }}>Phases and Tasks</h2>
        <div className="grid">
          {phases.map((phase) => (
            <article className="card" style={{ padding: 20 }} key={phase.number}>
              <div className="kicker">{phase.number}</div>
              <h3 style={{ fontSize: 22, margin: "8px 0" }}>{phase.title}</h3>
              <p className="artifactNote">{phase.description}</p>
              <ul className="caseStudyList">
                {phase.tasks.map((task) => <li key={task}>{task}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div id="machine-code" className="card" style={{ padding: 20, marginTop: 20 }}>
        <div className="kicker">Phase 3 Highlight</div>
        <h2 style={{ margin: "10px 0 0" }}>Programming the Processor in Machine Code</h2>
        <p className="artifactNote">
          The algorithm files are machine code: each hexadecimal value represents
          one 32-bit instruction in the processor's custom instruction set. Comments provide an
          assembly-like explanation, but the processor reads the encoded hexadecimal
          words directly from instruction memory. Writing these programs required
          managing registers, memory addresses, condition flags, branch offsets,
          and carry behavior by hand.
        </p>

        <div className="grid cols-2" style={{ marginTop: 16 }}>
          <div>
            <h3 style={{ margin: 0 }}>Bubble Sort</h3>
            <p className="artifactNote">
              An 18-instruction program loads the list length, walks adjacent
              elements with indexed loads, compares signed values, conditionally
              swaps them with indexed stores, and controls nested passes using
              absolute and relative branches. The supplied test data is transformed
              from [5, -2, 18, 10, 0, -7] to [-7, -2, 0, 5, 10, 18].
            </p>
          </div>
          <div>
            <h3 style={{ margin: 0 }}>64-bit Multiplication</h3>
            <p className="artifactNote">
              A 27-instruction shift-and-add routine multiplies two unsigned 32-bit
              values without a hardware multiply instruction. It inspects each bit
              of the multiplier, conditionally accumulates the shifted multiplicand,
              propagates carries into the high word, and stores the 64-bit product
              as two 32-bit memory words.
            </p>
          </div>
        </div>

        <div className="instructionFormat" aria-label="Custom 32-bit processor instruction format">
          <span><strong>31–28</strong> Opcode</span>
          <span><strong>27–24</strong> Mode / Function</span>
          <span><strong>23–20</strong> Destination</span>
          <span><strong>19–16</strong> Source A</span>
          <span><strong>15–0</strong> Source B / Immediate</span>
        </div>
      </div>

      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <div className="kicker">Engineering Outcome</div>
        <p className="artifactNote">
          The finished design connects hardware architecture and low-level
          software: every algorithmic operation can be traced from an encoded
          instruction, through control signals and datapath components, to a
          verified change in a register, status flag, program address, or memory word.
        </p>
      </div>

      <Link className="btn backLink" to="/projects/electrical">
        Back to Electrical Engineering projects
      </Link>
    </section>
  );
}
