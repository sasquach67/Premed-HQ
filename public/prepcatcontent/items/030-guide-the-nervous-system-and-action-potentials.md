---
source: PrepCat content library
exported_at: 2026-07-12T05:26:19.418Z
item_number: 30
type: "GUIDE"
title: "The Nervous System and Action Potentials"
meta: "~31 min · 7 sections · cheat sheet"
---

Guide
Cheat sheet
BIO & BIOCHEM
~31 min read
# The Nervous System and Action Potentials

Neurons encode and transmit information as electrical signals built from ion gradients across their membranes. This guide traces the full pathway, from the resting potential and the all-or-none action potential, through refractory periods and saltatory conduction, to chemical synaptic transmission, postsynaptic integration, and the large-scale organization of the nervous system.

## ON THIS PAGE

## Neuron Anatomy and Supporting Glia

## The Resting Membrane Potential

## The Action Potential

## Refractory Periods and Conduction

## The Synapse and Neurotransmission

## Postsynaptic Integration and Graded Potentials

## Neurotransmitters and Organization of the Nervous System

## KEY ESSENTIALS

Resting potential (about -70 mV) is set mainly by K+ leak, so Vm sits near the K+ equilibrium potential (about -90 mV); the Na+/K+ pump (3 Na+ out, 2 K+ in) maintains the gradients but contributes only a few millivolts directly.
The action potential is all-or-none: voltage-gated Na+ channels open at threshold (about -55 mV) for rapid depolarization, then inactivate while slower voltage-gated K+ channels open to drive repolarization and afterhyperpolarization.
Stimulus intensity is encoded by firing frequency and neuron recruitment, never by action potential amplitude.
The absolute refractory period (Na+ channels inactivated) sets the maximum firing rate and forces one-way propagation; myelination and larger axon diameter both speed conduction (saltatory conduction jumps from node to node).
At a chemical synapse the action potential opens voltage-gated Ca2+ channels, and the resulting Ca2+ influx triggers vesicle fusion and neurotransmitter release. No calcium, no release.
The postsynaptic effect (EPSP vs IPSP) depends on which ions the receptor gates, not on the neurotransmitter's name; the neuron sums all inputs by temporal and spatial summation at the axon hillock and fires only if threshold is reached.
Autonomic wiring: all preganglionic neurons and all parasympathetic postganglionic neurons release acetylcholine, while sympathetic postganglionic neurons typically release norepinephrine.

## Neuron Anatomy and Supporting Glia

The nervous system runs on two cell types: neurons, the excitable cells that generate and transmit electrical signals, and glia, the support cells that surround and outnumber them. A neuron is functionally polarized, so information flows through a predictable sequence of compartments. Dendrites receive incoming signals and funnel them toward the cell body (soma), which houses the nucleus and integrates inputs. Where the soma narrows into the axon sits the axon hillock, the trigger zone where the decision to fire an action potential is made. The axon then carries that signal, sometimes over a meter, to the axon terminals (synaptic boutons), which release neurotransmitter onto the next cell.

Neurons are classified by the direction they carry information. Sensory (afferent) neurons carry signals from receptors toward the central nervous system; how those receptors actually transduce a stimulus into a signal is developed in the sensation and perception guide. Motor (efferent) neurons carry commands away from the central nervous system toward effectors such as muscles and glands. Interneurons, which make up the great majority of neurons in the body, lie entirely within the central nervous system and connect afferent to efferent pathways, performing the integration that underlies reflexes and all higher processing.

### FIGURE: THE FUNCTIONAL REGIONS OF A MYELINATED NEURON

Reading left to right, the figure shows bushy dendrites converging on a rounded cell body (soma) that contains the nucleus. The soma tapers to a cone-shaped axon hillock, marked as the trigger zone. A long axon extends rightward, wrapped in discrete segments of myelin (drawn as sausage-like sheaths) separated by small bare gaps labeled nodes of Ranvier. The axon ends in a spray of branched axon terminals, each capped by a bulbous synaptic bouton sitting opposite the dendrite of a downstream neuron. Arrows along the axon indicate one-way signal flow from dendrites toward terminals.

Many axons are wrapped in myelin, a fatty insulating sheath built from the plasma membranes of glial cells. Myelin is not continuous: it is interrupted at regular gaps called nodes of Ranvier, where the axonal membrane is exposed and voltage-gated sodium channels are concentrated. This arrangement lets the action potential jump from node to node, a fast mode of transmission called saltatory conduction that we return to under propagation. In the brain and cord, myelinated axons form the white matter, while unmyelinated cell bodies and dendrites form the gray matter.

