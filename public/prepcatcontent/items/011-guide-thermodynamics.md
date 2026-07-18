---
source: PrepCat content library
exported_at: 2026-07-12T05:25:46.114Z
item_number: 11
type: "GUIDE"
title: "Thermodynamics"
meta: "~28 min · 7 sections · cheat sheet"
---

Guide
Cheat sheet
CHEM & PHYS
~28 min read
# Thermodynamics

Thermodynamics is the study of energy, heat, and the direction in which processes spontaneously proceed. The MCAT tests it constantly because it ties together chemistry, physics, and biochemistry, predicting whether reactions happen, how cells power unfavorable processes, and how to compute energies from tabulated data.

## ON THIS PAGE

## Systems, Surroundings, and State Functions

## The First Law, Internal Energy, and Enthalpy

## Calorimetry: Measuring Heat

## Hess's Law, Formation Enthalpies, and Bond Energies

## Entropy and the Second & Third Laws

## Gibbs Free Energy and Spontaneity

## Free Energy, Equilibrium, and Biological Coupling

## KEY ESSENTIALS

ΔG = ΔH − TΔS: spontaneous when ΔG < 0, equilibrium when ΔG = 0, nonspontaneous when ΔG > 0. T must be in kelvin, and ΔH (kJ) and ΔS (J/K) must be converted to matching units.
Spontaneity grid: ΔH−/ΔS+ always spontaneous; ΔH+/ΔS− never; the mixed cases flip with temperature at the crossover T = ΔH/ΔS (ΔH−/ΔS− favored at low T, ΔH+/ΔS+ favored at high T).
Sign conventions: exothermic = ΔH < 0; endothermic = ΔH > 0. ΔS > 0 when disorder/microstates increase (solid→gas, more moles of gas, dissolving, higher T).
ΔG° = −RT ln K links free energy to equilibrium: K > 1 ⇒ ΔG° < 0; K < 1 ⇒ ΔG° > 0. At non-standard conditions, ΔG = ΔG° + RT ln Q gives the current direction.
State functions (U, H, S, G, T, P, V) depend only on initial and final states; q and w are path functions. Hess's law works because ΔH is a state function, and coupled-reaction ΔG° values simply add.
Spontaneous ≠ fast: thermodynamics is not kinetics. A catalyst lowers activation energy and speeds both directions but never changes ΔG, ΔH, ΔS, or K.

## Systems, Surroundings, and State Functions

