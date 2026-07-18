---
source: PrepCat content library
exported_at: 2026-07-12T05:25:36.211Z
item_number: 5
type: "GUIDE"
title: "DNA Replication & Repair"
meta: "~28 min · 7 sections · cheat sheet"
---

Guide
Cheat sheet
BIO & BIOCHEM
~28 min read
# DNA Replication & Repair

DNA replication is the semiconservative, enzyme-driven copying of the genome that precedes cell division, and DNA repair safeguards the fidelity of that copy. The MCAT tests the directionality of synthesis, the division of labor among replication enzymes, the leading/lagging strand asymmetry, and the layered proofreading and repair systems that keep mutation rates extraordinarily low.

## ON THIS PAGE

## The Semiconservative Model and Meselson-Stahl

## Geometry: Antiparallel Strands, Forks, and the 5'-to-3' Rule

## Leading and Lagging Strands: Continuous vs. Discontinuous Synthesis

## The Replication Enzyme Toolkit

## Prokaryotic vs. Eukaryotic Replication, Telomeres, and Telomerase

## Fidelity, Proofreading, and Energy

## DNA Repair Mechanisms

## KEY ESSENTIALS

SEMICONSERVATIVE replication (proven by Meselson-Stahl): each daughter duplex keeps one parental strand and one new strand; after n rounds exactly 2 of 2^n duplexes are hybrid.
DNA polymerase builds ONLY 5'-to-3', adds only to a free 3'-OH, reads template 3'-to-5', and REQUIRES an RNA primer laid by primase.
Antiparallel strands force asymmetry: leading strand is continuous toward the fork (one primer); lagging strand is discontinuous Okazaki fragments away from the fork (many primers, needs ligase).
Two exonuclease directions, two jobs: 3'-to-5' = proofreading (removes the wrong base just added); 5'-to-3' = primer removal (pol I).
Telomerase is a reverse transcriptase with its own RNA template that extends the chromosome's 3' end to fix the end-replication problem; active in germ/stem/cancer cells, off in most somatic cells.
Match damage to pathway: bulky lesion/thymine dimer -> NER (xeroderma pigmentosum); single bad base -> BER; replication mismatch -> MMR (Lynch); double-strand break -> HR or NHEJ (BRCA).

## The Semiconservative Model and Meselson-Stahl

DNA replication is the process by which a cell duplicates its entire genome so that each daughter cell receives a complete, accurate copy. It occurs during the S (synthesis) phase of interphase, before the cell divides by mitosis or meiosis. The defining feature of replication is that it is SEMICONSERVATIVE: the two strands of the parental double helix separate, and each serves as a TEMPLATE for the synthesis of a new complementary strand. The result is two daughter duplexes, each containing one original (parental) strand and one newly made strand. Half of the original molecule is 'conserved' in each product, hence semiconservative.

This model competed historically with two alternatives. The CONSERVATIVE model proposed that the parental duplex stayed fully intact and an entirely new duplex was made alongside it. The DISPERSIVE model proposed that each daughter strand was a patchwork of old and new segments interspersed along its length. Distinguishing among these three required a way to physically label and separate 'old' from 'new' DNA, which is exactly what the Meselson-Stahl experiment accomplished in 1958.

### FIGURE: THREE MODELS OF REPLICATION

Three side-by-side diagrams of a parental DNA duplex (drawn as two dark blue strands) after one round of replication. SEMICONSERVATIVE: each of the two product duplexes shows one dark blue (old) strand paired with one light/new strand. CONSERVATIVE: one product is entirely dark blue (intact original) and the other entirely new (both light). DISPERSIVE: both products are striped, alternating short old and new segments along each strand. Only the semiconservative pattern matches the experimental density data.

Meselson and Stahl grew E. coli for many generations in medium containing the heavy nitrogen isotope 15N, so that all DNA bases (which contain nitrogen) were 'heavy.' They then switched the cells to medium with normal light 14N and let them replicate. At each generation they extracted DNA and spun it in a cesium chloride (CsCl) density gradient by ultracentrifugation, where each molecule settles to the position matching its density. Heavy DNA bands low (denser), light DNA bands high, and hybrid DNA (one heavy strand + one light strand) bands in the middle.

