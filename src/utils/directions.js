// export const DIRECTION_DATA = {
//   numParts: 32,
//   radius: 300
// };


export const LINE_STYLES = {
  solid: '',
  dashed: '5,5',
  dotted: '2,2',
  dashedLong: '10,5',
  dashedDotted: '10,5,2,5'
};

export const DEFAULT_LINE_SETS = [
  {
    stroke: '#000',
    strokeWidth: 0.5,
    strokeDasharray: '5,5',
    name: 'Line 1'
  },
  {
    stroke: '#0066cc',
    strokeWidth: 0.5,
    strokeDasharray: '',
    name: 'Line 2'
  }
];

export const colors = {
  Yellow: '#FBEEBD',
  Red: '#F6CFCF',
  Green: '#DDEEBB',
  Blue: '#C5EEF8',
  Grey: '#F1F1F1'
}

export const devtaColors = {
  Brahma: colors.Yellow,
  Bhudhar: colors.Blue,
  Aryama: colors.Yellow,
  Viviswan: colors.Red,
  Mitra: colors.Grey,
  Aapaha: colors.Grey,
  Aapahavatsa: colors.Red,
  Savita: colors.Blue,
  Savitra: colors.Red,
  Indra: colors.Grey,
  Jaya: colors.Red,
  Rudra: colors.Blue,
  Rajyakshma: colors.Blue,
  Shikhi: colors.Blue,
  Parjanya: colors.Green,
  Jayant: colors.Green,
  Mahendra: colors.Green,
  Surya: colors.Blue,
  Satya: colors.Red,
  Bhrisha: colors.Green,
  Antriksh: colors.Yellow,
  Anil: colors.Yellow,
  Pusha: colors.Blue,
  Vitasta: colors.Red,
  GrihaSpatya: colors.Green,
  Yama: colors.Yellow,
  Gandharva: colors.Blue,
  Bhringraj: colors.Yellow,
  Mrigah: colors.Green,
  Pitra: colors.Blue,
  Dauwarik: colors.Blue,
  Sugreev: colors.Grey,
  Pushpdant: colors.Blue,
  Varun: colors.Grey,
  Asur: colors.Red,
  Shosha: colors.Yellow,
  Papyakshma: colors.Green,
  Roga: colors.Blue,
  Ahir: colors.Grey,
  Mukhya: colors.Blue,
  Bhallat: colors.Yellow,
  Soma: colors.Red,
  Bhujag: colors.Yellow,
  Aditi: colors.Grey,
  Diti: colors.Green
}

export const DIRECTION_DATA = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW'
];

export const Marmalines = [
  ['N8', 'W2'],
  ['E1', 'W1'],
  ['E2', 'S8'],
  ['W8', 'S2'],
  ['N1', 'S1'],
  ['N2', 'E8']
];

export const marmaDevta = [
  { value: '', color: 'gray', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '2L', color: 'gray', line: 1 },
  { value: '3L', color: 'gray', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '5L', color: 'gray', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '7L', color: 'gray', line: 1 },
  { value: '8L', color: 'red', line: 1 },
  { value: '9L', color: 'red', line: 1 },
  { value: '10L', color: 'red', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '12L', color: 'green', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '15L', color: 'gray', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '1', color: 'red', line: 2 },
  { value: '2', color: 'red', line: 2 },
  { value: '3', color: 'red', line: 2 },
  { value: '4', color: 'red', line: 2 },
  { value: '5', color: 'gray', line: 2 },
  { value: '6', color: 'gray', line: 2 },
  { value: '7', color: 'gray', line: 2 },
  { value: '8', color: 'red', line: 2 },
  { value: '9', color: 'red', line: 2 },
  { value: '10', color: 'red', line: 2 },
  { value: '11', color: 'red', line: 2 },
  { value: '12', color: 'red', line: 2 },
  { value: '13', color: 'gray', line: 2 },
  { value: '14', color: 'red', line: 2 },
  { value: '15', color: 'gray', line: 2 },
  { value: '16', color: 'gray', line: 2 },
  { value: '17', color: 'gray', line: 2 },
  { value: '2R', color: 'gray', line: 3 },
  { value: '3R', color: 'gray', line: 3 },
  { value: '', color: 'gray', line: 3 },
  { value: '5R', color: 'gray', line: 3 },
  { value: '', color: 'gray', line: 3 },
  { value: '7R', color: 'gray', line: 3 },
  { value: '8R', color: 'red', line: 3 },
  { value: '9R', color: 'red', line: 3 },
  { value: '10R', color: 'red', line: 3 },
  { value: '', color: 'gray', line: 3 },
  { value: '12R', color: 'green', line: 3 },
  { value: '', color: 'gray', line: 3 },
  { value: '', color: 'gray', line: 3 },
  { value: '15R', color: 'gray', line: 3 },
  { value: '', color: 'gray', line: 3 }
]