The major glial cells

Glial cell	Location	Function
Oligodendrocyte	CNS	Myelinates axons; one cell wraps segments of multiple axons
Schwann cell	PNS	Myelinates axons; one cell forms a single internode of one axon
Astrocyte	CNS	Structural and metabolic support; helps form the blood-brain barrier; buffers extracellular K+ and recycles neurotransmitter
Microglia	CNS	Resident immune cells (phagocytes) that clear debris and pathogens
Ependymal cells	CNS	Line the ventricles; produce and circulate cerebrospinal fluid (CSF)
Satellite cells	PNS	Surround and support neuron cell bodies in ganglia

## KEY

Know the myelinating cells and the diseases that target them. In the central nervous system, oligodendrocytes myelinate (and are destroyed in multiple sclerosis). In the peripheral nervous system, Schwann cells myelinate (and are attacked in Guillain-Barre syndrome). A single oligodendrocyte myelinates many axons, whereas a single Schwann cell myelinates just one internode of one axon.

## The Resting Membrane Potential

Every neuron at rest holds a voltage across its plasma membrane, the resting membrane potential, of roughly -70 mV, with the inside negative relative to the outside. This potential exists because the membrane separates charge, leaving a slight excess of negative charge just inside the membrane and positive charge just outside. Two ingredients are required: unequal ion concentrations across the membrane, and selective permeability through ion channels. The transport machinery that builds these gradients is developed in the cell membranes and transport guide; here the focus is on how those gradients become a voltage and how that voltage powers signaling.

Approximate ion distribution across a mammalian neuron membrane

Ion	Outside (mM)	Inside (mM)	Equilibrium potential
K+	~5	~140	about -90 mV
Na+	~145	~15	about +60 mV
Cl-	~110	~10	about -65 mV
Ca2+	~1 to 2	~0.0001 (free)	about +120 mV

The concentration gradients are built and maintained by the Na+/K+ ATPase, which uses one ATP to pump 3 Na+ out and 2 K+ in. Because it moves three positive charges out for every two it brings in, the pump is electrogenic and contributes a small direct hyperpolarization of only a few millivolts. Its dominant role, however, is not to make the voltage directly but to maintain the steep Na+ and K+ gradients that everything else depends on.

## TRAP

A common misconception is that the Na+/K+ pump directly creates the -70 mV resting potential. It does not. Its direct electrogenic contribution is only about -4 mV. The resting potential is set mainly by potassium: at rest the membrane is far more permeable to K+ than to any other ion (through K+ leak channels), so the voltage sits close to the K+ equilibrium potential of about -90 mV, pulled slightly positive by a small Na+ leak. The pump's job is to keep the gradients from running down.

E_ion = (61.5 mV / z) * log10([ion]_outside / [ion]_inside)

The Nernst equation gives the equilibrium potential of a single ion at 37 C (the 61.5 mV factor is 2.303RT/F at body temperature; it is about 59 mV at 25 C). z is the ion's charge (+1 for Na+ and K+, -1 for Cl-, +2 for Ca2+). E_ion is the voltage at which an ion's electrical and chemical driving forces exactly cancel, so there is no net flow.

The equilibrium (Nernst) potential is the membrane voltage that would exactly balance a given ion's concentration gradient. If the membrane were permeable to only one ion, the resting potential would equal that ion's equilibrium potential. Real membranes are permeable to several ions at once, so the true resting potential is a permeability-weighted average of the individual equilibrium potentials, described by the Goldman-Hodgkin-Katz equation. Because K+ permeability dominates at rest, this weighted average lands near E_K, around -70 mV.

Vm = 61.5 mV * log10( (P_K[K]_o + P_Na[Na]_o + P_Cl[Cl]_i) / (P_K[K]_i + P_Na[Na]_i + P_Cl[Cl]_o) )

The Goldman equation weights each ion's contribution by its permeability P. Note that Cl-, an anion, enters with its concentrations inverted relative to the cations. Whichever ion is most permeable dominates Vm: at rest P_K is largest, so Vm sits near E_K; during the action potential P_Na briefly dominates, driving Vm toward E_Na.

WORKED EXAMPLE

