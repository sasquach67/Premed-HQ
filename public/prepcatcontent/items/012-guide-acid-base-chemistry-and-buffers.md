---
source: PrepCat content library
exported_at: 2026-07-12T05:25:47.645Z
item_number: 12
type: "GUIDE"
title: "Acid Base Chemistry & Buffers"
meta: "~28 min · 7 sections · cheat sheet"
---

Guide
Cheat sheet
CHEM & PHYS
~28 min read
# Acid Base Chemistry & Buffers

Acid base chemistry governs proton transfer, pH, and the buffering that stabilizes biological and chemical systems; the MCAT tests it through pH/pKa reasoning, Henderson Hasselbalch buffer calculations, titration-curve interpretation, and polyprotic/amino acid behavior because these concepts recur across general chemistry, biochemistry, and physiology passages.

## ON THIS PAGE

## Definitions: Brønsted Lowry, Lewis, and Conjugate Pairs

## pH, pKa, and the Water Equilibrium

## Strong vs Weak Acids and Bases

## Henderson Hasselbalch and How Buffers Work

## Titration Curves and Their Key Points

## Polyprotic Acids, Amphoteric Species, and Amino Acids

## Salt Hydrolysis and Physiological Buffers

## KEY ESSENTIALS

pH = −log[H⁺]; pOH = −log[OH⁻]; pH + pOH = 14 and Kw = [H⁺][OH⁻] = 1.0×10⁻¹⁴ (at 25 °C). Each 1 pH unit = 10× change in [H⁺].
Henderson Hasselbalch: pH = pKa + log([A⁻]/[HA]); pH = pKa when [A⁻] = [HA]. A buffer works best at pH = pKa and within roughly pKa ± 1.
Lower pKa = stronger acid → weaker conjugate base; Ka·Kb = Kw, so pKa + pKb = 14 (at 25 °C).
Strong acids/bases dissociate ~100% (so [H⁺] or [OH⁻] = formal concentration); weak ones need Ka/Kb via an ICE table, with [H⁺] ≈ √(Ka·C) when dissociation < 5%.
Half-equivalence point: pH = pKa (max buffer capacity). Equivalence pH: strong/strong = 7; weak acid + strong base > 7; weak base + strong acid < 7.
Amino-acid pI = average of the two pKa's flanking the net-neutral zwitterion; pH < pI → net +, pH > pI → net −.

## Definitions: Brønsted Lowry, Lewis, and Conjugate Pairs

Acid base chemistry is fundamentally about the transfer or sharing of a proton or an electron pair. The MCAT uses three definitions, and you must move fluidly between them. The Arrhenius definition is the narrowest: an acid increases [H⁺] in water and a base increases [OH⁻] in water. It is rarely the 'right' answer because it cannot describe reactions that occur without water or species like NH₃ that act as a base without containing OH⁻.

The Brønsted Lowry definition is the workhorse for the MCAT: an acid is a proton (H⁺) donor and a base is a proton acceptor. Every Brønsted Lowry reaction creates two conjugate acid base pairs. When an acid HA donates its proton, what remains is its conjugate base A⁻. When a base B accepts a proton, the product BH⁺ is its conjugate acid. The two members of a conjugate pair differ by exactly one proton (one H and one unit of charge).

HA + H₂O ⇌ H₃O⁺ + A⁻

HA is the acid; H₂O is the base (accepts the proton). H₃O⁺ (hydronium) is the conjugate acid of water; A⁻ is the conjugate base of HA. [H⁺] and [H₃O⁺] are used interchangeably on the MCAT.

The Lewis definition is the broadest: a Lewis acid is an electron-pair acceptor and a Lewis base is an electron-pair donor. Every Brønsted Lowry base is also a Lewis base (the lone pair grabs the proton), and every Brønsted Lowry acid behaves as a Lewis acid, but the Lewis framework additionally covers electron-deficient species like BF₃, AlCl₃, and metal cations (e.g., Fe³⁺, Zn²⁺) that have no proton to donate. In organic chemistry, nucleophiles are Lewis bases and electrophiles are Lewis acids.

## KEY

Water is amphoteric (and, because it gains/loses a proton, also amphiprotic): it can act as an acid (donating H⁺ to become OH⁻) or a base (accepting H⁺ to become H₃O⁺). Other common amphoteric/amphiprotic species the MCAT loves: HCO₃⁻, HSO₄⁻, H₂PO₄⁻, HPO₄²⁻, and the intermediate forms of amino acids.

