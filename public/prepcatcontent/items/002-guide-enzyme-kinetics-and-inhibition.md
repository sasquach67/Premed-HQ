---
source: PrepCat content library
exported_at: 2026-07-12T05:25:31.590Z
item_number: 2
type: "GUIDE"
title: "Enzyme Kinetics & Inhibition"
meta: "~28 min · 7 sections · cheat sheet"
---

Guide
Cheat sheet
BIO & BIOCHEM
~28 min read
# Enzyme Kinetics & Inhibition

Enzyme kinetics quantifies how fast enzymes convert substrate to product and how that rate changes with substrate concentration, captured by the Michaelis Menten model (Km, Vmax). The MCAT loves this topic because it fuses biochemistry, graph reading, and algebra: you must predict how competitive, noncompetitive, uncompetitive, and allosteric regulators shift Km and Vmax on both hyperbolic and Lineweaver Burk plots.

## ON THIS PAGE

## The Michaelis Menten Model: Building the Equation

## Interpreting Km, Vmax, kcat, and Catalytic Efficiency

## The Lineweaver Burk (Double-Reciprocal) Plot

## Reversible Inhibition: Competitive, Noncompetitive, Uncompetitive, Mixed

## Reasoning Through Inhibition Problems

## Allosteric Regulation and Cooperativity

## Other Regulation and Environmental Effects the MCAT Tests

## KEY ESSENTIALS

Km = [S] at half-Vmax and is INVERSELY related to affinity (low Km = high affinity); Km is intrinsic (independent of [E]), while Vmax scales with enzyme amount.
Competitive ↑Km / Vmax unchanged (reversed by ↑[S]); pure noncompetitive ↓Vmax / Km unchanged; uncompetitive ↓both Km and Vmax (LB slope constant). Only competitive is overcome by more substrate.
Lineweaver Burk: y-intercept = 1/Vmax, x-intercept = -1/Km, slope = Km/Vmax, competitive lines meet on the y-axis, noncompetitive on the x-axis, uncompetitive run parallel.
Allosteric/cooperative enzymes give a SIGMOIDAL (not hyperbolic) v-vs-[S] curve and are tuned by effectors at sites other than the active site; feedback inhibition shuts down an early rate limiting enzyme.
Catalytic efficiency = kcat/Km (higher = better); kcat (turnover number) = Vmax/[E]total and is independent of enzyme amount.
Enzymes lower Ea and speed both directions equally, they do NOT change ΔG or Keq, only the rate of reaching equilibrium.

## The Michaelis Menten Model: Building the Equation

Almost everything the MCAT tests about enzyme kinetics flows from a single reaction scheme. An enzyme (E) binds substrate (S) to form an enzyme-substrate complex (ES), which can either fall apart back to E + S or move forward to release product (P) and regenerate the free enzyme. Each step has its own rate constant: k1 for binding, k-1 for dissociation of ES back to E + S, and k2 (often written kcat) for the catalytic conversion to product.

E + S ⇌(k1, k-1) ES →(k2) E + P

k1 = rate constant for ES formation, k-1 = rate constant for ES breakdown back to E + S, k2 (kcat) = rate constant for product formation. The free enzyme is regenerated at the end, so it is a true catalyst, not a reactant consumed by the reaction.

We care about the initial reaction velocity, v0, the rate of product formation measured right at the start, before any meaningful product has built up and before the reverse reaction matters. Plotting v against substrate concentration [S] gives the classic hyperbolic curve: at low [S], the rate rises almost linearly (most enzyme is free and 'hungry' for substrate); at high [S], the curve flattens into a plateau because every enzyme molecule is occupied, the enzyme is saturated. That plateau rate is Vmax.

To turn this picture into an equation, the model invokes the steady-state assumption: shortly after mixing, the concentration of ES stays roughly constant because ES is formed and broken down at equal rates. Setting the rate of ES formation equal to the rate of ES breakdown and solving for v yields the Michaelis Menten equation. (You do not need to derive it for the MCAT, you need to read and apply it.)

