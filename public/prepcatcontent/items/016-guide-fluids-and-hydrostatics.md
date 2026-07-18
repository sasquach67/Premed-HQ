---
source: PrepCat content library
exported_at: 2026-07-12T05:25:57.908Z
item_number: 16
type: "GUIDE"
title: "Fluids & Hydrostatics"
meta: "~28 min · 7 sections · cheat sheet"
---

Guide
Cheat sheet
CHEM & PHYS
~28 min read
# Fluids & Hydrostatics

Fluids and hydrostatics covers how liquids and gases exert pressure, why objects float or sink, and how fluids move through pipes and vessels. The MCAT tests this heavily because it underlies blood flow, breathing, IV drips, and lab techniques, and because it rewards conceptual reasoning with units rather than heavy computation.

## ON THIS PAGE

## Density, Specific Gravity, and Pressure

## Hydrostatic Pressure: Pressure in a Fluid at Rest

## Pascal's Principle and Hydraulics

## Archimedes' Principle and Buoyancy

## Fluid Dynamics: Continuity and Flow Rate

## Bernoulli's Equation and the Venturi Effect

## Viscosity, Poiseuille Flow, and Turbulence

## KEY ESSENTIALS

Hydrostatic gauge pressure depends ONLY on depth and density: P_gauge = ρgh (independent of container shape and total fluid volume); absolute pressure adds the surface pressure: P_abs = P₀ + ρgh.
Archimedes: F_b = ρ_fluid·V_displaced·g, use the FLUID's density and the SUBMERGED volume, never the object's. For a floating object, fraction submerged = ρ_object/ρ_fluid (and SG < 1 floats, > 1 sinks).
Continuity (mass): A₁v₁ = A₂v₂, so narrower → faster (v ∝ 1/r²). Bernoulli (energy): P + ½ρv² + ρgh = constant, so faster flow means LOWER static pressure (Venturi), valid for ideal fluids only.
Pascal's principle multiplies FORCE, not work: F₁/A₁ = F₂/A₂, but the larger piston moves a proportionally shorter distance (A₁d₁ = A₂d₂).
Poiseuille: Q ∝ r⁴, halving a vessel's radius cuts flow to 1/16, which is why tiny diameter changes dominate blood flow and resistance.
Key trap: gauge pressure excludes atmospheric pressure, and depth pressure ignores container shape and the total amount of fluid above, only vertical depth and density matter.

## Density, Specific Gravity, and Pressure

A fluid is anything that flows, both liquids and gases. Fluids cannot sustain a shear stress at rest, so they deform continuously under shear and take the shape of their container. Two quantities anchor this entire topic: density and pressure. Get comfortable converting their units, because most fluid 'calculations' on the MCAT are really unit-tracking exercises dressed up as physics.

Density (ρ, 'rho') is mass per unit volume. It is an intrinsic property of a substance at a given temperature and pressure, a drop of water and a swimming pool of water have the same density. Water is the reference you must memorize: 1000 kg/m³, equivalently 1 g/cm³ or 1 g/mL. Knowing these are equal saves you from unit disasters on test day.

ρ = m / V

ρ = density (kg/m³), m = mass (kg), V = volume (m³). For water, ρ = 1000 kg/m³ = 1 g/cm³ = 1 g/mL.

Specific gravity (SG) is the ratio of a substance's density to the density of water (at 4 °C). It is dimensionless, the units cancel. Because water's density is 1 g/cm³, the specific gravity of a substance is numerically equal to its density expressed in g/cm³. This makes SG a fast mental shortcut: a fluid with SG = 1.05 (like whole blood) has a density of 1.05 g/cm³ = 1050 kg/m³. The key consequence is buoyancy: SG < 1 means the object floats in water, SG > 1 means it sinks, and SG = 1 means it is neutrally buoyant.

SG = ρ_substance / ρ_water

Dimensionless. Numerically equals the density in g/cm³. SG < 1 floats in water; SG > 1 sinks; SG = 1 is neutrally buoyant.