A neuron has an extracellular K+ concentration of 5 mM and an intracellular K+ concentration of 140 mM. Estimate the potassium equilibrium potential at body temperature, and state which way K+ tends to move at the resting potential of -70 mV.

Apply the Nernst equation with z = +1: E_K = 61.5 mV * log10(5/140) = 61.5 mV * log10(0.0357) = 61.5 mV * (-1.45), which is about -89 mV. So the K+ equilibrium potential is roughly -90 mV. At the resting potential of -70 mV the membrane is more positive than E_K, so the net driving force pushes K+ out of the cell. This outward leak of K+ down its gradient is exactly what holds the resting potential near E_K, and the slow Na+/K+ pump returns that K+ to maintain the gradient.

## The Action Potential

When a neuron is depolarized past a critical voltage, the threshold of roughly -55 mV, it fires an action potential: a rapid, stereotyped, self-propagating spike in membrane voltage. The action potential is all-or-none. A stimulus that reaches threshold produces a full-amplitude spike, while a subthreshold stimulus produces none, and increasing stimulus strength beyond threshold does not make a bigger spike. The whole event lasts only a few milliseconds and unfolds in well-defined phases driven by voltage-gated sodium and potassium channels.

Phases of the action potential

Phase	Membrane voltage	Channel events
Resting	about -70 mV	Voltage-gated Na+ and K+ channels closed; K+ leak dominates
Depolarization (rising)	-55 mV to about +35 mV	Voltage-gated Na+ channels open; Na+ rushes in toward E_Na
Peak / overshoot	about +30 to +40 mV	Na+ channels begin to inactivate; voltage-gated K+ channels opening
Repolarization (falling)	+35 mV down to -70 mV	Na+ channels inactivated; voltage-gated K+ channels open and K+ flows out
Hyperpolarization (undershoot)	dips to about -80 to -90 mV	Slow voltage-gated K+ channels still open; Vm overshoots toward E_K
Return to rest	back to -70 mV	Voltage-gated K+ channels close; leak and pump restore the resting state

### FIGURE: A SINGLE ACTION POTENTIAL PLOTTED AS MEMBRANE VOLTAGE VERSUS TIME

The trace begins flat at the -70 mV resting potential. A stimulus nudges the voltage up to the threshold near -55 mV, marked by a dashed horizontal line; below this the membrane simply returns to rest, but at threshold the curve shoots almost vertically upward to a peak near +35 mV (rapid depolarization driven by Na+ influx). It then falls steeply back down (repolarization driven by K+ efflux), dips slightly below the resting line to about -80 mV (the afterhyperpolarization), and finally settles back to -70 mV. The entire spike spans roughly two to three milliseconds.

The shape of the spike comes from the kinetics of the voltage-gated sodium channel, which has two gates and three states. At rest its fast activation gate is closed while its slower inactivation gate is open, so the channel is closed but available. At threshold the activation gate snaps open, and because both gates are now open, Na+ floods in, producing the explosive rising phase. Within about a millisecond the inactivation gate swings shut, blocking the pore (the inactivated state) even though the membrane is still depolarized, and the channel cannot reopen until the membrane repolarizes and resets that gate. Voltage-gated K+ channels, by contrast, have a single gate that opens slowly; their delayed opening drives repolarization, and their delayed closing causes the afterhyperpolarization.

## KEY

The rising phase is a positive-feedback loop: depolarization opens voltage-gated Na+ channels, Na+ influx causes more depolarization, which opens still more channels. This regenerative cycle is why the action potential is all-or-none and why it does not lose amplitude as it travels. It is actively rebuilt at each point along the axon, unlike a passively spreading graded potential.

At the peak, the voltage approaches but never quite reaches the Na+ equilibrium potential of about +60 mV, because two things cut the inward Na+ current short: sodium channels begin to inactivate, and potassium channels begin to open and carry an opposing outward current. The balance tips and repolarization begins. During repolarization the membrane briefly overshoots past rest toward E_K, the afterhyperpolarization, because the slow K+ channels are still open, before they finally close and the membrane settles back to -70 mV.

## TRAP

If every action potential is identical in size, how does the nervous system tell a strong stimulus from a weak one? Not by amplitude, which never changes. Intensity is encoded by firing frequency, since a stronger stimulus makes a neuron fire more action potentials per second, and by recruitment of additional neurons. A bright light or a hard pinch means more spikes per second and more neurons firing, never larger spikes. This is a favorite MCAT distractor.

