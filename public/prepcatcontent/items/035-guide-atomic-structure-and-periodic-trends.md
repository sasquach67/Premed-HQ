---
source: PrepCat content library
exported_at: 2026-07-12T05:26:26.508Z
item_number: 35
type: "GUIDE"
title: "Atomic Structure and Periodic Trends"
meta: "~30 min · 6 sections · cheat sheet"
---

Guide
Cheat sheet
CHEM & PHYS
~30 min read
# Atomic Structure and Periodic Trends

Atomic structure explains how protons, neutrons, and electrons are arranged, and the quantum model predicts how electrons fill orbitals. Those configurations, governed by effective nuclear charge, drive every periodic trend the MCAT tests.

## ON THIS PAGE

## The Atom: Particles, Isotopes, and Atomic Mass

## The Quantum Model: From Bohr to Orbitals

## Electron Configuration: Aufbau, Hund, and Pauli

## Effective Nuclear Charge and the Logic of the Periodic Table

## The Major Periodic Trends

## Successive Ionization, Isoelectronic Series, and MCAT Anomalies

## KEY ESSENTIALS

Atomic number (Z) = number of protons = the element's identity; mass number (A) = protons + neutrons; isotopes share Z but differ in neutron count. The periodic-table atomic mass is the abundance-weighted average of the isotopes.
Four quantum numbers (n, l, ml, ms) uniquely specify each electron (Pauli exclusion). Subshell capacities are s = 2, p = 6, d = 10, f = 14, and a shell holds at most 2n² electrons.
Fill orbitals by Aufbau (low to high energy), Hund's rule (singly, parallel spins, before pairing), and Pauli (paired electrons have opposite spins). Cr and Cu are the classic half-filled/filled-d exceptions; remove 4s before 3d when forming cations.
Effective nuclear charge (Zeff = Z − shielding) is the engine of every trend: it rises sharply left to right across a period and stays roughly constant down a group.
Atomic radius DECREASES across a period and INCREASES down a group; ionization energy, electronegativity, and electron-affinity magnitude do the OPPOSITE. Cations are smaller than their parent atoms; anions are larger.
Fluorine is the most electronegative element. Ionization energy is always positive and rises with each successive electron, with a huge jump once you breach the noble-gas core.
In an isoelectronic series, more protons pull the fixed electron cloud tighter, so radius shrinks as Z rises (N³⁻ > O²⁻ > F⁻ > Ne > Na⁺ > Mg²⁺ > Al³⁺).

## The Atom: Particles, Isotopes, and Atomic Mass

An atom has two regions: a tiny, dense nucleus containing protons and neutrons, surrounded by a diffuse cloud of electrons. The nucleus holds essentially all of the atom's mass yet occupies a vanishingly small fraction of its volume, if an atom were the size of a stadium, the nucleus would be a marble at center field and everything else is electron cloud (mostly empty space). The MCAT cares less about that geometry than about the bookkeeping: how we count the three particles and what each count controls.

The three subatomic particles

Particle	Relative charge	Mass (amu)	Location
Proton	+1	≈ 1.007	Nucleus
Neutron	0	≈ 1.009	Nucleus
Electron	−1	≈ 1/1836 (≈ 0.00055)	Orbitals (electron cloud)

Two integers summarize every nucleus. The atomic number (Z) is the number of protons, and it alone defines the element, every carbon atom has Z = 6, no exceptions. The mass number (A) is the total count of protons plus neutrons (the nucleons), so the neutron count is simply A − Z. Standard isotope notation writes A as a leading superscript and Z as a leading subscript before the symbol. A neutral atom has equal numbers of protons and electrons, and chemistry is run almost entirely by those electrons, which is why Z (which fixes the electron count of the neutral atom) determines an element's identity and behavior.

Isotopes are atoms of the same element (same Z) that differ in neutron number, and therefore in mass number A. Carbon's isotopes are carbon-12 (6 neutrons, ~98.9% of natural carbon), carbon-13 (7 neutrons, ~1.1%), and trace radioactive carbon-14 (8 neutrons, used in radiocarbon dating). Hydrogen's three isotopes even get their own names: protium (no neutrons), deuterium (one neutron), and radioactive tritium (two neutrons). Because isotopes share the same electron configuration, they are nearly identical chemically; they differ measurably only in mass-dependent properties such as density, certain reaction rates, and nuclear stability.

