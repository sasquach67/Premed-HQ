---
source: PrepCat content library
exported_at: 2026-07-12T05:26:34.068Z
item_number: 37
type: "GUIDE"
title: "Organic Chemistry: Functional Groups and Reactions"
meta: "~31 min · 6 sections · cheat sheet"
---

Guide
Cheat sheet
CHEM & PHYS
~31 min read
# Organic Chemistry: Functional Groups and Reactions

A working tour of the functional groups the MCAT tests and the mechanisms that connect them: substitution and elimination, carbonyl addition, acyl substitution, redox of alcohols and amines, and how IR, NMR, and mass spectrometry let you read structure off a spectrum. The emphasis is on the few governing patterns (electrophilic carbons, leaving group ability, resonance) that predict most reactions.

## ON THIS PAGE

## Functional Groups, Naming, and Why Structure Predicts Reactivity

## Nucleophiles, Electrophiles, and the SN1/SN2/E1/E2 Decision

## Aldehydes and Ketones: Nucleophilic Addition

## Carboxylic Acids and Their Derivatives: Acyl Substitution

## Oxidation, Reduction, and the Chemistry of Alcohols and Amines

## Reading Structure off a Spectrum: IR, NMR, and MS

## KEY ESSENTIALS

A carbonyl carbon is electrophilic (delta+); nearly all carbonyl chemistry is a nucleophile attacking that carbon.
SN2 favors strong nucleophiles, less hindered substrates, and polar aprotic solvents; E2 favors strong (often bulky) bases and more substituted substrates; SN1/E1 favor stable carbocations, weak nucleophiles, and polar protic solvents.
Carboxylic acid derivative reactivity: acyl chloride > anhydride > ester ~ acid > amide (better leaving group and weaker resonance donation = more reactive).
Aldehydes are more reactive than ketones toward nucleophilic addition (less steric and electronic shielding of the carbon).
LiAlH4 is a strong reducer (esters, acids, amides, nitriles); NaBH4 is mild (aldehydes and ketones only).
IR: broad O-H ~3200-3550 (very broad 2500-3300 for acids), strong C=O ~1700-1750; 1H NMR aldehyde H 9-10 ppm, carboxylic acid H 10-12 ppm.
Nucleophilicity tracks basicity in polar aprotic solvents but reverses (I- > Br- > Cl- > F-) in polar protic solvents due to solvation.

## Functional Groups, Naming, and Why Structure Predicts Reactivity

A functional group is the reactive part of a molecule: a specific arrangement of atoms whose behavior is largely independent of the carbon skeleton it sits on. The same alcohol that is oxidized in ethanol is oxidized in a steroid, because reactivity is dictated by the local electronic environment, not the rest of the chain. Mastering organic chemistry for the MCAT is mostly a matter of learning a dozen functional groups, the partial charges they create, and the handful of mechanisms that move electrons between them.

Core functional groups (in rough order of naming seniority)

Group	Structure	Suffix as principal group	Example
Carboxylic acid	R-COOH	-oic acid	ethanoic (acetic) acid
Anhydride	R-CO-O-CO-R	-oic anhydride	acetic anhydride
Ester	R-COOR'	-oate	methyl acetate
Acyl (acid) halide	R-COCl	-oyl halide	acetyl chloride
Amide	R-CONR2	-amide	acetamide
Nitrile	R-C#N	-nitrile	acetonitrile
Aldehyde	R-CHO	-al	ethanal (acetaldehyde)
Ketone	R-CO-R'	-one	propanone (acetone)
Alcohol	R-OH	-ol	ethanol
Amine	R-NH2	-amine	methanamine
Ether	R-O-R'	(alkoxy- prefix)	diethyl ether

IUPAC naming follows a seniority order. You pick the highest-priority group present as the principal characteristic group: it defines the suffix and gets the lowest possible locant number on the parent chain. Every other functional group is demoted to a prefix. So a molecule with both an alcohol and a ketone is named as an '-ol'? No, as an '-one' with a 'hydroxy' prefix, because ketone outranks alcohol.

