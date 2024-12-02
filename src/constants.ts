export const LEVEL_ASSETS = [
  [
    { key: "backgroundGround", path: "BackgroundGround.png" },
    { key: "backgroundAir", path: "BackgroundAir.png" },
    { key: "backgroundClouds", path: "BackgroundClouds.png" },
    { key: "backgroundNlo", path: "BackgroundNlo.png" },
    { key: "backgroundSpace", path: "BackgroundSpace.png" },
    { key: "balloon", path: "Balloon.png" },
    { key: "leaf", path: "Leaf.png" },
    { key: "leaf1", path: "Leaf1.png" },
  ],
  [
    { key: "leaf2", path: "Leaf2.png" },
    { key: "leaf3", path: "Leaf3.png" },
    { key: "leaf4", path: "Leaf4.png" },
    { key: "bird1", path: "Bird1.png" },
    { key: "bird2", path: "Bird2.png" },
    { key: "bird3", path: "Bird3.png" },
  ],
  [
    { key: "dog", path: "Dog.png" },
    { key: "plane", path: "Plane.png" },
    { key: "package", path: "Package.png" },
    { key: "nlo", path: "NLO.png" },
  ],
  [{ key: "nlo2", path: "NLO2.png" }],
  [
    { key: "saturn", path: "Saturn.png" },
    { key: "moon", path: "Moon.png" },
    { key: "frog", path: "Frog.png" },
    { key: "comet", path: "Comet.png" },
  ],
];

export const LIST_OF_ENEMIES_BY_LEVEL = [
  ["leaf", "leaf1"],
  ["leaf2", "leaf3", "leaf4", "bird1", "bird2", "bird3"],
  ["dog", "plane", "package"],
  ["nlo"],
  ["comet", "frog", "moon", "saturn", "nlo2"],
];

export enum LEVELS {
  GROUND = 0,
  AIR = 1,
  CLOUDS = 2,
  NLO = 3,
  SPACE = 4,
}

export enum SWIPE_DIRECTIONS {
  LEFT = 1,
  RIGHT = -1,
  NONE = 0,
}

export const MAX_FLY_HEIGHT = 11052;
export const SPAWN_ENEMIES_RATE = 500;
export const SPAWN_ENEMIES_OFFSET = 200;
export const BALLOON_STARTED_OFFSET = 200;
export const CHECK_DAMAGE_RATE = 20;
export const WAITING_NEW_GAME_LENGTH = 3000;
export const PRELOAD_BAR_WIDTH = 141;
export const BACKGROUND_SPEED = 2;
export const SWIPE_VELOCITY = 5;
export const BALLOON_SCALE = 0.09;
export const ENEMY_SCALE = 0.4;
export const MAX_GAME_WIDTH = 500;