The atomic mass printed on the periodic table is not the mass of any single atom, it is the abundance-weighted average mass of all naturally occurring isotopes, expressed in atomic mass units (amu, also called daltons). One amu is defined as exactly 1/12 the mass of a carbon-12 atom, which is why carbon-12's mass is exactly 12 amu by definition. To compute the average, multiply each isotope's mass by its fractional abundance and sum. The result tells you which isotope dominates: chlorine's average of 35.45 sits much closer to 35 than to 37, a tip-off that chlorine-35 is the more abundant isotope.

WORKED EXAMPLE

Chlorine occurs as chlorine-35 (mass ≈ 35 amu, 75.8% abundance) and chlorine-37 (mass ≈ 37 amu, 24.2% abundance). What is chlorine's average atomic mass, and what does the value tell you?

Weighted average = (0.758)(35) + (0.242)(37) = 26.53 + 8.95 ≈ 35.5 amu, matching the periodic-table value of 35.45. Because the average lands far closer to 35 than to 37, the lighter isotope chlorine-35 must be the more abundant one, exactly as the abundances state. Note you never round to a whole number: the non-integer atomic mass is the signature of a mixture of isotopes.

An ion is an atom (or group of atoms) carrying a net charge because its electron count no longer matches its proton count. Protons never change in ordinary chemistry, only electrons move. Losing one or more electrons leaves a net-positive cation (for example, Na becomes Na⁺); gaining electrons makes a net-negative anion (Cl becomes Cl⁻). The charge equals protons minus electrons. Metals on the left tend to form cations and nonmetals on the right tend to form anions, a preview of the periodic trends that explain why.

## KEY

Three independent dials: change the number of PROTONS and you have a different ELEMENT; change the number of NEUTRONS and you have a different ISOTOPE of the same element; change the number of ELECTRONS and you have an ION. Keep them straight and most atomic-structure questions answer themselves.

## The Quantum Model: From Bohr to Orbitals

Niels Bohr pictured the electron as orbiting the nucleus only in certain allowed, quantized energy levels indexed by the principal quantum number n. An electron cannot exist between levels; it can only occupy n = 1 (the ground state, closest and lowest in energy), n = 2, n = 3, and so on. The energies are negative because the electron is bound, energy must be added to pull it free. For the one-electron hydrogen atom, the allowed energies follow a clean formula.

E_n = −13.6 eV / n²

Energy of the nth level of a hydrogen atom (one electron). n = 1 gives −13.6 eV (ground state); n = 2 gives −3.40 eV; levels crowd together and approach 0 as n → ∞ (the free electron). Removing the ground-state electron therefore costs 13.6 eV, hydrogen's ionization energy.

An electron moves between levels only by gaining or losing exactly the energy gap between them. Absorbing a photon of precisely the right energy bumps the electron UP to a higher level (an excited state); when it falls back DOWN, it emits a photon carrying that same energy difference. Because only discrete gaps exist, the emitted light appears as sharp, characteristic lines, an atomic emission spectrum, rather than a continuous rainbow. Those discrete line spectra were the original experimental proof that electron energies are quantized.

ΔE = h·f = h·c / λ

The photon's energy equals the energy gap between two levels. h = Planck's constant, f = frequency, c = speed of light, λ = wavelength. A bigger energy gap means a higher-frequency, shorter-wavelength photon. Emission (electron falls) releases the photon; absorption (electron rises) consumes it.

The Bohr model nails hydrogen's spectrum but fails for any atom with more than one electron, and it wrongly treats the electron as a particle on a fixed track. The modern quantum-mechanical model replaces orbits with orbitals. Two ideas force this change: de Broglie's insight that electrons have wave-like character, and Heisenberg's uncertainty principle, which says we cannot simultaneously know an electron's exact position and momentum. So instead of a path, an orbital is a three-dimensional region of probability, the volume (conventionally drawn to enclose about 90% of the probability) where an electron is most likely to be found.

Solving the quantum model yields a set of allowed states, each labeled by four quantum numbers that act like an electron's address. The first three (n, l, ml) describe the orbital; the fourth (ms) describes the electron's spin within it. Together they obey the Pauli exclusion principle: no two electrons in the same atom may share all four quantum numbers, which is exactly why each orbital holds at most two electrons, and those two must have opposite spins.