## KEY

Seniority for the principal group (high to low): carboxylic acid > anhydride > ester > acyl halide > amide > nitrile > aldehyde > ketone > alcohol > amine > alkene/alkyne. The senior group becomes the suffix and gets the lowest locant; everything below it becomes a prefix (oxo-, hydroxy-, amino-, oxo for aldehyde/ketone when subordinate).

Degrees of unsaturation = (2C + 2 + N - H - X) / 2

Each ring or pi bond counts as one degree. A benzene ring = 4 (three pi bonds + one ring); a C=O = 1. Oxygen does not appear in the formula. Useful for narrowing structures from a molecular formula.

Reactivity flows from electronegativity differences. A C-O or C=O bond pulls electron density toward oxygen, leaving carbon electron-poor (electrophilic) and oxygen electron-rich (nucleophilic). Nitrogen does the same, more weakly. Once you can label which atoms are delta+ and which are delta-, most reactions reduce to 'electron-rich attacks electron-poor.' That single idea unifies substitution, addition, and acyl substitution.

WORKED EXAMPLE

A molecule contains both a hydroxyl group and a carboxylic acid group. Which is the principal characteristic group, and how is the other shown in the name? Give the name of a four-carbon example with the OH on C3.

The carboxylic acid outranks the alcohol, so it is the principal group: the molecule is named as a '-oic acid' and the carboxyl carbon is C1 (lowest locant). The hydroxyl is demoted to a 'hydroxy' prefix. A four-carbon chain with OH on C3 is 3-hydroxybutanoic acid (beta-hydroxybutyrate, itself one of the ketone bodies).

## Nucleophiles, Electrophiles, and the SN1/SN2/E1/E2 Decision

A nucleophile is an electron-pair donor (Lewis base) seeking a positive center; an electrophile is an electron-pair acceptor (Lewis acid) seeking electrons. Nucleophilic substitution replaces a leaving group on an sp3 carbon with a nucleophile. A good leaving group is a weak base that is stable once it departs: the halides I- > Br- > Cl- (and tosylate, mesylate, and water from protonated alcohols) are good; strong bases like OH-, OR-, and H- are terrible leaving groups.

Nucleophilicity and basicity are related but not identical. Basicity is about affinity for a proton (thermodynamic); nucleophilicity is about how fast a species attacks carbon (kinetic). A negatively charged nucleophile is always stronger than its neutral conjugate (OH- > H2O). Down a column, nucleophilicity depends on solvent: in polar protic solvents (water, alcohols) larger, more polarizable ions are less tightly solvated and react faster, so I- > Br- > Cl- > F-. In polar aprotic solvents (DMSO, DMF, acetone) anions are 'naked' and nucleophilicity tracks basicity, so F- > Cl- > Br- > I-.

## TRAP

Do not assume the strongest base is the strongest nucleophile. In protic solvent, F- is the strongest base of the halides but the weakest nucleophile because it is so heavily solvated. The trend flips only when you switch to a polar aprotic solvent.

SN2: rate = k[substrate][nucleophile] (bimolecular, concerted) SN1: rate = k[substrate] (unimolecular, rate-limiting carbocation formation)

E2 follows rate = k[substrate][base]; E1 follows rate = k[substrate]. The '2' reactions are sensitive to nucleophile/base concentration; the '1' reactions are not.

The four pathways at a glance

Feature	SN2	SN1	E2	E1
Substrate	methyl > 1deg > 2deg	3deg > 2deg	3deg > 2deg > 1deg	3deg > 2deg
Reagent	strong nucleophile	weak nucleophile	strong (often bulky) base	weak base
Solvent	polar aprotic	polar protic	varies	polar protic
Intermediate	none (concerted)	carbocation	none (concerted)	carbocation
Stereochemistry	backside attack, inversion	racemization	anti-periplanar H and LG	mixture
Product note	clean inversion	rearrangement possible	Zaitsev (Hofmann if bulky base)	Zaitsev, rearrangement possible