Meselson-Stahl density results vs. model predictions

Generation in 14N	Observed band(s)	Semiconservative predicts	Conservative predicts
0 (all 15N)	One heavy band	All heavy	All heavy
1	One intermediate (hybrid) band	All hybrid	Half heavy + half light (two bands)
2	Half hybrid + half light	Half hybrid + half light	Quarter heavy + three-quarters light

## KEY

The single intermediate band after ONE generation kills the conservative model (which predicts two separate bands, heavy and light). The appearance of a fully light band alongside the hybrid band after TWO generations kills the dispersive model (which would keep producing only ever-lighter intermediate DNA and never a discrete fully light band). Only semiconservative replication fits both observations.

WORKED EXAMPLE

A cell line is grown for many generations in 15N, then shifted to 14N for exactly three rounds of replication. What fraction of the resulting DNA molecules will be hybrid (one heavy strand, one light strand)?

Track the heavy strands, because they are conserved and never destroyed; they simply keep getting paired with new light strands. Every strand synthesized in 14N is light. Start with one parental duplex = two heavy strands. After 3 rounds of replication, one duplex has become 2^3 = 8 duplexes = 16 strands total. Only the 2 original heavy strands still exist, and each is now base-paired with a light strand, giving exactly 2 hybrid duplexes. The remaining 6 duplexes are fully light. Fraction hybrid = 2/8 = 1/4. General rule: after n rounds (n is at least 1), there are always exactly 2 hybrid molecules out of 2^n total; the rest are fully light. The two original heavy strands are effectively immortal.

## Geometry: Antiparallel Strands, Forks, and the 5'-to-3' Rule

Everything about how replication enzymes behave follows from two structural facts about DNA. First, the two strands are ANTIPARALLEL: one runs 5'-to-3' while its partner runs 3'-to-5'. The 5' and 3' labels refer to carbons on the deoxyribose sugar; the 5' carbon bears the phosphate group and the 3' carbon bears a free hydroxyl (-OH). Second, the strands are COMPLEMENTARY by base pairing (A with T, G with C), so each strand contains all the information needed to rebuild its partner.

DNA polymerase, the enzyme that builds new strands, has a strict mechanistic constraint: it can ONLY add nucleotides to a free 3'-OH group, attaching the incoming nucleotide's 5'-phosphate to that hydroxyl. This means the new strand always grows in the 5'-to-3' direction, and equivalently the polymerase reads the template strand in the 3'-to-5' direction. No enzyme in any cell synthesizes DNA in the 3'-to-5' direction. Internalize this; it is the single most heavily tested fact in this topic and it directly explains the leading/lagging asymmetry.

(DNA)n + dNTP -> (DNA)n+1 + PPi

DNA polymerase adds a deoxyribonucleoside triphosphate (dNTP) to the growing chain's 3'-OH, forming a new phosphodiester bond and releasing pyrophosphate (PPi). Subsequent hydrolysis of PPi to two inorganic phosphates makes the overall reaction effectively irreversible and provides much of the thermodynamic driving force.

Replication does not start randomly. It begins at specific sequences called ORIGINS OF REPLICATION (ori). Prokaryotes, with a single circular chromosome, have ONE origin. Eukaryotes, with much larger linear chromosomes, have MANY origins per chromosome so the whole genome can be copied within S phase. At each origin the helix opens into a REPLICATION BUBBLE. Each bubble has two REPLICATION FORKS, one at each end, that move in opposite directions. Replication is therefore BIDIRECTIONAL: synthesis proceeds outward from the origin in both directions simultaneously.

### FIGURE: REPLICATION BUBBLE WITH TWO FORKS

A stretch of double-stranded DNA with a Y-shaped opening at each end of a central bubble. The origin sits in the middle; two replication forks (the Y-junctions) move away from each other in opposite directions (arrows pointing left and right). Inside the bubble, the separated single strands each act as templates. New strands are shown being built, illustrating that at any one fork, one template allows continuous synthesis toward the fork while the other requires discontinuous synthesis.

## TRAP