The four quantum numbers

Quantum number	Symbol	Allowed values	What it specifies
Principal	n	1, 2, 3, …	Shell; energy and size (larger n = bigger, higher energy)
Azimuthal (angular momentum)	l	0 to n − 1	Subshell and orbital shape (0 = s, 1 = p, 2 = d, 3 = f)
Magnetic	ml	−l to +l	Orbital orientation in space; 2l + 1 orbitals per subshell
Spin	ms	+½ or −½	Electron spin direction; 2 electrons per orbital, opposite spins

The azimuthal quantum number l sets the subshell and its shape: l = 0 is an s subshell (a single sphere centered on the nucleus), l = 1 is p (three dumbbell-shaped orbitals along the x, y, and z axes), l = 2 is d (five orbitals, mostly cloverleaf-shaped), and l = 3 is f (seven complex orbitals). The number of orbitals in a subshell is 2l + 1, and each orbital holds 2 electrons, so the capacities are s = 2, p = 6, d = 10, f = 14. As n grows, orbitals get larger and higher in energy.

## KEY

Capacity shortcuts worth memorizing cold: orbitals per subshell s/p/d/f = 1/3/5/7; electrons per subshell = 2/6/10/14; orbitals in shell n = n²; electrons in shell n = 2n². These let you read the structure of the periodic table directly, 2 s-block columns, 6 p-block, 10 d-block, 14 f-block.

## Electron Configuration: Aufbau, Hund, and Pauli

Building an atom's ground-state electron configuration means placing its electrons into orbitals under three rules: the Aufbau principle (fill the lowest-energy orbitals first), the Pauli exclusion principle (at most two electrons per orbital, with opposite spins), and Hund's rule (within a set of equal-energy orbitals, place one electron in each before pairing any). The configuration is written as a list of subshells with superscripts giving their electron counts, for example, oxygen is 1s² 2s² 2p⁴.

Subshell energies do not follow n in a simple way, notably, 4s fills before 3d because it is slightly lower in energy. The filling order is 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f, 6d, 7p. To compress long configurations, use noble-gas shorthand: replace the inner electrons with the previous noble gas in brackets, so iron (Z = 26) is [Ar] 4s² 3d⁶ rather than the full 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶.

TIP

Don't memorize the ordering as a list, generate it. Write the subshells in a grid and read along diagonals (the n + l rule: lower n + l fills first, ties broken by lower n). This diagonal rule reproduces 1s, 2s, 2p, 3s, 3p, 4s, 3d… every time and is faster than recall under pressure.

Hund's rule reflects electron-electron repulsion: electrons spread out singly across degenerate (equal-energy) orbitals, all with parallel spins, before any orbital is forced to hold a pair. Nitrogen's three 2p electrons therefore occupy 2px, 2py, and 2pz singly (up, up, up), not crammed two-and-one. This bookkeeping determines magnetism: an atom or ion with any unpaired electrons is paramagnetic (weakly attracted into a magnetic field), whereas one with all electrons paired is diamagnetic (weakly repelled).

Valence electrons, the outermost electrons, in the highest occupied n (the s and p of that shell for main-group elements), do essentially all of the chemistry. For a main-group element, the number of valence electrons equals its group's ones digit: group 1 has 1, group 2 has 2, group 13 has 3, on up to group 17 with 7 and group 18 with 8 (helium being the exception with 2). Core electrons sit in filled inner shells and rarely participate. This is why elements in the same group, sharing a valence configuration, show similar chemistry.

Two first-row transition metals break the simple Aufbau pattern because half-filled and completely filled d subshells are unusually stable. Chromium is [Ar] 4s¹ 3d⁵ (not 4s² 3d⁴) and copper is [Ar] 4s¹ 3d¹⁰ (not 4s² 3d⁹): one 4s electron drops into 3d to reach the extra-stable half-filled (d⁵) or filled (d¹⁰) configuration. The same logic produces analogous exceptions lower down, such as molybdenum, silver, and gold. Chromium and copper are the two exceptions the MCAT most often expects you to recognize by name.

