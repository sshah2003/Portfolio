// All coordinates live in the fixed 1600x1000 viewBox design space.
// Lines use only horizontal / vertical / 45-degree segments (WMATA style).
// The three lines run as parallel strokes 20px apart through the shared
// trunk (y = 540 / 560 / 580), diverging east of the Washington Post stops
// and reconverging at the ClassMate interchange — like the real
// Rosslyn–Stadium-Armory corridor.

export const VIEWBOX = { w: 1600, h: 1000 };

export const LINES = [
  {
    id: 'orange',
    name: 'Orange Line',
    theme: 'Career',
    color: 'var(--orange)',
    hex: '#D77F00',
    waypoints: [
      [160, 540],
      [800, 540],
      [1000, 340],
      [1200, 340],
      [1360, 500],
      [1360, 540],
    ],
  },
  {
    id: 'silver',
    name: 'Silver Line',
    theme: 'Learning',
    color: 'var(--silver)',
    hex: '#919D9D',
    waypoints: [
      [160, 580],
      [880, 580],
      [980, 680],
      [1260, 680],
      [1360, 580],
    ],
  },
  {
    id: 'blue',
    name: 'Blue Line',
    theme: 'Connect',
    color: 'var(--blue)',
    hex: '#0077C0',
    waypoints: [
      [160, 560],
      [1360, 560],
      [1480, 680],
    ],
  },
];

// The invisible master track the train actually rides. It follows visible
// rails through every station in tour order, reversing at the George Mason
// lecturer stop (trains are symmetric — reversals read naturally).
export const TRACK_WAYPOINTS = [
  [160, 560], // welcome
  [760, 560],
  [800, 540],
  [1000, 340],
  [1080, 340], // gmu-lecturer (turnaround)
  [1000, 340],
  [800, 540],
  [880, 580],
  [980, 680],
  [1060, 680], // gmu-bscs
  [1260, 680], // skills
  [1360, 580],
  [1360, 560], // classmate
  [1480, 680], // contact
];

// A Potomac-ish river band, purely decorative.
export const RIVER_PATH =
  'M 330 -40 C 240 200, 470 380, 300 600 C 180 760, 330 880, 260 1040';