## Refractory Periods and Conduction

Immediately after firing, a patch of membrane is temporarily unable, or less able, to fire again. This is the refractory period, and it comes in two phases tied directly to the state of the voltage-gated sodium channels. During the absolute refractory period, no stimulus of any strength can trigger a second action potential because the Na+ channels are inactivated, with their inactivation gates shut, and simply cannot open. During the relative refractory period, some Na+ channels have reset and a stronger-than-normal stimulus can fire the cell, but it is harder because the membrane is hyperpolarized and K+ channels are still open.

Absolute vs relative refractory period

Feature	Absolute refractory period	Relative refractory period
Can another AP fire?	No, regardless of stimulus strength	Yes, but only with a stronger-than-normal stimulus
Na+ channel state	Inactivated (inactivation gate closed)	Partly recovered to the closed, resting-available state
Membrane voltage	Depolarized through early repolarization	Hyperpolarized (afterhyperpolarization)
Functional role	Sets the maximum firing rate; enforces one-way propagation	Raises the effective threshold; allows graded firing frequency

## TRAP

The absolute refractory period is caused by sodium channel inactivation, not by the Na+/K+ pump and not by depletion of sodium ions. Only a vanishingly small number of ions actually cross the membrane during a single spike, so bulk concentrations barely change. The limiting factor is the time the inactivation gate needs to reset after repolarization.

Refractoriness also explains why action potentials travel in only one direction. As a spike depolarizes the next stretch of axon ahead of it, the membrane just behind it is in its absolute refractory period and cannot be re-excited. The wave is therefore forced forward, away from the cell body and toward the terminals, with no backward echo.

Two axon properties set conduction speed. The first is axon diameter: a wider axon has lower internal (axial) resistance, so current spreads faster, which is why some invertebrates evolved giant axons for rapid escape reflexes. The second, and more powerful in vertebrates, is myelination. Myelin insulates the internodes, raising membrane resistance and lowering capacitance, so the depolarizing current spreads passively and quickly to the next node of Ranvier, where the action potential is regenerated. The impulse thus appears to leap from node to node, which is called saltatory conduction (from the Latin saltare, to jump).

## KEY

Saltatory conduction is fast because the action potential is only actively regenerated at the nodes of Ranvier, where voltage-gated Na+ channels are clustered, while between nodes the signal races through the insulated internode passively. Demyelination, as in multiple sclerosis, lets current leak across the previously insulated internodes, slowing or blocking conduction and producing the neurological deficits of the disease.

## The Synapse and Neurotransmission

When the action potential reaches the axon terminal, the signal must cross to the next cell. At an electrical synapse the cells are joined by gap junctions that let current pass directly and almost instantaneously, allowing synchronized firing, as in cardiac and some smooth muscle. The MCAT, however, focuses on the chemical synapse, where the presynaptic and postsynaptic membranes are separated by a narrow gap, the synaptic cleft, and the electrical signal is converted into a chemical messenger, the neurotransmitter, and then back into an electrical signal in the next cell.

Sequence of events at a chemical synapse

Step	Event
1. AP arrives	Depolarization reaches the presynaptic axon terminal (bouton)
2. Ca2+ entry	Voltage-gated Ca2+ channels open; Ca2+ flows into the terminal down its gradient
3. Vesicle fusion	Ca2+ triggers synaptic vesicles to dock and fuse with the presynaptic membrane (SNARE proteins mediate fusion)
4. Neurotransmitter release	Vesicles release neurotransmitter into the synaptic cleft by exocytosis
5. Receptor binding	Neurotransmitter diffuses across the cleft and binds receptors on the postsynaptic membrane
6. Postsynaptic response	Ion channels open, producing an excitatory (EPSP) or inhibitory (IPSP) graded potential
7. Termination	Neurotransmitter is removed by reuptake, enzymatic degradation, or diffusion

## KEY

Calcium is the critical link between electrical and chemical signaling. The arriving action potential does nothing at the synapse except open voltage-gated Ca2+ channels; it is the resulting Ca2+ influx that triggers vesicle fusion and neurotransmitter release. Remove extracellular calcium and the action potential still propagates, but no neurotransmitter is released.

