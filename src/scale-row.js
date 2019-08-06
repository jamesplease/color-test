import React from "react";
import classnames from "classnames";
import chroma from "chroma-js";

export default function ScaleRow({ label, vals }) {
  return (
    <div className="scale_row">
      <div className="scale_rowLabel">{label}</div>
      {vals.reverse().map(c => {
        const hex = c.hex();
        const contrast = chroma.contrast(hex, "white");

        const good = contrast > 4.5;

        return (
          <div className="item">
            <div
              key={hex}
              style={{
                "--bg": hex
              }}
              className="colorSquare"
            />
            <div
              className={classnames("contrast", {
                "contrast-good": good
              })}
            >
              {contrast.toFixed(2)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
