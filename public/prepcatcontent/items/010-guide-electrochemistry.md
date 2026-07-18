---
source: PrepCat content library
exported_at: 2026-07-12T05:25:44.670Z
item_number: 10
type: "GUIDE"
title: "Electrochemistry"
meta: "~28 min · 8 sections · cheat sheet"
---

Guide
Cheat sheet
CHEM & PHYS
~28 min read
# Electrochemistry

Electrochemistry connects redox chemistry to energy, linking electron transfer to measurable voltage, free energy, and equilibrium. The MCAT tests it because it ties together thermodynamics (ΔG, K), the directionality of electron flow, and quantitative problem solving across galvanic and electrolytic cells.

## ON THIS PAGE

## Redox Foundations: Tracking Electrons

## Galvanic vs. Electrolytic Cells

## Cell Anatomy, Salt Bridge, and Notation

## Standard Reduction Potentials and Cell Potential

## Linking Electrochemistry to Thermodynamics: ΔG, E°, and K

## The Nernst Equation: Non-Standard Conditions

## Faraday's Laws of Electrolysis

## Batteries, Electrolysis, and MCAT Applications

## KEY ESSENTIALS

AN OX, RED CAT: oxidation is always at the anode, reduction always at the cathode (BOTH cell types) and electrons always flow anode → cathode in the wire, only the electrode SIGN flips between cell types.
Galvanic cells run a SPONTANEOUS reaction (E°cell > 0, ΔG < 0; anode −, cathode +); electrolytic cells FORCE a non-spontaneous reaction with external power (E°cell < 0, ΔG > 0; anode +, cathode −).
E°cell = E°cathode − E°anode using STANDARD REDUCTION potentials; potentials are intensive, never multiply them by stoichiometric coefficients (ΔG, by contrast, does scale with n).
ΔG° = −nFE°cell and E°cell = (RT/nF)ln K give the spontaneity triad: E° > 0 ⟷ ΔG° < 0 ⟷ K > 1 ⟷ spontaneous; E° = 0 ⟷ equilibrium ⟷ dead battery.
Nernst (25 °C): E = E° − (0.0592/n)·log Q, voltage drops as a cell discharges and Q rises toward K (E → 0).
Faraday: moles e⁻ = (I·t)/F; mass = (I·t·M)/(n·F), so for a fixed charge a larger n means fewer atoms deposited.

## Redox Foundations: Tracking Electrons

Electrochemistry is the chemistry of electron transfer. Every electrochemical process is a redox (reduction oxidation) reaction in which electrons move from one species to another. Before you can analyze any cell, you must be able to identify what is oxidized, what is reduced, and how many electrons are involved. Oxidation is the LOSS of electrons (oxidation state increases); reduction is the GAIN of electrons (oxidation state decreases). The classic mnemonics are OIL RIG (Oxidation Is Loss, Reduction Is Gain) and LEO the lion says GER (Lose Electrons = Oxidation, Gain Electrons = Reduction).

A species that gets oxidized causes another species to be reduced, so it is the reducing agent (reductant). A species that gets reduced causes oxidation of its partner, so it is the oxidizing agent (oxidant). Note the deliberate flip the MCAT loves: the reducing agent is itself oxidized, and the oxidizing agent is itself reduced. Strong oxidizing agents (F₂, O₂, MnO₄⁻, Cl₂) are 'electron-hungry' and sit high in the table of reduction potentials (large positive E°).

TIP

Quick oxidation-state rules: pure elements = 0; monatomic ions = charge; O is usually −2 (−1 in peroxides, e.g. H₂O₂); H is +1 with nonmetals, −1 with metals (hydrides); group 1 = +1, group 2 = +2; F is always −1. The sum of oxidation states equals the overall charge of the species.

To balance a redox reaction you split it into two half-reactions, one oxidation, one reduction, balance atoms and charge in each (adding H₂O and H⁺ in acid, or OH⁻ in base, plus electrons), then scale the half-reactions so the electrons cancel. The number of electrons transferred, n, that you obtain here is the SAME n you will plug into ΔG° = −nFE° and the Nernst equation, so getting it right is essential.

