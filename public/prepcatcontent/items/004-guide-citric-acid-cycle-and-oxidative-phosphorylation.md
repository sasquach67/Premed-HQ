---
source: PrepCat content library
exported_at: 2026-07-12T05:25:34.735Z
item_number: 4
type: "GUIDE"
title: "Citric Acid Cycle & Oxidative Phosphorylation"
meta: "~28 min · 7 sections · cheat sheet"
---

Guide
Cheat sheet
BIO & BIOCHEM
~28 min read
# Citric Acid Cycle & Oxidative Phosphorylation

The citric acid cycle (TCA/Krebs cycle) and oxidative phosphorylation are how aerobic cells extract most of the ATP from glucose, fats, and amino acids: high energy electrons are stripped onto carriers, passed down an electron transport chain, and used to build a proton gradient that drives ATP synthase. The MCAT loves this topic because it integrates thermodynamics, redox chemistry, membrane transport, and metabolic regulation, and because inhibitor and uncoupler experiments test whether you truly understand the chemiosmotic mechanism rather than just memorizing yields.

## ON THIS PAGE

## Setting the Stage: From Glucose to Acetyl-CoA

## The Citric Acid Cycle: Products and Logic

## Cashing In Electrons: The Electron Transport Chain

## Chemiosmosis: Turning a Proton Gradient into ATP

## The Bottom Line: ATP Yield per Glucose

## Breaking the Machine: Inhibitors and Uncouplers

## Regulation, Location, and Metabolic Integration

## KEY ESSENTIALS

Keep three buckets per glucose: glycolysis (2 ATP, 2 NADH), PDH bridge (2 NADH, 2 CO2, NOT part of the cycle), TCA ×2 turns (6 NADH, 2 FADH2, 2 GTP, 4 CO2). Each cycle turn = 3 NADH, 1 FADH2, 1 GTP, 2 CO2.
The ETC does not make ATP directly. Complexes I, III, IV pump H+ to build the proton motive force; ATP synthase (Complex V) then uses H+ flowing back into the matrix to make ATP. That indirect coupling through a gradient is chemiosmosis.
NADH enters at Complex I (≈2.5 ATP); FADH2/succinate enters at Complex II (≈1.5 ATP) because it bypasses CI's proton pump. Complex II pumps no protons. O2 is the final acceptor at Complex IV, reduced to water.
Inhibitors STOP electron flow → O2 use AND ATP both fall (rotenone=CI, antimycin A=CIII, cyanide/CO/azide=CIV, oligomycin=ATP synthase). Uncouplers (2,4-DNP, thermogenin/UCP1) carry H+ across the membrane → gradient collapses, O2 use RISES, ATP falls, energy lost as heat.
Total ATP/glucose ≈ 30-32 (modern P/O) or 36-38 (older); learn the counting method, not one number. Cytoplasmic NADH must be shuttled in: malate-aspartate (→matrix NADH, ~2.5) vs glycerol-3-phosphate (→FADH2, ~1.5).
Regulation runs on energy charge: ATP and NADH inhibit, ADP and NAD+ activate; isocitrate dehydrogenase is rate limiting and ADP availability (respiratory control) is the ETC throttle.

## Setting the Stage: From Glucose to Acetyl-CoA

Cellular respiration is a relay race. Glycolysis, in the cytoplasm, splits one glucose into two pyruvate, netting 2 ATP and 2 NADH. But glycolysis barely scratches glucose's energy, most of it is still locked in the carbon-hydrogen bonds of pyruvate. To unlock it, aerobic cells run two more stages inside the mitochondrion: the citric acid cycle, which strips electrons off carbon and stores them on carriers, and oxidative phosphorylation, which cashes those carriers in for ATP. The MCAT expects you to see respiration as one continuous flow of electrons from glucose to oxygen, with ATP captured along the way.

The handoff between glycolysis and the TCA cycle is the pyruvate dehydrogenase complex (PDH), a large multi-enzyme assembly in the mitochondrial matrix. Pyruvate (3 carbons) is transported into the matrix and undergoes oxidative decarboxylation: one carbon leaves as CO2, the remaining two-carbon acetyl group is oxidized, and the electrons released reduce NAD+ to NADH. That acetyl group is attached to coenzyme A to form acetyl-CoA, the universal two-carbon fuel that feeds the cycle.

