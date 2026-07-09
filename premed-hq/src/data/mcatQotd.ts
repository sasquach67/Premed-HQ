/* Curated MCAT "Question of the Day" bank.
   There's no official free MCAT QotD API, so this is a small rotating,
   extendable bank (deterministic daily pick). Add your own anytime. */
export interface McatQuestion {
  id: string
  section: 'Bio/Biochem' | 'Chem/Phys' | 'Psych/Soc' | 'CARS'
  question: string
  choices: string[]
  answer: number // index into choices
  explanation: string
}

export const MCAT_QOTD: McatQuestion[] = [
  {
    id: 'q1',
    section: 'Bio/Biochem',
    question: 'Which enzyme is the primary regulatory (rate-limiting) step of glycolysis?',
    choices: ['Hexokinase', 'Phosphofructokinase-1', 'Pyruvate kinase', 'Aldolase'],
    answer: 1,
    explanation: 'PFK-1 catalyzes the committed step (F6P → F1,6BP) and is the key allosteric control point — inhibited by ATP/citrate, activated by AMP/F2,6BP.',
  },
  {
    id: 'q2',
    section: 'Chem/Phys',
    question: 'A solution’s pH rises from 4 to 6. How does [H⁺] change?',
    choices: ['Increases 2×', 'Decreases 2×', 'Decreases 100×', 'Increases 100×'],
    answer: 2,
    explanation: 'pH is a log scale: each unit is 10×. Two units higher pH = 10² = 100× lower [H⁺].',
  },
  {
    id: 'q3',
    section: 'Psych/Soc',
    question: 'Classical conditioning pairs a neutral stimulus with an unconditioned stimulus to produce a:',
    choices: ['Conditioned response', 'Operant response', 'Reflex arc', 'Fixed action pattern'],
    answer: 0,
    explanation: 'After repeated pairing, the previously neutral stimulus becomes a conditioned stimulus that elicits a conditioned response (Pavlov).',
  },
  {
    id: 'q4',
    section: 'Bio/Biochem',
    question: 'Which has the highest electron-carrier yield per molecule in the citric acid cycle?',
    choices: ['1 NADH', '3 NADH, 1 FADH₂, 1 GTP', '2 ATP only', '1 FADH₂'],
    answer: 1,
    explanation: 'One full turn of the TCA cycle yields 3 NADH, 1 FADH₂, and 1 GTP (plus 2 CO₂).',
  },
  {
    id: 'q5',
    section: 'Chem/Phys',
    question: 'An ideal gas at constant temperature has its volume halved. Its pressure:',
    choices: ['Halves', 'Doubles', 'Is unchanged', 'Quadruples'],
    answer: 1,
    explanation: 'Boyle’s law: at constant T, P ∝ 1/V. Halving V doubles P.',
  },
]