WORKED EXAMPLE

In the reaction Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s), identify the species oxidized, the species reduced, the oxidizing agent, the reducing agent, and n.

Zinc goes from oxidation state 0 (pure metal) to +2 (Zn²⁺): it loses 2 electrons, so Zn is OXIDIZED and is the reducing agent. Copper goes from +2 (Cu²⁺) to 0 (Cu metal): it gains 2 electrons, so Cu²⁺ is REDUCED and is the oxidizing agent. Each zinc atom transfers 2 electrons to each copper ion, so n = 2. This is the prototypical Daniell-cell reaction you should recognize instantly, it recurs throughout this guide.

## Galvanic vs. Electrolytic Cells

An electrochemical cell physically separates the two half-reactions so that the electrons must travel through an external wire, and that flow of electrons is electric current we can either harness or drive. There are two fundamental cell types, and distinguishing them is one of the most heavily tested ideas in MCAT electrochemistry.

A galvanic (voltaic) cell harnesses a SPONTANEOUS redox reaction (E°cell > 0, ΔG < 0) to produce electrical energy. Batteries are galvanic cells (while discharging). An electrolytic cell does the opposite: it uses an external power supply to FORCE a non-spontaneous reaction (E°cell < 0, ΔG > 0) to occur, for example, splitting water into H₂ and O₂, or electroplating metal. In a galvanic cell, chemical energy becomes electrical energy; in an electrolytic cell, electrical energy is consumed to drive chemistry.

In BOTH cell types, oxidation happens at the anode and reduction happens at the cathode (AN OX / RED CAT). Electrons always flow through the external wire FROM the anode TO the cathode, because oxidation (the source of electrons) is at the anode. What differs between the two cell types is the SIGN assigned to each electrode, which is the single most common trap on this topic.

## Galvanic vs. Electrolytic Cells

Feature	Galvanic (Voltaic)	Electrolytic
Spontaneity	Spontaneous (ΔG < 0)	Non-spontaneous (ΔG > 0)
E°cell sign	Positive (> 0)	Negative (< 0)
Energy	Produces electrical energy	Consumes electrical energy
Anode (oxidation)	Negative (−)	Positive (+)
Cathode (reduction)	Positive (+)	Negative (−)
Electron flow (external wire)	Anode → Cathode	Anode → Cathode
Driven by	Itself (spontaneous)	External power source
Example	Battery, Daniell cell	Electroplating, electrolysis of water

## TRAP

The anode/cathode DEFINITIONS (anode = oxidation, cathode = reduction) NEVER change between cell types. Only the electrode SIGN flips. Students wrongly memorize 'anode = negative.' That is true only for galvanic cells. In an electrolytic cell the anode is POSITIVE, because the external power supply's positive terminal pulls electrons away from it. Always determine anode/cathode from oxidation/reduction first, then assign the sign based on cell type.

TIP

Sign memory hook: 'the CAThode is posiTIVE' works for galvanic cells. For electrolytic cells, let the power source dictate sign, its positive terminal connects to the anode to strip electrons out (anode +), and its negative terminal pushes electrons into the cathode (cathode −).

## Cell Anatomy, Salt Bridge, and Notation

A galvanic cell has two half-cells, each containing an electrode dipped in an electrolyte solution. The electrodes are connected externally by a wire (often through a voltmeter or a load), and the two solutions are connected internally by a salt bridge (or porous membrane). The salt bridge contains an inert electrolyte such as KNO₃ or KCl and serves a crucial purpose: it maintains electrical neutrality in each half-cell.

As the cell runs, the anode half-cell tends to accumulate positive charge (the metal oxidizes, releasing cations into solution), and the cathode half-cell tends to accumulate negative charge (cations are consumed as they plate out, leaving excess anions). Without compensation, this charge buildup would immediately stop electron flow. The salt bridge fixes this: its anions migrate toward the anode and its cations migrate toward the cathode, neutralizing the buildup so current keeps flowing. A common point of confusion: ANIONS in the salt bridge move toward the ANODE, and CATIONS move toward the CATHODE.

