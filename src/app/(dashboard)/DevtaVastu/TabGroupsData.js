const DEFAULT_POINTS = [
  { x: 220, y: 220 },
  { x: 560, y: 220 },
  { x: 560, y: 560 },
  { x: 220, y: 560 }
];


const DEFAULT_LINE_SETS = [
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
]


const DEFAULT_TAB_CONFIG = {
  points: DEFAULT_POINTS,
  centroid: null,
  setCentroid: null,
  snapToCentroid: false,
  setSnapToCentroid: null,
  lockCentroid:false,
  setLockCentroid:null,
  lockChakra:false,
  setLockChakra:null,
  inputDegree: 0,
  setInputDegree: null,
  translate: { x: 0, y: 0 },
  setTranslate: null,
  zoom: 1,
  setZoom: null,
  polygons:[],
  setPolygons:null,
  hide32Circle:false,
  setHide32Circle:null,
  hide16Circle:false,
  setHide16Circle:null,
  hide8Circle:false,
  setHide8Circle:null,
  hide4Circle:false,
  setHide4Circle:null,
  hideCircle:false,
  setHideCircle:null,
  lineSets:DEFAULT_LINE_SETS,
  setLineSets:DEFAULT_LINE_SETS
};
// export const TabsData = [
//   {
//     label: 'Google Layout',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   },
//   {
//     label: 'House Plan',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   },
//   {
//     label: 'Griding With 16 Zone',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   },
//   {
//     label: '16 Zone Bar Chart',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   },
//   {
//     label: 'Civil Energy',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   },
//   {
//     label: 'Devta Mark',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   },
//   {
//     label: 'Devta Marking Color',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   },
//   {
//     label: 'Devta bar chart',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   },
//   {
//     label: 'Devta + Marma Points',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   },
//   {
//     label: 'Custom Remedial Marking',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   },
//   {
//     label: 'Site Energy audit',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   },
//   {
//     label: 'Geo ',
//     points: DEFAULT_POINTS,
//     centroid: null,
//     setCentroid: null,
//     snapToCentroid: false,
//     setSnapToCentroid: null,
//     inputDegree: 0,
//     setInputDegree: null,
//     translate:{ x: 0, y: 0 },
//     setTranslate:null,
//     zoom:1,
//     setZoom:1
//   }
// ]

const TAB_LABELS = [
  'Google Layout',
  'House Plan',
  'Griding With 16 Zone',
  '16 Zone Bar Chart',
  'Marma Lines + Marma Points',
  'Civil Energy',
  'Devta Mark',
  'Devta Marking Color',
  'Devta bar chart',
  'Devta + Marma Points',
  'Custom Remedial Marking',
  'Site Energy audit',
  'Geo Energy audit',
];

export const TabsData = TAB_LABELS.map(label => ({ label, title: label, ...DEFAULT_TAB_CONFIG }));