v = (Vmax · [S]) / (Km + [S])

v = initial velocity; Vmax = maximum velocity at saturating substrate; [S] = substrate concentration; Km = Michaelis constant = (k-1 + k2)/k1, which equals the [S] that gives half-maximal velocity.

## KEY

The Michaelis Menten equation describes a rectangular hyperbola. Just two parameters fully define the curve: Vmax (the height of the plateau) and Km (how quickly you climb toward it). Learn how every inhibitor and every cooperative enzyme distorts these two numbers and you can answer most MCAT kinetics questions.

### FIGURE: MICHAELIS MENTEN CURVE (V VS [S])

A graph with substrate concentration [S] on the x-axis and initial velocity v on the y-axis. The curve starts at the origin, rises steeply and nearly linearly at low [S], then bends over and approaches a horizontal asymptote labeled Vmax. A dashed horizontal line is drawn at Vmax/2; the [S] value directly beneath where the curve crosses that line is labeled Km. The shape teaches that velocity is first order in [S] when [S] << Km, mixed-order near [S] = Km, and zero order (constant at ~Vmax) when [S] >> Km.

## Interpreting Km, Vmax, kcat, and Catalytic Efficiency

Vmax is the maximum velocity the enzyme can achieve, approached only when substrate is so abundant that essentially every active site is occupied. Critically, Vmax depends on the total amount of enzyme present: double the enzyme and you double Vmax. So Vmax is NOT an intrinsic property of one enzyme molecule; it scales with enzyme concentration.

Km, the Michaelis constant, is the substrate concentration at which velocity equals exactly half of Vmax. Substitute [S] = Km into the equation: the right side becomes Vmax·Km/(Km + Km) = Vmax/2, verify this for yourself, it is a favorite MCAT check. The big conceptual payoff: Km is a measure of how tightly the enzyme binds substrate. A LOW Km means the enzyme reaches half-speed at a low substrate concentration, so it grabs substrate avidly, HIGH affinity. A HIGH Km means it needs a lot of substrate to get going, LOW affinity. Km is inversely related to affinity.

## TRAP

Students constantly flip the Km-affinity relationship. Burn it in: LOW Km = HIGH affinity. Think of Km as the amount of substrate an enzyme 'demands' to work at half speed, an enzyme that demands very little substrate must bind it tightly.

Unlike Vmax, Km does NOT depend on enzyme concentration. Km is an intrinsic property of a given enzyme-substrate pair (at a fixed temperature and pH). This is exactly why Km is so useful for comparing enzymes or characterizing inhibitors, it isolates binding behavior from how much enzyme happens to be in the tube.

kcat = Vmax / [E]total

kcat = turnover number = molecules of substrate converted to product per enzyme molecule per unit time at saturation. Dividing Vmax by total enzyme concentration removes the enzyme-amount dependence, giving a per-molecule rate (units of inverse time, e.g. s⁻¹).

kcat, the turnover number, tells you how fast a single, fully-loaded enzyme cranks out product. The best single measure of overall enzyme performance, though, combines speed and binding into catalytic efficiency, kcat/Km. A high kcat/Km means the enzyme is both fast (high kcat) and good at capturing substrate (low Km). Enzymes near the theoretical ceiling, roughly 10^8 to 10^9 M⁻¹·s⁻¹, the diffusion limit, are called 'catalytically perfect' because the rate is limited only by how fast substrate can physically diffuse into the active site, not by the chemistry.

catalytic efficiency = kcat / Km

Combines turnover speed (kcat, in the numerator, bigger is better) with substrate-capturing ability (Km in the denominator, smaller is better). Higher kcat/Km = better overall catalyst at physiological, sub-saturating substrate levels.

WORKED EXAMPLE

An enzyme has a Vmax of 60 μmol/min when 0.002 μmol of enzyme is present in the reaction. What is its kcat (turnover number) in min⁻¹, and what does it mean?