### FIGURE: GALVANIC (DANIELL) CELL

Two beakers. Left beaker: a zinc electrode in ZnSO₄ solution, this is the anode (labeled −). Right beaker: a copper electrode in CuSO₄ solution, this is the cathode (labeled +). A wire with a voltmeter connects the two metal electrodes across the top; electrons flow LEFT to RIGHT (anode to cathode) through this wire. A salt bridge (inverted U-tube of KNO₃) connects the two solutions; inside it, NO₃⁻ anions drift toward the left (zinc/anode) beaker and K⁺ cations drift toward the right (copper/cathode) beaker. At the anode, Zn(s) → Zn²⁺ + 2e⁻ (electrode dissolves, loses mass). At the cathode, Cu²⁺ + 2e⁻ → Cu(s) (copper plates out, electrode gains mass). The figure makes clear that electrons travel through the WIRE while ions travel through the SOLUTION and salt bridge, the circuit is completed by two different charge carriers.

Cell notation (line notation) is a shorthand for describing a cell. The convention is: anode (oxidation) on the LEFT, cathode (reduction) on the RIGHT. A single vertical line | indicates a phase boundary (e.g., between a solid electrode and its solution), and a double vertical line ‖ indicates the salt bridge. Concentrations are shown in parentheses when given.

Zn(s) | Zn²⁺(1 M) ‖ Cu²⁺(1 M) | Cu(s)

Read left to right: solid Zn is oxidized to Zn²⁺ (anode, left of the salt bridge ‖); Cu²⁺ is reduced to solid Cu (cathode, right). Single lines | are phase boundaries; the double line ‖ is the salt bridge.

## KEY

A metal anode is consumed as it is oxidized: it dissolves and LOSES mass over time, while the cathode GAINS mass as ions plate onto it. This mass-change logic underlies every Faraday's-law calculation.

## Standard Reduction Potentials and Cell Potential

Every half-reaction has an intrinsic tendency to occur as a reduction, quantified by its standard reduction potential, E°, measured in volts under standard conditions (1 M solutions, 1 atm gases, 25 °C / 298 K). The more POSITIVE the E°, the greater the species' affinity for electrons and the more readily it is reduced. These values are tabulated relative to the standard hydrogen electrode (SHE: 2H⁺ + 2e⁻ → H₂), which is assigned E° = 0.00 V by definition and serves as the universal reference point.

Selected Standard Reduction Potentials (25 °C)

Half-reaction	E° (V)	Tendency
F₂ + 2e⁻ → 2F⁻	+2.87	Strongest oxidant (most easily reduced)
MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O	+1.51	Strong oxidant
Ag⁺ + e⁻ → Ag	+0.80	Easily reduced
Cu²⁺ + 2e⁻ → Cu	+0.34	Readily reduced
2H⁺ + 2e⁻ → H₂	0.00	Reference (SHE)
Zn²⁺ + 2e⁻ → Zn	−0.76	Hard to reduce; Zn easily oxidized
Li⁺ + e⁻ → Li	−3.04	Hardest to reduce; Li is the strongest reductant

To find the cell potential, identify which half-reaction proceeds as reduction (cathode) and which is reversed to proceed as oxidation (anode). In a spontaneous galvanic cell, the species with the HIGHER (more positive) reduction potential is reduced and becomes the cathode; the other half-reaction is forced to run in reverse as the oxidation (anode). The standard cell potential is then:

E°cell = E°cathode − E°anode

Both E° values are STANDARD REDUCTION potentials read directly from the table. E°anode is the tabulated reduction potential of the species that is actually being oxidized, you subtract it as-is; you do NOT also flip its sign. For a galvanic cell this formula always yields a positive E°cell.

## TRAP

Standard reduction potentials are INTENSIVE, they do NOT change when you multiply a half-reaction by a coefficient to balance electrons. If you scale Ag⁺ + e⁻ → Ag (E° = +0.80 V) by 2, the potential is STILL +0.80 V, not +1.60 V. Potential is energy per charge (J/C), so it is independent of how many electrons flow. (ΔG, by contrast, IS extensive and DOES scale with n.) This is a classic MCAT trick.

