---
source: PrepCat content library
exported_at: 2026-07-12T05:25:50.642Z
item_number: 14
type: "GUIDE"
title: "Chemical Equilibrium"
meta: "~26 min · 7 sections · cheat sheet"
---

Guide
Cheat sheet
CHEM & PHYS
~26 min read
# Chemical Equilibrium

Chemical equilibrium describes the dynamic state where forward and reverse reaction rates are equal, governed by the equilibrium constant K. The MCAT tests it constantly because it ties kinetics, thermodynamics, acid-base, and solubility together, and because Le Chatelier and Ksp problems reward fast, accurate conceptual reasoning under time pressure.

## ON THIS PAGE

## Dynamic Equilibrium: What It Actually Means

## The Equilibrium Constant Keq and How to Write It

## The Reaction Quotient Q: Predicting Direction

## Le Chatelier's Principle: How Systems Respond to Stress

## Ksp and Molar Solubility

## The Common-Ion Effect and Predicting Precipitation

## Tying It Together: Equilibrium and Free Energy

## KEY ESSENTIALS

At equilibrium the forward and reverse RATES are equal (not the concentrations); concentrations are constant but generally unequal. K depends ONLY on temperature.
K = products/reactants, each raised to its coefficient; EXCLUDE pure solids and pure liquids (incl. solvent water, activity = 1). Compare Q (same form, current values) to K: Q < K shifts right, Q > K shifts left.
Le Chatelier: a system partially counteracts any stress (concentration, pressure/volume, temperature). Concentration, volume/pressure, inert gas, and catalyst changes move the POSITION but never change K, only TEMPERATURE changes K (treat heat as reactant if endothermic, product if exothermic).
Ksp is the equilibrium constant for a dissolving solid (solid excluded); derive molar solubility by stoichiometry, with coefficients becoming exponents. Common ion raises Q and lowers solubility; precipitate forms when Q > Ksp.
ΔG° = −RT ln K: K > 1 ⇒ ΔG° < 0 (products favored); K < 1 ⇒ ΔG° > 0 (reactants favored); K = 1 ⇒ ΔG° = 0.

## Dynamic Equilibrium: What It Actually Means

Most reactions the MCAT cares about are reversible: reactants form products, but products also re-form reactants. We write this with a double arrow (⇌). Starting from pure reactants, the forward rate is fast (lots of reactant present) and the reverse rate is essentially zero (no product yet). As product builds up, the forward rate slows (reactant is being consumed) and the reverse rate speeds up (more product is available to react back). Eventually the two rates become equal. At that point the system has reached chemical equilibrium.

## KEY

Equilibrium is DYNAMIC, not static. Molecules keep reacting in both directions at equal rates, so the net amount of each species stops changing. The reaction has not 'stopped' or 'used up' the reactants, it is running equally fast both ways.

A crucial MCAT distinction: at equilibrium the RATES are equal, but the CONCENTRATIONS are generally NOT equal, and usually aren't. The concentrations simply stop changing. Whether the final mixture is mostly products, mostly reactants, or somewhere in between is set by the magnitude of the equilibrium constant, not by the definition of equilibrium itself.

### FIGURE: APPROACH TO EQUILIBRIUM

A concentration-vs-time plot with two curves. Starting from pure reactant: the reactant curve falls steeply then flattens; the product curve rises steeply then flattens. After time t_eq both curves become horizontal (concentrations now constant) but sit at different heights (concentrations unequal). A second inset plots forward and reverse RATE vs time: the forward rate falls and the reverse rate rises until they cross and meet at t_eq, illustrating that it is the rates, not the concentrations, that become equal at equilibrium.

Equilibrium can be approached from either side. Whether you start with all reactants, all products, or any mixture, a closed system at a fixed temperature settles to the SAME value of the equilibrium constant. That is why K is a property of the reaction at a given temperature, independent of the starting amounts.

## The Equilibrium Constant Keq and How to Write It

For a general reaction aA + bB ⇌ cC + dD, the equilibrium constant is the ratio of product terms to reactant terms, each raised to its stoichiometric coefficient, evaluated at equilibrium. When written with molar concentrations it is called Kc; when written with partial pressures of gases it is Kp.

Kc = ([C]^c [D]^d) / ([A]^a [B]^b)

[X] = molar equilibrium concentration of species X; lowercase letters are the balanced-equation coefficients. Products on top, reactants on bottom. The same form built from partial pressures (P_C, P_D, …) gives Kp.

## TRAP

