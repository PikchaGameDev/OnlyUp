export type Collider = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default class Physics {
  static isCheckIntersection(entity: Collider, area: Collider) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    );
  }
}
