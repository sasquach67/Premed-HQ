---
source: PrepCat content library
exported_at: 2026-07-12T05:26:00.942Z
item_number: 18
type: "GUIDE"
title: "Waves, Sound & Optics"
meta: "~28 min · 6 sections · cheat sheet"
---

Guide
Cheat sheet
CHEM & PHYS
~28 min read
# Waves, Sound & Optics

Waves, sound, and optics package a handful of equations (v = fλ, Snell's law, the thin-lens/mirror equations) into rich quantitative and conceptual problems. The MCAT tests them because they connect to hearing, ultrasound, fiber optics, and the eye, and because sign conventions and the Doppler effect reliably trip students up.

## ON THIS PAGE

## Wave Fundamentals: Anatomy of a Wave

## Superposition, Interference & Standing Waves

## Sound: Intensity, Decibels, Pitch & Loudness

## The Doppler Effect

## Reflection, Refraction & Total Internal Reflection

## Mirrors, Lenses & the Thin-Lens Equation

## KEY ESSENTIALS

v = fλ: frequency is fixed by the SOURCE and stays constant when a wave crosses into a new medium, so v and λ change together. Sound is longitudinal; light is transverse. Energy & intensity ∝ amplitude².
Doppler f' = f(v ± v_o)/(v ∓ v_s): APPROACH raises pitch, RECESSION lowers it, pick signs to match the direction rather than memorizing them.
Snell n₁sinθ₁ = n₂sinθ₂ with n = c/v ≥ 1: into higher n light slows and bends TOWARD the normal; into lower n it speeds up and bends AWAY. Total internal reflection only goes high n → low n, above θc where sinθc = n₂/n₁.
Thin-lens/mirror 1/f = 1/o + 1/i, m = −i/o: converging lens / concave mirror f > 0; diverging lens / convex mirror f < 0; mirror f = R/2.
i > 0 = REAL image (inverted, projectable); i < 0 = VIRTUAL image (upright, not projectable). For a single lens or mirror, real images are always inverted and virtual always upright.
Decibels are logarithmic: β = 10 log(I/I₀), so ×10 in intensity = +10 dB and ×2 ≈ +3 dB; intensity falls off as 1/r² from a point source.
Standing waves: strings (node node) and open open pipes fit λ = 2L/n with ALL harmonics; a pipe closed at one end fits λ = 4L/n with ODD harmonics only and has the lowest fundamental for its length.

## Wave Fundamentals: Anatomy of a Wave

A wave is a disturbance that transfers energy (and momentum) through space without transferring matter. The medium's particles oscillate about fixed equilibrium positions; it is the pattern of disturbance, not the particles themselves, that travels. This single idea explains why a cork bobs up and down as water waves pass but does not drift across the pond, and why sound carries energy to your eardrum even though the air molecules between you and the speaker simply oscillate in place on average.

Mechanical waves come in two flavors. In a TRANSVERSE wave the particle oscillation is perpendicular to the direction of energy propagation, think of a wave on a string. (Light is also transverse, though it is an electromagnetic wave that needs no medium.) In a LONGITUDINAL wave the oscillation is parallel to the propagation direction, producing alternating compressions and rarefactions; sound in air is the canonical example. The MCAT loves to ask which type a given wave is, and the key fact is that sound is longitudinal while light is transverse.

Every periodic wave is described by a small set of quantities. The WAVELENGTH (λ) is the distance between two successive identical points (crest to crest). The PERIOD (T) is the time for one full cycle to pass a fixed point, and FREQUENCY (f = 1/T) is the number of cycles per second, measured in hertz (Hz). The AMPLITUDE (A) is the maximum displacement from equilibrium and sets the wave's energy, crucially, energy ∝ amplitude², not amplitude. Doubling the amplitude quadruples the energy (and intensity) carried.

v = f λ = λ / T

v = wave speed (m/s), f = frequency (Hz), λ = wavelength (m), T = period (s). Speed is set by the MEDIUM; f is set by the SOURCE.

## KEY

When a wave passes from one medium into another, its FREQUENCY is unchanged, the source still oscillates at the same rate, and cycles can't pile up or vanish at the boundary. Because v changes with the medium and f is fixed, the wavelength must change: λ = v/f. This is the conceptual backbone of refraction.

Phase describes where in its cycle a point on the wave is, often measured in degrees or radians. Two waves are 'in phase' if their crests line up (phase difference of 0°, or a path difference of a whole number of wavelengths) and 'out of phase' if a crest meets a trough (180°, or a path difference of a half-integer number of wavelengths). Phase relationships are what make interference, beats, and standing waves work.

WORKED EXAMPLE

A wave on a rope has a frequency of 5 Hz and a wavelength of 0.4 m. (a) What is its speed? (b) If the rope is replaced by a heavier one in which the same source now produces waves traveling at 1.0 m/s, what is the new wavelength?

(a) v = fλ = (5 Hz)(0.4 m) = 2.0 m/s. (b) The SOURCE still drives the rope at f = 5 Hz, frequency is fixed by the source and does not change when the medium changes. The new medium gives v = 1.0 m/s. Solve for wavelength: λ = v/f = (1.0 m/s)/(5 Hz) = 0.2 m. The wave slowed down and its wavelength shrank proportionally, exactly the behavior it would show crossing into a new optical medium.

## Superposition, Interference & Standing Waves

When two waves occupy the same space, their displacements add point-by-point, this is the PRINCIPLE OF SUPERPOSITION. Where crest meets crest you get CONSTRUCTIVE interference (a larger amplitude); where crest meets trough you get DESTRUCTIVE interference (a smaller, possibly zero, amplitude). After they overlap, the waves pass through each other unchanged. Whether interference is constructive or destructive at a given point depends on the path-length difference between the two sources relative to the wavelength.

Constructive: Δpath = m λ Destructive: Δpath = (m + ½) λ

Δpath = difference in distance traveled by the two waves; m = 0, 1, 2, … (an integer). Integer multiples of λ → in phase → constructive; half-integer multiples → out of phase → destructive. (Assumes the two sources start in phase.)

BEATS arise when two waves of slightly different frequencies overlap. The combined sound periodically swells and fades as the waves drift in and out of phase. The beat frequency, the number of loud soft cycles per second, equals the absolute difference of the two frequencies. Musicians tune instruments by adjusting one note until the beats slow down and disappear.

f_beat = | f₁ − f₂ |

f_beat = beat frequency (Hz); f₁, f₂ = the two interfering frequencies. The closer the two frequencies, the slower the beating.

When a wave reflects back on itself in a confined space, the forward and backward waves superpose to form a STANDING WAVE, a pattern that appears to oscillate in place rather than travel. Points that never move are NODES (destructive interference, zero amplitude); points of maximum oscillation are ANTINODES. Only certain wavelengths 'fit' the boundaries, producing RESONANCE: the discrete set of standing-wave frequencies an object naturally supports, called harmonics (or overtones).

### FIGURE: HARMONICS ON A STRING FIXED AT BOTH ENDS

A horizontal string clamped at both ends, so each end must be a node. The fundamental (1st harmonic) shows a single belly: nodes at each end, one antinode in the middle, with the string length L equal to half a wavelength (L = λ/2). The 2nd harmonic adds a node at the center, fitting one full wavelength (L = λ). The 3rd harmonic shows three bellies (L = 3λ/2). In general the nth harmonic fits n half-wavelengths, so λ_n = 2L/n and f_n = n·v/2L. The harmonics are evenly spaced: f₂ = 2f₁, f₃ = 3f₁, and so on.

Standing waves: strings vs. pipes

System	Boundary at ends	Allowed wavelengths	Harmonics present	Fundamental
String (both ends fixed)	Node Node	λ = 2L/n	All (1,2,3,…)	λ = 2L
Open open pipe	Antinode Antinode	λ = 2L/n	All (1,2,3,…)	λ = 2L
Closed open pipe	Node Antinode	λ = 4L/n (n odd)	Odd only (1,3,5,…)	λ = 4L

## TRAP

A pipe CLOSED at one end (closed open) has a node at the closed end and an antinode at the open end. It supports ONLY ODD harmonics (f₁, 3f₁, 5f₁ …) and has the LONGEST fundamental wavelength (4L), meaning the LOWEST fundamental pitch for a given length. The MCAT routinely asks for the harmonic series of a closed pipe; do not blindly apply the string/open-pipe formula. Note 'closed pipe' on the MCAT means closed at exactly one end.

WORKED EXAMPLE

An organ pipe closed at one end has a fundamental frequency of 100 Hz. List its next two resonant frequencies. If a second pipe of the same length were open at both ends, what would ITS fundamental frequency be? (Speed of sound = 340 m/s.)

Closed pipe: only odd harmonics are allowed, so the resonant frequencies are f₁ = 100 Hz, then 3f₁ = 300 Hz and 5f₁ = 500 Hz (the 200 Hz and 400 Hz 'even' overtones are absent). To get the length: the closed-pipe fundamental obeys λ₁ = 4L, and λ₁ = v/f₁ = 340/100 = 3.4 m, so L = 3.4/4 = 0.85 m. An OPEN OPEN pipe of the same length has fundamental λ = 2L = 1.7 m, giving f = v/λ = 340/1.7 = 200 Hz. The open pipe sounds one octave higher (twice the frequency) than the closed pipe of equal length, a classic comparison.

## Sound: Intensity, Decibels, Pitch & Loudness

Sound is a longitudinal pressure wave that requires a medium, it cannot travel through a vacuum. Its speed depends on the medium's stiffness (elastic modulus) and density, and is FASTEST in solids, slower in liquids, and slowest in gases (roughly 340 m/s in air, ~1500 m/s in water, ~5000 m/s in steel). In air, a warmer temperature raises the speed. Two perceptual qualities map onto two physical quantities: PITCH corresponds to frequency (higher f = higher pitch), and LOUDNESS corresponds to intensity (and thus to amplitude).

INTENSITY (I) is the power carried by the wave per unit area, in watts per square meter (W/m²). For a point source radiating equally in all directions, the same power spreads over a sphere whose area grows as r², so intensity obeys an inverse-square law: move twice as far away and the intensity drops to one quarter.

I = P / A = P / (4πr²) ⇒ I ∝ 1/r²

I = intensity (W/m²), P = source power (W), A = area the energy spreads over, r = distance from a point source. Doubling r cuts I to a fourth. Intensity is also ∝ amplitude².

Because the ear responds to an enormous range of intensities, loudness is reported on a logarithmic DECIBEL (dB) scale referenced to the threshold of hearing, I₀ = 1×10⁻¹² W/m². The logarithmic nature is the high yield part: every factor of 10 in intensity adds 10 dB, and every factor of 2 adds about 3 dB.

β = 10 log₁₀(I / I₀)

β = sound level in decibels (dB); I = intensity; I₀ = 1×10⁻¹² W/m² (reference threshold). A ×10 change in I = +10 dB; a ×100 change = +20 dB; a ×2 change ≈ +3 dB.

TIP

Decibel problems are almost always solvable by counting powers of 10, you rarely need a calculator log. Going from 40 dB to 80 dB is +40 dB = four factors of 10 = ×10,000 in intensity. Going from 60 dB to 63 dB is +3 dB ≈ doubling the intensity. Work in RATIOS, not absolute intensities.

WORKED EXAMPLE

A speaker produces a sound level of 70 dB at a distance of 2 m. (a) By how many dB does the level drop if you back away to 20 m? (b) What is the resulting sound level?

(a) Intensity follows the inverse-square law. Going from 2 m to 20 m is ×10 in distance, so intensity changes by 1/10² = 1/100, a factor-of-100 DECREASE. On the decibel scale, ÷100 in intensity = −20 dB (each ÷10 is −10 dB, and there are two of them). (b) New level = 70 dB − 20 dB = 50 dB. Notice we never needed the absolute intensity, the logarithmic scale lets us work entirely in ratios.

## The Doppler Effect

The DOPPLER EFFECT is the change in observed frequency when a source and observer move relative to each other. The everyday cue is an ambulance: its siren is higher-pitched as it speeds toward you and abruptly lower as it passes and recedes. Physically, motion toward you compresses the wave crests (shorter λ, higher f); motion away stretches them (longer λ, lower f). The source's actual emitted frequency never changes, only what the observer perceives does.

f' = f · (v ± v_o) / (v ∓ v_s)

f' = observed frequency, f = source frequency, v = speed of sound in the medium, v_o = observer's speed, v_s = source's speed (all speeds relative to the medium). Choose signs so that APPROACH gives a HIGHER f' and RECESSION gives a LOWER f'.

## TRAP

Do NOT memorize the ± / ∓ signs blindly, students constantly flip them. Instead, reason about direction every time: any relative APPROACH must RAISE the observed frequency, any relative RECESSION must LOWER it. Set up the fraction (observer's term in the numerator, source's in the denominator), then pick the sign on each moving term that pushes f' in the correct direction.

### FIGURE: WAVEFRONTS FROM A MOVING SOURCE

Concentric circular wavefronts emitted by a source moving to the right. Ahead of the source (the direction of motion) the circles are bunched together, short wavelength, high frequency, so an observer there hears a raised pitch. Behind the source the circles are spread apart, long wavelength, low frequency, so an observer there hears a lowered pitch. The source sits off-center inside its own wavefronts because it has moved between successive emissions.

The same principle applies to light (the relativistic Doppler effect), giving the redshift of receding galaxies and blueshift of approaching ones, useful background, but the MCAT will test the sound version quantitatively. A high yield application is medical ultrasound and Doppler echocardiography, where the frequency shift of sound reflected off moving red blood cells encodes blood-flow velocity.

WORKED EXAMPLE

A train sounds a 400 Hz horn while approaching a stationary observer at 34 m/s. The speed of sound is 340 m/s. (a) What frequency does the observer hear? (b) After the train passes and recedes at the same speed, what frequency does the observer hear now?

(a) Observer is stationary (v_o = 0), source approaches. Approach must RAISE the pitch, so the denominator must shrink: use (v − v_s). f' = 400 × 340/(340 − 34) = 400 × 340/306 = 400 × 1.111 ≈ 444 Hz. (Check: f' > 400, correct for approach.) (b) Now the source recedes, pitch must DROP, so the denominator must grow: use (v + v_s). f' = 400 × 340/(340 + 34) = 400 × 340/374 = 400 × 0.909 ≈ 364 Hz. The pitch fell, as expected. As the train passes, the heard pitch jumps from ~444 Hz down to ~364 Hz.