Carbocation stability decides whether the unimolecular paths are even possible. Stability order is 3deg > 2deg > 1deg > methyl, driven by hyperconjugation and the electron-donating induction of alkyl groups; resonance gives an extra boost to allylic and benzylic cations. Because SN1 and E1 share the same rate-limiting carbocation, they usually occur together, and carbocations can rearrange via 1,2-hydride or 1,2-methyl shifts to reach a more stable cation, scrambling the product. SN2 and E2 never rearrange because no free cation forms.

For elimination, E2 is concerted and requires the leaving group and a beta hydrogen to be anti-periplanar (180 degrees apart). It usually gives the Zaitsev product (the more substituted, more stable alkene), but a bulky base such as tert-butoxide is forced to grab a less hindered hydrogen, giving the Hofmann (less substituted) product. Heat generally favors elimination over substitution because elimination increases the number of particles and is entropically favored.

WORKED EXAMPLE

2-bromo-2-methylpropane (tert-butyl bromide) is dissolved in water with a trace of NaBr. What substitution mechanism dominates and what is the product? How would using concentrated sodium ethoxide in ethanol change the outcome?

The substrate is tertiary, the nucleophile (water) is weak, and the solvent is polar protic, so SN1 dominates: the C-Br ionizes to a stable tertiary carbocation, then water attacks and is deprotonated to give tert-butanol (with E1 alkene as a minor product). Switching to concentrated sodium ethoxide introduces a strong, somewhat bulky base. Because the substrate is tertiary it cannot do SN2, so the strong base drives E2 elimination to 2-methylpropene rather than substitution.

## Aldehydes and Ketones: Nucleophilic Addition

The carbonyl (C=O) is the workhorse of organic chemistry. The carbon is strongly electrophilic and the oxygen is nucleophilic and basic. The default reaction of aldehydes and ketones is nucleophilic addition: a nucleophile attacks the carbon, the pi electrons collapse onto oxygen to make an alkoxide, and protonation gives an alcohol-containing product. Unlike acyl substitution (next section), there is no leaving group on the carbon, so the tetrahedral product is the product.

## KEY

Aldehydes are more reactive than ketones toward nucleophilic addition for two reasons: sterically, an aldehyde's H crowds the carbon far less than a second alkyl group does; electronically, ketones have two electron-donating alkyl groups that partially neutralize the carbon's delta+ charge. More accessible and more electrophilic = faster addition.

Carbon nucleophiles build the carbon skeleton. Grignard reagents (R-MgX) and organolithiums carry a carbanion-like, strongly nucleophilic and basic carbon. They add irreversibly to carbonyls: formaldehyde gives a primary alcohol, any other aldehyde gives a secondary alcohol, and a ketone gives a tertiary alcohol; addition to CO2 followed by workup gives a carboxylic acid. Because Grignards are destroyed instantly by any acidic proton (water, alcohols, even terminal alkynes or N-H/O-H groups), reactions must be run dry. Hydride reagents (NaBH4, LiAlH4) deliver H- to give alcohols; HCN adds to give a cyanohydrin.

With oxygen nucleophiles, an aldehyde plus one equivalent of alcohol gives a hemiacetal (one OR and one OH on the same carbon); under acid catalysis a second alcohol displaces water to give an acetal (two OR groups). The analogous ketone products are the hemiketal and ketal. Acetal formation is acid-catalyzed and reversible, and acetals are stable to base and to nucleophiles, which makes them a classic protecting group for carbonyls; aqueous acid hydrolyzes them back. Sugars famously cyclize when an internal OH attacks the carbonyl to form a cyclic hemiacetal.

With nitrogen nucleophiles, a primary amine condenses with a carbonyl to give an imine (Schiff base, C=N), losing water; the reaction is fastest near pH 4-5, where there is enough acid to dehydrate the carbinolamine but not so much that the amine is fully protonated. A secondary amine cannot form a stable C=N (no N-H to lose), so it forms an enamine instead. Water itself adds to give a hydrate (gem-diol), an equilibrium that lies far to the product side only for very electrophilic carbonyls like formaldehyde and chloral.

