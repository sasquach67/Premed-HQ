---
source: PrepCat content library
exported_at: 2026-07-12T05:25:59.382Z
item_number: 17
type: "GUIDE"
title: "Circuits & Electricity"
meta: "~28 min · 7 sections · cheat sheet"
---

Guide
Cheat sheet
CHEM & PHYS
~28 min read
# Circuits & Electricity

Circuits translate the abstract physics of charge and potential into concrete, calculable systems, and the MCAT tests them because they reward methodical reasoning and reappear in physiology (nerve conduction, membrane potentials, the heart as a circuit). You must fluently combine Ohm's law, series/parallel rules for resistors and capacitors, the power relationships, and Kirchhoff's two laws.

## ON THIS PAGE

## Charge, Current, and Voltage: The Three Quantities You Must Define First

## Ohm's Law and Resistance: The Master Equation

## Resistors in Series and Parallel

## Capacitors: Storing Charge and Energy

## Electric Power and Energy Dissipation

## Kirchhoff's Rules: Conservation Laws for Circuits

## Real Batteries, RC Circuits, and AC vs. DC

## KEY ESSENTIALS

Ohm's law V = IR is the master equation, apply it to a single resistor OR the whole circuit (V_total, R_total), but never mix scopes.
Series resistors ADD and share CURRENT; parallel resistors add as RECIPROCALS and share VOLTAGE, and capacitors follow the EXACT OPPOSITE pattern.
Power is P = IV = I²R = V²/R; whether raising R raises or lowers power depends on whether current or voltage is held fixed.
Kirchhoff: junction rule = charge conservation (ΣI_in = ΣI_out); loop rule = energy conservation (ΣV = 0 around a loop).
Q = CV and U = ½CV²; a dielectric multiplies capacitance by κ. Real batteries lose voltage internally: V_terminal = ε − Ir, dropping under load.
Adding a parallel path always LOWERS total resistance (below the smallest branch) and raises total current drawn.
Ammeters go in SERIES (low R); voltmeters go in PARALLEL (high R).

## Charge, Current, and Voltage: The Three Quantities You Must Define First

Every circuit problem is built from three quantities, and confusing them is the single most common source of error. Charge (Q), measured in coulombs (C), is the fundamental property carried by electrons and protons; one electron carries a charge of magnitude e = 1.6 × 10⁻¹⁹ C. Current (I), measured in amperes (A), is the RATE at which charge flows past a point: one ampere is one coulomb per second. Voltage (V), measured in volts (V), is the electric potential difference between two points, the 'push' that drives charge through the circuit. The crucial conceptual move is to recognize that current is a flow, voltage is a difference, and charge is the stuff that flows.

I = Q / t

I = current (amperes, A); Q = charge that passes a point (coulombs, C); t = time (seconds, s). One ampere = one coulomb per second.

Voltage is more subtle. It is energy per unit charge: one volt means one joule of energy is gained or lost per coulomb of charge moved between two points. Because voltage is always a DIFFERENCE between two points, asking 'what is the voltage here?' is meaningless without a reference point. This is why we speak of the voltage ACROSS a battery or ACROSS a resistor, it is always measured between two terminals.

V = Energy / Q = W / Q

V = potential difference (volts); W = work or energy transferred per charge moved (joules, J); Q = charge moved (coulombs). One volt = one joule per coulomb.

## TRAP

Conventional current flows from the + terminal to the − terminal of a battery through the external circuit (the direction a POSITIVE charge would move). Electrons actually drift the opposite way, from − to +. The MCAT uses conventional current. If a passage describes electron flow, mentally reverse the arrow, but solve all equations using conventional current.

### FIGURE: A SIMPLE COMPLETE CIRCUIT

A single loop showing a battery on the left with its long line (+ terminal) on top and short line (− terminal) on bottom, connected by wires to a single resistor on the right drawn as a zigzag. A curved arrow on the top wire points from the + terminal toward the resistor, labeled 'conventional current I'. The figure teaches that conventional current leaves the + terminal, travels through the external circuit, drops in potential across the resistor, and returns to the − terminal, a closed loop is required for any current to flow at all.

## KEY

A circuit must form a complete, closed loop for current to flow. An 'open' circuit (a break anywhere) carries zero current. A 'short circuit' is a near-zero-resistance path that bypasses the load and lets dangerously large current flow.

## Ohm's Law and Resistance: The Master Equation

