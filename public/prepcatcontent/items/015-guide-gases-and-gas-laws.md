---
source: PrepCat content library
exported_at: 2026-07-12T05:25:52.137Z
item_number: 15
type: "GUIDE"
title: "Gases & Gas Laws"
meta: "~26 min · 7 sections · cheat sheet"
---

Guide
Cheat sheet
CHEM & PHYS
~26 min read
# Gases & Gas Laws

Gases are the most mathematically tractable phase, so the MCAT leans on them heavily: the ideal gas law and its corollaries let you predict P, V, T, and n in dozens of disguises, while kinetic molecular theory explains why those laws work and exactly when they break. Expect partial-pressure problems, effusion ratios, gas-density identification, and "is this gas behaving ideally?" reasoning on test day.

## ON THIS PAGE

## The Ideal Gas Law and Its Building Blocks

## The Simple Gas Laws: Proportionality Shortcuts

## Dalton's Law and Partial Pressures

## Kinetic Molecular Theory: Why the Laws Work

## Effusion, Diffusion, and Graham's Law

## Real Gases: When Ideal Behavior Breaks Down

## MCAT Applications: Density, Gas Collection, and Stoichiometry

## KEY ESSENTIALS

PV = nRT, and temperature is ALWAYS in kelvin. Use R = 0.0821 L·atm/(mol·K) for P V math and R = 8.314 J/(mol·K) for energy or v_rms.
At STP (0 °C, 1 atm) one mole of ideal gas occupies 22.4 L, the fastest shortcut on the test.
Dalton's law: P_A = X_A × P_total, with mole fraction computed from MOLES, not mass.
Average translational KE = (3/2)k_BT depends ONLY on temperature; at the same T all gases share equal average KE, but lighter gases move faster (v_rms = √(3RT/M)).
Graham's law: rate₁/rate₂ = √(M₂/M₁); the lighter gas effuses faster, and ½ the rate means 4× the mass.
Real gases deviate most at HIGH pressure and LOW temperature; attractions lower observed P, finite molecular volume raises it. Deviations vanish as P→0 and T→high.
When collecting gas over water, subtract the water vapor pressure: P_gas = P_total − P_H₂O.

## The Ideal Gas Law and Its Building Blocks

Almost everything about gases on the MCAT funnels into one master equation: the ideal gas law. It ties together the four state variables that describe any gas sample, pressure (P), volume (V), the number of moles of gas (n), and absolute temperature (T). The word 'ideal' means we are modeling a hypothetical gas whose particles have negligible volume and no intermolecular attractions. That approximation is remarkably accurate for real gases under ordinary conditions, and the MCAT expects you to apply it by default unless a question signals high pressure, low temperature, or 'real gas' behavior.

PV = nRT

P = pressure, V = volume, n = moles of gas, R = universal gas constant, T = absolute temperature in KELVIN (never Celsius).

The single most common error on gas problems is forgetting to convert temperature to kelvin. The ideal gas law, Charles's law, and Gay-Lussac's law all require absolute temperature, because a gas at 0 °C is not 'zero' anything, it still has volume and pressure. Always write T(K) = T(°C) + 273. A second pitfall is mismatching the units of your data with the gas constant R.

Two values of R you must know

Value of R	Units	Use when...
0.0821	L·atm / (mol·K)	P is in atm and V is in liters (most gas-law math)
8.314	J / (mol·K)	you need energy: kinetic theory, ΔG, work, or rms speed

TIP

Let the units in the problem (and the answer choices) pick R for you. If pressure is in atm and volume in liters, use 0.0821. If you are computing kinetic energy or root-mean-square speed (which involve joules), switch to 8.314 and express molar mass in kg/mol.

Two reference points make estimation fast. STP (standard temperature and pressure) is defined as 0 °C (273 K) and 1 atm; at STP, one mole of any ideal gas occupies the molar volume of 22.4 L. (IUPAC has redefined STP to 0 °C and 1 bar, giving 22.7 L, but the MCAT and most prep material still use 1 atm and 22.4 L, go with 22.4 L.) A separate convention sometimes called SATP uses 25 °C and 1 atm, where the molar volume is about 24.5 L; unless a question states 25 °C, default to 22.4 L at 0 °C. Recognizing the 22.4 L molar volume lets you convert between moles and volume at STP without ever plugging into PV = nRT.

WORKED EXAMPLE

A 5.00 L rigid steel tank holds nitrogen gas at 27 °C and 3.00 atm. How many moles of N₂ are in the tank?