The hydrogens on the carbon alpha to a carbonyl are unusually acidic (ketone alpha-H pKa ~20, aldehyde ~17, ester ~25) because the resulting enolate is resonance-stabilized onto oxygen. This underlies keto-enol tautomerism (the carbonyl 'keto' form interconverts with its 'enol' form) and the aldol reaction, in which an enolate from one carbonyl attacks the carbonyl carbon of another to give a beta-hydroxy carbonyl; heating drives dehydration to an alpha,beta-unsaturated carbonyl (the aldol condensation).

WORKED EXAMPLE

Methylmagnesium bromide (CH3MgBr) is added to acetone (propanone), then the mixture is worked up with dilute aqueous acid. What is the organic product, and why must the Grignard be added before the water?

The carbanion-like methyl adds to acetone's carbonyl carbon, which already bears two methyl groups, giving an alkoxide that is protonated on workup to 2-methyl-2-propanol (tert-butanol), a tertiary alcohol. The acidic workup must come last because water (or any O-H/N-H proton) would protonate and destroy the Grignard before it could reach the carbonyl; the reagent is a strong enough base to be quenched instantly.

## Carboxylic Acids and Their Derivatives: Acyl Substitution

A carboxylic acid (R-COOH) combines a carbonyl with a hydroxyl, and the combination is acidic (pKa ~4-5) because the conjugate base, the carboxylate, spreads the negative charge over two equivalent oxygens by resonance. Electron-withdrawing groups stabilize the carboxylate further and raise acidity: acetic acid has pKa ~4.76, chloroacetic ~2.86, and trichloroacetic ~0.7. This inductive effect weakens with distance, so a chlorine on the alpha carbon matters far more than one several carbons away.

RCOOH + R'OH <=(H+)=> RCOOR' + H2O

Fischer esterification is acid-catalyzed and reversible; you drive it toward ester with excess alcohol or by removing water. Saponification (ester + NaOH) is essentially irreversible because it generates the resonance-stabilized carboxylate.

Carboxylic acids and their derivatives (acyl halides, anhydrides, esters, amides) all react by nucleophilic acyl substitution, an addition-elimination at the carbonyl. A nucleophile adds to the carbonyl carbon to form a tetrahedral intermediate; then, unlike in aldehyde/ketone addition, that intermediate collapses by ejecting a leaving group to regenerate the C=O. The net result is that one group on the acyl carbon is swapped for another.

Relative reactivity of acyl derivatives

Derivative	Leaving group	Reactivity
Acyl (acid) chloride	Cl-	most reactive
Anhydride	carboxylate (RCOO-)	high
Ester / carboxylic acid	RO- / OH-	moderate
Amide	amide ion (R2N-)	least reactive

## KEY

Reactivity order: acyl chloride > anhydride > ester ~ carboxylic acid > amide. Two factors line up: better leaving group ability (Cl- leaves easily, R2N- does not) and weaker resonance donation into the carbonyl. Nitrogen is the best electron donor, so the amide carbonyl is the least electrophilic and most stabilized. Practically, you can convert a more reactive derivative into a less reactive one but not the reverse without special reagents.

Esters form from a carboxylic acid plus an alcohol (Fischer esterification, acid-catalyzed and reversible) and hydrolyze back under acid; under base they undergo saponification to give the carboxylate salt and the alcohol, which is irreversible. Amides are the hardest to make and to break: amide hydrolysis requires prolonged strongly acidic or basic conditions, which is exactly why the peptide bonds in proteins are so stable. Acyl chlorides and anhydrides are so reactive that they react readily even with weak nucleophiles like water and alcohols.

Two special decompositions show up often. Beta-keto acids and substituted malonic (1,3-dicarboxylic) acids undergo decarboxylation on mild heating: a six-membered cyclic transition state lets the carboxyl leave as CO2 while a carbonyl oxygen grabs the acidic proton, giving an enol that tautomerizes to the product. An isolated carboxylic acid does not decarboxylate easily; the second carbonyl two atoms away is what makes the cyclic transition state possible.