kcat = Vmax / [E]total = (60 μmol/min) ÷ (0.002 μmol) = 30,000 min⁻¹. Interpretation: at saturating substrate, each enzyme molecule converts 30,000 substrate molecules to product every minute (30,000 ÷ 60 = 500 per second). Notice the amount units of enzyme (μmol) cancel with the μmol portion of Vmax, leaving inverse time, exactly what a turnover number should be. kcat is intrinsic to the enzyme: adding more enzyme would raise Vmax proportionally but leave kcat unchanged.

## The Lineweaver Burk (Double-Reciprocal) Plot

The hyperbolic Michaelis Menten curve has a practical problem: Vmax is an asymptote you never quite reach, so reading Vmax (and therefore Km) off the curve by eye is imprecise. The Lineweaver Burk plot fixes this by taking the reciprocal of both sides of the Michaelis Menten equation, which straightens the hyperbola into a line you can extrapolate exactly.

1/v = (Km/Vmax)·(1/[S]) + 1/Vmax

This is y = mx + b form: y = 1/v, x = 1/[S], slope m = Km/Vmax, y-intercept b = 1/Vmax. Setting 1/v = 0 and solving gives the x-intercept = -1/Km.

## KEY

Memorize the three landmarks of a Lineweaver Burk plot: y-intercept = 1/Vmax, x-intercept = -1/Km, slope = Km/Vmax. Because the axes are reciprocals, a LARGER y-intercept means a SMALLER Vmax, and an x-intercept farther from the origin (less negative, i.e. closer to zero) means a LARGER Km. Reciprocal thinking is the whole skill here, always invert the intercepts to recover real values.

### FIGURE: LINEWEAVER BURK PLOT

A straight line on axes where the x-axis is 1/[S] and the y-axis is 1/v. The line crosses the positive y-axis at a point labeled 1/Vmax and crosses the negative x-axis at a point labeled -1/Km. The slope of the line equals Km/Vmax. The figure teaches that a single straight line encodes all three kinetic parameters, and that shifting where the line hits each axis tells you instantly whether Vmax, Km, or both have changed.

The plot's real power on the MCAT is comparing two conditions, usually no inhibitor versus inhibitor. By seeing whether the inhibitor line meets the control line on the y-axis (same Vmax), on the x-axis (same Km), or runs parallel to it (same slope), you can classify the inhibitor at a glance. We use exactly this logic in the next two sections.

WORKED EXAMPLE

On a Lineweaver Burk plot, a reaction's line has a y-intercept of 0.02 (in units of 1/v) and an x-intercept of -0.5 (in units of 1/mM). Find Vmax and Km.

y-intercept = 1/Vmax = 0.02, so Vmax = 1/0.02 = 50 (velocity units, e.g. μM/min). x-intercept = -1/Km = -0.5 per mM, so 1/Km = 0.5 per mM, giving Km = 1/0.5 = 2 mM. Always invert: the plot gives you reciprocals, and forgetting to flip them back is the classic error. So this enzyme has Vmax = 50 μM/min and Km = 2 mM.

## Reversible Inhibition: Competitive, Noncompetitive, Uncompetitive, Mixed

Reversible inhibitors bind the enzyme through noncovalent interactions and can dissociate, so their effect depends on a binding equilibrium. The four types differ in WHERE the inhibitor binds and WHETHER it binds the free enzyme, the ES complex, or both. From that single distinction, every change in Km and Vmax follows logically, you should reason these out, not just memorize them.

Competitive inhibitor: typically resembles the substrate and binds the ACTIVE SITE of the free enzyme, directly competing with substrate. Because it only blocks the empty active site, you can outcompete it by flooding the system with substrate, so Vmax is UNCHANGED (given enough substrate, full speed is still reachable). But it takes more substrate to reach half-max, so the APPARENT Km INCREASES (apparent affinity drops). On Lineweaver Burk, competitive lines share the same y-intercept (same 1/Vmax) and rotate to a steeper slope, intersecting ON the y-axis.

