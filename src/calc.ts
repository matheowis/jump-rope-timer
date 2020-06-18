export const clamp = (val: number, min: number, max: number): number => val > max ? max : val < min ? min : val;
export const lerp = (a: number, b: number, alpha: number) => a + (b - a) * alpha;

export class Vector2D {
  public x = 0;
  public y = 0;
  public segment = 0;

  constructor(x: number, y: number, segment: number) {
    this.x = x;
    this.y = y;
    this.segment = segment;
  }

  public set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  public rotate(rad: number) {
    const ca = Math.cos(rad);
    const sa = Math.sin(rad);
    this.set(ca * this.x - sa * this.y, sa * this.x + ca * this.y);
    return this;
  }

  public rotatePrediction(rad: number, segmentsNum: number) {
    const ca = Math.cos(rad);
    const sa = Math.sin(rad);
    let segment = Math.floor(this.segment + rad / (2 * Math.PI) * segmentsNum);
    return {
      x: ca * this.x - sa * this.y,
      y: sa * this.x + ca * this.y,
      segment,
    }
  }
}

