import chroma from "chroma-js";

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