Noncompetitive inhibitor (pure): binds a site OTHER than the active site (an allosteric site) and binds equally well to free enzyme and to ES. It does not block substrate binding, so Km is UNCHANGED, but it distorts the enzyme so a fraction of complexes can never turn over, effectively removing active enzyme. Adding substrate cannot rescue this, so Vmax DECREASES. On Lineweaver Burk, noncompetitive lines share the same x-intercept (same -1/Km) and intersect ON the x-axis, with a higher y-intercept (lower Vmax).

Uncompetitive inhibitor: binds ONLY the ES complex, never the free enzyme, at a site that appears after substrate binds. By tying up ES, it pulls the E + S ⇌ ES equilibrium toward ES (Le Chatelier), which actually INCREASES apparent affinity, so the apparent Km DECREASES. It also sequesters complexes that can no longer release product, so Vmax DECREASES too. Because both decrease by the same factor, the Km/Vmax ratio (the LB slope) is unchanged, giving PARALLEL lines on Lineweaver Burk.

Mixed inhibitor: binds an allosteric site on both free enzyme and ES, but with DIFFERENT affinities for each (unlike pure noncompetitive, where the affinities are equal). Vmax always decreases; apparent Km can increase or decrease depending on which form the inhibitor prefers. Pure noncompetitive inhibition is simply the special case of mixed inhibition where Km happens not to change. The MCAT mostly tests the three clean types but may use 'mixed' to describe an inhibitor that lowers Vmax and also shifts Km.

Reversible inhibitor types, effects on kinetic parameters

Inhibitor type	Binds to	Apparent Km	Vmax	Lineweaver Burk signature	Overcome by ↑[S]?
Competitive	Active site of free E only	Increases	Unchanged	Lines meet on y-axis (shared 1/Vmax), steeper slope	Yes
Noncompetitive (pure)	Allosteric site on E and ES equally	Unchanged	Decreases	Lines meet on x-axis (shared -1/Km), higher y-intercept	No
Uncompetitive	ES complex only	Decreases	Decreases	Parallel lines (slope unchanged)	No
Mixed	Allosteric site on E and ES unequally	Increases or decreases	Decreases	Lines intersect off both axes (above or below the x-axis)	No

## TRAP

The single most common MCAT trap: assuming competitive inhibitors lower Vmax. They do NOT, competitive inhibition is fully reversible by piling on substrate, so Vmax is unchanged; only the apparent Km rises. Conversely, do not say noncompetitive inhibitors raise Km, pure noncompetitive leaves Km untouched and only knocks down Vmax.

TIP

Mnemonic for what stays constant: comPetitive → same Peak (Vmax). NonCompetitive doesn't Change Km. Uncompetitive changes both (Km and Vmax fall together, lines stay parallel). And the fastest tell: if a question says 'increasing substrate reverses the inhibition,' it is competitive, period.

## Reasoning Through Inhibition Problems

MCAT inhibition questions rarely ask you to recite definitions. They give you data, a table of velocities, two curves, or a Lineweaver Burk plot, and ask you to classify the inhibitor or predict an effect. The strategy is always the same: figure out what happened to Vmax and to Km, then map that pattern onto the table from the previous section.

WORKED EXAMPLE

Without inhibitor, an enzyme has Km = 4 mM and Vmax = 100 μM/s. With a fixed amount of inhibitor X, Km is still measured at 4 mM but Vmax falls to 50 μM/s. With inhibitor Y, Km rises to 12 mM while Vmax stays at 100 μM/s. Classify X and Y, and state which can be reversed by adding more substrate.

Inhibitor X: Km unchanged, Vmax decreased → the signature of pure NONCOMPETITIVE inhibition. It binds away from the active site (so substrate binding, and thus Km, is unaffected) but reduces the amount of functional enzyme (so Vmax drops, here by half). Adding more substrate CANNOT reverse it, because the problem is impaired catalysis, not blocked binding. Inhibitor Y: Km increased (here threefold, 4 → 12 mM), Vmax unchanged → COMPETITIVE inhibition. It competes for the active site (raising apparent Km) but can be fully outcompeted by substrate, so Vmax is preserved. Adding more substrate CAN reverse Y. Quick check: only competitive inhibition is beaten by excess substrate, which matches Y.

