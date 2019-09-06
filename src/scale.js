import React from "react";
import classnames from "classnames";
import chroma from "chroma-js";
import "./scale.css";
import ScaleRow from "./scale-row";
import meetContrastRatioAgainstWhite from "./meet-contrast-ratio-against-white";
// import meetRatioOriginal from "./meet-ratio";

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export default function Scale({ hex }) {
  const color = chroma(hex);

  const lab = color.lab();
  const hsl = color.hsl();

  const labBrightness = lab[0];
  const labStep = labBrightness / 10;

  const hslBrightness = hsl[2];
  const hslStep = hslBrightness / 10;

  let labVals = [];
  for (let i = 0; i <= 10; i++) {
    const brightness = i * labStep;
    labVals.push(chroma.lab(brightness, lab[1], lab[2]));
  }

  let hslVals = [];
  for (let i = 0; i <= 10; i++) {
    const brightness = i * hslStep;
    hslVals.push(chroma.hsl(hsl[0], hsl[1], brightness));
  }

  const contrasted = meetContrastRatioAgainstWhite({
    rgb: color.rgb()
  });

  // const origContrasted = meetRatioOriginal({
  //   rgb: color.rgb()
  // });

  const hexContrasted = rgbToHex(
    Math.round(contrasted[0]),
    Math.round(contrasted[1]),
    Math.round(contrasted[2])
  );

  const contrast = chroma.contrast(hexContrasted, "white");
  const good = contrast > 4.5;

  return (
    <div className="colorScale">
      <div className="colorScale_header">
        <div
          style={{
            "--bg": hex
          }}
          className="colorSquare"
        />
        <div className="colorScale-color">{hex}</div>
      </div>
      <ScaleRow label="Lab" vals={labVals} />
      <ScaleRow label="HSL" vals={hslVals} />
      <div className="generator">
        <div
          style={{
            "--bg": hexContrasted
          }}
          className="colorSquare"
        />
        <div
          className={classnames("contrast contrastMargin", {
            "contrast-good": good
          })}
        >
          {contrast.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