Thermodynamics divides the universe into the system (the part you're studying, the reaction in a beaker) and the surroundings (everything else, the beaker, the water bath, the room). Energy flows between them as heat (q) or work (w). Systems are classified by what they can exchange: an open system trades both matter and energy (an open beaker), a closed system trades energy but not matter (a sealed flask), and an isolated system trades neither (an idealized thermos). The MCAT likes testing whether a given scenario is open, closed, or isolated, because that controls what is allowed to change.

The single most important conceptual distinction in the whole topic is state functions versus path functions. A state function depends ONLY on the current state of the system, its temperature, pressure, volume, and composition, not on how the system got there. If you climb a mountain, your altitude (a state function) is the same whether you took the steep trail or the gentle switchbacks; the distance you walked (a path function) is not. In thermodynamics, internal energy (U), enthalpy (H), entropy (S), Gibbs free energy (G), plus T, P, and V are all state functions. Heat (q) and work (w) are path functions, the same change in state can be reached with different amounts of heat and work.

State functions vs. path functions

State functions (path-independent)	Path functions (path-dependent)
Internal energy, U	Heat, q
Enthalpy, H (and ΔH)	Work, w
Entropy, S (and ΔS)	·
Gibbs free energy, G (and ΔG)	·
Temperature, Pressure, Volume	·

TIP

Quick test for a state function: ask whether you can compute its change from just the start and end states (a table of values). ΔU, ΔH, ΔS, and ΔG all qualify, you look them up and subtract. Heat (q) and work (w) cannot be found from endpoints alone; they depend on the path taken, so they are never state functions.

## KEY

Hess's law (covered later) is a direct consequence of enthalpy being a state function: because ΔH depends only on the start and end, you can add reaction steps in any combination and the overall ΔH is just the sum.

## The First Law, Internal Energy, and Enthalpy

The first law of thermodynamics is conservation of energy: energy cannot be created or destroyed, only transferred or converted. For a system, the change in internal energy equals heat added to the system plus work done on the system. Internal energy (U) is the total kinetic and potential energy of all the particles in the system. The first law tells you that if you put heat into a gas, that energy either raises the internal energy (hotter, faster particles) or leaves as work (the gas pushing a piston outward), the books always balance.

ΔU = q + w

ΔU = change in internal energy; q = heat added TO the system (positive when the system absorbs heat); w = work done ON the system (positive when the surroundings compress the system). At constant pressure the expansion work done BY the gas is PΔV, so the work done ON the system is w = −PΔV; an expanding gas (ΔV > 0) therefore has w < 0.

## TRAP

Sign-convention trap: the MCAT uses the chemistry convention ΔU = q + w, where w is work done ON the system. Many physics texts write ΔU = q − w, where w is work done BY the system. They're equivalent, but mixing them flips a sign. Anchor yourself on the physics: when a gas EXPANDS, it pushes on the surroundings and the system LOSES energy as work, so w (on the system) is negative under the chem convention.

Most chemistry and biochemistry happen at constant pressure (open to the atmosphere), and at constant pressure some energy always goes into pushing the atmosphere out of the way (PΔV work). To track the heat exchanged at constant pressure without constantly bookkeeping that work, chemists define enthalpy: H = U + PV. The change in enthalpy at constant pressure, ΔH, equals exactly the heat exchanged, q_p. This is why ΔH is the workhorse quantity for reaction energetics, it IS the heat of reaction at constant pressure.

ΔH = q_p (at constant pressure); ΔH = ΔU + PΔV

ΔH = enthalpy change; q_p = heat exchanged at constant pressure. The PΔV term is the expansion work; for reactions with no change in moles of gas, or that occur entirely in condensed phases, PΔV is small and ΔH ≈ ΔU.

The sign of ΔH tells you the heat direction. Exothermic reactions release heat to the surroundings (the surroundings warm up) and have ΔH < 0; the products sit at lower enthalpy than the reactants. Endothermic reactions absorb heat (the surroundings cool down, think of an instant cold pack) and have ΔH > 0. Bond breaking is endothermic (costs energy) and bond forming is exothermic (releases energy); whether a whole reaction is exo- or endothermic depends on the balance of bonds broken versus bonds formed.

### FIGURE: REACTION ENTHALPY DIAGRAM

An energy-vs-reaction-coordinate diagram. The y-axis is enthalpy and the x-axis is reaction progress. For an exothermic reaction the reactants start high on the left and the products end LOWER on the right, with the vertical gap between the two levels equal to ΔH (negative). A hump in between, the activation-energy peak, represents the transition state; this peak is a KINETIC feature and does NOT affect ΔH, which depends only on the reactant and product enthalpy levels. For an endothermic reaction the products end HIGHER than the reactants, so ΔH is positive.

## Calorimetry: Measuring Heat

Calorimetry is how heat is measured experimentally, and the MCAT expects you to run the numbers. The core equation relates heat to a temperature change through the substance's heat capacity. Specific heat (c) is the heat needed to raise one gram of a substance by one degree; water's is famously high at about 4.18 J/(g·°C), which is why water resists temperature change and why it's the standard calorimeter fluid.

q = m·c·ΔT

q = heat; m = mass; c = specific heat capacity; ΔT = T_final − T_initial. If ΔT > 0 the substance absorbed heat (q > 0). Use the molar heat capacity C with moles instead of mass if data are given per mole. Note: a 1 °C interval equals a 1 K interval, so c values in J/(g·°C) and J/(g·K) are numerically identical.

A constant-pressure (coffee-cup) calorimeter is open to the atmosphere, so it measures q_p = ΔH directly. A bomb calorimeter is rigid (constant volume), so no PΔV work is done and it measures q_v = ΔU, not ΔH, a classic MCAT distinction. During a phase change, heat is absorbed or released at constant temperature, so q = mcΔT does NOT apply; instead you use q = m·(latent heat of fusion or vaporization). The temperature plateaus on a heating curve during melting and boiling because the energy goes into breaking intermolecular forces rather than raising kinetic energy (temperature).

WORKED EXAMPLE

A 50.0 g sample of metal at 100.0 °C is dropped into 100.0 g of water at 22.0 °C in an insulated cup. The final temperature is 26.0 °C. What is the specific heat of the metal? (c_water = 4.18 J/(g·°C))

Conservation of energy: because the cup is insulated, the heat lost by the metal equals the heat gained by the water, and the two heats sum to zero (q_metal + q_water = 0).

Heat gained by water: q_water = m·c·ΔT = (100.0 g)(4.18 J/(g·°C))(26.0 − 22.0 °C) = (100.0)(4.18)(4.0) = +1672 J.

The metal cooled from 100.0 °C to 26.0 °C, so its ΔT = 26.0 − 100.0 = −74.0 °C, and it must have lost 1672 J (q_metal = −1672 J):
q_metal = m·c·ΔT ⇒ −1672 J = (50.0 g)(c)(−74.0 °C).

Solve: c = −1672 / (50.0 × −74.0) = 1672 / 3700 ≈ 0.45 J/(g·°C).

The answer being well below water's 4.18 makes sense, metals heat up and cool down easily (low specific heat), which is why a metal spoon left in hot soup gets hot fast.

## TRAP

Watch the ΔT sign and the energy balance. ΔT is always final minus initial, so the hot object's ΔT is negative (its q is negative) and the cold object's ΔT is positive (its q is positive); in an insulated calorimeter the two heats sum to zero (q_hot + q_cold = 0). A common error is dropping the negative sign on the hot object's ΔT or setting the two heats equal without accounting for the opposite signs.

## Hess's Law, Formation Enthalpies, and Bond Energies

Because enthalpy is a state function, the ΔH of an overall reaction is the same no matter what route you take to get there. Hess's law exploits this: if you can write a target reaction as the sum of reactions whose ΔH values you know, the target's ΔH is just the sum of those values. The rules: (1) if you reverse a reaction, flip the sign of ΔH; (2) if you multiply a reaction by a coefficient, multiply its ΔH by the same factor; (3) add up the manipulated equations so that intermediates cancel.

The most efficient route on the MCAT is usually standard enthalpies of formation (ΔH°_f), the enthalpy change to form one mole of a compound from its constituent elements in their standard states. By definition, ΔH°_f of any element in its standard state (O₂ gas, C as graphite, Na as solid metal) is ZERO, a fact the MCAT tests directly. From a table of formation values you compute any reaction's enthalpy with the products-minus-reactants formula.

ΔH°_rxn = Σ n·ΔH°_f(products) − Σ n·ΔH°_f(reactants)

n = stoichiometric coefficients. 'Products minus reactants,' each term weighted by its coefficient. Remember to set elements in their standard state to ΔH°_f = 0.

A third route uses bond enthalpies (the average energy to break one mole of a given bond in the gas phase). Because breaking bonds costs energy (endothermic, +) and forming bonds releases it (exothermic, −), the reaction enthalpy is the energy of bonds broken minus the energy of bonds formed. Note this is the OPPOSITE arrangement from the formation formula, a frequent point of confusion. Bond-enthalpy estimates are only approximate because they use averages over many different molecules.

ΔH°_rxn ≈ Σ (bond energies of bonds broken) − Σ (bond energies of bonds formed)

Both sums use positive bond-dissociation energies. Bonds broken are the reactant bonds (energy in); bonds formed are the product bonds (energy out). This is 'broken minus formed', the reverse of the 'products minus reactants' formation formula, so do not mix the two up.

WORKED EXAMPLE

Given: (1) C(graphite) + O₂(g) → CO₂(g), ΔH = −394 kJ/mol; (2) H₂(g) + ½O₂(g) → H₂O(l), ΔH = −286 kJ/mol; (3) CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −891 kJ/mol. Find ΔH for the formation of methane: C(graphite) + 2H₂(g) → CH₄(g).

We want C + 2H₂ → CH₄. Build it from the three known reactions using Hess's law.

Keep reaction (1) as-is, it puts C and O₂ on the left producing CO₂: ΔH = −394.

Use reaction (2) twice (we need 2 H₂): 2×(2) gives 2H₂ + O₂ → 2H₂O, ΔH = 2(−286) = −572.

Reverse reaction (3) so that CH₄ ends up as a product: CO₂ + 2H₂O → CH₄ + 2O₂, ΔH = +891.

Add the three manipulated equations:
Left side: C + O₂ + 2H₂ + O₂ + CO₂ + 2H₂O
Right side: CO₂ + 2H₂O + CH₄ + 2O₂
Cancel CO₂, 2H₂O, and 2O₂ (the two O₂ on the left cancel the 2O₂ on the right) → C + 2H₂ → CH₄. ✓

Sum the enthalpies: −394 + (−572) + 891 = −75 kJ/mol.

So ΔH°_f(CH₄) ≈ −75 kJ/mol. The negative value means forming methane from its elements releases heat (it is exothermic).

TIP

Target-first strategy: look at where each species needs to end up in the final equation. If a compound must be a product but appears as a reactant in your known equation, reverse that equation (flip ΔH's sign). If you need 2 moles of something, double that equation (double its ΔH). Then simply add the equations and their ΔH values, letting intermediates cancel.

## Entropy and the Second & Third Laws

Entropy (S) measures the number of microscopic arrangements (microstates) consistent with a system's macroscopic state, loosely, its 'disorder,' or more precisely the dispersal of energy and matter. The more ways particles and their energy can be arranged, the higher the entropy. The second law of thermodynamics states that the total entropy of the universe (system + surroundings) always increases for any spontaneous process: ΔS_universe > 0. This is what gives time a direction and tells us which way processes naturally run.

ΔS_universe = ΔS_system + ΔS_surroundings > 0 (spontaneous)

The universe's entropy must increase overall for a spontaneous process. A system's entropy CAN decrease (e.g., water freezing) as long as the surroundings gain more entropy than the system loses.

You must be able to predict the SIGN of ΔS by inspection, a guaranteed MCAT skill. Entropy increases when: a solid melts or a liquid vaporizes (S of solid < liquid << gas), a gas expands into a larger volume, the number of moles of gas increases over the course of a reaction, a solid dissolves into ions, or temperature rises. Moles of gas dominate: if a reaction produces more moles of gas than it consumes, ΔS is almost certainly positive. Conversely, going from gas to liquid, or from many small molecules to one large one, decreases entropy.

Predicting the sign of ΔS

Process	ΔS sign	Why
Solid → liquid → gas (melting, boiling, sublimation)	+	More freedom of motion, more microstates
Gas expands (larger volume / lower pressure)	+	More positional microstates
Reaction increases moles of gas	+	Gas dominates entropy bookkeeping
Dissolving a solid into ions	+ (usually)	Particles disperse in solution
Reaction decreases moles of gas	−	Fewer gas-phase microstates
Gas → liquid → solid (condensing, freezing)	−	Particles become more ordered
Increasing temperature	+	Greater energy dispersal among microstates

The third law of thermodynamics gives entropy an absolute zero point: a perfect crystalline solid at absolute zero (0 K) has exactly zero entropy, because there is only one possible arrangement (one microstate). This is why, unlike enthalpy (where we only ever measure changes from arbitrary reference states), we can tabulate ABSOLUTE standard entropies S° for substances. A consequence is that elements do NOT have zero standard entropy, only their formation enthalpy is defined as zero, not their entropy. You compute reaction entropy the same products-minus-reactants way: ΔS°_rxn = Σ nS°(products) − Σ nS°(reactants).

## TRAP

Elements have ΔH°_f = 0 but NONZERO S°. Don't carry the 'elements are zero' rule over from enthalpy to entropy. Only a perfect crystal at 0 K has S = 0; real elements at 298 K have positive absolute entropies you must include in any ΔS° calculation.

## Gibbs Free Energy and Spontaneity

Tracking the entropy of the entire universe is awkward, so Gibbs free energy repackages it into a system-only quantity. G = H − TS, and at constant temperature and pressure, ΔG = ΔH − TΔS. The power of ΔG is that its sign directly predicts spontaneity using only system properties: ΔG < 0 means the process is spontaneous (thermodynamically favorable) and can proceed in the forward direction; ΔG > 0 means it's nonspontaneous (favorable in the reverse direction); ΔG = 0 means the system is at equilibrium. Physically, −ΔG is the maximum non-PV (useful) work a process can deliver.

ΔG = ΔH − TΔS

ΔG = Gibbs free energy change; ΔH = enthalpy change; T = absolute temperature in KELVIN (always); ΔS = entropy change. Watch units, ΔH is usually in kJ while ΔS is usually in J/K, so convert one before multiplying.

The interplay of the two driving forces, enthalpy (favoring release of heat, ΔH < 0) and entropy (favoring increased disorder, ΔS > 0), together with the temperature weighting on the entropy term produces four cases. When both favor the reaction (ΔH < 0, ΔS > 0), ΔG is negative at all temperatures: always spontaneous. When both oppose it (ΔH > 0, ΔS < 0), ΔG is positive at all temperatures: never spontaneous. The two mixed cases are temperature-dependent, and that's where the MCAT concentrates its questions.

Spontaneity from the signs of ΔH and ΔS

ΔH	ΔS	ΔG = ΔH − TΔS	Spontaneous?
− (exo)	+ (more disorder)	Always −	Yes, at all temperatures
+ (endo)	− (less disorder)	Always +	No, at any temperature
− (exo)	− (less disorder)	− at LOW T, + at high T	Spontaneous only when T is low (enthalpy-driven)
+ (endo)	+ (more disorder)	+ at low T, − at HIGH T	Spontaneous only when T is high (entropy-driven)

For the two mixed cases, the crossover temperature where ΔG flips sign is found by setting ΔG = 0, which gives T = ΔH/ΔS. Below this temperature one term dominates; above it, the other does. This is exactly why ice melts above 0 °C (endothermic, entropy-increasing, entropy wins at high T) and water freezes below 0 °C (exothermic, entropy-decreasing, enthalpy wins at low T). At exactly 0 °C, ΔG = 0 and ice and liquid water coexist at equilibrium.

WORKED EXAMPLE

For a reaction, ΔH = +120 kJ/mol and ΔS = +250 J/(mol·K). (a) Is it spontaneous at 25 °C? (b) Above what temperature does it become spontaneous?

Both ΔH and ΔS are positive, this is the endothermic, entropy-increasing case, which is spontaneous only at HIGH temperature.

(a) At 25 °C = 298 K. First convert ΔS to kJ so the units match ΔH: 250 J/(mol·K) = 0.250 kJ/(mol·K).
ΔG = ΔH − TΔS = 120 − (298)(0.250) = 120 − 74.5 = +45.5 kJ/mol.
ΔG > 0, so the reaction is NOT spontaneous at 25 °C.

(b) Set ΔG = 0 to find the crossover temperature:
T = ΔH/ΔS = 120 kJ/mol ÷ 0.250 kJ/(mol·K) = 480 K.
Above 480 K (about 207 °C), the TΔS term exceeds ΔH, making ΔG negative, spontaneous. The single biggest pitfall here is forgetting to convert ΔS from J to kJ (or T to kelvin); being off by a factor of 1000 wrecks the answer.

## KEY

Units checklist for ΔG = ΔH − TΔS: put T in kelvin (°C + 273), and express ΔH and ΔS in the SAME energy unit. ΔS is almost always given in J/K while ΔH is in kJ, convert one before multiplying. This unit mismatch is the most common arithmetic error the MCAT exploits.

## Free Energy, Equilibrium, and Biological Coupling

ΔG° (with the degree symbol) is the free energy change under standard conditions, 1 M concentrations for solutes, 1 atm partial pressure for gases, and a specified temperature (usually 25 °C). But real reactions rarely sit at standard conditions, so the actual ΔG depends on the current concentrations through the reaction quotient Q. As a reaction proceeds, Q changes, ΔG changes, and the reaction runs until ΔG reaches zero, that point is equilibrium, where Q = K.

ΔG = ΔG° + RT ln Q

ΔG = free energy at current conditions; ΔG° = standard free energy; R = 8.314 J/(mol·K); T in kelvin; Q = reaction quotient (products over reactants at the current moment). When Q < K, the forward reaction is still favorable (ΔG < 0).

At equilibrium ΔG = 0 and Q = K, which collapses the equation into the single most important link between thermodynamics and equilibrium: ΔG° = −RT ln K. A large equilibrium constant (products favored, K > 1) corresponds to a negative ΔG°; a small K (reactants favored, K < 1) corresponds to a positive ΔG°. When K = 1, ΔG° = 0. Memorize this directionality even if you can't compute logarithms by hand on test day.

ΔG° = −RT ln K

Relates standard free energy to the equilibrium constant. K > 1 ⇒ ln K > 0 ⇒ ΔG° < 0 (forward-favored). K < 1 ⇒ ΔG° > 0. K = 1 ⇒ ΔG° = 0. Equivalent log form: ΔG° = −2.303 RT log K.

Reading the thermodynamic signs together

ΔG°	K	Position of equilibrium
Negative (< 0)	K > 1	Products favored (forward-favorable)
Zero (= 0)	K = 1	Roughly equal mix
Positive (> 0)	K < 1	Reactants favored (reverse-favorable)

Biology runs many reactions that are individually nonspontaneous (ΔG > 0), building proteins, pumping ions uphill, synthesizing glucose. The cell solves this with energetic coupling: it pairs an unfavorable reaction with a highly favorable one (usually ATP hydrolysis, ΔG° ≈ −30.5 kJ/mol under standard biochemical conditions) so that the SUM of the two ΔG values is negative. Because ΔG is a state function, you simply add the coupled steps. This is why ATP is the cell's energy currency, and the MCAT frequently frames coupling as 'will this reaction proceed if coupled to ATP hydrolysis?'

WORKED EXAMPLE

The phosphorylation of glucose, glucose + Pi → glucose-6-phosphate, has ΔG° = +13.8 kJ/mol and is nonspontaneous. ATP hydrolysis (ATP → ADP + Pi) has ΔG° = −30.5 kJ/mol. If the cell couples these (via hexokinase), what is the overall ΔG°, and is the coupled reaction favorable?

Add the two reactions and their free energies (ΔG° is a state function, so the values add directly):

Unfavorable step: glucose + Pi → glucose-6-phosphate, ΔG° = +13.8 kJ/mol
Favorable step: ATP → ADP + Pi, ΔG° = −30.5 kJ/mol

The free phosphate (Pi) appears as a reactant in the first step and a product in the second, so it cancels, giving the net coupled reaction:
glucose + ATP → glucose-6-phosphate + ADP

Overall ΔG° = (+13.8) + (−30.5) = −16.7 kJ/mol.

Since ΔG° is now negative, the coupled reaction IS thermodynamically favorable. This is the central trick of metabolism: ATP's large negative hydrolysis free energy drags an otherwise uphill reaction downhill. For coupling to be physically real, the two reactions must share a common intermediate or be run by the same enzyme (here, hexokinase), you can't just add unrelated reactions on paper.

## TRAP

Thermodynamics ≠ kinetics. A negative ΔG tells you a reaction CAN occur and how far it proceeds, NOT how fast. Diamond converting to graphite has ΔG < 0 yet takes eons because its activation energy is enormous. A catalyst lowers the activation energy and speeds a reaction (both directions equally), but it does NOT change ΔG, ΔH, ΔS, or K, it can never make a nonspontaneous reaction spontaneous.
