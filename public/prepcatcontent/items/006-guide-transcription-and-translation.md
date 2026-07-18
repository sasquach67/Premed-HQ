---
source: PrepCat content library
exported_at: 2026-07-12T05:25:37.753Z
item_number: 6
type: "GUIDE"
title: "Transcription & Translation"
meta: "~28 min · 7 sections · cheat sheet"
---

Guide
Cheat sheet
BIO & BIOCHEM
~28 min read
# Transcription & Translation

Transcription and translation are the two steps of the central dogma that convert a DNA gene into a functional protein, and the MCAT tests every checkpoint, from RNA polymerase and splicing to codon reading, ribosome mechanics, and post-translational modification. Mastering the prokaryote-versus-eukaryote differences and the genetic code's rules is essential for both standalone and passage questions.

## ON THIS PAGE

## The Central Dogma: From Gene to Protein

## Transcription and RNA Polymerase

## RNA Processing and Splicing

## The Genetic Code

## Translation Machinery: tRNA and the Ribosome

## The Stages of Translation

## Prokaryote vs Eukaryote Differences & Post-Translational Modification

## KEY ESSENTIALS

Central dogma: DNA →(transcription, nucleus)→ mRNA →(translation, cytoplasm)→ protein. RNA is built 5'→3' off a 3'→5' template; protein is built N-terminus → C-terminus.
Eukaryotic RNA Pol II makes mRNA and needs a promoter (TATA box) + transcription factors but NO primer. mRNA = coding strand with T→U = complement of the template, convert DNA to mRNA before using a codon table.
Pre-mRNA processing (all nuclear): 5' 7-methylguanosine cap, 3' poly-A tail, and spliceosomal removal of introns (snRNPs read GU…AG, intron leaves as a lariat). Alternative splicing → many proteins from one gene.
The genetic code is degenerate, unambiguous, non-overlapping, and nearly universal. AUG = start (Met); UAA/UAG/UGA = stop; wobble (3rd base) lets one tRNA read several synonymous codons.
Ribosome sites A→P→E; the large-subunit rRNA is the peptidyl transferase (a ribozyme). Eukaryote 80S (60S+40S), prokaryote 70S (50S+30S), S units don't add linearly, the basis for antibiotic selectivity.
Aminoacyl-tRNA synthetase charges each tRNA (one per amino acid) using ATP→AMP+PPi (~2 high energy bonds); this is where the code is physically read and a key fidelity checkpoint.
Prokaryotes couple transcription and translation (no nucleus), use Shine-Dalgarno, and are polycistronic; eukaryotes separate them, use the 5' cap, and are monocistronic. PTMs (cleavage, phosphorylation, glycosylation, disulfides) finalize the protein.

## The Central Dogma: From Gene to Protein

The central dogma describes the flow of genetic information in the cell: DNA is transcribed into RNA, and RNA is translated into protein. In a eukaryote, transcription happens in the nucleus and produces a messenger RNA (mRNA) copy of a gene. That mRNA is then exported to the cytoplasm, where ribosomes translate its nucleotide sequence into a chain of amino acids, a polypeptide that folds into a functional protein. The MCAT expects you to hold this whole pipeline in your head and to know exactly which step each enzyme, sequence, or drug acts on.

Two directional rules underlie everything, and the MCAT tests them relentlessly. First, nucleic acids are always synthesized 5'→3', meaning each new nucleotide is added to the free 3'-hydroxyl of the growing strand. Second, proteins are synthesized from the N-terminus (free amino group) to the C-terminus (free carboxyl group). When you read an mRNA, you read it 5'→3', and the corresponding protein grows N→C. Lining these up correctly is the single most common source of careless errors on translation questions.

### FIGURE: THE CENTRAL DOGMA PIPELINE

A horizontal flow diagram. On the left, a double-stranded DNA gene; an arrow labeled 'transcription (RNA polymerase, nucleus)' leads to a single strand of pre-mRNA. The pre-mRNA is shown being processed, a cap added to its 5' end, a poly-A tail to its 3' end, and internal intron loops being cut out, yielding mature mRNA. A second arrow labeled 'translation (ribosome, cytoplasm)' leads from the mRNA to a chain of beads representing amino acids, the polypeptide. The figure teaches that transcription and processing are nuclear and translation is cytoplasmic, and that the molecule changes identity (DNA → RNA → protein) at each arrow.