Pure solids and pure liquids are EXCLUDED from the expression (their activity is defined as 1). This includes water when it is the solvent. The MCAT loves heterogeneous equilibria here, e.g., for CaCO₃(s) ⇌ CaO(s) + CO₂(g), K = P(CO₂) only, because both solids drop out. Do not write [CaCO₃] or [CaO] anywhere in the expression.

Why do pure solids and pure liquids drop out? The amount of substance per unit volume of a pure condensed phase is fixed by its density and does not change as the reaction proceeds, so it is constant and gets absorbed into K. Only species whose 'effective concentration' can vary, dissolved solutes (aq) and gases, appear in the expression.

What appears in the equilibrium expression

Phase	In the expression?	Represented by
Gas (g)	Yes	Partial pressure (Kp) or molarity (Kc)
Aqueous solute (aq)	Yes	Molar concentration
Pure solid (s)	No	Activity = 1 (excluded)
Pure liquid (l), incl. solvent water	No	Activity = 1 (excluded)

The magnitude of K tells you where equilibrium lies. K >> 1 means products dominate (the reaction effectively 'goes to completion'). K << 1 means reactants dominate (very little product forms). K near 1 means appreciable amounts of both are present at equilibrium. On the MCAT, treat K as dimensionless, each concentration or pressure is understood relative to a 1 M (or 1 atm) standard state, so the units cancel.

TIP

K depends ONLY on temperature, memorize this. Changing concentrations, pressure, or volume, or adding a catalyst, can shift the POSITION of equilibrium but cannot change the numerical value of K. Only a change in temperature changes K itself.

Kp = Kc (RT)^(Δn_gas)

Δn_gas = (moles of gaseous product) − (moles of gaseous reactant); R = 0.0821 L·atm/mol·K; T in kelvin. If Δn_gas = 0, then Kp = Kc. This relates the pressure-based and concentration-based constants for gas-phase reactions (only gas-phase species count toward Δn).

You can also manipulate K when you alter how the equation is written. Reversing a reaction inverts K (K_reverse = 1/K_forward). Multiplying all coefficients by n raises K to the nth power. Adding two reactions multiplies their K values (K_total = K₁ × K₂). These rules mirror Hess's-law reasoning and show up when coupling acid/base equilibria (e.g., obtaining Kw from Ka × Kb).

Manipulating the equilibrium constant

Operation on the reaction	Effect on K
Reverse the reaction	K → 1/K
Multiply all coefficients by n	K → Kⁿ
Divide all coefficients by n	K → K^(1/n)
Add two reactions together	K → K₁ × K₂

## The Reaction Quotient Q: Predicting Direction

The reaction quotient Q has the exact same algebraic form as K, but it is evaluated at ANY moment, not just at equilibrium. Plug in the current concentrations (or partial pressures) and you get Q. Comparing Q to K tells you which way the reaction must shift to reach equilibrium, one of the highest-yield problem types on the test.

Q = ([C]^c [D]^d) / ([A]^a [B]^b) (current, non-equilibrium values)

Identical structure to Kc but using whatever concentrations exist right now. At equilibrium, Q = K. The brackets here are instantaneous concentrations, not equilibrium concentrations.

Interpreting Q versus K

Comparison	Meaning	Net shift
Q < K	Too few products relative to equilibrium	Forward → (toward products)
Q = K	System is at equilibrium	No net change
Q > K	Too many products relative to equilibrium	Reverse ← (toward reactants)

TIP

Mnemonic: the reaction always moves to make Q chase K. If Q is too small, it must grow → make more products (shift right). If Q is too big, it must shrink → make more reactants (shift left). 'Q wants to become K.'

WORKED EXAMPLE

For the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g), Kc = 0.50 at a certain temperature. A vessel currently contains [N₂] = 2.0 M, [H₂] = 1.0 M, and [NH₃] = 2.0 M. Is the system at equilibrium? If not, which direction will it shift?

Write Q using the current concentrations: Q = [NH₃]² / ([N₂][H₂]³). Substitute: Q = (2.0)² / [(2.0)(1.0)³] = 4.0 / (2.0 × 1.0) = 4.0 / 2.0 = 2.0. Compare to K: Q = 2.0 is greater than K = 0.50. Because Q > K, there are too many products relative to equilibrium, so the reaction shifts LEFT (reverse direction), consuming NH₃ and producing N₂ and H₂ until Q falls to 0.50. The system is NOT at equilibrium.

Q reasoning is also exactly how you decide whether a precipitate forms in solubility problems (covered later): there Q is the ion product and you compare it to Ksp instead of K. Same logic, different name.