When a main-group atom forms an ion, add electrons by Aufbau (anions) or remove them from the highest-energy occupied subshell (cations). Transition metals carry a famous twist: although 4s fills before 3d, the 4s electrons are removed first when the cation forms. Iron, [Ar] 4s² 3d⁶, becomes Fe²⁺ = [Ar] 3d⁶ (lose both 4s) and Fe³⁺ = [Ar] 3d⁵ (lose a 3d as well). Fe³⁺'s stability owes to that half-filled 3d⁵, which is why iron's +3 state is so common.

## TRAP

'4s fills first but empties first.' Students lose easy points by stripping 3d electrons before 4s when writing transition-metal cations. Always remove the outermost shell (highest n, here 4s) first, regardless of the order in which the subshells were originally filled.

WORKED EXAMPLE

Write the ground-state electron configuration of Fe³⁺ (iron, Z = 26), state how many unpaired electrons it has, and say whether it is paramagnetic.

Neutral Fe = [Ar] 4s² 3d⁶. To make Fe³⁺, remove three electrons, taking the 4s pair first (4s empties before 3d) and then one 3d electron: Fe³⁺ = [Ar] 3d⁵. By Hund's rule the five 3d electrons occupy all five d orbitals singly with parallel spins (up, up, up, up, up), giving 5 unpaired electrons. With unpaired electrons present, Fe³⁺ is paramagnetic, and that half-filled d⁵ shell is part of why Fe³⁺ is so stable.

## Effective Nuclear Charge and the Logic of the Periodic Table

The periodic table is arranged so that structure mirrors chemistry. Rows are periods: moving across a period, electrons fill the same valence shell (same n). Columns are groups: elements in a group share the same valence-electron configuration, so they behave alike, that recurring chemistry is the 'periodic' in periodic table. The table is also divided into blocks by which subshell is being filled: the s-block (groups 1 and 2, plus helium), the p-block (groups 13 to 18), the d-block (the transition metals, groups 3 to 12), and the f-block (the lanthanides and actinides, set below the main table).

Several groups have names worth knowing: group 1 (except hydrogen) are the alkali metals (ns¹, soft, violently reactive, form +1 ions); group 2 are the alkaline earth metals (ns², form +2 ions); group 17 are the halogens (ns² np⁵, the most reactive nonmetals, form −1 ions); and group 18 are the noble gases (full valence shells, ns² np⁶, or 1s² for helium, making them nearly inert). A staircase line on the right separates metals (the large majority, on the left) from nonmetals (upper right), with the metalloids, B, Si, Ge, As, Sb, Te, straddling the line and showing intermediate, semiconducting behavior.

Key group families

Family	Group	Valence config	Signature behavior
Alkali metals	1	ns¹	Soft metals; form +1 ions; most reactive metals
Alkaline earth metals	2	ns²	Form +2 ions; reactive but less so than group 1
Halogens	17	ns² np⁵	Form −1 ions; most reactive nonmetals
Noble gases	18	ns² np⁶ (He = 1s²)	Full valence shell; inert; very high ionization energy
Transition metals	3 12	(n−1)d filling	Variable oxidation states; many colored and paramagnetic

Why do properties change so smoothly across the table? The unifying cause is effective nuclear charge (Zeff): the net positive pull an outer electron actually feels, which is less than the full nuclear charge Z because inner electrons partially block (screen, or shield) it.

Zeff = Z − S

Z = number of protons (the full nuclear charge); S = the shielding (screening) constant, roughly the number of inner core electrons that block the nucleus's pull. Zeff is the charge an outer electron effectively 'sees,' and it controls how tightly that electron is held.

Two patterns make Zeff the master variable. Across a period (left to right), each step adds a proton (Z up by 1) and an electron to the SAME valence shell; electrons in the same shell shield one another poorly, so S barely rises while Z climbs, Zeff increases markedly, pulling the whole shell inward. Down a group (top to bottom), each step adds an entire new, larger shell and a full layer of core electrons; the added shielding largely offsets the added protons, so the valence electrons feel a roughly similar Zeff but sit much farther out and are far easier to remove. Hold onto these two behaviors, every trend below is just a consequence.

## KEY

