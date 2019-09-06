import targetLuminanceAgainstWhite from "./utils/target-luminance-against-white";
import setLuminance from "./utils/set-luminance";

export default function meetContrastRatioAgainstWhite({
  rgb,
  targetContrast = 4.5
}) {
  return setLuminance(rgb, targetLuminanceAgainstWhite({ targetContrast }));
}