Ohm's law is the equation you will use in nearly every circuit problem. For an ohmic component, the voltage across a resistor is proportional to the current through it, with resistance as the constant of proportionality. Resistance (R), measured in ohms (Ω), quantifies how strongly a component opposes the flow of charge.

V = I R

V = voltage across the resistor (volts); I = current through it (amperes); R = resistance (ohms, Ω). Memorize both rearrangements: I = V/R and R = V/I.

The power of Ohm's law is its dual application. You can apply it to a SINGLE resistor (using the voltage across and current through just that resistor) OR to an ENTIRE circuit (using the total voltage supplied by the source and the total/equivalent resistance). Knowing which scope you are working at is half the battle in multi-resistor problems. Whenever you write V = IR, the V, I, and R must all refer to the same element or the same whole circuit, never mix scopes.

Where does resistance come from? It depends on the material and the geometry of the conductor. A long thin wire resists more than a short fat one, just as a long narrow straw is harder to drink through than a short wide one. This is captured by the resistivity equation.

R = ρ L / A

R = resistance (Ω); ρ (rho) = resistivity, an intrinsic property of the material (Ω·m); L = length of the conductor (m); A = cross-sectional area (m²). Longer → more resistance; thicker → less resistance.

TIP

If a wire is stretched to twice its length while the volume of material stays constant, its cross-sectional area HALVES (volume = L×A is fixed). Resistance then increases by a factor of 4: doubling L (×2) and halving A (another ×2) compound to ×4. More generally, stretching to n times the length raises R by a factor of n². Watch for this geometric trap on test day.

Conductors vs. insulators vs. semiconductors

Type	Resistivity ρ	Examples	Behavior
Conductor	Very low	Copper, silver, gold	Charge flows easily; used for wires
Insulator	Very high	Rubber, glass, dry wood	Blocks charge flow; used for shielding
Semiconductor	Intermediate	Silicon, germanium	Conductivity changes with conditions; basis of electronics

WORKED EXAMPLE

A 12 V battery is connected across a 4 Ω resistor. What current flows, and what current would flow if the resistor were replaced with one of 6 Ω?

Apply Ohm's law, I = V/R. For the 4 Ω resistor: I = 12 V / 4 Ω = 3 A. For the 6 Ω resistor: I = 12 V / 6 Ω = 2 A. The takeaway: at fixed voltage, current and resistance are inversely related. Increasing resistance decreases current. This inverse relationship is one of the most frequently tested qualitative ideas, you should be able to predict the direction of change without plugging in numbers.

## Resistors in Series and Parallel

Real circuits contain multiple resistors, and the MCAT expects you to collapse them into a single equivalent resistance. There are exactly two basic arrangements, and you must know the rules cold, including the conceptual reasons behind them, because the reasoning is what gets tested in qualitative questions.

SERIES means the components are connected end-to-end in a single path, so the SAME current must pass through every one (charge has nowhere else to go). The source voltage divides among them in proportion to each resistance. The equivalent resistance is simply the sum.

R_series = R₁ + R₂ + R₃ + ...

Series resistances add directly. The equivalent is always LARGER than any individual resistor. The same current flows through all; the individual voltage drops add up to the source voltage.

PARALLEL means the components are connected across the same two nodes, providing multiple paths for current. Each branch experiences the SAME voltage (both ends are tied to the same two points), while the current splits among the branches. The reciprocals add.

1 / R_parallel = 1/R₁ + 1/R₂ + 1/R₃ + ...

For parallel resistors, the reciprocals of the resistances add to give the reciprocal of the equivalent. The result is always SMALLER than the smallest individual resistor. Same voltage across all; branch currents add to the total.

TIP

Two-resistor shortcut for parallel: R = (R₁ × R₂)/(R₁ + R₂), 'product over sum.' Also remember: two EQUAL parallel resistors give exactly half the value (e.g., two 10 Ω → 5 Ω), and N equal resistors in parallel give R/N. The product-over-sum rule works only for exactly two resistors at a time.

### FIGURE: SERIES VS. PARALLEL ARRANGEMENT

Left panel: a battery wired to two zigzag resistors R₁ and R₂ placed one after the other on a single wire loop, the SERIES configuration; an arrow shows one current path threading through both. Right panel: the same battery, but R₁ and R₂ are drawn as two separate vertical rungs side by side between a top wire and a bottom wire, the PARALLEL configuration; the current arrow splits at the top node into two branches and rejoins at the bottom. The figure teaches that series = one path (current shared), parallel = multiple paths (voltage shared).

Series vs. parallel: the four facts that matter