export const linemarmaDevta_1 = [
  { value: '', color: 'gray', line: 1 },
  { value: '2L', color: 'gray', line: 1 },
  { value: '3L', color: 'gray', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '5L', color: 'gray', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '7L', color: 'gray', line: 1 },
  { value: '8L', color: 'red', line: 1 },
  { value: '9L', color: 'red', line: 1 },
  { value: '10L', color: 'red', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '12L', color: 'green', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '', color: 'gray', line: 1 },
  { value: '15L', color: 'gray', line: 1 },
  { value: '', color: 'gray', line: 1 }
]
export const linemarmaDevta_2 = [
  { value: '', color: 'gray', line: 2 },
  { value: '1', color: 'red', line: 2 },
  { value: '2', color: 'red', line: 2 },
  { value: '3', color: 'red', line: 2 },
  { value: '4', color: 'red', line: 2 },
  { value: '5', color: 'gray', line: 2 },
  { value: '6', color: 'gray', line: 2 },
  { value: '7', color: 'gray', line: 2 },
  { value: '8', color: 'red', line: 2 },
  { value: '9', color: 'red', line: 2 },
  { value: '10', color: 'red', line: 2 },
  { value: '11', color: 'red', line: 2 },
  { value: '12', color: 'red', line: 2 },
  { value: '13', color: 'gray', line: 2 },
  { value: '14', color: 'red', line: 2 },
  { value: '15', color: 'gray', line: 2 },
  { value: '16', color: 'gray', line: 2 },
  { value: '17', color: 'gray', line: 2 }
]
export const linemarmaDevta_3 = [
  { value: '', color: 'gray', line: 2 },
  { value: '2R', color: 'gray', line: 3 },
  { value: '3R', color: 'gray', line: 3 },
  { value: '', color: 'gray', line: 3 },
  { value: '5R', color: 'gray', line: 3 },
  { value: '', color: 'gray', line: 3 },
  { value: '7R', color: 'gray', line: 3 },
  { value: '8R', color: 'red', line: 3 },
  { value: '9R', color: 'red', line: 3 },
  { value: '10R', color: 'red', line: 3 },
  { value: '', color: 'gray', line: 3 },
  { value: '12R', color: 'green', line: 3 },
  { value: '', color: 'gray', line: 3 },
  { value: '', color: 'gray', line: 3 },
  { value: '15R', color: 'gray', line: 3 },
  { value: '', color: 'gray', line: 3 }
]

// Marma Line points
export const specificLines = [
  ['N8', 'W2'],
  ['E1', 'W1'],
  ['E2', 'S8']
]

export const targetLines = [
  ['N8', 'E2'],
  ['N7', 'E3'],
  ['N6', 'E4'],
  ['N5', 'E5'],
  ['N4', 'E6'],
  ['N3', 'E7'],
  ['N2', 'E8'],
  ['N1', 'S1'],
  ['W8', 'S2'],
  ['W7', 'S3'],
  ['W6', 'S4'],
  ['W5', 'S5'],
  ['W4', 'S6'],
  ['W3', 'S7'],
  ['W2', 'S8']
]