Pyruvate + NAD⁺ + CoA → Acetyl-CoA + NADH + CO₂

The PDH reaction, per pyruvate. It is irreversible and a major regulatory checkpoint (so the body cannot turn fat or pyruvate-derived acetyl-CoA back into glucose at this step). Per glucose it runs twice, producing 2 NADH and 2 CO2 before the cycle even begins. PDH requires thiamine pyrophosphate (from vitamin B1), a classic MCAT link to beriberi and Wernicke encephalopathy.

## KEY

Acetyl-CoA is a metabolic crossroads. It comes not only from carbohydrates but also from fatty acid beta-oxidation and from certain amino acids. This is why fats and proteins are also burned through the TCA cycle, and why the cycle is called the central hub of catabolism.

## TRAP

PDH is NOT one of the eight steps of the citric acid cycle, it is the preparatory bridge (link) reaction. Do not credit its NADH and CO2 to the cycle itself. Per glucose, PDH contributes 2 NADH and 2 CO2 separately from the 6 NADH and 4 CO2 of the two cycle turns. Mixing these buckets is the single most common yield-counting error on Test Day.

## The Citric Acid Cycle: Products and Logic

Each turn of the citric acid cycle begins when the two-carbon acetyl group from acetyl-CoA condenses with four-carbon oxaloacetate (OAA) to form six-carbon citrate (citric acid, hence the name). The cycle then systematically oxidizes citrate back down to oxaloacetate, regenerating OAA so the cycle can run again. Along the way, two carbons leave as CO2, electrons are harvested onto NADH and FADH2, and one high energy phosphate bond is made directly. You do not need to memorize all eight enzymes for the MCAT, but you must know the products, where energy is captured, and the regulated steps.

Walk the carbons. Citrate (6C) is isomerized to isocitrate, which is oxidatively decarboxylated to alpha-ketoglutarate (5C), losing one CO2 and making one NADH. Alpha-ketoglutarate is then oxidatively decarboxylated to succinyl-CoA (4C), losing the second CO2 and making a second NADH. The thioester bond of succinyl-CoA is cleaved to make GTP by substrate-level phosphorylation, yielding succinate. Succinate is oxidized to fumarate by succinate dehydrogenase, producing FADH2 (this enzyme is also Complex II of the ETC). Fumarate is hydrated to malate, and malate is oxidized back to oxaloacetate, making the third NADH. OAA is now ready to accept another acetyl group.

Acetyl-CoA + 3 NAD⁺ + FAD + GDP + Pi + 2 H₂O → 2 CO₂ + 3 NADH + 3 H⁺ + FADH₂ + GTP + CoA

Net per single turn of the cycle. Subtle point: the two carbons released as CO2 in any given turn come from the oxaloacetate carbons that were already in the cycle, not from the acetyl carbons just added (shown by isotope labeling). The acetyl carbons stay in until later turns. The overall bookkeeping still balances at 2 CO2 per acetyl-CoA.

Per-Turn vs Per-Glucose Yield

Product	Per turn (1 acetyl-CoA)	Per glucose (2 turns)
NADH	3	6
FADH2	1	2
GTP (≈ATP)	1	2
CO2	2	4

## KEY

The GTP made in the succinyl-CoA → succinate step is the cycle's only substrate-level phosphorylation, a phosphate transferred directly to GDP, independent of the ETC and oxygen. Glycolysis's ATP is also substrate-level. Everything else from the cycle (NADH, FADH2) is only converted to ATP later, in oxidative phosphorylation.

## TRAP

The TCA cycle produces no molecular oxygen and consumes none directly. The CO2 you exhale comes from these decarboxylations, not from O2. Yet the cycle is strictly aerobic, it stalls without O2 because the ETC must reoxidize NADH and FADH2 back to NAD+ and FAD to keep the cycle's dehydrogenase steps supplied with oxidized carriers.

## Cashing In Electrons: The Electron Transport Chain