WORKED EXAMPLE

Rank the rate of reaction with a given amine nucleophile: acetyl chloride, ethyl acetate, and acetamide. Then predict the product when ethyl acetate is heated with aqueous NaOH.

Rate order follows acyl reactivity: acetyl chloride (best leaving group, no resonance stabilization) > ethyl acetate (ester) > acetamide (worst leaving group, strongest resonance donation), so acetyl chloride >> ethyl acetate > acetamide. Heating ethyl acetate with aqueous NaOH is saponification: hydroxide adds, ethoxide leaves, and deprotonation gives the resonance-stabilized acetate ion (sodium acetate) plus ethanol. Because the carboxylate is so stable, the reaction does not reverse.

## Oxidation, Reduction, and the Chemistry of Alcohols and Amines

Organic oxidation means gaining bonds to oxygen (or losing bonds to hydrogen); reduction is the reverse. The carbon oxidation ladder runs alkane -> alcohol -> aldehyde -> carboxylic acid -> CO2, with each step up an oxidation and each step down a reduction. Knowing where a carbon sits on this ladder tells you what a given reagent can do to it.

Oxidation products of alcohols

Starting alcohol	PCC (mild)	Strong oxidant (Jones/CrO3, KMnO4)
Primary (1deg)	aldehyde (stops here)	carboxylic acid
Secondary (2deg)	ketone	ketone
Tertiary (3deg)	no reaction	no reaction

PCC (pyridinium chlorochromate) is a mild, anhydrous oxidant that stops a primary alcohol at the aldehyde, whereas strong aqueous oxidants like the Jones reagent (CrO3/H2SO4) or KMnO4 push all the way to the carboxylic acid. Secondary alcohols give ketones either way. Tertiary alcohols cannot be oxidized by these reagents because the carbinol carbon has no hydrogen to remove. Aldehydes can be selectively oxidized to acids by the Tollens reagent (silver-ammonia complex), whose silver-mirror deposit is a classic test that distinguishes easily oxidized aldehydes from unreactive ketones.

## TRAP

Two reliable trap-doors: (1) a tertiary alcohol does NOT oxidize to anything under standard chromium or permanganate conditions because there is no C-H on the carbon bearing the OH; (2) PCC stops at the aldehyde, so if a question wants a primary alcohol turned into a carboxylic acid you need a strong aqueous oxidant, not PCC.

Reduction reverses the ladder. NaBH4 is mild and selective: it reduces aldehydes and ketones to alcohols but generally leaves esters, carboxylic acids, and amides alone. LiAlH4 is far stronger and less selective: it reduces aldehydes, ketones, esters, carboxylic acids, amides, nitriles, and acyl chlorides, and it reacts violently with water, so it is used in dry ether and quenched carefully. If you only want a ketone reduced in a molecule that also has an ester, reach for NaBH4.

Amines are basic and nucleophilic because of the nitrogen lone pair. Aliphatic amines (methylamine pKaH ~10.6) are more basic than ammonia (~9.25) because alkyl groups donate electron density and stabilize the protonated ammonium. Aromatic amines are much weaker bases: aniline (pKaH ~4.6) holds its lone pair partly delocalized into the ring, so it is less available to bind a proton. Amides are essentially non-basic and non-nucleophilic at nitrogen because the lone pair is tied up in carbonyl resonance, which also restricts rotation about the C-N bond, an important feature of peptide bonds.

WORKED EXAMPLE

You have a molecule containing both a secondary alcohol and a methyl ester. You want to convert the alcohol to a ketone without touching the ester. What reagent do you choose, and what would LiAlH4 do instead?

Use PCC (or another mild Cr(VI) oxidant): it oxidizes the secondary alcohol to a ketone and does not reduce or otherwise disturb the ester. LiAlH4 is the wrong tool entirely: it is a reducing agent, not an oxidant, and it is strong enough to reduce the ester down to a primary alcohol while also reducing any aldehyde/ketone present, so it would destroy both functional groups rather than make the ketone.

