export const LEVEL_ASSETS = [
  [
    { key: "backgroundAir", path: "BackgroundAir.png" },
    { key: "backgroundClouds", path: "BackgroundClouds.png" },
    { key: "backgroundGround", path: "BackgroundGround.png" },
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
  [
    { key: "nlo2", path: "NLO2.png" },
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
