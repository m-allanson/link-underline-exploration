export function getPercent(percentage, start, end) {
  return start + (end - start) * (percentage / 100);
}

export class Point {
  #id = "";
  #xMin = 0;
  #yMin = 0;

  #xMax = 100;
  #yMax = 100;

  // As a percentage between min and max position
  #x = null;
  #y = null;

  constructor({ id, xMin, xMax, yMin, yMax }) {
    this.#id = id;
    this.#xMin = xMin;
    this.#yMin = yMin;
    this.#xMax = xMax;
    this.#yMax = yMax;
    this.#x = xMin;
    this.#y = yMin;
  }

  get id() {
    return this.#id;
  }

  set position(percentage) {
    this.#x = getPercent(percentage, this.#xMin, this.#xMax);
    this.#y = getPercent(percentage, this.#yMin, this.#yMax);
  }

  get position() {
    return [this.#x, this.#y];
  }
}

export class PolygonManager {
  points = [];
  ref = null;

  constructor(points, ref) {
    points.forEach((point) => {
      this.points.push(new Point(point));
    });
    this.ref = ref;
  }

  updatePositions(percentage) {
    this.points.forEach((point) => {
      point.position = percentage;
    });

    const clipPath = this.points
      .reduce((acc, point) => {
        acc.push(`${point.position[0]}% ${point.position[1]}%`);
        return acc;
      }, [])
      .join(",");

    this.ref.style = `clip-path: polygon(${clipPath});`;
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
  }

  updatePositions(percentage) {
    this.points.forEach((item) => {
      item.point.position = percentage;
    });
    this.points.forEach((item) => {
      const [x, y] = item.point.position;
      item.ref.style = `--translate-x: ${x}; --translate-y: ${y}`;
    });
  }
}