NADH and FADH2 are not energy themselves, they are electron carriers, like charged batteries holding pairs of high energy electrons. The electron transport chain (ETC), embedded in the inner mitochondrial membrane, is a series of protein complexes that pass these electrons down a redox gradient: from carriers with low (more negative) reduction potential, like NADH, to the ultimate high-affinity acceptor, oxygen. As the electrons fall to lower energy, the released free energy is used to pump protons (H+) from the matrix into the intermembrane space.

There are four complexes plus two small mobile carriers. Complex I (NADH dehydrogenase) accepts electrons from NADH and pumps protons. Complex II (succinate dehydrogenase, the same TCA enzyme) accepts electrons from FADH2/succinate but does NOT pump protons. Both complexes pass electrons to coenzyme Q (ubiquinone), a small lipid soluble carrier that ferries them within the membrane to Complex III (cytochrome bc1), which pumps protons and hands electrons to cytochrome c, a small water soluble carrier on the membrane's intermembrane-space face. Cytochrome c shuttles electrons to Complex IV (cytochrome c oxidase), which pumps protons and reduces O2 to water.

### FIGURE: ELECTRON FLOW AND PROTON PUMPING ACROSS THE INNER MEMBRANE

A horizontal inner mitochondrial membrane separates the matrix (bottom) from the intermembrane space (top). Four complexes are embedded in it. Electrons enter at Complex I (from NADH) and Complex II (from FADH2/succinate) and converge on mobile coenzyme Q in the membrane, then flow to Complex III, then to mobile cytochrome c riding along the intermembrane-space surface, then to Complex IV, which donates them to O2 to make H2O. Curved arrows show Complexes I, III, and IV each pumping H+ upward from matrix to intermembrane space (Complex II pumps none). Net effect: protons accumulate above the membrane, high H+ and positive charge in the intermembrane space, low H+ and relatively negative charge in the matrix.

ETC Complexes at a Glance

Component	Electron source	Pumps H+?	Passes electrons to
Complex I (NADH dehydrogenase)	NADH	Yes	Coenzyme Q
Complex II (succinate dehydrogenase)	FADH2 / succinate	No	Coenzyme Q
Coenzyme Q (ubiquinone)	CI and CII	Mobile carrier (no pumping)	Complex III
Complex III (cytochrome bc1)	Coenzyme Q	Yes	Cytochrome c
Cytochrome c	Complex III	Mobile carrier (no pumping)	Complex IV
Complex IV (cytochrome c oxidase)	Cytochrome c	Yes	O2 (→ H2O)

## KEY

Electrons flow toward increasing (more positive) reduction potential, toward greater affinity for electrons: NADH (−0.32 V) → ... → O2 (+0.82 V). The total drop of ~1.14 V across the chain is what powers proton pumping. Oxygen is the final acceptor precisely because it is the most electron-hungry (most easily reduced) species in the chain.

## TRAP

FADH2 enters at Complex II and therefore skips Complex I's proton pump. That single fact, not any difference in the electrons themselves, is why FADH2 drives less ATP (~1.5) than NADH (~2.5). The MCAT tests this by asking why oxidizing succinate (which feeds FAD at Complex II) supports less ATP than oxidizing malate (which feeds NAD+ and enters at Complex I).

## Chemiosmosis: Turning a Proton Gradient into ATP

Here is the conceptual heart of the topic, and the single most-tested idea. The ETC and ATP production are NOT directly linked by a chemical bond. They are coupled indirectly through the proton gradient, Peter Mitchell's chemiosmotic theory. The ETC's only job is to pump protons, storing energy as an electrochemical gradient across the inner membrane called the proton motive force (PMF). The PMF has two parts: a chemical component (a pH difference, the intermembrane space is more acidic) and an electrical component (a membrane potential, the intermembrane space is positive relative to the matrix).

ATP synthase (Complex V) is a molecular turbine that spans the inner membrane. Protons accumulated in the intermembrane space flow back down their gradient into the matrix through the channel in ATP synthase's membrane-embedded Fo portion. That flow physically rotates a rotor, and the mechanical rotation drives conformational changes in the catalytic F1 head, which binds ADP + Pi and condenses them into ATP. So protons going downhill power ATP synthesis going uphill, the gradient is the energy intermediate, not a transferred phosphate.

ADP + Pi + n H⁺(intermembrane) → ATP + H₂O + n H⁺(matrix)