export const intersectionCriteria = {
  N8_W2: {
    N8_E2: { name: '2L', color: 'gray' },
    N7_E3: { name: '3L', color: 'gray' },
    N6_E4: { name: '', color: 'gray' },
    N5_E5: { name: '5L', color: 'gray' },
    N4_E6: { name: '', color: 'gray' },
    N3_E7: { name: '7L', color: 'gray' },
    N2_E8: { name: '8L', color: 'red' },
    N1_S1: { name: '9L', color: 'red' },
    W8_S2: { name: '10L', color: 'red' },
    W7_S3: { name: '', color: 'gray' },
    W6_S4: { name: '12L', color: 'green' },
    W5_S5: { name: '', color: 'gray' },
    W4_S6: { name: '', color: 'gray' },
    W3_S7: { name: '15L', color: 'gray' },
    W2_S8: { name: '', color: 'gray' }
  },
  E1_W1: {
    N8_E2: { name: '2', color: 'red' },
    N7_E3: { name: '3', color: 'red' },
    N6_E4: { name: '4', color: 'red' },
    N5_E5: { name: '5', color: 'gray' },
    N4_E6: { name: '6', color: 'gray' },
    N3_E7: { name: '7', color: 'gray' },
    N2_E8: { name: '8', color: 'red' },
    N1_S1: { name: '9', color: 'red' },
    W8_S2: { name: '10', color: 'red' },
    W7_S3: { name: '11', color: 'red' },
    W6_S4: { name: '12', color: 'red' },
    W5_S5: { name: '13', color: 'gray' },
    W4_S6: { name: '14', color: 'red' },
    W3_S7: { name: '15', color: 'gray' },
    W2_S8: { name: '16', color: 'gray' }
  },
  E2_S8: {
    N8_E2: { name: '2R', color: 'gray' },
    N7_E3: { name: '3R', color: 'gray' },
    N6_E4: { name: '', color: 'gray' },
    N5_E5: { name: '5R', color: 'gray' },
    N4_E6: { name: '', color: 'gray' },
    N3_E7: { name: '7R', color: 'gray' },
    N2_E8: { name: '8R', color: 'red' },
    N1_S1: { name: '9R', color: 'red' },
    W8_S2: { name: '10R', color: 'red' },
    W7_S3: { name: '', color: 'gray' },
    W6_S4: { name: '12R', color: 'green' },
    W5_S5: { name: '', color: 'gray' },
    W4_S6: { name: '', color: 'gray' },
    W3_S7: { name: '15R', color: 'gray' },
    W2_S8: { name: '', color: 'gray' }
  }
}


export const specificLeftLines = [
  ['W8', 'S2'],
  ['N1', 'S1'],
  ['N2', 'E8']
]

export const targetLeftLines = [
  ['W8', 'N2'],
  ['W7', 'N3'],
  ['W6', 'N4'],
  ['W5', 'N5'],
  ['W4', 'N6'],
  ['W3', 'N7'],
  ['W2', 'N8'],
  ['W1', 'E1'],
  ['S8', 'E2'],
  ['S7', 'E3'],
  ['S6', 'E4'],
  ['S5', 'E5'],
  ['S4', 'E6'],
  ['S3', 'E7'],
  ['S2', 'E8']
]