Convert temperature: T = 27 + 273 = 300 K. Choose R = 0.0821 L·atm/(mol·K) because the data are in atm and liters. Rearrange PV = nRT to n = PV/(RT). Plug in: n = (3.00 atm × 5.00 L) / (0.0821 × 300 K) = 15.0 / 24.63 = 0.609 mol. Sanity check: at STP one mole fills 22.4 L; here the pressure is tripled and the temperature is only slightly above 273 K, while the volume is just 5 L, so we expect well under one mole, 0.61 mol fits.

## The Simple Gas Laws: Proportionality Shortcuts

Before the ideal gas law unified them, chemists discovered each pairwise relationship separately. The MCAT rarely asks you to name them, but it constantly asks you to reason with the proportionalities they capture, 'if I double the pressure at constant temperature, what happens to volume?' Each simple law is just PV = nRT with two variables held constant, so you can always re-derive them, but recognizing the pattern instantly saves time.

The simple gas laws

Law	Held constant	Relationship	In words
Boyle's	n, T	P₁V₁ = P₂V₂	P and V are inversely proportional
Charles's	n, P	V₁/T₁ = V₂/T₂	V and T are directly proportional
Gay-Lussac's	n, V	P₁/T₁ = P₂/T₂	P and T are directly proportional
Avogadro's	P, T	V₁/n₁ = V₂/n₂	V and moles are directly proportional

Stitch any two together and you get the combined gas law, the workhorse for 'before and after' problems where the amount of gas is fixed but conditions change. Because n and R are constant for a sealed sample, the quantity PV/T stays constant.

(P₁V₁) / T₁ = (P₂V₂) / T₂

Subscripts 1 and 2 are the initial and final states of the SAME fixed amount of gas. T must be in kelvin. Use this whenever the number of moles doesn't change.

## KEY

Avogadro's law is the conceptual key to many MCAT problems: equal volumes of gases at the same temperature and pressure contain equal numbers of molecules. So at fixed T and P, volume ratios equal mole ratios, handy for the stoichiometry of gaseous reactions (in 2 H₂ + O₂ → 2 H₂O, 2 volumes of H₂ react with 1 volume of O₂).

WORKED EXAMPLE

A weather balloon holds 10.0 L of helium at ground level (1.00 atm, 300 K). It rises to where the pressure is 0.500 atm and the temperature is 250 K. What is its new volume?

Moles of He are fixed, so use the combined gas law solved for V₂: V₂ = V₁ × (P₁/P₂) × (T₂/T₁). Plug in: V₂ = 10.0 L × (1.00/0.500) × (250/300) = 10.0 × 2.00 × 0.833 = 16.7 L. Reason it out as a check: halving the pressure alone would double the volume to 20 L (Boyle), but cooling from 300 to 250 K shrinks it by the factor 250/300 ≈ 0.83, giving ~16.7 L. The pressure drop dominates, so the balloon expands, exactly why high-altitude balloons are launched only partly inflated, leaving room to expand.

## Dalton's Law and Partial Pressures

Real gas samples are usually mixtures, dry air is roughly 78% N₂, 21% O₂, and 1% Ar, plus traces. Because ideal gas particles don't interact, each component behaves as if it alone occupied the entire container. Dalton's law states that the total pressure of a gas mixture equals the sum of the partial pressures each gas would exert on its own.

P_total = P_A + P_B + P_C + ...

Each P_i is the partial pressure of component i, the pressure that gas would exert if it alone filled the container at the same T and V.

The practical computational tool is the mole fraction. A component's partial pressure equals its mole fraction times the total pressure. This is the relationship the MCAT tests most often, and the classic trap is computing the mole fraction from masses instead of moles.

P_A = X_A × P_total, where X_A = n_A / n_total

X_A is the mole fraction of A (a unitless number between 0 and 1). n_A is moles of A; n_total is total moles of all gases. The mole fractions of all components sum to 1.

## TRAP

Mole fraction uses MOLES, not grams and not mass percent. If a question gives you grams, convert each component to moles first by dividing by its molar mass. A 50/50 mixture by mass of H₂ and O₂ is nowhere near 50/50 by moles, because O₂ is 16× heavier per molecule, so the same mass contains 16× more moles of H₂ than of O₂.

### FIGURE: PARTIAL PRESSURES IN A MIXTURE

A sealed 1 L box at fixed temperature contains 3 red O₂ molecules and 7 blue N₂ molecules. The figure shows that ~70% of the wall collisions come from blue particles and ~30% from red, so the blue gas contributes 70% of the total pressure and the red gas 30%. A stacked bar on the side places P(N₂) = 0.70·P_total on top of P(O₂) = 0.30·P_total, visually summing to P_total. Key teaching point: partial pressure tracks the FRACTION of molecules (mole fraction), not their size or mass.