Oxidative phosphorylation: phosphorylation of ADP powered by the oxidative (redox) reactions of the ETC, but mechanistically by the H+ gradient those reactions create. 'Oxidative' = the redox chemistry of the chain; 'phosphorylation' = the ADP→ATP step at synthase. Roughly 4 H+ are needed per ATP that is made and exported from the matrix (about 3 to spin the synthase plus ~1 for ATP/ADP and Pi transport).

### FIGURE: ATP SYNTHASE AS A PROTON-DRIVEN TURBINE

ATP synthase straddles the inner membrane. The Fo subunit sits in the membrane and forms a proton channel and rotor; the F1 subunit is a knob protruding into the matrix. Protons from the high-concentration intermembrane space flow through Fo into the low-concentration matrix, spinning the central stalk like water through a hydroelectric dam. The spin cycles the three catalytic sites of F1 through Open, Loose, and Tight conformations (the binding-change mechanism), releasing newly made ATP into the matrix. Arrows trace H+ entering from the intermembrane space and ATP being released into the matrix.

## KEY

Memorize the chain of causation: ETC pumps H+ → proton motive force builds → H+ flows back through ATP synthase → ATP is made. Break any one link, stop electron flow, dissipate the gradient, or block the synthase, and ATP synthesis stops. Most inhibitor questions are simply asking which link you broke.

TIP

Because the inner membrane is impermeable to H+ except through ATP synthase, the cell can store ETC energy as a gradient and spend it on demand. This selective impermeability is exactly what uncouplers exploit, they create an alternate route for H+, punching a 'hole' that bypasses the synthase.

## The Bottom Line: ATP Yield per Glucose

Modern textbooks use P/O ratios, how many ATP are made per electron pair passed to oxygen. The consensus estimates are ~2.5 ATP per NADH and ~1.5 ATP per FADH2. These are not whole numbers because the H+ per ATP is not a clean integer and because exporting ATP from the matrix and importing Pi each cost a fraction of the gradient. Older textbooks rounded to 3 and 2, giving the classic '36-38 ATP'; current ones give ~30-32. The MCAT accepts either as long as your reasoning is sound, so learn the method, not a magic number.

ATP Accounting per Glucose (modern P/O values)

Stage	Direct ATP/GTP	NADH (×2.5)	FADH2 (×1.5)	ATP subtotal
Glycolysis (cytoplasm)	2 (net)	2 NADH*	0	~5-7*
Pyruvate → Acetyl-CoA (×2, PDH)	0	2 NADH	0	5
Citric acid cycle (×2 turns)	2 GTP	6 NADH	2 FADH2	20
TOTAL	4	10 carriers' worth	2 FADH2	≈30-32

The asterisk on glycolytic NADH points to a real MCAT subtlety: NADH made in the cytoplasm cannot cross the inner mitochondrial membrane, so its electrons must be shuttled in. The malate-aspartate shuttle (heart, liver) delivers them to matrix NAD+, preserving ~2.5 ATP each, so glycolysis effectively contributes ~7 ATP. The glycerol-3-phosphate shuttle (skeletal muscle, brain) delivers them to FAD, yielding only ~1.5 ATP each, so glycolysis contributes ~5 ATP. That single difference, about 1 ATP per cytoplasmic NADH, is the main reason whole-glucose estimates span 30-32.

WORKED EXAMPLE

A muscle cell using the glycerol-3-phosphate shuttle metabolizes one glucose completely. Using the rounded values of 3 ATP/NADH and 2 ATP/FADH2, but accounting for the shuttle, what is the total ATP yield, and how does it compare to a heart cell using the malate-aspartate shuttle?

