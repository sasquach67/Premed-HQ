---
source: PrepCat content library
exported_at: 2026-07-12T05:25:49.079Z
item_number: 13
type: "GUIDE"
title: "Chemical Kinetics"
meta: "~28 min · 8 sections · cheat sheet"
---

Guide
Cheat sheet
CHEM & PHYS
~28 min read
# Chemical Kinetics

Chemical kinetics is the study of how fast reactions go and what controls that speed, rate laws, reaction order, mechanisms, activation energy, and catalysts. The MCAT tests it because it ties together experimental data interpretation, the rate determining step (central to enzyme and physiology questions), and the crucial distinction between how fast a reaction proceeds (kinetics) versus whether it is favorable (thermodynamics).

## ON THIS PAGE

## Reaction Rate: What We Are Actually Measuring

## Rate Laws and Reaction Order

## Determining the Rate Law from Initial-Rates Data

## Integrated Rate Laws and Half-Life

## Reaction Mechanisms and the Rate-Determining Step

## Activation Energy, Collision Theory, and the Arrhenius Equation

## Catalysts and How They Speed Reactions

## Kinetics vs. Thermodynamics: Keeping Them Separate

## KEY ESSENTIALS

Rate law (rate = k[A]^m[B]^n) and the orders are determined ONLY by experiment, never read from balanced-equation coefficients (unless the step is elementary).
The rate determining step is the slowest step; only species in steps up to and including it (plus any catalyst) appear in the rate law.
Arrhenius (k = A·e^(−Ea/RT)): k rises with temperature and falls with higher Ea. Catalysts speed reactions by LOWERING Ea, not by changing ΔG, ΔH, or K.
Catalysts change kinetics, not thermodynamics: they speed both forward and reverse equally and are regenerated, but do NOT shift equilibrium or spontaneity.
Kinetics (rate, Ea) is independent of thermodynamics (ΔG, K): a reaction can be favorable yet slow (diamond → graphite). Spontaneous ≠ fast.
First-order half-life (t½ = 0.693/k) is constant and concentration-independent, the hallmark of drug elimination and radioactive decay.

## Reaction Rate: What We Are Actually Measuring

Chemical kinetics asks one question: how fast does a reaction go, and what controls that speed? Before anything else you need a precise definition of 'rate.' The rate of a reaction is the change in concentration of a reactant or product per unit time. Because reactants disappear and products appear, we attach a negative sign to reactant terms so that the rate always comes out positive. For a reaction like 2 N2O5 → 4 NO2 + O2, the various species change at different speeds because their stoichiometric coefficients differ, NO2 appears four times as fast as O2 forms. To get a single unambiguous rate for the overall reaction, we divide each concentration change by that species' coefficient.

rate = −(1/a)·Δ[A]/Δt = −(1/b)·Δ[B]/Δt = +(1/c)·Δ[C]/Δt

For aA + bB → cC. Δ[A]/Δt is the change in concentration of A over a time interval; a, b, c are the balanced stoichiometric coefficients. Negative signs on reactants make the rate positive. Units are typically M·s⁻¹ (mol·L⁻¹·s⁻¹).

WORKED EXAMPLE

For 2 N2O5 → 4 NO2 + O2, oxygen is forming at 0.0050 M/s. How fast is N2O5 being consumed, and what is the overall reaction rate?

Set the rates equal using coefficients: rate = +(1/1)·Δ[O2]/Δt = −(1/2)·Δ[N2O5]/Δt = +(1/4)·Δ[NO2]/Δt. The overall reaction rate equals the O2 formation rate divided by its coefficient (1), so rate = 0.0050 M/s. Now solve for N2O5: −(1/2)·Δ[N2O5]/Δt = 0.0050, so Δ[N2O5]/Δt = −0.010 M/s, N2O5 disappears at 0.010 M/s, twice as fast as O2 forms, exactly as the 2:1 coefficient ratio predicts. NO2, with coefficient 4, appears at (4)(0.0050) = 0.020 M/s, four times as fast as O2.

## TRAP

Students forget the coefficient factor. The instantaneous rate of a single species is NOT the same as the 'rate of reaction' unless that species has a coefficient of 1. Always divide each species' rate of change by its coefficient to convert between species and to get the unique overall rate.

Rates are not constant. As reactants are consumed, the rate almost always slows down. So we distinguish the average rate (over an interval) from the instantaneous rate (the slope of the tangent to the concentration-vs-time curve at one instant). The special case of the initial rate, the instantaneous rate at t = 0, before products accumulate or any reverse reaction matters, is the workhorse for determining rate laws experimentally.

