//given percentage, start and end values, return the value that is percentage% between start and end
// 0% is start, 100% is end
// 50% is the value halfway between start and end
export function getPercent(percentage, start, end) {
  return start + (end - start) * (percentage / 100);
}

export class Point {
  #id = "";
  #minX = 0;
  #minY = 0;

  #maxX = 100;
  #maxY = 100;

  // As a percentage between min and max position
  #x = null;
  #y = null;

  constructor({ id, minX, maxX, minY, maxY }) {
    this.#id = id;
    this.#minX = minX;
    this.#minY = minY;
    this.#maxX = maxX;
    this.#maxY = maxY;
    this.#x = minX;
    this.#y = minY;
  }

  get id() {
    return this.#id;
  }

  set position(percentage) {
    this.#x = getPercent(percentage, this.#minX, this.#maxX);
    this.#y = getPercent(percentage, this.#minY, this.#maxY);
  }

  get position() {
    return `--translate-x: ${this.#x}; --translate-y: ${this.#y}`;
  }
}

export class PolygonManager {
  points = [];

  constructor(polygon) {
    // points.forEach((point) => {
    //   this.points.push({
    //     point: new Point(point),
    //     ref: document.querySelector(`#${point.id}`),
    //   });
    // });
  }
}

export class PointsManager {
  points = [];

  constructor(points) {
    points.forEach((point) => {
      this.points.push({
        point: new Point(point),
        ref: document.querySelector(`#${point.id}`),
      });
    });

    console.log(this.points);
  }

  updatePositions(percentage) {
    this.points.forEach((item) => {
      item.point.position = percentage;
    });
    this.points.forEach((item) => {
      item.ref.style = item.point.position;
    });
  }
}
