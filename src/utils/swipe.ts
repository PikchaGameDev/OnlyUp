/**
 * @typedef {keyof typeof BASE_DIRECTION} BaseDirection
 */

/** @enum {Direction} */
const BASE_DIRECTION = Object.freeze({
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  UP: "UP",
});

export enum DIRECTIONS {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
  UP = "UP",
  NONE = "NONE",
}

export type SwipeConfig = {
  swipeDetectedCallback: (direction: DIRECTIONS) => void;
};

/**
 * @typedef {keyof typeof DIRECTION} Direction
 */

/** @enum {Direction} */
const DIRECTION = Object.freeze({
  ...BASE_DIRECTION,
  NONE: "NONE",
});

/**
 * @callback SwipeDetectedCallback
 * @param {Direction} [direction]
 * @returns {void}
 */

/**
 * @typedef SwipeConfig
 * @type {object}
 * @property {SwipeDetectedCallback} [swipeDetectedCallback]
 */

export class Swipe {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.Math.Vector2} */
  #lastPointerDownLocation;
  /** @type {Phaser.Math.Vector2} */
  #lastPointerUpLocation;
  /** @type {Direction} */
  #swipeDirection: DIRECTIONS;
  /** @type {SwipeConfig | undefined} */
  #config;

  /**
   * @param {Phaser.Scene} scene
   * @param {SwipeConfig} [config]
   */
  constructor(scene: Phaser.Scene, config: SwipeConfig) {
    this.#scene = scene;
    this.#lastPointerDownLocation = new Phaser.Math.Vector2(0, 0);
    this.#lastPointerUpLocation = new Phaser.Math.Vector2(0, 0);
    this.#swipeDirection = DIRECTIONS.NONE;
    this.#config = config;
    this.#setupEvents();
  }

  /**
   * @returns {void}
   */
  #setupEvents() {
    this.#scene.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      this.#handlePointerDown,
      this
    );
    this.#scene.input.on(
      Phaser.Input.Events.POINTER_UP,
      this.#handlePointerUp,
      this
    );
    this.#scene.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.#scene.input.off(
        Phaser.Input.Events.POINTER_DOWN,
        this.#handlePointerDown,
        this
      );
      this.#scene.input.off(
        Phaser.Input.Events.POINTER_UP,
        this.#handlePointerUp,
        this
      );
    });
  }

  /**
   * @param {Phaser.Input.Pointer} pointer
   * @returns {void}
   */
  #handlePointerDown(pointer: Phaser.Input.Pointer) {
    this.#lastPointerDownLocation = pointer.position.clone();
  }

  /**
   * @param {Phaser.Input.Pointer} pointer
   * @returns {void}
   */
  #handlePointerUp(pointer: Phaser.Input.Pointer) {
    this.#lastPointerUpLocation = pointer.position.clone();
    this.#handleSwipe();
    if (
      this.#swipeDirection !== DIRECTION.NONE &&
      this.#config &&
      this.#config.swipeDetectedCallback
    ) {
      this.#config.swipeDetectedCallback(this.#swipeDirection);
    }
  }

  /**
   * @returns {void}
   */
  #handleSwipe() {
    // if the same position is detected, then there is no swipe to calculate
    if (
      this.#lastPointerDownLocation.x === this.#lastPointerUpLocation.x &&
      this.#lastPointerDownLocation.y === this.#lastPointerUpLocation.y
    ) {
      this.#swipeDirection = DIRECTIONS.NONE;
      return;
    }

    const radians = Phaser.Math.Angle.BetweenPoints(
      this.#lastPointerDownLocation,
      this.#lastPointerUpLocation
    );
    const degrees = Phaser.Math.RadToDeg(radians);
    const positiveDegrees = Math.abs(degrees);

    /**
     * For direction, depending on the degrees, we can determine which quadrant the swipe
     * direction is in.
     * X < 0 = bottom two quadrants, overall direction is down
     * X > 0 = top two quadrants, overall direction is up
     *
     * 0 - 90 is right side, 91 - 180 is left side
     */

    if (positiveDegrees <= 45) {
      this.#swipeDirection = DIRECTIONS.RIGHT;
      return;
    }

    if (positiveDegrees >= 135) {
      this.#swipeDirection = DIRECTIONS.LEFT;
      return;
    }

    if (degrees < 0) {
      this.#swipeDirection = DIRECTIONS.UP;
      return;
    }

    this.#swipeDirection = DIRECTIONS.DOWN;
  }
}