## Rate Laws and Reaction Order

A rate law is an equation that links the reaction rate to the concentrations of reactants. For most reactions it takes the form below. The exponents, the reaction orders, tell you how sensitive the rate is to each reactant's concentration, and the rate constant k bundles in everything else (temperature, activation energy, the intrinsic reactivity). The single most important conceptual point on the MCAT: the orders m and n are determined experimentally and bear NO necessary relationship to the coefficients in the balanced overall equation.

rate = k[A]^m[B]^n

k = rate constant (depends on temperature, not on concentration). [A], [B] = molar concentrations of reactants. m = order with respect to A; n = order with respect to B. Overall order = m + n. Orders are usually small integers (0, 1, 2) but can in principle be fractional or negative.

Reaction order describes the shape of the dependence. Zero order: the rate is independent of that reactant, doubling its concentration does nothing (common when a surface or enzyme is saturated). First order: the rate is directly proportional, double the concentration, double the rate. Second order: the rate quadruples when concentration doubles (since 2² = 4). The overall order is the sum of the individual orders and determines the units of k, which is a favorite MCAT detail.

Reaction order: behavior and units of k

Overall order	Effect of doubling [reactant]	Units of k	Integrated form / hallmark
Zero	No change in rate	M·s⁻¹	[A] vs t is linear; rate constant until reactant runs out
First	Rate doubles (×2)	s⁻¹	ln[A] vs t is linear; constant half-life
Second	Rate quadruples (×4)	M⁻¹·s⁻¹	1/[A] vs t is linear; half-life grows as [A] drops

TIP

The units of k tell you the overall order. Work it out from rate = k[A]^order: k must have units of (M·s⁻¹)/M^order = M^(1−order)·s⁻¹. Zero order → M/s, first → 1/s, second → 1/(M·s). So if a problem hands you k with units M⁻¹·s⁻¹, the reaction is second order overall, no other work needed.

## KEY

Only the reactant concentrations appear in a standard rate law (and occasionally a catalyst that participates in the mechanism). Pure solids and pure liquids (including the solvent) do NOT appear because their 'concentration' is effectively constant. Products do not appear in the rate law of a simple one-way reaction.

## Determining the Rate Law from Initial-Rates Data

The MCAT loves to give you a table of experiments and ask you to extract the rate law. The method of initial rates works by changing one reactant's concentration at a time while holding the others fixed, then watching how the initial rate responds. The ratio of rates between two experiments equals the ratio of concentrations raised to the unknown order, so you can solve for the order. Once all orders are known, plug any single experiment back into rate = k[A]^m[B]^n to solve for k.

### FIGURE: READING AN INITIAL-RATES TABLE

A multi-row table with columns [A]₀, [B]₀, and initial rate. To find the order in A, pick two rows where [B] is held constant and only [A] changes; the factor by which the rate changes equals (the factor change in [A]) raised to the order m. The figure highlights two such row-pairs with arrows: one pair isolates A, the other isolates B. The key teaching point illustrated is 'change one variable at a time', that experimental design is what makes the orders solvable.

WORKED EXAMPLE

For A + B → products, three experiments are run. Exp 1: [A]=0.10, [B]=0.10, rate=2.0×10⁻³ M/s. Exp 2: [A]=0.20, [B]=0.10, rate=4.0×10⁻³ M/s. Exp 3: [A]=0.10, [B]=0.20, rate=8.0×10⁻³ M/s. Find the rate law and k.

Order in A: compare Exp 1 and 2, [B] is held at 0.10, [A] doubles (0.10→0.20), and the rate doubles (2.0→4.0×10⁻³). Doubling concentration doubles the rate → 2 = 2^m → m = 1, first order in A. Order in B: compare Exp 1 and 3, [A] held at 0.10, [B] doubles (0.10→0.20), and the rate quadruples (2.0→8.0×10⁻³). 4 = 2^n → n = 2, second order in B. So rate = k[A][B]², which is third order overall. Solve for k using Exp 1: 2.0×10⁻³ = k(0.10)(0.10)² = k(0.10)(0.010) = k(1.0×10⁻³), so k = 2.0 M⁻²·s⁻¹. Check the units: third order → M^(1−3)·s⁻¹ = M⁻²·s⁻¹. Correct.

## TRAP

Don't assume the orders match the equation. Looking at A + B → products you might be tempted to say first order in each. The data say otherwise (second order in B). Coefficients only equal orders for a single elementary step, never trust them for an overall (multi-step) reaction.