Property	Series	Parallel
Current	Same through all	Splits among branches
Voltage	Divides among components	Same across all
Equivalent R	Adds: larger than any one	Reciprocals add: smaller than any one
Add another resistor	Total R increases, total current drops	Total R decreases, total current rises

## TRAP

Students reflexively assume 'more resistors = more resistance.' True for series, FALSE for parallel. Adding a resistor in parallel opens a new path for current, LOWERING total resistance and RAISING the total current drawn from the source. This is exactly how household outlets work, plugging in more devices (each a parallel branch) draws more total current.

WORKED EXAMPLE

A 9 V battery is connected to a 2 Ω resistor in series with a parallel combination of a 6 Ω and a 3 Ω resistor. Find the total current from the battery and the voltage across the parallel section.

Step 1, collapse the parallel pair: 1/R_p = 1/6 + 1/3 = 1/6 + 2/6 = 3/6, so R_p = 2 Ω. (Sanity check: smaller than 3 Ω, as required for parallel.) Step 2, add the series resistor: R_total = 2 Ω + 2 Ω = 4 Ω. Step 3, total current from the battery via Ohm's law: I = V/R_total = 9 V / 4 Ω = 2.25 A. Step 4, voltage across the parallel section: this entire 2.25 A flows through the parallel block (R_p = 2 Ω), so V_parallel = I × R_p = 2.25 A × 2 Ω = 4.5 V. (Check: the series 2 Ω resistor drops 2.25 × 2 = 4.5 V, and 4.5 + 4.5 = 9 V, matching the battery. Good.)

## Capacitors: Storing Charge and Energy

A capacitor is a device that stores charge and electrical energy. In its simplest form it is two parallel conducting plates separated by a small gap. When connected to a battery, positive charge accumulates on one plate and an equal negative charge on the other, building up a voltage across the gap. Once the capacitor's voltage equals the source voltage, current stops, a fully charged capacitor in a steady DC circuit acts like an OPEN switch (a break in the wire).

Q = C V

Q = magnitude of charge stored on each plate (coulombs); C = capacitance (farads, F); V = voltage across the plates (volts). Capacitance measures how much charge a capacitor holds per volt applied.

Capacitance depends only on geometry and the insulating material between the plates, not on the charge stored or the voltage applied. Bigger plates and a smaller gap store more charge per volt.

C = κ ε₀ A / d

C = capacitance (F); κ (kappa) = dielectric constant of the insulating material (κ = 1 for vacuum, ≈ 1 for air); ε₀ = permittivity of free space (8.85 × 10⁻¹² F/m); A = plate area (m²); d = plate separation (m). Larger area or smaller gap → larger capacitance.

A DIELECTRIC is an insulating material (such as glass, paper, or plastic) inserted between the plates. Its molecules polarize in the field, setting up an opposing field that partially cancels the original, which lets the capacitor hold MORE charge at the same voltage. Inserting a dielectric multiplies capacitance by the dielectric constant κ (always > 1).

U = ½ C V² = ½ Q V = Q² / (2C)

U = energy stored in the capacitor (joules). Three equivalent forms (each follows by substituting Q = CV); use whichever pairs the quantities you know. The energy is stored in the electric field between the plates.

## TRAP

Capacitors combine the OPPOSITE way to resistors. Capacitors in PARALLEL ADD (C = C₁ + C₂ + ...), and capacitors in SERIES add as RECIPROCALS (1/C = 1/C₁ + 1/C₂ + ...). The MCAT loves to test whether you remember that the rules flip. Mnemonic: capacitance scales with plate area, so putting capacitors in parallel effectively adds area, they simply add.

Resistors vs. capacitors: combination rules flip

Arrangement	Resistors	Capacitors
Series	R = R₁ + R₂ (add directly)	1/C = 1/C₁ + 1/C₂ (reciprocals)
Parallel	1/R = 1/R₁ + 1/R₂ (reciprocals)	C = C₁ + C₂ (add directly)
Shared quantity in series	Current	Charge
Shared quantity in parallel	Voltage	Voltage

WORKED EXAMPLE

A 2 μF capacitor is charged by a 10 V battery. (a) How much charge does it store? (b) How much energy? (c) If a dielectric with κ = 3 is then inserted while the capacitor is still connected to the battery, what happens to the stored charge?