Pressure (P) is force exerted per unit area, directed perpendicular (normal) to a surface. The SI unit is the pascal (Pa = N/m²). Pressure itself is a scalar, it has no direction, even though the force it produces on any given surface does point in a definite direction. At any point in a fluid, pressure pushes equally in all directions; this is why a balloon under water is squeezed uniformly from every side, not just from above.

P = F / A

P = pressure (Pa = N/m²), F = magnitude of force perpendicular to the surface (N), A = area (m²).

Pressure units you must recognize

Unit	Equivalent	When it appears
1 pascal (Pa)	1 N/m²	SI base unit
1 atm	101,325 Pa ≈ 1.013 × 10⁵ Pa	Standard atmospheric pressure
1 atm	760 mmHg = 760 torr	Barometers, blood pressure, gas-law problems
1 atm	≈ 10.3 m of water	Depth at which water's gauge pressure ≈ 1 atm
1 bar	10⁵ Pa ≈ 0.987 atm	Roughly one atmosphere

## KEY

Memorize the atmosphere conversions: 1 atm ≈ 101 kPa = 760 mmHg = 760 torr ≈ 10.3 m of water. The MCAT loves to give you mmHg (blood pressure) and ask for an answer in Pa, or vice versa.

TIP

Because pressure is force over area, a small force on a tiny area can create enormous pressure (a needle tip, a stiletto heel), while a huge force spread over a large area produces little pressure (lying on a bed of nails, snowshoes on snow). Same force, different area, very different pressure.

## Hydrostatic Pressure: Pressure in a Fluid at Rest

When a fluid sits at rest (hydrostatics), the pressure increases with depth because each layer of fluid must support the weight of all the fluid above it. This is the single most tested quantitative idea in the topic. The pressure contributed by the fluid column itself, the gauge pressure, depends on only three things: the fluid's density, the gravitational field strength, and the vertical depth below the surface.

P_gauge = ρgh

ρ = fluid density (kg/m³), g = 9.8 m/s² (use 10 to estimate), h = vertical depth below the surface (m). Gives the pressure added by the fluid column, in Pa. Assumes an incompressible fluid of uniform density.

Absolute pressure is the total, true pressure at a point: it adds the pressure pushing down on the surface of the fluid (usually atmospheric pressure, P₀) to the gauge pressure from the fluid column. Gauge pressure is the amount above atmospheric, it is literally what a tire gauge or blood-pressure cuff reads, because those instruments are calibrated to read zero when exposed to atmospheric pressure.

P_absolute = P₀ + ρgh

P₀ = pressure at the surface (often atmospheric, ≈ 1.01 × 10⁵ Pa). The ρgh term is the gauge pressure. So P_gauge = P_absolute − P₀ (P_absolute − P_atm at an open surface).

### FIGURE: PRESSURE DEPENDS ON DEPTH, NOT SHAPE

Three connected vessels of wildly different shapes, a thin tube, a wide cone, and an irregular flask, are joined at the bottom and filled with the same fluid. The figure shows the fluid rising to exactly the same height in all three, and a horizontal dashed line marking equal pressure at equal depth across all vessels. The teaching point: pressure at a given depth is identical regardless of the container's shape or how much total fluid sits above. Only vertical depth h and density ρ matter, not the width, not the total volume. This is the 'hydrostatic paradox': a point at the bottom of a narrow tube and a point at the same depth in a wide tank experience the same pressure.

## TRAP

Hydrostatic pressure depends on VERTICAL depth only, not on the shape of the container, the total volume of fluid, or the path you trace down to the point. A diver 10 m down in a narrow well and 10 m down in the open ocean feel the same gauge pressure. The MCAT loves to draw a weirdly shaped container to bait you into thinking total volume or width matters.

A barometer is the classic application. Invert a tube full of mercury into a dish of mercury; atmospheric pressure pushing on the open dish supports a column of mercury in the tube. At equilibrium, atmospheric pressure equals ρgh of the mercury column, which is why 1 atm = 760 mmHg, the mercury rises 760 mm. Using water instead would require a column over 10 meters tall (water is ~13.6× less dense than mercury), which is exactly why barometers use dense mercury.