Effective nuclear charge is the one idea that explains the whole table. Rising Zeff across a period (a tighter grip on a fixed shell) and near-constant Zeff with growing distance down a group together generate atomic radius, ionization energy, electron affinity, electronegativity, and metallic character. Master Zeff and you never have to memorize the trends as disconnected facts.

## The Major Periodic Trends

Atomic radius (roughly, the size of the electron cloud) DECREASES from left to right across a period and INCREASES from top to bottom down a group. Across a period, rising Zeff reels the same valence shell in tighter, shrinking the atom even as electrons are added. Down a group, each new period adds a larger principal shell, so the outermost electrons sit progressively farther from the nucleus. The net result: the smallest atoms are in the upper right (excluding the noble gases), and the largest are in the lower left (cesium, francium).

Forming ions changes size predictably. A cation is always SMALLER than its parent atom: removing electrons often empties the outermost shell entirely and leaves the remaining electrons feeling a higher Zeff each, so the cloud contracts. An anion is always LARGER than its parent atom: added electrons increase electron-electron repulsion while Z stays fixed, so the cloud swells. Thus Na⁺ is smaller than Na, and Cl⁻ is larger than Cl.

Ionization energy (IE) is the energy required to remove an electron from a gaseous atom; it is always positive (endothermic), because the electron is bound and must be pulled away. IE runs OPPOSITE to atomic radius: it INCREASES across a period (tighter grip, higher Zeff) and DECREASES down a group (outer electrons farther out and better shielded, so easier to remove). Removing successive electrons gets progressively harder, IE₁ < IE₂ < IE₃, because each electron leaves behind an increasingly positive ion that clings to the rest.

## TRAP

The across-a-period IE rise is not perfectly smooth, two reproducible dips appear in period 2. Boron's IE is LOWER than beryllium's: boron's outermost electron sits in a higher-energy 2p orbital (shielded by the filled 2s²), so it leaves more easily than one of beryllium's stable 2s² electrons. Oxygen's IE is LOWER than nitrogen's: nitrogen has a stable half-filled 2p³ (all singly occupied), while oxygen's 2p⁴ forces one orbital to hold a pair, and that electron-electron repulsion makes one electron easier to remove. Expect the same group-13-below-group-2 and group-16-below-group-15 dips throughout the p-block.

Electron affinity (EA) is the enthalpy change (ΔH) when a gaseous atom GAINS an electron. For most elements this is exothermic, so ΔH is negative; the MORE NEGATIVE the value, the greater the atom's affinity for an added electron. EA generally becomes more negative across a period (higher Zeff pulls an added electron in more strongly) and peaks at the halogens (group 17), which release a great deal of energy on gaining the one electron that completes their octet. The trend then BREAKS at the noble gases (group 18): with a full valence shell, adding an electron is unfavorable, so their EA is near zero or positive (endothermic). Down a group, EA generally becomes less negative.

## TRAP

Electron-affinity sign conventions trip people up: some sources report EA as 'energy released' (so a positive number means favorable), while others report the ΔH of attachment (so a negative number means favorable). Pick one and stay consistent, using the ΔH convention here, more negative = more favorable. A real anomaly to know: chlorine's EA (≈ −349 kJ/mol) is slightly MORE negative than fluorine's (≈ −328 kJ/mol). Fluorine's 2p shell is so small that an added electron is crowded, and the extra electron-electron repulsion offsets fluorine's otherwise strong pull.

Electronegativity is an atom's tendency to attract the shared electrons in a covalent bond (most commonly quantified on the Pauling scale, roughly 0.7 to 4.0). It follows the same direction as ionization energy, INCREASING across a period and DECREASING down a group, because both reflect how strongly the nucleus grips electrons. Fluorine (≈ 4.0) is the most electronegative element, followed by oxygen, then chlorine and nitrogen; the noble gases are usually left off the scale because they rarely bond. Electronegativity differences drive bond polarity (large differences give ionic bonds, small differences give nonpolar covalent bonds). Metallic character runs OPPOSITE: it increases down and to the left, peaking at the heavy alkali metals that lose electrons most readily.

PERIODIC TREND ARROWS

A schematic periodic table overlaid with two opposing sets of arrows. One set points toward the upper-right corner (toward fluorine) and is labeled with the properties that increase that way: ionization energy, electron-affinity magnitude, and electronegativity. The opposing set points toward the lower-left corner (toward cesium and francium) and is labeled with the properties that increase that way: atomic radius and metallic character. The single takeaway is that radius and metallic character grow down-and-left, while the three 'electron-grabbing' properties grow up-and-right, they are mirror images of each other.