Count the carriers in three buckets. Glycolysis = 2 ATP net + 2 NADH (cytoplasmic). PDH bridge = 2 NADH (matrix). TCA = 2 GTP + 6 NADH + 2 FADH2 (all matrix). Matrix NADH = 2 + 6 = 8, each worth 3 ATP = 24. TCA FADH2 = 2, each worth 2 = 4. Substrate-level = 2 (glycolysis) + 2 (GTP) = 4. Now the 2 cytoplasmic NADH: in the muscle cell the glycerol-3-phosphate shuttle hands them to FAD, so each is worth 2 ATP → 2 × 2 = 4. Total muscle = 24 + 4 + 4 + 4 = 36 ATP. In the heart cell, the malate-aspartate shuttle keeps them as matrix NADH worth 3 each → 2 × 3 = 6, so total = 24 + 4 + 4 + 6 = 38 ATP. The heart nets 2 more ATP per glucose. The takeaway the MCAT wants: shuttle choice changes the yield by 1 ATP per cytoplasmic NADH, here 2 NADH, so a 2-ATP difference between the tissues.

## TRAP

Do not double-count or forget the bridge step. A frequent error is crediting the TCA cycle with the 2 NADH from pyruvate→acetyl-CoA, or forgetting that cytoplasmic NADH must be shuttled. Keep three clean buckets: glycolysis (2 ATP, 2 NADH), the PDH bridge (2 NADH), and the cycle (2 GTP, 6 NADH, 2 FADH2).

## Breaking the Machine: Inhibitors and Uncouplers

Experiments that poison respiration are the MCAT's favorite way to test whether you understand the mechanism. Two categories behave very differently. ETC inhibitors block electron flow at a specific complex: carriers upstream of the block pile up reduced, while everything downstream becomes oxidized and idle. Because electrons can no longer reach O2, proton pumping ceases, the gradient collapses, and ATP synthesis stops, and O2 consumption falls. ATP synthase inhibitors (oligomycin) instead plug the proton channel itself: protons cannot flow back, so the gradient builds up; with no path to relieve it, the back-pressure halts proton pumping and the ETC stalls too, so O2 consumption also falls.

Respiratory Poisons

Agent	Target / Mechanism	Effect on H+ gradient	Effect on O2 use & ATP
Rotenone / amobarbital	Block Complex I	Falls	↓ O2 use, ↓ ATP (FADH2/CII path can still feed the chain)
Malonate	Competitively inhibits Complex II (mimics succinate)	Falls (FADH2 path)	↓ FADH2-fed flux
Antimycin A	Block Complex III	Falls	↓ O2 use, ↓ ATP
Cyanide (CN−), CO, azide (N3−)	Block Complex IV (bind heme Fe)	Falls	↓↓ O2 use, ↓↓ ATP, lethal
Oligomycin	Block ATP synthase (Fo channel)	Rises (no outflow), then ETC stalls	↓ ATP and ↓ O2 use
2,4-Dinitrophenol (DNP); UCP1/thermogenin	Uncoupler: carries H+ across the membrane	Collapses	↑↑ O2 use, ↓↓ ATP, energy lost as heat

Uncouplers are the conceptual masterstroke. A molecule like 2,4-dinitrophenol (DNP) is a lipid soluble weak acid: it picks up a proton in the acidic intermembrane space, diffuses across the membrane, and releases it in the matrix, short-circuiting ATP synthase. The gradient can never build. Crucially, with no gradient to push back against, the ETC runs flat-out (even faster than normal, because it is no longer held back by a steep gradient), so oxygen consumption skyrockets, yet no ATP is made. All of that electron energy is released as heat. Brown adipose tissue does this on purpose, using the uncoupling protein thermogenin (UCP1) to generate heat in newborns and hibernating mammals (non-shivering thermogenesis).

WORKED EXAMPLE

Researchers measure oxygen consumption and ATP synthesis in isolated, respiring mitochondria. Adding compound X causes oxygen consumption to RISE sharply while ATP synthesis FALLS to near zero. Adding compound Y causes BOTH oxygen consumption and ATP synthesis to fall to near zero. Classify X and Y, and explain the divergence.

Start from the coupling logic: normally electron transport (which consumes O2) and ATP synthesis are tied together by the proton gradient. Compound Y reduces BOTH O2 use and ATP, it broke the coupled system so that electrons can no longer flow to O2. Either an ETC inhibitor (e.g., cyanide at Complex IV) stops electron flow directly, or the synthase inhibitor oligomycin traps the protons so the gradient back-pressure stalls the chain; in either case O2 use and ATP both crash. Compound X is the giveaway: O2 use goes UP while ATP goes DOWN. The only way to consume MORE oxygen while making LESS ATP is to let electrons race through the chain with the gradient dissipated some other way so nothing restrains the chain and nothing is captured, that is an uncoupler (DNP or thermogenin). So X = uncoupler; Y = ETC or ATP-synthase inhibitor. The defining contrast: uncouplers DISCONNECT respiration from ATP synthesis (respiration speeds up), while inhibitors STOP respiration (O2 use falls).