WORKED EXAMPLE

Using the table, calculate E°cell for a galvanic cell built from the Zn²⁺/Zn and Cu²⁺/Cu half-cells, and confirm it is spontaneous.

The species more easily reduced (higher E°) is Cu²⁺ at +0.34 V, so copper is the cathode. Zinc (E° = −0.76 V) is therefore the anode (it gets oxidized). E°cell = E°cathode − E°anode = (+0.34 V) − (−0.76 V) = +1.10 V. Because E°cell is positive, ΔG° is negative and the reaction is spontaneous as written: Zn + Cu²⁺ → Zn²⁺ + Cu. This +1.10 V is a value worth memorizing as a benchmark.

## Linking Electrochemistry to Thermodynamics: ΔG, E°, and K

Cell potential is a direct measure of the driving force of a redox reaction, so it connects seamlessly to thermodynamics. The bridge equation relates the standard free energy change to the standard cell potential:

ΔG° = −nFE°cell

n = moles of electrons transferred (from the balanced equation); F = Faraday's constant ≈ 96,485 C/mol e⁻; E°cell in volts (J/C). The negative sign means a POSITIVE E°cell gives a NEGATIVE ΔG°, i.e., spontaneous.

Examine the sign logic: when E°cell > 0, ΔG° < 0 and the reaction is spontaneous (galvanic). When E°cell < 0, ΔG° > 0 and the reaction is non-spontaneous (must be driven, electrolytic). When E°cell = 0, ΔG° = 0 and the system is at equilibrium, this is a fully discharged ('dead') battery. You should be able to move fluidly among the three descriptions of spontaneity: ΔG°, E°cell, and K.

ΔG° = −RT ln K and E°cell = (RT/nF) ln K

R = 8.314 J/mol·K; T in kelvin; K = equilibrium constant. Setting ΔG° = −nFE°cell equal to ΔG° = −RT ln K gives the second relation, linking cell potential directly to the equilibrium constant. E°cell > 0 ⇔ K > 1.

The Spontaneity Triad (all describe the same forward direction)

Condition	ΔG°	E°cell	K	Cell type
Spontaneous (forward)	< 0	> 0	> 1	Galvanic
At equilibrium	= 0	= 0	= 1	Dead battery
Non-spontaneous	> 0	< 0	< 1	Electrolytic

WORKED EXAMPLE

For the Daniell cell (Zn + Cu²⁺ → Zn²⁺ + Cu), E°cell = +1.10 V and n = 2. Calculate ΔG° and state whether the reaction is spontaneous.

ΔG° = −nFE°cell = −(2 mol e⁻)(96,485 C/mol)(1.10 V). First the magnitude: 2 × 96,485 = 192,970 C; × 1.10 V ≈ 212,267 J ≈ 212 kJ. Applying the leading negative sign: ΔG° ≈ −212 kJ/mol. Because ΔG° is large and negative, the reaction is strongly spontaneous, consistent with the positive E°cell. (Units check: C × V = J, since 1 V = 1 J/C.)

## KEY

Memorize the directional chain: positive E°cell ⟷ negative ΔG° ⟷ K > 1 ⟷ spontaneous ⟷ galvanic. If you can instantly map any one of these to the others, most conceptual MCAT electrochemistry questions become trivial.

## The Nernst Equation: Non-Standard Conditions

Standard potentials assume 1 M concentrations and 1 atm. Real cells, and the MCAT, rarely stay at standard state. The Nernst equation corrects the cell potential for actual (non-standard) concentrations and pressures using the reaction quotient Q (the same Q used in equilibrium and in ΔG = ΔG° + RT ln Q).

E = E° − (RT/nF) ln Q

General form. E = actual potential; E° = standard potential; R, T, n, F as before; Q = reaction quotient (products over reactants, each raised to its coefficient; pure solids and liquids are excluded).

E = E° − (0.0592/n) · log Q (at 25 °C, base-10 log)

The MCAT-friendly form at 298 K. The constant 0.0592 V = (RT/F)·ln 10. Use log₁₀ here, not ln. n = electrons transferred.