## Le Chatelier's Principle: How Systems Respond to Stress

Le Chatelier's principle states that when a system at equilibrium is disturbed by a stress, it shifts in the direction that partially counteracts that stress, re-establishing equilibrium. The three stresses the MCAT tests are (1) changes in concentration, (2) changes in pressure/volume (for gases), and (3) changes in temperature. Master the reasoning for each rather than memorizing isolated outcomes.

CONCENTRATION. Add a reactant (or remove a product) and the system shifts RIGHT to consume the excess and rebuild balance. Add a product (or remove a reactant) and it shifts LEFT. In Q-language: adding a reactant enlarges the denominator, so Q < K, and the reaction runs forward. Crucially, K itself is unchanged, only the position moves.

PRESSURE / VOLUME (gases only). Decreasing the volume (raising the pressure) shifts equilibrium toward the side with FEWER moles of gas, because that relieves the increased pressure. Increasing the volume (lowering the pressure) shifts toward the side with MORE moles of gas. Count only gas-phase moles; if both sides have equal moles of gas, a volume change has no effect on the position.

## TRAP

Adding an INERT gas (like Ar) at constant VOLUME does NOT shift equilibrium, it raises the total pressure but leaves every partial pressure and concentration unchanged, so Q is unchanged. The MCAT sets this trap often. (Contrast: physically compressing the container changes partial pressures and DOES shift equilibrium; and adding inert gas at constant PRESSURE forces the volume up, which behaves like a volume increase and shifts toward more gas moles.)

TEMPERATURE. This is the only stress that actually changes the value of K. The trick: write heat as part of the reaction. For an EXOTHERMIC reaction (ΔH < 0), heat is a PRODUCT: A + B ⇌ C + heat. Adding heat (raising T) shifts LEFT, toward reactants, and DECREASES K. For an ENDOTHERMIC reaction (ΔH > 0), heat is a REACTANT: heat + A + B ⇌ C. Raising T shifts RIGHT and INCREASES K. Cooling does the opposite in each case.

Le Chatelier quick reference

Stress applied	Equilibrium shifts	Does K change?
Add reactant	Toward products (right)	No
Add product	Toward reactants (left)	No
Remove product	Toward products (right)	No
↓ Volume / ↑ pressure	Toward fewer gas moles	No
↑ Volume / ↓ pressure	Toward more gas moles	No
Add inert gas at constant V	No shift	No
↑ Temperature (exothermic rxn)	Toward reactants (left)	Yes, K decreases
↑ Temperature (endothermic rxn)	Toward products (right)	Yes, K increases
Add a catalyst	No shift	No

## KEY

A CATALYST never shifts equilibrium and never changes K. It lowers the activation energy of the forward and reverse reactions EQUALLY, so the system reaches the same equilibrium FASTER. If a passage claims a catalyst increases the equilibrium yield, that is wrong, it only changes how fast equilibrium is reached, not where it sits.

WORKED EXAMPLE

Consider the exothermic reaction 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ΔH < 0. Predict the effect on the AMOUNT of SO₃ at equilibrium for each change: (a) increase the temperature, (b) decrease the container volume, (c) add a catalyst, (d) inject argon gas at constant volume.

(a) Exothermic, so heat is a product: 2SO₂ + O₂ ⇌ 2SO₃ + heat. Raising T adds heat (a 'product'), shifting LEFT, SO₃ DECREASES, and K decreases. (b) Decreasing the volume favors the side with fewer moles of gas: the left side has 3 mol gas (2 SO₂ + 1 O₂), the right side has 2 mol (2 SO₃), so the equilibrium shifts RIGHT, SO₃ INCREASES (K unchanged). (c) A catalyst does not shift equilibrium, SO₃ is UNCHANGED; equilibrium is simply reached faster. (d) Argon added at constant volume changes no partial pressures or concentrations, Q is unchanged, so there is no shift, SO₃ is UNCHANGED.

## Ksp and Molar Solubility

When a sparingly soluble ionic solid sits in water, a dynamic equilibrium exists between the undissolved solid and its dissolved ions. The equilibrium constant for this dissolution is the solubility product, Ksp. Because the solid is a pure solid (activity = 1), it does NOT appear in the expression, Ksp is simply the product of the dissolved ion concentrations, each raised to its stoichiometric coefficient.

For AₓBᵧ(s) ⇌ x Aⁿ⁺(aq) + y Bᵐ⁻(aq): Ksp = [Aⁿ⁺]ˣ [Bᵐ⁻]ʸ

