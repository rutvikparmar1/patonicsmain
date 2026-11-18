import { project } from "./world-map";

/**
 * Shipping lanes out of Gujarat, as [longitude, latitude] waypoints.
 *
 * These follow the real routing a container actually takes — through the Gulf
 * of Aden and Suez for anything westbound, through the Strait of Hormuz for the
 * Gulf, through Malacca for the Far East. Straight lines between ports would
 * cut across Arabia and Africa, which is the giveaway that a map is decorative
 * rather than describing a business.
 *
 * Canada is served through Montreal rather than Vancouver so no lane crosses
 * the antimeridian, where an equirectangular path would wrap back across the
 * whole map.
 */

export const ORIGIN = { port: "Mundra & Kandla", region: "Gujarat, India", lon: 69.7, lat: 22.8 };

/** Shared westbound leg: Arabian Sea, Gulf of Aden, Red Sea, Suez. */
const TO_SUEZ: Point[] = [
  [69.7, 22.8],
  [66, 20],
  [60, 14],
  [52, 12.5],
  [45, 12],
  [43, 13.5],
  [40, 17],
  [37, 22],
  [34, 27],
  [32.6, 29.9],
  [32.3, 31.3],
];

/** Shared eastbound leg: south of India, across the Bay of Bengal, through Malacca. */
const TO_MALACCA: Point[] = [
  [69.7, 22.8],
  [68, 18],
  [72, 10],
  [77, 5],
  [82, 4],
  [90, 4],
  [96, 4],
  [99, 3],
  [101, 2.5],
  [104, 2],
];

/** Mediterranean run from Suez out to Gibraltar. */
const MED_TO_GIBRALTAR: Point[] = [
  [28, 33],
  [20, 34.5],
  [12, 37],
  [4, 37],
  [-5.4, 35.9],
];

export type Point = [number, number];

export type Lane = {
  id: string;
  market: string;
  port: string;
  via: string;
  points: Point[];
};

export const SEA_LANES: Lane[] = [
  {
    id: "europe",
    market: "Europe",
    port: "Rotterdam",
    via: "Suez",
    points: [
      ...TO_SUEZ,
      ...MED_TO_GIBRALTAR,
      [-9, 36.5],
      [-10, 40],
      [-9.5, 44],
      [-6, 47],
      [-3, 49.5],
      [1, 50.5],
      [4.1, 51.9],
    ],
  },
  {
    id: "usa",
    market: "USA",
    port: "New York",
    via: "Suez & the Atlantic",
    points: [
      ...TO_SUEZ,
      ...MED_TO_GIBRALTAR,
      [-12, 35.5],
      [-25, 35],
      [-42, 36],
      [-58, 38],
      [-70, 40],
      [-73.9, 40.6],
    ],
  },
  {
    id: "canada",
    market: "Canada",
    port: "Montreal",
    via: "the North Atlantic",
    points: [
      ...TO_SUEZ,
      ...MED_TO_GIBRALTAR,
      [-11, 38],
      [-22, 42],
      [-36, 45],
      [-50, 47],
      [-58, 48],
      [-64, 49],
      [-68, 48.5],
      [-71, 47],
      [-73.5, 45.6],
    ],
  },
  {
    id: "turkey",
    market: "Turkey",
    port: "Mersin",
    via: "Suez",
    points: [...TO_SUEZ, [32, 32.5], [33, 34], [34.6, 36.6]],
  },
  {
    id: "uae",
    market: "UAE",
    port: "Jebel Ali",
    via: "the Strait of Hormuz",
    points: [
      [69.7, 22.8],
      [65, 22],
      [60, 24],
      [57.5, 25.4],
      [56.3, 26.4],
      [55.6, 25.9],
      [55.05, 24.98],
    ],
  },
  {
    id: "africa",
    market: "Africa",
    port: "Mombasa",
    via: "the Arabian Sea",
    points: [
      [69.7, 22.8],
      [65, 18],
      [60, 12],
      [55, 7],
      [50, 2],
      [45, -1],
      [42, -3],
      [39.8, -4],
    ],
  },
  {
    id: "south-asia",
    market: "South Asia",
    port: "Colombo",
    via: "the Laccadive Sea",
    points: [
      [69.7, 22.8],
      [70, 18],
      [73, 12],
      [76, 8],
      [79, 6.2],
      [79.85, 6.93],
    ],
  },
  {
    id: "china",
    market: "China",
    port: "Shanghai",
    via: "Malacca",
    points: [...TO_MALACCA, [105, 5], [108, 10], [112, 16], [116, 21], [119, 25], [121.5, 30.8]],
  },
  {
    id: "japan",
    market: "Japan",
    port: "Yokohama",
    via: "Malacca",
    points: [
      ...TO_MALACCA,
      [105, 5],
      [108, 10],
      [112, 16],
      [116, 21],
      [120, 24],
      [123, 29],
      [127, 32],
      [132, 33],
      [137, 34.5],
      [139.6, 35.2],
    ],
  },
  {
    id: "australia",
    market: "Australia",
    port: "Melbourne",
    via: "the Indian Ocean",
    points: [
      [69.7, 22.8],
      [68, 15],
      [73, 5],
      [82, -3],
      [92, -10],
      [102, -18],
      [110, -26],
      [115, -32],
      [122, -35],
      [131, -37],
      [140, -38.5],
      [144.8, -38],
    ],
  },
];