TIP

If the factors aren't clean integers, take the ratio of the two full rate expressions for the two experiments. The k and the held-constant concentration cancel, leaving (new/old concentration)^order = (new/old rate). Then solve the exponent, often by recognizing powers of 2 or 3, or by taking logs.

## Integrated Rate Laws and Half-Life

The rate laws above are differential, they relate rate to concentration. Integrated rate laws relate concentration directly to time, which lets you predict how much reactant remains after a given interval and, conversely, gives you a graphical test for order: plot the data three ways and whichever gives a straight line reveals the order. You do not need to derive these for the MCAT, but you should recognize the linear forms and especially the half-life relationships.

Zero: [A] = [A]₀ − kt | First: ln[A] = ln[A]₀ − kt | Second: 1/[A] = 1/[A]₀ + kt

[A]₀ = initial concentration, [A] = concentration at time t, k = rate constant. Each is in the linear form y = mx + b: plotting [A], ln[A], or 1/[A] vs. t gives a straight line for zero, first, and second order respectively. The slope gives k (slope is −k for zero and first order, +k for second order).

Half-life by order (t½ = time to consume half the reactant)

Order	Half-life formula	Behavior as reaction proceeds
Zero	t½ = [A]₀ / (2k)	Each successive half-life gets SHORTER
First	t½ = 0.693 / k	CONSTANT, independent of concentration
Second	t½ = 1 / (k[A]₀)	Each successive half-life gets LONGER

## KEY

First-order half-life is constant (t½ = 0.693/k = ln 2 / k) and does not depend on the starting concentration. This is THE high yield half-life fact, it underlies radioactive decay and drug elimination (most drugs follow first order pharmacokinetics), and it is a quick way to identify a first order process on the MCAT.

WORKED EXAMPLE

A drug is eliminated by first order kinetics with a half-life of 4 hours. A patient receives a 200 mg dose. How much remains after 12 hours, and what is the elimination rate constant k?

First-order half-life is constant, so just count half-lives: 12 hours ÷ 4 hours per half-life = 3 half-lives. Each half-life halves the amount: 200 → 100 (at 4 h) → 50 (at 8 h) → 25 mg (at 12 h). So 25 mg remains. For k, use t½ = 0.693/k → k = 0.693/t½ = 0.693/(4 h) = 0.173 h⁻¹. The unit (inverse time, h⁻¹) confirms first order, and notice we never needed the actual concentration to find the half-life, the hallmark of first order behavior.

## Reaction Mechanisms and the Rate-Determining Step

Most reactions do not happen in a single collision; they proceed through a sequence of elementary steps called the mechanism. An elementary step shows the actual molecular event, what literally collides. For elementary steps ONLY, the molecularity (number of species colliding) directly gives the rate-law exponents: a unimolecular step is first order, a bimolecular step (two particles) is second order, and a rare termolecular step is third order. Added together, the elementary steps must reproduce the overall balanced equation.

The rate determining step (RDS) is the slowest step in the mechanism, the bottleneck. Just as a single-file checkout line sets how fast a whole store empties, the slow step sets the overall rate. Crucially, the rate law of the overall reaction is governed by the RDS and any steps up to and including it. Species that only appear after the RDS, in fast later steps, do not show up in the rate law. This is why the experimentally measured rate law lets chemists deduce which step is slow.

### FIGURE: ENERGY DIAGRAM OF A TWO-STEP MECHANISM

A reaction-coordinate diagram (energy on the y-axis, reaction progress on the x-axis) showing TWO humps (two transition states) separated by a small valley (the intermediate). The first hump is TALLER than the second. The taller hump = higher activation energy = the rate determining step. The valley between the humps is the intermediate, which is produced and then consumed. The figure teaches that the step with the highest energy barrier (tallest peak), not necessarily the first step, is rate limiting.

WORKED EXAMPLE

The reaction 2 NO2 + F2 → 2 NO2F has the experimental rate law rate = k[NO2][F2]. A proposed mechanism is: Step 1 (slow): NO2 + F2 → NO2F + F. Step 2 (fast): NO2 + F → NO2F. Is this mechanism consistent?

Check three things. (1) Do the steps sum to the overall equation? Adding: NO2 + F2 + NO2 + F → NO2F + F + NO2F. The F cancels (produced in step 1, consumed in step 2, it is an intermediate), giving 2 NO2 + F2 → 2 NO2F. Matches. (2) The slow step is step 1, an elementary bimolecular step (NO2 + F2), so its rate law is rate = k[NO2][F2], taken directly from the molecularity because the step is elementary. (3) Does this match the experimental rate law? Yes, rate = k[NO2][F2]. All three checks pass, so the mechanism is consistent. Note that the overall reaction has a coefficient of 2 on NO2, yet the rate is first order in NO2, because only one NO2 participates in the slow step. This is the classic 'coefficients ≠ orders' lesson.

