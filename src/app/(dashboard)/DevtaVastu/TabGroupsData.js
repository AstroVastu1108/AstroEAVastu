const DEFAULT_POINTS = [
  { x: 280, y: 220 },
  { x: 620, y: 220 },
  { x: 620, y: 560 },
  { x: 280, y: 560 }
];


const DEFAULT_LINE_SETS = [
  {
    stroke: 'var(--mui-palette-primary-main)', // Uses the CSS variable for primary color
    strokeDasharray: '',
    strokeWidth: 0.5,
    name: 'Zone Line'
  },
  {
    stroke: '#1ba364ff',
     strokeWidth: 0.5,
    strokeDasharray: '5,5',
    name: 'Internal Zone Line'
  },
]


const DEFAULT_TAB_CONFIG = {
  NecessaryFiles: [
  {
    OriginalFileName: "",
    Base64File: "",
    isPdf: false,
    pdfImages:[],
    pdfPages:0,
    selectedPage:0,
  }],
  points: DEFAULT_POINTS,
  centroid: null,
  setCentroid: null,
  snapToCentroid: false,
  setSnapToCentroid: null,
  lockCentroid:false,
  setLockCentroid:null,
  lockChakra:false,
  setLockChakra:null,
  cropImage: false,
  setCropImage: null,
  rotation: 0,
  setRotation: null,
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
  setLineSets:DEFAULT_LINE_SETS,
  hideMarmaLines: false,
  setHideMarmaLines: null,
  hideMarmapoints: false,
  setHideMarmapoints: null,
  imageDragDone: false,
  setImageDragDone: null,
  hideCircleIntersaction: false,
  setHideCircleIntersaction: null,
  showDevta: false,
  setShowDevta: null,
  showDevtaIntersaction: false,
  setShowDevtaIntersaction: null,
  disableDraw: false,
  setDisableDraw: null,
};


const TAB_LABELS = [
  // 'Google Layout',
  'House Plan',
  // 'Griding With 16 Zone',
  // '16 Zone Bar Chart',
  // 'Marma Lines + Marma Points',
  // 'Civil Energy',
  // 'Devta Mark',
  // 'Devta Marking Color',
  // 'Devta bar chart',
  // 'Devta + Marma Points',
  // 'Custom Remedial Marking',
  // 'Site Energy audit',
  // 'Geo Energy audit',
];

export const TabsData = TAB_LABELS.map(label => ({ label, title: label, ...DEFAULT_TAB_CONFIG }));