## Reflection, Refraction & Total Internal Reflection

Geometric optics treats light as rays traveling in straight lines until they hit a boundary. At a boundary, light can REFLECT (bounce back) and/or REFRACT (bend as it crosses into the new medium). The LAW OF REFLECTION is simple and exact: the angle of incidence equals the angle of reflection, both measured from the NORMAL, the line perpendicular to the surface, NOT from the surface itself. This is the crucial measurement convention for all of geometric optics.

θ_incidence = θ_reflection (angles measured from the normal)

Both angles are taken between the ray and the surface normal. Smooth surfaces give specular (mirror-like) reflection; rough surfaces give diffuse reflection but still obey this law locally at each point.

Refraction occurs because light travels at different speeds in different media. The INDEX OF REFRACTION n quantifies this: n = c/v, where c is the speed of light in vacuum (~3×10⁸ m/s) and v is its speed in the medium. Since light never exceeds c in a medium, n ≥ 1 always (n = 1.00 for vacuum, ~1.00 for air, 1.33 for water, ~1.5 for glass). A HIGHER index means SLOWER light and a more 'optically dense' medium.

n = c / v n₁ sin θ₁ = n₂ sin θ₂ (Snell's law)

n = index of refraction, c = speed of light in vacuum, v = speed in the medium; θ measured from the normal. Snell's law links the bending angle to the indices of the two media.

## KEY

The bending rule: going from low n to HIGH n (e.g., air into glass), light slows down and bends TOWARD the normal (smaller angle). Going from high n to LOW n (glass into air), light speeds up and bends AWAY from the normal (larger angle). Mnemonic: 'slow toward, fast away.' Frequency stays constant through it all; speed and wavelength change together.

When light tries to pass from a denser medium into a less dense one (high n to low n), the refracted ray bends away from the normal. Increase the angle of incidence enough and the refracted ray bends all the way to 90°, it grazes the surface. The incidence angle at which this happens is the CRITICAL ANGLE θc. Beyond it, no light escapes; it is ALL reflected back inside. This is TOTAL INTERNAL REFLECTION (TIR), the principle behind fiber optics and the sparkle of cut diamonds.

sin θc = n₂ / n₁ (requires n₁ > n₂)

θc = critical angle, n₁ = index of the denser medium the light starts in, n₂ = index of the less dense medium. Derived from Snell's law by setting the refraction angle to 90°. TIR happens only for incidence angles GREATER than θc.

## TRAP

Total internal reflection is impossible going from low n to high n, the math gives sin θc > 1, which has no solution. TIR ONLY occurs when light travels from the higher-index (slower) medium toward the lower-index (faster) one, AND the incidence angle exceeds the critical angle. If a question puts light going from air into water and asks about TIR, the answer is that it cannot occur.

One more boundary phenomenon: DISPERSION. A medium's index of refraction varies slightly with wavelength, so different colors bend by different amounts. A glass prism bends violet (short λ, higher n) more than red (long λ, lower n), splitting white light into a spectrum, and the same effect in water droplets produces a rainbow.

WORKED EXAMPLE

Light travels from water (n = 1.33) into a glass slab; can total internal reflection occur at this boundary? Separately, what is the critical angle for light going from glass (n = 1.5) into air (n = 1.0)?

Part 1: Water (n = 1.33) into glass (n = 1.5) is low n → high n, so light bends toward the normal and refracts; TIR is IMPOSSIBLE here because TIR requires starting in the denser (higher-n) medium. Part 2: Glass into air is high n → low n, so TIR is possible. sin θc = n₂/n₁ = 1.0/1.5 = 0.667, so θc = arcsin(0.667) ≈ 42°. Any ray striking the glass air boundary at more than ~42° from the normal is totally internally reflected, which is exactly why optical fibers trap light.

## Mirrors, Lenses & the Thin-Lens Equation

Mirrors and lenses form IMAGES by redirecting rays. Curved mirrors use reflection; lenses use refraction. Remarkably, the SAME equation governs both, the thin-lens/mirror equation, provided you keep the sign conventions straight. The two device families pair up: a CONVERGING (convex) lens behaves like a CONCAVE mirror (both bring parallel rays to a real focus, f > 0), while a DIVERGING (concave) lens behaves like a CONVEX mirror (both spread rays apart from a virtual focus, f < 0).

1/f = 1/o + 1/i m = −i/o = h_i/h_o

f = focal length, o = object distance (positive for real objects in front of the device), i = image distance, m = magnification, h_i and h_o = image and object heights. For a mirror, f = R/2 (half the radius of curvature).

Sign conventions (standard MCAT convention)

Quantity	Positive (+)	Negative (−)
Focal length f	Converging lens / Concave mirror	Diverging lens / Convex mirror
Object distance o	Real object (in front)	Virtual object (rare on MCAT)
Image distance i	Real image (other side for lens; same side / in front for mirror)	Virtual image (same side as object for lens; behind mirror)
Magnification m	Upright image	Inverted image

## KEY

Decode the answer from the SIGNS: a POSITIVE image distance i means a REAL image (light actually converges there, it can be projected on a screen and is inverted). A NEGATIVE i means a VIRTUAL image (upright, cannot be projected, what you see in a flat mirror or a magnifying glass). Magnification m: |m| > 1 enlarged, |m| < 1 reduced; positive m upright, negative m inverted. For a single mirror or lens, real images are always inverted and virtual images are always upright.

### FIGURE: CONVERGING LENS, OBJECT BEYOND 2F

A converging (biconvex) lens with focal points F marked at distance f on each side. An upright object arrow sits to the left, beyond twice the focal length. Two principal rays are drawn: one parallel ray that refracts through the far focal point, and one ray through the center of the lens that passes straight through. They cross on the far side, below the axis, forming a REAL, INVERTED, REDUCED image, exactly how a camera projects a small inverted image of a distant scene onto its sensor. Move the object inside the focal length and the refracted rays diverge after the lens, so you trace them backward to a VIRTUAL, UPRIGHT, ENLARGED image on the same side, the magnifying-glass case.

LENS POWER is the reciprocal of focal length in meters, measured in DIOPTERS (D): P = 1/f. A short focal length means a strong, highly curved lens (large |P|). Converging lenses have positive power; diverging lenses negative. When thin lenses are placed in contact, their powers simply ADD: P_total = P₁ + P₂. This additive rule is why eyeglass prescriptions are written in diopters and why corrective lenses combine cleanly with the eye's own lens.

P = 1 / f (f in meters, P in diopters) P_total = P₁ + P₂ + …

P = optical power (diopters, D). For thin lenses in contact, total power is the sum. A +4 D lens has f = +0.25 m; a −2 D lens has f = −0.5 m.

TIP

Two eye-disorder facts the MCAT reuses: MYOPIA (nearsightedness) is corrected with a DIVERGING lens (negative power) because the eye focuses light too soon (in front of the retina); HYPEROPIA (farsightedness) is corrected with a CONVERGING lens (positive power) because the eye focuses too late (behind the retina). Pair 'near-sighted → negative' to remember it.

WORKED EXAMPLE

A 2 cm tall object is placed 30 cm in front of a converging lens of focal length 10 cm. Find the image distance, the magnification, the image height, and describe the image (real/virtual, upright/inverted).

Use 1/f = 1/o + 1/i with f = +10 cm (converging) and o = +30 cm. So 1/i = 1/f − 1/o = 1/10 − 1/30 = 3/30 − 1/30 = 2/30, giving i = +15 cm. Positive i → REAL image, located 15 cm on the far side of the lens. Magnification m = −i/o = −15/30 = −0.5. The negative sign means INVERTED; |m| = 0.5 means reduced to half size. Image height h_i = m·h_o = (−0.5)(2 cm) = −1 cm (the negative just restates that it's inverted). Summary: a real, inverted image, 1 cm tall, 15 cm beyond the lens, the projector/camera geometry, consistent with an object placed beyond 2f.