WORKED EXAMPLE

A diver descends to 20 m in seawater (ρ = 1025 kg/m³). What is the absolute pressure at that depth? Use g = 10 m/s² and P_atm = 1.0 × 10⁵ Pa.

Step 1, Gauge pressure from the water column: P_gauge = ρgh = (1025)(10)(20) = 205,000 Pa ≈ 2.05 × 10⁵ Pa. Step 2, Add atmospheric pressure to get absolute: P_abs = P_atm + ρgh = 1.0 × 10⁵ + 2.05 × 10⁵ = 3.05 × 10⁵ Pa, or about 3 atm. Sanity check: roughly every 10 m of water adds ~1 atm of gauge pressure, so 20 m adds ~2 atm on top of the 1 atm at the surface, giving ~3 atm total. The numbers match, good.

TIP

Useful rule of thumb: every 10 m of depth in water adds approximately 1 atm of pressure. This lets you estimate answers quickly and immediately catch a wrong order of magnitude.

## Pascal's Principle and Hydraulics

Pascal's principle states that a pressure change applied to an enclosed, incompressible fluid is transmitted undiminished to every portion of the fluid and to the walls of the container. Because the fluid passes the pressure change along equally, you can apply a small force over a small area at one point and recover a large force over a large area somewhere else. This is the foundation of all hydraulic machines, car lifts, hydraulic brakes, dentist chairs.

P₁ = P₂ → F₁ / A₁ = F₂ / A₂

The applied pressure is equal at both pistons of a hydraulic system. F = force on each piston, A = cross-sectional area of each piston. The wider piston feels the larger force. (This compares the two pistons at the same height; a height difference adds a ρgh term.)

Rearranging gives the force-multiplication ratio: F₂ = F₁ × (A₂/A₁). If the output piston has 100 times the area of the input piston, the output force is 100 times larger. This looks like free energy, but it is not. Work is conserved. The trade-off is distance: the larger piston moves a proportionally shorter distance than the smaller one, because the same volume of incompressible fluid is pushed past both.

W = F₁d₁ = F₂d₂ and A₁d₁ = A₂d₂

Work in equals work out (ideal, frictionless system). The same volume is displaced on both sides (V = A·d), so if force is multiplied by 100, displacement distance is divided by 100.

## KEY

Hydraulics multiply FORCE, not WORK or ENERGY. You never get more energy out than you put in. Force up by a factor means distance down by the same factor. Think of it as a hydraulic analog of a lever or a pulley system.

WORKED EXAMPLE

In a hydraulic lift, a 50 N force is applied to a piston of area 0.01 m². The output piston has an area of 0.50 m². (a) What maximum weight can the lift support? (b) If the input piston is pushed down 0.40 m, how far does the output piston rise?

(a) Force scales with the area ratio: F₂ = F₁ × (A₂/A₁) = 50 × (0.50 / 0.01) = 50 × 50 = 2500 N. So the lift can support up to 2500 N. (b) Volume is conserved: A₁d₁ = A₂d₂, so d₂ = d₁ × (A₁/A₂) = 0.40 × (0.01 / 0.50) = 0.40 × (1/50) = 0.008 m = 0.8 cm. Check via work: input work = 50 × 0.40 = 20 J; output work = 2500 × 0.008 = 20 J. Work in equals work out, exactly as Pascal's principle and energy conservation demand.

## Archimedes' Principle and Buoyancy

Why do things float? Because pressure increases with depth, the bottom of a submerged object sits in higher-pressure fluid than its top. The fluid therefore pushes up on the bottom harder than it pushes down on the top, producing a net upward force: the buoyant force. Archimedes' principle quantifies it elegantly, the buoyant force equals the weight of the fluid the object displaces.

F_b = ρ_fluid · V_displaced · g

F_b = buoyant force (N, directed upward), ρ_fluid = density of the FLUID (not the object), V_displaced = volume of fluid pushed aside = the submerged volume of the object, g = 9.8 m/s².

## TRAP