## TRAP

Do not confuse 'strong' with 'concentrated.' Strength is the intrinsic degree of dissociation; concentration is moles per liter. A very dilute solution of HCl is still a strong acid (fully dissociated); a 12 M acetic acid solution is still a weak acid (only partially dissociated).

WORKED EXAMPLE

Identify the two conjugate acid base pairs in the reaction: HCO₃⁻ + H₂O ⇌ H₂CO₃ + OH⁻.

Track which species gains and loses a proton. HCO₃⁻ gains a proton to become H₂CO₃, so here HCO₃⁻ is acting as a base and H₂CO₃ is its conjugate acid, that is pair 1 (the H₂CO₃ / HCO₃⁻ pair). H₂O loses a proton to become OH⁻, so H₂O is acting as an acid and OH⁻ is its conjugate base, that is pair 2 (the H₂O / OH⁻ pair). Note that HCO₃⁻ acts as a base here but acts as an acid in other reactions (e.g., HCO₃⁻ + OH⁻ → CO₃²⁻ + H₂O); that dual behavior is exactly what makes it amphoteric.

## pH, pKa, and the Water Equilibrium

Water autoionizes slightly: 2 H₂O ⇌ H₃O⁺ + OH⁻. The equilibrium constant for this, the ion product of water, is Kw = [H⁺][OH⁻] = 1.0×10⁻¹⁴ at 25 °C. In pure water [H⁺] = [OH⁻] = 1.0×10⁻⁷ M, which defines neutrality. Because autoionization is endothermic, raising the temperature increases Kw, so the pH of neutral water drops below 7 above 25 °C, but neutrality (the condition [H⁺] = [OH⁻]) is preserved at every temperature; only its numerical pH value changes.

pH = −log[H⁺], pOH = −log[OH⁻], pH + pOH = 14 (at 25 °C)

pH and pOH are negative base-10 logarithms of the respective molar concentrations. The sum equals pKw = 14 only at 25 °C. A lower pH means a higher [H⁺] and a more acidic solution.

The 'p' operator means '−log₁₀' applied to anything. So pKa = −log(Ka), and pKw = −log(Kw) = 14 at 25 °C. The logarithmic scale is the source of the MCAT's favorite mental-math shortcut: each whole-number change in pH corresponds to a tenfold change in [H⁺]. A solution at pH 3 has 100× the [H⁺] of a solution at pH 5.

TIP

Log estimation without a calculator: if [H⁺] = m × 10⁻ⁿ (with 1 ≤ m < 10), then pH = n − log(m), a value between n−1 and n. Example: [H⁺] = 4.0×10⁻⁵ → pH = 5 − log 4 ≈ 5 − 0.6 = 4.4 (between 4 and 5, closer to 4). Memorize log 2 ≈ 0.3, log 3 ≈ 0.48, log 5 ≈ 0.7 (and log 4 ≈ 0.6, log 8 ≈ 0.9).

Acid strength is quantified by Ka, the acid dissociation constant. For HA ⇌ H⁺ + A⁻, Ka = [H⁺][A⁻]/[HA]. A larger Ka (smaller pKa) means more dissociation and a stronger acid. The base counterpart is Kb. For a conjugate acid base pair, Ka × Kb = Kw, which gives the indispensable relationship pKa + pKb = 14 (at 25 °C). This is why a strong acid necessarily has a very weak conjugate base, and vice versa, though the conjugate base of a STRONG acid (e.g., Cl⁻) is so weak it is essentially neutral, not measurably basic.

pH/pKa landmarks worth memorizing (25 °C)

Quantity	Acidic	Neutral	Basic
pH	< 7	= 7	> 7
[H⁺] vs [OH⁻]	[H⁺] > [OH⁻]	[H⁺] = [OH⁻]	[H⁺] < [OH⁻]
pOH	> 7	= 7	< 7
Relative strength	low pKa = strong acid	·	high conjugate-acid pKa ⇒ stronger base

WORKED EXAMPLE

A solution has [OH⁻] = 2.0×10⁻³ M at 25 °C. What is the pH?