(a) Q = CV = (2 × 10⁻⁶ F)(10 V) = 2 × 10⁻⁵ C = 20 μC. (b) U = ½CV² = ½(2 × 10⁻⁶)(10)² = ½(2 × 10⁻⁶)(100) = 1 × 10⁻⁴ J = 0.1 mJ. (c) Inserting the dielectric triples the capacitance to C' = κC = 6 μF. Because the capacitor STAYS connected to the battery, V is held fixed at 10 V, so the new charge is Q' = C'V = (6 × 10⁻⁶)(10) = 60 μC, tripled. (Trap awareness: had the battery been DISCONNECTED first, Q would be held fixed instead and the voltage would drop to one-third, to about 3.3 V. Always ask: is voltage or charge held constant?)

## Electric Power and Energy Dissipation

Power is the rate at which electrical energy is converted into other forms, heat in a resistor, light in a bulb, mechanical work in a motor. It is measured in watts (W), where one watt is one joule per second. The MCAT tests power constantly because it links circuits to thermodynamics and physiology (metabolic energy, defibrillators, resistive heating).

P = I V

P = power (watts, W); I = current through the element (A); V = voltage across the element (V). This is the fundamental form: power equals current times the voltage drop.

By substituting Ohm's law (V = IR) into P = IV, you get two additional forms specialized for resistors. All three are interchangeable; pick the one built from the two quantities you already know.

P = I² R = V² / R

Two derived forms. Use P = I²R when you know current and resistance; use P = V²/R when you know voltage and resistance. Both describe heat dissipated in a resistor.

## TRAP

A classic trap: 'How does power change if I change R?' The answer depends on what is held constant. At fixed CURRENT (e.g., a resistor in series carrying a set current), P = I²R means power RISES with R. At fixed VOLTAGE (e.g., a resistor connected straight across a fixed source), P = V²/R means power FALLS as R rises. Picking P = I²R vs. V²/R wrongly flips your answer, identify what is held constant before reasoning.

Electrical energy consumed is power multiplied by time (E = Pt). Utility companies bill in kilowatt-hours (kWh), a unit of ENERGY, not power: one kWh is the energy used by a 1000 W device running for one hour = 1000 W × 3600 s = 3.6 × 10⁶ J.

WORKED EXAMPLE

A toaster draws 10 A when plugged into a 120 V outlet. What is its power, its resistance, and the energy it uses in 2 minutes?

Power: P = IV = (10 A)(120 V) = 1200 W. Resistance: from Ohm's law R = V/I = 120 V / 10 A = 12 Ω (or use P = V²/R → R = V²/P = 14400/1200 = 12 Ω, consistent). Energy in 2 minutes (120 s): E = Pt = 1200 W × 120 s = 1.44 × 10⁵ J = 144 kJ. Notice how the relationships interlock, once you have any two of V, I, R, P, you can recover the rest.

## Kirchhoff's Rules: Conservation Laws for Circuits

When a circuit is too tangled to reduce to simple series/parallel blocks, Kirchhoff's two rules let you solve it. They are nothing more than conservation laws, of charge and of energy, expressed in circuit language, and understanding them as conservation laws makes them intuitive rather than memorized.

The JUNCTION RULE (or node rule) is conservation of charge: at any junction where wires meet, the total current flowing IN equals the total current flowing OUT. Charge cannot pile up or vanish at a point.

Σ I_in = Σ I_out

At any node, the sum of currents entering equals the sum leaving. Equivalent to charge conservation. This is why current splits among parallel branches and recombines downstream.

The LOOP RULE is conservation of energy: around any closed loop, the sum of all voltage changes is zero. A charge that travels around a complete loop and returns to its start must have the same potential energy it began with, the gains (across batteries) exactly cancel the drops (across resistors).

Σ V_loop = 0

Going around any closed loop, the algebraic sum of EMF sources and resistor voltage drops is zero. Equivalent to energy conservation per unit charge.

TIP

Sign conventions for the loop rule: traversing a resistor IN the direction of the current gives a voltage change of −IR (a drop); traversing it against the current gives +IR. Across a battery, going from − to + is +EMF (a rise) regardless of current direction; going + to − is −EMF. Pick a loop direction, stay consistent, and let a negative answer tell you a current actually flows opposite to your assumed direction.

### FIGURE: A TWO-LOOP CIRCUIT ILLUSTRATING BOTH RULES

A circuit with two batteries and three resistors forming two adjacent rectangular loops that share a common middle branch. At the top junction, current I₁ enters from the left branch and I₂ enters from the right branch, while I₃ leaves downward through the middle branch; an annotation reads I₁ + I₂ = I₃ (junction rule). Each loop is marked with a circular arrow showing the chosen traversal direction, with +EMF labels at the batteries and −IR labels at the resistors summing to zero (loop rule). The figure teaches how the two rules together generate enough independent equations to solve for every unknown current.

