/*
  SITE CONTENT
  ------------
  This is the one file to edit when your information changes.

  To add an experience or project:
    1. Copy one of the entries below and change its fields.
       `slug` must be unique and match the detail page's filename.
    2. Copy entry-template.html into experience/ or projects/,
       rename it to <slug>.html, and fill in the write-up.
  The Experience and Projects pages update automatically.
*/

window.SITE = {
  name: "Audrey Horn",
  tagline: "Applied & Engineering Physics at Cornell.",
  email: "ah2426@cornell.edu",
  linkedin: "https://www.linkedin.com/in/audreywh/",
  github: "https://github.com/audreywh",
  resumePdf: "assets/Audrey-Horn-Resume.pdf",
  updated: "October 2026",

  education: {
    school: "Cornell University",
    location: "Ithaca, New York",
    degree: "Intended B.S. in Applied & Engineering Physics",
    dates: "Expected 2029",
    coursework: [
      "Digital Logic & Computer Organization", "Computer Science", "Electricity & Magnetism",
      "Experimental Physics", "Quantum Information Hardware", "Differential Equations",
      "Linear Algebra", "Waves & Oscillations", "Lasers & Photonics",
      "Multivariable Calculus", "Mechanics & Special Relativity"
    ]
  },

  skills: [
    { group: "Hardware & Photonics", items: "SolidWorks, ANSYS (FEA), oscilloscopes, circuit prototyping & troubleshooting, pulsed laser systems, soldering, electromechanical integration" },
    { group: "Digital & Embedded", items: "Verilog, Quartus Prime, FPGA synthesis & simulation, CMOS logic, ESP32, embedded C/C++" },
    { group: "Programming & Analysis", items: "Python (NumPy, SciPy, Pandas, Matplotlib, Astropy, Qiskit), Java, Git/GitHub, Linux" }
  ],

  // Categories appear on the Experience page in this order.
  categories: ["Research", "Engineering", "Teaching"],

  experience: [
    {
      slug: "qca",
      category: "Research",
      order: 1,
      title: "Cornell Quantum Computing Association",
      role: "Quantum Computing Researcher, Theory & Decoding Subteam",
      location: "Ithaca, New York",
      start: "Apr 2026", end: "Present",
      summary: "Quantum error-correction decoders and their FPGA implementations.",
      tools: ["Python", "Qiskit", "FPGA"],
      bullets: [
        "Study quantum error-correction decoders (belief propagation, MWPM/Blossom, Union-Find), including their complexity and suitability for fault-tolerant computing.",
        "Study qubit error models (bit-flip, phase-flip, decoherence) and their effect on syndrome measurement and decoding accuracy.",
        "Work with the hardware subteam on FPGA-based decoder implementations, evaluating latency, throughput, logic utilization, and real-time constraints on syndrome processing and feedback.",
        "Study superconducting qubit physics: transmon architecture, Josephson junction nonlinearity, energy-level structure, and relaxation and dephasing.",
        "Model single-qubit dynamics analytically and in simulation, including Rabi oscillations, Ramsey interferometry, rotating-frame dynamics, detuning, and dynamical decoupling (CPMG, XY4)."
      ]
    },
    {
      slug: "hyperloop",
      category: "Engineering",
      order: 2,
      title: "Cornell Hyperloop",
      role: "Magnetics Hardware Engineer",
      location: "Ithaca, New York",
      start: "Nov 2025", end: "Present",
      summary: "Coil-winding system and electromagnets for the pod's suspension.",
      tools: ["ESP32", "Embedded C/C++", "SolidWorks", "Ansys"],
      result: "5th place, Design division, European Hyperloop Week 2026",
      bullets: [
        "Designed, built, and debugged an ESP32-controlled coil-winding system using NEMA 17 steppers, DRV8825 drivers, and embedded C/C++ for repeatable electromagnet fabrication.",
        "Implemented configurable winding speed, turn count, direction, and wire traverse; debugged motor synchronization, wiring, and mechanical alignment.",
        "Designed and built electromagnet assemblies (ferromagnetic cores, wound coils, custom housings) for the pod's electromagnetic suspension system.",
        "Calculated coil geometry, winding configuration, current, magnetic flux, and air gap for the suspension electromagnets.",
        "Fabricated and assembled electromagnetic components for the linear induction motor and helped prepare it for testing.",
        "Designed electromechanical parts in SolidWorks and evaluated them with Ansys FEA for structural load, materials, tolerances, and manufacturability.",
        "Worked across magnetics and mechanical subteams on pod integration; team placed 5th in the Design-only division at European Hyperloop Week 2026."
      ]
    },
    {
      slug: "lasers-lab",
      category: "Teaching",
      order: 3,
      title: "Lasers & Photonics (AEP 1100)",
      role: "Laboratory Assistant",
      location: "Ithaca, New York",
      start: "Aug 2026", end: "Present",
      summary: "Supporting students building and operating pulsed nitrogen lasers.",
      tools: ["Oscilloscopes", "Photodiodes", "HV safety"],
      bullets: [
        "Support students building and operating pulsed nitrogen lasers, including the pulse generator, pulse amplifier, and laser chassis.",
        "Help students assemble and troubleshoot circuits and laser hardware.",
        "Guide students in measuring laser pulses with oscilloscopes and photodiodes and in analyzing results and experimental uncertainty.",
        "Enforce high-voltage and laser safety, supervise lab sessions, and give feedback on calculations, documentation, and assignments.",
        "Guide students through circuit analysis, electronic measurements, experimental troubleshooting, and laboratory calculations in discussions and office hours."
      ]
    },
    {
      slug: "astrophysics",
      category: "Research",
      order: 4,
      title: "Cornell Extreme Astrophysics Group",
      role: "Undergraduate Researcher · Nexus Scholar",
      location: "Ithaca, New York",
      start: "May 2026", end: "Present",
      summary: "A validated catalogue of fast radio bursts and their propagation.",
      tools: ["Python", "NumPy", "SciPy", "Pandas", "Astropy"],
      bullets: [
        "Evaluated 200+ FRB source datasets and curated a validated catalogue of 126 events with observational parameters, source references, and measurement uncertainties.",
        "Built Python pipelines for data ingestion, normalization, coordinate conversion, uncertainty propagation, and source traceability.",
        "Recomputed extragalactic dispersion measures using the NE2025 Galactic electron-density model to remove the Milky Way contribution.",
        "Produced scattering-DM and DM-redshift diagnostics to compare observed FRB properties with theoretical propagation predictions.",
        "Reproduced the host-galaxy analysis of Cordes, Ocker & Chatterjee (2022) in Python, combining the Macquart relation, IGM cosmic variance, and a cloudlet scattering model to constrain host DM and scattering time vs. host redshift for individual catalogue FRBs."
      ]
    }
  ],

  projects: [
    {
      slug: "n2-laser",
      order: 1,
      title: "Nitrogen Laser Pulse Amplifier",
      context: "Lasers and Photonics",
      dates: "",
      summary: "The SCR pulse stage that fires a hydrogen thyratron for a 337.1 nm laser.",
      tools: ["High-voltage electronics", "SCRs", "Oscilloscope"],
      result: "~10 ns lasing pulses",
      bullets: [
        "Built and tested the pulse amplifier for a 337.1 nm nitrogen laser, the middle of three cascaded subsystems (pulse generator → pulse amplifier → thyratron discharge chassis).",
        "The amplifier converts an 18 V, ~3 Hz 555-timer trigger into a ~1.6 kV fast-rise pulse that fires an EG&G HY-32 hydrogen thyratron, discharging a capacitor bank through the laser channel at 10–25 kV.",
        "Built the ~400 Vdc supply: a center-tapped full-wave rectifier off a 270 Vac secondary, with 40 µF and 0.01 µF / 1 kV filtering and a 1 MΩ bleeder.",
        "Wired the switching stage, where a 20 kΩ, 5 W resistor charges a 1.0 µF capacitor that an NTE5416 SCR discharges through a 1:4 pulse transformer, stepping ~400 V up to ~1.6 kV.",
        "Implemented the SCR turn-off network (0.47 µF capacitor, 1N914 diode string) and a ~100:1 divider for safe oscilloscope monitoring.",
        "Soldered the circuit on flea-clip boards separated by voltage domain, with single-point grounding and service-length wiring for repair access.",
        "Verified pulse amplitude and timing on the oscilloscope before integration; the finished laser was characterized for lasing threshold, ~10 ns pulse width, and output vs. N₂ pressure (5–65 torr)."
      ]
    },
    {
      slug: "fpga-display",
      order: 2,
      title: "5-Bit FPGA Numeric Display",
      context: "Digital Logic and Computer Organization",
      dates: "",
      summary: "Gate-level Verilog decoders, adders, and a calculator on a Cyclone V FPGA.",
      tools: ["Verilog", "Quartus Prime", "FPGA", "Verilator"],
      bullets: [
        "Implemented a gate-level Verilog display unit converting a 5-bit binary input (0–31) to two decimal digits on seven-segment displays, using binary-to-BCD and seven-segment decoders.",
        "Built unoptimized (sum-of-products) and Karnaugh-map-optimized decoders and compared their area and minimum critical-path delay after synthesis.",
        "Built an add/multiply calculator on top of the display (2-bit × 16-bit multiplication), hierarchically from full adders, ripple-carry and carry-select adders, 2:1 muxes, and a partial-product multiplier.",
        "Prototyped both designs on an Intel Cyclone V FPGA (DE0-CV) in Quartus Prime, with six seven-segment displays and a GPIO-driven overflow LED.",
        "Compared ripple-carry, carry-select, and RTL adders by tightening timing constraints in 1 ns steps to find each design's minimum critical-path delay, and traced the critical paths through individual gates.",
        "Verified designs with exhaustive, directed, random, and X-propagation testbenches (Icarus Verilog, Verilator), debugging with Surfer waveforms.",
        "Breadboarded a full adder and a 2-bit ripple-carry adder from 74-series ICs and measured gate delays on an oscilloscope."
      ]
    }
  ]
};
