import chroma from "chroma-js";

function rgb2luminance(r, g, b) {
  // relative luminance
  // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
  r = luminance_x(r);
  g = luminance_x(g);
  b = luminance_x(b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function luminance_x(x) {
  x /= 255;
  return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

// This is computed using the WCAG contrast ratio definition using white as the
// color to contrast against.
//
// Ratio = (L1 + 0.05) / (L2 + 0.05)
//
// L1 is the relative luminance of the lighter of the two colors. The lighter color
// in this calculation is white, which has a relative luminance of 1.
//
// Slot in the `targetContrast` for Ratio and you get the equation below.
//
// see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
function targetLuminance({ targetContrast = 4.5 }) {
  return 1.05 / targetContrast - 0.05;
}

export default function meetRatio({ rgb, targetContrast = 4.5 }) {
  const color = chroma(rgb);
  return color.luminance(targetLuminance({ targetContrast }));
}