## Reading Structure off a Spectrum: IR, NMR, and MS

Spectroscopy questions ask you to assign a functional group or a structure from data, so you only need a handful of diagnostic landmarks. Infrared (IR) spectroscopy probes bond vibrations: a bond absorbs IR light at a frequency set by its stiffness and the masses of its atoms. The region above ~1500 cm-1 holds the diagnostic stretches for functional groups; the crowded 'fingerprint' region below ~1500 cm-1 is unique to a molecule but rarely interpreted peak-by-peak on the MCAT.

Key IR absorptions

Bond / group	Wavenumber (cm-1)	Appearance
O-H (alcohol)	3200-3550	broad
O-H (carboxylic acid)	2500-3300	very broad
N-H (amine/amide)	3300-3500	1deg amine = two bands
C-H (sp3)	2850-2960	moderate
C#N (nitrile)	~2250	sharp, weak
C=O (carbonyl)	1700-1750	strong, sharp
C=C (alkene)	1620-1680	variable

## KEY

Two IR signatures earn most of the points: a strong sharp peak near 1700-1750 cm-1 means a carbonyl (C=O), and a broad peak from ~3200-3550 cm-1 means O-H. A carbonyl plus an extremely broad O-H stretching down to ~2500 cm-1 together signal a carboxylic acid. Within carbonyls, esters sit a bit higher (~1735) and amides lower (~1650) than ketones (~1715).

Proton (1H) NMR reports on the magnetic environment of hydrogens. Three readouts matter. Chemical shift (in ppm, referenced to TMS at 0) tells the type of proton; more electronegative or deshielding neighbors push a signal downfield (higher ppm). Integration gives the relative number of protons in each signal. Spin-spin splitting follows the n+1 rule: a proton with n equivalent neighboring (vicinal) protons appears as n+1 peaks, so an ethyl group shows a 3H triplet and a 2H quartet.

Multiplicity (number of peaks) = n + 1

n = number of equivalent protons on directly adjacent carbons. Equivalent protons do not split each other; -OH and -NH protons often appear as broad singlets and may not split predictably.

Representative 1H NMR chemical shifts

Proton type	Shift (ppm)
R-CH3 (alkyl)	0.8-1.2
H alpha to C=O / allylic	2.0-2.5
H on C-O or C-N	3.3-4.0
vinyl (C=C-H)	4.5-6.5
aromatic	6.5-8.0
aldehyde (CHO)	9.0-10.0
carboxylic acid (COOH)	10-12

Mass spectrometry ionizes the molecule and weighs the fragments. The molecular ion (M+) peak gives the molecular weight; characteristic fragmentations and isotope patterns refine the structure. A bromine gives near-equal M and M+2 peaks (about 1:1) because the two main isotopes are roughly equally abundant, while chlorine gives an M:M+2 ratio of about 3:1. The nitrogen rule helps too: an odd-mass molecular ion implies an odd number of nitrogen atoms.

TIP

Strategy for spectroscopy questions: start with IR to nail the functional group (Is there a C=O? an O-H?), use the molecular formula or M+ for degrees of unsaturation, then use NMR integration and splitting to count and connect the hydrogens. You rarely need every peak; one or two diagnostic signals usually eliminate all but the right answer.

WORKED EXAMPLE

A compound has formula C3H6O. Its IR shows a strong band at 1715 cm-1 and no broad O-H. Its 1H NMR is a single 6H singlet near 2.1 ppm. What is the compound?

C3H6O has one degree of unsaturation ((2*3+2-6)/2 = 1). The 1715 cm-1 band with no O-H indicates a ketone (the carbonyl uses up the one degree of unsaturation). A single 6H singlet at ~2.1 ppm means six equivalent protons with no neighbors, alpha to a carbonyl: two identical CH3 groups flanking the C=O. The compound is acetone (propanone), CH3-CO-CH3.