The density in the buoyancy formula is the FLUID's density, and the volume is the DISPLACED (submerged) volume, never the object's density, and the object's full volume only if it is fully submerged. Students reflexively plug in the object's properties. The buoyant force does not 'know' what the object is made of; it only cares about the fluid pushed aside.

Whether an object floats or sinks is a contest between buoyant force (up) and weight (down), which is settled by comparing the object's average density to the fluid's. If ρ_object < ρ_fluid, the object floats; if ρ_object > ρ_fluid, it sinks; if they are equal, it is neutrally buoyant and hovers at any depth. This is why specific gravity is so handy: SG directly tells you the float/sink outcome in water.

### FIGURE: BUOYANCY AS A PRESSURE DIFFERENCE

A rectangular block is shown fully submerged in fluid. Short pressure arrows point inward (downward) on the top face and longer arrows point inward (upward) on the bottom face, illustrating that the deeper bottom experiences greater pressure. The side-arrow pairs cancel horizontally. The unbalanced vertical pressure produces a net upward buoyant force F_b, drawn as a single large arrow at the block's center, opposing the downward weight W. The figure teaches that buoyancy arises directly from the depth-dependence of pressure, it is not a separate magical force.

For a FLOATING object (in equilibrium), the buoyant force exactly equals the object's weight. Setting F_b = W and writing both in terms of density and volume gives the fraction-submerged relationship, one of the cleanest, most testable results in the whole topic.

F_b = W → ρ_fluid · V_sub · g = ρ_object · V_total · g → V_sub / V_total = ρ_object / ρ_fluid

For a floating object, the fraction of its volume submerged equals the ratio of its density to the fluid's density. An iceberg (ρ ≈ 917 kg/m³) in seawater (ρ ≈ 1025 kg/m³) floats with ~917/1025 ≈ 0.90 submerged, hence '~90% below the surface.'

WORKED EXAMPLE

A wooden block of density 600 kg/m³ floats in water (1000 kg/m³). (a) What fraction is submerged? (b) The same block is placed in oil of density 800 kg/m³. Is more or less of it submerged?

(a) For a floating object, V_sub/V_total = ρ_object/ρ_fluid = 600/1000 = 0.60. So 60% of the block is underwater and 40% sticks out. (b) In oil, V_sub/V_total = 600/800 = 0.75. So 75% is submerged in oil, MORE of the block sits below the surface. Why? Oil is less dense than water, so a given volume of displaced oil weighs less; the block must displace a larger volume to generate enough buoyant force to support its (unchanged) weight. General rule: the less dense the fluid, the deeper a floating object sits.

TIP

Apparent weight of a fully submerged object = true weight − buoyant force. This is how 'weighing in water' problems work: the scale reading drops by exactly the weight of fluid displaced. If the buoyant force meets or exceeds the true weight, the object will not stay submerged, it floats up.

## TRAP

A floating object displaces a volume of fluid whose WEIGHT equals the object's full weight. A fully submerged (sunken or held-under) object displaces a volume equal to its full geometric volume. Mixing these two cases is a classic MCAT error, always ask first: is it floating or fully submerged?

## Fluid Dynamics: Continuity and Flow Rate

Now the fluid moves. To keep things tractable, the MCAT models an 'ideal fluid': incompressible (constant density), nonviscous (no internal friction), with steady, laminar (smooth, layered) flow. Under these assumptions, two equations do almost all the work: continuity and Bernoulli.

The continuity equation is conservation of mass for a fluid. In a closed pipe with no leaks, whatever volume of an incompressible fluid enters per second must exit per second. The volume flow rate Q (volume per unit time) is therefore constant along the pipe. Since Q = A·v (cross-sectional area times flow speed), a narrower pipe forces the fluid to speed up.

Q = A·v = constant → A₁v₁ = A₂v₂

Q = volume flow rate (m³/s), A = cross-sectional area (m²), v = flow speed (m/s). Narrow section (small A) → fast flow (large v). Speed and area are inversely related.

## KEY