WORKED EXAMPLE

A Lineweaver Burk experiment shows that adding inhibitor Z produces a line PARALLEL to the control line (same slope), shifted up and to the left. What type of inhibitor is Z, and what does the leftward x-intercept shift tell you about Km?

Parallel lines mean the slope (Km/Vmax) is unchanged while both intercepts move, the hallmark of UNCOMPETITIVE inhibition. The y-intercept moved up, so 1/Vmax increased, meaning Vmax DECREASED. The x-intercept (-1/Km) moved left, i.e. became more negative, so 1/Km increased in magnitude, meaning Km DECREASED. Both Vmax and Km dropped by the same factor, which is exactly why the slope, their ratio, stayed constant. Mechanistically, Z binds only the ES complex, dragging the binding equilibrium toward ES (tighter apparent binding → lower Km) while trapping complexes that cannot release product (lower Vmax).

TIP

Workflow for any inhibition question: (1) Determine the direction of change in Vmax. (2) Determine the direction of change in Km. (3) Match: Vmax↓ + Km same = noncompetitive; Vmax same + Km↑ = competitive; Vmax↓ + Km↓ = uncompetitive. On a double-reciprocal plot, convert the intercepts to real values FIRST (remember to invert), then classify.

## Allosteric Regulation and Cooperativity

Michaelis Menten kinetics assume a simple enzyme with one active site that acts independently. Many regulated enzymes break this assumption: they have MULTIPLE subunits and active sites, plus separate regulatory (allosteric) sites where molecules other than the substrate bind to tune activity. These allosteric enzymes do not give hyperbolic v-vs-[S] curves, they give a SIGMOIDAL (S-shaped) curve.

The sigmoidal shape arises from cooperativity. When substrate binds one subunit, it changes the shape of the whole enzyme so the remaining subunits bind substrate more easily, positive cooperativity. This is the same mechanism behind hemoglobin's oxygen-binding curve (a classic MCAT crossover). The result is a switch-like response: over a narrow range of substrate concentration, activity jumps from low to high, which is ideal for metabolic control.

### FIGURE: SIGMOIDAL VS HYPERBOLIC KINETICS

Two curves on the same v-vs-[S] axes. One is the smooth hyperbola of a Michaelis Menten enzyme, rising fastest right at the start. The other is an S-shaped (sigmoidal) curve that starts shallow (low activity at low [S]), then steepens dramatically through a middle 'switch' region, then levels off, characteristic of a cooperative allosteric enzyme. The figure teaches that cooperative enzymes are relatively insensitive at low substrate but respond sharply once a threshold is crossed, unlike the gradual Michaelis Menten response.

Allosteric enzymes are often described with two conformational states: the T (tense, low-affinity/low-activity) state and the R (relaxed, high-affinity/high-activity) state. Allosteric ACTIVATORS stabilize the R state and shift the sigmoidal curve LEFT (more activity at a given [S]); allosteric INHIBITORS stabilize the T state and shift it RIGHT. Substrate itself acts as a positive effector in cooperative enzymes by promoting the R state in neighboring subunits.

## KEY

A sigmoidal (S-shaped) velocity curve is the dead giveaway of an allosteric, cooperative enzyme. Hyperbolic = simple Michaelis Menten; sigmoidal = cooperative/allosteric. If a question shows an S-curve and asks why, the answer involves cooperative binding among multiple subunits.

Feedback inhibition (end-product inhibition) is the most important physiological example. The final product of a metabolic pathway binds an allosteric site on an early, often rate limiting enzyme and shuts it down, a thermostat that stops the cell from overproducing. Classic cases include CTP inhibiting aspartate transcarbamoylase in pyrimidine synthesis, and ATP signaling high energy charge by inhibiting upstream enzymes such as phosphofructokinase-1 in glycolysis. Because the regulator (the end product) usually looks nothing like the enzyme's own substrate, it must bind allosterically, not at the active site.