A classic trap: a question shows a template strand and asks for the sequence of the new strand. Students write the complement in the same left-to-right order and forget polarity. The new strand is ANTIPARALLEL to the template, so if the template reads 5'-ATGC-3', the new strand pairs as 3'-TACG-5', which by convention is rewritten 5'-GCAT-3'. Always label the polarity of both strands and flip the new strand before reporting it.

## Leading and Lagging Strands: Continuous vs. Discontinuous Synthesis

Because the polymerase can only build 5'-to-3' but the two template strands at a fork point in opposite directions, the two new strands cannot be made the same way. Consider a single replication fork moving in one direction. On the template that is oriented 3'-to-5' as you move TOWARD the fork, the polymerase can follow the fork continuously, synthesizing one long, uninterrupted new strand in the 5'-to-3' direction. This is the LEADING STRAND. It needs only a single primer at the start and then simply chases the helicase as the fork opens.

On the opposite template, which is oriented 5'-to-3' as you move toward the fork, the polymerase would have to travel AWAY from the fork to obey its 5'-to-3' synthesis rule. So as the fork opens and exposes new template, the polymerase must repeatedly jump back toward the fork, lay down a fresh primer, and synthesize a short stretch directed backward, away from the fork. This produces the LAGGING STRAND, built DISCONTINUOUSLY as a series of short pieces called OKAZAKI FRAGMENTS. In prokaryotes these are roughly 1,000-2,000 nucleotides; in eukaryotes roughly 100-200. Each Okazaki fragment requires its own RNA primer.

### FIGURE: LEADING VS. LAGGING STRAND AT ONE FORK