Continuity is purely geometric: an incompressible fluid speeds up in narrow sections and slows down in wide ones. Picture pinching a garden hose, the water shoots out faster. Remember the inverse relationship: speed is inversely proportional to area, and therefore to the square of the radius (since A = πr²).

WORKED EXAMPLE

Water flows at 2 m/s through a pipe of radius 4 cm. The pipe narrows to a radius of 2 cm. What is the flow speed in the narrow section?

Use continuity: A₁v₁ = A₂v₂. Since A = πr², the π cancels: r₁²v₁ = r₂²v₂. So v₂ = v₁ × (r₁/r₂)² = 2 × (4/2)² = 2 × 4 = 8 m/s. The radius halved, so the area quartered, so the speed quadrupled. Key insight: speed scales with the INVERSE SQUARE of the radius. Halving the radius multiplies speed by 4, not 2, a trap if you forget to square the ratio.

## Bernoulli's Equation and the Venturi Effect

Bernoulli's equation is conservation of energy applied to an ideal fluid. Along a single streamline, the sum of pressure energy, kinetic energy density, and gravitational potential energy density is constant. Each term has units of pressure (Pa), which is also energy per unit volume (J/m³), a handy consistency check.

P + ½ρv² + ρgh = constant (along a streamline)

P = static (absolute) pressure, ½ρv² = dynamic pressure (kinetic energy density), ρgh = gravitational term (potential energy density). All three terms are in pascals. Valid only for an ideal fluid: incompressible, nonviscous, steady, laminar flow.

The most exam-relevant consequence: at constant height, where a fluid moves FASTER its static pressure is LOWER, and where it moves slower its pressure is higher. This is counterintuitive, people expect fast-moving fluid to 'push harder', but energy conservation demands that if kinetic energy density (½ρv²) goes up, static pressure (P) must come down to keep the sum constant. This pressure drop in a constriction is the Venturi effect.

### FIGURE: VENTURI TUBE

A horizontal pipe with a narrow constriction in the middle. Three vertical standpipes (manometers) rise from the wide narrow wide sections. The figure shows the fluid level LOWEST in the standpipe over the narrow constriction and HIGHER over the wide sections. Flow arrows show fast flow through the constriction. The teaching point: by continuity the fluid speeds up in the narrow throat; by Bernoulli, faster flow means lower static pressure, so the fluid is pushed up less in that standpipe. Fast flow = low static pressure, made visible by the differing manometer heights.

## TRAP

Bernoulli says FAST FLOW = LOW STATIC PRESSURE (at the same height). This is the opposite of most students' intuition. Combine it with continuity: a narrow pipe → faster flow (continuity) → lower static pressure (Bernoulli). Many MCAT passages chain these two together, narrowing a vessel both speeds the fluid and drops its static pressure.

Continuity vs. Bernoulli, keep them straight

Continuity	Bernoulli
Conserves	Mass (volume flow)	Energy
Relates	Area ↔ speed	Speed/height ↔ pressure
Narrow pipe (same height)	Speed increases	Static pressure decreases
Key equation	A₁v₁ = A₂v₂	P + ½ρv² + ρgh = const

Bernoulli reasoning is invoked to describe a wide range of phenomena the MCAT may reference: airplane lift (air moves faster over the curved top of a wing, so pressure there is lower, giving a net upward force, the dominant rigorous explanation also involves the wing deflecting air downward, but for the MCAT the 'faster-over-top → lower pressure' link is what is tested), a roof lifting off in a windstorm, the curve of a spinning ball, an atomizer or carburetor drawing fluid up into a fast air stream, and arterial stenosis (narrowing) producing a low-pressure, high-velocity jet. In every case, identify where the fluid moves fastest and conclude that the static pressure is lowest there.

WORKED EXAMPLE

Water flows through a horizontal pipe. In the wide section the speed is 2 m/s and the gauge pressure is 50,000 Pa. In a narrow section the speed rises to 6 m/s. What is the gauge pressure in the narrow section? (ρ_water = 1000 kg/m³.)