Hyperbolic (Michaelis Menten) vs Sigmoidal (allosteric) enzymes

Feature	Michaelis Menten enzyme	Allosteric (cooperative) enzyme
v vs [S] curve shape	Hyperbolic	Sigmoidal (S-shaped)
Number of active sites	Typically one / independent	Multiple, interacting subunits
Cooperativity	None	Positive (or negative) cooperativity
Regulation	Mainly substrate level	Allosteric activators & inhibitors, feedback
Response to [S] change	Gradual	Switch-like over a narrow range
MCAT analog	Myoglobin O2 binding (hyperbolic)	Hemoglobin O2 binding (sigmoidal)

## Other Regulation and Environmental Effects the MCAT Tests

Beyond reversible inhibitors and allosteric effectors, the MCAT expects you to know several additional ways enzyme activity is controlled, plus how environmental conditions bend kinetics. These show up as discrete-knowledge questions or as distractors in passage-based items.

Irreversible inhibitors bind the enzyme COVALENTLY (or with extremely tight, essentially permanent association) and permanently inactivate it. Because the affected enzyme is gone for good, adding substrate cannot help, kinetically they resemble noncompetitive inhibition (Vmax falls, Km of the remaining enzyme is unchanged). Examples the MCAT may cite include aspirin acetylating cyclooxygenase (COX), penicillin inhibiting bacterial transpeptidase, and nerve agents/organophosphates inhibiting acetylcholinesterase.

Reversible covalent modification, most importantly phosphorylation and dephosphorylation by kinases and phosphatases, switches enzymes on or off without destroying them. This is a major, fast, reversible control layer in signaling. Zymogens (proenzymes) are a separate strategy: enzymes synthesized in an inactive form that become active only after irreversible proteolytic cleavage (e.g., pepsinogen → pepsin, trypsinogen → trypsin, and the clotting cascade). This lets the cell make a potentially destructive enzyme safely and activate it precisely where and when it is needed.

Cofactors and coenzymes are non-protein helpers required for activity. Cofactors are typically inorganic ions (e.g., Zn2+, Mg2+, Fe2+); coenzymes are small organic molecules, many derived from vitamins (NAD+ from niacin, FAD from riboflavin, coenzyme A from pantothenate). An enzyme missing its required cofactor is an inactive apoenzyme; with the cofactor bound, it becomes the active holoenzyme. A tightly or covalently bound cofactor/coenzyme is called a prosthetic group (e.g., heme).

Temperature and pH affect rate through a balance of forces. Raising temperature speeds the reaction up to an optimum, beyond which the enzyme denatures and activity plummets (human enzymes typically peak near 37°C). Each enzyme has an optimal pH where its active-site residues carry the right charges; extreme pH alters protonation states and can denature the protein (pepsin works best around pH 2 in the stomach; trypsin near pH 8 in the small intestine). On a rate-vs-temperature or rate-vs-pH graph, expect a curve with a single optimum (roughly bell-shaped).

## TRAP

Do not confuse irreversible inhibition with reversible noncompetitive inhibition just because both lower Vmax. Irreversible inhibitors form covalent (or essentially permanent) bonds and kill the enzyme, there is no binding equilibrium and no recovery by dilution. Reversible noncompetitive inhibitors bind noncovalently and can dissociate. Separately, never say an inhibitor changes Keq or ΔG: enzymes (and their inhibitors) act on RATES, not on the thermodynamic endpoint.

## KEY

Enzymes are catalysts: they lower the activation energy (Ea) and increase reaction RATE, and they speed the forward and reverse reactions EQUALLY. They do NOT alter ΔG, Keq, or the position of equilibrium, they only help the system reach the same equilibrium faster. This thermodynamic fact is tested constantly alongside kinetics.