/** Countries Patonics states it ships to, used to pick out the served markets. */
export const SERVED_COUNTRIES = new Set([
  "India",
  "United States of America",
  "Canada",
  "United Kingdom",
  "Netherlands",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Belgium",
  "Poland",
  "Turkey",
  "United Arab Emirates",
  "Saudi Arabia",
  "Oman",
  "Qatar",
  "Kuwait",
  "Kenya",
  "Ethiopia",
  "Tanzania",
  "South Africa",
  "Nigeria",
  "Egypt",
  "Ghana",
  "Sri Lanka",
  "Bangladesh",
  "Nepal",
  "Bhutan",
  "China",
  "Japan",
  "Australia",
  "New Zealand",
]);

/**
 * Where each market's pin sits, and which way its label runs when pointed at.
 */
export const PINS = [
  { market: "Canada", lon: -73.5, lat: 45.6, side: "left" },
  { market: "USA", lon: -73.9, lat: 40.6, side: "left" },
  { market: "Europe", lon: 4.1, lat: 51.9, side: "left" },
  { market: "Turkey", lon: 34.6, lat: 36.6, side: "right" },
  { market: "UAE", lon: 55.05, lat: 24.98, side: "left" },
  { market: "Africa", lon: 39.8, lat: -4, side: "left" },
  { market: "South Asia", lon: 79.85, lat: 6.93, side: "right" },
  { market: "China", lon: 121.5, lat: 30.8, side: "right" },
  { market: "Japan", lon: 139.6, lat: 35.2, side: "right" },
  { market: "Australia", lon: 144.8, lat: -38, side: "right" },
] as const;

/**
 * Cardinal spline through the waypoints, emitted as cubic beziers. A plain
 * polyline kinks at every waypoint, which reads as a chart rather than a route.
 */
export function smoothPath(points: Point[], tension = 0.5): string {
  const p = points.map(([lon, lat]) => project(lon, lat));
  if (p.length < 2) return "";

  const r = (n: number) => Math.round(n * 10) / 10;
  let d = `M${r(p[0]![0])},${r(p[0]![1])}`;

  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i]!;
    const p1 = p[i]!;
    const p2 = p[i + 1]!;
    const p3 = p[i + 2] ?? p2;
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension * 2;
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension * 2;
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension * 2;
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension * 2;
    d += `C${r(c1x)},${r(c1y)} ${r(c2x)},${r(c2y)} ${r(p2[0])},${r(p2[1])}`;
  }
  return d;
}