## KEY

Reverse transcription (RNA → DNA, via reverse transcriptase in retroviruses like HIV) is the famous exception to the dogma's usual directionality. RNA replication (RNA → RNA) also occurs in some viruses. The one truly forbidden arrow is protein → nucleic acid: sequence information never flows back out of protein.

## Transcription and RNA Polymerase

Transcription is carried out by RNA polymerase, which reads a DNA template strand 3'→5' and builds a complementary RNA strand 5'→3'. Crucially, RNA polymerase does NOT require a primer, unlike DNA polymerase, it can initiate a new strand de novo. It also lacks 3'→5' proofreading exonuclease activity, so transcription is somewhat more error-prone than replication; this is tolerated because many RNA copies are made and they are not the permanent genetic record.

Of the two DNA strands, one is the template (antisense) strand that the polymerase actually reads; the other is the coding (sense) strand. The RNA product is identical in sequence to the coding strand except that uracil (U) replaces thymine (T) and the sugar is ribose. This is a favorite MCAT trick: if a question gives you the coding strand, the mRNA is just that strand with T→U; if it gives you the template strand, you must take the complement and convert T→U.

The three eukaryotic RNA polymerases

Polymerase	Products	High-yield note
RNA Pol I	Most rRNA (ribosomal RNA)	Located in the nucleolus
RNA Pol II	mRNA (and most snRNA/miRNA)	Most tested; makes protein-coding transcripts; inhibited by α-amanitin
RNA Pol III	tRNA and 5S rRNA	Small RNAs