WORKED EXAMPLE

A 2.0 L vessel contains 4.0 g of helium (M = 4 g/mol) and 16 g of oxygen, O₂ (M = 32 g/mol) at a total pressure of 1.5 atm. What is the partial pressure of oxygen?

Convert to moles. Helium: 4.0 g ÷ 4 g/mol = 1.0 mol. Oxygen: 16 g ÷ 32 g/mol = 0.50 mol. Total = 1.5 mol. Mole fraction of O₂: X(O₂) = 0.50 / 1.5 = 0.33. Partial pressure: P(O₂) = X(O₂) × P_total = 0.33 × 1.5 atm = 0.50 atm. Notice the volume and temperature were red herrings once you had the total pressure, partial pressure only needs the mole fraction and P_total. Also note that despite each O₂ being heavier, oxygen contributes only a third of the pressure because there are fewer moles of it.

TIP

Partial pressures, not concentrations, drive gas exchange in physiology. Oxygen moves from alveolar air (high P_O₂) into blood (lower P_O₂) down its partial-pressure gradient, a favorite MCAT crossover with biology. Henry's law extends this idea: at a given temperature, the amount of a gas that dissolves in a liquid is proportional to that gas's partial pressure above the liquid (C = k_H·P).

## Kinetic Molecular Theory: Why the Laws Work

The ideal gas law is empirical, it describes what gases do. Kinetic molecular theory (KMT) is the microscopic model that explains why. The MCAT loves KMT because it links a macroscopic measurement (temperature, pressure) to molecular motion, and because its assumptions tell you exactly when 'ideal' breaks down.

The five assumptions of an ideal gas (KMT)

Assumption	Consequence
Gas particles are in constant, random, straight-line motion	Pressure arises from countless collisions with the walls
The volume of the particles themselves is negligible vs. the container	Most of the gas volume is empty space
There are no intermolecular forces (no attraction or repulsion between particles)	Particles travel freely until they collide
All collisions are perfectly elastic	No net loss of kinetic energy; total KE is conserved
Average kinetic energy is proportional to absolute temperature	Temperature is a direct measure of average molecular motion

The fifth assumption is the conceptual heart of the test's favorite questions. The average translational kinetic energy of gas particles depends ONLY on temperature, not on the identity, mass, or size of the gas. Two gases at the same temperature have the same average kinetic energy per molecule, period.

KE_avg = (3/2) k_B T (per molecule) = (3/2) RT (per mole)

KE_avg = average translational kinetic energy, k_B = Boltzmann constant (1.38×10⁻²³ J/K), R = gas constant (8.314 J/(mol·K)), T = absolute temperature in K. Depends on T alone, not on molar mass.

If kinetic energy is the same but mass differs, speed must differ. Because KE = ½mv², lighter molecules must move faster to carry the same energy. The characteristic speed we use is the root-mean-square (rms) speed, the square root of the average of the squared molecular speeds. Heavier gas, slower particles.

v_rms = √(3RT / M)

v_rms = root-mean-square molecular speed (m/s), R = 8.314 J/(mol·K), T = temperature in K, M = molar mass in kg/mol (NOT g/mol). Speed rises with √T and falls with √M.

## TRAP

Two unit traps in v_rms: (1) use R = 8.314, not 0.0821, because you want joules; (2) molar mass must be in kg/mol. Oxygen is 0.032 kg/mol, not 32. Forgetting the kg conversion makes M too large by 1000, inflating your computed speed by a factor of √1000 ≈ 31.

### FIGURE: MAXWELL BOLTZMANN SPEED DISTRIBUTION

A graph with molecular speed on the x-axis and the fraction of molecules on the y-axis, showing a right-skewed hump. Three curves are drawn for the same gas at three temperatures (cold, warm, hot). As temperature rises, the peak shifts RIGHT (higher most-probable speed) and the curve flattens and broadens (a wider spread of speeds), but the area under each curve stays equal to 1 (the whole population of molecules). The figure teaches that (a) at any temperature there is a distribution of speeds, not a single speed; (b) the ordering is most-probable speed < average speed < rms speed; and (c) heating both widens and right-shifts the distribution. A second panel compares a light gas (He) and a heavy gas (Xe) at the SAME temperature: He's curve sits far to the right, lighter means faster.

## Effusion, Diffusion, and Graham's Law

Because lighter gases move faster at a given temperature, they escape through tiny holes more quickly. Effusion is the passage of gas through a single pinhole into a vacuum; diffusion is the gradual spreading and mixing of one gas through another. Graham's law quantifies both with the same √-mass relationship that falls straight out of v_rms.