Postsynaptic receptors come in two broad flavors. Ionotropic receptors are ligand-gated ion channels: neurotransmitter binding opens the channel directly, producing a fast, brief response on the order of milliseconds, ideal for rapid point-to-point signaling. Metabotropic receptors are G protein-coupled receptors that work through second messengers; they do not form a channel themselves but trigger an intracellular cascade that is slower in onset, longer-lasting, and amplifiable. The second-messenger machinery (G proteins, cAMP, IP3 and DAG) is detailed in the endocrine signaling guide. The same neurotransmitter can act on both receptor types; acetylcholine, for example, opens ionotropic nicotinic receptors but also acts on metabotropic muscarinic receptors.

The postsynaptic effect depends on which ion channels the receptor controls, not on the neurotransmitter's identity by itself. If the channels admit cations such as Na+ or Ca2+, the membrane depolarizes toward threshold, an excitatory postsynaptic potential (EPSP). If they admit Cl- inward or allow K+ outward, the membrane hyperpolarizes or is held away from threshold, an inhibitory postsynaptic potential (IPSP). Whether the postsynaptic neuron ultimately fires depends on the sum of all EPSPs and IPSPs, which is the subject of integration.

Signaling must stop quickly so the synapse can fire again. Three mechanisms clear neurotransmitter from the cleft. Reuptake uses transporters to pump it back into the presynaptic terminal or into glia, and is the target of selective serotonin reuptake inhibitors. Enzymatic degradation breaks it down within the cleft; acetylcholinesterase splits acetylcholine into acetate and choline, and the choline is recycled. Finally, simple diffusion carries neurotransmitter out of the cleft. Drugs and toxins that block any of these steps prolong and intensify signaling.

WORKED EXAMPLE

An organophosphate insecticide irreversibly inhibits acetylcholinesterase at neuromuscular junctions. What is the immediate effect on skeletal muscle, and why?

Acetylcholinesterase normally degrades acetylcholine in the synaptic cleft, terminating each signal. Inhibiting it lets acetylcholine accumulate and persist, so it repeatedly re-binds nicotinic receptors on the muscle fiber. The result is continuous, excessive stimulation: initially sustained contraction, progressing to a depolarizing blockade with fasciculations and ultimately paralysis, including of the respiratory muscles. The case illustrates that the postsynaptic outcome depends on neurotransmitter clearance just as much as on its release.

## Postsynaptic Integration and Graded Potentials

Individual EPSPs and IPSPs are graded potentials: small, local changes in membrane voltage whose size scales with the strength of the input. Unlike action potentials they have no threshold and no fixed amplitude, and they spread passively, decaying with distance from their origin, which makes them decremental. A single EPSP is far too small to fire the cell on its own and must combine with others. This combining happens across the dendrites and soma and is read out at the axon hillock.

Graded potentials vs action potentials

Property	Graded potential	Action potential
Amplitude	Variable; scales with the stimulus	Fixed; all-or-none
Threshold	None	Yes (about -55 mV)
Propagation	Passive, decremental (decays with distance)	Active, self-regenerating (non-decremental)
Summation	Yes; inputs can add together	No; the refractory period prevents it
Location	Dendrites and soma	Axon (initiated at the axon hillock)
Channels involved	Ligand-gated or mechanically gated	Voltage-gated Na+ and K+

Two forms of summation let small inputs add up to threshold. Temporal summation occurs when a single presynaptic neuron fires rapidly, so successive EPSPs arrive before the previous one decays and they stack on top of one another. Spatial summation occurs when several presynaptic neurons fire at nearly the same time, and their EPSPs arriving at different locations add together. Both EPSPs and IPSPs are summed, so inhibition can cancel excitation. The axon hillock, the trigger zone, carries the highest density of voltage-gated Na+ channels and is where the net membrane voltage is evaluated: if the sum reaches threshold there, an action potential fires.

## KEY

The neuron is a decision-maker. It continuously sums every excitatory and inhibitory input, and the verdict is rendered at the axon hillock: reach threshold and fire one full-sized action potential, or fall short and stay silent. This is why a neuron is often described as performing analog computation, the graded summation, that it converts into a digital output, the all-or-none spike.

WORKED EXAMPLE

At a neuron's axon hillock the resting potential is -70 mV and threshold is -55 mV. A single excitatory synapse produces a 5 mV EPSP, and a single inhibitory synapse produces a 5 mV IPSP. If three excitatory synapses and one inhibitory synapse fire simultaneously, does the neuron reach threshold?