Transcription proceeds in three phases. Initiation: transcription factors assemble at the promoter, a regulatory DNA sequence upstream (5') of the gene. In eukaryotes the core promoter often contains a TATA box (~25 bp upstream of the start site) recognized by the TATA-binding protein, which nucleates the general transcription factor complex that recruits RNA Pol II. Elongation: the polymerase unwinds the DNA, moves along the template, and adds ribonucleotides to the 3' end of the growing RNA. Termination: in eukaryotes, transcription ends after the polymerase passes a polyadenylation signal (AAUAAA) and the transcript is cleaved; in prokaryotes, termination is either rho-dependent or intrinsic (a GC-rich hairpin).

## TRAP

Promoters are cis-acting DNA sequences on the same molecule as the gene; transcription factors are trans-acting proteins. Don't confuse the promoter (where the basal machinery binds) with enhancers (often distant sequences that boost transcription by looping DNA) or with operators (prokaryotic repressor-binding sites). And remember: a primer is needed for DNA replication, NOT for transcription.

WORKED EXAMPLE

A gene's template (antisense) strand reads 3'-TAC GGA TCA ATT-5'. What is the sequence of the mRNA transcript, and what is the coding strand?

RNA polymerase reads the template 3'→5' and synthesizes RNA 5'→3' that is complementary to it (template A→U, T→A, C→G, G→C). Pair each template base in order (T,A,C,G,G,A,T,C,A,A,T,T): T→A, A→U, C→G, G→C, G→C, A→U, T→A, C→G, A→U, A→U, T→A, T→A. So the mRNA is 5'-AUG CCU AGU UAA-3'. The coding (sense) strand has the same sequence as the mRNA but with T for U: 5'-ATG CCT AGT TAA-3' (it is the complement of the template, read 5'→3'). Note the transcript begins with AUG (start) and ends with UAA (stop), a tidy little open reading frame.

## RNA Processing and Splicing

The immediate product of RNA Pol II is a primary transcript called heterogeneous nuclear RNA (hnRNA) or pre-mRNA. Before it can leave the nucleus, it undergoes three processing events, all occurring in the nucleus, that distinguish eukaryotic gene expression from the streamlined prokaryotic version.

(1) 5' capping: a 7-methylguanosine cap is added to the 5' end via an unusual 5'-to-5' triphosphate linkage. The cap protects the transcript from exonucleases and is the docking signal that recruits the ribosome's small subunit during translation initiation. (2) 3' polyadenylation: after cleavage at the AAUAAA signal, a poly-A polymerase adds a poly-A tail (~100 250 adenines) with no template. The tail enhances stability and aids export; tail length roughly correlates with mRNA lifetime. (3) Splicing: introns (intervening, noncoding sequences) are excised and exons (expressed sequences) are ligated together.

### FIGURE: SPLICING AND THE SPLICEOSOME

A pre-mRNA is drawn as a line with three exon blocks (E1, E2, E3) separated by two intron loops. Each intron begins with GU at its 5' splice site and ends with AG at its 3' splice site, with an internal branch-point adenine. Small ribonucleoprotein particles (snRNPs, labeled U1, U2, U4, U5, U6) assemble into the spliceosome and bring the splice sites together. The intron loops into a lariat (lasso) shape as the branch-point A attacks the 5' splice site, then the intron is released as a lariat and the two exons are joined. The mature mRNA below shows E1-E2-E3 fused with cap and poly-A tail. The figure teaches that snRNPs recognize the GU...AG boundaries and that introns leave as lariats while exons remain in the message.

Splicing is performed by the spliceosome, a complex of small nuclear ribonucleoproteins (snRNPs), each a small nuclear RNA (snRNA) bound to proteins. The snRNAs base-pair with the conserved intron boundaries: introns characteristically begin with GU (5' splice site) and end with AG (3' splice site), with a branch-point adenosine inside. The chemistry is two transesterification reactions that form a lariat-shaped intron, later degraded. A few introns can self-splice as ribozymes, but in humans the major pathway is the protein-and-snRNA-driven spliceosome.

## KEY

Alternative splicing lets a single gene produce multiple distinct proteins by including or excluding particular exons in different cell types, a major reason humans have ~20,000 genes but far more proteins. This is the high yield 'why splicing matters' point and a common explanation for proteome diversity in passages.

## TRAP

Memory hook: exons are EXpressed (kept) and introns stay IN the nucleus (removed). The MCAT loves to invert these in a tempting answer choice. Also note: capping and tailing are NOT splicing, but all three processing steps occur before export, and a mutation at a splice site (GU/AG) can disrupt the reading frame far downstream by causing intron retention or exon skipping.

## The Genetic Code

The genetic code is the set of rules mapping mRNA codons (triplets of nucleotides) to amino acids. With four bases read three at a time, there are 4³ = 64 possible codons. Sixty-one specify amino acids and three are stop signals. Several defining properties of the code show up constantly on the MCAT.

Key properties of the genetic code

Property	What it means	Consequence
Degenerate (redundant)	Most amino acids are encoded by more than one codon	A base change may not change the amino acid (silent mutation)
Unambiguous	Each codon specifies only one amino acid	No codon ever codes for two different residues
Non-overlapping	Each nucleotide is part of only one codon	Read in fixed triplets, sequentially
Comma-less / continuous	No gaps between codons	Reading frame is set by the start codon
Nearly universal	Nearly the same code in all organisms	Basis for recombinant protein expression; minor exceptions in mitochondria

The start codon is AUG, which also codes for methionine, so nearly every nascent polypeptide begins with Met (often cleaved off later). The three stop (nonsense) codons UAA, UAG, and UGA code for no amino acid; they recruit release factors to terminate translation. A reliable memory device for the stops: 'U Are Annoying, U Are Gone, U Go Away.'

Degeneracy is concentrated in the third codon position, the wobble position. The first two bases of a codon are the most informative; the third is often free to vary without changing the amino acid (e.g., GGU, GGC, GGA, GGG all encode glycine). On the tRNA side, the wobble hypothesis allows non-standard base pairing at the third codon position so that a single tRNA, sometimes using the modified base inosine in its anticodon, can read several synonymous codons. This is why cells can manage with fewer than 61 distinct tRNAs.

WORKED EXAMPLE

Using the start codon to set the frame, translate the mRNA 5'-G AUG UUU GGC UAA C-3'. Then state what happens if the first U of UUU is deleted (5'-G AUG UU GGC UAA C-3').

Find the start codon AUG to establish the reading frame; bases before it (the leading G) are untranslated. Reading in triplets from AUG: AUG (Met) UUU (Phe) GGC (Gly) UAA (stop). The peptide is Met-Phe-Gly (translation stops at UAA; the trailing C is not translated). Now delete one U from UUU. Downstream of the deletion the frame shifts by one base, so re-reading from AUG gives: AUG (Met) UUG (Leu) GCU (Ala) AAC (Asn) ... The original UAA stop is no longer in frame, so translation reads through into what used to be untranslated sequence until a new in-frame stop appears. A single-nucleotide deletion is a frameshift: every codon after the deletion is altered, usually yielding a nonfunctional (often truncated or extended) protein, far more damaging than a single point substitution.

TIP

To use a standard codon table you must read the mRNA codon (with U), not the DNA. If a passage gives DNA, convert to mRNA first (template → complement + T→U, or coding strand → just T→U). And always read 5'→3'.

## Translation Machinery: tRNA and the Ribosome

Translation requires three RNA classes working together. mRNA carries the codons. Transfer RNA (tRNA) is the adaptor: a ~75-nucleotide cloverleaf-folded molecule with an anticodon loop that base-pairs with the codon, and a 3'-CCA acceptor end that carries the amino acid. Ribosomal RNA (rRNA) forms the structural and catalytic core of the ribosome.

Before a tRNA can be used it must be 'charged', loaded with its correct amino acid, by an aminoacyl-tRNA synthetase. There is generally one synthetase per amino acid, and each is exquisitely specific for both its amino acid and its cognate tRNA(s). Charging consumes ATP, which is cleaved to AMP + PPi (pyrophosphate); subsequent hydrolysis of PPi to 2 Pi makes the reaction essentially irreversible, so the net cost is two high energy phosphate bonds. The resulting high energy aminoacyl-tRNA bond later drives peptide bond formation. This step is where the genetic code is physically 'read' into an amino acid, so synthetases are a critical fidelity checkpoint.

amino acid + tRNA + ATP → aminoacyl-tRNA + AMP + PPi (PPi → 2 Pi)

Catalyzed by aminoacyl-tRNA synthetase. ATP is cleaved to AMP + PPi (not ADP + Pi); hydrolysis of the released PPi to 2 Pi pulls the reaction forward, so two phosphoanhydride bonds are effectively spent. The 'charged' aminoacyl-tRNA is energetically primed for peptide bond formation.

### FIGURE: TRNA STRUCTURE AND CODON ANTICODON PAIRING

A tRNA drawn in its 2-D cloverleaf with three stem-loops and an acceptor stem. The bottom loop is the anticodon loop, with three anticodon bases shown. The top 3' end shows the CCA tail with an amino acid attached. Below, an mRNA strand runs 5'→3' and a codon (e.g., 5'-GCA-3') is shown base-pairing antiparallel with the tRNA anticodon (3'-CGU-5'). The figure teaches that codon and anticodon align antiparallel, that the amino acid hangs off the 3'-CCA end, and that the wobble (third) codon position pairs with the first anticodon base.

Ribosome subunits: prokaryote vs eukaryote

Feature	Prokaryote	Eukaryote
Whole ribosome	70S	80S
Large subunit	50S (contains 23S + 5S rRNA)	60S (contains 28S, 5.8S, 5S rRNA)
Small subunit	30S (contains 16S rRNA)	40S (contains 18S rRNA)
Initiator amino acid	fMet (N-formylmethionine)	Met
Ribosome-binding signal	Shine-Dalgarno sequence	5' cap (Kozak context)

## TRAP

Svedberg (S) units measure sedimentation rate, not mass, so they do NOT add linearly: 50S + 30S = 70S (not 80S), and 60S + 40S = 80S (not 100S). Expect the MCAT to test this. The 70S-vs-80S difference is also why antibiotics (e.g., aminoglycosides bind 30S; macrolides bind 50S) can target bacterial ribosomes without harming the host's 80S ribosomes.

The ribosome has three tRNA-binding sites read in order A → P → E. The A (aminoacyl) site receives the incoming charged tRNA whose anticodon matches the next codon. The P (peptidyl) site holds the tRNA bearing the growing polypeptide. The E (exit) site holds the now-empty (deacylated) tRNA about to leave. Peptide bond formation is catalyzed by the peptidyl transferase center, which is made of rRNA in the large subunit, making the ribosome a ribozyme (an RNA enzyme). This 'rRNA does the catalysis' fact is heavily tested.

## The Stages of Translation

Like transcription, translation has three stages, initiation, elongation, termination, and the energy-consuming steps use GTP (hydrolyzed to GDP + Pi). Knowing the order of events and where each tRNA sits at each step lets you answer mechanism questions quickly.

Initiation: the small ribosomal subunit binds the mRNA (via the 5' cap in eukaryotes, or the Shine-Dalgarno sequence upstream of the start codon in prokaryotes) and locates the start codon AUG. The initiator tRNA carrying Met (fMet in prokaryotes) base-pairs with AUG in the P site, note the initiator tRNA is the only tRNA that enters directly at the P site rather than the A site. The large subunit then joins, forming the complete ribosome. Initiation factors (IFs in prokaryotes, eIFs in eukaryotes) mediate these steps.

Elongation cycles repeat for each codon: (1) a charged aminoacyl-tRNA (escorted by elongation factor EF-Tu in prokaryotes / eEF1 in eukaryotes, with GTP hydrolysis) enters the A site and pairs with the codon; (2) the peptidyl transferase center forms a peptide bond, transferring the growing chain from the P-site tRNA onto the A-site amino acid; (3) translocation, the ribosome moves exactly one codon 3' along the mRNA (driven by EF-G/GTP in prokaryotes, eEF2 in eukaryotes), shifting the tRNAs from A→P and P→E and ejecting the spent tRNA from the E site. The A site is now empty and aligned over the next codon.

### FIGURE: THE ELONGATION CYCLE (A P E SITES)

A three-panel cycle. Panel 1: ribosome on mRNA with a peptidyl-tRNA in the P site and an incoming charged aminoacyl-tRNA entering the A site, codon-matched. Panel 2: a peptide bond forms, the polypeptide is transferred onto the A-site tRNA, so the A-site tRNA now bears the whole chain and the P-site tRNA is empty. Panel 3: translocation, the ribosome shifts one codon to the right; the chain-bearing tRNA is now in the P site, the empty tRNA moves to the E site and exits, and the A site opens over the next codon. The figure teaches the strict A→P→E directionality and that the chain always grows by transfer onto the newest amino acid in the A site.

Termination: when a stop codon (UAA, UAG, or UGA) enters the A site, no tRNA matches it. Instead a release factor binds, the peptidyl transferase center hydrolyzes the bond between the polypeptide and the final tRNA, the finished protein is released, and the ribosomal subunits dissociate for reuse. Multiple ribosomes can translate one mRNA simultaneously, forming a polyribosome (polysome) to boost output.

WORKED EXAMPLE

An antibiotic blocks the ribosome's translocation step (the EF-G/GTP-driven movement along mRNA). Explain precisely what accumulates and why protein synthesis halts.

Translocation is the step that physically advances the ribosome one codon and repositions the tRNAs A→P and P→E. If it is blocked AFTER a peptide bond has formed, the ribosome is stuck with the elongated polypeptide on the tRNA in the A site and an empty (deacylated) tRNA in the P site. The ribosome cannot move to expose the next codon in the A site, so no new aminoacyl-tRNA can be accommodated and no further peptide bonds form. The chain is frozen at its current length, synthesis stalls mid-elongation rather than terminating cleanly. (Fusidic acid works by trapping EF-G; the broader teaching point is that each elongation sub-step is a distinct, druggable target, and blocking any one stops the cycle.)

TIP

Energy accounting the MCAT likes: charging a tRNA costs the equivalent of 2 ATP (ATP→AMP+PPi, with PPi hydrolysis). Each elongation cycle then uses 2 GTP (one for delivery of the aminoacyl-tRNA, one for translocation). So adding one amino acid costs roughly 4 high energy phosphate bonds, translation is expensive, which is part of why it is tightly regulated.

## Prokaryote vs Eukaryote Differences & Post-Translational Modification

Because prokaryotes lack a nucleus, transcription and translation are coupled, ribosomes begin translating an mRNA's 5' end while RNA polymerase is still transcribing its 3' end. This is impossible in eukaryotes, where the nuclear envelope separates transcription (nucleus) from translation (cytoplasm) in both space and time, and where mRNA must be fully processed and exported first. Prokaryotic mRNA is also often polycistronic (one transcript, several genes/proteins, organized in operons), whereas eukaryotic mRNA is typically monocistronic.

Transcription & translation: prokaryote vs eukaryote

Feature	Prokaryote	Eukaryote
Location	Cytoplasm (coupled)	Transcription nuclear; translation cytoplasmic
mRNA processing	None (no cap/tail/splicing)	5' cap, poly-A tail, splicing
mRNA type	Often polycistronic (operons)	Monocistronic
RNA polymerases	One	Three (Pol I, II, III)
Ribosome / initiator	70S / fMet, Shine-Dalgarno	80S / Met, 5' cap

A freshly released polypeptide is rarely the final, functional protein. Post-translational modifications (PTMs) chemically alter the chain to activate it, target it, or tune its activity. High-yield examples the MCAT tests: proteolytic cleavage (e.g., zymogens like trypsinogen → trypsin, or proinsulin → insulin; cleaving an inactive precursor activates it), phosphorylation (kinases add a phosphate from ATP to Ser/Thr/Tyr to switch activity on or off, central to signal transduction), glycosylation (adding carbohydrate chains in the ER/Golgi, common on secreted and membrane proteins), and lipidation/prenylation (adding lipid anchors for membrane attachment).

Targeting is itself a PTM-adjacent process. Proteins destined for secretion, the membrane, or certain organelles carry an N-terminal signal sequence (signal peptide) recognized by the signal recognition particle (SRP), which pauses translation and directs the ribosome to the rough ER. The protein is threaded into the ER, the signal sequence is cleaved, and the protein moves through the ER→Golgi→secretory vesicle pathway, getting glycosylated and folded along the way. Proteins lacking such a signal are made on free cytosolic ribosomes and remain in the cytoplasm.

## KEY

Disulfide bond formation (between cysteine residues) is a key PTM that stabilizes secreted and extracellular proteins; it occurs in the oxidizing environment of the ER, not the reducing cytosol. Also remember that chaperones (e.g., heat-shock proteins) assist folding but are not part of the covalent 'code', folding fidelity is separate from sequence fidelity.

## TRAP

Don't conflate processing levels: capping/tailing/splicing modify the mRNA (post-transcriptional); cleavage/phosphorylation/glycosylation/disulfide bonds modify the protein (post-translational). A question asking 'which step adds a poly-A tail' wants transcription/RNA processing, while 'which step adds a phosphate to activate the enzyme' wants post-translational modification. Mapping the modification to the correct molecule (RNA vs protein) is the classic distractor.

WORKED EXAMPLE

A secreted hormone is synthesized as a larger inactive precursor. Trace the precursor from its gene to the active, secreted hormone, naming the molecule modified at each step.

1) Transcription (nucleus, RNA Pol II): the gene is transcribed into pre-mRNA. 2) RNA processing (nucleus): the pre-mRNA gets a 5' cap and poly-A tail, and introns are spliced out, these modify the RNA. 3) Export and translation: mature mRNA leaves the nucleus; because the protein is secreted, its N-terminal signal sequence is recognized by SRP, which routes the ribosome to the rough ER, and the nascent chain is threaded into the ER lumen as it is made. 4) Co-/post-translational modification of the protein: the signal sequence is cleaved; the protein is glycosylated and forms disulfide bonds in the ER, then traffics through the Golgi. 5) Proteolytic activation: the inactive precursor (a prohormone) is cleaved to remove inhibitory segments, yielding the mature active hormone, which is packaged into secretory vesicles and released by exocytosis. The key teaching point: RNA-level edits (cap/tail/splice) happen first and modify the transcript; protein-level edits (signal cleavage, glycosylation, disulfides, proteolytic activation) happen later and modify the polypeptide.