Two valid routes, both giving 11.3. Route 1 (via pOH): pOH = −log(2.0×10⁻³) = 3 − log 2 = 3 − 0.3 = 2.7. Then pH = 14 − pOH = 14 − 2.7 = 11.3. Route 2 (via [H⁺]): [H⁺] = Kw/[OH⁻] = (1.0×10⁻¹⁴)/(2.0×10⁻³) = 5.0×10⁻¹² M; pH = −log(5.0×10⁻¹²) = 12 − log 5 = 12 − 0.7 = 11.3. The solution is basic, consistent with pH > 7 and [OH⁻] > [H⁺].

## Strong vs Weak Acids and Bases

A strong acid dissociates essentially 100% in water, so [H⁺] equals the formal concentration of the acid, no equilibrium calculation is needed. You must recognize the common strong acids on sight: HCl, HBr, HI (but NOT HF), HNO₃, H₂SO₄ (its first proton), and HClO₄. (HClO₃ is also strong but appears far less often; HClO₄ is the perchloric acid you should know.) The strong bases are the hydroxides of the Group 1 metals (LiOH, NaOH, KOH) and the heavier Group 2 metals (Ca(OH)₂, Sr(OH)₂, Ba(OH)₂).

## TRAP

HF is a WEAK acid despite fluorine's high electronegativity. The short, exceptionally strong H F bond resists breaking, and the small F⁻ ion plus strong H-bonding (ion pairing) means HF does not fully dissociate (pKa ≈ 3.2). Halogen acid strength tracks bond strength (which weakens down the group), not electronegativity: HF ≪ HCl < HBr < HI in acid strength.

A weak acid only partially dissociates and sits at equilibrium, so finding [H⁺] requires Ka and (usually) an ICE table. Set up Initial, Change, Equilibrium rows. For HA with initial concentration C: at equilibrium [H⁺] = [A⁻] = x and [HA] = C − x, giving Ka = x²/(C − x). When the acid is weak enough that dissociation is small (a good rule of thumb: C/Ka > ~400, equivalently percent dissociation < 5%), you may approximate C − x ≈ C, so x ≈ √(Ka·C). Always check the 5% criterion afterward; if it fails, solve the full quadratic.

[H⁺] ≈ √(Ka × C) and percent dissociation = ([H⁺]/C) × 100%

Valid only for a weak acid when dissociation is small (x ≪ C). C is the initial (formal) acid concentration. Percent dissociation rises as the acid is diluted, even though [H⁺] itself falls.

A subtle but heavily tested idea: diluting a weak acid INCREASES its percent dissociation (by Le Châtelier, dilution shifts the equilibrium toward the side with more dissolved particles, the dissociated ions) even though the absolute [H⁺] decreases and the pH rises. Strong acids have no such equilibrium, so their percent dissociation stays at ~100% on dilution.

WORKED EXAMPLE

What is the pH of 0.10 M acetic acid (Ka = 1.8×10⁻⁵)?

ICE table: CH₃COOH ⇌ H⁺ + CH₃COO⁻, initial 0.10 / 0 / 0; at equilibrium 0.10−x / x / x. Ka = x²/(0.10−x) = 1.8×10⁻⁵. Check whether x ≪ 0.10: since C/Ka = 0.10/(1.8×10⁻⁵) ≈ 5600 > 400, the approximation is safe. So x ≈ √(1.8×10⁻⁵ × 0.10) = √(1.8×10⁻⁶) ≈ 1.34×10⁻³ M. Confirm: percent dissociation = (1.34×10⁻³)/0.10 ≈ 1.3% (< 5%, OK). pH = −log(1.34×10⁻³) = 3 − log 1.34 ≈ 3 − 0.13 = 2.87. A weak acid at 0.10 M gives pH ≈ 2.9, far less acidic than 0.10 M HCl, which (fully dissociated) would give pH = 1.0.

## Henderson Hasselbalch and How Buffers Work

A buffer is a solution that resists changes in pH when small amounts of acid or base are added. It is made from a weak acid and its conjugate base (e.g., acetic acid + acetate) or a weak base and its conjugate acid (e.g., NH₃ + NH₄⁺) in comparable amounts. The two components act as a chemical sponge: the conjugate base neutralizes added H⁺ (converting to the weak acid), and the weak acid neutralizes added OH⁻ (converting to the conjugate base).

pH = pKa + log([A⁻]/[HA])

The Henderson Hasselbalch equation. [A⁻] is the conjugate-base concentration, [HA] the weak-acid concentration. Because both share the same volume, you may use mole ratios in place of concentration ratios. Valid only when both components are present in appreciable, comparable amounts (i.e., for a buffer), it breaks down near the endpoints of a titration.