Sum the inputs by spatial summation. Three EPSPs contribute 3 * (+5 mV) = +15 mV, and one IPSP contributes -5 mV, for a net change of +15 - 5 = +10 mV. Starting from -70 mV, the membrane reaches -70 + 10 = -60 mV. Threshold is -55 mV, so the membrane falls 5 mV short and no action potential fires. To reach threshold the neuron would need an additional net +5 mV, for example a fourth excitatory input, or the same inputs arriving rapidly enough to add temporal summation on top of the spatial summation.

## Neurotransmitters and Organization of the Nervous System

Zoom out from the single neuron to the whole system. The nervous system divides into the central nervous system, the brain and spinal cord, where integration happens, and the peripheral nervous system, the nerves connecting the central nervous system to the rest of the body. The peripheral nervous system in turn splits by direction into sensory (afferent) and motor (efferent) divisions, and the motor side splits by control into the somatic nervous system, which exerts voluntary control over skeletal muscle, and the autonomic nervous system, which exerts involuntary control over smooth muscle, cardiac muscle, and glands.

High-yield neurotransmitters

Neurotransmitter	Main role(s)	MCAT notes
Acetylcholine (ACh)	Neuromuscular junction; parasympathetic; CNS	Acts at nicotinic (ionotropic) and muscarinic (metabotropic) receptors; degraded by acetylcholinesterase
Glutamate	Major excitatory neurotransmitter of the CNS	Acts at AMPA and NMDA receptors; central to learning and long-term potentiation
GABA	Major inhibitory neurotransmitter of the brain	Opens Cl- channels (GABA-A); target of benzodiazepines and alcohol
Glycine	Major inhibitory neurotransmitter of the spinal cord	Also opens Cl- channels
Dopamine	Reward, motivation, motor control	Depleted in Parkinson disease; implicated in schizophrenia and addiction
Norepinephrine / Epinephrine	Sympathetic fight or flight; arousal	Catecholamines; degraded by MAO and COMT
Serotonin (5-HT)	Mood, sleep, appetite	Target of SSRIs
Endorphins / enkephalins	Endogenous opioids; pain modulation	Natural analgesics

The autonomic nervous system has two opposing branches that keep the body in balance. The sympathetic branch mobilizes the body for fight or flight, increasing heart rate, dilating the pupils and airways, and shunting blood to skeletal muscle while shutting down digestion. The parasympathetic branch governs rest and digest, slowing the heart, constricting the pupils, and stimulating digestion. Most organs receive both inputs and are controlled by the balance between them. Both branches use a two-neuron chain, in which a preganglionic neuron in the central nervous system synapses on a postganglionic neuron in a peripheral ganglion that then projects to the target organ.

Sympathetic vs parasympathetic

Feature	Sympathetic	Parasympathetic
Overall function	Fight or flight	Rest and digest
Origin in the cord	Thoracolumbar	Craniosacral
Ganglia location	Near the spinal cord (short preganglionic, long postganglionic)	Near or in the target organ (long preganglionic, short postganglionic)
Postganglionic neurotransmitter	Norepinephrine (mostly)	Acetylcholine
Effect on heart rate	Increases	Decreases
Effect on pupils	Dilates	Constricts

## TRAP

Do not oversimplify autonomic neurotransmitters. All preganglionic neurons in both branches, and all parasympathetic postganglionic neurons, release acetylcholine. Only sympathetic postganglionic neurons typically release norepinephrine, and even there are exceptions that use acetylcholine, including the sweat glands and the adrenal medulla, which is essentially a modified sympathetic ganglion that releases epinephrine directly into the blood.

The simplest functional circuit is the reflex arc, which lets the body respond before the brain is consciously involved. Its components in order are a receptor, a sensory (afferent) neuron, an integration center in the central nervous system (often the spinal cord), a motor (efferent) neuron, and an effector such as a muscle or gland. A monosynaptic reflex, such as the knee-jerk (patellar) stretch reflex, uses a single synapse between the sensory and motor neurons. A polysynaptic reflex, such as withdrawal from a painful stimulus, inserts one or more interneurons, allowing more complex and coordinated responses.

TIP

Keep the directions straight. Afferent neurons Arrive at the central nervous system (sensory, carrying information inward); Efferent neurons Exit the central nervous system (motor, carrying commands outward). The pairing SAME also works: Sensory equals Afferent, Motor equals Efferent. Reflex arcs always run afferent, then integration, then efferent.