Interpret the equation qualitatively first, this is what the MCAT most often asks. As a reaction proceeds, products accumulate and reactants deplete, so Q increases. A larger Q makes the (0.0592/n)·log Q term more positive, and because it is SUBTRACTED, E DROPS. This is exactly why a battery's voltage declines as it discharges. When the reaction finally reaches equilibrium, Q = K, the cell can do no more work, and E = 0, the battery is dead. Conversely, raising reactant concentration or lowering product concentration makes Q smaller and BOOSTS E.

## TRAP

Watch the sign and the log base. The term is MINUS (0.0592/n)·log Q. If Q < 1 (excess reactants), log Q is negative, so −(negative) raises E above E°. If Q > 1 (excess products), E falls below E°. Also, never pair ln with the 0.0592 form, that constant already bakes in the conversion to base-10 log (use the RT/nF form if you want ln).

WORKED EXAMPLE

A Daniell cell (E°cell = +1.10 V, n = 2) operates with [Zn²⁺] = 1.0 M and [Cu²⁺] = 0.010 M. Is the actual cell potential higher or lower than 1.10 V, and by roughly how much?

For Zn + Cu²⁺ → Zn²⁺ + Cu, Q = [Zn²⁺]/[Cu²⁺] = 1.0 / 0.010 = 100 (the solids Zn and Cu are excluded). log Q = log 100 = 2. Nernst: E = 1.10 − (0.0592/2)(2) = 1.10 − 0.0592 ≈ 1.04 V. The potential is LOWER than standard because the product (Zn²⁺) is in excess relative to the reactant (Cu²⁺), pushing Q above 1. Lowering the Cu²⁺ concentration weakened the cell, sensible, since there is less oxidant available to be reduced.

A special application is the concentration cell: a galvanic cell with the SAME electrode material and SAME species in both half-cells, differing only in concentration. Here E° = 0 (the identical half-reactions cancel), so E = −(0.0592/n)·log Q, driven entirely by the concentration difference. The dilute side acts as the anode (it oxidizes, releasing ions to raise its concentration) and the concentrated side acts as the cathode (it reduces ions, lowering its concentration). The cell runs until the two concentrations equalize, at which point Q = 1 and E = 0.

## KEY

In a concentration cell, the half-cell with the LOWER ion concentration is always the anode and the one with the HIGHER concentration is the cathode. Nature drives the system toward equalizing the concentrations, just as it drives any reaction toward equilibrium.

## Faraday's Laws of Electrolysis

Faraday's laws quantify the chemistry of electrolytic cells: how much substance is produced or consumed for a given amount of electric charge. They turn an electrical measurement (current × time) into moles and grams of product, a favorite MCAT calculation because it stitches together current, charge, moles of electrons, and stoichiometry.

q = I × t