Periodic trends at a glance

Property	Across period (L→R)	Down a group	Driving cause
Atomic radius	Decreases	Increases	Zeff rises across; new shells added down
Ionization energy	Increases	Decreases	Tighter grip means harder to remove an electron
Electron affinity (ΔH)	More negative (peaks at group 17)	Less negative	Stronger pull on an added electron
Electronegativity	Increases	Decreases	Greater attraction for shared bond electrons
Metallic character	Decreases	Increases	Inverse of IE and electronegativity; easier electron loss

## Successive Ionization, Isoelectronic Series, and MCAT Anomalies

Successive ionization energies reveal an atom's valence-electron count. Each removal costs more than the last, but the increases are gentle while you are stripping valence electrons, then there is a sudden, enormous jump the moment you start pulling electrons out of the stable noble-gas core. The position of that jump tells you how many valence electrons there were, and therefore the element's group.

WORKED EXAMPLE

An element shows successive ionization energies (in kJ/mol) of approximately 740, 1450, 7730, 10500, and 13600. Which group does it belong to?

Scan for the big jump. IE₁ to IE₂ roughly doubles (740 to 1450), a modest valence-to-valence increase. But IE₂ to IE₃ leaps more than fivefold (1450 to 7730): the third electron is being torn out of the noble-gas core. So this atom has exactly 2 easily removed valence electrons and belongs to group 2 (these values match magnesium). The jump always appears right after the last valence electron is gone.

Isoelectronic species have the same number of electrons (and usually the same electron configuration) but different nuclear charges. For a fixed number of electrons, the more protons a species has, the harder it pulls that identical electron cloud inward, so radius shrinks as Z rises. The classic 10-electron (neon-like) series ranks from largest to smallest as N³⁻ > O²⁻ > F⁻ > Ne > Na⁺ > Mg²⁺ > Al³⁺, simply following increasing proton count from 7 to 13.

WORKED EXAMPLE

Rank S²⁻, Cl⁻, K⁺, and Ca²⁺ by ionic radius, largest to smallest. (Atomic numbers: S = 16, Cl = 17, K = 19, Ca = 20.)

All four are isoelectronic, each has 18 electrons (the argon configuration). With the electron count fixed, radius is set by nuclear charge: more protons means a stronger pull and a smaller ion. Ordering by increasing Z (16 < 17 < 19 < 20), and therefore decreasing size: S²⁻ > Cl⁻ > K⁺ > Ca²⁺. The most negative ion is the biggest and the most positive ion is the smallest, a reliable shortcut for any isoelectronic set.

A single idea, the extra stability of half-filled and filled subshells, ties several 'exceptions' together. It explains the electron-configuration oddities of chromium (3d⁵) and copper (3d¹⁰), the prevalence of Fe³⁺ (3d⁵), and the ionization-energy dip at oxygen (losing an electron restores the stable half-filled 2p³). Fluorine's smaller-than-expected electron affinity is a different kind of anomaly, driven by electron-electron repulsion in its compact 2p shell. When the MCAT presents a value that violates a smooth trend, one of these two mechanisms is usually the reason.

TIP

The MCAT rarely asks a trend outright, it hides it. Watch for (a) successive-IE tables (find the big jump to get the group number), (b) 'rank these ions by size' lists that are secretly isoelectronic (rank by proton count), and (c) reactivity or property comparisons that resolve the moment you place the elements on the table and apply 'radius down-and-left, electron-grabbing up-and-right.' Locate the elements first; the answer usually follows.

These trends predict real chemistry. The most reactive metals are the heavy alkali metals (lower left): low ionization energy means they surrender their lone valence electron easily, so cesium reacts explosively with water. The most reactive nonmetals are the light halogens (upper right): high electron affinity and electronegativity make them aggressive electron-grabbers, so fluorine is a ferocious oxidizer. Noble gases, with full shells and very high ionization energies, barely react at all. The same electronegativity differences that fall out of these trends go on to determine bond polarity and bonding type, the bridge from atomic structure into chemical bonding.