## TRAP

Classic trap: 'A drug increases oxygen consumption, does it make more ATP?' Tempting to say yes, but an uncoupler increases O2 use while DECREASING ATP. High respiration does not imply high ATP if the system is uncoupled. Always ask whether the gradient's energy is being captured at the synthase or wasted as heat.

TIP

Cyanide and carbon monoxide are deadly because they block Complex IV, halting all of oxidative phosphorylation. The cell's only remaining ATP source is anaerobic glycolysis, which is why cyanide poisoning produces lactic acidosis and why tissues with the highest ATP demand (heart, brain) fail first.

## Regulation, Location, and Metabolic Integration

Respiration is tightly regulated to match ATP supply with demand, and the universal logic is energy charge: high ATP and NADH (the cell is energy-rich) inhibit the pathway, while high ADP and NAD+ (the cell is energy-poor) stimulate it, feedback inhibition by the pathway's own products. In the TCA cycle, the three regulated steps are catalyzed by citrate synthase, isocitrate dehydrogenase (generally considered the rate limiting enzyme), and alpha-ketoglutarate dehydrogenase. All are inhibited by ATP and NADH; isocitrate dehydrogenase is activated by ADP. PDH (the bridge step) is likewise inhibited by its products acetyl-CoA and NADH, and by high ATP.

Oxidative phosphorylation is governed by respiratory control: the ETC can run fast only if ADP is available for ATP synthase to phosphorylate. When ATP is plentiful, ADP runs low, the synthase slows, protons back up, the gradient grows too steep to pump against, and electron transport throttles down, automatically conserving fuel and oxygen. Thus the availability of ADP is the master throttle linking energy demand to electron flow.

## KEY

Location is testable. Glycolysis = cytoplasm. PDH and the entire TCA cycle = mitochondrial matrix (except succinate dehydrogenase / Complex II, which is bound to the inner membrane). The ETC and ATP synthase = inner mitochondrial membrane. The inner membrane's folds (cristae) maximize surface area and thus the number of ETC and synthase units.

Finally, the TCA cycle is amphibolic, it serves both catabolism and anabolism. Its intermediates are siphoned off as building blocks: citrate exits to the cytoplasm for fatty acid synthesis, alpha-ketoglutarate and oxaloacetate are transaminated into amino acids (glutamate and aspartate, respectively), and succinyl-CoA feeds heme synthesis. When intermediates are drained, they must be replenished by anaplerotic reactions, most importantly pyruvate carboxylase converting pyruvate to oxaloacetate. This dual role is why the cycle sits at the center of metabolism rather than acting only as an ATP factory.

WORKED EXAMPLE

A cell is incubated with a drug that strongly inhibits ATP synthase but leaves the ETC complexes intact. Predict what happens to (a) the proton gradient, (b) electron transport / O2 consumption, and (c) the NADH/NAD+ ratio, and explain why.

(a) Proton gradient: with ATP synthase blocked, protons pumped out can no longer return to the matrix, so the gradient (proton motive force) builds up toward a maximum. (b) Electron transport and O2 use: as the gradient grows steeper, each complex must pump against ever-larger back-pressure, until pumping becomes thermodynamically impossible and electron transport stalls, this is respiratory control. So O2 consumption FALLS to near zero, the same outcome as oligomycin in the prior section. The system is coupled: no ATP synthesis → no proton outflow → no room to pump → no electron flow. (c) NADH/NAD+ ratio: because the ETC stops, NADH can no longer be reoxidized to NAD+, so NADH accumulates and NAD+ is depleted, the NADH/NAD+ ratio RISES sharply. The high NADH then feeds back to inhibit isocitrate and alpha-ketoglutarate dehydrogenases and PDH, shutting down upstream metabolism as well. Contrast this with an uncoupler, which does the opposite to the gradient (collapses it) and to O2 use (raises it).