rate₁ / rate₂ = √(M₂ / M₁)

rate = how fast a gas effuses (or diffuses), M = molar mass. The lighter gas (smaller M) is the FASTER one, so its rate is larger. Notice the masses appear UNDER the square root and are SWAPPED relative to the rates.

## KEY

Watch the direction of the ratio. The faster (lighter) gas goes on top of the rate ratio, but its mass goes in the DENOMINATOR under the root. Flipping this is the single most common effusion error. Sanity check: hydrogen (M = 2) should effuse faster than oxygen (M = 32), and √(32/2) = 4, so H₂ effuses 4× faster. If your answer says oxygen is faster, you flipped it.

Effusion rate is inversely proportional to √M, so a heavier gas takes longer to effuse the same amount of gas. Equivalently, the TIME to effuse a fixed quantity is proportional to √M, heavier gases take more time. The MCAT may phrase a question in terms of rate or in terms of time, so read carefully: rate and time are reciprocals of each other.

WORKED EXAMPLE

An unknown gas effuses at one-half the rate of helium (M = 4 g/mol) under identical conditions. What is the molar mass of the unknown gas?

Let the unknown be gas 1 and helium gas 2. We are told rate(unknown)/rate(He) = 1/2. Graham's law: rate₁/rate₂ = √(M₂/M₁), so 1/2 = √(4/M₁). Square both sides: 1/4 = 4/M₁. Solve: M₁ = 4 × 4 = 16 g/mol. Conceptual check: the unknown is slower, so it must be heavier than helium, and indeed 16 > 4. (Methane, CH₄, has M = 16, a plausible identity.) Quick rule: if a gas effuses half as fast, it is four times heavier, because rate scales with 1/√M and a factor of 1/2 in rate means a factor of 4 in mass.

TIP

Effusion can separate isotopes: historical uranium enrichment used gaseous UF₆, exploiting the tiny mass difference between ²³⁵UF₆ and ²³⁸UF₆. The MCAT won't ask the engineering, but it may ask 'which isotope-bearing gas effuses faster?', always the one with the lighter isotope.

## Real Gases: When Ideal Behavior Breaks Down

Real gases obey PV = nRT closely under ordinary lab conditions, but the ideal model makes two false assumptions, zero molecular volume and zero intermolecular forces, that matter when molecules are crowded together or moving slowly. Knowing the DIRECTION of each deviation is exactly what the MCAT tests.

Deviations are largest at HIGH pressure and LOW temperature. At high pressure the gas is compressed, so the particles' own volume is no longer negligible compared with the container, and they are close enough for attractions to act. At low temperature the particles move slowly, so weak intermolecular attractions have time to pull them together. Conversely, as pressure → 0 and temperature → high, real gases approach ideal behavior, because the particles are far apart and moving too fast to 'feel' one another.

Two corrections and their opposite effects

Effect	What it does	Result vs. ideal prediction
Intermolecular ATTRACTIONS (dominant at moderately high P and low T)	Pull molecules toward each other, softening their collisions with the walls	Observed P is LOWER than ideal
Finite molecular VOLUME (dominant at very high P)	Particles occupy real space, so the free volume is less than the container volume	Free volume is LESS than ideal, pushing observed P HIGHER than ideal

The van der Waals equation patches both flaws with two empirical constants. You won't need to crunch it numerically on the MCAT, but you must interpret what the constants a and b represent.

(P + a·n²/V²)(V − nb) = nRT

a corrects for intermolecular ATTRACTIONS (added to the observed P because attractions lower it); b corrects for the finite VOLUME of the molecules themselves (subtracted from V). Larger a = stronger attractions; larger b = bigger molecules.

## KEY

Map the constants to molecular properties. A gas with strong intermolecular forces (polar, hydrogen bonding, or large and easily polarized) has a LARGE a. A physically large molecule has a LARGE b. So water vapor (hydrogen bonding) has a high a, while a small noble gas like helium has tiny a and b and is nearly ideal. Helium is the closest-to-ideal common gas because its atoms are small and barely attract one another.

### FIGURE: COMPRESSIBILITY FACTOR Z VS. PRESSURE