## KEY

Strategy: you need as many independent equations as unknown currents. Write one junction equation per independent node and one loop equation per independent loop, then solve the system. On the MCAT, the algebra is usually light, the test rewards setting up the equations correctly more than heavy computation.

WORKED EXAMPLE

Two resistors, 4 Ω and 8 Ω, are in parallel across a 24 V battery. Use junction and loop reasoning to find the current in each branch and the total current from the battery.

Loop rule applied to each branch: both branches connect directly across the 24 V battery, so each sees the full 24 V (a loop containing only the battery and one resistor gives 24 − IR = 0). Branch 1: I₁ = V/R₁ = 24/4 = 6 A. Branch 2: I₂ = V/R₂ = 24/8 = 3 A. Junction rule at the node where the branches rejoin: total current I = I₁ + I₂ = 6 + 3 = 9 A. Verify with equivalent resistance: R_eq = (4×8)/(4+8) = 32/12 ≈ 2.67 Ω; I = V/R_eq = 24/2.67 ≈ 9 A. The two methods agree, and notice the SMALLER resistor (4 Ω) carries the LARGER current, current preferentially takes the path of least resistance.

## Real Batteries, RC Circuits, and AC vs. DC

A few additional topics round out what the MCAT tests. First, real batteries are not ideal. The EMF (electromotive force, symbol ε) is the maximum voltage a source can provide, the energy per unit charge it supplies. But every battery has a small INTERNAL RESISTANCE (r) arising from its chemistry. As current flows, some voltage is 'lost' inside the battery, so the voltage actually delivered to the external circuit, the TERMINAL VOLTAGE, is less than the EMF.

V_terminal = ε − I r

V_terminal = voltage available at the battery's terminals (V); ε = EMF, the ideal source voltage (V); I = current drawn (A); r = internal resistance (Ω). At zero current (open circuit), terminal voltage equals the EMF.

## KEY

Terminal voltage drops as more current is drawn. This is why a car's headlights dim when you crank the starter motor (a huge current draw causes a large Ir drop), and why an old battery (whose internal resistance has risen) can read a normal voltage at rest but sag badly under load.

Second, RC CIRCUITS combine a resistor and a capacitor. When charging, the capacitor does NOT charge instantly; the resistor limits the current, so voltage and charge build up exponentially toward their final values (and decay exponentially when discharging). The characteristic timescale is the time constant τ (tau).

τ = R C

τ = time constant (seconds); R = resistance (Ω); C = capacitance (F). After one time constant the capacitor reaches ~63% of its final charge (or falls to ~37% when discharging); after ~5τ it is essentially fully charged or discharged. Larger R or C means slower charging.

Third, current comes in two flavors. DIRECT CURRENT (DC), from batteries, flows steadily in one direction. ALTERNATING CURRENT (AC), from wall outlets, oscillates direction sinusoidally. Because AC voltage and current constantly vary, we describe them with ROOT-MEAN-SQUARE (rms) values, the effective steady value that delivers the same average power as the oscillating quantity. U.S. household AC is quoted as 120 V rms.

V_rms = V_peak / √2

V_rms = root-mean-square (effective) voltage; V_peak = maximum (amplitude) voltage. The same relation holds for current: I_rms = I_peak/√2. Average AC power uses rms values: P_avg = I_rms × V_rms.

TIP

Meter placement is high yield and easy points. An AMMETER measures current, so it must be placed in SERIES (the current must pass through it); it has very LOW resistance so it barely disturbs the circuit. A VOLTMETER measures potential difference, so it connects in PARALLEL across the element; it has very HIGH resistance so almost no current is diverted through it. Series-current, parallel-voltage, don't swap them.

WORKED EXAMPLE

A battery has an EMF of 12 V and an internal resistance of 0.5 Ω. It is connected to an external 5.5 Ω resistor. Find the current and the terminal voltage.

Treat the internal resistance as in series with the external resistor. Total resistance = r + R = 0.5 + 5.5 = 6 Ω. Current: I = ε/(r + R) = 12 V / 6 Ω = 2 A. Terminal voltage: V_terminal = ε − Ir = 12 − (2)(0.5) = 12 − 1 = 11 V. Equivalently, the terminal voltage equals the voltage across the external resistor: V = IR = (2)(5.5) = 11 V, consistent. The 1 V difference is 'lost' inside the battery and dissipated as heat in its internal resistance.