q = total charge in coulombs (C); I = current in amperes (A = C/s); t = time in seconds. (This charge q is distinct from the reaction quotient Q in the Nernst equation, don't confuse the two.)

moles of e⁻ = q / F = (I × t) / 96,485

F = Faraday's constant = 96,485 C per mole of electrons (often rounded to ~96,500). Dividing total charge by F gives the moles of electrons that flowed.

The bridge from moles of electrons to moles (and mass) of substance is the half-reaction stoichiometry, specifically n, the number of electrons per ion deposited or consumed. For example, plating Cu from Cu²⁺ requires 2 electrons per Cu atom, whereas plating Ag from Ag⁺ requires only 1. So the same charge deposits twice as many moles of Ag as Cu. The mass deposited is proportional to the equivalent weight (molar mass ÷ n).

mass = (I × t × M) / (n × F)

M = molar mass (g/mol); n = electrons per ion in the half-reaction; F = 96,485 C/mol. Combines every step: charge → moles e⁻ → moles substance → grams.

WORKED EXAMPLE

A current of 2.0 A is passed through molten CuCl₂ for 1.0 hour (3600 s). What mass of copper metal is deposited at the cathode? (Cu molar mass = 63.5 g/mol; F ≈ 96,500 C/mol.)

Step 1, charge: q = I × t = (2.0 A)(3600 s) = 7200 C. Step 2, moles of electrons: 7200 / 96,500 ≈ 0.0746 mol e⁻. Step 3, half-reaction: Cu²⁺ + 2e⁻ → Cu, so 2 mol e⁻ deposit 1 mol Cu; moles Cu = 0.0746 / 2 ≈ 0.0373 mol. Step 4, mass: 0.0373 mol × 63.5 g/mol ≈ 2.4 g of copper. The step students most often miss is dividing by n = 2, forgetting it would double the answer.

TIP

Always carry units. Amps × seconds = coulombs; coulombs ÷ (C/mol e⁻) = mol e⁻; then apply the half-reaction's electron-to-ion ratio, and finally molar mass. If your final units aren't grams (or moles, if that's what's asked), you skipped a conversion.

## TRAP

For a FIXED charge, more electrons required per ion (larger n) means FEWER atoms deposited. Al³⁺ (n = 3) yields one-third the moles of metal that a +1 ion would for the same charge, part of why aluminum production by electrolysis is so energy-intensive.

## Batteries, Electrolysis, and MCAT Applications

The MCAT frames electrochemistry in real and biological contexts. Batteries are galvanic cells; a rechargeable battery is a galvanic cell during discharge (spontaneous) and an electrolytic cell during charging (an external charger forces the reverse, non-spontaneous reaction). In a lead-acid car battery, discharge consumes Pb and PbO₂ to produce PbSO₄; recharging reverses it. Recognizing this discharge/charge duality lets you reason about electrode signs in either mode.

Electrolysis applications include electroplating (depositing a thin metal layer onto an object made the cathode), purifying metals, and producing reactive elements like Na, Al, Cl₂, and H₂ that are too reactive or too strongly bound to obtain by ordinary chemical reduction. In the electrolysis of water, reduction at the cathode gives H₂ and oxidation at the anode gives O₂, in a 2:1 H₂:O₂ volume ratio, because each water molecule provides 2 H per O.

Biological connection: the electron transport chain in mitochondria is essentially a series of redox couples arranged by increasing reduction potential, so electrons flow 'downhill' from NADH (low/negative E°') toward O₂ (high/positive E°', the terminal electron acceptor). This favorable, spontaneous electron flow (positive overall ΔE, negative ΔG) is harnessed to pump protons and ultimately make ATP, galvanic-cell logic applied to physiology. Resting and equilibrium membrane potentials are likewise Nernst-equation phenomena, set by ion concentration gradients across membranes.

Common Cells at a Glance

System	Type	Key idea
Battery (discharging)	Galvanic	Spontaneous; anode (−), cathode (+)
Battery (recharging)	Electrolytic	Forced reverse; external power required
Electroplating	Electrolytic	Object is the cathode; metal ions plate onto it
Electrolysis of water	Electrolytic	Cathode: H₂; anode: O₂ (2:1 volume)
Electron transport chain	Galvanic-like	Electrons flow toward higher E° (O₂)
Concentration cell	Galvanic	E° = 0; driven by a concentration gradient

## KEY

Corrosion (rusting of iron) is spontaneous oxidation, a galvanic process. Cathodic protection counters it by attaching a more easily oxidized 'sacrificial anode' (e.g., zinc or magnesium, which have more negative reduction potentials). That metal oxidizes preferentially, sparing the iron, a direct application of the reduction-potential ranking.

WORKED EXAMPLE

You want to silver-plate a metal spoon. Which electrode should the spoon be, what is the electrolyte, and is the process spontaneous?

Plating deposits Ag onto the spoon by reduction (Ag⁺ + e⁻ → Ag), and reduction occurs at the cathode, so the spoon is the CATHODE. The electrolyte is a solution of Ag⁺ ions (e.g., AgNO₃), and the anode is typically a silver bar that dissolves to replenish the Ag⁺ being consumed. Depositing pure metal onto an object this way is non-spontaneous overall, so this is an ELECTROLYTIC cell requiring an external power source: the supply's positive terminal connects to the silver anode (making it +) and the negative terminal to the spoon/cathode (making it −).