A plot of the compressibility factor Z = PV/(nRT) on the y-axis against pressure on the x-axis, with a horizontal dashed line at Z = 1 marking ideal behavior. A typical real-gas curve first DIPS below 1 at low-to-moderate pressure (attractions dominate, so the gas is more compressible than ideal and its actual PV product is less than nRT), then RISES above 1 at high pressure (the molecules' own volume dominates, so the gas resists compression more than ideal). The figure teaches that Z < 1 signals attraction-dominated behavior, Z > 1 signals volume/repulsion-dominated behavior, and all curves return toward Z = 1 as pressure approaches zero.

WORKED EXAMPLE

At low temperature and moderately high pressure, would the pressure of a real gas with significant intermolecular attractions be higher or lower than the ideal gas law predicts, and why?

LOWER than ideal. The ideal gas law assumes a particle feels nothing until the instant it strikes the wall. In a real gas with attractions, neighboring molecules tug a wall-bound molecule back toward the bulk just as it is about to hit the wall, so each collision is slightly less forceful. Fewer/softer wall impacts mean a lower measured pressure than PV = nRT would predict. This is exactly the regime the 'a' term (P + an²/V²) accounts for: you ADD a correction to the observed pressure to recover the ideal value, which confirms the observed pressure sits below ideal. (At extremely high pressure the finite-volume 'b' effect can dominate and push pressure above ideal, but as you raise pressure from low values the attraction effect shows up first.)

## MCAT Applications: Density, Gas Collection, and Stoichiometry

Test questions rarely hand you a clean 'solve for n' setup. They wrap the gas laws in density, vapor pressure, or reaction stoichiometry. Three application patterns cover most of what you'll see.

First, gas density and molar mass. Starting from PV = nRT and substituting n = mass/M lets you connect density (mass per volume) to molar mass. This is how you identify an unknown gas from a measured density.

density = PM / RT (rearranged from PV = nRT)

density = mass/volume of the gas, P = pressure, M = molar mass, R = 0.0821 L·atm/(mol·K) (with P in atm), T = temperature in K. At fixed P and T, a denser gas has a higher molar mass.

TIP

Because density ∝ P/T at fixed molar mass, gases get LESS dense when heated (hot air rises, the basis of hot-air balloons and convection) and MORE dense when compressed. And because density ∝ M at fixed P and T, you can rank gas densities just by molar mass: CO₂ (44 g/mol) is denser than air (~29 g/mol), which is why CO₂ pools low and can displace breathable air in enclosed spaces.

Second, collecting a gas over water. A classic lab setup bubbles a gas up through water into an inverted, water-filled container. The collected gas is mixed with water vapor, which contributes its own pressure (the vapor pressure of water at that temperature). By Dalton's law you must subtract that vapor pressure to get the pressure of the dry gas you actually produced.

P_gas (dry) = P_total − P_H₂O(vapor)

P_total is the measured total pressure (often set equal to atmospheric pressure once the inside and outside water levels are equalized); P_H₂O is the temperature-dependent vapor pressure of water. The remainder is the partial pressure of the collected dry gas.

WORKED EXAMPLE

Hydrogen gas is collected over water at 25 °C until the total pressure equals atmospheric pressure, 760 torr. The vapor pressure of water at 25 °C is 24 torr. If the collected volume is 0.500 L, how many moles of H₂ were produced? (R = 0.0821 L·atm/(mol·K))

Step 1, get the partial pressure of dry H₂: P(H₂) = P_total − P(H₂O) = 760 − 24 = 736 torr. Step 2, convert to atm: 736 torr ÷ 760 torr/atm = 0.968 atm. Step 3, apply PV = nRT with T = 25 + 273 = 298 K: n = PV/(RT) = (0.968 atm × 0.500 L)/(0.0821 × 298) = 0.484 / 24.47 = 0.0198 mol. The forgotten-vapor trap: if you had wrongly used the full 760 torr (1.00 atm), you'd compute about 0.0204 mol, roughly 3% too high. On test day that wrong-but-close value is usually a listed distractor, so always subtract the water vapor pressure first.

Third, reaction stoichiometry with gases. Avogadro's law means that for gases at the same T and P, mole ratios equal volume ratios, so you can run the stoichiometry directly in volumes. If 2 L of H₂ react with 1 L of O₂ to form water, that is the same 2:1 ratio as the balanced equation, no mole conversion needed, as long as every species being compared is a gas at the same temperature and pressure.

## KEY

Decision tree for any gas problem: (1) One state or a change between two states? One state → PV = nRT. Before/after with fixed n → combined gas law. (2) Is it a mixture? Use mole fractions and Dalton's law. (3) Does it involve speed, energy, or effusion? Use KMT (v_rms = √(3RT/M), KE_avg ∝ T, Graham's law). (4) Does it warn about high P or low T, or ask about deviations? Invoke real-gas reasoning (van der Waals a and b). Matching the question type to the right tool is most of the battle.