export const leftintersectionCriteria = {
  W8_S2: {
    W8_N2: { name: '10LN', color: 'gray' },
    W7_N3: { name: '', color: 'green' },
    W6_N4: { name: '', color: 'gray' },
    W5_N5: { name: '', color: 'green' },
    W4_N6: { name: '', color: 'gray' },
    W3_N7: { name: '10LT', color: 'green' },
    W2_N8: { name: '10L', color: 'red' },
    W1_E1: { name: '10', color: 'red' },
    S8_E2: { name: '10R', color: 'red' },
    S7_E3: { name: '10RT', color: 'green' },
    S6_E4: { name: '', color: 'gray' },
    S5_E5: { name: '', color: 'green' },
    S4_E6: { name: '', color: 'gray' },
    S3_E7: { name: '', color: 'green' },
    S2_E8: { name: '10RN', color: 'gray' }
  },
  N1_S1: {
    W8_N2: { name: '9LE', color: 'gray' },
    W7_N3: { name: '3', color: 'gray' },
    W6_N4: { name: '4', color: 'gray' },
    W5_N5: { name: '5', color: 'gray' },
    W4_N6: { name: '6', color: 'gray' },
    W3_N7: { name: '', color: 'gray' },
    W2_N8: { name: '9L', color: 'red' },
    W1_E1: { name: '9', color: 'red' },
    S8_E2: { name: '9R', color: 'red' },
    S7_E3: { name: '', color: 'gray' },
    S6_E4: { name: '', color: 'gray' },
    S5_E5: { name: '9RE', color: 'gray' },
    S4_E6: { name: '', color: 'gray' },
    S3_E7: { name: '', color: 'gray' },
    S2_E8: { name: '', color: 'gray' }
  },
  N2_E8: {
    W8_N2: { name: '', color: 'gray' },
    W7_N3: { name: '', color: 'green' },
    W6_N4: { name: '', color: 'gray' },
    W5_N5: { name: '', color: 'green' },
    W4_N6: { name: '8LW', color: 'gray' },
    W3_N7: { name: '', color: 'green' },
    W2_N8: { name: '8L', color: 'red' },
    W1_E1: { name: '8', color: 'red' },
    S8_E2: { name: '8R', color: 'red' },
    S7_E3: { name: '', color: 'green' },
    S6_E4: { name: '8RW', color: 'gray' },
    S5_E5: { name: '', color: 'green' },
    S4_E6: { name: '', color: 'gray' },
    S3_E7: { name: '', color: 'green' },
    S2_E8: { name: '', color: 'gray' }
  }
}

export const labelsToExtract = [
  'I2',
  'I3',
  'I4',
  'I5',
  'I6',
  'I10',
  'I11',
  'I12',
  'I13',
  'I14',
  'I18',
  'I19',
  'I20',
  'I21',
  'I22',
  'I26',
  'I27',
  'I28',
  'I29',
  'I30'
]

export const labelsToExtract1 = [
  'X2',
  'X3',
  'X4',
  'X5',
  'X6',
  'X10',
  'X11',
  'X12',
  'X13',
  'X14',
  'X18',
  'X19',
  'X20',
  'X21',
  'X22',
  'X26',
  'X27',
  'X28',
  'X29',
  'X30'
]

export const devta = [
  'Brahma',
  'Bhudhar',
  'Aryama',
  'Viviswan',
  'Mitra',
  'Aapaha',
  'Aapahavatsa',
  'Savita',
  'Savitra',
  'Indra',
  'Jaya',
  'Rudra',
  'Rajyakshma',
  'Shikhi',
  'Parjanya',
  'Jayant',
  'Mahendra',
  'Surya',
  'Satya',
  'Bhrisha',
  'Antriksh',
  'Anil',
  'Pusha',
  'Vitasta',
  'GrihaSpatya',
  'Yama',
  'Gandharva',
  'Bhringraj',
  'Mrigah',
  'Pitra',
  'Dauwarik',
  'Sugreev',
  'Pushpdant',
  'Varun',
  'Asur',
  'Shosha',
  'Papyakshma',
  'Roga',
  'Ahir',
  'Mukhya',
  'Bhallat',
  'Soma',
  'Bhujag',
  'Aditi',
  'Diti'
]

export const data = [
  // fire element
  ['E4', 'E6', 'E', '#DDEEBB'],
  ['E6', 'E8', 'ESE', '#DDEEBB'],
  ['E8', 'S2', 'SE', 'red'],
  ['S2', 'S4', 'SSE', 'red'],
  ['S4', 'S6', 'S', 'red'],
  ['S6', 'S8', 'SSW', 'yellow'],
  // air element
  ['S8', 'W2', 'SW', 'yellow'],
  ['W2', 'W4', 'WSW', 'gray'],
  ['W4', 'W6', 'W', 'gray'],
  ['W6', 'W8', 'WNW', 'gray'],
  ['W8', 'N2', 'NW', 'gray'],
  // water element
  ['N2', 'N4', 'NNW', 'blue'],
  ['N4', 'N6', 'N', 'blue'],
  ['N6', 'N8', 'NNE', 'blue'],
  ['N8', 'E2', 'NE', 'blue'],
  ['E2', 'E4', 'ENE', '#DDEEBB']
]