Ksp = solubility product; [Aⁿ⁺], [Bᵐ⁻] = molar concentrations of the dissolved ions at saturation; x, y = stoichiometric coefficients (which become EXPONENTS). The solid is omitted.

Molar solubility (s) is the number of moles of the solid that dissolve per liter to form a saturated solution. You connect s to Ksp through stoichiometry: write the balanced dissolution, let s = mol/L that dissolves, express each ion concentration in terms of s, substitute into the Ksp expression, and solve. The coefficients become both MULTIPLIERS (in front of s) and EXPONENTS, a frequent error spot.

WORKED EXAMPLE

The Ksp of Ag₂CrO₄ is 1.1 × 10⁻¹². Calculate its molar solubility in pure water.

Dissolution: Ag₂CrO₄(s) ⇌ 2 Ag⁺(aq) + CrO₄²⁻(aq). Let s = molar solubility. Then [Ag⁺] = 2s (two silvers per formula unit) and [CrO₄²⁻] = s. Substitute: Ksp = [Ag⁺]²[CrO₄²⁻] = (2s)²(s) = 4s³. Set equal to Ksp: 4s³ = 1.1 × 10⁻¹², so s³ = 2.75 × 10⁻¹³, and s = (2.75 × 10⁻¹³)^(1/3). To estimate, rewrite 2.75 × 10⁻¹³ as 275 × 10⁻¹⁵; the cube root of 275 is about 6.5 and the cube root of 10⁻¹⁵ is 10⁻⁵, so s ≈ 6.5 × 10⁻⁵ M. The molar solubility is about 6.5 × 10⁻⁵ mol/L.

## TRAP

A bigger Ksp does NOT always mean greater solubility when comparing salts of DIFFERENT stoichiometry. Convert each Ksp to molar solubility (s) before comparing. A 1:1 salt and a 1:2 salt with the same Ksp have very different solubilities because of the different exponent relationships. You may compare Ksp values directly ONLY when the salts produce the same number of ions in the same ratio.

Solubility also depends on temperature (Ksp, like every K, is temperature-dependent) and on pH for salts of weak acids or weak bases. For example, the solubility of a metal hydroxide or carbonate increases in acid because H⁺ consumes the anion (OH⁻ or CO₃²⁻), lowering its concentration and pulling the dissolution equilibrium to the right via Le Chatelier.

## The Common-Ion Effect and Predicting Precipitation

The common-ion effect is Le Chatelier applied to solubility. If a solution already contains an ion that is also produced when a salt dissolves, that salt becomes LESS soluble. Adding the common ion raises the ion product (Q) above where it would be in pure water, pushing the dissolution equilibrium to the left (back toward solid), so less solid dissolves, or some precipitates out.

Mechanistically: for AgCl(s) ⇌ Ag⁺ + Cl⁻, Ksp = [Ag⁺][Cl⁻]. If you dissolve AgCl in 0.10 M NaCl instead of pure water, [Cl⁻] is already high. To keep the product [Ag⁺][Cl⁻] equal to Ksp, [Ag⁺] must be much smaller, so far less AgCl dissolves. The solubility drops dramatically compared with pure water.

WORKED EXAMPLE

The Ksp of AgCl is 1.8 × 10⁻¹⁰. Calculate its molar solubility (a) in pure water and (b) in 0.10 M NaCl. Compare.

(a) In pure water: AgCl ⇌ Ag⁺ + Cl⁻; let s = solubility, so [Ag⁺] = [Cl⁻] = s. Then Ksp = s² = 1.8 × 10⁻¹⁰, giving s = √(1.8 × 10⁻¹⁰) ≈ 1.3 × 10⁻⁵ M. (b) In 0.10 M NaCl: [Cl⁻] starts at 0.10 M from the NaCl. Let s = the amount of AgCl that dissolves, so [Ag⁺] = s and [Cl⁻] = 0.10 + s. Because s is tiny, approximate 0.10 + s ≈ 0.10. Then Ksp = (s)(0.10) = 1.8 × 10⁻¹⁰, giving s = 1.8 × 10⁻⁹ M. Comparison: solubility fell from 1.3 × 10⁻⁵ M to 1.8 × 10⁻⁹ M, roughly a factor of 7,000 lower. The common ion (Cl⁻) suppressed dissolution exactly as Le Chatelier predicts.

TIP

In common-ion problems you can almost always approximate the common-ion concentration as just the added amount (e.g., 0.10 M), ignoring the tiny extra 's' contributed by the dissolving salt. Validate by confirming that s is much smaller than the added concentration, it virtually always is for sparingly soluble salts.

