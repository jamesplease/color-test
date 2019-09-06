import rgb2luminance from "./rgb-to-luminance";
import interpolateRgb from "./interpolate-rgb";

const EPS = 1e-7;

// Change this to increase speed but decrease accuracy.
// If you decrease this number, then you may want to increase the `targetContrast`
// number to compensate.
const MAX_ITER = 20;

export default function setLuminance(rgb, lum) {
  if (typeof lum !== "number") {
    // This would be an error. I'm not sure if y'all have a system to enforce proper use of utils.
  }

  // We can skip the iterative approach and directly return white or black if that particular luminance
  // is specified.
  if (lum === 0) {
    return [0, 0, 0];
  } else if (lum === 1) {
    return [255, 255, 255];
  }

  // compute new color using...
  let cur_lum = rgb2luminance(rgb[0], rgb[1], rgb[2]);
  let max_iter = MAX_ITER;

  const test = (low, high) => {
    const mid = interpolateRgb(low, high, 0.5);
    const lm = rgb2luminance(mid[0], mid[1], mid[2]);

    // We use an iterative approach that will either get us to the target luminance
    // or get us pretty close.
    if (Math.abs(lum - lm) < EPS || !max_iter--) {
      return mid.map(Math.round);
    }
    return lm > lum ? test(low, mid) : test(mid, high);
  };

  return cur_lum > lum ? test([0, 0, 0], rgb) : test(rgb, [255, 255, 255]);
}