## KEY

A reaction intermediate is produced in an early step and consumed in a later one, it does not appear in the overall equation, and it forms AFTER the start (it has to be made). A catalyst is the opposite: present at the start, consumed in an early step, and REGENERATED in a later step, so it also cancels out of the overall equation. Both cancel, but for opposite reasons.

## TRAP

If a rate law contains an intermediate, the MCAT treats it as 'not yet acceptable' as a final answer, intermediates aren't something you can put in a beaker and measure out. When the slow step isn't first, you must substitute using a preceding fast-equilibrium step to express the rate law only in terms of measurable reactants. Recognizing that this substitution is required is usually enough at MCAT depth.

## Activation Energy, Collision Theory, and the Arrhenius Equation

Why don't favorable reactions happen instantly? Because molecules must first climb an energy barrier. Collision theory says a reaction occurs only when reactant molecules collide (1) with enough energy and (2) in the correct orientation. The minimum energy needed is the activation energy, Ea. Most collisions fail, they're too gentle or poorly aligned. Raising the temperature increases both the frequency of collisions and, far more importantly, the fraction of molecules whose energy exceeds Ea. That second effect dominates, which is why even a modest temperature rise can sharply accelerate a reaction (a rough rule of thumb is that the rate roughly doubles per 10 °C, though this is only approximate).

k = A·e^(−Ea/RT)

k = rate constant; A = frequency (pre-exponential) factor, which folds in collision frequency and the orientation/steric factor; Ea = activation energy (J/mol); R = gas constant 8.314 J/(mol·K); T = absolute temperature (K). The exponential term e^(−Ea/RT) is the fraction of collisions with enough energy. Higher T or lower Ea → larger k → faster reaction.

The exponential shows the key dependencies at a glance. Increasing T makes the exponent less negative, so k rises. Increasing Ea makes the exponent more negative, so k falls, high-barrier reactions are slow. Taking the natural log gives a linear form, ln k = ln A − (Ea/R)(1/T), so a plot of ln k versus 1/T is a straight line with slope −Ea/R. That's how Ea is measured experimentally, and the MCAT may show you such a plot and ask what the slope represents.

### FIGURE: REACTION-COORDINATE (ENERGY) DIAGRAM

Energy on the y-axis, reaction progress on the x-axis. Reactants sit at a starting energy level; the curve rises to a single peak (the transition state / activated complex), then falls to the products' energy level. The height from reactants up to the peak is the forward activation energy Ea(forward). The height from products up to the same peak is Ea(reverse). The net vertical difference between reactants and products is ΔH (exothermic if products sit lower). A dashed lower curve shows a catalyzed path with a SMALLER peak, same start and end points (same ΔH), lower barrier. This single figure encodes Ea, the transition state, ΔH, and how a catalyst works.

## TRAP

The transition state (activated complex) is NOT an intermediate. The transition state is the fleeting highest-energy point at the TOP of the barrier, it cannot be isolated. An intermediate sits in a VALLEY between two barriers and, while short-lived, is a real species that exists for a finite time. The MCAT frequently tests this peak-vs-valley distinction.

WORKED EXAMPLE

Two reactions are run at the same temperature. Reaction X has Ea = 50 kJ/mol; reaction Y has Ea = 80 kJ/mol. Assuming similar pre-exponential factors A, which is faster, and what happens to the gap if you raise the temperature?

From k = A·e^(−Ea/RT), a smaller Ea gives a larger (less negative) exponent and thus a larger k. Reaction X (lower Ea = 50 kJ/mol) has the larger rate constant, so X is faster at this temperature. Raising temperature increases k for both, because the exponent becomes less negative for each. However, the high-Ea reaction (Y) is MORE sensitive to temperature, because Ea sits in the numerator of the exponent, a larger Ea means the exponential term changes more steeply as T rises, so heating boosts Y's rate constant by a larger factor and closes the gap proportionally. Conceptually: at low T only X clears its small barrier appreciably, but at high T enough molecules can also clear Y's larger barrier.

## Catalysts and How They Speed Reactions