Three consequences fall directly out of this equation and are worth internalizing. First, when [A⁻] = [HA], the log term is log(1) = 0, so pH = pKa. This is the heart of buffer design: to make a buffer at a target pH, choose a weak acid whose pKa is as close as possible to that pH. Second, when [A⁻] > [HA] the pH is above the pKa (more conjugate base than acid); when [HA] > [A⁻] the pH is below the pKa. Third, because the relationship is logarithmic, a 10:1 ratio moves the pH only one unit from the pKa, which is exactly why useful buffering is limited to roughly pKa ± 1.

### FIGURE: BUFFER CAPACITY VS PH

A bell-shaped curve plots buffering capacity (y-axis: moles of strong acid/base absorbed per unit pH change) against solution pH (x-axis). The peak sits directly at pH = pKa, where the buffer is most effective and the [A⁻]/[HA] ratio is 1:1. The curve falls off symmetrically on either side, becoming negligible beyond pKa ± 1. The shaded 'buffering region' between pKa − 1 and pKa + 1 spans [A⁻]/[HA] ratios from 1:10 to 10:1. The figure teaches that a buffer is nearly useless far from its pKa because one of the two components is almost exhausted.

## KEY

Buffer capacity (how much added acid/base a buffer can absorb for a given pH change) is maximized when pH = pKa AND when the absolute concentrations of both components are high. A 1 M / 1 M buffer resists change far better than a 0.01 M / 0.01 M buffer at the same pH. Capacity depends on BOTH the ratio (which sets pH relative to pKa) and the total amount of buffer.

## TRAP

Adding water dilutes both [A⁻] and [HA] by the same factor, so their RATIO is unchanged, dilution does NOT change a buffer's pH (to a first approximation). It does, however, lower the buffer's capacity. The MCAT loves to ask what happens to buffer pH on dilution; the answer is essentially 'it stays the same.'

WORKED EXAMPLE

You mix 0.30 mol of acetic acid (pKa = 4.74) and 0.30 mol of sodium acetate in 1.0 L of water. What is the pH? Then you add 0.10 mol of solid NaOH (assume negligible volume change). What is the new pH?

Initial buffer: [A⁻]/[HA] = 0.30/0.30 = 1, so pH = pKa + log(1) = 4.74. After adding 0.10 mol OH⁻: the strong base consumes the weak acid, converting HA to A⁻. New HA = 0.30 − 0.10 = 0.20 mol; new A⁻ = 0.30 + 0.10 = 0.40 mol. pH = 4.74 + log(0.40/0.20) = 4.74 + log 2 = 4.74 + 0.30 = 5.04. The pH rose only 0.30 units despite adding a strong base, that is the buffer at work. (For comparison, adding 0.10 mol OH⁻ to 1 L of pure water would give [OH⁻] = 0.10 M, pOH = 1, and pH = 13.)

## Titration Curves and Their Key Points

A titration adds a known titrant (usually a strong acid or strong base, of known concentration) to an analyte while tracking pH. The resulting curve encodes the analyte's strength, its pKa, and the equivalence point. For a weak acid titrated with strong base you must be able to read four landmarks: the initial pH, the buffering region, the half-equivalence point, and the equivalence point.

### FIGURE: WEAK ACID TITRATED WITH STRONG BASE