Predicting precipitation uses the same Q-vs-K comparison from earlier, where Q is now the ion product (sometimes written Qsp). Compute Q using the ACTUAL mixed ion concentrations and compare to Ksp: if Q > Ksp the solution is supersaturated and a precipitate forms until Q drops back to Ksp; if Q = Ksp the solution is exactly saturated (on the verge of precipitating); if Q < Ksp the solution is unsaturated and no precipitate forms, more solid could still dissolve.

Q (ion product) versus Ksp

Comparison	State of solution	Outcome
Q < Ksp	Unsaturated	No precipitate; more solid can dissolve
Q = Ksp	Saturated	Equilibrium; no net change
Q > Ksp	Supersaturated	Precipitate forms until Q falls to Ksp

## TRAP

When two solutions are MIXED, account for dilution BEFORE computing Q. Each ion's concentration drops because the total volume increased, use C₁V₁ = C₂V₂ (with V₂ = the combined volume) for each ion. Forgetting to dilute is one of the most common precipitation-problem errors the MCAT exploits.

WORKED EXAMPLE

Equal volumes (50 mL each) of 2.0 × 10⁻⁴ M Pb(NO₃)₂ and 2.0 × 10⁻⁴ M NaCl are mixed. Will PbCl₂ precipitate? Ksp(PbCl₂) = 1.7 × 10⁻⁵.

Step 1, dilution: mixing equal volumes doubles the total volume, so each ion's concentration is halved. After mixing, [Pb²⁺] = 1.0 × 10⁻⁴ M and [Cl⁻] = 1.0 × 10⁻⁴ M. Step 2, write Q for PbCl₂(s) ⇌ Pb²⁺ + 2Cl⁻: Q = [Pb²⁺][Cl⁻]² = (1.0 × 10⁻⁴)(1.0 × 10⁻⁴)² = (1.0 × 10⁻⁴)(1.0 × 10⁻⁸) = 1.0 × 10⁻¹². Step 3, compare: Q = 1.0 × 10⁻¹² is far below Ksp = 1.7 × 10⁻⁵, so Q < Ksp. The solution is unsaturated and NO precipitate forms.

## Tying It Together: Equilibrium and Free Energy

The MCAT loves to connect equilibrium to thermodynamics, because the equilibrium constant is fundamentally a thermodynamic quantity. The bridge equation relates the standard free energy change to K, and a second relation describes the system at any non-standard moment using Q.

ΔG° = -RT ln K

ΔG° = standard free energy change (J/mol); R = 8.314 J/mol·K; T = temperature in kelvin; K = equilibrium constant. This fixes the sign relationship between spontaneity under standard conditions and the position of equilibrium.

Sign relationships you must know

K value	ln K	ΔG°	Equilibrium favors
K > 1	positive	negative (ΔG° < 0)	Products
K = 1	zero	zero (ΔG° = 0)	Neither side strongly
K < 1	negative	positive (ΔG° > 0)	Reactants

ΔG = ΔG° + RT ln Q

ΔG = actual (non-standard) free energy change at the current composition; Q = reaction quotient right now. When the system reaches equilibrium, ΔG = 0 and Q = K, which recovers ΔG° = -RT ln K. This equation tells you the spontaneous direction from any starting mixture.

## KEY

Do not confuse ΔG° with ΔG. ΔG° (standard) is fixed by K at a given temperature and tells you which side is favored at standard conditions (all species at 1 M / 1 atm). ΔG (actual) depends on the current Q and tells you the direction the reaction proceeds RIGHT NOW. A reaction with ΔG° > 0 can still proceed forward (ΔG < 0) if Q is small enough, i.e., if you start with mostly reactants.

Temperature dependence also falls out of thermodynamics. Combining ΔG° = ΔH° − TΔS° with ΔG° = −RT ln K shows how K changes with T, fully consistent with Le Chatelier: for an endothermic reaction (ΔH° > 0), raising T increases K; for an exothermic reaction (ΔH° < 0), raising T decreases K. This is the quantitative backbone of the 'treat heat as a reactant/product' rule from the Le Chatelier section.

TIP

When you see 'spontaneous,' 'favored,' and 'K' in the same passage, anchor on the K-vs-1 ↔ ΔG°-sign chart. It resolves most discrete questions instantly: large K ⇒ very negative ΔG° ⇒ products strongly favored. This single chart connects the equilibrium and thermodynamics chapters.