A catalyst increases the rate of a reaction by providing an alternative pathway with a lower activation energy, and it is regenerated (not consumed) by the end. Lowering Ea raises the fraction of collisions that succeed, so both the forward AND the reverse reactions speed up by the same factor. This is why a catalyst lets a system reach equilibrium faster but does NOT change where equilibrium lies. Because the catalyst returns unchanged, it does not appear in the overall balanced equation, though it may appear in the rate law, since it participates in the mechanism.

## KEY

Catalysts change KINETICS, not THERMODYNAMICS. They lower Ea and speed the reaction (and its reverse equally), but they do NOT change ΔG, ΔH, ΔS, the equilibrium constant K, or the position of equilibrium. If a question asks whether a catalyst makes a reaction 'more spontaneous' or shifts equilibrium, the answer is no, it only gets you there faster.

Catalyst: what it does and does not affect

Quantity	Affected by catalyst?
Activation energy (Ea)	Yes, lowered (forward and reverse equally)
Reaction rate / rate constant k	Yes, increased
ΔH, ΔS, ΔG of reaction	No, unchanged (state functions)
Equilibrium constant K / position of equilibrium	No, unchanged
Amount of catalyst at the end	No, regenerated, not consumed

Catalysts come in flavors the MCAT may name. A homogeneous catalyst is in the same phase as the reactants (e.g., aqueous acid catalyzing a reaction in solution). A heterogeneous catalyst is in a different phase, typically a solid surface where gas or liquid reactants adsorb, react, and desorb (e.g., the platinum in a catalytic converter, or metal surfaces in industrial hydrogenation). Enzymes are biological catalysts, usually proteins, that are extraordinarily efficient and specific; they lower Ea by stabilizing the transition state and properly orienting substrates in the active site. Everything true of catalysts is true of enzymes: they speed both directions, are not consumed, and never alter the reaction's thermodynamics.

TIP

On a reaction-coordinate diagram, a catalyst lowers the PEAK(s) but keeps the reactant and product energy levels (and therefore ΔH and ΔG) exactly the same. If a diagram shows the products' energy level changing, that is NOT a simple catalyst effect, watch for that distractor.

## Kinetics vs. Thermodynamics: Keeping Them Separate

The deepest conceptual theme in this topic, and a frequent MCAT trap, is that kinetics and thermodynamics are independent. Thermodynamics (ΔG, ΔH, ΔS, K) tells you WHETHER a reaction is favorable and how far it goes. Kinetics (Ea, k, rate) tells you HOW FAST it gets there. A reaction can be highly favorable thermodynamically (large negative ΔG) yet excruciatingly slow because of a high activation energy. The classic example: the conversion of diamond to graphite is thermodynamically favorable (graphite is lower in energy), but the activation barrier is so enormous that diamonds persist essentially forever. Spontaneous does not mean fast.

Two separate questions about a reaction

Question	Governed by	Key quantities
Will it happen / how far?	Thermodynamics	ΔG, ΔH, ΔS, K
How fast will it happen?	Kinetics	Ea, k, rate, rate law
Changed by a catalyst?	Only kinetics	Ea ↓, rate ↑ (ΔG, K unchanged)
Changed by temperature?	Both	Shifts K (thermo) AND raises k (kinetics)

## TRAP

Temperature is the one lever that moves BOTH. It changes k (kinetics, raising T always speeds the reaction up) and it changes K (thermodynamics, shifting equilibrium per Le Châtelier, the direction depending on whether the reaction is endo- or exothermic). A catalyst, by contrast, touches only kinetics. Don't conflate the two effects of heat.

WORKED EXAMPLE

A reaction has ΔG = −150 kJ/mol but proceeds immeasurably slowly at room temperature. A student concludes the reaction 'isn't really spontaneous.' What is wrong, and name two ways to speed it up without changing its thermodynamics?

The student is conflating spontaneity with speed. ΔG = −150 kJ/mol means the reaction IS thermodynamically spontaneous (favorable, with a large equilibrium constant). Spontaneity is a thermodynamic statement about direction and extent, it says nothing about rate. The slowness is a kinetic issue: a high activation energy. To speed it up without altering the reaction's thermodynamics: (1) add a catalyst, which lowers Ea and accelerates the reaction while leaving ΔG and K untouched; (2) increase reactant concentration (or, for gases, pressure, or for solids, surface area), which raises the rate without changing the per-reaction thermodynamics. Raising the temperature would also speed it up via the Arrhenius equation, but note that heating technically shifts K as well, so it is not a 'pure kinetics' lever. The takeaway: a favorable reaction stuck behind a tall barrier just needs a faster route, not a more favorable destination.