A single replication fork. Helicase sits at the apex unwinding the duplex. On the bottom template (oriented 3'-to-5' toward the fork), a single continuous new strand (leading) is drawn following the fork in the same direction the fork moves, with one primer at its origin. On the top template (oriented 5'-to-3' toward the fork), several short Okazaki fragments (lagging) are drawn, each with its own RNA primer (shown in a contrasting color at the 5' end), pointing away from the fork. Arrows on every new strand point in the 5'-to-3' direction of synthesis, making clear both strands obey the same polymerase rule despite their opposite appearance.

The lagging strand is finished in clean-up steps. (1) DNA polymerase I (in prokaryotes) uses its 5'-to-3' EXONUCLEASE activity to chew away the RNA primer of the adjacent downstream fragment while simultaneously filling the gap with DNA. (2) This leaves a NICK, a single break in the sugar-phosphate backbone between two adjacent fragments. (3) DNA LIGASE seals the nick by forming the final phosphodiester bond, joining the fragments into one continuous strand. Ligase is essential on the lagging strand and is also the workhorse enzyme used in recombinant DNA cloning to join fragments.

TIP

Quick orientation trick: 'leading leads the fork' (continuous, follows the fork, one primer). 'Lagging lags behind' (discontinuous Okazaki fragments, points away from the fork, many primers, needs ligase). At any single fork there is exactly one leading and one lagging template. Across a whole replication bubble (two forks), a given parental strand serves as the leading template at one fork and the lagging template at the other.

WORKED EXAMPLE

A linear template strand reads 3'-TACGGCATTAGC-5'. A new strand is being synthesized using it, and this template is oriented 3'-to-5' toward the replication fork. (a) In which direction does the polymerase move along this template? (b) Write the new strand with correct polarity. (c) Is the resulting new strand the leading or the lagging strand?

(a) DNA polymerase always reads the template 3'-to-5', so it begins at the template's 3' end (the leftmost T) and moves rightward toward the template's 5' end. (b) Build the new strand antiparallel and complementary to the template. Template: 3'-T A C G G C A T T A G C-5'. Pairing each base (A<->T, G<->C): 5'-A T G C C G T A A T C G-3'. So the new strand, read 5'-to-3', is 5'-ATGCCGTAATCG-3'. (c) The template is oriented 3'-to-5' toward the fork, which is exactly the orientation that lets the polymerase follow the fork and synthesize continuously in one piece. Continuous synthesis toward the fork = the LEADING strand.

## The Replication Enzyme Toolkit

Replication is a coordinated assembly line. The MCAT expects you to know each enzyme's job, and especially to NOT confuse their roles. Work through them in the order events occur at the fork: unwind, stabilize, relieve strain, prime, polymerize, remove primers and fill gaps, seal.

Core replication enzymes and their functions

Enzyme / protein	Function	Prokaryotic example	Eukaryotic counterpart
Helicase	Unwinds the double helix at the fork, breaking the hydrogen bonds between paired bases	DnaB	MCM complex
Single-strand binding (SSB) proteins	Coat and stabilize exposed single strands; prevent re-annealing and degradation	SSB	RPA
Topoisomerase / DNA gyrase	Relieves positive supercoiling / torsional strain AHEAD of the fork by transiently nicking and resealing the backbone	Gyrase = topo II (target of quinolone antibiotics)	Topoisomerases I and II
Primase	Synthesizes a short RNA primer that provides the 3'-OH DNA pol needs to begin	DnaG	Pol alpha/primase
DNA polymerase III	Main replicative polymerase; extends both strands 5'-to-3'; has 3'-to-5' proofreading exonuclease	Pol III holoenzyme	Pol delta (lagging) and Pol epsilon (leading)
DNA polymerase I	Removes RNA primers via 5'-to-3' exonuclease and fills the resulting gaps with DNA	Pol I	RNase H + FEN1 + Pol delta
DNA ligase	Seals nicks between Okazaki fragments by forming the final phosphodiester bond	NAD+-dependent ligase	ATP-dependent ligase

## TRAP

Two enzymes are routinely confused. HELICASE unwinds and separates the strands by breaking the hydrogen bonds BETWEEN base pairs. TOPOISOMERASE relieves the supercoiling tension that unwinding creates further down the helix by transiently breaking and rejoining the covalent sugar-phosphate BACKBONE. Also do not confuse PRIMASE (makes the RNA primer) with DNA POLYMERASE (extends DNA). And remember ligase SEALS an existing nick; it does not synthesize new template-directed strands.

Two enzyme facts are unusually high yield. First, PRIMASE is an RNA polymerase, and like all RNA polymerases it does NOT need a pre-existing primer to start (unlike DNA polymerase). That is precisely why the cell uses it to lay down the initial RNA primer that DNA polymerase then extends. Second, the RNA primers are temporary; they must be removed and replaced with DNA so the final product is pure DNA. This primer-removal requirement is what creates the end-replication problem at linear chromosome ends, discussed later.

### FIGURE: ENZYMES AT THE REPLICATION FORK

A detailed replication fork annotated with each protein at its site of action. At the fork apex: helicase prying the strands apart. Just ahead of helicase (downstream on the still-duplex DNA): topoisomerase/gyrase relieving supercoils. On both exposed single strands: SSB proteins drawn as beads coating the DNA. On the leading template: primase having placed one RNA primer, then DNA pol III extending continuously. On the lagging template: multiple RNA primers placed by primase, DNA pol III making Okazaki fragments, DNA pol I replacing primers with DNA, and ligase sealing the nicks. The figure ties each enzyme to where and when it acts.

WORKED EXAMPLE

A mutant bacterium produces a DNA ligase that is nonfunctional at high (restrictive) temperature. The cell is shifted to the restrictive temperature mid-S phase. Which strand's synthesis is most disrupted, and what physical defect accumulates in the new DNA?

Ligase's only job is to seal the nicks left after RNA primers are removed and the gaps are filled. On the LEADING strand only ONE primer is used (at the very start), so there is essentially a single nick to seal and synthesis is otherwise continuous; the leading strand is barely affected during ongoing replication. On the LAGGING strand, every Okazaki fragment leaves a nick that ligase must seal. Without functional ligase, those nicks cannot be joined, so the lagging strand accumulates as many short, UN-joined Okazaki fragments separated by single-strand nicks in the backbone. The lagging strand is therefore the most disrupted. (Historically, this buildup of Okazaki-fragment-sized DNA pieces in ligase-defective mutants is part of how the discontinuous nature of lagging-strand synthesis was confirmed.)

## Prokaryotic vs. Eukaryotic Replication, Telomeres, and Telomerase

The chemistry of replication is universal, but the logistics differ between prokaryotes and eukaryotes because of genome size and shape. Prokaryotes have a small, circular chromosome with a single origin, so one bidirectional bubble copies the entire molecule. Eukaryotes have large LINEAR chromosomes packaged with histones into chromatin, requiring MANY origins per chromosome and the temporary disassembly and reassembly of nucleosomes as each fork passes.

Prokaryotic vs. eukaryotic replication

Feature	Prokaryotes	Eukaryotes
Chromosome shape	Circular	Linear
Origins per chromosome	One	Many
Main replicative polymerase	DNA pol III	Pol delta and Pol epsilon
Primer removal / gap fill	DNA pol I	RNase H + FEN1 + Pol delta
Okazaki fragment length	~1,000-2,000 nt	~100-200 nt
Replication rate	Very fast (~1,000 nt/s)	Slower (~50 nt/s), offset by many origins
End-replication problem	None (circular, no ends)	Yes (linear ends shorten) -> telomeres/telomerase

The linear shape creates a specific problem at chromosome ends, the END-REPLICATION PROBLEM. On the lagging strand, the very last Okazaki fragment near the chromosome's end is started from an RNA primer placed at the extreme tip. When that terminal primer is removed, there is no upstream fragment providing a 3'-OH for a polymerase to extend into the gap, and there is no template beyond the chromosome end to copy. The result is a short single-stranded gap that cannot be filled, so the newly made strand (and thus the chromosome) shortens slightly with every round of replication. Left unchecked, this erosion would eventually eat into coding genes over successive divisions.

Cells solve this with TELOMERES: long stretches of a noncoding, repetitive sequence (in humans, TTAGGG repeated thousands of times) that cap each chromosome end. Telomeres act as sacrificial buffer DNA, so the inevitable shortening chews into expendable repeats rather than into genes. To replenish telomeres, the enzyme TELOMERASE extends the 3' end of the parental strand. Telomerase is a REVERSE TRANSCRIPTASE: it carries its own short RNA template and uses it to add DNA repeats to the chromosome's 3' overhang, lengthening it so the normal lagging-strand machinery can then prime and fill in the complementary strand.

## KEY

Telomerase is highly active in germ cells, stem cells, and most cancers (which exploit it to become 'immortal' and divide indefinitely). It is largely INACTIVE in normal somatic cells, which therefore lose telomere length with each division. Progressive telomere shortening is linked to replicative cellular senescence (the Hayflick limit). Reactivation of telomerase is a hallmark of many cancers, a favorite MCAT connection between replication and disease.

## TRAP

Telomerase contains RNA but it is NOT primase and it does NOT make a removable RNA primer. Telomerase is a reverse transcriptase that uses an internal RNA as a TEMPLATE to add DNA bases onto the existing strand's 3' end. Its product is DNA, permanently added to the chromosome. Do not equate 'contains RNA' with 'lays down an RNA primer', those are two different enzymes doing two different jobs.

## Fidelity, Proofreading, and Energy

The genome must be copied with astonishing accuracy. Base pairing alone (correct A-T, G-C geometry) gives an error rate of roughly 1 in 10,000 to 100,000, far too sloppy for a genome with millions to billions of base pairs. The cell drives the final error rate down to roughly 1 in 10^9 to 10^10 nucleotides through layered error correction: (1) the selectivity of base pairing, (2) PROOFREADING by the polymerase, and (3) post-replication MISMATCH REPAIR. Each layer multiplies the fidelity achieved by the previous one.

PROOFREADING is the 3'-to-5' EXONUCLEASE activity built into the replicative DNA polymerase (pol III in prokaryotes; pol delta/epsilon in eukaryotes). If the polymerase inserts an incorrect base, the resulting mismatch distorts the helix and stalls the enzyme. The polymerase then backs up one step, uses its 3'-to-5' exonuclease to clip off the incorrect nucleotide from the 3' end of the growing strand, and re-inserts the correct one before resuming synthesis. Proofreading happens DURING replication, immediately after the error, and is performed by the same polymerase that is building the strand.

## TRAP

Distinguish the two exonuclease activities, a frequent MCAT trap. 3'-to-5' exonuclease = PROOFREADING (removes the most recently added wrong base from the new strand's 3' end; present in pol III and the eukaryotic replicative polymerases, and also in pol I). 5'-to-3' exonuclease = PRIMER REMOVAL (removes RNA primers lying ahead of the polymerase; in prokaryotes this is a special feature of DNA pol I). The direction tells you the function: 3'-to-5' looks backward to fix the base just added; 5'-to-3' looks forward to clear out primers.

### FIGURE: PROOFREADING BY 3'-TO-5' EXONUCLEASE

Two-panel cartoon. Panel 1: DNA polymerase has just added a C opposite a template A, creating a mismatched bulge that distorts the helix and stalls the enzyme. An arrow shows the enzyme backing up. Panel 2: the 3'-to-5' exonuclease active site clips off the incorrect C, regenerating a clean 3'-OH; the polymerase then inserts the correct T opposite the template A and resumes synthesis 5'-to-3'. The figure shows that proofreading edits only the newly made strand's 3' terminus, in real time.

P(final error) ≈ P(base-pairing error) × P(escapes proofreading) × P(escapes mismatch repair)

Conceptual relationship only: each error-correction layer reduces the residual error rate roughly multiplicatively. Base selection (~10^-5) times the fraction that slip past proofreading times the fraction that then slip past mismatch repair yields an overall fidelity on the order of 10^-9 to 10^-10. You will not compute exact numbers on the MCAT, but you should know that fidelity is built in successive, multiplying layers.

WORKED EXAMPLE

A cell carries a DNA polymerase with normal 5'-to-3' polymerase activity but a completely dead 3'-to-5' exonuclease domain. Mismatch repair is intact. Predict the consequence for mutation rate, and explain WHY the polymerase's other functions are unaffected.

The dead domain is the proofreading function. Without 3'-to-5' exonuclease, misincorporated bases are NOT clipped out during synthesis, so many more errors are handed off to the downstream mismatch-repair system. Mismatch repair still catches a large share of these, but it cannot catch all of them, so the overall MUTATION RATE RISES (a 'mutator' phenotype), though not as catastrophically as if mismatch repair were also lost, since one corrective layer remains. The polymerase's 5'-to-3' synthesis activity uses a SEPARATE active site from the 3'-to-5' exonuclease, so the enzyme still builds DNA normally and at normal speed; only the real-time error-correction is lost. This separation of catalytic domains is why a single point mutation can knock out proofreading while leaving polymerization intact.

Note the energetics of synthesis. Each nucleotide added arrives as a dNTP (a triphosphate). The new bond forms between the chain's 3'-OH and the alpha-phosphate of the incoming dNTP, releasing the other two phosphates as PYROPHOSPHATE (PPi). Hydrolysis of PPi into two inorganic phosphates by pyrophosphatase pulls the reaction forward and makes synthesis essentially irreversible. So the 'energy currency' of DNA synthesis is the high energy phosphoanhydride bonds of the incoming nucleotides themselves, not separately supplied ATP.

## DNA Repair Mechanisms

DNA is continuously damaged, both during and after replication: by UV light, reactive oxygen species, chemical mutagens, spontaneous deamination, and replication errors that escape proofreading. Cells maintain multiple dedicated repair pathways. The MCAT wants you to recognize each pathway by the type of damage it fixes and to connect repair failure to human disease. All excision-based repair shares a common logic: recognize the lesion, excise the damaged region, resynthesize using the intact complementary strand as a template, and seal with ligase. The undamaged strand is the information backup that makes accurate repair possible.

Major DNA repair pathways

Pathway	Type of damage fixed	Key idea	Disease link
Mismatch repair (MMR)	Base-pair mismatches and small insertion/deletion loops missed by proofreading	Detects the mismatch, distinguishes the new strand from the template, excises and resynthesizes	Hereditary nonpolyposis colorectal cancer (HNPCC / Lynch syndrome)
Nucleotide excision repair (NER)	Bulky, helix-distorting lesions, e.g. UV-induced thymine (pyrimidine) dimers	Excises a short oligonucleotide patch containing the lesion, then resynthesizes	Xeroderma pigmentosum (extreme UV/sun sensitivity, early skin cancer)
Base excision repair (BER)	Single damaged or incorrect bases (e.g. deaminated, oxidized, or alkylated bases)	A glycosylase removes the base, leaving an AP site; an endonuclease nicks; the gap is filled and sealed	Linked to some cancers; MYH-associated polyposis
Direct reversal	Specific lesions reversed in place without excision	An enzyme chemically undoes the damage (e.g. photolyase splits thymine dimers using light; MGMT removes alkyl groups)	(Photolyase is absent in placental mammals, including humans)
Double-strand break repair	Breaks across both strands (e.g. from ionizing radiation)	Homologous recombination (accurate, uses the sister chromatid) or non-homologous end joining (fast but error-prone)	BRCA1/BRCA2 mutations -> breast/ovarian cancer

Two repair details are especially testable. MISMATCH REPAIR faces a unique challenge: in a mismatch, both bases are normal DNA bases, so the system must determine WHICH strand carries the error, and the answer is the new strand, since the template was correct. In prokaryotes this strand discrimination uses methylation: the template (old) strand is already methylated while the freshly made strand is transiently unmethylated, so the system knows to correct the unmethylated new strand. NUCLEOTIDE EXCISION REPAIR is the classic fix for UV-induced THYMINE DIMERS, covalent links between adjacent thymines on the same strand that kink the helix; NER cuts out a patch of nucleotides around the dimer and resynthesizes from the intact strand. Failure of NER causes xeroderma pigmentosum, in which patients develop severe sunburns and numerous skin cancers from minimal sun exposure.

## KEY

Map each repair pathway to its signature damage: thymine (pyrimidine) dimers and other bulky lesions -> NUCLEOTIDE excision repair (and, in many non-mammalian organisms, direct reversal by photolyase). Single abnormal bases -> BASE excision repair (a glycosylase removes the base). Replication mismatches that escaped proofreading -> MISMATCH repair. Double-strand breaks -> homologous recombination or NHEJ. Linking the lesion to the pathway, and the pathway to its disease, is exactly how the MCAT frames repair questions.

## TRAP

BER vs. NER confusion is common. BASE excision repair removes a SINGLE damaged base via a DNA glycosylase, creating an AP (apurinic/apyrimidinic) site that is then processed and filled. NUCLEOTIDE excision repair removes a SHORT STRETCH of nucleotides (an oligonucleotide patch) surrounding a bulky, helix-distorting lesion such as a thymine dimer. Memory hook: 'BER = one Base, NER = a Nucleotide neighborhood.'

A MUTATION is any permanent change in the DNA sequence that escapes repair. Point mutations (single-base substitutions) include SILENT (codon still specifies the same amino acid, thanks to the degeneracy of the genetic code), MISSENSE (one amino acid is changed), and NONSENSE (a codon becomes a stop codon, truncating the protein). FRAMESHIFT mutations arise from insertions or deletions of a number of bases NOT divisible by three, shifting the downstream reading frame and usually devastating the protein. Mutations in the genes that guard the genome, the repair enzymes themselves, accelerate the accumulation of further mutations and drive cancer, which is why so many repair-deficiency syndromes are cancer-predisposition syndromes.

WORKED EXAMPLE

A patient develops numerous skin cancers after minimal sun exposure starting in childhood. Their cultured cells, when irradiated with UV, accumulate thymine dimers that are never removed, although mismatch repair and base excision repair work normally. What repair pathway is defective, what is the disease, and why does the dimer specifically require this pathway?

UV light covalently links adjacent thymines into a THYMINE DIMER, a BULKY lesion that kinks and distorts the double helix. Bulky, helix-distorting lesions are handled by NUCLEOTIDE EXCISION REPAIR (NER), which excises a short oligonucleotide patch containing the dimer and resynthesizes from the intact complementary strand. A single-base remover (base excision repair) cannot deal with a covalent two-base dimer, and mismatch repair targets mispaired but otherwise normal bases, not covalent crosslinks, so neither can substitute. The inability to remove dimers despite normal MMR and BER pinpoints defective NER. The disease is XERODERMA PIGMENTOSUM: without NER, dimers persist, block transcription and replication, generate mutations, and produce the extreme photosensitivity and early-onset skin cancers described.