Horizontal pipe, so the ρgh terms are equal on both sides and cancel. Bernoulli reduces to: P₁ + ½ρv₁² = P₂ + ½ρv₂². Solve for P₂: P₂ = P₁ + ½ρ(v₁² − v₂²) = 50,000 + ½(1000)(2² − 6²) = 50,000 + 500(4 − 36) = 50,000 + 500(−32) = 50,000 − 16,000 = 34,000 Pa. The pressure dropped from 50,000 to 34,000 Pa as the fluid sped up, exactly the Venturi effect. (Because both terms are pressures and ρgh canceled equally, you can use gauge pressures directly here.)

## Viscosity, Poiseuille Flow, and Turbulence

Real fluids are not ideal, they have viscosity (η, 'eta'), an internal friction that resists flow as adjacent fluid layers slide past one another. Honey is highly viscous; water is much less so; gases least of all. Viscosity is why pushing fluid through a pipe requires a sustained pressure difference, and why Bernoulli's frictionless model is only an approximation.

For viscous, laminar flow through a cylindrical tube, Poiseuille's law gives the volume flow rate. You will rarely need to plug numbers into it, but you absolutely must know its proportionalities, especially the dramatic dependence on radius.

Q = (π · r⁴ · ΔP) / (8 · η · L)

Q = flow rate (m³/s), r = tube radius, ΔP = pressure difference driving flow, η = viscosity, L = tube length. The headline: Q ∝ r⁴. Flow rate is exquisitely sensitive to radius and inversely proportional to viscosity and length.

## KEY

Flow rate scales with the FOURTH POWER of the radius (Q ∝ r⁴). Halving a vessel's radius cuts the flow to 1/16 of its original value (at fixed ΔP). This is why tiny changes in blood-vessel diameter (vasoconstriction/vasodilation) dominate the body's control of blood flow and pressure, and why a small amount of plaque can drastically reduce flow.

Flow also comes in two regimes. Laminar flow is smooth and orderly, with fluid moving in parallel layers (fastest at the center of the tube, zero right at the walls, the 'no-slip' condition). Turbulent flow is chaotic, with eddies and mixing; it tends to occur at high speed, low viscosity, or large diameter, and it dissipates much more energy. The Reynolds number predicts which regime applies, a low value means laminar, a high value means turbulent.

Re = (ρ · v · D) / η

Re = Reynolds number (dimensionless), ρ = density, v = speed, D = diameter (or characteristic length), η = viscosity. Low Re → laminar (smooth); high Re → turbulent (chaotic). For pipe flow, roughly Re < 2000 is laminar and Re > 4000 is turbulent, with a transitional zone between.

## TRAP

Bernoulli's equation assumes NO viscosity and laminar flow. If a passage emphasizes viscosity, friction, energy loss along a pipe, or turbulence, Bernoulli does not strictly apply, static pressure drops along a pipe even at constant diameter due to viscous losses. For viscous, steady flow through a tube, reach for Poiseuille's law instead.

Two more 'real-fluid' phenomena round out the high yield list. Surface tension arises because molecules at a liquid's surface have fewer neighbors than those in the bulk and are pulled inward, making the surface behave like a stretched elastic membrane, it lets water striders walk on water and pulls small droplets into spheres (the shape with the least surface area for a given volume). Capillary action is the rise (or fall) of a liquid in a narrow tube: when adhesion to the tube wall exceeds the liquid's cohesion, the liquid climbs and forms a concave (upward-curving) meniscus, as water does in glass. When cohesion dominates (mercury in glass), the liquid is depressed and forms a convex meniscus. Narrower tubes produce greater capillary rise (rise is inversely proportional to tube radius).

Proportionalities to memorize

Relationship	Meaning
Q ∝ r⁴ (Poiseuille)	Flow rate explodes with radius; a small constriction → huge drop in flow
v ∝ 1/A ∝ 1/r² (continuity)	Narrow pipe → faster flow
P ↓ when v ↑ (Bernoulli)	Fast flow → low static pressure (same height)
F_b ∝ V_displaced (Archimedes)	More submerged volume → more buoyancy
P_gauge ∝ h (hydrostatics)	Gauge pressure rises linearly with depth
