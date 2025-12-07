import { Activity, Pronunciation } from './types';

export const SHIP_DEPARTURE_TIME = "17:30";
export const SHIP_ONBOARD_TIME = "17:00";
export const DATE_OF_VISIT = "2026-05-14";

// Coordinates
const COORDS = {
  FLAM_DOCK: { lat: 60.8638, lng: 7.1187 },
  FLAM_STATION: { lat: 60.8632, lng: 7.1145 },
  MYRDAL: { lat: 60.7353, lng: 7.1226 },
  AEGIR_PUB: { lat: 60.8638, lng: 7.1172 },
  GUDVANGEN: { lat: 60.8812, lng: 6.8413 },
  STEGASTEIN_VIEWPOINT: { lat: 60.9085, lng: 7.2123 },
  VISITOR_CENTER: { lat: 60.8622, lng: 7.1115 }
};

export const INITIAL_ITINERARY: Activity[] = [
  {
    id: '1',
    title: 'Desembarque y Orientación',
    startTime: '07:00',
    endTime: '07:20',
    locationName: 'Muelle de Cruceros',
    coords: COORDS.FLAM_DOCK,
    description: 'Flåm estará casi vacío. El aire de la mañana es fresco y el agua como un espejo.',
    keyDetails: 'Aprovecha para sacar fotos del barco y el fiordo en la luz de la mañana.',
    priceNOK: 0,
    priceEUR: 0,
    type: 'logistics',
    completed: false,
    notes: 'Webcam disponible'
  },
  {
    id: '2',
    title: 'El Tren (Flåmsbana)',
    startTime: '07:30',
    endTime: '09:30',
    locationName: 'Estación de Flåm',
    endLocationName: 'Estación Myrdal',
    coords: COORDS.FLAM_STATION,
    endCoords: COORDS.MYRDAL,
    description: 'Considerado uno de los viajes en tren más bonitos del mundo. Sube a 867m.',
    keyDetails: 'Prioridad: ¡Toma el primer tren! Asientos: Izquierda subida, derecha bajada.',
    priceNOK: 750,
    priceEUR: 65,
    type: 'transport',
    completed: false,
    notes: 'Parada en cascada Kjosfossen'
  },
  {
    id: '3',
    title: 'Almuerzo en Ægir BrewPub',
    startTime: '10:00',
    endTime: '11:30',
    locationName: 'Ægir BrewPub',
    coords: COORDS.AEGIR_PUB,
    description: 'Edificio inspirado en mitología nórdica. Chimenea central de 9 metros.',
    keyDetails: '¡Tiempo para el festín! El pub abre antes en días de crucero.',
    priceNOK: 500,
    priceEUR: 43,
    type: 'food',
    completed: false
  },
  {
    id: '4',
    title: 'Fjord Cruise + Bus',
    startTime: '12:00',
    endTime: '14:30',
    locationName: 'Puerto Flåm',
    endLocationName: 'Gudvangen',
    coords: COORDS.FLAM_DOCK,
    endCoords: COORDS.GUDVANGEN,
    description: 'Navegarás por el Nærøyfjord (UNESCO). Parte más estrecha y espectacular.',
    keyDetails: 'Logística: Salida barco eléctrico 12:00. Regreso en bus (shuttle incluido).',
    priceNOK: 1100, 
    priceEUR: 95,
    type: 'sightseeing',
    completed: false
  },
  {
    id: '5',
    title: 'Mirador Stegastein',
    startTime: '15:00',
    endTime: '16:30',
    locationName: 'Parada Bus Flåm',
    endLocationName: 'Mirador Stegastein',
    coords: COORDS.FLAM_STATION,
    endCoords: COORDS.STEGASTEIN_VIEWPOINT,
    description: 'Plataforma que sobresale 30m de la montaña a 650m sobre el fiordo.',
    keyDetails: 'Toma el bus a las 15:00. Vistas espectaculares.',
    priceNOK: 410,
    priceEUR: 36,
    type: 'sightseeing',
    completed: false
  },
  {
    id: '6',
    title: 'Compras y Relax',
    startTime: '16:30',
    endTime: '17:00',
    locationName: 'Centro de Visitantes',
    coords: COORDS.VISITOR_CENTER,
    description: 'Tiendas de souvenirs con suéteres de lana y artesanías.',
    keyDetails: 'Último café. Estás a pasos del muelle.',
    priceNOK: 0,
    priceEUR: 0,
    type: 'shopping',
    completed: false
  },
  {
    id: '7',
    title: 'Regreso al Barco',
    startTime: '17:00',
    endTime: '17:30',
    locationName: 'Muelle',
    coords: COORDS.FLAM_DOCK,
    description: 'Hora límite de embarque 17:30.',
    keyDetails: 'Debes estar en el muelle a las 17:00.',
    priceNOK: 0,
    priceEUR: 0,
    type: 'logistics',
    completed: false,
    notes: 'CRITICAL'
  }
];

export const PRONUNCIATIONS: Pronunciation[] = [
  { word: 'Flåm', phonetic: '/floːm/', simplified: 'FLOUM', meaning: 'Llanura pequeña entre montañas' },
  { word: 'Flåmsbana', phonetic: '/flɔmsbɑːnɑ/', simplified: 'FLOM-baana', meaning: 'Tren de Flåm' },
  { word: 'Myrdal', phonetic: '/myːrdɑl/', simplified: 'MÜR-dal', meaning: 'Valle pantanoso' },
  { word: 'Ægir', phonetic: '/ˈɛːjiɾ/', simplified: 'ÉG-uir', meaning: 'Gigante del mar (Mitología)' },
  { word: 'Nærøyfjord', phonetic: '/ˈnɛːrœɪfjɔr/', simplified: 'NEHR-oy-fiuord', meaning: 'Fiordo estrecho' },
  { word: 'Stegastein', phonetic: '/ˈstɛgɑstɑɪn/', simplified: 'STÉ-ga-stain', meaning: 'Piedra del sendero' },
  { word: 'Gudvangen', phonetic: '/ˈgʉdʋɑŋən/', simplified: 'GÜD-vang-en', meaning: 'Campo de los dioses' },
];