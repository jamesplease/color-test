import React from "react";
import chroma from "chroma-js";
import "./scale.css";
import ScaleRow from "./scale-row";

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
    </div>
  );
}