The x-axis is volume of NaOH added; the y-axis is pH. The curve starts at a moderate pH (e.g., ~3, higher than a strong acid's start, because the weak acid only partly dissociates). It rises gently through a flat 'buffer region' plateau, passes through the half-equivalence point where pH = pKa (the flattest, most level part of the buffer region), then climbs steeply through a sharp near-vertical jump at the equivalence point (which lies ABOVE pH 7, around 8 9, because the solution there contains only the conjugate base). After the equivalence point the curve flattens again as excess strong base dominates. The figure teaches that the flat middle region is where buffering occurs and that the equivalence pH is basic for a weak-acid/strong-base titration.

The half-equivalence point is the single most tested feature. At this point exactly half the weak acid has been neutralized, so [HA] = [A⁻], and Henderson Hasselbalch collapses to pH = pKa. You can therefore read a weak acid's pKa straight off the curve: find the equivalence-point volume, halve it, and read the pH at that half-volume. The half-equivalence point is also where the curve is flattest (least change in pH per added titrant), the point of maximum buffer capacity.

The equivalence point is where moles of titrant equal the moles of analyte (the neutralization reaction is stoichiometrically complete). Its pH depends on what species remain: a strong acid + strong base gives a neutral salt and pH = 7; a weak acid + strong base leaves the conjugate base, so pH > 7; a weak base + strong acid leaves the conjugate acid, so pH < 7. Do not confuse the equivalence point (a stoichiometric fact) with the endpoint (the observed indicator color change); a well-chosen indicator makes the endpoint and equivalence point nearly coincide.

Equivalence-point pH by titration type

Titration	Species at equivalence	pH at equivalence
Strong acid + strong base	Neutral salt (e.g., NaCl)	= 7
Weak acid + strong base	Conjugate base (e.g., acetate)	> 7 (basic)
Weak base + strong acid	Conjugate acid (e.g., NH₄⁺)	< 7 (acidic)
Strong acid + weak base	Conjugate acid	< 7 (acidic)

TIP

Choose an indicator whose color-change range (roughly pKa(indicator) ± 1) brackets the steep near-vertical region of the titration curve, i.e., near the equivalence-point pH. For a weak-acid/strong-base titration (equivalence ~8 9), phenolphthalein (changes ~8 10) is ideal; methyl orange (~3.1 4.4) would change far too early.

WORKED EXAMPLE

A 25.0 mL sample of an unknown monoprotic weak acid is titrated with 0.100 M NaOH. The equivalence point occurs at 20.0 mL of NaOH added, and the pH at 10.0 mL added is 4.20. What is the acid's pKa and its original concentration?

pKa: The half-equivalence point is at half the equivalence volume = 10.0 mL. By definition, at the half-equivalence point [HA] = [A⁻] so pH = pKa; therefore pKa = 4.20 directly. Concentration: at the equivalence point, moles of OH⁻ added = moles of acid originally present. Moles OH⁻ = 0.100 M × 0.0200 L = 2.00×10⁻³ mol. So the acid started as 2.00×10⁻³ mol in 25.0 mL: concentration = (2.00×10⁻³ mol)/(0.0250 L) = 0.0800 M. The acid is 0.0800 M with pKa 4.20.

## Polyprotic Acids, Amphoteric Species, and Amino Acids

A polyprotic acid can donate more than one proton, and it does so in discrete steps, each with its own Ka. Examples include diprotic H₂CO₃ (carbonic) and H₂SO₄ (sulfuric, strong in its first proton, weak in its second), and triprotic H₃PO₄ (phosphoric). The successive dissociation constants always decrease (Ka1 > Ka2 > Ka3), typically by several orders of magnitude, because it is progressively harder to pull a positively charged proton away from an increasingly negatively charged species.

H₃PO₄ ⇌ H₂PO₄⁻ ⇌ HPO₄²⁻ ⇌ PO₄³⁻ (pKa1 ≈ 2.1, pKa2 ≈ 7.2, pKa3 ≈ 12.4)

Each arrow represents the loss of one H⁺ with its own pKa. The middle species (H₂PO₄⁻ and HPO₄²⁻) are amphoteric and form the physiologically important phosphate buffer; pKa2 ≈ 7.2 sits near intracellular/blood pH, which is why this buffer works well in cells.

### FIGURE: TITRATION CURVE OF A TRIPROTIC ACID

pH (y-axis) versus volume of strong base added (x-axis) for H₃PO₄. The curve shows a staircase with TWO clear steep jumps (the first two equivalence points) separated by buffering plateaus; the third equivalence point is poorly defined and barely visible because pKa3 (~12.4) is so high that it overlaps the basic end of the scale. The midpoint of the first plateau sits at pH ≈ pKa1, the midpoint of the second plateau at pH ≈ pKa2, and so on. Each plateau is a buffer region centered on a pKa. The figure teaches that a polyprotic acid produces multiple equivalence points and buffers best near each pKa.

Amino acids are the MCAT's favorite polyprotic case because they bridge general chemistry and biochemistry. A simple amino acid carries a protonated amino group ( NH₃⁺, pKa ≈ 9 10) and a carboxyl group ( COOH / COO⁻, pKa ≈ 2). At intermediate pH both charges are present and the net charge is zero, this neutral, doubly-charged form is the zwitterion. As pH rises from very low, the carboxyl deprotonates first (it is the stronger acid, lower pKa), then the amino group deprotonates.

The isoelectric point (pI) is the pH at which the molecule carries no net charge. For an amino acid with only two ionizable groups, pI = (pKa1 + pKa2)/2, the average of the two pKa values that flank the zwitterionic (net-neutral) form. For an amino acid with an ionizable side chain (acidic or basic R group), pI is still the average of the two pKa values that bracket the net-neutral species, but you must first identify which two those are from the structure (for an acidic side chain, average the two lowest pKa's; for a basic side chain, average the two highest).

## KEY

At pH below its pI, an amino acid carries a net POSITIVE charge (it is more protonated → migrates toward the cathode, the negative electrode, in electrophoresis). At pH above its pI, it carries a net NEGATIVE charge (migrates toward the anode, the positive electrode). At pH = pI, the net charge is zero and it does not migrate.

WORKED EXAMPLE

Glycine has pKa1 ( COOH) = 2.3 and pKa2 ( NH₃⁺) = 9.6. What is its pI, and what is its predominant form and net charge at physiological pH 7.4?

pI: Glycine has only two ionizable groups, so the net-neutral (zwitterionic) form is flanked by these two pKa's. pI = (2.3 + 9.6)/2 = 11.9/2 = 5.95. Form/charge at pH 7.4: compare 7.4 to each pKa. Since 7.4 > 2.3, the carboxyl is essentially fully deprotonated ( COO⁻, charge −1). Since 7.4 < 9.6, the amino group is still essentially protonated ( NH₃⁺, charge +1). So the dominant molecular form is the zwitterion, with net charge +1 − 1 = 0. However, because pH 7.4 > pI (5.95), the equilibrium population on average carries a slight net NEGATIVE charge (a small fraction has lost the NH₃⁺ proton), so at pH 7.4 glycine would migrate slowly toward the anode in electrophoresis.

## Salt Hydrolysis and Physiological Buffers

Dissolving a salt can make a solution acidic, basic, or neutral depending on the parent acid and base of its ions. The rule: an ion that is the conjugate of a STRONG acid or base is a spectator (it does not affect pH), while an ion that is the conjugate of a WEAK acid or base will hydrolyze water and shift the pH. This is just the Ka × Kb = Kw logic applied to the dissolved ions.

Predicting the pH of a salt solution

Cation from	Anion from	Resulting pH
Strong base (e.g., Na⁺)	Strong acid (e.g., Cl⁻)	Neutral (pH = 7), e.g., NaCl
Strong base (e.g., Na⁺)	Weak acid (e.g., CH₃COO⁻)	Basic (pH > 7), e.g., sodium acetate
Weak base (e.g., NH₄⁺)	Strong acid (e.g., Cl⁻)	Acidic (pH < 7), e.g., ammonium chloride
Weak base cation	Weak acid anion	Compare Ka of cation vs Kb of anion to decide

The most physiologically important buffer is the bicarbonate buffer system, which holds blood pH near 7.4. Carbonic acid (H₂CO₃) and bicarbonate (HCO₃⁻) form the conjugate pair, and the system is OPEN: it is coupled to dissolved CO₂ and to gas exchange in the lungs, which lets the body adjust it dynamically rather than letting either component run out.

CO₂(aq) + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻

The left equilibrium ties blood pH to respiration: exhaling CO₂ pulls the equilibria to the left, consuming H⁺ and raising pH; retaining CO₂ pushes them right, lowering pH. The lungs control CO₂ (fast); the kidneys regulate [HCO₃⁻] (slow). This is why hyperventilation → respiratory alkalosis and hypoventilation → respiratory acidosis.

TIP

The apparent pKa of the bicarbonate system (~6.1) is more than a full unit below blood pH (7.4), which would normally make a CLOSED buffer weak there. Yet the system is highly effective because it is OPEN: the lungs continuously remove CO₂ and the kidneys adjust HCO₃⁻, so neither component is depleted. This 'open system' point is a favorite MCAT distinction, effectiveness here comes from physiological replenishment, not from sitting at pH = pKa.

Two other biological buffers appear on the MCAT: the phosphate buffer (H₂PO₄⁻/HPO₄²⁻, pKa2 ≈ 7.2) is important intracellularly and in urine, where its pKa near 7 makes it genuinely effective; and protein/hemoglobin buffering relies on ionizable amino acid side chains, especially the imidazole of histidine (pKa ≈ 6), which is well suited to operate near physiological pH. Recognizing why a buffer with a pKa near 7 is physiologically useful (it is close enough to pH 7.4 to have meaningful capacity) ties this whole chapter together.
